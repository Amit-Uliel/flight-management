import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

// Get all armament types
export async function GET() {
  try {
    const armamentTypes = await prismaClient.armament.findMany({
      select: {
        armamentType: true, // Only select the armamentType field
      },
    });

    return NextResponse.json(armamentTypes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch armament types', details: error.message }, { status: 500 });
  }
}