/**
 * Safely triggers a standard event in both Meta Pixel and Google Analytics (GA4).
 * @param eventName Event name (e.g. PageView, Lead, Schedule, Contact, InitiateCheckout)
 * @param options Additional properties to pass with the event
 */
export const trackPixelEvent = (eventName: string, options = {}) => {
  if (typeof window !== "undefined") {
    // 1. Meta Pixel
    const fbq = (window as any).fbq;
    if (typeof fbq === "function") {
      fbq("track", eventName, options);
      console.log(`[Meta Pixel] Tracked standard event: ${eventName}`, options);
    }

    // 2. Google Analytics (GA4)
    const gtag = (window as any).gtag;
    if (typeof gtag === "function") {
      gtag("event", eventName, options);
      console.log(`[Google Analytics] Tracked standard event: ${eventName}`, options);
    }
  }
};

/**
 * Safely triggers a custom event in both Meta Pixel and Google Analytics (GA4).
 * @param eventName Custom event name
 * @param options Additional properties to pass with the event
 */
export const trackCustomPixelEvent = (eventName: string, options = {}) => {
  if (typeof window !== "undefined") {
    // 1. Meta Pixel
    const fbq = (window as any).fbq;
    if (typeof fbq === "function") {
      fbq("trackCustom", eventName, options);
      console.log(`[Meta Pixel] Tracked custom event: ${eventName}`, options);
    }

    // 2. Google Analytics (GA4)
    const gtag = (window as any).gtag;
    if (typeof gtag === "function") {
      gtag("event", eventName, options);
      console.log(`[Google Analytics] Tracked custom event: ${eventName}`, options);
    }
  }
};
