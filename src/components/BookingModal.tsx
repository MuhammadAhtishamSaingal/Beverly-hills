"use client";

import { useState, useEffect, useRef } from "react";
import { X, Calendar, MapPin, Sparkles, CheckCircle2, User, Phone, Mail, ArrowLeft, ChevronDown, Video } from "lucide-react";
import Image from "next/image";
import { trackLead } from "@/lib/metaPixel";
import { trackFormSubmission } from "@/utils/pixel";
import { trackAdsConversion } from "@/lib/googleAds";
import Link from "next/link";
import { locations, getLocationById, ONLINE_CONSULTATION_ID, CONSULTATION_FEE } from "@/data/locations";

const studios = [
  ...locations.map((loc) => ({
    id: loc.id,
    name: loc.name,
    desktopImage: loc.desktopImage,
    mobileImage: loc.mobileImage,
    address: loc.address,
    buttonText: `BOOK AT ${loc.shortName.toUpperCase()}`,
    imageClass: undefined as string | undefined,
  })),
  {
    id: ONLINE_CONSULTATION_ID,
    name: "Online Consultation",
    desktopImage: "/images/image 2s.webp",
    mobileImage: "/images/image 2s.webp",
    address: "Consult with our specialists online from the comfort of your home",
    buttonText: "ONLINE CONSULTATION",
    imageClass: "object-cover object-top" as string | undefined,
  },
];

