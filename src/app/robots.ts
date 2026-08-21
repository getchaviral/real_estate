import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/projects/", "/locations/", "/developers/"],
      disallow: ["/api/", "/_next/", "/projects?"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}