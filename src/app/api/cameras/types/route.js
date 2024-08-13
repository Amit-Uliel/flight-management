import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

// Fetch all camera types
export async function GET() {
  try {
    // Fetch distinct camera types from the database
    const cameraTypes = await prismaClient.camera.findMany({
      select: {
        cameraType: true,
      },
      distinct: ['cameraType'],
    });

    return NextResponse.json(cameraTypes, { status: 200 });
  } catch (error) {
    console.error('Error fetching camera types:', error);
    return NextResponse.json({ error: 'Failed to fetch camera types', details: error.message }, { status: 500 });
  }
}