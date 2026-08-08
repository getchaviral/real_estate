"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Filter, X } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import Filters from "@/components/projects/filters";
import ProjectList from "@/components/projects/project-list";
import { Button } from "@/components/ui/button";
import { PRIMARY_MARKETS } from "@/lib/locationNormalization";
import type { ProjectFilters } from "@/types/project";

function getFiltersFromParams(searchParams: URLSearchParams | { get: (key: string) => string | null }): ProjectFilters {
  const authority = searchParams.get("authority") || undefined;
  const ownership = searchParams.get("ownership") || undefined;
  const city = searchParams.get("city") || undefined;
  const query = searchParams.get("query") || undefined;
  const status = searchParams.get("status") || undefined;
  const developer = searchParams.get("developer") || undefined;
  const propertyType = searchParams.get("propertyType")?.split(",").filter(Boolean) || undefined;
  const bhk = searchParams.get("bhk")?.split(",").filter(Boolean) || undefined;
  const budgetMin = searchParams.get("budgetMin") ? Number(searchParams.get("budgetMin")) : undefined;
  const budgetMax = searchParams.get("budgetMax") ? Number(searchParams.get("budgetMax")) : undefined;
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const pageSize = searchParams.get("pageSize") ? Number(searchParams.get("pageSize")) : 9;

  return {
    sortBy: "relevance",
    page,
    pageSize,
    authority,
    ownership,
    city,
    query,
    status,
    developer,
    propertyType,
    bhk,
    budgetMin,
    budgetMax,
  };
}

function ProjectsPageContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const initialFilters = getFiltersFromParams(searchParams);
  const [filters, setFilters] = useState<ProjectFilters>(initialFilters);
  const [page, setPage] = useState(initialFilters.page || 1);
  const [appliedFilters, setAppliedFilters] = useState<ProjectFilters>(initialFilters);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    const nextFilters = getFiltersFromParams(searchParams);
    setFilters(nextFilters);
    setAppliedFilters(nextFilters);
    setPage(nextFilters.page || 1);
  }, [searchParams]);

  const activeCity = useMemo(() => filters.city || "", [filters.city]);

  const updateUrlFilters = (nextFilters: ProjectFilters) => {
    const params = new URLSearchParams(searchParams.toString());
    const keys = ["query", "status", "developer", "city", "authority", "ownership", "propertyType", "bhk", "budgetMin", "budgetMax", "page", "pageSize"] as const;

    keys.forEach((key) => params.delete(key));

    if (nextFilters.query) params.set("query", nextFilters.query);
    if (nextFilters.status) params.set("status", nextFilters.status);
    if (nextFilters.developer) params.set("developer", nextFilters.developer);
    if (nextFilters.city) params.set("city", nextFilters.city);
    if (nextFilters.authority) params.set("authority", nextFilters.authority);
    if (nextFilters.ownership) params.set("ownership", nextFilters.ownership);
    if (nextFilters.propertyType?.length) params.set("propertyType", nextFilters.propertyType.join(","));
    if (nextFilters.bhk?.length) params.set("bhk", nextFilters.bhk.join(","));
    if (nextFilters.budgetMin !== undefined) params.set("budgetMin", String(nextFilters.budgetMin));
    if (nextFilters.budgetMax !== undefined) params.set("budgetMax", String(nextFilters.budgetMax));
    if (nextFilters.page !== undefined) params.set("page", String(nextFilters.page));
    if (nextFilters.pageSize !== undefined) params.set("pageSize", String(nextFilters.pageSize));

    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.push(nextUrl, { scroll: false });
  };

  const handleApplyFilters = () => {
    const nextFilters = { ...filters, page: 1, pageSize: 9 };
    setAppliedFilters(nextFilters);
    setPage(1);
    setIsFilterOpen(false);
    updateUrlFilters(nextFilters);
  };

  const handleCitySelect = (city: string) => {
    const nextFilters = { ...filters, city, page: 1, pageSize: 9 };
    setFilters(nextFilters);
    setAppliedFilters(nextFilters);
    setPage(1);
    updateUrlFilters(nextFilters);
  };

  return (
    <Container key={searchParams.toString()} className="py-16">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <SectionHeading title="Explore Projects" subtitle="Discover premium homes and investment-ready properties across India’s leading markets." />
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-border bg-muted/60 px-4 py-2 text-sm font-medium text-muted-foreground">
            {projectCount} Properties
          </span>
          <Button variant="outline" className="gap-2" onClick={() => setIsFilterOpen(true)}>
            <Filter className="h-4 w-4" />
            Filter & Refine
          </Button>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-border pb-5">
        <Button
          variant={activeCity ? "ghost" : "secondary"}
          className="rounded-full"
          onClick={() => handleCitySelect("")}
        >
          All Cities
        </Button>
        {PRIMARY_MARKETS.map((city) => {
          const selected = activeCity.toLowerCase() === city.toLowerCase();
          return (
            <Button
              key={city}
              variant={selected ? "secondary" : "ghost"}
              className="rounded-full"
              onClick={() => handleCitySelect(city)}
            >
              {city}
            </Button>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8">
        <ProjectList filters={appliedFilters} page={page} onPageChange={setPage} onCountChange={setProjectCount} />
      </div>

      {isFilterOpen ? (
        <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-full max-w-3xl overflow-y-auto bg-background p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold">Filter & Refine</h3>
                <p className="text-sm text-muted-foreground">Narrow by budget, developer, property type, status, and more.</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsFilterOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="mt-6">
              <Filters filters={filters} onFiltersChange={setFilters} onApply={handleApplyFilters} />
            </div>
          </div>
        </div>
      ) : null}
    </Container>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<Container className="py-16"><SectionHeading title="All Projects" subtitle="Browse a curated selection of premium properties with advanced filters and pagination" /></Container>}>
      <ProjectsPageContent />
    </Suspense>
  );
}
