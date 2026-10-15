"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { GOOGLE_ADS_ID } from "@/lib/googleAds";

const GA_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const TAG_IDS = [GA_ID, GOOGLE_ADS_ID].filter(Boolean) as string[];

function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag && GA_ID) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
      (window as any).gtag("config", GA_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export default function GoogleAnalytics() {
  if (TAG_IDS.length === 0) {
    return null;
  }

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics & Google Ads */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${TAG_IDS[0]}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            ${GA_ID ? `gtag('config', '${GA_ID}', { page_path: window.location.pathname });` : ""}
            ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}', { allow_ad_personalization_signals: false });` : ""}
          `,
        }}
      />
      <Suspense fallback={null}>
        <NavigationEvents />
      </Suspense>
    </>
  );
}
