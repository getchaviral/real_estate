import type { Metadata } from "next";
import { SITE_CONFIG, PROJECT_STATUS_LABELS } from "@/lib/constants";
import { formatPriceRange } from "@/lib/utils";
import type { Project } from "@/types/project";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function absoluteUrl(pathname: string) {
  return new URL(pathname, SITE_URL).toString();
}

function firstValue(value?: string | string[]) {
  if (Array.isArray(value)) return value.filter(Boolean).join(", ");
  return value?.trim() || "";
}

export function projectPrice(project: Project) {
  if (project.priceRange?.min || project.priceRange?.max) {
    return formatPriceRange(project.priceRange.min, project.priceRange.max);
  }

  return firstValue(project.priceRangeApprox);
}

export function projectMetadata(project: Project): Metadata {
  const location = firstValue(project.location || project.locationSectorArea || project.cityName);
  const developer = firstValue(project.developerName || project.builderName || project.developer);
  const propertyType = firstValue(project.propertyTypes || project.propertyType || project.projectType);
  const status = PROJECT_STATUS_LABELS[project.status] || firstValue(project.rawStatus || project.status);
  const price = projectPrice(project);
  const possession = firstValue(project.possessionDate || project.possessionCompletion);
  const facts = [location, developer, price, propertyType, status, possession && `possession ${possession}`].filter(Boolean);
  const description = `${project.name}${facts.length ? ` in ${facts.join(", ")}` : ""}. View project details, pricing, property information, and contact options on ${SITE_CONFIG.name}.`;
  const url = absoluteUrl(`/projects/${project.slug}`);

  return {
    title: `${project.name}${location ? `, ${location}` : ""}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.name}${location ? ` in ${location}` : ""}`,
      description,
      url,
      type: "website",
      images: project.images?.hero ? [{ url: project.images.hero, alt: `${project.name}${location ? ` residential project in ${location}` : " project"}` }] : undefined,
    },
    twitter: { card: "summary_large_image", title: `${project.name}${location ? ` in ${location}` : ""}`, description },
    robots: { index: true, follow: true },
  };
}

export function cityMetadata(name: string, slug: string, count: number): Metadata {
  const title = `Properties in ${name}`;
  const description = `Explore ${count} real estate ${count === 1 ? "project" : "projects"} in ${name} with YouWe Homes.`;
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(`/locations/${slug}`) },
    openGraph: { title, description, url: absoluteUrl(`/locations/${slug}`), type: "website" },
    twitter: { card: "summary", title, description },
  };
}

export function developerMetadata(name: string, slug: string, count: number): Metadata {
  const title = `${name} Projects`;
  const description = `Explore ${count} real estate ${count === 1 ? "project" : "projects"} by ${name} on YouWe Homes.`;
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(`/developers/${slug}`) },
    openGraph: { title, description, url: absoluteUrl(`/developers/${slug}`), type: "website" },
    twitter: { card: "summary", title, description },
  };
}