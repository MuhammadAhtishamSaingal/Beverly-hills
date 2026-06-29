import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, phone, location, service, date, timeSlot, notes } = await request.json();

    // Configure Nodemailer transporter with user's Gmail details
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "beverlyhillsofficiallll@gmail.com",
        pass: "tpuwdjzwnbxtzypi", // Stripped spaces from "tpuw djzw nbxt zypi"
      },
    });

    const mailOptions = {
      from: `"Beverly Hills Clinic" <beverlyhillsofficiallll@gmail.com>`,
      to: "beverlyhillsofficiallll@gmail.com",
      subject: `🦷 New Appointment Request - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>New Appointment Request</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6ede7; margin: 0; padding: 40px 10px; -webkit-font-smoothing: antialiased;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e8ceb1;">
            <!-- Header Block -->
            <tr>
              <td align="center" style="background-color: #3d2e2a; padding: 30px 20px; border-bottom: 3px solid #e8ceb1;">
                <span style="font-size: 28px; display: block; margin-bottom: 10px;">🦷</span>
                <h1 style="color: #ffffff; font-size: 20px; font-weight: 600; margin: 0; letter-spacing: 0.5px;">New Appointment Request</h1>
                <p style="color: #e8ceb1; font-size: 13px; margin: 5px 0 0 0; opacity: 0.9;">Customer requesting booking details</p>
              </td>
            </tr>
            <!-- Content Block -->
            <tr>
              <td style="padding: 30px 20px; background-color: #fcfaf8;">
                <!-- Group Header -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px;">
                  <tr>
                    <td style="font-size: 16px; font-weight: bold; color: #3d2e2a; padding-bottom: 5px;">
                      👤 Customer Information
                    </td>
                  </tr>
                </table>
                
                <!-- Field 1: Name -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 12px; background-color: #ffffff; border-radius: 8px; border-left: 4px solid #10b981; box-shadow: 0 1px 3px rgba(0,0,0,0.02); border-top: 1px solid #f3ebe4; border-right: 1px solid #f3ebe4; border-bottom: 1px solid #f3ebe4;">
                  <tr>
                    <td style="padding: 12px 15px;">
                      <span style="font-size: 10px; font-weight: bold; color: #8c766e; text-transform: uppercase; letter-spacing: 0.8px; display: block;">Full Name</span>
                      <span style="font-size: 14px; font-weight: 600; color: #2d2a26; display: block; margin-top: 2px;">${name}</span>
                    </td>
                  </tr>
                </table>

                <!-- Field 2: Phone -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 12px; background-color: #ffffff; border-radius: 8px; border-left: 4px solid #3b82f6; box-shadow: 0 1px 3px rgba(0,0,0,0.02); border-top: 1px solid #f3ebe4; border-right: 1px solid #f3ebe4; border-bottom: 1px solid #f3ebe4;">
                  <tr>
                    <td style="padding: 12px 15px;">
                      <span style="font-size: 10px; font-weight: bold; color: #8c766e; text-transform: uppercase; letter-spacing: 0.8px; display: block;">Phone Number</span>
                      <a href="tel:${phone}" style="font-size: 14px; font-weight: 600; color: #2d2a26; text-decoration: none; display: block; margin-top: 2px;">${phone}</a>
                    </td>
                  </tr>
                </table>

                <!-- Field 3: Email -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 12px; background-color: #ffffff; border-radius: 8px; border-left: 4px solid #8b5cf6; box-shadow: 0 1px 3px rgba(0,0,0,0.02); border-top: 1px solid #f3ebe4; border-right: 1px solid #f3ebe4; border-bottom: 1px solid #f3ebe4;">
                  <tr>
                    <td style="padding: 12px 15px;">
                      <span style="font-size: 10px; font-weight: bold; color: #8c766e; text-transform: uppercase; letter-spacing: 0.8px; display: block;">Email Address</span>
                      <a href="mailto:${email}" style="font-size: 14px; font-weight: 600; color: #2d2a26; text-decoration: none; display: block; margin-top: 2px;">${email}</a>
                    </td>
                  </tr>
                </table>

                <!-- Field 4: Location -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 12px; background-color: #ffffff; border-radius: 8px; border-left: 4px solid #f59e0b; box-shadow: 0 1px 3px rgba(0,0,0,0.02); border-top: 1px solid #f3ebe4; border-right: 1px solid #f3ebe4; border-bottom: 1px solid #f3ebe4;">
                  <tr>
                    <td style="padding: 12px 15px;">
                      <span style="font-size: 10px; font-weight: bold; color: #8c766e; text-transform: uppercase; letter-spacing: 0.8px; display: block;">Studio Location</span>
                      <span style="font-size: 14px; font-weight: 600; color: #2d2a26; display: block; margin-top: 2px;">${location} Studio</span>
                    </td>
                  </tr>
                </table>

                <!-- Field 5: Service -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 12px; background-color: #ffffff; border-radius: 8px; border-left: 4px solid #ef4444; box-shadow: 0 1px 3px rgba(0,0,0,0.02); border-top: 1px solid #f3ebe4; border-right: 1px solid #f3ebe4; border-bottom: 1px solid #f3ebe4;">
                  <tr>
                    <td style="padding: 12px 15px;">
                      <span style="font-size: 10px; font-weight: bold; color: #8c766e; text-transform: uppercase; letter-spacing: 0.8px; display: block;">Service Needed</span>
                      <span style="font-size: 14px; font-weight: 600; color: #2d2a26; display: block; margin-top: 2px;">${service}</span>
                    </td>
                  </tr>
                </table>

                <!-- Field 6: Date -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 12px; background-color: #ffffff; border-radius: 8px; border-left: 4px solid #06b6d4; box-shadow: 0 1px 3px rgba(0,0,0,0.02); border-top: 1px solid #f3ebe4; border-right: 1px solid #f3ebe4; border-bottom: 1px solid #f3ebe4;">
                  <tr>
                    <td style="padding: 12px 15px;">
                      <span style="font-size: 10px; font-weight: bold; color: #8c766e; text-transform: uppercase; letter-spacing: 0.8px; display: block;">Preferred Date</span>
                      <span style="font-size: 14px; font-weight: 600; color: #2d2a26; display: block; margin-top: 2px;">${date}</span>
                    </td>
                  </tr>
                </table>

                <!-- Field 7: Time Slot -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 12px; background-color: #ffffff; border-radius: 8px; border-left: 4px solid #ec4899; box-shadow: 0 1px 3px rgba(0,0,0,0.02); border-top: 1px solid #f3ebe4; border-right: 1px solid #f3ebe4; border-bottom: 1px solid #f3ebe4;">
                  <tr>
                    <td style="padding: 12px 15px;">
                      <span style="font-size: 10px; font-weight: bold; color: #8c766e; text-transform: uppercase; letter-spacing: 0.8px; display: block;">Preferred Contact Time</span>
                      <span style="font-size: 14px; font-weight: 600; color: #2d2a26; display: block; margin-top: 2px;">${timeSlot}</span>
                    </td>
                  </tr>
                </table>

                <!-- Field 8: Notes -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 5px; background-color: #ffffff; border-radius: 8px; border-left: 4px solid #6366f1; box-shadow: 0 1px 3px rgba(0,0,0,0.02); border-top: 1px solid #f3ebe4; border-right: 1px solid #f3ebe4; border-bottom: 1px solid #f3ebe4;">
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
              <td align="center" style="background-color: #3d2e2a; padding: 15px 20px; text-align: center;">
                <span style="font-size: 11px; color: #e8ceb1; opacity: 0.8;">&copy; 2026 Beverly Hills Clinic Karachi. All rights reserved.</span>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Nodemailer error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
