import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// method to fetch flights to flight board
export async function GET() {
    try {
        const ongoingFlights = await prisma.flight.findMany({
            where: {
                status: {
                    in: ['SCHEDULED', 'IN_FLIGHT'],
                },
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