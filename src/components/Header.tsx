"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Calendar, Phone } from "lucide-react";

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
    if (timeoutRefPatients.current) {
      clearTimeout(timeoutRefPatients.current);
      timeoutRefPatients.current = null;
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeavePatients = () => {
    timeoutRefPatients.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  const handleMouseEnterContact = () => {
    if (timeoutRefContact.current) {
      clearTimeout(timeoutRefContact.current);
      timeoutRefContact.current = null;
    }
    setIsContactDropdownOpen(true);
  };

  const handleMouseLeaveContact = () => {
    timeoutRefContact.current = setTimeout(() => {
      setIsContactDropdownOpen(false);
    }, 200);
  };

  const handleMouseEnterServices = () => {
    if (timeoutRefServices.current) {
      clearTimeout(timeoutRefServices.current);
      timeoutRefServices.current = null;
    }
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

  const triggerBooking = () => {
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
    <header
      className={`w-full z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "fixed top-0 left-0 backdrop-blur-md bg-brand-primary/90 border-b border-brand-secondary/40 shadow-sm py-3"
          : "absolute top-0 left-0 bg-transparent py-5"
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
                  ? "h-16 w-16 sm:h-24 sm:w-24"
                  : "h-24 w-24 sm:h-36 sm:w-36"
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors ${
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
                className={`flex items-center space-x-1 text-sm font-medium tracking-wide transition-colors cursor-pointer ${
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
                <div className="absolute left-1/2 -translate-x-1/2 mt-0 top-full pt-2 w-[480px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="rounded-2xl bg-brand-primary border border-brand-secondary/60 shadow-xl p-6 grid grid-cols-2 gap-6">
                    {/* Column 1: Dentistry Services */}
                    <div className="space-y-4">
                      <div className="text-xs font-bold text-brand-text/40 tracking-wider uppercase border-b border-brand-secondary/30 pb-2">
                        Dentistry Services
                      </div>
                      <ul className="space-y-2.5">
                        {[
                          "General Dentistry",
                          "Teeth Cleaning",
                          "Teeth Whitening",
                          "Root Canal",
                          "Implants",
                          "Braces",
                        ].map((srv) => (
                          <li key={srv}>
                            <Link
                              href={`/services#${srv.toLowerCase().replace(/\s+/g, "-")}`}
                              className="group/item flex items-center text-sm font-medium text-brand-text hover:text-brand-accent transition-colors"
                              onClick={() => setIsServicesDropdownOpen(false)}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary group-hover/item:bg-brand-accent mr-2.5 transition-colors" />
                              <span>{srv}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 2: Advanced Aesthetics */}
                    <div className="space-y-4">
                      <div className="text-xs font-bold text-brand-text/40 tracking-wider uppercase border-b border-brand-secondary/30 pb-2">
                        Advanced Aesthetics
                      </div>
                      <div className="flex flex-col space-y-2">
                        {[
                          "Injectables",
                          "Laser Therapies",
                          "Facial Treatments",
                          "Body Contouring",
                        ].map((srv) => (
                          <Link
                            key={srv}
                            href={`/services#${srv.toLowerCase().replace(/\s+/g, "-")}`}
                            className="block px-4 py-2.5 text-xs font-bold text-center uppercase tracking-wider text-brand-text bg-brand-secondary/25 border border-brand-secondary/40 rounded-xl hover:bg-brand-secondary/45 hover:text-brand-accent transition-all duration-200 shadow-xs hover:shadow-sm"
                            onClick={() => setIsServicesDropdownOpen(false)}
                          >
                            {srv}
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
              <button
                className={`flex items-center space-x-1 text-sm font-medium tracking-wide transition-colors ${
                  pathname.startsWith("/patients")
                    ? "text-brand-accent font-semibold"
                    : "text-brand-text/80 hover:text-brand-accent"
                }`}
              >
                <span>Patients</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-185" : ""}`} />
              </button>

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
                className={`flex items-center space-x-1 text-sm font-medium tracking-wide transition-colors cursor-pointer ${
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
                <div className="absolute right-0 top-full pt-2 w-52 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
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
                      Sharfabad Studio
                    </Link>
                    <Link
                      href="/contact#badar-commercial"
                      className="block px-4 py-2.5 text-sm text-brand-text hover:bg-brand-secondary/40 hover:text-brand-accent transition-colors"
                      onClick={() => setIsContactDropdownOpen(false)}
                    >
                      Badar Commercial Studio
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

       {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-primary border-b border-brand-secondary shadow-md px-4 pt-2 pb-6 space-y-3 z-50 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-base font-medium ${
                  isLinkActive(link.href)
                    ? "bg-brand-secondary/40 text-brand-accent"
                    : "text-brand-text hover:bg-brand-secondary/20"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Services mobile section */}
            <div className="border-t border-brand-secondary/40 pt-2 mt-2">
              <Link
                href="/services"
                className="px-3 py-1 text-xs font-semibold text-brand-text/40 uppercase tracking-wider block hover:text-brand-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <div className="pl-3 mt-1 flex flex-col space-y-3">
                {/* Dentistry Group */}
                <div>
                  <span className="text-[11px] font-bold text-brand-accent/80 uppercase tracking-wider block mb-1">
                    Dentistry Services
                  </span>
                  <div className="pl-2 flex flex-col space-y-1">
                    {[
                      "General Dentistry",
                      "Teeth Cleaning",
                      "Teeth Whitening",
                      "Root Canal",
                      "Implants",
                      "Braces",
                    ].map((srv) => (
                      <Link
                        key={srv}
                        href={`/services#${srv.toLowerCase().replace(/\s+/g, "-")}`}
                        className="px-2 py-1 text-sm text-brand-text/80 hover:text-brand-accent transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        &bull; {srv}
                      </Link>
                    ))}
                  </div>
                </div>
                {/* Aesthetics Group */}
                <div>
                  <span className="text-[11px] font-bold text-brand-accent/80 uppercase tracking-wider block mb-1.5">
                    Advanced Aesthetics
                  </span>
                  <div className="pl-2 grid grid-cols-2 gap-2">
                    {[
                      "Injectables",
                      "Laser Therapies",
                      "Facial Treatments",
                      "Body Contouring",
                    ].map((srv) => (
                      <Link
                        key={srv}
                        href={`/services#${srv.toLowerCase().replace(/\s+/g, "-")}`}
                        className="px-2 py-2 text-center text-[10px] font-bold uppercase tracking-wider text-brand-text bg-brand-secondary/25 border border-brand-secondary/40 rounded-lg hover:bg-brand-secondary/45"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {srv}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Patients section nested in mobile menu */}
            <div className="border-t border-brand-secondary/40 pt-2 mt-2">
              <span className="px-3 py-1 text-xs font-semibold text-brand-text/40 uppercase tracking-wider block">
                Patients
              </span>
              <div className="pl-3 mt-1 flex flex-col space-y-1">
                {patientResources.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-3 py-2 text-sm text-brand-text hover:text-brand-accent hover:bg-brand-secondary/20 rounded-md transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/patients"
                  className="px-3 py-2 text-sm font-semibold text-brand-accent hover:bg-brand-secondary/20 rounded-md transition-colors"
                >
                  Patient Dashboard Overview
                </Link>
              </div>
            </div>

            {/* Contact section nested in mobile menu */}
            <div className="border-t border-brand-secondary/40 pt-2 mt-2">
              <Link
                href="/contact"
                className="px-3 py-1 text-xs font-semibold text-brand-text/40 uppercase tracking-wider block hover:text-brand-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact & Locations
              </Link>
              <div className="pl-3 mt-1 flex flex-col space-y-1">
                <Link
                  href="/contact"
                  className="px-3 py-2 text-sm text-brand-text hover:text-brand-accent hover:bg-brand-secondary/20 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Overview
                </Link>
                <Link
                  href="/contact#sharfabad"
                  className="px-3 py-2 text-sm text-brand-text hover:text-brand-accent hover:bg-brand-secondary/20 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sharfabad Studio
                </Link>
                <Link
                  href="/contact#badar-commercial"
                  className="px-3 py-2 text-sm text-brand-text hover:text-brand-accent hover:bg-brand-secondary/20 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Badar Commercial Studio
                </Link>
              </div>
            </div>
          </nav>

          <div className="border-t border-brand-secondary/40 pt-4 flex flex-col space-y-3">
            <a
              href="tel:03070984307"
              className="btn-secondary w-full flex items-center justify-center space-x-2 py-2.5"
            >
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </a>
            <button
              onClick={triggerBooking}
              className="btn-primary w-full flex items-center justify-center space-x-2 py-2.5"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
