import type { Meta } from "./common";

export interface DeveloperContact {
  phone: string;
  email: string;
  website: string;
  address: string;
}

export interface DeveloperSummary {
  id: string;
  slug: string;
  name: string;
  tagline: string;
}

export interface DeveloperAward {
  year: number;
  title: string;
  organization: string;
}

export interface Developer {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  coverImage: string;
  foundedYear: number;
  totalProjects: number;
  completedProjects: number;
  ongoingProjects: number;
  upcomingProjects: number;
  cityIds: string[];
  localityIds: string[];
  propertyTypeIds: string[];
  projectIds: string[];
  ratings: number;
  totalReviews: number;
  contact: DeveloperContact;
  awards: DeveloperAward[];
  meta: Meta;
  createdAt: string;
  updatedAt: string;
}

