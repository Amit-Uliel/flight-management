import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

// create a new mission
export async function POST(request) {
    try{
        // Parse the request body
        const { missionName } = await request.json();

        // Validate the missionName
        if(!missionName) {
            return NextResponse.json({error: 'נדרש שם משימה'}, { status: 400});
        }

        // create a new mission
        const newMission = await prismaClient.mission.create({
            data: {
                missionName,
            },
        });

        // Return the newly created mission
        return NextResponse.json(newMission, {status:201});
    } catch (error) {
        console.error('בעיה ביצירת משימה: ', error);
        return NextResponse.json({error: 'יצירת משימה נכשלה', details: error.message }, {status: 500});
    }
}