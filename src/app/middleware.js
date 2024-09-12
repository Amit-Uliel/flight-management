import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

// Your JWT Secret for signing the token
const JWT_SECRET = process.env.SUPABASE_JWT_SECRET;

export async function updateSession(request) {
  const token = request.cookies.get('token')?.value;

  // If no token is found, redirect to login
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Here you can use the decoded data if needed
    // For example, you can add user data to the request object or perform any additional checks

    // If everything is fine, proceed
    return NextResponse.next();
  } catch (error) {
    console.error('JWT verification failed:', error);

    // If the token is invalid or expired, redirect to login
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
}

// Export the config as is
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};