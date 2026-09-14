import { MetadataRoute } from "next";
import { getAllServices } from "@/data/services";
import { getAllBlogs } from "@/data/blogs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.beverlyhills.clinic";
  const services = getAllServices();
  const blogs = getAllBlogs();
  const currentDate = new Date().toISOString();

  // Core static site pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/clinic-tour`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/doctors`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/patients`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic service detail URLs
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Dynamic blog detail URLs
  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [...staticPages, ...servicePages, ...blogPages];
}

