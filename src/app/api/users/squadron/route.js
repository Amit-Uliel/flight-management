import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getSquadronId } from '@/utils/getUserDetails';

const prisma = new PrismaClient();

export async function GET(req) {
    const squadronId = await getSquadronId();
    
    try {
        // Fetch the squadronId

        if (!squadronId) {
            return NextResponse.json({ error: 'לא נמצא מספר טייסת עבור המשתמש' }, { status: 400 });
        }

        // Fetch users from the squadron
        const users = await prisma.user.findMany({
            where: {
                squadronId: squadronId,
            },
        });

        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}