import locations from "@/data/locations.json";
import projects from "@/data/projects.json";
import developers from "@/data/developers.json";
import propertyTypes from "@/data/property-types.json";
import blogs from "@/data/blogs.json";
import faqs from "@/data/faqs.json";
import testimonials from "@/data/testimonials.json";
import localities from "@/data/localities.json";
import type { Location } from "@/types/location";
import type { Project } from "@/types/project";
import type { Developer } from "@/types/developer";
import type { PropertyType } from "@/types/property-type";
import type { Blog } from "@/types/blog";
import type { FAQ } from "@/types/faq";
import type { Testimonial } from "@/types/testimonial";
import type { Locality } from "@/types/locality";

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
