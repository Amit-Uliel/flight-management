import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// get quantity of aircraft
export async function GET() {
    try {
        const aircraftCount = await prisma.aircraft.count();
        return NextResponse.json({ quantity: aircraftCount });
    } catch (error) {
        return NextResponse.json({ error: 'אחזור נתוני האחסון של המטוס נכשל' }, { status: 500 });
    }
}