import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export async function PATCH(request, { params }) {
    const { tailNumber } = params;
    const { isAvailable } = await request.json();

    if (typeof isAvailable !== 'boolean') {
        return NextResponse.json({ error: 'Invalid value for isAvailable' }, { status: 400 });
    }

    try {
        const updatedAircraft = await prismaClient.aircraft.update({
            where: { tailNumber },
            data: { isAvailable },
        });

        return NextResponse.json(updatedAircraft, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update aircraft', details: error.message }, { status: 500 });
    }
}