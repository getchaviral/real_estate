import type { Meta, PriceRange } from "./common";

export interface PopularLocality {
  id: string;
  name: string;
  slug: string;
}

export interface MarketInsight {
  year: number;
  priceTrend: number;
  supply: number;
  demand: number;
}

export interface LocationFAQ {
  question: string;
  answer: string;
}

export interface Location {
  id: string;
  slug:string;
  name: string;
  state: string;
  description: string;
  heroImage: string;
  isPopular: boolean;
  totalProjects: number;
  totalDevelopers: number;
  popularLocalities: PopularLocality[];
  priceRange: PriceRange;
  avgPricePerSqft: number;
  marketInsights: MarketInsight[];
  faqs: LocationFAQ[];
  featuredProjectIds: string[];
  topDeveloperIds: string[];
  meta: Meta;
  createdAt: string;
  updatedAt: string;
}

