import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

// Create a new assignment
export async function POST(request) {
    try {
        const { tailNumber, missionId, takeOffTime, scheduledLandingTime, cameraType } = await request.json();

        // Validate required fields
        if (!tailNumber || !missionId || !takeOffTime || !scheduledLandingTime || !cameraType) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Ensure the aircraft is available
        const aircraft = await prismaClient.aircraft.findUnique({
            where: { tailNumber },
        });

        if (!aircraft || !aircraft.isAvailable) {
            return NextResponse.json({ error: 'Aircraft is not available or does not exist' }, { status: 400 });
        }

        // Ensure the camera exists
        const camera = await prismaClient.camera.findUnique({
            where: { cameraType },
        });

        if (!camera) {
            return NextResponse.json({ error: 'Camera type does not exist' }, { status: 400 });
        }

        // Create a new assignment
        const newAssignment = await prismaClient.assignment.create({
            data: {
                tailNumber,
                missionId,
                takeOffTime: new Date(takeOffTime),
                scheduledLandingTime: new Date(scheduledLandingTime),
                cameraType,
            },
        });

        return NextResponse.json(newAssignment, { status: 201 });
    } catch (error) {
        console.error('Error creating assignment:', error);
        return NextResponse.json({ error: 'Failed to create assignment', details: error.message }, { status: 500 });
    }
}