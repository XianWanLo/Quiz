import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { userId, startTime, endTime, timeSpent, deviceType, channel } = await req.json();

    // Update the existing game record with the end time and time spent
    await prisma.gameMetrics.updateMany({
      where: {
        userId,
        startTime: new Date(startTime),
      },
      data: {
        endTime: new Date(endTime),
        timeSpent,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error completing game:', error);
    return NextResponse.json({ success: false, message: 'Error completing game' }, { status: 500 });
  }
}
