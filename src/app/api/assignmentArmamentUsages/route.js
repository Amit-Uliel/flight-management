import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

// Create a new AssignmentArmamentUsage
export async function POST(request) {
    try {
        const { assignmentId, tailNumber, armamentType, quantity } = await request.json();

        // Validate required fields
        if (!assignmentId || !tailNumber || !armamentType || !quantity) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Ensure the assignment exists
        const assignment = await prismaClient.assignment.findUnique({
            where: { id: assignmentId },
        });

        if (!assignment) {
            return NextResponse.json({ error: 'Assignment does not exist' }, { status: 400 });
        }

        // Ensure the aircraft exists
        const aircraft = await prismaClient.aircraft.findUnique({
            where: { tailNumber },
        });

        if (!aircraft) {
            return NextResponse.json({ error: 'Aircraft does not exist' }, { status: 400 });
        }

        // Ensure the armament exists
        const armament = await prismaClient.armament.findUnique({
            where: { armamentType },
        });

        if (!armament) {
            return NextResponse.json({ error: 'Armament type does not exist' }, { status: 400 });
        }

        // Create a new AssignmentArmamentUsage
        const newArmamentUsage = await prismaClient.assignmentArmamentUsage.create({
            data: {
                assignmentId,
                tailNumber,
                armamentType,
                quantity,
            },
        });

        return NextResponse.json(newArmamentUsage, { status: 201 });
    } catch (error) {
        console.error('Error creating AssignmentArmamentUsage:', error);
        return NextResponse.json({ error: 'Failed to create AssignmentArmamentUsage', details: error.message }, { status: 500 });
    }
}