import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

// Update the quantity of an existing camera
export async function PUT(request, { params }) {
  const { cameraType } = params;
  const { quantity } = await request.json();

  if (quantity == null) {
    return NextResponse.json({ error: 'כמות חוקית נדרשת לעדכון' }, { status: 400 });
  }

  try {
    const existingCamera = await prismaClient.camera.findUnique({
      where: { cameraType },
    });

    if (!existingCamera) {
      return NextResponse.json({ error: 'מצלמה לא נמצאה' }, { status: 404 });
    }

    // Calculate the new quantity
    const newQuantity = existingCamera.quantity + quantity;

    if (newQuantity < 0) {
      return NextResponse.json({ error: 'הכמות לא יכולה להיות פחות מאפס' }, { status: 400 });
    }

    const updatedCamera = await prismaClient.camera.update({
      where: { cameraType },
      data: {
        quantity: newQuantity,
      },
    });

    return NextResponse.json(updatedCamera, { status: 200 });
  } catch (error) {
    console.error('Error updating camera quantity:', error);
    return NextResponse.json({ error: 'Failed to update camera quantity' }, { status: 500 });
  }
}

// Get the current quantity of the selected camera type
export async function GET(request, { params }) {
  const { cameraType } = params;

  try {
      const camera = await prismaClient.camera.findUnique({
          where: { cameraType },
      });

      if (!camera) {
          return NextResponse.json({ error: 'Camera not found' }, { status: 404 });
      }

      return NextResponse.json({ quantity: camera.quantity }, { status: 200 });
  } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch camera quantity', details: error.message }, { status: 500 });
  }
}

// Delete camera
export async function DELETE(request, { params }) {
  const { cameraType } = params;

  try {    
    const deletedCamera = await prismaClient.camera.delete({
      where: { cameraType },
    });

    return NextResponse.json({ message: 'Camera deleted successfully' }, { status: 200 });
  } catch (error) {
      console.error(`Failed to delete camera type: ${cameraType}`, error);
      return NextResponse.json({ error: 'Failed to delete camera', details: error.message }, { status: 500 });
  }
}