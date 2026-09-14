"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Calendar,
  Clock,
  User,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Share2,
} from "lucide-react";
import { BlogArticle } from "@/data/blogs";
import { getServicesByCategory, getAllServices } from "@/data/services";
import { trackPageView, trackViewContent, trackInitiateBooking } from "@/utils/pixel";

interface BlogDetailClientProps {
  blog: BlogArticle;
}

export default function BlogDetailClient({ blog }: BlogDetailClientProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    trackPageView(`blog-${blog.slug}`);
    trackViewContent({
      title: blog.title,
      category: "Blog Article",
    });
  }, [blog.slug, blog.title]);

  const handleOpenBooking = () => {
    trackInitiateBooking(`Blog Article CTA - ${blog.title}`);
    window.dispatchEvent(new CustomEvent("open-booking"));
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  // Find related services based on relatedServicesSlugs or default services
  const allServices = getAllServices();
  const relatedServices = allServices
    .filter((s) => blog.relatedServicesSlugs?.includes(s.slug))
    .slice(0, 3);
  const fallbackServices = relatedServices.length > 0 ? relatedServices : allServices.slice(0, 3);

  return (
    <div className="flex flex-col w-full bg-[#2d221f] text-[#f6ede7]">
      {/* 1. Article Hero Header */}
      <section className="relative w-full pt-44 pb-8 md:pt-36 md:pb-10 border-b border-[#3e322e] bg-[#241a18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-xs font-medium text-[#e8ceb1]/80 tracking-wider uppercase">
            <Link href="/" className="hover:text-[#f6ede7] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#ab7f51]" />
            <Link href="/blog" className="hover:text-[#f6ede7] transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#ab7f51]" />
            <span className="text-[#ab7f51] font-semibold truncate max-w-[200px]">
              {blog.title}
            </span>
          </nav>

          {/* Category Badge */}
          <div>
            <span className="bg-[#ab7f51]/20 text-[#e8ceb1] border border-[#ab7f51]/40 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              {blog.category}
            </span>
          </div>

          {/* Article Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#f6ede7] leading-tight">
            {blog.title}
          </h1>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#f6ede7]/70 font-light border-y border-[#3e322e] py-3">
            <div className="flex items-center space-x-1.5">
              <User className="w-4 h-4 text-[#ab7f51]" />
              <span className="text-[#e8ceb1] font-medium">{blog.author}</span>
            </div>
            <span>&bull;</span>
            <div className="flex items-center space-x-1.5">
              <Calendar className="w-4 h-4 text-[#ab7f51]" />
              <span>{blog.publishedDate}</span>
            </div>
            <span>&bull;</span>
            <div className="flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-[#ab7f51]" />
              <span>{blog.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Article Content Flow */}
      <article className="py-8 md:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        {/* Featured Image (Only rendered if image exists) */}
        {blog.image && (
          <div className="relative w-full h-[240px] sm:h-[360px] md:h-[420px] rounded-2xl overflow-hidden shadow-xl border border-[#3e322e]">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              priority={true}
              sizes="(max-width: 1200px) 100vw, 900px"
              className="object-cover object-center"
            />
          </div>
        )}

        {/* Intro Lead Paragraph */}
        {blog.content?.intro && (
          <div className="text-base sm:text-lg text-[#f6ede7]/90 leading-relaxed font-light border-l-2 border-[#ab7f51] pl-6 italic bg-[#241a18] py-4 rounded-r-2xl">
            {blog.content.intro}
          </div>
        )}

        {/* Dynamic Sections */}
        {blog.content.sections.map((sec, idx) => (
          <section key={idx} className="space-y-4 pt-4">
            <h2 className="text-2xl sm:text-3xl font-serif text-[#e8ceb1] leading-snug">
              {sec.heading}
            </h2>

            {sec.paragraphs.map((p, pIdx) => (
              <p key={pIdx} className="text-sm sm:text-base text-[#f6ede7]/80 leading-relaxed font-light">
                {p}
              </p>
            ))}

            {sec.bulletPoints && sec.bulletPoints.length > 0 && (
              <ul className="space-y-2.5 pt-2 pl-4">
                {sec.bulletPoints.map((b, bIdx) => (
                  <li key={bIdx} className="flex items-start text-xs sm:text-sm text-[#f6ede7]/85 space-x-2.5">
                    <Sparkles className="w-4 h-4 text-[#ab7f51] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {/* Conclusion */}
        <div className="bg-[#241a18] border border-[#3e322e] p-6 sm:p-8 rounded-3xl space-y-3">
          <h3 className="text-lg font-serif font-semibold text-[#e8ceb1]">
            Conclusion & Key Takeaways
          </h3>
          <p className="text-sm text-[#f6ede7]/80 leading-relaxed font-light">
            {blog.content.conclusion}
          </p>
        </div>

        {/* FAQs Section */}
        {blog.faqs && blog.faqs.length > 0 && (
          <section className="pt-6 space-y-6 border-t border-[#3e322e]">
            <div className="flex items-center space-x-3">
              <HelpCircle className="w-6 h-6 text-[#ab7f51]" />
              <h2 className="text-2xl font-serif text-[#f6ede7]">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {blog.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-[#241a18] border border-[#3e322e] rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none hover:bg-[#3e322e]/40 transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-semibold text-[#e8ceb1]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#ab7f51] transition-transform duration-300 ${
                        openFaq === idx ? "rotate-180 text-[#e8ceb1]" : ""
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="p-5 pt-0 border-t border-[#3e322e]/40 text-xs sm:text-sm text-[#f6ede7]/80 leading-relaxed font-light">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Services Links */}
        {fallbackServices.length > 0 && (
          <section className="pt-8 border-t border-[#3e322e] space-y-6">
            <h3 className="text-xl font-serif text-[#f6ede7]">
              Related Treatments at Beverly Hills Clinic
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {fallbackServices.map((srv) => (
                <Link
                  key={srv.slug}
                  href={`/services/${srv.slug}`}
                  className="bg-[#241a18] border border-[#3e322e] hover:border-[#ab7f51]/60 p-4 rounded-2xl space-y-2 group transition-all duration-300"
                >
                  <span className="text-[10px] font-bold text-[#ab7f51] uppercase tracking-wider block">
                    {srv.categoryName}
                  </span>
                  <h4 className="text-sm font-semibold text-[#e8ceb1] group-hover:text-[#f6ede7] transition-colors">
                    {srv.title}
                  </h4>
                  <div className="flex items-center text-xs text-[#ab7f51] pt-1 space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>Learn More</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Book Consultation CTA Banner */}
        <section className="bg-gradient-to-r from-[#3e322e] via-[#241a18] to-[#3e322e] border border-[#ab7f51]/40 rounded-3xl p-8 text-center space-y-5 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ab7f51]">
            EXPERT CLINICAL CONSULTATION
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#f6ede7]">
            Have Questions About Your Dental Health?
          </h2>
          <p className="text-xs sm:text-sm text-[#f6ede7]/80 max-w-xl mx-auto leading-relaxed font-light">
            Book a private, one-on-one consultation with our dental and aesthetic specialists at Beverly Hills Clinic DHA Karachi.
          </p>
          <div className="pt-2">
            <button
              onClick={handleOpenBooking}
              className="bg-gradient-to-r from-[#ab7f51] to-[#e8ceb1] text-[#2d221f] text-xs font-semibold py-3.5 px-8 rounded-full shadow-lg hover:brightness-110 active:scale-[0.99] transition-all duration-300 inline-flex items-center space-x-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation</span>
            </button>
          </div>
        </section>
      </article>
    </div>
  );
}
