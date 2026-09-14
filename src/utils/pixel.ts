/**
 * Helper to check if current environment is an allowed domain.
 * Supports both production domains (beverlyhills.clinic, beverlyhillsclinic.com.pk) and localhost for testing.
 */
export const isAllowedDomain = (): boolean => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    return (
      hostname === "www.beverlyhills.clinic" ||
      hostname === "beverlyhills.clinic" ||
      hostname === "www.beverlyhillsclinic.com.pk" ||
      hostname === "beverlyhillsclinic.com.pk" ||
      hostname === "localhost" ||
      hostname === "127.0.0.1"
    );
  }
  return false;
};

/**
 * Safely triggers a standard Meta Pixel event with console logging.
 */
export const trackPixelEvent = (eventName: string, options: Record<string, any> = {}) => {
  if (typeof window !== "undefined") {
    const fbq = (window as any).fbq;
    if (typeof fbq === "function") {
      if (isAllowedDomain()) {
        fbq("track", eventName, options);
        console.log("Meta Pixel Event Fired:", eventName, options);
      }
    }

    // Google Analytics (GA4) fallback
    const gtag = (window as any).gtag;
    if (typeof gtag === "function") {
      gtag("event", eventName, options);
      console.log("[Google Analytics] Event Fired:", eventName, options);
    }
  }
};

/**
 * Safely triggers a custom Meta Pixel event with console logging.
 */
export const trackCustomPixelEvent = (eventName: string, options: Record<string, any> = {}) => {
  if (typeof window !== "undefined") {
    const fbq = (window as any).fbq;
    if (typeof fbq === "function") {
      if (isAllowedDomain()) {
        fbq("trackCustom", eventName, options);
        console.log("Meta Pixel Event Fired:", eventName, options);
      }
    }

    // Google Analytics (GA4) fallback
    const gtag = (window as any).gtag;
    if (typeof gtag === "function") {
      gtag("event", eventName, options);
      console.log("[Google Analytics] Custom Event Fired:", eventName, options);
    }
  }
};

/**
 * Event 1: PageView
 * Fires on page load, route changes, homepage, services listing, and service detail pages.
 */
export const trackPageView = (pageType: string = "general") => {
  trackPixelEvent("PageView", { page_type: pageType });
};

/**
 * Event 2: ViewContent
 * Fires when a user opens any service detail page.
 */
export const trackViewContent = (service: { title: string; category?: string }) => {
  const categoryLabel =
    service.category === "dentistry"
      ? "Dental Service"
      : service.category === "aesthetics"
      ? "Aesthetic Treatment"
      : service.category || "Dental Service";

  const eventData = {
    content_name: service.title,
    content_category: categoryLabel,
    content_type: "service"
  };

  trackPixelEvent("ViewContent", eventData);
};

/**
 * Event 3: InitiateBooking
 * Custom event fired when user clicks Book Now / Book Consultation / Header booking button before modal opens.
 */
export const trackInitiateBooking = (serviceName?: string) => {
  const eventData = {
    content_name: serviceName || "General Consultation",
    content_category: "Booking Intent"
  };

  trackCustomPixelEvent("InitiateBooking", eventData);
};

/**
 * Event 4: Lead
 * Standard event fired ONLY after successful API form submission.
 */
export const trackLead = (payload: {
  service?: string;
  location?: string;
  date?: string;
  timeSlot?: string;
  [key: string]: any;
}) => {
  const selectedService = payload.service || "General Consultation";
  const eventData = {
    content_name: selectedService,
    content_category: "Service Booking",
    value: 1,
    currency: "PKR"
  };

  trackPixelEvent("Lead", eventData);
};

/**
 * Alias for backward compatibility with form submission calls.
 */
export const trackFormSubmission = (payload: any = {}) => {
  trackLead(payload);
};
