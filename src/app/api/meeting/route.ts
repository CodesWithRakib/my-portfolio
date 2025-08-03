import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import nodemailer from "nodemailer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

// Create Nodemailer transporter for Gmail - Fixed method name
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { date, time, type, email, name } = await request.json();

    // Save meeting to Supabase
    const { data, error } = await supabase
      .from("meetings")
      .insert([
        {
          date,
          time,
          type,
          email,
          name,
          status: "scheduled",
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Meeting save error:", error);
      return NextResponse.json(
        { success: false, message: "Failed to schedule meeting" },
        { status: 500 }
      );
    }

    // Generate meeting link (using Jitsi)
    const meetingLink = `https://meet.jit.si/${Date.now()}-${Math.random().toString(36).substring(7)}`;

    // Send meeting confirmation email using Resend (primary)
    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL!,
        to: email,
        subject: `Meeting Scheduled: ${date} at ${time}`,
        html: `
          <h2>Meeting Confirmed!</h2>
          <p>Hi ${name},</p>
          <p>Your meeting has been scheduled for:</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Type:</strong> ${type}</p>
          <p><strong>Meeting Link:</strong> <a href="${meetingLink}">${meetingLink}</a></p>
          <p>I look forward to our conversation!</p>
          <p>Best regards,<br>Rakib</p>
        `,
      });
    } catch (resendError) {
      console.error("Resend meeting email error:", resendError);
      // Fallback to Nodemailer with Gmail
      try {
        await transporter.sendMail({
          from: process.env.FROM_EMAIL!,
          to: email,
          subject: `Meeting Scheduled: ${date} at ${time}`,
          html: `
            <h2>Meeting Confirmed!</h2>
            <p>Hi ${name},</p>
            <p>Your meeting has been scheduled for:</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Type:</strong> ${type}</p>
            <p><strong>Meeting Link:</strong> <a href="${meetingLink}">${meetingLink}</a></p>
            <p>I look forward to our conversation!</p>
            <p>Best regards,<br>Rakib</p>
          `,
        });
      } catch (gmailError) {
        console.error("Gmail meeting email error:", gmailError);
      }
    }

    // Send notification to yourself
    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL!,
        to: process.env.TO_EMAIL!,
        subject: `New Meeting Scheduled with ${name}`,
        html: `
          <h2>New Meeting Scheduled</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Type:</strong> ${type}</p>
          <p><strong>Meeting Link:</strong> <a href="${meetingLink}">${meetingLink}</a></p>
        `,
      });
    } catch (notificationError) {
      console.error("Meeting notification error:", notificationError);
      // Fallback to Nodemailer with Gmail
      try {
        await transporter.sendMail({
          from: process.env.FROM_EMAIL!,
          to: process.env.TO_EMAIL!,
          subject: `New Meeting Scheduled with ${name}`,
          html: `
            <h2>New Meeting Scheduled</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Type:</strong> ${type}</p>
            <p><strong>Meeting Link:</strong> <a href="${meetingLink}">${meetingLink}</a></p>
          `,
        });
      } catch (gmailNotificationError) {
        console.error("Gmail notification error:", gmailNotificationError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Meeting scheduled successfully!",
      data: { ...data, meetingLink },
    });
  } catch (error) {
    console.error("Meeting API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
