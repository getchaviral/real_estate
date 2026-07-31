export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: 'residential' | 'commercial';
  status: 'ready-to-move' | 'under-construction' | 'new-launch';
  propertyType: string[];
  developerId: string;
  developerName: string;
  cityId: string;
  cityName: string;
  localityId?: string;
  locality: string;
  address: string;
  coordinates: { lat: number; lng: number };
  totalArea: string;
  totalUnits: number;
  totalTowers: number;
  configurations: {
    type: string;
    area: string;
    price: { min: number; max: number; currency: string };
  }[];
  priceRange: { min: number; max: number; currency: string };
  possessionDate: string;
  possessionStatus: string;
  reraNumber: string;
  images: {
    hero: string;
    gallery: string[];
    floorPlans: any[]; // Replace with a proper type if available
    masterPlan: string;
  };
  amenities: { id: string; name: string; icon: string }[];
  nearbyPlaces: { name: string; distance: string; type: string }[];
  features: string[];
  similarProjects: string[];
  isFeatured: boolean;
  isNewLaunch: boolean;
  meta: { title: string; description: string; keywords: string };
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFilters {
  query?: string;
  category?: 'residential' | 'commercial';
  status?: 'ready-to-move' | 'under-construction' | 'new-launch';
  propertyType?: string[];
  bhk?: string[];
  budgetMin?: number;
  budgetMax?: number;
  city?: string;
  locality?: string;
  developer?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'relevance';
  page?: number;
  pageSize?: number;
}