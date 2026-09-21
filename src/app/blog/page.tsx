import { Metadata } from "next";
import BlogListingClient from "./BlogListingClient";

export const metadata: Metadata = {
  title: "Dental & Aesthetic Blog | Beverly Hills Clinic DHA Karachi",
  description:
    "Read expert dental care guides, cosmetic dentistry tips, and aesthetic treatment information from Beverly Hills Clinic DHA Karachi.",
  keywords: [
    "Dental blog Karachi",
    "Cosmetic dentistry guides Karachi",
    "Dental implants blog DHA Karachi",
    "Teeth whitening tips Karachi",
    "Beverly Hills Clinic Karachi blog",
  ],
  alternates: {
    canonical: "https://beverlyhillsclinic.com.pk/blog",
  },
  openGraph: {
    title: "Dental & Aesthetic Blog | Beverly Hills Clinic DHA Karachi",
    description:
      "Read expert dental care guides, cosmetic dentistry tips, and aesthetic treatment information from Beverly Hills Clinic DHA Karachi.",
    url: "https://beverlyhillsclinic.com.pk/blog",
    siteName: "Beverly Hills Clinic",
    images: [
      {
        url: "https://beverlyhillsclinic.com.pk/images/hero-studio.webp",
        width: 1200,
        height: 630,
        alt: "Beverly Hills Clinic Dental & Aesthetic Insights",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
};

export default function BlogListingPage() {
  return <BlogListingClient />;
}
