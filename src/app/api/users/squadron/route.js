import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

// function to get the user's squadronId from cookies
async function getSquadronIdFromCookies() {
    const cookieStore = cookies();
    const userDataCookie = cookieStore.get('userData');

    if (userDataCookie) {
        try {
            const userDetails = JSON.parse(userDataCookie.value);
            return userDetails.squadronId;
        } catch (error) {
            console.error('Error parsing user data from cookies:', error);
            return null;
        }
    }

    return null;
}

export async function GET(req) {
    try {
        // Get the squadronId from cookies
        const squadronId = await getSquadronIdFromCookies();

        if (!squadronId) {
            return NextResponse.json({ error: 'Squadron ID not found' }, { status: 400 });
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