import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

// Get aircraft details
export async function GET(request, { params }) {
    const { tailNumber } = params;
  
    if (!tailNumber) {
      return NextResponse.json({ error: 'מספר הזנב נדרש' }, { status: 400 });
    }
  
    try {
      const aircraft = await prismaClient.aircraft.findUnique({
        where: { tailNumber },
      });
  
      if (!aircraft) {
        return NextResponse.json({ error: 'מטוס לא נמצא' }, { status: 404 });
      }
  
      return NextResponse.json(aircraft, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'בעיה ביבוא פרטי מטוס' }, { status: 500 });
    }
}

// Update aircraft details (use request body)
export async function PUT(request, { params }) {
    const { tailNumber } = params;
    const { model, squadronId } = await request.json();

    if (!tailNumber || !model || !squadronId) {
      return NextResponse.json({ error: 'מספר זנב, דגם וטייסת נדרשים' }, { status: 400 });
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

        // Update the aircraft details with the new model and weight
        const updatedAircraft = await prismaClient.aircraft.update({
            where: { tailNumber },
            data: { model, squadronId, weight },
        });
  
        return NextResponse.json(updatedAircraft, { status: 200 });
    } catch (error) {
        console.error('Error updating aircraft:', error);
        return NextResponse.json({ error: 'בעיה בעדכון מטוס', details: error.message }, { status: 500 });
    }
}

// Delete aircraft
export async function DELETE(request, { params }) {
    const { tailNumber } = params;
  
    if (!tailNumber) {
      return NextResponse.json({ error: 'מספר הזנב נדרש' }, { status: 400 });
    }
  
    try {
      const deletedAircraft = await prismaClient.aircraft.delete({
        where: { tailNumber },
      });
  
      return NextResponse.json({ message: 'מטוס נמחק בהצלחה', data: deletedAircraft }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'בעיה במחיקת מטוס', details: error.message }, { status: 500 });
    }
}