import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function PrivatePage() {
  const supabase = createClient();
  const cookieStore = cookies(); // Access the cookies

  const userData = cookieStore.get('userData')?.value; // Retrieve the userData cookie
  const user = userData ? JSON.parse(userData) : null; // Parse the JSON string

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <div>
      <p>Hello {data.user.email}</p>
      {user && <p>Your role is: {user.role}</p>} {/* Display user role if available */}
      {user && <p>Your name is: {user.name}</p>} {/* Display user name if available */}
      {user && <p>Your squadron is: {user.squadronId}</p>}
    </div>
  );
}