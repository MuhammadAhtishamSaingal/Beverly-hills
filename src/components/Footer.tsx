"use client";

import { useState } from "react";
import Link from "next/link";
import { trackInitiateBooking, trackContact } from "@/lib/metaPixel";
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Award,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Accordion state for mobile screens
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    explore: false,
    dental: false,
    aesthetic: false,
    info: false,
  });

  const toggleSection = (sectionKey: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  const handleOpenBooking = () => {
    trackInitiateBooking("Footer Book Consultation");
    window.dispatchEvent(new CustomEvent("open-booking"));
  };

  const exploreLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/patients" },
    { label: "Services", href: "/services" },
    { label: "Patients", href: "/patients" },
    { label: "Contact Us", href: "/contact" },
    { label: "Clinic Tour", href: "/clinic-tour" },
    { label: "Dentists", href: "/doctors" },
    { label: "Blogs", href: "/blog" },
  ];

  const dentalServicesList = [
    { label: "Dental Implants", href: "/services/dental-implants" },
    { label: "Teeth Whitening", href: "/services/teeth-whitening" },
    { label: "Clear Aligners", href: "/services/clear-aligners" },
    { label: "Braces Treatment", href: "/services/braces-treatment" },
    { label: "Root Canal Treatment", href: "/services/root-canal-treatment" },
    { label: "Dental Veneers & Crowns", href: "/services/dental-veneers-crowns-bridges" },
    { label: "Hollywood Smile Makeover", href: "/services/hollywood-smile-makeover" },
    { label: "Dental Fillings", href: "/services/dental-fillings" },
  ];

  const aestheticServicesList = [
    { label: "Botox Treatment", href: "/services/botox-treatment" },
    { label: "Dermal Fillers", href: "/services/dermal-fillers" },
    { label: "Laser Hair Removal", href: "/services/laser-hair-removal" },
    { label: "HIFU Treatment", href: "/services/hifu-treatment" },
    { label: "PRP Therapy", href: "/services/prp-therapy" },
    { label: "Chemical Peel", href: "/services/chemical-peel" },
    { label: "Skin Brightening", href: "/services/skin-brightening-therapy" },
    { label: "Exosomes Therapy", href: "/services/exosomes-therapy" },
  ];

  return (
    <footer className="bg-[#2d221f] text-[#f6ede7] border-t border-[#3e322e] pt-6 md:pt-16 pb-8" aria-label="Site Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 5-Column Grid Layout (Desktop & Tablet) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-10 lg:gap-8 pb-6 md:pb-12 border-b border-[#3e322e]">
          
          {/* Column 1: Brand Section */}
          <div className="lg:col-span-1 flex flex-col space-y-2 md:space-y-4 lg:-mt-10 mb-2 md:mb-0">
            <Link href="/" aria-label="Beverly Hills Clinic Homepage" className="inline-block">
              <img
                src="/images/logo.png"
                alt="Beverly Hills Clinic Logo"
                className="w-[160px] sm:w-[180px] h-auto object-contain mix-blend-screen invert transition-all duration-300 hover:opacity-90"
                loading="lazy"
              />
            </Link>
            <p className="hidden md:block text-xs text-[#e8ceb1]/90 leading-relaxed font-light">
              Beverly Hills Clinic is a premium dental and aesthetic clinic in DHA Karachi providing advanced dental treatments, cosmetic dentistry, implants, orthodontics, and aesthetic procedures with modern technology and experienced specialists.
            </p>
            
            {/* Trust Highlights */}
            <div className="hidden md:block pt-2 space-y-2 text-[11px] text-[#f6ede7]/70 border-t border-[#3e322e]/60">
              <div className="flex items-center space-x-2">
                <Award className="w-3.5 h-3.5 text-[#c39f75] shrink-0" />
                <span>UK & US Trained Specialists</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-3.5 h-3.5 text-[#c39f75] shrink-0" />
                <span>3D CBCT Digital Scanners</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c39f75] shrink-0" />
                <span>Hospital-Grade Sterilization</span>
              </div>
            </div>
          </div>

          {/* Column 2: Explore Navigation */}
          <div className="flex flex-col lg:pl-10 xl:pl-14">
            {/* Mobile Header Toggle */}
            <button
              onClick={() => toggleSection("explore")}
              className="md:hidden flex items-center justify-between w-full py-3 border-b border-[#3e322e] text-left text-xs font-bold uppercase tracking-widest text-[#ab7f51]"
              aria-expanded={openSections.explore}
            >
              <span>Explore</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openSections.explore ? "rotate-180 text-[#e8ceb1]" : "text-[#ab7f51]"}`} />
            </button>

            {/* Desktop Header */}
            <h2 className="hidden md:block text-xs font-bold uppercase tracking-widest text-[#ab7f51] mb-4">
              Explore
            </h2>

            {/* Link List */}
            <nav
              className={`${openSections.explore ? "block py-3" : "hidden"} md:block`}
              aria-label="Explore Navigation"
            >
              <ul className="space-y-2.5 text-xs text-[#f6ede7]/80">
                {exploreLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-[#e8ceb1] transition-colors duration-200 block py-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Dental Services */}
          <div className="flex flex-col">
            {/* Mobile Header Toggle */}
            <button
              onClick={() => toggleSection("dental")}
              className="md:hidden flex items-center justify-between w-full py-3 border-b border-[#3e322e] text-left text-xs font-bold uppercase tracking-widest text-[#ab7f51]"
              aria-expanded={openSections.dental}
            >
              <span>Dental Services</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openSections.dental ? "rotate-180 text-[#e8ceb1]" : "text-[#ab7f51]"}`} />
            </button>

            {/* Desktop Header */}
            <h2 className="hidden md:block text-xs font-bold uppercase tracking-widest text-[#ab7f51] mb-4">
              Dental Services
            </h2>

            {/* Link List */}
            <nav
              className={`${openSections.dental ? "block py-3" : "hidden"} md:block`}
              aria-label="Dental Services Links"
            >
              <ul className="space-y-2.5 text-xs text-[#f6ede7]/80">
                {dentalServicesList.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      className="hover:text-[#e8ceb1] transition-colors duration-200 block py-0.5"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 4: Aesthetic Treatments */}
          <div className="flex flex-col">
            {/* Mobile Header Toggle */}
            <button
              onClick={() => toggleSection("aesthetic")}
              className="md:hidden flex items-center justify-between w-full py-3 border-b border-[#3e322e] text-left text-xs font-bold uppercase tracking-widest text-[#ab7f51]"
              aria-expanded={openSections.aesthetic}
            >
              <span>Aesthetic Treatments</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openSections.aesthetic ? "rotate-180 text-[#e8ceb1]" : "text-[#ab7f51]"}`} />
            </button>

            {/* Desktop Header */}
            <h2 className="hidden md:block text-xs font-bold uppercase tracking-widest text-[#ab7f51] mb-4">
              Aesthetic Treatments
            </h2>

            {/* Link List */}
            <nav
              className={`${openSections.aesthetic ? "block py-3" : "hidden"} md:block`}
              aria-label="Aesthetic Treatment Links"
            >
              <ul className="space-y-2.5 text-xs text-[#f6ede7]/80">
                {aestheticServicesList.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      className="hover:text-[#e8ceb1] transition-colors duration-200 block py-0.5"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 5: Clinic Information */}
          <div className="flex flex-col">
            {/* Mobile Header Toggle */}
            <button
              onClick={() => toggleSection("info")}
              className="md:hidden flex items-center justify-between w-full py-3 border-b border-[#3e322e] text-left text-xs font-bold uppercase tracking-widest text-[#ab7f51]"
              aria-expanded={openSections.info}
            >
              <span>Clinic Information</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openSections.info ? "rotate-180 text-[#e8ceb1]" : "text-[#ab7f51]"}`} />
            </button>

            {/* Desktop Header */}
            <h2 className="hidden md:block text-xs font-bold uppercase tracking-widest text-[#ab7f51] mb-4">
              Clinic Information
            </h2>

            {/* Contact Details & CTA */}
            <div className={`${openSections.info ? "block py-3" : "hidden"} md:block space-y-4`}>
              <address className="not-italic space-y-3 text-xs text-[#f6ede7]/85">
                <div>
                  <h3 className="font-bold text-[#e8ceb1] text-sm mb-1 font-heading">
                    DHA Karachi Clinic
                  </h3>
                  <div className="flex items-start space-x-2 text-[#f6ede7]/75">
                    <MapPin className="w-4 h-4 text-[#c39f75] shrink-0 mt-0.5" />
                    <span>Above Ocean Supermart & Pharmacy 2nd floor, Main Saba Avenue, Phase 5, DHA Karachi</span>
                  </div>
                </div>

                <div className="pt-1">
                  <a
                    id="footer-call-dha"
                    href="tel:03070984307"
                    onClick={() => trackContact("Footer Phone Call")}
                    className="meta-track-call flex items-center space-x-2 text-xs text-[#c39f75] hover:text-[#e8ceb1] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 shrink-0" />
                    <span>0307-0984307</span>
                  </a>
                </div>

                <div>
                  <a
                    href="mailto:clinicbeverlyhills@gmail.com"
                    className="flex items-center space-x-2 text-[11px] text-[#f6ede7]/70 hover:text-[#e8ceb1] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 shrink-0 text-[#c39f75]" />
                    <span>clinicbeverlyhills@gmail.com</span>
                  </a>
                </div>
              </address>

              {/* Book Consultation Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleOpenBooking}
                  className="w-full bg-gradient-to-r from-[#ab7f51] to-[#e8ceb1] text-[#2d221f] text-xs font-semibold py-3 px-4 rounded-lg shadow-md hover:brightness-110 active:scale-[0.99] transition-all duration-300 flex items-center justify-center space-x-2 group cursor-pointer"
                >
                  <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Book Consultation</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Middle Bar: Social Profiles */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between border-b border-[#3e322e] gap-4">
          <span className="text-xs text-[#e8ceb1]/80 font-medium tracking-wide">
            Connect With Beverly Hills Clinic
          </span>
          <div className="flex flex-wrap items-center gap-3">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/beverlyhillskhi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[#ab7f51]/40 flex items-center justify-center text-[#f6ede7]/75 hover:text-[#e8ceb1] hover:border-[#e8ceb1] hover:bg-[#ab7f51]/10 hover:scale-105 transition-all duration-300"
              aria-label="Instagram Profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href="https://api.whatsapp.com/send/?phone=9203352383761&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[#ab7f51]/40 flex items-center justify-center text-[#f6ede7]/75 hover:text-[#e8ceb1] hover:border-[#e8ceb1] hover:bg-[#ab7f51]/10 hover:scale-105 transition-all duration-300"
              aria-label="WhatsApp Contact"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.762.457 3.483 1.328 5.003L2 22l5.14-.1.342-.2c1.472.9 3.184 1.3 4.862 1.3 5.523 0 10-4.48 10-10C22.004 6.48 17.527 2 12.004 2zm5.468 12.382c-.297.149-1.758.867-2.03.967-.273.099-.471.15-.67-.15-.197-.297-.767-.966-.94-1.164-.173-.199-.347-.223-.644-.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@beverlyhillsclinic"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[#ab7f51]/40 flex items-center justify-center text-[#f6ede7]/75 hover:text-[#e8ceb1] hover:border-[#e8ceb1] hover:bg-[#ab7f51]/10 hover:scale-105 transition-all duration-300"
              aria-label="YouTube Channel"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
                <polygon points="10 15 15 12 10 9 10 15" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=61591669100210"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[#ab7f51]/40 flex items-center justify-center text-[#f6ede7]/75 hover:text-[#e8ceb1] hover:border-[#e8ceb1] hover:bg-[#ab7f51]/10 hover:scale-105 transition-all duration-300"
              aria-label="Facebook Page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@beverlyhills_clinic"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[#ab7f51]/40 flex items-center justify-center text-[#f6ede7]/75 hover:text-[#e8ceb1] hover:border-[#e8ceb1] hover:bg-[#ab7f51]/10 hover:scale-105 transition-all duration-300"
              aria-label="TikTok Account"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>

            {/* Pinterest */}
            <a
              href="https://www.pinterest.com/beverlyhillsclinic/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[#ab7f51]/40 flex items-center justify-center text-[#f6ede7]/75 hover:text-[#e8ceb1] hover:border-[#e8ceb1] hover:bg-[#ab7f51]/10 hover:scale-105 transition-all duration-300"
              aria-label="Pinterest Profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 22a9 9 0 0 1-1.91-8.39c.53-2.18 1.83-7.1 1.83-7.1S7.5 5.67 7.5 4.67c0-1.57.91-2.75 2.05-2.75.97 0 1.44.73 1.44 1.6 0 1.97-1.25 4.91-1.9 7.64-.27 1.13.56 2.05 1.68 2.05 2.02 0 3.57-2.13 3.57-5.2 0-2.72-1.96-4.62-4.74-4.62-3.23 0-5.13 2.42-5.13 4.93 0 .98.38 2.02.85 2.59.09.11.1.2.08.31l-.32 1.3c-.05.2-.17.25-.39.15-1.45-.67-2.35-2.79-2.35-4.49 0-3.66 2.66-7.02 7.66-7.02 4.02 0 7.15 2.87 7.15 6.7 0 4-2.52 7.22-6 7.22-1.17 0-2.28-.61-2.66-1.33l-.73 2.76c-.26 1.01-.98 2.28-1.46 3.06" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#f6ede7]/60 gap-3">
          <p>&copy; {currentYear} Beverly Hills Clinic. All Rights Reserved.</p>
          
          <div className="flex items-center space-x-6 text-[11px]">
            <Link href="/privacy-policy" className="hover:text-[#e8ceb1] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/privacy-policy#terms" className="hover:text-[#e8ceb1] transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-[#c39f75]">DHA Karachi, Pakistan</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

