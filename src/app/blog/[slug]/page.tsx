import { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogsData, getBlogBySlug, getAllBlogs } from "@/data/blogs";
import BlogDetailClient from "./BlogDetailClient";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Article Not Found | Beverly Hills Clinic",
      description: "Requested blog article could not be found.",
    };
  }

  const pageUrl = `https://www.beverlyhills.clinic/blog/${blog.slug}`;
  const imageUrl = blog.image.startsWith("http")
    ? blog.image
    : `https://www.beverlyhills.clinic${blog.image}`;

  return {
    title: blog.metaTitle,
    description: blog.metaDescription,
    keywords: blog.keywords,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: blog.metaTitle,
      description: blog.metaDescription,
      url: pageUrl,
      siteName: "Beverly Hills Clinic",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      locale: "en_PK",
      type: "article",
      publishedTime: blog.publishedDate,
      authors: [blog.author],
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.excerpt,
    "image": blog.image.startsWith("http") ? blog.image : `https://www.beverlyhills.clinic${blog.image}`,
    "datePublished": blog.publishedDate,
    "author": {
      "@type": "Organization",
      "name": blog.author,
      "url": "https://www.beverlyhills.clinic",
    },
    "publisher": {
      "@type": "MedicalOrganization",
      "name": "Beverly Hills Clinic Karachi",
      "url": "https://www.beverlyhills.clinic",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.beverlyhills.clinic/images/logo.png",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.beverlyhills.clinic/blog/${blog.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogDetailClient blog={blog} />
    </>
  );
}
