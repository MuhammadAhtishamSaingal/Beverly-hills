"use client";

import { useState, useEffect, useRef } from "react";
import { X, Calendar, MapPin, Sparkles, CheckCircle2, User, Phone, Mail, ArrowLeft, ChevronDown, Video } from "lucide-react";
import Image from "next/image";
import { trackPixelEvent, trackFormSubmission } from "@/utils/pixel";

const studios = [
  {
    id: "DHA Karachi",
    name: "DHA Karachi Clinic",
    desktopImage: "/images/DESKTOP4_MARQE_1200.webp",
    mobileImage: "/images/MOBILE4_MARQE.webp",
    address: "2nd Floor, Main Saba Avenue, Phase 5, DHA Karachi, Karachi",
    buttonText: "BOOK NOW",
  },
  {
    id: "Online Consultation",
    name: "Online Consultation",
    desktopImage: "/images/people-team.webp",
    mobileImage: "/images/people-team.webp",
    address: "Consult with our specialists online from the comfort of your home",
    buttonText: "ONLINE CONSULTATION",
    imageClass: "object-cover object-top",
  },
];

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
  "Full Face Botox Rejuvenation",
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
  });

  const [bookingLink, setBookingLink] = useState("");
  const originalUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (!originalUrlRef.current && typeof window !== "undefined") {
        originalUrlRef.current = window.location.pathname + window.location.search + window.location.hash;
      }
      
      const origin = typeof window !== "undefined" ? window.location.origin : "https://www.beverlyhills.clinic";
      const params = new URLSearchParams();
      params.set("clinic_location", formData.location);
      params.set("treatment_service", formData.service);
      if (formData.date) {
        params.set("preselected_date", formData.date);
      }
      
      const newUrl = `${origin}/booking?${params.toString()}`;
      if (typeof window !== "undefined") {
        window.history.pushState(null, "", newUrl);
      }
      setBookingLink(newUrl);
    } else {
      if (originalUrlRef.current && typeof window !== "undefined") {
        window.history.pushState(null, "", originalUrlRef.current);
        originalUrlRef.current = null;
      }
    }
  }, [isOpen, formData.location, formData.service, formData.date]);

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
    const handleOpen = () => {
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
    if (!formData.name || !formData.email || !formData.phone || !formData.date) {
      alert("Please fill in all required fields.");
      return;
    }
    
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        console.log("✅ Booking request submitted and email sent successfully:", data);
        setIsSubmitted(true);
        
        // Trigger Meta Pixel "Lead" event and GA4 "form_submission" event on successful submission
        trackFormSubmission({
          formType: "Booking Form",
          page: typeof window !== "undefined" ? window.location.pathname : "Booking",
          location: formData.location,
          service: formData.service,
          date: formData.date,
          timeSlot: formData.timeSlot,
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectStudio = (studioId: string) => {
    setFormData((prev) => ({ ...prev, location: studioId }));
    setModalView("form");
  };

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
                        {studio.id === "Online Consultation" ? (
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
                      placeholder="Hashim Iqbal"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-brand-secondary/60 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-brand-text/75 mb-1.5">
                      Email Address <span className="text-brand-accent">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-brand-text/40" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="info@clinicbeverlyhills.com"
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-brand-secondary/60 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
                      />
                    </div>
                  </div>
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
                        placeholder="+923070984307"
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
                        <option value="DHA Karachi">DHA Karachi Clinic</option>
                        <option value="Online Consultation">Online Consultation</option>
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

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    data-booking-link={bookingLink}
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
              Thank you, <strong className="text-brand-text">{formData.name}</strong>. We have received your request for <strong>{formData.service}</strong> at our <strong>{formData.location}</strong> clinic on <strong>{formData.date} ({formData.timeSlot})</strong>.
            </p>
            <p className="text-xs text-brand-text/50">
              A member of our team will contact you shortly via email ({formData.email}) or phone ({formData.phone}) to finalize your appointment time.
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
