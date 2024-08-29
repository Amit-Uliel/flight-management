'use server';

import { cookies } from 'next/headers';

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