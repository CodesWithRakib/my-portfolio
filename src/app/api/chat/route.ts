import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import * as Ably from "ably"; // Changed import to namespace import

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Initialize Ably
const ably = new Ably.Rest(process.env.NEXT_PUBLIC_ABLY_API_KEY!); // Use Ably.Rest with namespace import

export async function POST(request: NextRequest) {
  try {
    const {
      message,
      sender,
      channelId = "contact-chat",
    } = await request.json();

    // Save chat message to Supabase
    const { data, error } = await supabase
      .from("chat_messages")
      .insert([
        {
          text: message,
          sender,
          timestamp: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Chat save error:", error);
      return NextResponse.json(
        { success: false, message: "Failed to save message" },
        { status: 500 }
      );
    }

    // Publish message to Ably channel for real-time updates
    try {
      const channel = ably.channels.get(channelId);
      await channel.publish("message", {
        id: data.id,
        text: message,
        sender,
        timestamp: data.timestamp,
      });
    } catch (ablyError) {
      console.error("Ably publish error:", ablyError);
      // Don't fail the request if Ably fails
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
      data,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get recent chat messages
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .order("timestamp", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Chat fetch error:", error);
      return NextResponse.json(
        { success: false, message: "Failed to fetch messages" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data || [],
    });
  } catch (error) {
    console.error("Chat fetch error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
