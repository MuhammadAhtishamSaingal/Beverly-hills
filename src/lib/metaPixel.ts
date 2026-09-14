declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

const debugLog = (eventName: string, eventData?: any) => {
  if (process.env.NODE_ENV === "development") {
    console.log("Meta Pixel Event:", eventName, eventData);
  }
};

/**
 * Track global PageView event
 */
export const trackPageView = (pageName?: string) => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "PageView");
    debugLog("PageView", pageName ? { page: pageName } : undefined);
  }
};

/**
 * Track ViewContent event for services or pages
 */
export const trackViewContent = (
  data: { title?: string; content_name?: string; category?: string; content_category?: string } | string
) => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    const title = typeof data === "string" ? data : data.content_name || data.title || "Service Page";
    const category = typeof data === "string" ? "General" : data.content_category || data.category || "General";
    
    const eventPayload = {
      content_name: title,
      content_category: category,
    };
    
    window.fbq("track", "ViewContent", eventPayload);
    debugLog("ViewContent", eventPayload);
  }
};

/**
 * Track Lead event ONLY after successful booking submission
 */
export const trackLead = (
  source?: string | { content_name?: string; service?: string; formType?: string; content_category?: string } | Record<string, any>
) => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    const contentName =
      typeof source === "string"
        ? source
        : source?.content_name || source?.service || source?.formType || "Booking Form";
    const contentCategory =
      typeof source === "object" && source?.content_category
        ? source.content_category
        : "Service Booking";

    const eventPayload = {
      content_name: contentName,
      content_category: contentCategory,
    };

    window.fbq("track", "Lead", eventPayload);
    debugLog("Lead", eventPayload);
  }
};

/**
 * Track InitiateBooking custom event when user clicks booking CTAs
 */
export const trackInitiateBooking = (
  source: string | { content_name: string; content_category?: string }
) => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    const contentName = typeof source === "string" ? source : source.content_name;
    const contentCategory = typeof source === "string" ? "Booking Intent" : source.content_category || "Booking Intent";

    const eventPayload = {
      content_name: contentName,
      content_category: contentCategory,
    };

    window.fbq("trackCustom", "InitiateBooking", eventPayload);
    debugLog("InitiateBooking", eventPayload);
  }
};

/**
 * Track Contact event when user clicks phone call links
 */
export const trackContact = (
  source?: string | { content_name: string; content_category?: string }
) => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    const contentName = typeof source === "string" ? (source || "Phone Call") : source?.content_name || "Phone Call";
    const contentCategory = typeof source === "object" && source?.content_category ? source.content_category : "Contact Action";

    const eventPayload = {
      content_name: contentName,
      content_category: contentCategory,
    };

    window.fbq("track", "Contact", eventPayload);
    debugLog("Contact", eventPayload);
  }
};

