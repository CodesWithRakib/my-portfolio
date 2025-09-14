import { NextRequest, NextResponse } from "next/server";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import nodemailer from "nodemailer";

// ✅ Lazy init helpers with updated environment variable names
function getSupabaseClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Missing Supabase environment variables");
  }
  return createClient(url, key);
}

function getResendClient(): Resend {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Missing Resend API key");
  }
  return new Resend(process.env.RESEND_API_KEY);
}

function getTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Missing Gmail credentials");
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    // ✅ Initialize only inside handler
    const supabase = getSupabaseClient();
    const resend = getResendClient();
    const transporter = getTransporter();

    const { date, time, type, email, name } = await request.json();

    // Basic validation
    if (!date || !time || !type || !email || !name) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

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
    const meetingLink = `https://meet.jit.si/${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)}`;

    // Email content for user confirmation
    const userConfirmationContent = `
      <h2>Meeting Confirmed!</h2>
      <p>Hi ${name},</p>
      <p>Your meeting has been scheduled for:</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Type:</strong> ${type}</p>
      <p><strong>Meeting Link:</strong> <a href="${meetingLink}">${meetingLink}</a></p>
      <p>I look forward to our conversation!</p>
      <p>Best regards,<br>Rakib</p>
    `;

    // Email content for self notification
    const selfNotificationContent = `
      <h2>New Meeting Scheduled</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Type:</strong> ${type}</p>
      <p><strong>Meeting Link:</strong> <a href="${meetingLink}">${meetingLink}</a></p>
    `;

    // Send confirmation to the user
    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL!,
        to: email,
        subject: `Meeting Scheduled: ${date} at ${time}`,
        html: userConfirmationContent,
      });
    } catch (resendError) {
      console.error("Resend meeting email error:", resendError);
      try {
        await transporter.sendMail({
          from: process.env.FROM_EMAIL!,
          to: email,
          subject: `Meeting Scheduled: ${date} at ${time}`,
          html: userConfirmationContent,
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
        html: selfNotificationContent,
      });
    } catch (notificationError) {
      console.error("Meeting notification error:", notificationError);
      try {
        await transporter.sendMail({
          from: process.env.FROM_EMAIL!,
          to: process.env.TO_EMAIL!,
          subject: `New Meeting Scheduled with ${name}`,
          html: selfNotificationContent,
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
