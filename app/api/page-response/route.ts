// File: api/page-response/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';  // Adjust the path based on your project structure

// Handle POST requests to log page response times
export async function POST(req: NextRequest) {
  try {
    const { userId, page, deviceType, channel, responseTime } = await req.json();

    if (!userId || !page || !deviceType || !channel || responseTime === undefined) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    // Insert the response time data into the PageResponseTimes table
    await prisma.pageResponseTimes.create({
      data: {
        userId,
        page,
        responseTime,
        deviceType,
        channel,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error storing page response time:', error);
    return NextResponse.json({ success: false, message: 'Error storing page response time' }, { status: 500 });
  }
}
