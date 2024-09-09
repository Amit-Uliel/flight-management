import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get top 10 flights - ordered by the newest creation date
export async function GET(){
    try{
        const flights = await prisma.flight.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: 10,
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