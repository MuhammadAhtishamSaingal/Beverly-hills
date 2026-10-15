export interface ClinicLocation {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  area: string;
  address: string;
  city: string;
  phone: string;
  phoneRaw: string;
  phoneIntl: string;
  email: string;
  desktopImage: string;
  mobileImage: string;
  hours: { days: string; time: string }[];
  mapUrl: string;
  mapEmbedUrl: string;
  geo?: { latitude: number; longitude: number };
}

export const CLINIC_EMAIL = "clinicbeverlyhills@gmail.com";
export const CLINIC_PHONE = "0307-0984307";
export const CLINIC_PHONE_RAW = "03070984307";
export const CLINIC_PHONE_INTL = "+923070984307";
export const CLINIC_WHATSAPP = "923002271299";
export const CONSULTATION_FEE = "PKR 3,000";

const defaultHours = [
  { days: "Monday - Saturday", time: "9:00 AM - 6:00 PM" },
  { days: "Sunday", time: "Closed" },
];

export const locations: ClinicLocation[] = [
  {
    id: "DHA Karachi",
    slug: "dha-karachi",
    name: "DHA Karachi Clinic",
    shortName: "DHA Phase 5",
    area: "DHA Phase 5",
    address: "Above Ocean Supermart & Pharmacy 2nd floor, Main Saba Avenue, Phase 5, DHA Karachi",
    city: "Karachi",
    phone: CLINIC_PHONE,
    phoneRaw: CLINIC_PHONE_RAW,
    phoneIntl: CLINIC_PHONE_INTL,
    email: CLINIC_EMAIL,
    desktopImage: "/images/DESKTOP4_MARQE_1200.webp",
    mobileImage: "/images/MOBILE4_MARQE.webp",
    hours: defaultHours,
    mapUrl: "https://maps.google.com/?q=Saba+Avenue+Badar+Commercial+Karachi",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Saba%20Avenue%2C%20Badar%20Commercial%2C%20Karachi&t=&z=15&ie=UTF8&iwloc=&output=embed",
    geo: { latitude: 24.8007, longitude: 67.0601 },
  },
  {
    id: "Bahadurabad",
    slug: "bahadurabad",
    name: "Bahadurabad Clinic",
    shortName: "Bahadurabad",
    area: "Bahadurabad / Sharfabad",
    address: "15/36 BMCHS, Road No. 03, Behind Medicare Hospital, Sharfabad, Karachi",
    city: "Karachi",
    phone: CLINIC_PHONE,
    phoneRaw: CLINIC_PHONE_RAW,
    phoneIntl: CLINIC_PHONE_INTL,
    email: CLINIC_EMAIL,
    desktopImage: "/images/DESKTOP2_MARQE_1200.jpg",
    mobileImage: "/images/MOBILE2_MARQE.jpg",
    hours: defaultHours,
    mapUrl: "https://maps.google.com/?q=Medicare+Hospital+Sharfabad+BMCHS+Karachi",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Medicare%20Hospital%2C%20Sharfabad%2C%20BMCHS%2C%20Karachi&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
];

export const ONLINE_CONSULTATION_ID = "Online Consultation";

export function getLocationById(id: string) {
  return locations.find((loc) => loc.id === id);
}

/** schema.org Dentist entities for every physical branch. */
export function clinicSchemaBranches(baseUrl: string) {
  return locations.map((loc) => ({
    "@type": "Dentist",
    "@id": `${baseUrl}/contact#${loc.slug}`,
    name: `Beverly Hills Clinic ${loc.shortName}`,
    url: `${baseUrl}/contact#${loc.slug}`,
    telephone: loc.phoneIntl,
    email: loc.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.address,
      addressLocality: "Karachi",
      addressRegion: "Sindh",
      addressCountry: "PK",
    },
    ...(loc.geo
      ? { geo: { "@type": "GeoCoordinates", latitude: loc.geo.latitude, longitude: loc.geo.longitude } }
      : {}),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  }));
}
