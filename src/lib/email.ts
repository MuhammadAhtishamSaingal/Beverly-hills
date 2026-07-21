import nodemailer from "nodemailer";

export interface BookingEmailPayload {
  name: string;
  email: string;
  phone: string;
  location: string;
  service: string;
  date: string;
  timeSlot: string;
  notes?: string;
}

/**
 * Creates and returns a Nodemailer transporter using environment variables.
 */
function getTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.error("❌ NodeMailer Error: EMAIL_USER or EMAIL_PASS environment variables are missing.");
    throw new Error("Email service misconfigured: Missing environment credentials.");
  }

  // Remove any whitespace from Google App Password
  const sanitizedPass = pass.replace(/\s+/g, "");

  return nodemailer.createTransport({
    service: "gmail",
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
  const { name, email, phone, location, service, date, timeSlot, notes } = payload;
  const recipientEmail = process.env.EMAIL_USER || "clinicbeverlyhills@gmail.com";

  console.log(`📧 [NodeMailer] Preparing appointment email for: ${name} (${email})`);

  const transporter = getTransporter();

  const mailOptions = {
    from: `"Beverly Hills Dental Clinic" <${process.env.EMAIL_USER || "clinicbeverlyhills@gmail.com"}>`,
    to: recipientEmail,
    replyTo: email,
    subject: `🦷 New Appointment Request - ${name}`,
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
              
              <!-- Name -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 12px; background-color: #ffffff; border-radius: 8px; border-left: 4px solid #10b981; border-top: 1px solid #f3ebe4; border-right: 1px solid #f3ebe4; border-bottom: 1px solid #f3ebe4;">
                <tr>
                  <td style="padding: 12px 15px;">
                    <span style="font-size: 10px; font-weight: bold; color: #8c766e; text-transform: uppercase; letter-spacing: 0.8px; display: block;">Full Name</span>
                    <span style="font-size: 14px; font-weight: 600; color: #2d2a26; display: block; margin-top: 2px;">${name}</span>
                  </td>
                </tr>
              </table>

              <!-- Phone -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 12px; background-color: #ffffff; border-radius: 8px; border-left: 4px solid #3b82f6; border-top: 1px solid #f3ebe4; border-right: 1px solid #f3ebe4; border-bottom: 1px solid #f3ebe4;">
                <tr>
                  <td style="padding: 12px 15px;">
                    <span style="font-size: 10px; font-weight: bold; color: #8c766e; text-transform: uppercase; letter-spacing: 0.8px; display: block;">Phone Number</span>
                    <a href="tel:${phone}" style="font-size: 14px; font-weight: 600; color: #2d2a26; text-decoration: none; display: block; margin-top: 2px;">${phone}</a>
                  </td>
                </tr>
              </table>

              <!-- Email -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 12px; background-color: #ffffff; border-radius: 8px; border-left: 4px solid #8b5cf6; border-top: 1px solid #f3ebe4; border-right: 1px solid #f3ebe4; border-bottom: 1px solid #f3ebe4;">
                <tr>
                  <td style="padding: 12px 15px;">
                    <span style="font-size: 10px; font-weight: bold; color: #8c766e; text-transform: uppercase; letter-spacing: 0.8px; display: block;">Email Address</span>
                    <a href="mailto:${email}" style="font-size: 14px; font-weight: 600; color: #2d2a26; text-decoration: none; display: block; margin-top: 2px;">${email}</a>
                  </td>
                </tr>
              </table>

              <!-- Location -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 12px; background-color: #ffffff; border-radius: 8px; border-left: 4px solid #f59e0b; border-top: 1px solid #f3ebe4; border-right: 1px solid #f3ebe4; border-bottom: 1px solid #f3ebe4;">
                <tr>
                  <td style="padding: 12px 15px;">
                    <span style="font-size: 10px; font-weight: bold; color: #8c766e; text-transform: uppercase; letter-spacing: 0.8px; display: block;">Location / Type</span>
                    <span style="font-size: 14px; font-weight: 600; color: #2d2a26; display: block; margin-top: 2px;">${location.includes("Consultation") ? location : `${location} Studio`}</span>
                  </td>
                </tr>
              </table>

              <!-- Service -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 12px; background-color: #ffffff; border-radius: 8px; border-left: 4px solid #ef4444; border-top: 1px solid #f3ebe4; border-right: 1px solid #f3ebe4; border-bottom: 1px solid #f3ebe4;">
                <tr>
                  <td style="padding: 12px 15px;">
                    <span style="font-size: 10px; font-weight: bold; color: #8c766e; text-transform: uppercase; letter-spacing: 0.8px; display: block;">Requested Treatment</span>
                    <span style="font-size: 14px; font-weight: 600; color: #2d2a26; display: block; margin-top: 2px;">${service}</span>
                  </td>
                </tr>
              </table>

              <!-- Date -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 12px; background-color: #ffffff; border-radius: 8px; border-left: 4px solid #06b6d4; border-top: 1px solid #f3ebe4; border-right: 1px solid #f3ebe4; border-bottom: 1px solid #f3ebe4;">
                <tr>
                  <td style="padding: 12px 15px;">
                    <span style="font-size: 10px; font-weight: bold; color: #8c766e; text-transform: uppercase; letter-spacing: 0.8px; display: block;">Preferred Date</span>
                    <span style="font-size: 14px; font-weight: 600; color: #2d2a26; display: block; margin-top: 2px;">${date}</span>
                  </td>
                </tr>
              </table>

              <!-- Time Slot -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 12px; background-color: #ffffff; border-radius: 8px; border-left: 4px solid #ec4899; border-top: 1px solid #f3ebe4; border-right: 1px solid #f3ebe4; border-bottom: 1px solid #f3ebe4;">
                <tr>
                  <td style="padding: 12px 15px;">
                    <span style="font-size: 10px; font-weight: bold; color: #8c766e; text-transform: uppercase; letter-spacing: 0.8px; display: block;">Time Preference</span>
                    <span style="font-size: 14px; font-weight: 600; color: #2d2a26; display: block; margin-top: 2px;">${timeSlot}</span>
                  </td>
                </tr>
              </table>

              <!-- Notes -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 5px; background-color: #ffffff; border-radius: 8px; border-left: 4px solid #6366f1; border-top: 1px solid #f3ebe4; border-right: 1px solid #f3ebe4; border-bottom: 1px solid #f3ebe4;">
                <tr>
                  <td style="padding: 12px 15px;">
                    <span style="font-size: 10px; font-weight: bold; color: #8c766e; text-transform: uppercase; letter-spacing: 0.8px; display: block;">Special Notes / Concerns</span>
                    <span style="font-size: 13px; color: #4a4542; display: block; margin-top: 4px; line-height: 1.4;">${notes || "No special concerns listed."}</span>
                  </td>
                </tr>
              </table>
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
