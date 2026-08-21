import type { MetadataRoute } from "next";
import { loadCSVProjects } from "@/services/csv-project-service";
import { normalizeDataset } from "@/lib/csvData";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = loadCSVProjects();
  const { cities, developers } = normalizeDataset(projects);
  const now = new Date();
  const urls = new Map<string, MetadataRoute.Sitemap[number]>();

  const add = (pathname: string, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"], priority: number) => {
    const url = absoluteUrl(pathname);
    if (!urls.has(url)) urls.set(url, { url, lastModified: now, changeFrequency, priority });
  };

  add("/", "weekly", 1);
  add("/projects", "daily", 0.9);
  for (const project of projects) add(`/projects/${project.slug}`, "weekly", 0.8);
  for (const city of cities) add(`/locations/${city.slug}`, "weekly", 0.7);
  for (const developer of developers) add(`/developers/${developer.slug}`, "weekly", 0.7);

  return Array.from(urls.values());
}