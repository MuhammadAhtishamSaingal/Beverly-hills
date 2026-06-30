/**
 * Safely triggers a standard Meta Pixel event.
 * @param eventName Standard Meta Pixel event name (e.g. PageView, Lead, Schedule, Contact, InitiateCheckout)
 * @param options Additional properties to pass with the event
 */
export const trackPixelEvent = (eventName: string, options = {}) => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", eventName, options);
    console.log(`[Meta Pixel] Tracked standard event: ${eventName}`, options);
  }
};

/**
 * Safely triggers a custom Meta Pixel event.
 * @param eventName Custom Meta Pixel event name
 * @param options Additional properties to pass with the event
 */
export const trackCustomPixelEvent = (eventName: string, options = {}) => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("trackCustom", eventName, options);
    console.log(`[Meta Pixel] Tracked custom event: ${eventName}`, options);
  }
};
