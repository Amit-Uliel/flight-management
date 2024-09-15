import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

// fetch flights for history board
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