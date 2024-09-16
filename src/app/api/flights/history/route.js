import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getSquadronId } from '@/utils/getUserDetails';

const prisma = new PrismaClient();

// fetch flights for history board
export async function GET() {
    // Fetch the squadronId
    const squadronId = await getSquadronId();

    if (!squadronId) {
        return NextResponse.json({ error: 'לא נמצא מספר טייסת עבור המשתמש' }, { status: 400 });
    }
    
    try {
        // Fetch flights with a status of COMPLETED or CANCELED and matching the user squadron
        const flights = await prisma.flight.findMany({
            where: {
                squadronId,
                OR: [
                    { status: 'COMPLETED' },
                    { status: 'CANCELED' }
                ],
                updatedAt: {
                    gte: new Date(new Date().getTime() - 48 * 60 * 60 * 1000), // Flights updated in the last 48 hours
                },
            },
            include: {
                mission: true, // Include related mission data
            },
            orderBy: {
                takeoffTime: 'desc', // Order by takeoff time, most recent first
            }
        });

        return NextResponse.json(flights, { status: 200 });
    } catch (error) {
        console.error('Error fetching flight history:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}