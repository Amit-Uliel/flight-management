import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

// method to fetch flights to flight board
export async function GET() {
    try {
        // get user cookies
        const cookieStore = cookies();
        const userData = cookieStore.get('userData');

        if(!userData){
            return NextResponse.json('אין נתוני משתמש', {status: 401})
        }

        // get user squadron
        const user = JSON.parse(userData.value);
        const squadronId = user?.squadronId;

        if (!squadronId) {
            return NextResponse.json({ error: 'לא נמצא מספר טייסת עבור המשתמש' }, { status: 400 });
        }

        // Calculate the date and time from 5 minutes ago
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

        // Fetch flights based on the given conditions
        const ongoingFlights = await prisma.flight.findMany({
            where: {
                squadronId,
                OR: [
                    {
                        status: {
                            in: ['SCHEDULED', 'IN_FLIGHT'],
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