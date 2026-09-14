"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Calendar, Clock, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { blogsData, blogCategories, BlogArticle } from "@/data/blogs";
import { trackPageView, trackViewContent } from "@/utils/pixel";

export default function BlogListingClient() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [filteredBlogs, setFilteredBlogs] = useState<BlogArticle[]>(blogsData);

  useEffect(() => {
    trackPageView("blog");
    trackViewContent({ title: "Blog", category: "Content" });
  }, []);

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredBlogs(blogsData);
    } else {
      setFilteredBlogs(blogsData.filter((b) => b.categorySlug === activeCategory));
    }
  }, [activeCategory]);

  return (
    <div className="flex flex-col w-full bg-[#2d221f] text-[#f6ede7]">
      {/* 1. Hero Banner */}
      <section className="relative w-full min-h-[480px] md:min-h-[550px] pt-32 pb-20 md:pt-48 md:pb-24 flex items-center justify-center overflow-hidden border-b border-[#3e322e]">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-studio.webp"
            alt="Beverly Hills Clinic Blog Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2d221f] via-[#2d221f]/90 to-[#2d221f]/70 z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center justify-center space-x-2 text-xs font-medium text-[#e8ceb1]/80 tracking-wider uppercase">
            <Link href="/" className="hover:text-[#f6ede7] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#ab7f51]" />
            <span className="text-[#ab7f51] font-semibold">Blog</span>
          </nav>

          <span className="text-xs font-bold uppercase tracking-widest text-[#ab7f51] block">
            EXPERT DENTAL & AESTHETIC GUIDES
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#f6ede7] leading-tight">
            Dental & Aesthetic Insights
          </h1>

          <div className="w-16 h-[2px] bg-[#ab7f51]/60 mx-auto rounded-full" />

          <p className="text-sm sm:text-base text-[#f6ede7]/85 max-w-2xl mx-auto leading-relaxed font-light">
            Explore expert dental advice, treatment guides, oral health tips, and aesthetic treatment information from Beverly Hills Clinic DHA Karachi.
          </p>
        </div>
      </section>

      {/* 2. Blog Categories & Listing Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Category Filters */}
        <div className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar gap-2 pb-6 mb-12 border-b border-[#3e322e]">
          {blogCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 cursor-pointer ${
                activeCategory === cat.slug
                  ? "bg-gradient-to-r from-[#ab7f51] to-[#e8ceb1] text-[#2d221f] font-semibold shadow-md"
                  : "bg-[#241a18] text-[#f6ede7]/70 hover:text-[#e8ceb1] hover:bg-[#3e322e]/60 border border-[#3e322e]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Blog Cards Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-[#241a18] border border-[#3e322e] hover:border-[#ab7f51]/60 rounded-3xl overflow-hidden shadow-lg flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1"
              >
                <div>
                  {/* Article Featured Image */}
                  <div className="relative w-full h-52 overflow-hidden bg-[#2d221f]">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-[#2d221f]/90 text-[#e8ceb1] border border-[#ab7f51]/40 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  {/* Article Details */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center space-x-3 text-[11px] text-[#f6ede7]/50 font-light">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-[#ab7f51]" />
                        <span>{blog.publishedDate}</span>
                      </div>
                      <span>&bull;</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-[#ab7f51]" />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>

                    <h2 className="text-lg font-serif font-semibold text-[#f6ede7] group-hover:text-[#e8ceb1] transition-colors leading-snug line-clamp-2">
                      <Link href={`/blog/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h2>

                    <p className="text-xs text-[#f6ede7]/75 leading-relaxed font-light line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="p-6 pt-0 border-t border-[#3e322e]/60 mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-[#e8ceb1]/80 font-medium truncate max-w-[180px]">
                    {blog.author}
                  </span>

                  <Link
                    href={`/blog/${blog.slug}`}
                    className="text-xs font-semibold text-[#ab7f51] hover:text-[#e8ceb1] flex items-center space-x-1 transition-colors group/link"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-4">
            <BookOpen className="w-12 h-12 text-[#ab7f51] mx-auto opacity-50" />
            <h3 className="text-lg font-serif text-[#e8ceb1]">No Articles Found</h3>
            <p className="text-xs text-[#f6ede7]/60">Select a different category to view articles.</p>
          </div>
        )}
      </section>
    </div>
  );
}
