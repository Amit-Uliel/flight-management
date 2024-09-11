'use server';

import { cookies } from 'next/headers';
import { createClient } from './supabase/server';

const supabase = createClient();

// Function to retrieve the entire user details object
export async function getUserDetails() {
    const cookieStore = cookies();
    const userDataCookie = cookieStore.get('userData');
    let userDetails = {};

    if (userDataCookie) {
        try {
            // Parse the JSON string from the cookie
            userDetails = JSON.parse(userDataCookie.value);
        } catch (error) {
            console.error('Error parsing userData cookie:', error);
        }
    }

    return userDetails;
}

// Utility functions to get specific details if needed
export async function getRoleName() {
    const userDetails = await getUserDetails();
    return userDetails?.role || '';
}

export async function getUserName() {
    const userDetails = await getUserDetails();
    return userDetails?.name || '';
}

export async function getSquadronId() {
    const userDetails = await getUserDetails();
    return userDetails?.squadronId || '';
}

export async function getRank() {
    const userDetails = await getUserDetails();
    return userDetails?.rank || '';
}

export async function getProfileImageUrl() {
    const userDetails = await getUserDetails();

    // Get public URL for the profile image
    const { data: profileImageUrl, error } = supabase.storage
        .from('profile-images')
        .getPublicUrl(`${userDetails.militaryId}/profile.jpeg`);

    if (error) {
        console.error(error);
        throw new Error('failed to fetch profile image');
    }

    return profileImageUrl.publicUrl || '';
}