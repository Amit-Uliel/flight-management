import { NextResponse } from 'next/server';
import prisma from '@prisma/client';

const { PrismaClient } = prisma;
const prismaClient = new PrismaClient();

// Add new camera to the database
export async function POST(request) {
  try {
    const { type, weight, quantity } = await request.json();

    if (!type || weight == null || quantity == null) {
      return NextResponse.json({ error: 'נא למלא את כל השדות' }, { status: 400 });
    }

    // Check if the camera type already exists
    const existingCamera = await prismaClient.camera.findUnique({
      where: { cameraType: type },
    });

    if (existingCamera) {
      return NextResponse.json({ error: 'מצלמה עם סוג זה כבר קיימת' }, { status: 409 });
    }

    // Create a new camera entry
    const camera = await prismaClient.camera.create({
      data: {
        cameraType: type,
        weight,
        quantity, // Start with the specified quantity
      },
    });

    return NextResponse.json(camera, { status: 201 });
  } catch (error) {
      console.error('Error adding camera:', error);
      return NextResponse.json({ error: 'Failed to add camera' }, { status: 500 });
  }
}