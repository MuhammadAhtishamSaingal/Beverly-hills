"use client";

import { useState, useEffect } from "react";
import { X, Calendar, MapPin, Sparkles, CheckCircle2, User, Phone, Mail } from "lucide-react";

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "Sharfabad",
    service: "Cleanings & Checkups",
    date: "",
    timeSlot: "Morning",
    notes: "",
  });

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setIsSubmitted(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.date) {
      alert("Please fill in all required fields.");
      return;
    }
    // Simulate API request
    setIsSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-text/50 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Background close click */}
      <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-brand-primary border border-brand-secondary/60 rounded-2xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header decoration */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-brand-accent" />

        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-brand-text/50 hover:text-brand-text hover:bg-brand-secondary/40 p-1.5 rounded-full transition-colors"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div className="p-6 sm:p-8">
            <div className="flex items-center space-x-2.5 mb-6">
              <Calendar className="w-6 h-6 text-brand-accent" />
              <h3 className="text-xl font-semibold font-heading text-brand-text">
                Book an Appointment
              </h3>
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
                    placeholder="Jane Doe"
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
                      placeholder="jane@example.com"
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
                      placeholder="(415) 555-0100"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-brand-secondary/60 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
                    />
                  </div>
                </div>
              </div>

              {/* Location & Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="location" className="block text-xs font-bold uppercase tracking-wider text-brand-text/75 mb-1.5">
                    Select Studio Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-brand-text/40" />
                    <select
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-brand-secondary/60 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent appearance-none cursor-pointer"
                    >
                      <option value="Sharfabad">Sharfabad Studio</option>
                      <option value="Badar Commercial">Badar Commercial Studio</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-brand-text/75 mb-1.5">
                    Select Treatment / Service
                  </label>
                  <div className="relative">
                    <Sparkles className="absolute left-3 top-3 w-4 h-4 text-brand-text/40" />
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-brand-secondary/60 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent appearance-none cursor-pointer"
                    >
                      <option value="Cleanings & Checkups">Cleanings & Checkups</option>
                      <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
                      <option value="Specialty Care">Specialty Care</option>
                      <option value="Emergency Care">Emergency Care</option>
                      <option value="New Patient Consultation">New Patient Consultation</option>
                    </select>
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
                  <select
                    id="timeSlot"
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-white border border-brand-secondary/60 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent appearance-none cursor-pointer"
                  >
                    <option value="Morning">Morning (8:00 AM - 12:00 PM)</option>
                    <option value="Afternoon">Afternoon (12:00 PM - 4:00 PM)</option>
                    <option value="Evening">Evening (4:00 PM - 6:00 PM)</option>
                  </select>
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
                  className="btn-primary w-full py-3 text-sm font-semibold tracking-wide"
                >
                  Request Appointment
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-brand-accent animate-bounce" />
            <h3 className="text-2xl font-bold font-heading text-brand-text">
              Appointment Requested!
            </h3>
            <p className="text-sm text-brand-text/70 max-w-sm">
              Thank you, <strong className="text-brand-text">{formData.name}</strong>. We have received your request for <strong>{formData.service}</strong> at our <strong>{formData.location}</strong> studio on <strong>{formData.date} ({formData.timeSlot})</strong>.
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
