import type { FloorPlan } from "./common";

export interface Project {
  id: string;
  slug: string;
  sNo: string | number;
  developer: string;
  builderName: string;
  projectName: string;
  locationSectorArea: string;
  location: string;
  address: string;
  projectType: string;
  propertyTypes: string[];
  propertyType: string[] | string;
  status: string;
  rawStatus: string;
  reraNo: string;
  reraNumber: string;
  areaAcres: string;
  totalArea: string;
  towers: string;
  totalTowers?: number;
  units: string;
  totalUnits?: number;
  configuration: string;
  unitSizeRange: string;
  priceRangeApprox: string;
  priceRange: { min?: number; max?: number; currency?: string };
  possessionCompletion: string;
  possessionDate: string;
  possessionStatus: string;
  keyAmenitiesFeatures: string;
  features: string[];
  amenities: string[];
  notes: string;
  name: string;
  tagline: string;
  description: string;
  category: 'residential' | 'commercial' | 'mixed' | string;
  developerId: string;
  cityId: string;
  developerName: string;
  cityName: string;
  authority?: string;
  ownership?: string;
  localityId?: string;
  locality: string;
  coordinates: { lat: number; lng: number };
  configurations: {
    type: string;
    area: string;
    price: { min?: number; max?: number; currency?: string };
  }[];
  images: {
    hero: string;
    gallery: string[];
    floorPlans: FloorPlan[];
    masterPlan: string;
  };
  nearbyPlaces: { name: string; distance: string; type: string }[];
  similarProjects: string[];
  isFeatured: boolean;
  isNewLaunch: boolean;
  meta: { title: string; description: string; keywords: string };
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFilters {
  query?: string;
  category?: 'residential' | 'commercial' | 'mixed' | string;
  status?: string;
  propertyType?: string[];
  bhk?: string[];
  budgetMin?: number;
  budgetMax?: number;
  city?: string;
  locality?: string;
  developer?: string;
  authority?: string;
  ownership?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'relevance';
  page?: number;
  pageSize?: number;
}
