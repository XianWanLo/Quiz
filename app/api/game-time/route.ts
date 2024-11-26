import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

// Named export for POST method
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  // Destructure the data from the request body
  const { userId, startTime, endTime, deviceType, channel } = req.body;

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
    res.status(200).json({ success: true });
  } catch (error) {
    // Log the error and send a response with failure message
    console.error('Error storing game metrics:', error);
    res.status(500).json({ success: false, message: 'Error storing game metrics' });
  }
}