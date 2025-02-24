import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';  // Adjust the path to your Prisma client
import { PageViews } from '@prisma/client'; // Import the generated Prisma types

// Handle POST requests
export async function POST(req: NextRequest) {
  try {

    const { userId, pageName, deviceType, channel } = await req.json();

    if (!userId || !pageName || !deviceType || !channel) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    // Use upsert to either create a new record or update the existing one
    await prisma.pageViews.upsert({
      where: {
        userId_pageName_deviceType_channel: {
          userId,
          pageName,
          deviceType,
          channel,
        },
      },
      update: {
        views: {
          increment: 1,  // Increment the views
        },
      },
      create: {
        userId,  // Include userId in the create part
        pageName,
        views: 1,  // Initial view count
        deviceType,
        channel,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error storing page view:', error);
    return NextResponse.json({ success: false, message: 'Error storing page view' }, { status: 500 });
  }
}

// Handle GET requests (Optional)
export async function GET() {
  return NextResponse.json({ message: 'This is the page-views API route' });
}
