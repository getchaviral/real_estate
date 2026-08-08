export interface Locality {
  id: string;
  slug: string;
  name: string;
  cityId: string;
  cityName: string;
  state: string;
  description: string;
  isPopular: boolean;
  projectIds: string[];
  developerIds: string[];
  createdAt: string;
  updatedAt: string;
}
