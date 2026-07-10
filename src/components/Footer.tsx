"use client";

import Link from "next/link";
import { trackPixelEvent } from "@/utils/pixel";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2d221f] text-[#f6ede7] border-t border-[#3e322e] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Column 1: Logo & Tagline (5/12 width) */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            <Link href="/" className="inline-block">
              <img
                src="/images/logo.png"
                alt="Beverly Hills Clinic Logo"
                className="h-36 w-36 sm:h-48 sm:w-48 object-contain mix-blend-screen invert transition-all duration-300"
              />
            </Link>
            <p className="text-sm text-[#e8ceb1]/80 italic font-light pt-1">
              AESTHETIC & DENTAL
            </p>
            <div className="w-16 h-[1px] bg-[#ab7f51]/40 my-2" />
            {/* Social Media Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/beverlyhillskhi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#ab7f51]/40 flex items-center justify-center text-[#f6ede7]/70 hover:text-[#e8ceb1] hover:border-[#e8ceb1] hover:scale-105 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4.5 h-4.5"
                >
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
                className="w-9 h-9 rounded-full border border-[#ab7f51]/40 flex items-center justify-center text-[#f6ede7]/70 hover:text-[#e8ceb1] hover:border-[#e8ceb1] hover:scale-105 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4.5 h-4.5"
                >
                  <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.762.457 3.483 1.328 5.003L2 22l5.14-.1.342-.2c1.472.9 3.184 1.3 4.862 1.3 5.523 0 10-4.48 10-10C22.004 6.48 17.527 2 12.004 2zm5.468 12.382c-.297.149-1.758.867-2.03.967-.273.099-.471.15-.67-.15-.197-.297-.767-.966-.94-1.164-.173-.199-.347-.223-.644-.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@beverlyhillsclinic"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#ab7f51]/40 flex items-center justify-center text-[#f6ede7]/70 hover:text-[#e8ceb1] hover:border-[#e8ceb1] hover:scale-105 transition-all duration-300"
                aria-label="YouTube"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4.5 h-4.5"
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
                  <polygon points="10 15 15 12 10 9 10 15" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61591669100210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#ab7f51]/40 flex items-center justify-center text-[#f6ede7]/70 hover:text-[#e8ceb1] hover:border-[#e8ceb1] hover:scale-105 transition-all duration-300"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4.5 h-4.5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@beverlyhills_clinic"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#ab7f51]/40 flex items-center justify-center text-[#f6ede7]/70 hover:text-[#e8ceb1] hover:border-[#e8ceb1] hover:scale-105 transition-all duration-300"
                aria-label="TikTok"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4.5 h-4.5"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>

              {/* Pinterest */}
              <a
                href="https://www.pinterest.com/beverlyhillsclinic/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#ab7f51]/40 flex items-center justify-center text-[#f6ede7]/70 hover:text-[#e8ceb1] hover:border-[#e8ceb1] hover:scale-105 transition-all duration-300"
                aria-label="Pinterest"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4.5 h-4.5"
                >
                  <path d="M8 22a9 9 0 0 1-1.91-8.39c.53-2.18 1.83-7.1 1.83-7.1S7.5 5.67 7.5 4.67c0-1.57.91-2.75 2.05-2.75.97 0 1.44.73 1.44 1.6 0 1.97-1.25 4.91-1.9 7.64-.27 1.13.56 2.05 1.68 2.05 2.02 0 3.57-2.13 3.57-5.2 0-2.72-1.96-4.62-4.74-4.62-3.23 0-5.13 2.42-5.13 4.93 0 .98.38 2.02.85 2.59.09.11.1.2.08.31l-.32 1.3c-.05.2-.17.25-.39.15-1.45-.67-2.35-2.79-2.35-4.49 0-3.66 2.66-7.02 7.66-7.02 4.02 0 7.15 2.87 7.15 6.7 0 4-2.52 7.22-6 7.22-1.17 0-2.28-.61-2.66-1.33l-.73 2.76c-.26 1.01-.98 2.28-1.46 3.06" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Explore Navigation (3/12 width) */}
          <div className="md:col-span-3 flex flex-col space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#ab7f51]">
              EXPLORE
            </h4>
            <nav className="flex flex-col space-y-3 text-sm text-[#f6ede7]/80">
              <Link href="/services" className="hover:text-[#e8ceb1] transition-colors">
                Services
              </Link>
              <Link href="/patients" className="hover:text-[#e8ceb1] transition-colors">
                Patients
              </Link>
              <Link href="/contact" className="hover:text-[#e8ceb1] transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Column 3: Studios Addresses (4/12 width) */}
          <div className="md:col-span-4 flex flex-col space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#ab7f51]">
              CLINICS
            </h4>

            <div className="space-y-4 text-sm text-[#f6ede7]/85">
              {/* Studio 1: Sharfabad */}
              <div className="space-y-1">
                <h5 className="font-bold font-heading text-[#e8ceb1] text-base">Sharfabad</h5>
                <p className="leading-relaxed text-xs">
                  15/36 house number road no.03 right behind Alkhaleej tower BMCHS sharfabad Karachi
                </p>
                <a
                  href="tel:03070984307"
                  onClick={() => trackPixelEvent("Contact", { content_name: "Footer Call Sharfabad" })}
                  className="block hover:underline text-xs text-[#ab7f51] hover:text-[#e8ceb1] pt-1"
                >
                  0307-0984307
                </a>
                <a
                  href="mailto:sharfabad@beverlyhillsclinic.com"
                  className="block text-[11px] text-[#f6ede7]/60 hover:text-[#e8ceb1]"
                >
                  sharfabad@beverlyhillsclinic.com
                </a>
              </div>

              <div className="space-y-1 pt-2 border-t border-[#3e322e]">
                <h5 className="font-bold font-heading text-[#e8ceb1] text-base">DHA Karachi</h5>
                <p className="leading-relaxed text-xs">
                  2nd floor, Main Saba Avenue, Phase 5, DHA Karachi, Above Ocean Pharmacy
                </p>
                <a
                  href="tel:03070984307"
                  onClick={() => trackPixelEvent("Contact", { content_name: "Footer Call DHA Karachi" })}
                  className="block hover:underline text-xs text-[#ab7f51] hover:text-[#e8ceb1] pt-1"
                >
                  0307-0984307
                </a>
                <a
                  href="mailto:badar@beverlyhillsclinic.com"
                  className="block text-[11px] text-[#f6ede7]/60 hover:text-[#e8ceb1]"
                >
                  badar@beverlyhillsclinic.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="border-t border-[#3e322e] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#f6ede7]/50 space-y-4 sm:space-y-0">
          <div>
            &copy; {currentYear} Beverly Hills Clinic
          </div>
          <div className="flex space-x-6 tracking-wide text-[11px]">
            <span>Sharfabad</span>
            <span>&middot;</span>
            <span>DHA Karachi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
