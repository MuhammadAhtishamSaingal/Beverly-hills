"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Calendar, Phone, Search, ArrowRight, Sparkles, Stethoscope } from "lucide-react";
import { trackInitiateBooking, trackContact } from "@/lib/metaPixel";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  // Search Modal States
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Mobile Search & Accordion States
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [mobileDentalOpen, setMobileDentalOpen] = useState(false);
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

  // Keyboard shortcut for Search Modal (Cmd+K / Ctrl+K & Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto focus search input when modal opens
  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery("");
    }
  }, [isSearchModalOpen]);

  // Close menus when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchModalOpen(false);
    setIsDropdownOpen(false);
    setIsContactDropdownOpen(false);
    setIsServicesDropdownOpen(false);
    setMobilePatientsOpen(false);
    setMobileDentalOpen(false);
    setMobileAestheticOpen(false);
    setMobileSearchQuery("");
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

  // Lock scroll when mobile menu or search modal is open
  useEffect(() => {
    if (isMobileMenuOpen || isSearchModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen, isSearchModalOpen]);

  const triggerBooking = () => {
    trackInitiateBooking("Header Book Now");
    window.dispatchEvent(new CustomEvent("open-booking"));
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Clinic Tour", href: "/clinic-tour" },
    { name: "Dentists", href: "/doctors" },
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

  const sitePages = [
    { name: "Home Page", href: "/" },
    { name: "Clinic Tour", href: "/clinic-tour" },
    { name: "Our Doctors & Specialists", href: "/doctors" },
    { name: "Services Overview", href: "/services" },
    { name: "Patient Portal", href: "/patients" },
    { name: "Blogs & Articles", href: "/blog" },
    { name: "Contact Us & Locations", href: "/contact" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Filter lists for Global Search Modal
  const filteredDentalModal = dentalServicesList.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredAestheticModal = aestheticServicesList.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredPagesModal = sitePages.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter lists for Mobile Menu Search Input
  const filteredDentalMobile = dentalServicesList.filter((s) =>
    s.name.toLowerCase().includes(mobileSearchQuery.toLowerCase())
  );
  const filteredAestheticMobile = aestheticServicesList.filter((s) =>
    s.name.toLowerCase().includes(mobileSearchQuery.toLowerCase())
  );

  return (
    <>
      <header
        className={`w-full z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
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
                className={`object-contain mix-blend-multiply transition-all duration-300 ${
                  isScrolled
                    ? "h-20 w-20 sm:h-24 sm:w-24"
                    : "h-32 w-32 sm:h-36 sm:w-36"
                }`}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-5 lg:space-x-8 xl:space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm lg:text-base font-medium tracking-wide whitespace-nowrap transition-colors ${
                    isLinkActive(link.href)
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
                  className={`flex items-center space-x-1 text-sm lg:text-base font-medium tracking-wide whitespace-nowrap transition-colors cursor-pointer ${
                    pathname.startsWith("/services")
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
                        <div className="text-xs font-bold text-[#c39f75] tracking-wider uppercase border-b border-brand-secondary/30 pb-2">
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
                  className={`flex items-center space-x-1 text-sm lg:text-base font-medium tracking-wide whitespace-nowrap transition-colors cursor-pointer ${
                    pathname.startsWith("/patients")
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
                  className={`flex items-center space-x-1 text-sm lg:text-base font-medium tracking-wide whitespace-nowrap transition-colors cursor-pointer ${
                    pathname.startsWith("/contact")
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

            {/* Header Right Actions (CTAs) */}
            <div className="hidden md:flex items-center space-x-3 lg:space-x-4">

              <a
                id="header-call-now"
                href="tel:03070984307"
                onClick={() => trackContact("Header Phone Call")}
                className="meta-track-call btn-secondary flex items-center space-x-2 text-sm py-2.5 px-4 lg:px-5"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>
              <button
                onClick={triggerBooking}
                className="btn-primary flex items-center space-x-2 text-sm py-2.5 px-4 lg:px-5"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Now</span>
              </button>
            </div>

            {/* Mobile Header Actions (Search Icon + Menu Button) */}
            <div className="md:hidden flex items-center space-x-1">
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="text-brand-text hover:text-brand-accent p-2 focus:outline-none cursor-pointer"
                aria-label="Search treatments"
              >
                <Search className="w-5.5 h-5.5 text-brand-accent" />
              </button>
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

      {/* Global Search Modal */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#2d221f] text-[#f6ede7] rounded-2xl border border-[#ab7f51]/40 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
            {/* Modal Header & Search Bar */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#3e322e] bg-[#231a18]">
              <div className="flex items-center space-x-3 flex-1">
                <Search className="w-5 h-5 text-[#c39f75] shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search treatments, dental, aesthetic services, or pages..."
                  className="w-full bg-transparent text-sm sm:text-base text-[#f6ede7] placeholder-[#f6ede7]/50 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-[#f6ede7]/60 hover:text-white p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                onClick={() => setIsSearchModalOpen(false)}
                className="ml-3 text-[#c39f75] hover:text-white p-1.5 sm:px-2.5 sm:py-1 rounded-lg border border-[#ab7f51]/40 hover:bg-white/10 transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                aria-label="Close search"
              >
                <X className="w-5 h-5 sm:hidden" />
                <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider">ESC</span>
              </button>
            </div>

            {/* Modal Search Content / Results */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {!searchQuery ? (
                <div className="space-y-4">
                  <div className="text-xs font-bold text-[#ab7f51] uppercase tracking-wider">
                    Popular Treatments & Quick Searches
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: "Dental Implants", slug: "dental-implants" },
                      { name: "Teeth Whitening", slug: "teeth-whitening" },
                      { name: "Full Face Botox", slug: "botox-treatment" },
                      { name: "Clear Aligners", slug: "clear-aligners" },
                      { name: "Dermal Fillers", slug: "dermal-fillers" },
                      { name: "HIFU Treatment", slug: "hifu-treatment" },
                      { name: "Hollywood Smile", slug: "hollywood-smile-makeover" },
                      { name: "Root Canal", slug: "root-canal-treatment" },
                    ].map((quick) => (
                      <Link
                        key={quick.slug}
                        href={`/services/${quick.slug}`}
                        onClick={() => setIsSearchModalOpen(false)}
                        className="text-xs font-medium bg-[#3e322e]/60 hover:bg-[#ab7f51] text-[#f6ede7] hover:text-[#2d221f] px-3 py-1.5 rounded-full transition-all duration-200 border border-[#ab7f51]/30 flex items-center space-x-1.5"
                      >
                        <span>{quick.name}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              ) : filteredDentalModal.length === 0 &&
                filteredAestheticModal.length === 0 &&
                filteredPagesModal.length === 0 ? (
                <div className="text-center py-10 space-y-2">
                  <p className="text-sm font-medium text-[#f6ede7]/80">
                    No services or pages found matching "{searchQuery}"
                  </p>
                  <p className="text-xs text-[#f6ede7]/50">
                    Try searching for terms like "Implants", "Whitening", "Botox", or "Doctors".
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Dental Services Results */}
                  {filteredDentalModal.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-[#c39f75] uppercase tracking-wider border-b border-[#3e322e] pb-1 flex justify-between">
                        <span>Comprehensive Dental Services</span>
                        <span className="text-[10px] text-[#f6ede7]/50">{filteredDentalModal.length} matches</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {filteredDentalModal.map((srv) => (
                          <Link
                            key={srv.slug}
                            href={`/services/${srv.slug}`}
                            onClick={() => setIsSearchModalOpen(false)}
                            className="flex items-center justify-between p-2.5 rounded-xl bg-[#231a18] hover:bg-[#3e322e] border border-[#ab7f51]/20 hover:border-[#c39f75]/60 transition-all group"
                          >
                            <span className="text-xs font-medium text-[#f6ede7] group-hover:text-[#e8ceb1]">
                              {srv.name}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#c39f75] opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Aesthetic Services Results */}
                  {filteredAestheticModal.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-[#e8ceb1] uppercase tracking-wider border-b border-[#3e322e] pb-1 flex justify-between">
                        <span>Advanced Aesthetic Treatments</span>
                        <span className="text-[10px] text-[#f6ede7]/50">{filteredAestheticModal.length} matches</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {filteredAestheticModal.map((srv) => (
                          <Link
                            key={srv.slug}
                            href={`/services/${srv.slug}`}
                            onClick={() => setIsSearchModalOpen(false)}
                            className="flex items-center justify-between p-2.5 rounded-xl bg-[#231a18] hover:bg-[#3e322e] border border-[#ab7f51]/20 hover:border-[#c39f75]/60 transition-all group"
                          >
                            <span className="text-xs font-medium text-[#f6ede7] group-hover:text-[#e8ceb1]">
                              {srv.name}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#c39f75] opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Page Results */}
                  {filteredPagesModal.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-[#ab7f51] uppercase tracking-wider border-b border-[#3e322e] pb-1 flex justify-between">
                        <span>Pages & Navigation</span>
                        <span className="text-[10px] text-[#f6ede7]/50">{filteredPagesModal.length} matches</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {filteredPagesModal.map((page) => (
                          <Link
                            key={page.href}
                            href={page.href}
                            onClick={() => setIsSearchModalOpen(false)}
                            className="flex items-center justify-between p-2.5 rounded-xl bg-[#231a18] hover:bg-[#3e322e] border border-[#ab7f51]/20 hover:border-[#c39f75]/60 transition-all group"
                          >
                            <span className="text-xs font-medium text-[#f6ede7] group-hover:text-[#e8ceb1]">
                              {page.name}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#c39f75] opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Luxury Mobile Menu Drawer & Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#2d221f] text-[#f6ede7] animate-in fade-in duration-200">
          {/* Drawer Top Header (Logo + Close Button) */}
          <div className="flex items-center justify-between px-5 py-4 min-h-[85px] sm:min-h-[95px] border-b border-[#ab7f51]/25 bg-[#231a18]">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center">
              <img
                src="/images/logo.png"
                alt="Beverly Hills Clinic Logo"
                className="drawer-logo"
              />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#f6ede7] hover:text-[#c39f75] p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Drawer Dedicated Search Bar */}
          <div className="px-4 py-3 bg-[#231a18] border-b border-[#ab7f51]/20">
            <div className="relative">
              <Search className="w-4 h-4 text-[#c39f75] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={mobileSearchQuery}
                onChange={(e) => setMobileSearchQuery(e.target.value)}
                placeholder="Search dental & aesthetic services..."
                className="w-full bg-[#1b1412] text-xs text-[#f6ede7] placeholder-[#f6ede7]/50 pl-10 pr-9 py-2.5 rounded-xl border border-[#ab7f51]/30 focus:outline-none focus:border-[#c39f75] transition-all"
              />
              {mobileSearchQuery && (
                <button
                  onClick={() => setMobileSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#f6ede7]/60 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Main Navigation Scroll Area */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1.5">
            {/* If user is typing in Mobile Search, show live filtered search results */}
            {mobileSearchQuery ? (
              <div className="space-y-4 py-1">
                <div className="text-xs font-semibold text-[#c39f75] uppercase tracking-wider flex justify-between items-center">
                  <span>Search Results</span>
                  <span className="text-[10px] text-[#f6ede7]/50">"{mobileSearchQuery}"</span>
                </div>
                {filteredDentalMobile.length === 0 && filteredAestheticMobile.length === 0 ? (
                  <div className="text-xs text-[#f6ede7]/60 py-6 text-center bg-black/20 rounded-xl border border-[#ab7f51]/20">
                    No services found matching "{mobileSearchQuery}"
                  </div>
                ) : (
                  <>
                    {filteredDentalMobile.length > 0 && (
                      <div className="space-y-1.5">
                        <div className="text-[11px] font-bold text-[#e8ceb1] uppercase tracking-wider flex items-center space-x-1.5">
                          <Stethoscope className="w-3.5 h-3.5 text-[#c39f75]" />
                          <span>Dental Services ({filteredDentalMobile.length})</span>
                        </div>
                        <div className="space-y-1 pl-1">
                          {filteredDentalMobile.map((srv) => (
                            <Link
                              key={srv.slug}
                              href={`/services/${srv.slug}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center justify-between px-3.5 py-2.5 text-xs font-medium text-[#f6ede7] bg-black/25 hover:bg-white/10 rounded-xl border border-[#ab7f51]/20"
                            >
                              <span>{srv.name}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-[#c39f75]" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                    {filteredAestheticMobile.length > 0 && (
                      <div className="space-y-1.5 pt-2">
                        <div className="text-[11px] font-bold text-[#e8ceb1] uppercase tracking-wider flex items-center space-x-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#c39f75]" />
                          <span>Aesthetic Treatments ({filteredAestheticMobile.length})</span>
                        </div>
                        <div className="space-y-1 pl-1">
                          {filteredAestheticMobile.map((srv) => (
                            <Link
                              key={srv.slug}
                              href={`/services/${srv.slug}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center justify-between px-3.5 py-2.5 text-xs font-medium text-[#f6ede7] bg-black/25 hover:bg-white/10 rounded-xl border border-[#ab7f51]/20"
                            >
                              <span>{srv.name}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-[#c39f75]" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              /* Standard Navigation Menu */
              <>
                {/* Home */}
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center h-12 px-4 rounded-xl font-medium text-base transition-colors ${
                    isLinkActive("/") ? "text-[#c39f75] bg-white/5 font-semibold" : "text-[#f6ede7] hover:text-[#c39f75] hover:bg-white/5"
                  }`}
                >
                  <span>Home</span>
                </Link>

                {/* Clinic Tour */}
                <Link
                  href="/clinic-tour"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center h-12 px-4 rounded-xl font-medium text-base transition-colors ${
                    isLinkActive("/clinic-tour") ? "text-[#c39f75] bg-white/5 font-semibold" : "text-[#f6ede7] hover:text-[#c39f75] hover:bg-white/5"
                  }`}
                >
                  <span>Clinic Tour</span>
                </Link>

                {/* Dentists */}
                <Link
                  href="/doctors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center h-12 px-4 rounded-xl font-medium text-base transition-colors ${
                    isLinkActive("/doctors") ? "text-[#c39f75] bg-white/5 font-semibold" : "text-[#f6ede7] hover:text-[#c39f75] hover:bg-white/5"
                  }`}
                >
                  <span>Dentists</span>
                </Link>

                {/* INDIVIDUAL SECTION 1: Dental Services Accordion */}
                <div className="rounded-xl overflow-hidden border border-transparent">
                  <button
                    onClick={() => setMobileDentalOpen(!mobileDentalOpen)}
                    className={`w-full flex items-center justify-between h-12 px-4 rounded-xl text-left font-medium text-base transition-colors cursor-pointer ${
                      mobileDentalOpen ? "text-[#c39f75] bg-white/5 font-semibold" : "text-[#f6ede7] hover:text-[#c39f75] hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Stethoscope className="w-4.5 h-4.5 text-[#c39f75]" />
                      <span>Dental Services</span>
                    </div>
                    <ChevronDown
                      className={`w-4.5 h-4.5 text-[#c39f75] transition-transform duration-300 ${
                        mobileDentalOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {mobileDentalOpen && (
                    <div className="mt-1 ml-2 pl-3 pr-2 py-2.5 space-y-1 bg-black/25 rounded-xl border border-[#ab7f51]/20 animate-in slide-in-from-top-2 duration-200">
                      <Link
                        href="/services#dental"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-3 py-1.5 text-xs font-bold text-[#c39f75] uppercase tracking-wider hover:underline"
                      >
                        All Dental Services Overview &rarr;
                      </Link>
                      <div className="pl-1 py-1 space-y-0.5 border-l-2 border-[#c39f75]/40 ml-2">
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
                    </div>
                  )}
                </div>

                {/* INDIVIDUAL SECTION 2: Aesthetic Treatments Accordion */}
                <div className="rounded-xl overflow-hidden border border-transparent">
                  <button
                    onClick={() => setMobileAestheticOpen(!mobileAestheticOpen)}
                    className={`w-full flex items-center justify-between h-12 px-4 rounded-xl text-left font-medium text-base transition-colors cursor-pointer ${
                      mobileAestheticOpen ? "text-[#c39f75] bg-white/5 font-semibold" : "text-[#f6ede7] hover:text-[#c39f75] hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4.5 h-4.5 text-[#c39f75]" />
                      <span>Aesthetic Treatments</span>
                    </div>
                    <ChevronDown
                      className={`w-4.5 h-4.5 text-[#c39f75] transition-transform duration-300 ${
                        mobileAestheticOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {mobileAestheticOpen && (
                    <div className="mt-1 ml-2 pl-3 pr-2 py-2.5 space-y-1 bg-black/25 rounded-xl border border-[#ab7f51]/20 animate-in slide-in-from-top-2 duration-200">
                      <Link
                        href="/services#aesthetic"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-3 py-1.5 text-xs font-bold text-[#c39f75] uppercase tracking-wider hover:underline"
                      >
                        All Aesthetic Treatments Overview &rarr;
                      </Link>
                      <div className="pl-1 py-1 space-y-0.5 border-l-2 border-[#c39f75]/40 ml-2">
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
                    </div>
                  )}
                </div>

                {/* Patients Accordion */}
                <div className="rounded-xl overflow-hidden border border-transparent">
                  <button
                    onClick={() => setMobilePatientsOpen(!mobilePatientsOpen)}
                    className={`w-full flex items-center justify-between h-12 px-4 rounded-xl text-left font-medium text-base transition-colors cursor-pointer ${
                      pathname.startsWith("/patients") ? "text-[#c39f75] bg-white/5 font-semibold" : "text-[#f6ede7] hover:text-[#c39f75] hover:bg-white/5"
                    }`}
                  >
                    <span>Patients</span>
                    <ChevronDown
                      className={`w-4.5 h-4.5 text-[#c39f75] transition-transform duration-300 ${
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

                {/* Blogs */}
                <Link
                  href="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center h-12 px-4 rounded-xl font-medium text-base transition-colors ${
                    isLinkActive("/blog") ? "text-[#c39f75] bg-white/5 font-semibold" : "text-[#f6ede7] hover:text-[#c39f75] hover:bg-white/5"
                  }`}
                >
                  <span>Blogs</span>
                </Link>

                {/* Contact */}
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center h-12 px-4 rounded-xl font-medium text-base transition-colors ${
                    isLinkActive("/contact") ? "text-[#c39f75] bg-white/5 font-semibold" : "text-[#f6ede7] hover:text-[#c39f75] hover:bg-white/5"
                  }`}
                >
                  <span>Contact</span>
                </Link>
              </>
            )}
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
                trackContact("Mobile Drawer Phone Call");
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

