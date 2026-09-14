"use client";

import { useEffect, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { trackPageView, isAllowedDomain } from "@/utils/pixel";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "998442089761373";

function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip firing PageView on initial render since script tag handles initial PageView
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (typeof window !== "undefined" && isAllowedDomain()) {
      const pageType = pathname === "/" ? "homepage" : pathname.startsWith("/services/") ? "service_detail" : "page";
      trackPageView(pageType);
    }
  }, [pathname, searchParams]);

  return null;
}

export default function MetaPixel() {
  return (
    <>
      {/* Meta Pixel Base Code - Single Initialization */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var hostname = window.location.hostname;
            var isAllowed =
              hostname === 'www.beverlyhills.clinic' ||
              hostname === 'beverlyhills.clinic' ||
              hostname === 'www.beverlyhillsclinic.com.pk' ||
              hostname === 'beverlyhillsclinic.com.pk' ||
              hostname === 'localhost' ||
              hostname === '127.0.0.1';

            if (isAllowed) {
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
              fbq('track', 'PageView', { page_type: window.location.pathname === '/' ? 'homepage' : 'page' });
              console.log('Meta Pixel Event Fired: PageView', { page_type: window.location.pathname });
            } else {
              console.log("[Meta Pixel] Initialization skipped on non-allowed domain: " + hostname);
            }
          `,
        }}
      />
      {/* Noscript Fallback */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      {/* Route Navigation Event Listener */}
      <Suspense fallback={null}>
        <NavigationEvents />
      </Suspense>
    </>
  );
}
