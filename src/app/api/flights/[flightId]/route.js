import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PATCH(request, { params }) {
    const { flightId } = params; // Get flightId from the URL
    const { status } = await request.json(); // Get the status from the request body

    try {
        // Update the flight status in the database
        const updatedFlight = await prisma.flight.update({
            where: { flightId: parseInt(flightId, 10) },
            data: { status },
        });

        return NextResponse.json(updatedFlight, { status: 200 });
    } catch (error) {
        console.error('Error updating flight status:', error);
        return NextResponse.json(
            { error: 'עדכון סטטוס הטיסה נכשל' },
            { status: 500 }
        );
    }
}

export async function GET(request, { params }) {
    const { flightId } = params;

    try {
        // Fetch the flight by ID
        const flight = await prisma.flight.findUnique({
            where: { flightId: parseInt(flightId, 10) },
        });

        if (!flight) {
            return NextResponse.json({ error: 'הטיסה לא נמצאה' }, { status: 404 });
        }

        return NextResponse.json(flight, { status: 200 });
    } catch (error) {
        console.error('Error fetching flight:', error);
        return NextResponse.json({ error: 'טעינת נתוני הטיסה נכשלה' }, { status: 500 });
    }
}