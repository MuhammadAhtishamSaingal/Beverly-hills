import { NextResponse } from "next/server";
import { sendBookingEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, location, service, date, timeSlot, notes } = body;

    if (!name || !email || !phone || !date) {
      return NextResponse.json(
        { success: false, error: "Missing required booking details (name, email, phone, or date)." },
        { status: 400 }
      );
    }

    console.log(`📥 API Route /api/booking: Received booking request from ${name} (${email})`);

    const result = await sendBookingEmail({
      name,
      email,
      phone,
      location,
      service,
      date,
      timeSlot,
      notes,
    });

    return NextResponse.json({ success: true, messageId: result.messageId });
  } catch (error: any) {
    console.error("❌ API Route /api/booking Exception:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error sending email" },
      { status: 500 }
    );
  }
}
