export interface Meta {
  title: string;
  description: string;
  keywords: string;
}

export interface PriceRange {
  min: number;
  max: number;
  currency: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface ImageSet {
  hero: string;
  gallery: string[];
  floorPlans: FloorPlan[];
  masterPlan: string;
}

export interface FloorPlan {
  name: string;
  url: string;
  area: string;
}

