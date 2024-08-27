import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

// Add an aircraft to the database
export async function POST(request) {
  try {
    const { tailNumber, model, squadron } = await request.json();

    // Validation: Ensure tailNumber is numeric
    if (!tailNumber || !model || !squadron || !/^\d+$/.test(tailNumber)) {
      return NextResponse.json({ error: 'מספר הזנב חייב להיות מספרי וכל השדות נדרשים' }, { status: 400 });
    }

    // Check if an aircraft with the same tail number already exists
    const existingAircraft = await prismaClient.aircraft.findUnique({
      where: { tailNumber },
    });

    if (existingAircraft) {
      return NextResponse.json({ error: 'מטוס עם מספר זנב זה כבר קיים' }, { status: 409 });
    }

    // Set the weight based on the model
    let weight;
    switch (model) {
      case 'HERMES_450':
        weight = 450;
        break;
      case 'HERMES_900':
        weight = 970;
        break;
      case 'HERMES_1000':
        weight = 1250;
        break;
      default:
        return NextResponse.json({ error: 'Model is not recognized' }, { status: 400 });
    }

    // Attempt to find the squadron by ID
    let squadronData = await prismaClient.squadron.findUnique({
      where: {
        squadronId: parseInt(squadron, 10),
      },
    });

    // If the squadron doesn't exist, create it
    if (!squadronData) {
      squadronData = await prismaClient.squadron.create({
        data: {
          squadronId: parseInt(squadron, 10),
        },
      });
    }

    // Create a new aircraft entry associated with the found or newly created squadron
    const newAircraft = await prismaClient.aircraft.create({
      data: {
        tailNumber,
        model,
        squadronId: squadronData.squadronId,
        weight,
      },
    });

    return NextResponse.json(newAircraft, { status: 201 });
  } catch (error) {
    console.error('Error adding aircraft:', error);
    return NextResponse.json({ error: 'Failed to add aircraft', details: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
      const aircrafts = await prismaClient.aircraft.findMany();
      return NextResponse.json(aircrafts, { status: 200 });
  } catch (error) {
      console.error('Failed to fetch aircrafts:', error);
      return NextResponse.json({ error: 'Failed to fetch aircrafts' }, { status: 500 });
  }
}