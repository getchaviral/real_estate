import { PROJECT_STATUS_LABELS } from "@/lib/constants";

import type { PaginatedResponse } from "@/types/api";
import type { Developer } from "@/types/developer";
import type { Location } from "@/types/location";
import type { Project, ProjectFilters } from "@/types/project";
import type { PropertyType } from "@/types/property-type";

export interface SearchSuggestion {
  id: string;
  label: string;
  value: string;
  type: "city" | "project" | "developer" | "property-type" | "location" | "bhk" | "budget" | "status";
  category: string;
}

export interface SearchRequest {
  query?: string;
  city?: string;
  developer?: string;
  propertyType?: string;
  location?: string;
  bhk?: string;
  budget?: string;
  status?: string;
  source?: "local" | "api";
}

export interface RecentSearch {
  id: string;
  label: string;
  query: string;
  filters: SearchRequest;
  createdAt: string;
}

// Note: do not import server-only data at module scope. getAutocompleteSuggestions
// will accept optional runtime data from callers (client components should pass
// `projects` they fetched) and will dynamically load server data when running
// on the server.

const RECENT_SEARCHES_KEY = "real-estate-recent-searches";

export const budgetOptions = [
  { value: "0-5000000", label: "Up to ₹50L" },
  { value: "5000000-10000000", label: "₹50L - ₹1Cr" },
  { value: "10000000-20000000", label: "₹1Cr - ₹2Cr" },
  { value: "20000000-999999999", label: "₹2Cr+" },
];

export const statusOptions = Object.entries(PROJECT_STATUS_LABELS).map(([value, label]) => ({
  value,
  label,
}));

// `bhkOptions` is computed by callers from available projects when needed.

export const popularSearches: SearchSuggestion[] = [
  { id: "popular-1", label: "Mumbai Apartments", value: "Mumbai Apartments", type: "city", category: "Popular" },
  { id: "popular-2", label: "Pinnacle Infra", value: "Pinnacle Infra", type: "developer", category: "Popular" },
  { id: "popular-3", label: "2 BHK", value: "2 BHK", type: "bhk", category: "Popular" },
  { id: "popular-4", label: "Ready to Move", value: "ready-to-move", type: "status", category: "Popular" },
  { id: "popular-5", label: "Andheri West", value: "Andheri West", type: "location", category: "Popular" },
];

function normalize(value: string) {
  return value.toLowerCase().trim();
}

export function buildProjectFilters(request: SearchRequest): ProjectFilters {
  const budget = request.budget;
  const [rawMin, rawMax] = budget?.split("-") ?? [];
  const budgetMin = rawMin ? Number(rawMin) : undefined;
  const budgetMax = rawMax ? Number(rawMax) : undefined;

  return {
    query: request.query,
    city: request.city,
    developer: request.developer,
    propertyType: request.propertyType ? [request.propertyType] : undefined,
    locality: request.location,
    bhk: request.bhk ? [request.bhk] : undefined,
    budgetMin,
    budgetMax,
    status: request.status as ProjectFilters["status"],
  };
}

export function buildSearchParams(request: SearchRequest) {
  const params = new URLSearchParams();

  if (request.query) params.set("query", request.query);
  if (request.city) params.set("city", request.city);
  if (request.developer) params.set("developer", request.developer);
  if (request.propertyType) params.set("propertyType", request.propertyType);
  if (request.location) params.set("location", request.location);
  if (request.bhk) params.set("bhk", request.bhk);
  if (request.budget) params.set("budget", request.budget);
  if (request.status) params.set("status", request.status);

  return params;
}

import { getProjects } from '@/services/project-client-service';

export async function searchProperties(request: SearchRequest): Promise<PaginatedResponse<Project>> {
  const filters = buildProjectFilters(request);
  return getProjects(filters);
}

