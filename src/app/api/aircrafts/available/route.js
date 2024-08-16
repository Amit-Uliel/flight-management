import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

// get all the aircraft that are available for a mission
export async function GET() {
  try {
    const availableAircraft = await prismaClient.aircraft.findMany({
      where: { isAvailable: true },
    });
    return NextResponse.json(availableAircraft, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch available aircraft' }, { status: 500 });
  }
}