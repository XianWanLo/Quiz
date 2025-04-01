import { EmailTemplate } from '../../components/emailTemplate';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, firstName, imageSrc } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Ensure imageName is provided
    if (!imageSrc) {
      return NextResponse.json({ error: "Missing image name" }, { status: 400 });
    }

    // Resolve the image path
    const imagePath = path.join(process.cwd(), 'public', imageSrc);
    // Read the image file
    const imageBuffer = fs.readFileSync(imagePath);

    const data = await resend.emails.send({
      from: 'MBTI Perfume Quiz <noreply@mail.vision-verse.tech>', 
      to: email,
      subject: 'MBTI Perfume Quiz Result',
      react: EmailTemplate({ firstName }),
      attachments: [
        {
          filename: path.basename(imageSrc),
          content: imageBuffer.toString('base64'),
          contentType: 'image/png', // Ensure the correct content type
        },
      ],
    });

    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
