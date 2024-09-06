import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const {
            missionName,
            selectedMissionId,
            selectedAircrafts,
            armamentSelections,
            cameraSelections,
            takeoffTime,
            scheduledLandingTime,
            notes,
        } = await request.json();

        const missionId = selectedMissionId ? parseInt(selectedMissionId, 10) : null;
        const takeoffDate = new Date(takeoffTime);
        const landingDate = new Date(scheduledLandingTime);
        const currentDate = new Date();

        if (!missionId && !missionName) {
            return NextResponse.json({ error: 'יש לספק שם משימה או לבחור משימה קיימת' }, { status: 400 });
        }

        if (!selectedAircrafts || selectedAircrafts.length === 0) {
            return NextResponse.json({ error: 'יש לבחור לפחות מטוס אחד' }, { status: 400 });
        }

        if (!takeoffTime) {
            return NextResponse.json({ error: 'זמן המראה חסר' }, { status: 400 });
        }

        if (takeoffDate < currentDate) {
            return NextResponse.json({ error: 'זמן המראה לא יכול להיות לפני הזמן הנוכחי' }, { status: 400 });
        }

        if (!scheduledLandingTime) {
            return NextResponse.json({ error: 'זמן נחיתה מתוכנן חסר' }, { status: 400 });
        }

        if (landingDate <= takeoffDate) {
            return NextResponse.json({ error: 'זמן הנחיתה המתוכננת לא יכול להיות לפני זמן ההמראה' }, { status: 400 });
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
            if (!armament) throw new Error(`החימוש ${armamentType} לא נמצא`);
            if (armament.quantity < totalQuantity) {
                throw new Error(`כמות לא מספיקה לחימוש ${armamentType}`);
            }
        });

        const cameraChecks = Object.values(cameraSelections).map(async ({ cameraType }) => {
            if (cameraType) {
                const camera = await prisma.camera.findUnique({
                    where: { cameraType },
                });
                if (!camera) throw new Error(`המצלמה ${cameraType} לא נמצאת`);
                if (camera.quantity < 1) {
                    throw new Error(`כמות לא מספיקה למצלמה ${cameraType}`);
                }
            }
        });

        await Promise.all([...armamentChecks, ...cameraChecks]);

        const result = await prisma.$transaction(async (prisma) => {
            let missionIdToUse;
            if (missionId) {
                // Ensure mission exists and update its status
                const existingMission = await prisma.mission.findUnique({
                    where: { missionId },
                });

                if (!existingMission) {
                    throw new Error('משימה עם מזהה זה אינה קיימת');
                }

                // Update mission status to ONGOING
                missionIdToUse = missionId;
                await prisma.mission.update({
                    where: { missionId },
                    data: { MissionStatus: 'ONGOING' },
                });
            } else {
                // Create a new mission
                const mission = await prisma.mission.create({
                    data: { missionName },
                });
                missionIdToUse = mission.missionId;
            }

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
                        missionId: missionIdToUse,
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
                    missionId: missionIdToUse,
                    takeoffTime: new Date(takeoffTime),
                    scheduledLandingTime: new Date(scheduledLandingTime),
                    notes: notes || '',
                },
            });

            return flight;
        });

        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error('Error creating flight:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}