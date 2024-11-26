import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';  // Adjust the path to your Prisma client

// Handle POST requests
export async function POST(req: NextRequest) {
  try {
    const { outputId, outputName } = await req.json();

    if (!outputId || !outputName) {
      console.error('Missing required fields:', { outputId, outputName });
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    // Try logging to debug
    console.log('Received data:', { outputId, outputName });

    // Use upsert to either create a new record or update the existing one
    const updatedRecord = await prisma.outputRepetitions.upsert({
      where: {
        output_id: outputId,
      },
      update: {
        count: {
          increment: 1,  // Increment the repetition count
        },
        updated_at: new Date(),
      },
      create: {
        output_id: outputId,
        output_name: outputName,  // Include output name in the create part
        count: 1,  // Initial count
        updated_at: new Date(),
      },
    });

    console.log('Updated record:', updatedRecord);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating output repetition:', error);
    return NextResponse.json({ success: false, message: 'Error updating output repetition' }, { status: 500 });
  }
}
