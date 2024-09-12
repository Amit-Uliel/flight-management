import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

// Add a new armament to the database
export async function POST(request) {
  try {
    const { type, weight, quantity } = await request.json();

    if (!type || weight == null || quantity == null) {
      return NextResponse.json({ error: 'נא למלא את כל השדות' }, { status: 400 });
    }

    // Check if the armament type already exists in the database
    const existingArmament = await prismaClient.armament.findUnique({
      where: { armamentType: type },
    });

    if (existingArmament) {
      return NextResponse.json({ error: 'חימוש עם סוג זה כבר קיים' }, { status: 409 });
    }

    // Create a new armament entry
    const armament = await prismaClient.armament.create({
      data: {
        armamentType: type,
        weight,
        quantity,
      },
    });

    return NextResponse.json(armament, { status: 201 });
  } catch (error) {
    console.error('Error adding armament:', error);
    return NextResponse.json({ error: 'Failed to add armament', details: error.message }, { status: 500 });
  }
}

// get all armaments types
export async function GET() {
  try {
      const armaments = await prismaClient.armament.findMany();
      return NextResponse.json(armaments, { status: 200 });
  } catch (error) {
      console.error('Failed to fetch armaments:', error);
      return NextResponse.json({ error: 'Failed to fetch armaments' }, { status: 500 });
  }
}