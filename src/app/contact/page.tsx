"use client";

import Image from "next/image";
import { Phone, Calendar, MapPin, Clock, Mail, ExternalLink } from "lucide-react";
import { trackPixelEvent } from "@/utils/pixel";

export default function ContactPage() {
  const triggerBooking = () => {
    trackPixelEvent("InitiateCheckout", { content_name: "Contact Page Book Visit" });
    window.dispatchEvent(new Event("open-booking"));
  };

  const studios = [
    {
      city: "Sharfabad",
      address: "15/36 house number road no.03 right behind Alkhaleej tower BMCHS sharfabad",
      zip: "Karachi",
      phone: "0307-0984307",
      phoneRaw: "03070984307",
      email: "clinicbeverlyhills@gmail.com",
      desktopImage: "/images/DESKTOP1_MARQE_1200.webp",
      mobileImage: "/images/MOBILE1_MARQE.webp",
      hours: [
        { days: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
        { days: "Saturday - Sunday", time: "Closed" },
      ],
      mapUrl: "https://maps.google.com/?q=Al+Khaleej+Tower+Karachi",
      mapEmbedUrl:
        "https://maps.google.com/maps?q=Al%20Khaleej%20Tower%2C%20Karachi&t=&z=15&ie=UTF8&iwloc=&output=embed",
    },
    {
      city: "DHA Karachi",
      address: "2nd floor, Main Saba Avenue, Phase 5, DHA Karachi, Above Ocean Pharmacy",
      zip: "Karachi",
      phone: "0307-0984307",
      phoneRaw: "03070984307",
      email: "clinicbeverlyhills@gmail.com",
      desktopImage: "/images/DESKTOP4_MARQE_1200.webp",
      mobileImage: "/images/MOBILE4_MARQE.webp",
      hours: [
        { days: "Monday - Saturday", time: "9:00 AM - 6:00 PM" },
        { days: "Sunday", time: "Closed" },
      ],
      mapUrl: "https://maps.google.com/?q=Saba+Avenue+Badar+Commercial+Karachi",
      mapEmbedUrl:
        "https://maps.google.com/maps?q=Saba%20Avenue%2C%20Badar%20Commercial%2C%20Karachi&t=&z=15&ie=UTF8&iwloc=&output=embed",
    },
  ];

  return (
    <div className="flex flex-col w-full bg-brand-primary">
      {/* 1. Page Header Hero Banner */}
      <section className="relative w-full h-screen md:h-auto md:min-h-[500px] pt-[120px] pb-10 md:pt-52 md:pb-28 flex items-center justify-center overflow-hidden border-b border-brand-secondary/40 bg-brand-primary">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/contact_ banner.webp"
            alt="Dental clinic space background"
            fill
            priority
            sizes="100vw"
            className="hidden md:block object-cover object-center"
          />
          <Image
            src="/images/space4.webp"
            alt="Dental clinic space background Mobile"
            fill
            priority
            sizes="100vw"
            className="block md:hidden object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#f6ede7]/45 md:bg-[#f6ede7]/40 mix-blend-normal z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 mt-[60px] md:mt-[140px]">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-accent block">
            CONTACT
          </span>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light font-heading text-brand-text leading-tight">
            Let's get <br className="sm:hidden" />
            <span className="font-heading italic font-normal text-[#3d2e2a]/95 text-5xl sm:text-6xl md:text-7xl block sm:inline mt-1 sm:mt-0">booked</span>
          </h1>
          
          <p className="text-sm sm:text-base text-brand-text/85 max-w-md mx-auto leading-relaxed font-medium text-[#3d2e2a]">
            Choose your preferred clinic and schedule your visit.
          </p>
          
          <div className="pt-2">
            <button
              onClick={triggerBooking}
              className="btn-primary py-3.5 px-8 text-sm font-semibold tracking-wide uppercase shadow-md shadow-[#3d2e2a]/15 hover:shadow-lg transition-all"
            >
              BOOK A VISIT
            </button>
          </div>
        </div>
      </section>

      {/* 2. Studios Details & Maps Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          {studios.map((studio, idx) => (
            <div
              key={idx}
              id={studio.city.toLowerCase().replace(/\s+/g, "-")}
              className="bg-white border border-[#e8ceb1]/40 rounded-3xl overflow-hidden shadow-xs flex flex-col justify-between scroll-mt-24"
            >
              {/* Card Header (Image with Text Overlay) */}
              <div className="relative w-full h-64 sm:h-72">
                <Image
                  src={studio.desktopImage}
                  alt={`Beverly Hills Clinic ${studio.city}`}
                  fill
                  priority={idx === 0}
                  sizes="(max-w-768px) 50vw, 100vw"
                  className="hidden md:block object-cover"
                />
                <Image
                  src={studio.mobileImage}
                  alt={`Beverly Hills Clinic ${studio.city} Mobile`}
                  fill
                  priority={idx === 0}
                  sizes="(max-w-768px) 100vw, 100vw"
                  className="block md:hidden object-cover"
                />
                {/* Dark overlay at bottom to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                
                {/* Overlay Text */}
                <div className="absolute left-6 bottom-6 right-6 z-20 text-left space-y-1">
                  <div className="w-8 h-[1.5px] bg-[#ab7f51]" />
                  <h2 className="text-2xl sm:text-3xl font-normal font-heading text-white">
                    {studio.city}
                  </h2>
                  <span className="text-[10px] font-bold text-[#f6ede7]/90 uppercase tracking-widest block">
                    BEVERLY HILLS CLINIC
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-[#f5eae2] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#ab7f51]" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold tracking-widest text-[#ab7f51] block uppercase">
                        ADDRESS
                      </span>
                      <p className="text-sm text-brand-text/80 leading-relaxed">
                        {studio.address}, {studio.zip}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-[#f5eae2] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#ab7f51]" />
                    </div>
                    <div className="space-y-1 flex-grow">
                      <span className="text-[10px] font-bold tracking-widest text-[#ab7f51] block uppercase">
                        PHONE
                      </span>
                      <a
                        href={`tel:${studio.phoneRaw}`}
                        onClick={() => trackPixelEvent("Contact", { content_name: `Contact Page Call ${studio.city}` })}
                        className="text-sm text-brand-text/80 hover:text-[#ab7f51] transition-colors leading-relaxed block"
                      >
                        {studio.phone}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-[#f5eae2] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#ab7f51]" />
                    </div>
                    <div className="space-y-1 flex-grow">
                      <span className="text-[10px] font-bold tracking-widest text-[#ab7f51] block uppercase">
                        EMAIL
                      </span>
                      <a
                        href={`mailto:${studio.email}`}
                        className="text-sm text-brand-text/80 hover:text-[#ab7f51] transition-colors leading-relaxed block"
                      >
                        {studio.email}
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-[#f5eae2] flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-[#ab7f51]" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold tracking-widest text-[#ab7f51] block uppercase">
                        HOURS
                      </span>
                      <div className="text-sm text-brand-text/80 leading-relaxed space-y-1">
                        {studio.hours.map((h, i) => (
                          <div key={i} className="flex space-x-2">
                            <span className="font-medium">{h.days}:</span>
                            <span>{h.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider Line */}
                <hr className="border-t border-[#e8ceb1]/40 my-6" />

                {/* Card Footer Actions */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={triggerBooking}
                    className="bg-[#c39f75] hover:bg-[#b08b62] text-white font-semibold text-xs tracking-wider uppercase py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    BOOK NOW
                  </button>
                  <a
                    href={studio.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[#c39f75]/60 hover:border-[#c39f75] text-[#ab7f51] hover:bg-[#f6ede7]/40 font-semibold text-xs tracking-wider uppercase py-3 px-6 rounded-full flex items-center space-x-1.5 transition-all duration-300 hover:scale-105"
                  >
                    <span>GET DIRECTIONS</span>
                    <span className="text-xs leading-none">↗</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
