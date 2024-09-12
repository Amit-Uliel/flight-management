import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';

const prismaClient = new PrismaClient();

// get all the aircraft from the current user squadron that are available for a mission
export async function GET() {
  try {
    const cookieStore = cookies();
    const userData = cookieStore.get('userData');

    if(!userData){
      return NextResponse.json('אין נתוני משתמש', {status: 401})
    }

    const user = JSON.parse(userData.value);
    const squadronId = user?.squadronId;

    if (!squadronId) {
      return NextResponse.json({ error: 'לא נמצא מספר טייסת עבור המשתמש' }, { status: 400 });
    }

    const availableAircraft = await prismaClient.aircraft.findMany({
      where: { squadronId ,isAvailable: true },
    });
    return NextResponse.json(availableAircraft, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch available aircraft' }, { status: 500 });
  }
}