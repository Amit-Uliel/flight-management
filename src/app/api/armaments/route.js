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
        quantity, // Start with the specified quantity
      },
    });

    return NextResponse.json(armament, { status: 201 });
  } catch (error) {
    console.error('Error adding armament:', error);
    return NextResponse.json({ error: 'Failed to add armament', details: error.message }, { status: 500 });
  }
}