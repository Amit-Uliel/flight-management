import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getSquadronId } from '@/utils/getUserDetails';

const prisma = new PrismaClient();

export async function GET() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  // Fetch the squadronId
  const squadronId = await getSquadronId();

  if (!squadronId) {
      return NextResponse.json({ error: 'לא נמצא מספר טייסת עבור המשתמש' }, { status: 400 });
  }

  try {
    // Query for all flights created this month
    const flights = await prisma.flight.findMany({
      where: {
        squadronId,
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Group flights by the day of the month
    const groupedByDay = flights.reduce((acc, flight) => {
      const day = new Date(flight.createdAt).getDate(); // Extract day of the month
      if (!acc[day]) {
        acc[day] = 0; // Initialize count if not already set
      }
      acc[day] += 1; // Increment count
      return acc;
    }, {});

    // Format the response to return { day, count }
    const formattedData = Object.entries(groupedByDay).map(([day, count]) => ({
      day: parseInt(day, 10),
      count,
    }));
    
    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error fetching flights:', error);
    return NextResponse.json({ error: 'Failed to fetch flights' }, { status: 500 });
  }
}