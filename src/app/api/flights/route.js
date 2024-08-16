import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        // Parse the incoming JSON request body
        const { missionId, takeoffTime, scheduledLandingTime, notes } = await request.json();

        // Validate the required fields
        if (!missionId || !takeoffTime || !scheduledLandingTime) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // Create a new flight record in the database
        const newFlight = await prisma.flight.create({
            data: {
                missionId,
                takeoffTime: new Date(takeoffTime),
                scheduledLandingTime: new Date(scheduledLandingTime),
                notes: notes || '',  // notes are optional
            },
        });

        // Return the created flight as the response
        return NextResponse.json(newFlight, { status: 201 });
    } catch (error) {
        console.error('Error creating flight:', error);
        return NextResponse.json({ error: 'Failed to create flight', details: error.message }, { status: 500 });
    }
}