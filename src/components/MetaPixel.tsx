"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "998442089761373";

function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const isProd = hostname === "www.beverlyhills.clinic" || hostname === "beverlyhills.clinic";
      if (isProd && (window as any).fbq && PIXEL_ID) {
        (window as any).fbq("track", "PageView");
      }
    }
  }, [pathname, searchParams]);

  return null;
}

export default function MetaPixel() {
  return (
    <>
      {/* Meta Pixel Base Code */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var hostname = window.location.hostname;
            if (hostname === 'www.beverlyhills.clinic' || hostname === 'beverlyhills.clinic') {
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('set', 'autoConfig', false, '${PIXEL_ID}');
              fbq('init', '${PIXEL_ID}');
              fbq('track', 'PageView');
            } else {
              console.log("[Meta Pixel] Initialization skipped on non-production domain: " + hostname);
            }
          `,
        }}
      />
      {/* Noscript Fallback */}
      {process.env.NODE_ENV === "production" && (
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      )}
      {/* Route Navigation Event Listener */}
      <Suspense fallback={null}>
        <NavigationEvents />
      </Suspense>
    </>
  );
}

