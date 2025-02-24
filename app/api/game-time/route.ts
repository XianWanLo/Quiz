import { NextRequest, NextResponse } from 'next/server'; // Updated import
import { prisma } from '@/lib/prisma';

// Named export for POST method
export async function POST(req: NextRequest) { // Changed to NextRequest
   // Destructure the data from the request body
   const { userId, startTime, endTime, deviceType, channel } = await req.json(); // Updated to use req.json()

  // Calculate the time spent in seconds
  const timeSpent = (new Date(endTime).getTime() - new Date(startTime).getTime()) / 1000; // in seconds

  try {
    // Store the game metrics in the database
    await prisma.gameMetrics.create({
      data: {
        userId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        timeSpent,
        deviceType,
        channel,
      },
    });

    // Respond with success
    return NextResponse.json({ success: true }); // Updated response
  } catch (error) {
    // Log the error and send a response with failure message
    console.error('Error storing game metrics:', error);
    return NextResponse.json({ success: false, message: 'Error storing game metrics' }, { status: 500 }); // Updated response
  }
}