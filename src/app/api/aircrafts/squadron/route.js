import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

// get aircrafts based on the user squadron
export async function GET(){
    try {
        const cookieStore = cookies();
        const userData = cookieStore.get('userData');
        
        if(!userData){
            return NextResponse.json();
        }

        const user = JSON.parse(userData.value);
        const squadronId = user.squadronId;

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