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
        where: { militaryId },
    });

    if (!user) {
        console.error('User not found in the database.');
        throw new Error('User not found in the database.');
    }

    const { error } = await supabase.auth.signInWithPassword({
        email: militaryIdFormatted,
        password,
    });

    if (error) {
        console.log(error);
        throw new Error('Authentication failed: ' + error.message);
    }

    // Store all user data in a cookie as a JSON string
    const cookieStore = cookies();
    cookieStore.set('userData', JSON.stringify(user), {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });

    const isAdmin = user.role === 'אדמין';

    // Revalidate and redirect
    revalidatePath('/', 'layout');
    if (isAdmin){
        redirect('/admin');
    } else {
        redirect('/dashboard');
    }
}

export async function signup(formData) {
    const supabase = createClient();

    const militaryId = formData.get('militaryId');
    const militaryIdFormatted = `${militaryId}@military.com`;
    const password = formData.get('password');
    const name = formData.get('name');
    const role = formData.get('role');
    const squadronId = formData.get('squadronId');
    const rank = formData.get('rank');
    const profileImage = formData.get('profileImage');

    // if the user is not admin and has no squadron id specified throw an error
    if (role !== 'אדמין' && !squadronId) {
        throw new Error('נדרש מספר טייסת למשתמשים שהם לא אדמין');
    }

    // if the role is admin and has squadron id throw an error
    if (role === 'אדמין' && squadronId) {
        throw new Error('אדמין לא יכול להיות משוייך לטייסת');
    }

    // Check if user with the same militaryId already exists
    const existingUser = await prisma.user.findUnique({
        where: { militaryId },
    });
    
    if (existingUser) {
        throw new Error('משתמש עם מספר אישי זה כבר קיים במערכת.');
    }

    // Sign up with Supabase Auth
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
        email: militaryIdFormatted,
        password: password,
    });

    // Handle signup error immediately
    if (signupError) {
        console.error('Supabase auth signup error:', signupError);
        throw new Error('Authentication failed: ' + (signupError.message || 'Unknown error'));
    }

    const user = signupData.user;
    
    // Store the user in the database
    try {
        await prisma.user.create({
            data: {
                militaryId,
                uuid: user.id,
                name,
                role,
                squadronId: squadronId ? parseInt(squadronId, 10) : null,
                rank,
            },
        });
    } catch (dbError) {
        console.error('Error saving user to the database:', dbError);
        throw new Error('Failed to save user to the database: ' + (dbError.message || 'Unknown error'));
    }

    // Upload the profile image to Supabase storage
    if (profileImage) {
        const { error: uploadError } = await supabase.storage
            .from('profile-images')
            .upload(`${militaryId}/profile.jpeg`, profileImage);

        if (uploadError) {
            console.error('Error uploading image:', uploadError);
            throw new Error('Image upload failed: ' + (uploadError.message || 'Unknown error'));
        }
    }

    // Revalidate and redirect
    revalidatePath('/', 'layout');
    redirect('/admin/user-actions/create-user');
}