export function getAutocompleteSuggestions(query: string, data: {
  projects?: Project[];
  developers?: Developer[];
  locations?: Location[];
  propertyTypes?: PropertyType[];
} = {}): SearchSuggestion[] {
  const searchTerm = normalize(query);

  if (!searchTerm) return [];

  const suggestions: SearchSuggestion[] = [];

  // If caller provided datasets (client-side), use them. Otherwise, when
  // running on the server, dynamically load from `entityStore`.
  let projectsList = data.projects;
  let developersList = data.developers;
  let locationsList = data.locations;
  let propertyTypesList = data.propertyTypes;

  if (!projectsList && typeof window === 'undefined') {
    const entityStore = eval("typeof require !== 'undefined' ? require('@/data/entities').entityStore : undefined") as any;
    projectsList = projectsList || (entityStore?.getProjects?.() as Project[]);
    developersList = developersList || (entityStore?.getDevelopers?.() as Developer[]);
    locationsList = locationsList || (entityStore?.getLocations?.() as Location[]);
    propertyTypesList = propertyTypesList || (entityStore?.getPropertyTypes?.() as PropertyType[]);
  }

  (projectsList || []).forEach((project) => {
    const haystack = [project.name, project.cityName, project.locality, project.developerName, project.tagline]
      .join(' ')
      .toLowerCase();

    if (haystack.includes(searchTerm)) {
      suggestions.push({
        id: `project-${project.id}`,
        label: `${project.name} · ${project.cityName}`,
        value: project.name,
        type: 'project',
        category: 'Projects',
      });
    }
  });

  const cityMap = new Map<string, string>();
  (projectsList || []).forEach((p) => {
    if (p.cityName) {
      const normalized = p.cityName.trim().toLowerCase();
      if (!cityMap.has(normalized)) {
        cityMap.set(normalized, p.cityName.trim());
      }
    }
  });
  cityMap.forEach((originalCity, normalizedCity) => {
    if (normalizedCity.includes(searchTerm)) {
      suggestions.push({ id: `city-${normalizedCity}`, label: originalCity, value: originalCity, type: 'city', category: 'City' });
    }
  });

  (developersList || []).forEach((developer) => {
    if (normalize(developer.name).includes(searchTerm)) {
      suggestions.push({ id: `developer-${developer.id}`, label: developer.name, value: developer.name, type: 'developer', category: 'Developers' });
    }
  });

  (locationsList || []).forEach((location) => {
    if (normalize(location.name).includes(searchTerm) || normalize(location.state).includes(searchTerm)) {
      suggestions.push({ id: `location-${location.id}`, label: `${location.name}, ${location.state}`, value: location.name, type: 'location', category: 'Locations' });
    }
  });

  (propertyTypesList || []).forEach((propertyType) => {
    if (normalize(propertyType.name).includes(searchTerm)) {
      suggestions.push({ id: `property-type-${propertyType.id}`, label: propertyType.name, value: propertyType.name, type: 'property-type', category: 'Property Types' });
    }
  });

  // BHK suggestions: try to derive from projects list if available
  const bhkSet = new Set<string>();
  (projectsList || []).forEach((p) => {
    const configs = (p.configurations || []).map((c: any) => c.type);
    configs.forEach((c: string) => bhkSet.add(c));
  });
  Array.from(bhkSet).forEach((bhk) => {
    if (normalize(bhk).includes(searchTerm)) {
      suggestions.push({ id: `bhk-${bhk}`, label: bhk, value: bhk, type: 'bhk', category: 'BHK' });
    }
  });

  statusOptions.forEach((status) => {
    if (normalize(status.label).includes(searchTerm)) {
      suggestions.push({ id: `status-${status.value}`, label: status.label, value: status.value, type: 'status', category: 'Status' });
    }
  });

  budgetOptions.forEach((budget) => {
    if (normalize(budget.label).includes(searchTerm)) {
      suggestions.push({ id: `budget-${budget.value}`, label: budget.label, value: budget.value, type: 'budget', category: 'Budget' });
    }
  });

  const seen = new Set<string>();
  return suggestions.filter((suggestion) => {
    const key = `${suggestion.type}-${suggestion.value}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 8);
}

export function getRecentSearches(): RecentSearch[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(RECENT_SEARCHES_KEY);
    return raw ? (JSON.parse(raw) as RecentSearch[]) : [];
  } catch {
    return [];
  }
}

export function saveRecentSearch(entry: RecentSearch) {
  if (typeof window === "undefined") {
    return [] as RecentSearch[];
  }

  const existing = getRecentSearches();
  const filtered = existing.filter((item) => item.label !== entry.label || item.query !== entry.query);
  const next = [entry, ...filtered].slice(0, 5);
  window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next));
  return next;
}
