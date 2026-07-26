/**
 * Safely triggers a standard event in both Meta Pixel and Google Analytics (GA4).
 * @param eventName Event name (e.g. PageView, Lead, Schedule, Contact, InitiateCheckout)
 * @param options Additional properties to pass with the event
 */
export const trackPixelEvent = (eventName: string, options = {}) => {
  if (typeof window !== "undefined") {
    // 1. Meta Pixel
    const fbq = (window as any).fbq;
    if (typeof fbq !== "undefined" && typeof fbq === "function") {
      fbq("track", eventName, options);
      console.log(`[Meta Pixel] Tracked standard event: ${eventName}`, options);
    }

    // 2. Google Analytics (GA4)
    const gtag = (window as any).gtag;
    if (typeof gtag !== "undefined" && typeof gtag === "function") {
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
    if (typeof fbq !== "undefined" && typeof fbq === "function") {
      fbq("trackCustom", eventName, options);
      console.log(`[Meta Pixel] Tracked custom event: ${eventName}`, options);
    }

    // 2. Google Analytics (GA4)
    const gtag = (window as any).gtag;
    if (typeof gtag !== "undefined" && typeof gtag === "function") {
      gtag("event", eventName, options);
      console.log(`[Google Analytics] Tracked custom event: ${eventName}`, options);
    }
  }
};

export interface FormSubmissionPayload {
  formType?: string;
  page?: string;
  location?: string;
  service?: string;
  date?: string;
  timeSlot?: string;
  [key: string]: any;
}

/**
 * Safely triggers Meta Pixel "Lead" and GA4 "form_submission" events on successful form submission.
 */
export const trackFormSubmission = (payload: FormSubmissionPayload = {}) => {
  if (typeof window !== "undefined") {
    const pageLocation = window.location.pathname || "Booking";
    
    const leadParameters = {
      content_name: "Appointment Form Submission",
      formType: payload.formType || "Booking Form",
      page: payload.page || pageLocation,
      location: payload.location || "Sharfabad",
      service: payload.service || "",
      date: payload.date || "",
      time_slot: payload.timeSlot || "",
    };

    // 1. Meta Pixel - Lead event
    const fbq = (window as any).fbq;
    if (typeof fbq !== "undefined" && typeof fbq === "function") {
      const hostname = window.location.hostname;
      if (hostname === "www.beverlyhills.clinic" || hostname === "beverlyhills.clinic") {
        fbq("track", "Lead", {
          value: 1.0,
          currency: "USD",
          content_name: "Booking Form Submission",
          formType: payload.formType || "Booking Form",
          page: payload.page || pageLocation,
          location: payload.location || "Sharfabad",
          service: payload.service || "",
          date: payload.date || "",
          time_slot: payload.timeSlot || "",
        });
        console.log("[Meta Pixel] Tracked 'Lead' event on production domain:", leadParameters);
      } else {
        console.log(`[Meta Pixel] Skipped tracking 'Lead' event on non-production domain: ${hostname}`);
      }
    }

    // 2. Google Analytics (GA4) - form_submission event
    const gtag = (window as any).gtag;
    if (typeof gtag !== "undefined" && typeof gtag === "function") {
      gtag("event", "form_submission", {
        form_name: payload.formType || "Booking Form",
        page_location: window.location.href || pageLocation,
        location: payload.location || "Sharfabad",
        service: payload.service || "",
        date: payload.date || "",
        time_slot: payload.timeSlot || "",
      });
      console.log("[Google Analytics] Tracked 'form_submission' event:", {
        form_name: payload.formType || "Booking Form",
        page_location: window.location.href || pageLocation,
        location: payload.location,
      });
    }
  }
};
