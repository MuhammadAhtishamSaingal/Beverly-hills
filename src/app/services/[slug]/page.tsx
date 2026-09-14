import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllServices,
  getServiceBySlug,
  getRelatedServices
} from "@/data/services";
import ServiceHero from "@/components/ServiceHero";
import ServiceIntro from "@/components/ServiceIntro";
import ServiceSections from "@/components/ServiceSections";
import ServiceTrust from "@/components/ServiceTrust";
import ServiceFAQ from "@/components/ServiceFAQ";
import RelatedServices from "@/components/RelatedServices";
import ServiceCTA from "@/components/ServiceCTA";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 1. Static site generation for all 35 service routes
export async function generateStaticParams() {
  const services = getAllServices();
  return services.map((service) => ({
    slug: service.slug
  }));
}

// 2. Dynamic SEO Metadata Generation
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    return {
      title: "Service Not Found | Beverly Hills Clinic Karachi"
    };
  }

  const pageUrl = `https://www.beverlyhills.clinic/services/${service.slug}`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: {
      canonical: pageUrl
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: pageUrl,
      siteName: "Beverly Hills Clinic Karachi",
      images: [
        {
          url: service.heroImage,
          width: 1200,
          height: 630,
          alt: `${service.title} at Beverly Hills Clinic Karachi`
        }
      ],
      locale: "en_PK",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
      images: [service.heroImage]
    }
  };
}

// 3. Dynamic Page Renderer Component
export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const relatedServices = getRelatedServices(service.slug, service.relatedSlugs);

  // MedicalBusiness / Dentist JSON-LD Schema
  const medicalBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": "Beverly Hills Clinic Karachi",
    "image": "https://www.beverlyhills.clinic/images/logo.png",
    "@id": "https://www.beverlyhills.clinic/#dentist",
    "url": "https://www.beverlyhills.clinic",
    "telephone": "+923070984307",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2nd Floor, Main Saba Avenue, Phase 5, DHA Karachi",
      "addressLocality": "Karachi",
      "addressRegion": "Sindh",
      "postalCode": "75500",
      "addressCountry": "PK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 24.7938,
      "longitude": 67.0645
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "11:00",
      "closes": "21:00"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Dental & Aesthetic Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": service.title,
            "description": service.introText
          }
        }
      ]
    }
  };

  return (
    <div className="flex flex-col w-full bg-brand-primary min-h-screen">
      {/* MedicalBusiness JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessSchema) }}
      />

      {/* 1. Hero Section */}
      <ServiceHero service={service} />

      {/* 2. Intro Section */}
      <ServiceIntro service={service} />

      {/* 3. 5-Section Editorial Layout */}
      <ServiceSections service={service} />

      {/* 4. Clinic Trust Authority Section */}
      <ServiceTrust
        candidateInfo={service.candidateInfo}
        whyChooseClinic={service.whyChooseClinic}
      />

      {/* 5. FAQ Accordion Section */}
      <ServiceFAQ faqs={service.faqs} serviceTitle={service.title} />

      {/* 6. Related Services Internal Linking */}
      <RelatedServices relatedServices={relatedServices} />

      {/* 7. Bottom Conversion CTA */}
      <ServiceCTA serviceTitle={service.title} />
    </div>
  );
}
