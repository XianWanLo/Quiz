import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';  // Adjust the path based on your project structure

export async function GET(req: NextRequest) {
  try {
    // Fetch metrics from the database
    const totalUsers = await prisma.gameMetrics.count();
    const totalGameStarts = await prisma.gameMetrics.count();
    const totalGameCompletions = await prisma.gameMetrics.count();
    
    const avgGameTime = await prisma.gameMetrics.aggregate({
      _avg: {
        timeSpent: true,
      },
    });

    const pageViews = await prisma.pageViews.groupBy({
      by: ['page'],
      _sum: { views: true },
    });

    const deviceTraffic = await prisma.pageViews.groupBy({
      by: ['deviceType'],
      _count: { deviceType: true },
    });

    const channelTraffic = await prisma.pageViews.groupBy({
      by: ['channel'],
      _count: { channel: true },
    });

    const avgResponseTimeByPage = await prisma.pageResponseTimes.groupBy({
      by: ['page'],
      _avg: { responseTime: true },
    });

    const questionData = await prisma.questionResponses.groupBy({
      by: ['questionId', 'selectedAnswer'],
      _count: { selectedAnswer: true },
    });
  // Fetch output repetition data
  const outputRepetition = await prisma.outputRepetitions.findMany({
    select: {
      output_id: true,
      output_name: true,
      count: true,
    },
  });
    return NextResponse.json({
      totalUsers,
      totalGameStarts,
      totalGameCompletions,
      avgGameTime: avgGameTime._avg.timeSpent,
      pageViews,
      deviceTraffic,
      channelTraffic,
      avgResponseTimeByPage,
      questionData,
      outputRepetition,  // Include output repetition in the response
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ message: 'Error fetching stats' }, { status: 500 });
  }
}
