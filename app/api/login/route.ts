import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';  // Adjust the path to your Prisma client

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    console.log('Attempting login for email:', email);

    // Check if the admin exists in the database
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return NextResponse.json({ message: 'Invalid email' }, { status: 401 });
    }


    // Directly compare the provided password with the one stored in the database
    if (admin.password !== password) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    // Successful login - store session or token
    const response = NextResponse.json({ message: 'Login successful' });
    response.cookies.set('isLoggedIn', 'true', { path: '/' });  // Simple auth tracking using cookies
    return response;
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
