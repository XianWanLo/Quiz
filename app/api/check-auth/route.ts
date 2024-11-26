import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Get the cookies from the request
    const isLoggedIn = req.cookies.get('isLoggedIn')?.value === 'true';

    // Return JSON response with the login status
    return NextResponse.json({ isLoggedIn });
  } catch (error) {
    console.error('Error in check-auth API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
