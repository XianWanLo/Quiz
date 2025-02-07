import { EmailTemplate } from '../../components/emailTemplate';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

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

    const data = await resend.emails.send({
      from: 'YourApp <noreply@yourdomain.com>',
      to: email,
      subject: 'MBTI Perfume Quiz Result',
      react: EmailTemplate({ firstName, imageSrc }),
    });

    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
