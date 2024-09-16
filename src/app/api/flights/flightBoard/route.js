// /app/api/flights/flightBoard/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getSquadronId } from '@/utils/getUserDetails';

const prisma = new PrismaClient();

export async function GET() {
    // Fetch the squadronId
    const squadronId = await getSquadronId();

    if (!squadronId) {
        return NextResponse.json({ error: 'לא נמצא מספר טייסת עבור המשתמש' }, { status: 400 });
    }
    
    try {
        // Calculate the date and time from 5 minutes ago
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

        // Fetch flights based on the given conditions
        const ongoingFlights = await prisma.flight.findMany({
            where: {
                squadronId,
                OR: [
                    {
                        status: {
                            in: ['SCHEDULED', 'IN_FLIGHT', 'LANDED'],
                        },
                    },
                    {
                        updatedAt: {
                            gte: fiveMinutesAgo, // Greater than or equal to 5 minutes ago
                        },
                    },
                ],
            },
            include: {
                mission: true, // Include mission details
            },
        });

        return NextResponse.json(ongoingFlights, { status: 200 });
    } catch (error) {
        console.error('Error fetching ongoing flights:', error);
        return NextResponse.json({ error: 'Failed to fetch ongoing flights', details: error.message }, { status: 500 });
    }
}