"use client";

import { useEffect } from "react";
import { trackAdsConversion } from "@/lib/googleAds";

/** Reports every phone and WhatsApp link click on the site as a Google Ads conversion. */
export default function ConversionClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest?.("a");
      const href = link?.getAttribute("href") || "";
      if (href.startsWith("tel:")) {
        trackAdsConversion("call_click", { link_id: link?.id || "", page_path: window.location.pathname });
      } else if (/wa\.me|whatsapp\.com/i.test(href)) {
        trackAdsConversion("whatsapp_click", { link_id: link?.id || "", page_path: window.location.pathname });
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
