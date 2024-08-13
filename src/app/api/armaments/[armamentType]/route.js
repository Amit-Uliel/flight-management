import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

// Get armament details
export async function GET(request, { params }) {
  const { armamentType } = params;

  try {
    const armament = await prismaClient.armament.findUnique({
      where: { armamentType },
    });

    if (!armament) {
      return NextResponse.json({ error: 'Armament not found' }, { status: 404 });
    }

    return NextResponse.json(armament, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch armament', details: error.message }, { status: 500 });
  }
}

// Update the quantity of an existing armament
export async function PUT(request, { params }) {
  const { armamentType } = params;
  const { quantity } = await request.json();

  if (!quantity || quantity <= 0) {
    return NextResponse.json({ error: 'כמות חוקית נדרשת לעדכון' }, { status: 400 });
  }

  try {
    const existingArmament = await prismaClient.armament.findUnique({
      where: { armamentType },
    });

    if (!existingArmament) {
      return NextResponse.json({ error: 'חימוש לא נמצא' }, { status: 404 });
    }

    const updatedArmament = await prismaClient.armament.update({
      where: { armamentType },
      data: {
        quantity: existingArmament.quantity + quantity, // Increase the quantity by the specified amount
      },
    });

    return NextResponse.json(updatedArmament, { status: 200 });
  } catch (error) {
    console.error('Error updating armament quantity:', error);
    return NextResponse.json({ error: 'Failed to update armament quantity', details: error.message }, { status: 500 });
  }
}

// Delete armament
export async function DELETE(request, { params }) {
  const { armamentType } = params;

  try {
    // Find the armament by its type
    const armament = await prismaClient.armament.findUnique({
      where: { armamentType },
    });

    if (!armament) {
      return NextResponse.json({ error: 'Armament not found' }, { status: 404 });
    }

    // Delete the armament type
    await prismaClient.armament.delete({
      where: { armamentType },
    });

    return NextResponse.json({ message: 'Armament deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete armament', details: error.message }, { status: 500 });
  }
}