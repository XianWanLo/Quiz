import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { userId, startTime, deviceType, channel } = await req.json();

    await prisma.gameMetrics.create({
      data: {
        userId,
        startTime: new Date(startTime),
        endTime: new Date(startTime), // Placeholder until completion
        timeSpent: 0, // Will be calculated at completion
        deviceType,
        channel,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking game start:', error);
    return NextResponse.json({ success: false, message: 'Error tracking game start' }, { status: 500 });
  }
}
