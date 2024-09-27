import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';

const prismaClient = new PrismaClient();

// Get the user information from the cookies
function getUserFromCookies() {
  const cookieStore = cookies();
  const userData = cookieStore.get('userData');

  if (userData) {
    return JSON.parse(userData.value);
  } else {
    console.error("No user found");
    return null;
  }
}

// Get aircraft details
export async function GET(request, { params }) {
  const { tailNumber } = params;
  const user = getUserFromCookies();

  if (!user) {
    return NextResponse.json({ error: 'משתמש לא נמצא' }, { status: 403 });
  }

  const userSquadronId = user.squadronId;

  if (!tailNumber) {
    return NextResponse.json({ error: 'מספר הזנב נדרש' }, { status: 400 });
  }

  try {
    const aircraft = await prismaClient.aircraft.findFirst({
      where: {
        squadronId: userSquadronId,
        tailNumber,
      },
    });

    if (!aircraft) {
      return NextResponse.json({ error: 'מטוס לא נמצא או לא שייך לטייסת שלך' }, { status: 404 });
    }

    return NextResponse.json(aircraft, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'בעיה ביבוא פרטי מטוס', details: error.message }, { status: 500 });
  }
}

// Update aircraft details (use request body)
export async function PUT(request, { params }) {
  const { tailNumber } = params;
  const user = getUserFromCookies();

  if (!user) {
    return NextResponse.json({ error: 'משתמש לא נמצא' }, { status: 403 });
  }

  const userSquadronId = user.squadronId;
  const { model, squadronId } = await request.json();

  if (!tailNumber || !model || !squadronId) {
    return NextResponse.json({ error: 'מספר זנב, דגם, וטייסת נדרשים' }, { status: 400 });
  }

  try {
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

    // Update the aircraft details with the new model, weight, and squadronId
    const updatedAircraft = await prismaClient.aircraft.updateMany({
      where: {
        tailNumber,
        squadronId: userSquadronId,
      },
      data: { model, squadronId, weight },
    });

    if (updatedAircraft.count === 0) {
      return NextResponse.json({ error: 'מטוס לא נמצא או לא שייך לטייסת שלך' }, { status: 404 });
    }

    return NextResponse.json({ message: 'מטוס עודכן בהצלחה' }, { status: 200 });
  } catch (error) {
    console.error('Error updating aircraft:', error);
    return NextResponse.json({ error: 'בעיה בעדכון מטוס', details: error.message }, { status: 500 });
  }
}

// Delete aircraft
export async function DELETE(request, { params }) {
  const { tailNumber } = params;
  const user = getUserFromCookies();

  if (!user) {
    return NextResponse.json({ error: 'משתמש לא נמצא' }, { status: 403 });
  }

  const userSquadronId = user.squadronId;

  if (!tailNumber) {
    return NextResponse.json({ error: 'מספר הזנב נדרש' }, { status: 400 });
  }

  try {
    // Verify the aircraft belongs to the user's squadron before deleting
    const deletedAircraft = await prismaClient.aircraft.deleteMany({
      where: {
        tailNumber,
        squadronId: userSquadronId,
      },
    });

    if (deletedAircraft.count === 0) {
      return NextResponse.json({ error: 'מטוס לא נמצא או לא שייך לטייסת שלך' }, { status: 404 });
    }

    return NextResponse.json({ message: 'מטוס נמחק בהצלחה' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'בעיה במחיקת מטוס', details: error.message }, { status: 500 });
  }
}