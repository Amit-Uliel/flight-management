"use server";

import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { getUserDetails, getUserName, getRoleName } from '@/utils/getUserDetails'; // Import functions from your action file

export default async function PrivatePage() {
  const supabase = createClient();

  // Use the getUserDetails function to retrieve user data
  const userDetails = await getUserDetails();

  if (!userDetails || !userDetails.role) {
    redirect('/login'); // Redirect to login if no user details are found or role is not set
  }

  // Retrieve user name and role using utility functions
  const userName = await getUserName();
  const userRole = await getRoleName();

  return (
    <div>
      <p>Hello {userName}</p>
      {userRole && <p>Your role is: {userRole}</p>}
      {userDetails && <p>Your squadron is: {userDetails.squadronId}</p>}
    </div>
  );
}