const TRACKING_KEYS = ["gclid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

function readTracking(): Record<string, string> {
  const tracking: Record<string, string> = {};
  if (typeof window === "undefined") return tracking;
  try {
    const params = new URLSearchParams(window.location.search);
    TRACKING_KEYS.forEach((key) => {
      const value = params.get(key);
      if (value) {
        tracking[key] = value;
        sessionStorage.setItem(`bh_${key}`, value);
      } else {
        const stored = sessionStorage.getItem(`bh_${key}`);
        if (stored) tracking[key] = stored;
      }
    });
  } catch {
    // storage can be unavailable (private mode); tracking is optional
  }
  return tracking;
}

const dentalServices = [
  "Hollywood Smile Makeover",
  "Laser Teeth Whitening",
  "Clear Aligner Treatments",
  "Braces Treatment",
  "Dental Implants",
  "Dental Fillings",
  "Dental Veneers, Crowns, Bridges",
  "Root Canal Treatment",
  "Complete Denture",
  "Night Guards",
  "Dental Retainers",
  "Pediatric Dentistry",
  "Tooth Extraction",
  "Wisdom Tooth Extraction",
  "Fixed Dentures",
  "Gummy Smile Treatment",
  "Depigmentation of the Gums",
  "Other"
];

const aestheticServices = [
  "CO2 Fractional Laser (Fotona)",
  "HIFU (Ultraformer III)",
  "Laser Hair Removal (Alma)",
  "Plasma Fibroblast",
  "Polynucleotide Face and Eyes",
  "Fillers: Face, Lips, Hair, Body",
  "Full Face Anti-Wrinkle Rejuvenation",
  "PRP & Exosomes / Stem Cells",
  "Acne and Acne Scars Treatments",
  "PDO Threads",
  "Chemical Peel: Face, Neck, Body",
  "Skin Brightening Therapy",
  "Weight Loss Treatment",
  "Body Fat Lipo",
  "Red Carpet Facial",
  "BH Exfoliating Facial",
  "Micro-Needling with Stem Cells",
  "Exosomes Therapy",
  "Other"
];

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalView, setModalView] = useState<"select_studio" | "form">("select_studio");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "DHA Karachi",
    service: "Hollywood Smile Makeover",
    date: "",
    timeSlot: "Morning",
    notes: "",
    whatsappOk: true,
    consent: false,
  });

  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [serviceSearch, setServiceSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsServiceDropdownOpen(false);
      }
    };
    if (isServiceDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isServiceDropdownOpen]);

  const filteredDental = dentalServices.filter(srv =>
    srv.toLowerCase().includes(serviceSearch.toLowerCase())
  );
  const filteredAesthetics = aestheticServices.filter(srv =>
    srv.toLowerCase().includes(serviceSearch.toLowerCase())
  );

  useEffect(() => {
    readTracking();
  }, []);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent && customEvent.detail && customEvent.detail.service) {
        setFormData((prev) => ({ ...prev, service: customEvent.detail.service }));
      }
      setIsOpen(true);
      setIsSubmitted(false);
      setModalView("select_studio");
    };
    window.addEventListener("open-booking", handleOpen);

    // Escape key closes modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-booking", handleOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.date) {
      alert("Please fill in your name, phone number and preferred date.");
      return;
    }
    if (formData.phone.replace(/\D/g, "").length < 10) {
      alert("Please enter a valid phone number (e.g. 0300 1234567).");
      return;
    }
    if (!formData.consent) {
      alert("Please agree to the Privacy Policy and Appointment Policy to continue.");
      return;
    }
    
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tracking: readTracking(),
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        console.log("✅ Booking request submitted and email sent successfully:", data);
        setIsSubmitted(true);
        trackAdsConversion("booking_submit", {
          clinic: formData.location,
          service: formData.service,
        });
        
        // Trigger Meta Pixel "Lead" event and GA4 "form_submission" event on successful submission
        trackFormSubmission({
          formType: "Booking Form",
          page: typeof window !== "undefined" ? window.location.pathname : "Booking",
          location: formData.location,
          service: formData.service,
          date: formData.date,
          timeSlot: formData.timeSlot,
          content_category: "Service Booking",
        });
      } else {
        console.error("❌ Booking request failed:", data.error);
        alert(data.error || "Failed to submit request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting appointment:", error);
      alert("An unexpected error occurred. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const isCheckbox = e.target instanceof HTMLInputElement && e.target.type === "checkbox";
    setFormData((prev) => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSelectStudio = (studioId: string) => {
    setFormData((prev) => ({ ...prev, location: studioId }));
    setModalView("form");
  };

  const selectedLocation = getLocationById(formData.location);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-text/50 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Background close click */}
      <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

      {/* Modal Content */}
      <div className={`relative w-full max-h-[95vh] sm:max-h-[90vh] flex flex-col transition-all duration-300 ease-out bg-brand-primary border border-brand-secondary/60 rounded-2xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 ${
        isOpen && !isSubmitted && modalView === "select_studio" ? "max-w-4xl" : "max-w-lg"
      }`}>
        {/* Header decoration */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-brand-accent" />

        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-brand-text/50 hover:text-brand-text hover:bg-brand-secondary/40 p-1.5 rounded-full transition-colors z-20"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          modalView === "select_studio" ? (
            <div className="overflow-y-auto p-5 sm:p-8 flex flex-col items-center">
              {/* Divider Decorator */}
              <div className="flex items-center justify-center space-x-3 mb-3 mt-2">
                <div className="w-8 h-[1px] bg-brand-secondary" />
                <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                <div className="w-8 h-[1px] bg-brand-secondary" />
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-normal font-heading text-center text-brand-text mb-8">
                Please select the option<br />you'd like to book
              </h3>

              {/* Studios Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
                {studios.map((studio) => (
                  <div
                    key={studio.id}
                    onClick={() => handleSelectStudio(studio.id)}
                    className="group cursor-pointer bg-[#fcf8f6] border border-brand-secondary/40 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-brand-accent/50 transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Studio Image */}
                    <div className="relative h-48 w-full overflow-hidden bg-brand-secondary/20">
                      <Image
                        src={studio.desktopImage}
                        alt={`${studio.name}`}
                        fill
                        sizes="(max-w-768px) 100vw, 33vw"
                        className={`hidden md:block group-hover:scale-105 transition-transform duration-500 ${studio.imageClass || "object-cover"}`}
                      />
                      <Image
                        src={studio.mobileImage}
                        alt={`${studio.name} Mobile`}
                        fill
                        sizes="(max-w-768px) 100vw, 100vw"
                        className={`block md:hidden group-hover:scale-105 transition-transform duration-500 ${studio.imageClass || "object-cover"}`}
                      />
                      <div className="absolute inset-0 bg-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>

                    {/* Studio details */}
                    <div className="p-5 flex-grow flex flex-col items-center text-center justify-between space-y-4">
                      {/* Badge pin/video icon */}
                      <div className="w-9 h-9 rounded-full bg-brand-primary flex items-center justify-center border border-brand-secondary/20 shadow-xs flex-shrink-0">
                        {studio.id === ONLINE_CONSULTATION_ID ? (
                          <Video className="w-4 h-4 text-brand-accent" />
                        ) : (
                          <MapPin className="w-4 h-4 text-brand-accent" />
                        )}
                      </div>

                      <div className="space-y-1.5 flex-grow flex flex-col justify-center">
                        <h4 className="text-lg font-bold font-heading text-brand-text">
                          {studio.name}
                        </h4>
                        <p className="text-xs text-brand-text/70 leading-relaxed max-w-[200px]">
                          {studio.address}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectStudio(studio.id);
                        }}
                        className="w-full py-2.5 px-2 rounded-full text-[10px] sm:text-xs font-semibold bg-brand-accent text-white uppercase tracking-wider transition-all duration-300 hover:bg-[#936b42] group-hover:scale-102 min-h-[40px] flex items-center justify-center"
                      >
                        {studio.buttonText}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="overflow-y-auto p-5 sm:p-8 flex-grow">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2.5">
                  <Calendar className="w-6 h-6 text-brand-accent" />
                  <h3 className="text-xl font-semibold font-heading text-brand-text">
                    Book an Appointment
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setModalView("select_studio")}
                  className="text-xs font-medium text-brand-accent/80 hover:text-brand-accent hover:underline flex items-center space-x-1 transition-colors"
                  aria-label="Back to clinic selection"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>Change Location</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-brand-text/75 mb-1.5">
                    Full Name <span className="text-brand-accent">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-brand-text/40" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-brand-secondary/60 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
                    />
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-brand-text/75 mb-1.5">
                      Phone Number <span className="text-brand-accent">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-brand-text/40" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="0300 1234567"
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-brand-secondary/60 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-brand-text/75 mb-1.5">
                      Email Address <span className="text-brand-text/40 normal-case font-normal">(optional)</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-brand-text/40" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-brand-secondary/60 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
                      />
                    </div>
                  </div>
                </div>

                {/* Location & Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="location" className="block text-xs font-bold uppercase tracking-wider text-brand-text/75 mb-1.5">
                      Select Clinic Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-brand-text/40 pointer-events-none" />
                      <select
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-10 py-2.5 bg-white border border-brand-secondary/60 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent appearance-none cursor-pointer"
                      >
                        {studios.map((studio) => (
                          <option key={studio.id} value={studio.id}>
                            {studio.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-brand-text/40 pointer-events-none" />
                    </div>
                  </div>
                  <div ref={dropdownRef}>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-text/75 mb-1.5">
                      Select Treatment / Service
                    </label>
                    <div className="relative">
                      <Sparkles className="absolute left-3 top-3.5 w-4 h-4 text-brand-text/40 pointer-events-none z-10" />
                      
                      <button
                        type="button"
                        onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                        className="w-full pl-10 pr-10 py-2.5 bg-white border border-brand-secondary/60 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent text-left flex items-center justify-between cursor-pointer"
                      >
                        <span className="truncate">{formData.service || "Select Treatment / Service"}</span>
                        <ChevronDown className={`w-4 h-4 text-brand-text/40 transition-transform ${isServiceDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isServiceDropdownOpen && (
                        <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-brand-secondary/60 rounded-lg shadow-lg overflow-hidden flex flex-col">
                          {/* Search box */}
                          <div className="p-2 border-b border-brand-secondary/30 bg-[#faf6f3]">
                            <input
                              type="text"
                              placeholder="Search services..."
                              value={serviceSearch}
                              onChange={(e) => setServiceSearch(e.target.value)}
                              className="w-full px-3 py-1.5 text-xs bg-white border border-brand-secondary/40 rounded focus:outline-none focus:border-brand-accent text-brand-text"
                              autoFocus
                            />
                          </div>

                          {/* Scrollable Options List */}
                          <div className="max-h-60 overflow-y-auto divide-y divide-brand-secondary/20">
                            {filteredDental.length > 0 && (
                              <div>
                                <div className="px-3 py-1 text-[10px] font-bold text-brand-text/40 tracking-wider uppercase bg-brand-primary/5">Dental Services</div>
                                {filteredDental.map((srv) => (
                                  <button
                                    key={`dental-${srv}`}
                                    type="button"
                                    onClick={() => {
                                      setFormData(prev => ({ ...prev, service: srv }));
                                      setIsServiceDropdownOpen(false);
                                      setServiceSearch("");
                                    }}
                                    className="w-full text-left px-4 py-2 text-xs text-brand-text hover:bg-brand-secondary/30 transition-colors block truncate cursor-pointer"
                                  >
                                    {srv}
                                  </button>
                                ))}
                              </div>
                            )}

                            {filteredAesthetics.length > 0 && (
                              <div>
                                <div className="px-3 py-1 text-[10px] font-bold text-brand-text/40 tracking-wider uppercase bg-brand-primary/5">Aesthetic Services</div>
                                {filteredAesthetics.map((srv) => (
                                  <button
                                    key={`aesthetic-${srv}`}
                                    type="button"
                                    onClick={() => {
                                      setFormData(prev => ({ ...prev, service: srv }));
                                      setIsServiceDropdownOpen(false);
                                      setServiceSearch("");
                                    }}
                                    className="w-full text-left px-4 py-2 text-xs text-brand-text hover:bg-brand-secondary/30 transition-colors block truncate cursor-pointer"
                                  >
                                    {srv}
                                  </button>
                                ))}
                              </div>
                            )}

                            {filteredDental.length === 0 && filteredAesthetics.length === 0 && (
                              <div className="px-4 py-3 text-xs text-brand-text/50 text-center">No services found</div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-xs font-bold uppercase tracking-wider text-brand-text/75 mb-1.5">
                      Preferred Date <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-white border border-brand-secondary/60 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent cursor-pointer"
                    />
                  </div>
                  <div>
                    <label htmlFor="timeSlot" className="block text-xs font-bold uppercase tracking-wider text-brand-text/75 mb-1.5">
                      Time Preference
                    </label>
                    <div className="relative">
                      <select
                        id="timeSlot"
                        name="timeSlot"
                        value={formData.timeSlot}
                        onChange={handleInputChange}
                        className="w-full pl-4 pr-10 py-2.5 bg-white border border-brand-secondary/60 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent appearance-none cursor-pointer"
                      >
                        <option value="Morning">Morning (8:00 AM - 12:00 PM)</option>
                        <option value="Afternoon">Afternoon (12:00 PM - 4:00 PM)</option>
                        <option value="Evening">Evening (4:00 PM - 6:00 PM)</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-brand-text/40 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="notes" className="block text-xs font-bold uppercase tracking-wider text-brand-text/75 mb-1.5">
                    Special Notes / Concerns
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={2}
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Tell us any details or comfort preferences..."
                    className="w-full px-4 py-2 bg-white border border-brand-secondary/60 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent resize-none"
                  />
                </div>

                {/* Consultation fee, WhatsApp & consent */}
                <div className="rounded-lg bg-[#fcf8f6] border border-brand-secondary/40 px-4 py-3 text-xs text-brand-text/80 leading-relaxed">
                  <strong className="text-brand-text">Consultation fee: {CONSULTATION_FEE}</strong>{" "}
                  (payable at the clinic). Our team will call you to confirm your appointment time
                  {selectedLocation ? <> at <strong className="text-brand-text">{selectedLocation.name}</strong>, {selectedLocation.address}</> : " for your online consultation"}.
                </div>

                <label className="flex items-start space-x-2.5 text-xs text-brand-text/80 cursor-pointer">
                  <input
                    type="checkbox"
                    name="whatsappOk"
                    checked={formData.whatsappOk}
                    onChange={handleInputChange}
                    className="mt-0.5 w-4 h-4 accent-[#ab7f51] cursor-pointer"
                  />
                  <span>You can contact me on WhatsApp at this number.</span>
                </label>

                <label className="flex items-start space-x-2.5 text-xs text-brand-text/80 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    required
                    className="mt-0.5 w-4 h-4 accent-[#ab7f51] cursor-pointer"
                  />
                  <span>
                    I agree to the{" "}
                    <Link href="/privacy-policy" target="_blank" className="text-brand-accent underline">Privacy Policy</Link>{" "}
                    and{" "}
                    <Link href="/appointment-policy" target="_blank" className="text-brand-accent underline">Appointment Policy</Link>
                    , and confirm the details above are correct. <span className="text-brand-accent">*</span>
                  </span>
                </label>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-3 text-sm font-semibold tracking-wide flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <span>Request Appointment</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )
        ) : (
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-brand-accent animate-bounce" />
            <h3 className="text-2xl font-bold font-heading text-brand-text">
              Appointment Requested!
            </h3>
            <p className="text-sm text-brand-text/70 max-w-sm">
              Thank you, <strong className="text-brand-text">{formData.name}</strong>. We have received your request for <strong>{formData.service}</strong>{" "}
              {selectedLocation ? <>at our <strong>{selectedLocation.name}</strong></> : <>as an <strong>online consultation</strong></>}{" "}
              on <strong>{formData.date} ({formData.timeSlot})</strong>.
            </p>
            {selectedLocation && (
              <p className="text-xs text-brand-text/60 max-w-sm">{selectedLocation.address}</p>
            )}
            <p className="text-xs text-brand-text/50">
              Our team will call you{formData.whatsappOk ? " or message you on WhatsApp" : ""} at <strong>{formData.phone}</strong> shortly to confirm your appointment. Consultation fee: {CONSULTATION_FEE}.
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="btn-secondary w-full py-2.5 mt-4"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
