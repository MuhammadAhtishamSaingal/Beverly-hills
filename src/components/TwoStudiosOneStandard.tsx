"use client";

import Image from "next/image";
import { MapPin, Phone, Calendar } from "lucide-react";
import { trackPixelEvent } from "@/utils/pixel";

export default function TwoStudiosOneStandard() {
  const cards = [
    {
      studio: "Sharfabad",
      desktopImage: "/images/DESKTOP1_MARQE_1200.webp",
      mobileImage: "/images/MOBILE1_MARQE.webp",
      address: "15/36 Road 03, Behind Alkhaleej Tower, BMCHS Sharfabad",
      city: "Karachi",
      phone: "0307-0984307",
      phoneRaw: "03070984307",
    },
    {
      studio: "Badar Commercial",
      desktopImage: "/images/DESKTOP4_MARQE_1200.webp",
      mobileImage: "/images/MOBILE4_MARQE.webp",
      address: "2nd Floor, Main Saba Avenue, Phase 5, DHA Badar Commercial",
      city: "Karachi",
      phone: "0307-0984307",
      phoneRaw: "03070984307",
    },
  ];

  const triggerBooking = () => {
    trackPixelEvent("InitiateCheckout", { content_name: "Two Studios Book Visit" });
    window.dispatchEvent(new Event("open-booking"));
  };

  return (
    <section className="py-24 bg-brand-primary border-t border-brand-secondary/40 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-left max-w-3xl space-y-4 mb-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-[1px] bg-brand-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
              OUR CLINICS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-semibold font-heading text-brand-text leading-tight">
            Two clinics, one standard
          </h2>
        </div>

        {/* Side-by-Side Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white border border-brand-secondary/30 rounded-2xl overflow-hidden shadow-xs hover:shadow-sm transition-all duration-300 flex flex-col justify-between"
            >
              {/* Studio Image */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <Image
                  src={card.desktopImage}
                  alt={`Beverly Hills Clinic ${card.studio}`}
                  fill
                  sizes="(max-w-768px) 100vw, 45vw"
                  className="hidden md:block object-cover"
                />
                <Image
                  src={card.mobileImage}
                  alt={`Beverly Hills Clinic ${card.studio} Mobile`}
                  fill
                  sizes="(max-w-768px) 100vw, 100vw"
                  className="block md:hidden object-cover"
                />
              </div>

              {/* Details Block */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between bg-[#fcf8f6] space-y-6">

                <div className="space-y-4 text-left">
                  {/* Location Title */}
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-brand-text">
                    {card.studio}
                  </h3>

                  <div className="space-y-2.5 pt-1 text-xs sm:text-sm text-brand-text/75">
                    {/* Address Line */}
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 text-brand-accent mr-2.5 mt-0.5 flex-shrink-0" />
                      <span>
                        {card.address}, {card.city}
                      </span>
                    </div>

                    {/* Phone Line */}
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-brand-accent mr-2.5 flex-shrink-0" />
                      <a
                        href={`tel:${card.phoneRaw}`}
                        onClick={() => trackPixelEvent("Contact", { content_name: `Two Studios Call ${card.studio}` })}
                        className="hover:text-brand-accent transition-colors font-medium"
                      >
                        {card.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card CTAs Row */}
                <div className="flex items-center space-x-6 pt-4 border-t border-brand-secondary/20 w-full">
                  <button
                    onClick={triggerBooking}
                    className="btn-primary py-2.5 px-6 rounded-full text-xs font-semibold shadow-xs"
                  >
                    BOOK A VISIT
                  </button>

                  <a
                    href={`tel:${card.phoneRaw}`}
                    onClick={() => trackPixelEvent("Contact", { content_name: `Two Studios Call CTA ${card.studio}` })}
                    className="text-xs font-bold text-brand-text hover:text-brand-accent hover:underline flex items-center space-x-1"
                  >
                    <span>CALL CLINIC</span>
                    <span>&rarr;</span>
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
