/**
 * Google Ads conversion tracking.
 *
 * Fill in GOOGLE_ADS_ID ("AW-XXXXXXXXX") and the conversion labels from
 * Google Ads > Goals > Conversions once the conversion actions exist.
 * While they are empty, nothing is loaded or sent.
 */
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "";

const CONVERSION_LABELS: Record<ConversionKey, string> = {
  booking_submit: process.env.NEXT_PUBLIC_GADS_LABEL_BOOKING || "",
  call_click: process.env.NEXT_PUBLIC_GADS_LABEL_CALL || "",
  whatsapp_click: process.env.NEXT_PUBLIC_GADS_LABEL_WHATSAPP || "",
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
