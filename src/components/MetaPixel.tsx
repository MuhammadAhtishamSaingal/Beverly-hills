"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "998442089761373";

function NavigationEvents({ isProd }: { isProd: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isProd && typeof window !== "undefined" && (window as any).fbq && PIXEL_ID) {
      (window as any).fbq("track", "PageView");
    }
  }, [pathname, searchParams, isProd]);

  return null;
}

export default function MetaPixel() {
  const [isProd, setIsProd] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const isProdDomain = hostname === "www.beverlyhills.clinic" || hostname === "beverlyhills.clinic";
      setIsProd(isProdDomain);
    }
  }, []);

  if (!mounted || !isProd) {
    return null;
  }

  return (
    <>
      {/* Meta Pixel Base Code */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
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
        <NavigationEvents isProd={isProd} />
      </Suspense>
    </>
  );
}
