import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';  // Adjust the path to your Prisma client

// Handle POST requests
export async function POST(req: NextRequest) {
  try {
    const { questionId, selectedAnswer, userId } = await req.json();

    // Store question response in the database
    await prisma.questionResponses.create({
      data: {
        questionId,
        selectedAnswer,
        userId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error storing question response:', error);
    return NextResponse.json({ success: false, message: 'Error storing question response' }, { status: 500 });
  }
}

// Handle GET requests (Optional)
export async function GET() {
  return NextResponse.json({ message: 'This is the question-response API route' });
}
