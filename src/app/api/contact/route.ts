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
    // ✅ initialize clients only when needed
    const supabase = getSupabaseClient();
    const resend = getResendClient();
    const transporter = getTransporter();

    const formData = await request.formData();

    // Extract form data
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;
    const preferredContact = formData.get("preferredContact") as string;
    const hearAbout = formData.get("hearAbout") as string;
    const subscribe = formData.get("subscribe") === "true";
    const saveInfo = formData.get("saveInfo") === "true";
    const location = formData.get("location") as string;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "Required fields are missing" },
        { status: 400 }
      );
    }

    // Handle file uploads
    const files = formData.getAll("files") as File[];
    const fileUrls: string[] = [];

    for (const file of files) {
      if (file.size > 0) {
        // Validate file size (e.g., limit to 5MB)
        if (file.size > 5 * 1024 * 1024) {
          console.error(`File ${file.name} exceeds size limit`);
          continue;
        }

        const fileName = `${Date.now()}-${file.name}`;
        const { error } = await supabase.storage
          .from("contact-files")
          .upload(fileName, file);

        if (error) {
          console.error("File upload error:", error);
          continue;
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("contact-files").getPublicUrl(fileName);
        fileUrls.push(publicUrl);
      }
    }

    // Save contact data to Supabase
    const { data: contactData, error: contactError } = await supabase
      .from("contacts")
      .insert([
        {
          name,
          email,
          phone: phone || null,
          subject,
          message,
          preferredContact,
          hearAbout,
          subscribe,
          saveInfo,
          location,
          fileUrls,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (contactError) {
      console.error("Contact save error:", contactError);
      return NextResponse.json(
        { success: false, message: "Failed to save contact information" },
        { status: 500 }
      );
    }

    // Prepare email content
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong> ${message}</p>
      <p><strong>Preferred Contact:</strong> ${preferredContact}</p>
      <p><strong>How they heard about you:</strong> ${hearAbout}</p>
      <p><strong>Subscribe:</strong> ${subscribe ? "Yes" : "No"}</p>
      <p><strong>Save Info:</strong> ${saveInfo ? "Yes" : "No"}</p>
      <p><strong>Location:</strong> ${location}</p>
      ${
        fileUrls.length > 0
          ? `<h3>Attached Files:</h3><ul>${fileUrls
              .map((url) => `<li><a href="${url}">${url}</a></li>`)
              .join("")}</ul>`
          : ""
      }
    `;

    // Auto-reply content
    const autoReplyContent = `
      <h2>Thank You!</h2>
      <p>Hi ${name},</p>
      <p>I've received your message regarding "${subject}".</p>
      <p>I'll get back to you within 24-48 hours.</p>
      <p>Best regards,<br>Rakib</p>
    `;

    // Send notification email (Resend first, Gmail fallback)
    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL!,
        to: process.env.TO_EMAIL!,
        subject: `New Contact Form Submission: ${subject}`,
        html: emailContent,
      });
    } catch (resendError) {
      console.error("Resend error:", resendError);
      try {
        await transporter.sendMail({
          from: process.env.FROM_EMAIL!,
          to: process.env.TO_EMAIL!,
          subject: `New Contact Form Submission: ${subject}`,
          html: emailContent,
        });
      } catch (gmailError) {
        console.error("Gmail error:", gmailError);
      }
    }

    // Auto-reply
    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL!,
        to: email,
        subject: `Thank you for contacting me, ${name}!`,
        html: autoReplyContent,
      });
    } catch (autoReplyError) {
      console.error("Auto-reply error:", autoReplyError);
      try {
        await transporter.sendMail({
          from: process.env.FROM_EMAIL!,
          to: email,
          subject: `Thank you for contacting me, ${name}!`,
          html: autoReplyContent,
        });
      } catch (gmailAutoReplyError) {
        console.error("Gmail auto-reply error:", gmailAutoReplyError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
      data: contactData,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
