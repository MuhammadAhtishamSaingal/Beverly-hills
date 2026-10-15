import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import PixelTracker from "@/components/PixelTracker";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileActionBar from "@/components/MobileActionBar";
import ConversionClickTracker from "@/components/ConversionClickTracker";

const headingFont = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://beverlyhillsclinic.com.pk"),
  title: "Beverly Hills Clinic Karachi | Smile Makeovers, Implants & Aesthetics",
  description:
    "Premium dental and aesthetic clinic in DHA Phase 5 and Bahadurabad, Karachi. Smile makeovers with E-max and Zirconia veneers in about 10 days, dental implants, exosomes, lip fillers and signature facials.",
  openGraph: {
    title: "Beverly Hills Clinic Karachi | Smile Makeovers, Implants & Aesthetics",
    description: "Premium dental and aesthetic clinic in DHA Phase 5 and Bahadurabad, Karachi.",
    siteName: "Beverly Hills Clinic",
    locale: "en_PK",
    type: "website",
  },
  other: {
    "facebook-domain-verification": "60pcjbqki5024g90oqys05a5dvg784",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased scroll-smooth`}
    >
      <head>
      </head>
      <body className="min-h-full flex flex-col bg-brand-primary text-brand-text">
        <Script
          id="meta-pixel"
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
              fbq('init', '1036445405456107');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1036445405456107&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <PixelTracker />
        <GoogleAnalytics />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <BookingModal />
        <WhatsAppButton />
        <MobileActionBar />
        <ConversionClickTracker />
      </body>
    </html>
  );
}
