import { NextResponse } from "next/server";
import { sendBookingEmail } from "@/lib/email";

const clean = (value: unknown, max = 500) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = clean(body.name, 120);
    const email = clean(body.email, 200);
    const phone = clean(body.phone, 40);
    const date = clean(body.date, 40);

    if (!name || !phone || !date) {
      return NextResponse.json(
        { success: false, error: "Missing required booking details (name, phone, or date)." },
        { status: 400 }
      );
    }

    if (phone.replace(/\D/g, "").length < 10) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid phone number." },
        { status: 400 }
      );
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address or leave it empty." },
        { status: 400 }
      );
    }

    if (body.consent !== true) {
      return NextResponse.json(
        { success: false, error: "Please agree to the Privacy Policy and Appointment Policy." },
        { status: 400 }
      );
    }

    const tracking: Record<string, string> = {};
    if (body.tracking && typeof body.tracking === "object") {
      for (const [key, value] of Object.entries(body.tracking)) {
        const v = clean(value, 300);
        if (v) tracking[clean(key, 40)] = v;
      }
    }

    console.log(`📥 API Route /api/booking: Received booking request from ${name}`);

    const result = await sendBookingEmail({
      name,
      email,
      phone,
      location: clean(body.location, 80),
      service: clean(body.service, 120),
      date,
      timeSlot: clean(body.timeSlot, 40),
      notes: clean(body.notes, 2000),
      patientType: clean(body.patientType, 40),
      source: clean(body.source, 80),
      whatsappOk: body.whatsappOk === true,
      pageUrl: clean(body.pageUrl, 500),
      tracking,
    });

    return NextResponse.json({ success: true, messageId: result.messageId });
  } catch (error: any) {
    console.error("❌ API Route /api/booking Exception:", error);
    return NextResponse.json(
      { success: false, error: "We could not send your request right now. Please call 0307-0984307 or try again." },
      { status: 500 }
    );
  }
}
