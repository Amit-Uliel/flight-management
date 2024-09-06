import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        // Fetch all missions with status 'ONHOLD' from the database
        const onHoldMissions = await prisma.mission.findMany({
            where: { MissionStatus: 'ONHOLD' },
        });

        // Return the on-hold missions in a JSON response
        return NextResponse.json(onHoldMissions, { status: 200 });
    } catch (error) {
            console.error('Error fetching on-hold missions:', error.message);
            return NextResponse.json({ error: 'Failed to fetch on-hold missions' }, { status: 500 });
    }
}