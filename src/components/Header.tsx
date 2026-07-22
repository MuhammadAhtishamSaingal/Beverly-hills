"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Calendar, Phone } from "lucide-react";
import { trackPixelEvent } from "@/utils/pixel";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const timeoutRefPatients = useRef<NodeJS.Timeout | null>(null);
  const timeoutRefContact = useRef<NodeJS.Timeout | null>(null);
  const timeoutRefServices = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnterPatients = () => {
    if (timeoutRefPatients.current) clearTimeout(timeoutRefPatients.current);
    if (timeoutRefContact.current) clearTimeout(timeoutRefContact.current);
    if (timeoutRefServices.current) clearTimeout(timeoutRefServices.current);

    setIsContactDropdownOpen(false);
    setIsServicesDropdownOpen(false);
    setIsDropdownOpen(true);
  };

  const handleMouseLeavePatients = () => {
    timeoutRefPatients.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  const handleMouseEnterContact = () => {
    if (timeoutRefPatients.current) clearTimeout(timeoutRefPatients.current);
    if (timeoutRefContact.current) clearTimeout(timeoutRefContact.current);
    if (timeoutRefServices.current) clearTimeout(timeoutRefServices.current);

    setIsDropdownOpen(false);
    setIsServicesDropdownOpen(false);
    setIsContactDropdownOpen(true);
  };

  const handleMouseLeaveContact = () => {
    timeoutRefContact.current = setTimeout(() => {
      setIsContactDropdownOpen(false);
    }, 200);
  };

  const handleMouseEnterServices = () => {
    if (timeoutRefPatients.current) clearTimeout(timeoutRefPatients.current);
    if (timeoutRefContact.current) clearTimeout(timeoutRefContact.current);
    if (timeoutRefServices.current) clearTimeout(timeoutRefServices.current);

    setIsDropdownOpen(false);
    setIsContactDropdownOpen(false);
    setIsServicesDropdownOpen(true);
  };

  const handleMouseLeaveServices = () => {
    timeoutRefServices.current = setTimeout(() => {
      setIsServicesDropdownOpen(false);
    }, 200);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
    setIsContactDropdownOpen(false);
    setIsServicesDropdownOpen(false);
    if (timeoutRefPatients.current) clearTimeout(timeoutRefPatients.current);
    if (timeoutRefContact.current) clearTimeout(timeoutRefContact.current);
    if (timeoutRefServices.current) clearTimeout(timeoutRefServices.current);
  }, [pathname]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRefPatients.current) clearTimeout(timeoutRefPatients.current);
      if (timeoutRefContact.current) clearTimeout(timeoutRefContact.current);
      if (timeoutRefServices.current) clearTimeout(timeoutRefServices.current);
    };
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const triggerBooking = () => {
    trackPixelEvent("InitiateCheckout", { content_name: "Header Book Now" });
    window.dispatchEvent(new Event("open-booking"));
  };

  const navLinks = [
    { name: "Home", href: "/" },
  ];

  const patientResources = [
    { name: "Insurance & Financing", href: "/patients#insurance" },
    { name: "Membership Plan", href: "/patients#membership" },
    { name: "New Patients Onboarding", href: "/patients#new-patients" },
    { name: "Frequently Asked Questions", href: "/patients#faq" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`w-full z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen
          ? "fixed top-0 left-0 backdrop-blur-md bg-brand-primary/90 border-b border-brand-secondary/40 shadow-sm py-3"
          : "absolute top-0 left-0 bg-gradient-to-b from-brand-primary/95 via-brand-primary/70 to-transparent py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <img
                src="/images/logo.png"
                alt="Beverly Hills Clinic Logo"
                className={`object-contain mix-blend-multiply transition-all duration-300 ${isScrolled
                  ? "h-20 w-20 sm:h-24 sm:w-24"
                  : "h-32 w-32 sm:h-36 sm:w-36"
                  }`}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-medium tracking-wide transition-colors ${isLinkActive(link.href)
                    ? "text-brand-accent font-semibold"
                    : "text-brand-text/80 hover:text-brand-accent"
                    }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnterServices}
                onMouseLeave={handleMouseLeaveServices}
              >
                <Link
                  href="/services"
                  className={`flex items-center space-x-1 text-base font-medium tracking-wide transition-colors cursor-pointer ${pathname.startsWith("/services")
                    ? "text-brand-accent font-semibold"
                    : "text-brand-text/80 hover:text-brand-accent"
                    }`}
                  onClick={() => setIsServicesDropdownOpen(false)}
                >
                  <span>Services</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesDropdownOpen ? "rotate-185" : ""}`} />
                </Link>

                {isServicesDropdownOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 mt-0 top-full pt-2 w-[900px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="rounded-2xl bg-brand-primary border border-brand-secondary/60 shadow-xl p-8 grid grid-cols-4 gap-6">
                      {/* Columns 1 & 2: Dental Services */}
                      <div className="col-span-2 space-y-4">
                        <div className="text-xs font-bold text-brand-text/40 tracking-wider uppercase border-b border-brand-secondary/30 pb-2">
                          Comprehensive Dental Services
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                          {[
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
                          ].map((srv) => (
                            <Link
                              key={srv}
                              href={`/services#${srv.toLowerCase().replace(/[(),]/g, "").replace(/\s+/g, "-")}`}
                              className="group/item flex items-center text-xs font-medium text-brand-text hover:text-brand-accent transition-colors py-0.5"
                              onClick={() => setIsServicesDropdownOpen(false)}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary group-hover/item:bg-brand-accent mr-2 flex-shrink-0 transition-colors" />
                              <span className="truncate">{srv}</span>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Columns 3 & 4: Advanced Aesthetics */}
                      <div className="col-span-2 space-y-4">
                        <div className="text-xs font-bold text-brand-text/40 tracking-wider uppercase border-b border-brand-secondary/30 pb-2">
                          Advanced Aesthetics
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                          {[
                            "CO2 Fractional Laser (Fotona)",
                            "HIFU (Ultraformer III)",
                            "Laser Hair Removal (Alma)",
                            "Plasma Fibroblast",
                            "Polynucleotide Face and Eyes",
                            "Fillers: Face, Lips, Hair, Body",
                            "Full Face Botox Rejuvenation",
                            "PRP & Exosomes / Stem Cells",
                            "Acne & Acne Scars Treatments",
                            "PDO Threads",
                            "Chemical Peel: Face, Neck, Body",
                            "Skin Brightening Therapy",
                            "Weight Loss Treatment",
                            "Body Fat Lipo",
                            "Red Carpet Facial",
                            "BH Exfoliating Facial",
                            "Micro-Needling with Stem Cells",
                          ].map((srv) => (
                            <Link
                              key={srv}
                              href={`/services#${srv.toLowerCase().replace(/[(),/&]/g, "").replace(/\s+/g, "-")}`}
                              className="group/item flex items-center text-xs font-medium text-brand-text hover:text-brand-accent transition-colors py-0.5"
                              onClick={() => setIsServicesDropdownOpen(false)}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary group-hover/item:bg-brand-accent mr-2 flex-shrink-0 transition-colors" />
                              <span className="truncate">{srv}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Patients Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnterPatients}
                onMouseLeave={handleMouseLeavePatients}
              >
                <Link
                  href="/patients"
                  className={`flex items-center space-x-1 text-base font-medium tracking-wide transition-colors cursor-pointer ${pathname.startsWith("/patients")
                    ? "text-brand-accent font-semibold"
                    : "text-brand-text/80 hover:text-brand-accent"
                    }`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <span>Patients</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-185" : ""}`} />
                </Link>

                {isDropdownOpen && (
                  <div className="absolute left-0 top-full pt-2 w-60 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="rounded-xl bg-brand-primary border border-brand-secondary/60 shadow-lg py-2">
                      <div className="px-3 py-1 text-xs font-semibold text-brand-text/40 tracking-wider uppercase border-b border-brand-secondary/30 mb-1">
                        Resources
                      </div>
                      {patientResources.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2.5 text-sm text-brand-text hover:bg-brand-secondary/40 hover:text-brand-accent transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                      <div className="border-t border-brand-secondary/30 mt-1 pt-1">
                        <Link
                          href="/patients"
                          className="block px-4 py-2.5 text-sm font-medium text-brand-accent hover:bg-brand-secondary/20 transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          View Patient Dashboard
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnterContact}
                onMouseLeave={handleMouseLeaveContact}
              >
                <Link
                  href="/contact"
                  className={`flex items-center space-x-1 text-base font-medium tracking-wide transition-colors cursor-pointer ${pathname.startsWith("/contact")
                    ? "text-brand-accent font-semibold"
                    : "text-brand-text/80 hover:text-brand-accent"
                    }`}
                  onClick={() => setIsContactDropdownOpen(false)}
                >
                  <span>Contact</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isContactDropdownOpen ? "rotate-185" : ""}`} />
                </Link>

                {isContactDropdownOpen && (
                  <div className="absolute left-0 top-full pt-2 w-52 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="rounded-xl bg-brand-primary border border-brand-secondary/60 shadow-lg py-2">
                      <div className="px-3 py-1 text-xs font-semibold text-brand-text/40 tracking-wider uppercase border-b border-brand-secondary/30 mb-1">
                        Locations
                      </div>
                      <Link
                        href="/contact"
                        className="block px-4 py-2.5 text-sm text-brand-text hover:bg-brand-secondary/40 hover:text-brand-accent transition-colors"
                        onClick={() => setIsContactDropdownOpen(false)}
                      >
                        Contact Overview
                      </Link>
                      <Link
                        href="/contact#sharfabad"
                        className="block px-4 py-2.5 text-sm text-brand-text hover:bg-brand-secondary/40 hover:text-brand-accent transition-colors"
                        onClick={() => setIsContactDropdownOpen(false)}
                      >
                        Sharfabad Clinic
                      </Link>
                      <Link
                        href="/contact#dha-karachi"
                        className="block px-4 py-2.5 text-sm text-brand-text hover:bg-brand-secondary/40 hover:text-brand-accent transition-colors"
                        onClick={() => setIsContactDropdownOpen(false)}
                      >
                        DHA Karachi Clinic
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* CTAs */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="tel:03070984307"
                onClick={() => trackPixelEvent("Contact", { content_name: "Header Call Now" })}
                className="btn-secondary flex items-center space-x-2 text-sm py-2.5 px-5"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>
              <button
                onClick={triggerBooking}
                className="btn-primary flex items-center space-x-2 text-sm py-2.5 px-5"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Now</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-brand-text hover:text-brand-accent p-2 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#2d221f] z-50 overflow-y-auto flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-300">
          {/* Drawer Header */}
          <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <Link href="/" className="flex items-center group" onClick={() => setIsMobileMenuOpen(false)}>
              <img
                src="/images/logo.png"
                alt="Beverly Hills Clinic Logo"
                className="h-32 w-32 object-contain invert mix-blend-screen"
              />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#f6ede7] hover:text-[#e8ceb1] p-2 focus:outline-none cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Drawer Menu Items */}
          <div className="flex-grow flex flex-col items-center justify-center py-8 space-y-8 text-center">
            {/* Top decorative line */}
            <div className="w-[1.5px] h-12 bg-[#ab7f51]/30" />

            {/* Services Section */}
            <div className="space-y-2">
              <Link
                href="/services"
                className="text-3xl font-normal font-heading text-[#f6ede7] hover:text-[#e8ceb1] transition-colors tracking-wide block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 max-w-xs mx-auto">
                <Link
                  href="/services#dentistry"
                  className="text-[10px] font-bold text-[#e8ceb1]/80 hover:text-[#f6ede7] uppercase tracking-widest transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dentistry
                </Link>
                <span className="text-[#ab7f51]/40 text-xs">&middot;</span>
                <Link
                  href="/services#aesthetics"
                  className="text-[10px] font-bold text-[#e8ceb1]/80 hover:text-[#f6ede7] uppercase tracking-widest transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Aesthetics
                </Link>
              </div>
            </div>

            {/* Patients Section */}
            <div className="space-y-2">
              <Link
                href="/patients"
                className="text-3xl font-normal font-heading text-[#f6ede7] hover:text-[#e8ceb1] transition-colors tracking-wide block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Patients
              </Link>
              <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 max-w-sm mx-auto px-4">
                <Link
                  href="/patients#insurance"
                  className="text-[10px] font-bold text-[#e8ceb1]/80 hover:text-[#f6ede7] uppercase tracking-widest transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Insurance
                </Link>
                <span className="text-[#ab7f51]/40 text-xs">&middot;</span>
                <Link
                  href="/patients#membership"
                  className="text-[10px] font-bold text-[#e8ceb1]/80 hover:text-[#f6ede7] uppercase tracking-widest transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Membership Plan
                </Link>
                <span className="text-[#ab7f51]/40 text-xs">&middot;</span>
                <Link
                  href="/patients#new-patients"
                  className="text-[10px] font-bold text-[#e8ceb1]/80 hover:text-[#f6ede7] uppercase tracking-widest transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  New Patients
                </Link>
                <span className="text-[#ab7f51]/40 text-xs">&middot;</span>
                <Link
                  href="/patients#faq"
                  className="text-[10px] font-bold text-[#e8ceb1]/80 hover:text-[#f6ede7] uppercase tracking-widest transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
              </div>
            </div>

            {/* Contact Section */}
            <div className="space-y-2">
              <Link
                href="/contact"
                className="text-3xl font-normal font-heading text-[#f6ede7] hover:text-[#e8ceb1] transition-colors tracking-wide block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 max-w-xs mx-auto">
                <Link
                  href="/contact#sharfabad"
                  className="text-[10px] font-bold text-[#e8ceb1]/80 hover:text-[#f6ede7] uppercase tracking-widest transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sharfabad
                </Link>
                <span className="text-[#ab7f51]/40 text-xs">&middot;</span>
                <Link
                  href="/contact#dha-karachi"
                  className="text-[10px] font-bold text-[#e8ceb1]/80 hover:text-[#f6ede7] uppercase tracking-widest transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  DHA Karachi
                </Link>
              </div>
            </div>

            {/* Book Now Button */}
            <div className="pt-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  triggerBooking();
                }}
                className="bg-[#c39f75] hover:bg-[#b08b62] text-white font-semibold text-xs tracking-wider uppercase py-3.5 px-8 rounded-full transition-all hover:scale-105 shadow-md shadow-black/15 cursor-pointer"
              >
                BOOK NOW
              </button>
            </div>

            {/* Bottom decorative line */}
            <div className="w-[1.5px] h-12 bg-[#ab7f51]/30" />
          </div>
        </div>
      )}
    </>
  );
}
