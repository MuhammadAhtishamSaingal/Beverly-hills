/**
 * Google Ads conversion tracking.
 *
 * Tag and labels come from Google Ads > Goals > Conversions
 * ("Website Booking Form", "Website Call Click", "Website WhatsApp Click").
 */
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18471753711";

const CONVERSION_LABELS: Record<ConversionKey, string> = {
  booking_submit: process.env.NEXT_PUBLIC_GADS_LABEL_BOOKING || "JwzrCM2zhJ4dEO-vguhE",
  call_click: process.env.NEXT_PUBLIC_GADS_LABEL_CALL || "0dwFCNCzhJ4dEO-vguhE",
  whatsapp_click: process.env.NEXT_PUBLIC_GADS_LABEL_WHATSAPP || "s5u6CNOzhJ4dEO-vguhE",
};

export type ConversionKey = "booking_submit" | "call_click" | "whatsapp_click";

export function trackAdsConversion(key: ConversionKey, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as any).gtag;
  if (typeof gtag !== "function") return;

  // Always record a GA4/gtag event so Analytics can import it as a conversion too.
  gtag("event", key, params);

  const label = CONVERSION_LABELS[key];
  if (GOOGLE_ADS_ID && label) {
    gtag("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/${label}`, ...params });
  }
}
