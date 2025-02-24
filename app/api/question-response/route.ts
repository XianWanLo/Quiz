import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';  // Adjust the path to your Prisma client

// Handle POST requests
export async function POST(req: NextRequest) {
  try {
    const { userId, questionId, questionContent, selectedAnswer } = await req.json();

    // Prepare an array of data entries
    const dataEntries = selectedAnswer.map((answer:string) => ({
      userId,
      questionId,
      questionContent,
      selectedAnswer: answer,  // Store each individual answer
    }));

    // Insert all entries at once
    await prisma.questionResponses.createMany({
      data: dataEntries,
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
