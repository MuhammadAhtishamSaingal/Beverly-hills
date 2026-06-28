"use client";

import Image from "next/image";
import { Phone, Calendar, MapPin, Clock, Mail, ExternalLink } from "lucide-react";

export default function ContactPage() {
  const triggerBooking = () => {
    window.dispatchEvent(new Event("open-booking"));
  };

  const studios = [
    {
      city: "Sharfabad",
      address: "15/36 house number road no.03 right behind Alkhaleej tower BMCHS sharfabad",
      zip: "Karachi",
      phone: "0307-0984307",
      phoneRaw: "03070984307",
      email: "sharfabad@beverlyhillsclinic.com",
      image: "/images/studio-sf.png",
      hours: [
        { days: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
        { days: "Saturday - Sunday", time: "Closed" },
      ],
      mapUrl: "https://maps.google.com/?q=Al+Khaleej+Tower+Karachi",
      mapEmbedUrl:
        "https://maps.google.com/maps?q=Al%20Khaleej%20Tower%2C%20Karachi&t=&z=15&ie=UTF8&iwloc=&output=embed",
    },
    {
      city: "Badar Commercial",
      address: "2nd floor, Main Saba Avenue, Phase 5, Badar Commercial Area, Above Ocean Pharmacy",
      zip: "Karachi",
      phone: "0307-0984307",
      phoneRaw: "03070984307",
      email: "badar@beverlyhillsclinic.com",
      image: "/images/studio-mv.png",
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
      {/* 1. Page Header */}
      <section className="bg-brand-secondary/20 border-b border-brand-secondary/40 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-heading text-brand-text">
            We are here when you need us.
          </h1>
          <div className="w-12 h-1 bg-brand-accent/40 mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-brand-text/75 max-w-xl mx-auto leading-relaxed">
            Ready to book your visit or have specific questions about treatments? Tap below to open our digital scheduling request.
          </p>
          <div className="pt-2">
            <button
              onClick={triggerBooking}
              className="btn-primary py-3 px-8 text-sm flex items-center justify-center space-x-2 mx-auto"
            >
              <Calendar className="w-4.5 h-4.5" />
              <span>Book a Visit</span>
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
              className="bg-white border border-brand-secondary/40 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-8"
            >
              {/* Studio Info Header */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-brand-secondary/30">
                    <Image
                      src={studio.image}
                      alt={`Beverly Hills Clinic ${studio.city}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-brand-accent uppercase tracking-wider block">
                      Location Studio
                    </span>
                    <h2 className="text-2xl font-bold font-heading text-brand-text">
                      {studio.city}
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                  {/* Address, Phone, Email */}
                  <div className="space-y-3.5">
                    <div className="flex items-start">
                      <MapPin className="w-4.5 h-4.5 text-brand-accent mr-2.5 mt-0.5 flex-shrink-0" />
                      <div className="flex flex-col text-brand-text/80 leading-relaxed">
                        <span className="font-semibold text-xs leading-normal">{studio.address}</span>
                        <span className="text-xs">{studio.zip}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4.5 h-4.5 text-brand-accent mr-2.5 flex-shrink-0" />
                      <a
                        href={`tel:${studio.phoneRaw}`}
                        className="text-brand-text/85 hover:text-brand-accent transition-colors font-medium"
                      >
                        {studio.phone}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4.5 h-4.5 text-brand-accent mr-2.5 flex-shrink-0" />
                      <a
                        href={`mailto:${studio.email}`}
                        className="text-brand-text/85 hover:text-brand-accent transition-colors text-xs"
                      >
                        {studio.email}
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="space-y-2 bg-brand-primary/20 border border-brand-secondary/35 rounded-xl p-4">
                    <div className="flex items-center space-x-1.5 text-brand-accent mb-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">Studio Hours</span>
                    </div>
                    <div className="space-y-1.5 text-xs text-brand-text/80">
                      {studio.hours.map((h, i) => (
                        <div key={i} className="flex justify-between">
                          <span className="font-medium">{h.days}:</span>
                          <span>{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={triggerBooking}
                  className="btn-primary py-2.5 text-sm flex items-center justify-center space-x-1.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Now</span>
                </button>
                <a
                  href={studio.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary py-2.5 text-sm flex items-center justify-center space-x-1.5"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Google Map Embed */}
              <div className="w-full h-72 rounded-xl overflow-hidden border border-brand-secondary/40 shadow-inner relative bg-brand-secondary/10">
                <iframe
                  src={studio.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Google Maps embed location for Beverly Hills Clinic ${studio.city}`}
                  className="absolute inset-0"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
