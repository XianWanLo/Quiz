import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    // Get the cookies from the request
    const cookieStore = cookies();
    const isLoggedIn = cookieStore.get('isLoggedIn')?.value === 'true';

    // Return JSON response with the login status
    return NextResponse.json({ isLoggedIn });
  } catch (error) {
    console.error('Error in check-auth API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}