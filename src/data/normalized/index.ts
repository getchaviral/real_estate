import blogs from "@/data/blogs.json";
import faqs from "@/data/faqs.json";
import testimonials from "@/data/testimonials.json";
import localities from "@/data/localities.json";
import type { Blog } from "@/types/blog";
import type { FAQ } from "@/types/faq";
import type { Testimonial } from "@/types/testimonial";
import type { Locality } from "@/types/locality";

let projects: any[] = [];
let locations: any[] = [];
let developers: any[] = [];
let propertyTypes: any[] = [];

if (typeof window === 'undefined') {
  // Server environment: require the CSV service dynamically so bundlers
  // don't try to include `fs` for client bundles.
  const csvService = eval("typeof require !== 'undefined' ? require('@/services/csv-project-service') : undefined") as any;
  const csvData = eval("typeof require !== 'undefined' ? require('@/lib/csvData') : undefined") as any;
  const loadedProjects = csvService?.loadCSVProjects?.() as any[] || [];
  const normalized = csvData?.normalizeDataset?.(loadedProjects) || { cities: [], developers: [], propertyTypes: [] };
  projects = loadedProjects;
  locations = normalized.cities;
  developers = normalized.developers;
  propertyTypes = normalized.propertyTypes;
}
import type { Location } from "@/types/location";
import type { Project } from "@/types/project";
import type { Developer } from "@/types/developer";
import type { PropertyType } from "@/types/property-type";

export const normalizedData = {
  locations: locations as Location[],
  projects: projects as Project[],
  developers: developers as Developer[],
  propertyTypes: propertyTypes as PropertyType[],
  localities: localities as Locality[],
  blogs: blogs as Blog[],
  faqs: faqs as FAQ[],
  testimonials: testimonials as Testimonial[],
};

export const normalizedCollections = {
  locations: normalizedData.locations,
  projects: normalizedData.projects,
  developers: normalizedData.developers,
  propertyTypes: normalizedData.propertyTypes,
  localities: normalizedData.localities,
  blogs: normalizedData.blogs,
  faqs: normalizedData.faqs,
  testimonials: normalizedData.testimonials,
};

export type NormalizedData = typeof normalizedData;
