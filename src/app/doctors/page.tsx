import { Metadata } from "next";
import DoctorsClient from "./DoctorsClient";

export const metadata: Metadata = {
  title: "Doctors | Beverly Hills Clinic DHA Karachi",
  description:
    "Meet Beverly Hills Clinic dental and aesthetic specialists providing advanced treatments in DHA Karachi.",
  keywords: [
    "Beverly Hills Clinic doctors",
    "Dentists DHA Karachi",
    "Aesthetic doctors Karachi",
    "Cosmetic dentist DHA Karachi",
    "Implant specialist Karachi",
  ],
  alternates: {
    canonical: "https://www.beverlyhills.clinic/doctors",
  },
  openGraph: {
    title: "Doctors | Beverly Hills Clinic DHA Karachi",
    description:
      "Meet Beverly Hills Clinic dental and aesthetic specialists providing advanced treatments in DHA Karachi.",
    url: "https://www.beverlyhills.clinic/doctors",
    siteName: "Beverly Hills Clinic",
    images: [
      {
        url: "https://www.beverlyhills.clinic/images/patient_%20banner.webp",
        width: 1200,
        height: 630,
        alt: "Beverly Hills Clinic Medical Specialists",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
};

export default function DoctorsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "Beverly Hills Clinic Karachi - Specialists & Doctors",
    "url": "https://www.beverlyhills.clinic/doctors",
    "logo": "https://www.beverlyhills.clinic/images/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Above Ocean Supermart & Pharmacy 2nd floor, Main Saba Avenue, Phase 5, DHA Karachi",
      "addressLocality": "Karachi",
      "addressRegion": "Sindh",
      "postalCode": "75500",
      "addressCountry": "PK",
    },
    "medicalSpecialty": [
      "Cosmetic Dentistry",
      "Implantology",
      "Orthodontics",
      "Endodontics",
      "Facial Aesthetics",
    ],
    "employee": [
      {
        "@type": "Physician",
        "name": "Senior Consultant Dentist & Implantologist",
        "jobTitle": "Consultant Dental Surgeon",
        "medicalSpecialty": "Cosmetic Dentistry & Dental Implants",
      },
      {
        "@type": "Physician",
        "name": "Consultant Facial Aesthetic Physician",
        "jobTitle": "Aesthetic Medicine Specialist",
        "medicalSpecialty": "Non-Surgical Aesthetics & Laser Dermatology",
      },
      {
        "@type": "Physician",
        "name": "Consultant Orthodontist & Aligner Specialist",
        "jobTitle": "Specialist Orthodontist",
        "medicalSpecialty": "Orthodontics & Dentofacial Orthopedics",
      },
      {
        "@type": "Physician",
        "name": "Consultant Endodontist & Restorative Specialist",
        "jobTitle": "Specialist Endodontist",
        "medicalSpecialty": "Microscopic Endodontics & Conservative Dentistry",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DoctorsClient />
    </>
  );
}
