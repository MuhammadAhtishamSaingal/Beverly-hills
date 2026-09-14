import {
  trackPageView,
  trackViewContent,
  trackLead,
  trackInitiateBooking,
  trackContact,
} from "@/lib/metaPixel";

export {
  trackPageView,
  trackViewContent,
  trackLead,
  trackInitiateBooking,
  trackContact,
};

export const isAllowedDomain = (): boolean => {
  return true;
};

export const trackPixelEvent = (eventName: string, options: Record<string, any> = {}) => {
  if (typeof window !== "undefined") {
    const fbq = (window as any).fbq;
    if (typeof fbq === "function") {
      fbq("track", eventName, options);
    }
    const gtag = (window as any).gtag;
    if (typeof gtag === "function") {
      gtag("event", eventName, options);
    }
  }
};

export const trackCustomPixelEvent = (eventName: string, options: Record<string, any> = {}) => {
  if (typeof window !== "undefined") {
    const fbq = (window as any).fbq;
    if (typeof fbq === "function") {
      fbq("trackCustom", eventName, options);
    }
    const gtag = (window as any).gtag;
    if (typeof gtag === "function") {
      gtag("event", eventName, options);
    }
  }
};

export const trackFormSubmission = (payload: any = {}) => {
  trackLead(payload);
};
