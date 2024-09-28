export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export async function GET() {
  try {
    // Sum the quantities of all armaments in the database
    const quantity = await prismaClient.armament.aggregate({
      _sum: {
        quantity: true,
      },
    });

    return NextResponse.json({ quantity: quantity._sum.quantity || 0 }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch armament storage data', details: error.message }, { status: 500 });
  }
}