import type { Project } from "@/types/project";
import { Building2, MapPin, ShieldCheck, Users } from "lucide-react";

export const CATEGORY_DEFINITIONS = [
  {
    title: "Noida Authority",
    description: "Projects located under Noida Authority.",
    queryKey: "authority",
    queryValue: "noida-authority",
    icon: MapPin,
  },
  {
    title: "Greater Noida Authority",
    description: "Residential projects across Greater Noida Authority.",
    queryKey: "authority",
    queryValue: "greater-noida-authority",
    icon: Building2,
  },
  {
    title: "Yamuna Authority",
    description: "Projects across the Yamuna development corridor.",
    queryKey: "authority",
    queryValue: "yamuna-authority",
    icon: Users,
  },
  {
    title: "Freehold",
    description: "Freehold properties with independent ownership.",
    queryKey: "ownership",
    queryValue: "freehold",
    icon: ShieldCheck,
  },
] as const;

export function normalizeQueryValue(value?: string) {
  return (value || "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function inferAuthorityFromProject(project: Project) {
  const locationText = [
    project.locationSectorArea,
    project.location,
    project.address,
    project.projectName,
    project.notes,
    project.cityName,
  ]
    .filter(Boolean)
    .join(" ");

  const normalized = normalizeQueryValue(locationText);
  if (normalized.includes("greater-noida") || normalized.includes("noida-extension") || normalized.includes("greater-noida-west") || normalized.includes("greater-noida-expressway")) {
    return "greater-noida-authority";
  }
  if (normalized.includes("yamuna")) {
    return "yamuna-authority";
  }
  if (normalized.includes("noida")) {
    return "noida-authority";
  }
  return "";
}

function inferOwnershipFromProject(project: Project) {
  const ownershipText = [project.ownership, project.notes].filter(Boolean).join(" ");
  const normalized = normalizeQueryValue(ownershipText);

  if (normalized.includes("freehold")) {
    return "freehold";
  }
  if (normalized.includes("leasehold")) {
    return "leasehold";
  }
  return "";
}

export function getProjectAuthorityValue(project: Project) {
  const rawValue = project.authority || inferAuthorityFromProject(project);
  const normalized = normalizeQueryValue(rawValue);

  if (normalized.includes("greater-noida")) {
    return "greater-noida-authority";
  }
  if (normalized.includes("yamuna")) {
    return "yamuna-authority";
  }
  if (normalized.includes("noida")) {
    return "noida-authority";
  }

  return normalized;
}

export function getProjectOwnershipValue(project: Project) {
  const rawValue = project.ownership || inferOwnershipFromProject(project);
  return normalizeQueryValue(rawValue);
}

export function matchesBuyingGoal(project: Project, queryKey: string, queryValue: string) {
  const normalizedQueryValue = normalizeQueryValue(queryValue);

  if (queryKey === "authority") {
    return getProjectAuthorityValue(project) === normalizedQueryValue;
  }

  if (queryKey === "ownership") {
    return getProjectOwnershipValue(project) === normalizedQueryValue;
  }

  return false;
}
