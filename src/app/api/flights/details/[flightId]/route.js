import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req, { params }) {
    const { flightId } = params;

    try {
        // Fetch the flight to verify it exists, but only return the ID
        const flight = await prisma.flight.findUnique({
            where: { flightId: parseInt(flightId) },
            select: { flightId: true } // Only select the flightId
        });

        if (!flight) {
            return NextResponse.json({ message: 'Flight not found' }, { status: 404 });
        }

        return NextResponse.json({ flightId: flight.flightId }, { status: 200 });
    } catch (error) {
        console.error('Error fetching flight:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}