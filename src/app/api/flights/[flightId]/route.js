import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PATCH(request, { params }) {
    const { flightId } = params; // Get flightId from the URL
    const { status, actualLandingTime, takeoffTime, scheduledLandingTime, notes } = await request.json(); // Get data from the request body

    try {
        // Prepare the data object to update
        const data = {};

        // Conditionally add fields to the data object if they are provided in the request body
        if (status) data.status = status;
        if (status === 'COMPLETED' && actualLandingTime) {
            data.actualLandingTime = new Date(actualLandingTime); // Convert to a Date object
        }
        if (status === 'SCHEDULED') {
            data.actualLandingTime = null; // Reset actualLandingTime to null if status is 'SCHEDULED'
        }
        if (takeoffTime) data.takeoffTime = new Date(takeoffTime); // Convert to a Date object
        if (scheduledLandingTime) data.scheduledLandingTime = new Date(scheduledLandingTime); // Convert to a Date object
        if (notes) data.notes = notes;

        // Update the flight with the provided data in the database
        const updatedFlight = await prisma.flight.update({
            where: { flightId: parseInt(flightId, 10) },
            data: data,
        });

        // If flight is completed or canceled, update aircraft availability
        if (status === 'COMPLETED' || status === 'CANCELED') {
            await prisma.aircraft.updateMany({
                where: {
                    assignments: {
                        some: {
                            missionId: updatedFlight.missionId,
                        },
                    },
                },
                data: { isAvailable: true },
            });
        }

        // Additional logic for restoring armament and camera quantities

        if (status === 'CANCELED') {
            // Restore armament and camera quantities for canceled flights
            const assignments = await prisma.assignment.findMany({
                where: { missionId: updatedFlight.missionId },
                include: { AssignmentArmamentUsage: true, camera: true },
            });
        
            // Loop through each assignment to restore quantities
            for (const assignment of assignments) {
                if (assignment.AssignmentArmamentUsage) {
                    // Update armament quantities
                    for (const usage of assignment.AssignmentArmamentUsage) {
                        await prisma.armament.update({
                            where: { armamentType: usage.armamentType },
                            data: { quantity: { increment: usage.quantity } },
                        });
                    }
                }
        
                if (assignment.camera) {
                    // Restore camera quantity
                    await prisma.camera.update({
                        where: { cameraType: assignment.camera.cameraType },
                        data: { quantity: { increment: 1 } },
                    });
                }
            }
            
            // Delete all related AssignmentArmamentUsage records
            await prisma.assignmentArmamentUsage.deleteMany({
                where: {
                    assignmentId: {
                        in: assignments.map(assignment => assignment.assignmentId),
                    },
                },
            });
    
            // Remove all aircraft assignments associated with the canceled flight
            await prisma.assignment.deleteMany({
                where: { missionId: updatedFlight.missionId }
            });

        } else if (status === 'COMPLETED') {
            // Only restore camera quantities for completed flights
            const assignments = await prisma.assignment.findMany({
                where: { missionId: updatedFlight.missionId },
                include: { camera: true },
            });

            for (const assignment of assignments) {
                if (assignment.camera) {
                    await prisma.camera.update({
                        where: { cameraType: assignment.camera.cameraType },
                        data: { quantity: { increment: 1 } },
                    });
                }
            }
        }

        return NextResponse.json(updatedFlight, { status: 200 });
    } catch (error) {
        console.error('Error updating flight:', error);
        return NextResponse.json(
            { error: 'עדכון פרטי הטיסה נכשל' },
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