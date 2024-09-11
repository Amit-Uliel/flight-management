import { redirect } from 'next/navigation';
import { getUserDetails, getUserName, getRoleName, getRank, getProfileImageUrl } from '@/utils/getUserDetails';

export default async function PrivatePage() {


  // Use the getUserDetails function to retrieve user data
  const userDetails = await getUserDetails();

  if (!userDetails || !userDetails.role) {
    redirect('/login');
  }

  // Retrieve user name, role, and rank using utility functions
  const userName = await getUserName();
  const userRole = await getRoleName();
  const userRank = await getRank();
  let userImage = null;

  try{
    userImage = await getProfileImageUrl();
  } catch (error) {
    console.error(error.message);
  }

  return (
    <div>
      <p>Hello {userName}</p>
      {userRole && <p>Your role is: {userRole}</p>}
      {userRank && <p>Your rank is: {userRank}</p>}
      {userDetails && <p>Your squadron is: {userDetails.squadronId}</p>}
      {userImage && (
        <div style={{ width: '60px', height: '60px', overflow: 'hidden', borderRadius: '50%' }}>
          <img
            src={userImage}
            alt={`${userName}'s profile`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}
    </div>
  );
}