import { ServiceData } from "./services/types";
import { dentalServices } from "./services/dental";
import { aestheticServices } from "./services/aesthetic";

export type { ServiceData, ServiceSection, ServiceFAQ } from "./services/types";

export const servicesData: ServiceData[] = [...dentalServices, ...aestheticServices];

// Helper query functions
export function getAllServices(): ServiceData[] {
  return servicesData;
}

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData.find((service) => service.slug === slug);
}

export function getServicesByCategory(category: "dentistry" | "aesthetics"): ServiceData[] {
  return servicesData.filter((service) => service.category === category);
}

export function getRelatedServices(currentSlug: string, relatedSlugs: string[]): ServiceData[] {
  const related = servicesData.filter((service) => relatedSlugs.includes(service.slug));
  if (related.length < 3) {
    const current = getServiceBySlug(currentSlug);
    if (current) {
      const sameCategory = servicesData.filter(
        (s) => s.category === current.category && s.slug !== currentSlug && !relatedSlugs.includes(s.slug)
      );
      return [...related, ...sameCategory].slice(0, 4);
    }
  }
  return related.slice(0, 4);
}
