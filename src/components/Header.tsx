"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Calendar, Phone } from "lucide-react";
import { trackPixelEvent, trackInitiateBooking } from "@/utils/pixel";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  // Mobile Accordion States
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileDentalOpen, setMobileDentalOpen] = useState(true);
  const [mobileAestheticOpen, setMobileAestheticOpen] = useState(false);
  const [mobilePatientsOpen, setMobilePatientsOpen] = useState(false);

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
    setMobileServicesOpen(false);
    setMobilePatientsOpen(false);
    setMobileDentalOpen(true);
    setMobileAestheticOpen(false);
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
    trackInitiateBooking("Header Booking Consultation");
    window.dispatchEvent(new Event("open-booking"));
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Clinic Tour", href: "/clinic-tour" },
    { name: "Dentists", href: "/doctors" },
    { name: "Blogs", href: "/blog" },
  ];

  const dentalServicesList = [
    { name: "Dental Implants", slug: "dental-implants" },
    { name: "Laser Teeth Whitening", slug: "teeth-whitening" },
    { name: "Clear Aligner Treatments", slug: "clear-aligners" },
    { name: "Braces Treatment", slug: "braces-treatment" },
    { name: "Root Canal Treatment", slug: "root-canal-treatment" },
    { name: "Dental Veneers, Crowns, Bridges", slug: "dental-veneers-crowns-bridges" },
    { name: "Hollywood Smile Makeover", slug: "hollywood-smile-makeover" },
    { name: "Dental Fillings", slug: "dental-fillings" },
    { name: "Complete Denture", slug: "complete-denture" },
    { name: "Night Guards", slug: "night-guards" },
    { name: "Dental Retainers", slug: "dental-retainers" },
    { name: "Pediatric Dentistry", slug: "pediatric-dentistry" },
    { name: "Tooth Extraction", slug: "tooth-extraction" },
    { name: "Wisdom Tooth Extraction", slug: "wisdom-tooth-extraction" },
    { name: "Fixed Dentures", slug: "fixed-dentures" },
    { name: "Gummy Smile Treatment", slug: "gummy-smile-treatment" },
    { name: "Depigmentation of the Gums", slug: "depigmentation-of-gums" },
  ];

  const aestheticServicesList = [
    { name: "Full Face Botox Rejuvenation", slug: "botox-treatment" },
    { name: "Fillers: Face, Lips, Hair, Body", slug: "dermal-fillers" },
    { name: "Laser Hair Removal (Alma)", slug: "laser-hair-removal" },
    { name: "HIFU (Ultraformer III)", slug: "hifu-treatment" },
    { name: "PRP & Exosomes / Stem Cells", slug: "prp-therapy" },
    { name: "Chemical Peel: Face, Neck, Body", slug: "chemical-peel" },
    { name: "Skin Brightening Therapy", slug: "skin-brightening-therapy" },
    { name: "Exosomes Therapy", slug: "exosomes-therapy" },
    { name: "CO2 Fractional Laser (Fotona)", slug: "co2-fractional-laser" },
    { name: "Plasma Fibroblast", slug: "plasma-fibroblast" },
    { name: "Polynucleotide Face and Eyes", slug: "polynucleotide-face-and-eyes" },
    { name: "Acne & Acne Scars Treatments", slug: "acne-scars-treatment" },
    { name: "PDO Threads", slug: "pdo-threads" },
    { name: "Weight Loss Treatment", slug: "weight-loss-treatment" },
    { name: "Body Fat Lipo", slug: "body-fat-lipo" },
    { name: "Red Carpet Facial", slug: "red-carpet-facial" },
    { name: "BH Exfoliating Facial", slug: "bh-exfoliating-facial" },
    { name: "Micro-Needling with Stem Cells", slug: "microneedling-stem-cells" },
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
                          {dentalServicesList.map((srv) => (
                            <Link
                              key={srv.slug}
                              href={`/services/${srv.slug}`}
                              className="group/item flex items-center text-xs font-medium text-brand-text hover:text-brand-accent transition-colors py-0.5"
                              onClick={() => setIsServicesDropdownOpen(false)}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary group-hover/item:bg-brand-accent mr-2 flex-shrink-0 transition-colors" />
                              <span className="truncate">{srv.name}</span>
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
                          {aestheticServicesList.map((srv) => (
                            <Link
                              key={srv.slug}
                              href={`/services/${srv.slug}`}
                              className="group/item flex items-center text-xs font-medium text-brand-text hover:text-brand-accent transition-colors py-0.5"
                              onClick={() => setIsServicesDropdownOpen(false)}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary group-hover/item:bg-brand-accent mr-2 flex-shrink-0 transition-colors" />
                              <span className="truncate">{srv.name}</span>
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
                id="header-call-now"
                href="tel:03070984307"
                onClick={() => trackPixelEvent("Contact", { content_name: "Header Call Now" })}
                className="meta-track-call btn-secondary flex items-center space-x-2 text-sm py-2.5 px-5"
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
                className="text-brand-text hover:text-brand-accent p-2 focus:outline-none cursor-pointer"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Luxury Mobile Menu Drawer & Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#2d221f] text-[#f6ede7] animate-in fade-in duration-200">
          {/* Drawer Top Header (Logo + Close Button) */}
          <div className="flex items-center justify-between px-5 py-4 min-h-[90px] sm:min-h-[100px] border-b border-[#ab7f51]/25 bg-[#231a18]">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center">
              <img
                src="/images/logo.png"
                alt="Beverly Hills Clinic Logo"
                className="drawer-logo"
              />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#f6ede7] hover:text-[#c39f75] p-2.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-6.5 h-6.5" />
            </button>
          </div>

          {/* Main Navigation Scroll Area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5">
            {/* Home */}
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center h-13 px-4 rounded-xl font-medium text-base transition-colors ${
                isLinkActive("/") ? "text-[#c39f75] bg-white/5 font-semibold" : "text-[#f6ede7] hover:text-[#c39f75] hover:bg-white/5"
              }`}
            >
              <span>Home</span>
            </Link>

            {/* Clinic Tour */}
            <Link
              href="/clinic-tour"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center h-13 px-4 rounded-xl font-medium text-base transition-colors ${
                isLinkActive("/clinic-tour") ? "text-[#c39f75] bg-white/5 font-semibold" : "text-[#f6ede7] hover:text-[#c39f75] hover:bg-white/5"
              }`}
            >
              <span>Clinic Tour</span>
            </Link>

            {/* Dentists */}
            <Link
              href="/doctors"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center h-13 px-4 rounded-xl font-medium text-base transition-colors ${
                isLinkActive("/doctors") ? "text-[#c39f75] bg-white/5 font-semibold" : "text-[#f6ede7] hover:text-[#c39f75] hover:bg-white/5"
              }`}
            >
              <span>Dentists</span>
            </Link>

            {/* Blogs */}
            <Link
              href="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center h-13 px-4 rounded-xl font-medium text-base transition-colors ${
                isLinkActive("/blog") ? "text-[#c39f75] bg-white/5 font-semibold" : "text-[#f6ede7] hover:text-[#c39f75] hover:bg-white/5"
              }`}
            >
              <span>Blogs</span>
            </Link>

            {/* Services Accordion */}
            <div className="rounded-xl overflow-hidden border border-transparent">
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className={`w-full flex items-center justify-between h-13 px-4 rounded-xl text-left font-medium text-base transition-colors cursor-pointer ${
                  pathname.startsWith("/services") ? "text-[#c39f75] bg-white/5 font-semibold" : "text-[#f6ede7] hover:text-[#c39f75] hover:bg-white/5"
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#c39f75] transition-transform duration-300 ${
                    mobileServicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileServicesOpen && (
                <div className="mt-1 ml-2 pl-3 pr-2 py-3 space-y-3 bg-black/25 rounded-xl border border-[#ab7f51]/20 animate-in slide-in-from-top-2 duration-200">
                  <Link
                    href="/services"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-xs font-bold text-[#c39f75] uppercase tracking-wider px-3 py-1 hover:underline"
                  >
                    View All Services Overview &rarr;
                  </Link>

                  {/* Dental Services Sub-Accordion */}
                  <div className="space-y-1">
                    <button
                      onClick={() => setMobileDentalOpen(!mobileDentalOpen)}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-[#e8ceb1] uppercase tracking-wider cursor-pointer hover:text-white"
                    >
                      <span>Dental Services</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#c39f75] transition-transform duration-200 ${
                          mobileDentalOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {mobileDentalOpen && (
                      <div className="pl-3 py-1 space-y-0.5 border-l-2 border-[#c39f75]/40 ml-2">
                        {dentalServicesList.map((srv) => (
                          <Link
                            key={srv.slug}
                            href={`/services/${srv.slug}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block px-3 py-2 text-xs font-medium transition-colors rounded-lg ${
                              pathname === `/services/${srv.slug}`
                                ? "text-[#c39f75] font-semibold bg-white/10"
                                : "text-[#f6ede7]/80 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            {srv.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Aesthetic Treatments Sub-Accordion */}
                  <div className="space-y-1 pt-1">
                    <button
                      onClick={() => setMobileAestheticOpen(!mobileAestheticOpen)}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-[#e8ceb1] uppercase tracking-wider cursor-pointer hover:text-white"
                    >
                      <span>Aesthetic Treatments</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#c39f75] transition-transform duration-200 ${
                          mobileAestheticOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {mobileAestheticOpen && (
                      <div className="pl-3 py-1 space-y-0.5 border-l-2 border-[#c39f75]/40 ml-2">
                        {aestheticServicesList.map((srv) => (
                          <Link
                            key={srv.slug}
                            href={`/services/${srv.slug}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block px-3 py-2 text-xs font-medium transition-colors rounded-lg ${
                              pathname === `/services/${srv.slug}`
                                ? "text-[#c39f75] font-semibold bg-white/10"
                                : "text-[#f6ede7]/80 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            {srv.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Patients Accordion */}
            <div className="rounded-xl overflow-hidden border border-transparent">
              <button
                onClick={() => setMobilePatientsOpen(!mobilePatientsOpen)}
                className={`w-full flex items-center justify-between h-13 px-4 rounded-xl text-left font-medium text-base transition-colors cursor-pointer ${
                  pathname.startsWith("/patients") ? "text-[#c39f75] bg-white/5 font-semibold" : "text-[#f6ede7] hover:text-[#c39f75] hover:bg-white/5"
                }`}
              >
                <span>Patients</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#c39f75] transition-transform duration-300 ${
                    mobilePatientsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobilePatientsOpen && (
                <div className="mt-1 ml-2 pl-3 pr-2 py-2 space-y-1 bg-black/25 rounded-xl border border-[#ab7f51]/20 animate-in slide-in-from-top-2 duration-200">
                  <Link
                    href="/patients"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-1.5 text-xs font-bold text-[#c39f75] uppercase tracking-wider hover:underline"
                  >
                    Patient Dashboard &rarr;
                  </Link>
                  {patientResources.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 text-xs font-medium text-[#f6ede7]/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Contact */}
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center h-13 px-4 rounded-xl font-medium text-base transition-colors ${
                isLinkActive("/contact") ? "text-[#c39f75] bg-white/5 font-semibold" : "text-[#f6ede7] hover:text-[#c39f75] hover:bg-white/5"
              }`}
            >
              <span>Contact</span>
            </Link>
          </div>

          {/* Drawer Bottom Sticky Booking CTA Area */}
          <div className="p-4 bg-[#231a18] border-t border-[#ab7f51]/25 flex flex-col gap-2.5 shadow-xl">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                triggerBooking();
              }}
              className="w-full bg-[#c39f75] hover:bg-[#b08b62] text-white font-semibold text-sm tracking-wider uppercase py-3.5 px-6 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4.5 h-4.5" />
              <span>BOOK NOW</span>
            </button>

            <a
              id="mobile-drawer-call-now"
              href="tel:03070984307"
              onClick={() => {
                setIsMobileMenuOpen(false);
                trackPixelEvent("Contact", { content_name: "Mobile Drawer Call Now" });
              }}
              className="w-full bg-white/5 hover:bg-white/10 text-[#e8ceb1] font-medium text-xs tracking-wider uppercase py-2.5 px-4 rounded-xl border border-[#ab7f51]/30 transition-all flex items-center justify-center space-x-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Now: 0307 0984307</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
