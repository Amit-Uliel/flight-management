import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export async function GET() {
  try {
    // Sum the quantities of all cameras in the database
    const totalQuantity = await prismaClient.camera.aggregate({
      _sum: {
        quantity: true,
      },
    });

    return NextResponse.json({ totalQuantity: totalQuantity._sum.quantity || 0 }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch camera storage data', details: error.message }, { status: 500 });
  }
}