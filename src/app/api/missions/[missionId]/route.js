import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PATCH(req, { params }) {
    try {
        const { missionId } = params;
        const { status } = await req.json();

        // Validate input
        if (!missionId || !status) {
        return NextResponse.json(
            { error: 'יש לספק מזהה משימה ומצב.' },
            { status: 400 }
        );
        }

        // Update mission status in the database
        const updatedMission = await prisma.mission.update({
            where: { missionId: parseInt(missionId, 10) },
            data: { MissionStatus: status },
        });

        return NextResponse.json(updatedMission, { status: 200 });
    } catch (error) {
        console.error('Error updating mission status:', error);

        if (error.code === 'P2025') {
            return NextResponse.json(
                { error: 'משימה לא נמצאה.' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: 'שגיאת שרת פנימית' },
            { status: 500 }
        );
    }
}