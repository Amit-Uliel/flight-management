import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getSquadronId } from '@/utils/getUserDetails';

const prisma = new PrismaClient();

// get aircrafts based on the user squadron
export async function GET(){

    // Fetch the squadronId
    const squadronId = await getSquadronId();

    if (!squadronId) {
        return NextResponse.json({ error: 'לא נמצא מספר טייסת עבור המשתמש' }, { status: 400 });
    }
    
    try {

        // Fetch aircrafts that belong to the same squadron
        const aircrafts = await prisma.aircraft.findMany({
            where:{
                squadronId,
            },
        });

        return NextResponse.json(aircrafts, { status: 200 });
    } catch (error){
        console.error(error);
        return NextResponse.json({error: 'לא הצליח לייבא מטוסים'}, {status: 500});
    }
}