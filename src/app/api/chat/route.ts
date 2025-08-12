import { NextRequest, NextResponse } from "next/server";
import Ably from "ably";

const ably = new Ably.Realtime(process.env.NEXT_PUBLIC_ABLY_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { message, sender, channelId } = await request.json();

    if (!message || !sender || !channelId) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const channel = ably.channels.get(channelId);

    await channel.publish("message", {
      id: Date.now().toString(),
      text: message,
      sender,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Message sent to chat",
    });
  } catch (error) {
    console.error("Error sending chat message:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message" },
      { status: 500 }
    );
  }
}
