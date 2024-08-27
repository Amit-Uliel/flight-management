import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// fetch flights for history board
export async function GET() {
    try {
        // Fetch flights with a status of COMPLETED or CANCELED
        const flights = await prisma.flight.findMany({
            where: {
                OR: [
                    { status: 'COMPLETED' },
                    { status: 'CANCELED' }
                ]
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