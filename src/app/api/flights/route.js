import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const errorMessages = {
    missingFields: 'כל השדות הנדרשים חייבים להיות מסופקים',
    armamentNotFound: 'החימוש {armamentType} לא נמצא',
    insufficientArmament: 'כמות לא מספיקה לחימוש {armamentType}',
    cameraNotFound: 'המצלמה {cameraType} לא נמצאת',
    insufficientCamera: 'כמות לא מספיקה למצלמה {cameraType}',
    aircraftNotFound: 'המטוס {tailNumber} לא נמצא',
    aircraftNotAvailable: 'המטוס {tailNumber} אינו זמין',
    flightCreationFailed: 'יצירת טיסה נכשלה',
    takeoffTimeInPast: 'זמן המראה לא יכול להיות לפני הזמן הנוכחי',
    landingTimeBeforeTakeoff: 'זמן הנחיתה המתוכננת לא יכול להיות לפני זמן ההמראה',
};

export async function POST(request) {
    try {
        const {
            missionName,
            selectedAircrafts,
            armamentSelections,
            cameraSelections,
            takeoffTime,
            scheduledLandingTime,
            notes,
        } = await request.json();

        // Convert times to Date objects
        const takeoffDate = new Date(takeoffTime);
        const landingDate = new Date(scheduledLandingTime);
        const currentDate = new Date();

        // Validate required fields
        if (!missionName) {
            return NextResponse.json({ error: 'שם המשימה חסר' }, { status: 400 });
        }

        if (!selectedAircrafts || selectedAircrafts.length === 0) {
            return NextResponse.json({ error: 'יש לבחור לפחות מטוס אחד' }, { status: 400 });
        }

        if (!takeoffTime) {
            return NextResponse.json({ error: 'זמן המראה חסר' }, { status: 400 });
        }

        if (takeoffDate < currentDate) {
            return NextResponse.json({ error: errorMessages.takeoffTimeInPast }, { status: 400 });
        }

        if (!scheduledLandingTime) {
            return NextResponse.json({ error: 'זמן נחיתה מתוכנן חסר' }, { status: 400 });
        }

        if (landingDate <= takeoffDate) {
            return NextResponse.json({ error: errorMessages.landingTimeBeforeTakeoff }, { status: 400 });
        }

        // Aggregate and validate total armament and camera quantities
        const totalArmamentRequests = {};
        for (const tailNumber of selectedAircrafts) {
            if (armamentSelections[tailNumber]) {
                const { armamentType, quantity } = armamentSelections[tailNumber];
                if (!totalArmamentRequests[armamentType]) {
                    totalArmamentRequests[armamentType] = 0;
                }
                totalArmamentRequests[armamentType] += quantity;
            }
        }

        const armamentChecks = Object.entries(totalArmamentRequests).map(async ([armamentType, totalQuantity]) => {
            const armament = await prisma.armament.findUnique({
                where: { armamentType },
            });
            if (!armament) throw new Error(errorMessages.armamentNotFound.replace('{armamentType}', armamentType));
            if (armament.quantity < totalQuantity) {
                throw new Error(errorMessages.insufficientArmament.replace('{armamentType}', armamentType));
            }
        });

        const cameraChecks = Object.values(cameraSelections).map(async ({ cameraType }) => {
            if (cameraType) {
                const camera = await prisma.camera.findUnique({
                    where: { cameraType },
                });
                if (!camera) throw new Error(errorMessages.cameraNotFound.replace('{cameraType}', cameraType));
                if (camera.quantity < 1) {
                    throw new Error(errorMessages.insufficientCamera.replace('{cameraType}', cameraType));
                }
            }
        });

        await Promise.all([...armamentChecks, ...cameraChecks]);

        const result = await prisma.$transaction(async (prisma) => {
            // Create the mission
            const mission = await prisma.mission.create({
                data: { missionName },
            });

            const missionId = mission.missionId;

            // Create assignments for each selected aircraft
            const assignmentPromises = selectedAircrafts.map(async (tailNumber) => {
                const aircraft = await prisma.aircraft.findUnique({
                    where: { tailNumber },
                });

                if (!aircraft) throw new Error(errorMessages.aircraftNotFound.replace('{tailNumber}', tailNumber));
                if (!aircraft.isAvailable) {
                    throw new Error(errorMessages.aircraftNotAvailable.replace('{tailNumber}', tailNumber));
                }

                const assignment = await prisma.assignment.create({
                    data: {
                        tailNumber,
                        missionId,
                        takeOffTime: new Date(takeoffTime),
                        scheduledLandingTime: new Date(scheduledLandingTime),
                        cameraType: cameraSelections[tailNumber]?.cameraType || null,
                    },
                });

                const assignmentId = assignment.assignmentId;

                if (armamentSelections[tailNumber]) {
                    const { armamentType, quantity } = armamentSelections[tailNumber];

                    // Create armament usage
                    await prisma.assignmentArmamentUsage.create({
                        data: {
                            assignmentId,
                            tailNumber,
                            armamentType,
                            quantity,
                        },
                    });

                    // Reduce armament quantity
                    await prisma.armament.update({
                        where: { armamentType },
                        data: { quantity: { decrement: quantity } },
                    });
                }

                const cameraType = cameraSelections[tailNumber]?.cameraType;
                if (cameraType) {
                    // Reduce camera quantity
                    await prisma.camera.update({
                        where: { cameraType },
                        data: { quantity: { decrement: 1 } },
                    });
                }

                // Update aircraft availability
                await prisma.aircraft.update({
                    where: { tailNumber },
                    data: { isAvailable: false },
                });
            });

            await Promise.all(assignmentPromises);

            // Create the flight
            const flight = await prisma.flight.create({
                data: {
                    missionId,
                    takeoffTime: new Date(takeoffTime),
                    scheduledLandingTime: new Date(scheduledLandingTime),
                    notes: notes || '',
                },
            });

            return flight;
        });

        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error('Error creating flight:', error);
        return NextResponse.json({ error: errorMessages.flightCreationFailed, details: error.message }, { status: 500 });
    }
}

// method to fetch ongoing flights
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