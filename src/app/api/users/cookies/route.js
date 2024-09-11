import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    const cookieStore = cookies();
    const userData = cookieStore.get('userData');
    
    if (userData) {
        const parsedUserData = JSON.parse(userData.value);
        return NextResponse.json({ ...parsedUserData });
    } else {
        return NextResponse.json({ error: 'No user data found' }, { status: 404 });
    }
}