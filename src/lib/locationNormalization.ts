import type { Project } from "@/types/project";

export const PRIMARY_MARKETS = [
  "Bangalore",
  "Chennai",
  "Delhi NCR",
  "Gurgaon",
  "Hyderabad",
  "Mumbai",
  "Noida",
  "Greater Noida",
  "Pune",
] as const;

const MARKET_KEYWORDS: Array<{ regex: RegExp; market: string }> = [
  { regex: /\b(delhi ncr|ncr|delhi)\b/i, market: "Delhi NCR" },
  { regex: /\b(gurugram|gurgaon)\b/i, market: "Gurgaon" },
  { regex: /\b(greater noida|greater noida west|greater noida extension|yamuna expressway|noida\s*\/\s*greater noida|noida extension\s*\/\s*greater noida west)\b/i, market: "Greater Noida" },
  { regex: /\b(noida expressway|noida extension|central noida|sector \d+,?\s*noida|\bnoida\b)\b/i, market: "Noida" },
  { regex: /\b(bangalore|bengaluru)\b/i, market: "Bangalore" },
  { regex: /\b(chennai|besant nagar|anna nagar|adyar|velachery)\b/i, market: "Chennai" },
  { regex: /\b(hyderabad|gachibowli|kukatpally|hitech city|hi-tech city)\b/i, market: "Hyderabad" },
  { regex: /\b(mumbai|powai|andheri|borivali|bandra|chembur|kurla|thane|ulwe|andheri west|andheri east|malad|goregaon)\b/i, market: "Mumbai" },
  { regex: /\b(pune|hinjewadi|kharadi|baner|wakad|hadapsar|viman nagar)\b/i, market: "Pune" },
];

export function normalizeLocationText(text?: string) {
  return (text || "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugifyLocation(text?: string) {
  return (
    (text || "")
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  );
}

export function getPrimaryMarket(project: Project) {
  const rawText = `${project.locationSectorArea || ""} ${project.location || ""} ${project.cityName || ""}`;
  const normalized = normalizeLocationText(rawText);

  for (const entry of MARKET_KEYWORDS) {
    if (entry.regex.test(normalized)) {
      return entry.market;
    }
  }

  const cityName = normalizeLocationText(project.cityName);
  if (PRIMARY_MARKETS.some((market) => normalizeLocationText(market) === cityName)) {
    return project.cityName;
  }

  if (/\b(delhi|ncr)\b/i.test(normalized)) return "Delhi NCR";

  return undefined;
}

export function matchesPrimaryMarket(project: Project, market: string) {
  const target = normalizeLocationText(market);
  const targetSlug = slugifyLocation(market);
  if (!target) return false;

  const candidates = [
    getPrimaryMarket(project),
    project.cityName,
    project.cityId,
  ].filter(Boolean) as string[];

  return candidates.some((value) => {
    const normalizedValue = normalizeLocationText(value);
    return normalizedValue === target || slugifyLocation(value) === targetSlug;
  });
}

export function matchesProjectLocationSlug(project: Project, locationSlug: string) {
  const targetSlug = slugifyLocation(locationSlug);
  if (!targetSlug) return false;

  return [project.cityId, project.cityName, getPrimaryMarket(project)]
    .filter(Boolean)
    .some((value) => slugifyLocation(value) === targetSlug);
}

const PINNED_MARKETS = ["noida", "greater noida"];

export function sortPrimaryMarkets<T extends { name: string; count?: number }>(markets: T[]) {
  return markets.slice().sort((a, b) => {
    const aPinIndex = PINNED_MARKETS.indexOf(a.name.toLowerCase());
    const bPinIndex = PINNED_MARKETS.indexOf(b.name.toLowerCase());
    if (aPinIndex !== -1 && bPinIndex !== -1) return aPinIndex - bPinIndex;
    if (aPinIndex !== -1) return -1;
    if (bPinIndex !== -1) return 1;

    const countDiff = (b.count ?? 0) - (a.count ?? 0);
    if (countDiff !== 0) return countDiff;

    return a.name.localeCompare(b.name, "en-IN", { sensitivity: "base" });
  });
}

export function getFastMovingCities(projects: Project[]): string[] {
  const marketCounts = new Map<string, number>();

  projects.forEach((project) => {
    const primaryMarket = getPrimaryMarket(project) || project.cityName;
    if (!primaryMarket) return;
    marketCounts.set(primaryMarket, (marketCounts.get(primaryMarket) ?? 0) + 1);
  });

  const sorted = sortPrimaryMarkets(Array.from(marketCounts, ([name, count]) => ({ name, count })));
  return sorted.map((s) => s.name);
}
