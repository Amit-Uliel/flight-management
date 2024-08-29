'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function login(formData) {
    const supabase = createClient();
    const militaryId = formData.get('militaryId');
    const militaryIdFormatted = `${militaryId}@military.com`;
    const password = formData.get('password');

    // Fetch all user fields from the database using Prisma
    const user = await prisma.user.findUnique({
        where: { militaryId: militaryId },
    });

    if (!user) {
        console.log('User not found in the database.');
        redirect('/error');
    }

    const { error } = await supabase.auth.signInWithPassword({
        email: militaryIdFormatted,
        password,
    });

    if (error) {
        console.log(error);
        redirect('/error');
    }

    // Store all user data in a cookie as a JSON string
    const cookieStore = cookies();
    cookieStore.set('userData', JSON.stringify(user), {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });

    // Revalidate and redirect
    revalidatePath('/', 'layout');
    redirect('/dashboard');
}