import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getSquadronId } from '@/utils/getUserDetails';

const prisma = new PrismaClient();

// get top 10 flights - ordered by the newest update date
export async function GET(){
    // Fetch the squadronId
    const squadronId = await getSquadronId();

    if (!squadronId) {
        return NextResponse.json({ error: 'לא נמצא מספר טייסת עבור המשתמש' }, { status: 400 });
    }
    try{
        const flights = await prisma.flight.findMany({
            where: {
                squadronId,
            },
            orderBy: {
                updatedAt: 'desc',
            },
            take: 15,
            include: {
                mission: true,
            },
        });
        
        return NextResponse.json(flights, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'לא הצליח לייבא נתוני טיסות'}, 
            { status: 500 }
        );
    }
}