import nodemailer from "nodemailer";
import { getLocationById } from "@/data/locations";

export interface BookingEmailPayload {
  name: string;
  email: string;
  phone: string;
  location: string;
  service: string;
  date: string;
  timeSlot: string;
  notes?: string;
  whatsappOk?: boolean;
  pageUrl?: string;
  tracking?: Record<string, string>;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

function row(label: string, valueHtml: string, color: string) {
  return `
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 12px; background-color: #ffffff; border-radius: 8px; border-left: 4px solid ${color}; border-top: 1px solid #f3ebe4; border-right: 1px solid #f3ebe4; border-bottom: 1px solid #f3ebe4;">
                <tr>
                  <td style="padding: 12px 15px;">
                    <span style="font-size: 10px; font-weight: bold; color: #8c766e; text-transform: uppercase; letter-spacing: 0.8px; display: block;">${label}</span>
                    <span style="font-size: 14px; font-weight: 600; color: #2d2a26; display: block; margin-top: 2px; line-height: 1.4;">${valueHtml}</span>
                  </td>
                </tr>
              </table>`;
}

/**
 * Creates and returns a Nodemailer transporter using environment variables.
 */
function getTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const host = process.env.EMAIL_HOST || "smtp.gmail.com";
  const port = process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : 465;

  if (!user || !pass) {
    console.error("❌ NodeMailer Error: EMAIL_USER or EMAIL_PASS environment variables are missing.");
    throw new Error("Email service misconfigured: Missing environment credentials.");
  }

  // Remove any whitespace from Google App Password
  const sanitizedPass = pass.replace(/\s+/g, "");

  return nodemailer.createTransport({
    host: host,
    port: port,
    secure: port === 465,
    auth: {
      user: user,
      pass: sanitizedPass,
    },
  });
}

/**
 * Sends a booking confirmation email to the clinic owner/admin.
 */
export async function sendBookingEmail(payload: BookingEmailPayload) {
  const e = (v?: string) => escapeHtml(v || "");
  const { name, email, phone, location, service, date, timeSlot, notes } = payload;
  const branch = getLocationById(location);
  const phoneDigits = phone.replace(/[^\d+]/g, "");
  const waNumber = phone.replace(/\D/g, "").replace(/^0/, "92");
  const submittedAt = new Date().toLocaleString("en-GB", { timeZone: "Asia/Karachi" });
  const trackingText = Object.entries(payload.tracking || {})
    .map(([k, v]) => `${e(k)}: ${e(v)}`)
    .join("<br>");

  const rowsHtml = [
    row("Full Name", e(name), "#10b981"),
    row(
      "Phone Number",
      `<a href="tel:${e(phoneDigits)}" style="color:#2d2a26;text-decoration:none;">${e(phone)}</a>` +
        (payload.whatsappOk
          ? ` &nbsp;·&nbsp; <a href="https://wa.me/${e(waNumber)}" style="color:#25D366;">WhatsApp OK</a>`
          : " &nbsp;·&nbsp; <span style=\"color:#8c766e;\">No WhatsApp</span>"),
      "#3b82f6"
    ),
    row("Email Address", email ? `<a href="mailto:${e(email)}" style="color:#2d2a26;text-decoration:none;">${e(email)}</a>` : "Not provided", "#8b5cf6"),
    row(
      "Clinic / Type",
      branch ? `${e(branch.name)}<br><span style="font-weight:400;font-size:12px;color:#6b5f59;">${e(branch.address)}</span>` : e(location),
      "#f59e0b"
    ),
    row("Requested Treatment", e(service), "#ef4444"),
    row("Preferred Date & Time", `${e(date)} · ${e(timeSlot)}`, "#06b6d4"),
    row("Special Notes / Concerns", e(notes) || "No special concerns listed.", "#6366f1"),
    row(
      "Lead Details",
      `Submitted: ${e(submittedAt)} (PKT)<br>Page: ${e(payload.pageUrl) || "-"}${trackingText ? `<br>${trackingText}` : ""}`,
      "#94a3b8"
    ),
  ].join("");

  const recipientEmail = process.env.EMAIL_USER || "clinicbeverlyhills@gmail.com";

  console.log(`📧 [NodeMailer] Preparing appointment email for: ${name} (${email})`);

  const transporter = getTransporter();

  const mailOptions = {
    from: `"Beverly Hills Dental Clinic" <${process.env.EMAIL_USER || "clinicbeverlyhills@gmail.com"}>`,
    to: recipientEmail,
    ...(email ? { replyTo: email } : {}),
    subject: `🦷 New Appointment: ${name} · ${branch ? branch.shortName : location} · ${service}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Appointment Request</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6ede7; margin: 0; padding: 40px 10px; -webkit-font-smoothing: antialiased;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 540px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e8ceb1;">
          <!-- Header Block -->
          <tr>
            <td align="center" style="background-color: #3d2e2a; padding: 32px 20px; border-bottom: 3px solid #e8ceb1;">
              <span style="font-size: 32px; display: block; margin-bottom: 8px;">🦷</span>
              <h1 style="color: #ffffff; font-size: 22px; font-weight: 600; margin: 0; letter-spacing: 0.5px;">New Appointment Request</h1>
              <p style="color: #e8ceb1; font-size: 13px; margin: 6px 0 0 0; opacity: 0.9;">Beverly Hills Dental Clinic Booking System</p>
            </td>
          </tr>
          <!-- Content Block -->
          <tr>
            <td style="padding: 30px 24px; background-color: #fcfaf8;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px;">
                <tr>
                  <td style="font-size: 16px; font-weight: bold; color: #3d2e2a; padding-bottom: 5px;">
                    👤 Patient Details
                  </td>
                </tr>
              </table>
              
              ${rowsHtml}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="background-color: #3d2e2a; padding: 16px 20px; text-align: center;">
              <span style="font-size: 11px; color: #e8ceb1; opacity: 0.8;">&copy; ${new Date().getFullYear()} Beverly Hills Dental Clinic Karachi. All rights reserved.</span>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ [NodeMailer] Email sent successfully! MessageID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error("❌ [NodeMailer] Error sending email:", error);
    throw error;
  }
}
