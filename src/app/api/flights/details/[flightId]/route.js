import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req, { params }) {
    const { flightId } = params;

    try {
        const flightDetails = await prisma.flight.findUnique({
            where: { flightId: parseInt(flightId) },
            include: {
                mission: {
                    include: {
                        assignments: {
                            include: {
                                aircraft: true,
                                camera: true,
                                AssignmentArmamentUsage: {
                                    include: {
                                        armament: true, // Include the related armament details
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!flightDetails) {
            return NextResponse.json({ message: 'Flight not found' }, { status: 404 });
        }

        return NextResponse.json(flightDetails, { status: 200 });
    } catch (error) {
        console.error('Error fetching flight details:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}