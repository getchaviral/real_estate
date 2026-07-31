import { normalizedCollections } from "@/data/normalized";

export const entityStore = {
  getLocations: () => normalizedCollections.locations,
  getProjects: () => normalizedCollections.projects,
  getDevelopers: () => normalizedCollections.developers,
  getPropertyTypes: () => normalizedCollections.propertyTypes,
  getLocalities: () => normalizedCollections.localities,
  getBlogs: () => normalizedCollections.blogs,
  getFaqs: () => normalizedCollections.faqs,
  getTestimonials: () => normalizedCollections.testimonials,
};

export type EntityStore = typeof entityStore;
