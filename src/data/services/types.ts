export interface ServiceSection {
  title: string;
  content: string[];
  image: string;
  imageAlt: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceData {
  id: string;
  slug: string;
  title: string;
  category: "dentistry" | "aesthetics";
  categoryName: string;
  heroImage: string;
  introHeading: string;
  introText: string;
  bulletBenefits: string[];
  candidateInfo: string;
  whyChooseClinic: string;
  duration: string;
  suitability: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  sections: ServiceSection[];
  faqs: ServiceFAQ[];
  relatedSlugs: string[];
}
