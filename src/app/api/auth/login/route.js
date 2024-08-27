import { PrismaClient } from '@prisma/client';
import { signToken } from '@/utils/jwt';  // Make sure this path is correct
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { militaryId, password } = await req.json();

    // Fetch user with the provided military ID
    const user = await prisma.user.findUnique({
      where: { militaryId },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid military ID or password' }, { status: 400 });
    }

    // Temporarily bypass password hashing for testing
    if (password !== user.password) {
      return NextResponse.json({ error: 'Invalid military ID or password' }, { status: 400 });
    }

    // Generate a JWT
    const token = await signToken({ userId: user.id, militaryId: user.militaryId });

    // Return the token to the client
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}