"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Calendar, Phone } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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
  }, [pathname]);

  const triggerBooking = () => {
    window.dispatchEvent(new Event("open-booking"));
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
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
        isScrolled
          ? "fixed top-0 left-0 backdrop-blur-md bg-brand-primary/90 border-b border-brand-secondary/40 shadow-sm py-3"
          : "absolute top-0 left-0 bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-semibold tracking-wide text-brand-text font-heading group-hover:text-brand-accent transition-colors">
              Beverly Hills Clinic
            </span>
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

            {/* Patients Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
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
                <div className="absolute left-0 mt-2 w-60 rounded-xl bg-brand-primary border border-brand-secondary/60 shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
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
              )}
            </div>

            <Link
              href="/contact"
              className={`text-sm font-medium tracking-wide transition-colors ${
                isLinkActive("/contact")
                  ? "text-brand-accent font-semibold"
                  : "text-brand-text/80 hover:text-brand-accent"
              }`}
            >
              Contact
            </Link>
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
              >
                {link.name}
              </Link>
            ))}

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

            <Link
              href="/contact"
              className={`px-3 py-2 rounded-lg text-base font-medium ${
                isLinkActive("/contact")
                  ? "bg-brand-secondary/40 text-brand-accent"
                  : "text-brand-text hover:bg-brand-secondary/20"
              }`}
            >
              Contact
            </Link>
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
