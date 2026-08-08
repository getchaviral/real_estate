"use client";

import { useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ProjectFilters } from "@/types/project";
import { useEffect, useState } from "react";
import type { Developer } from "@/types/developer";
import type { Project } from "@/types/project";
import { PRIMARY_MARKETS } from "@/lib/locationNormalization";

interface FiltersProps {
  filters: ProjectFilters;
  onFiltersChange: (filters: ProjectFilters) => void;
  onApply: () => void;
}

const projectStatusOptions = [
  { value: "ready-to-move", label: "Ready to Move" },
  { value: "under-construction", label: "Under Construction" },
  { value: "new-launch", label: "New Launch" },
];

const budgetOptions = [
  { value: "0-5000000", label: "Up to ₹50L" },
  { value: "5000000-10000000", label: "₹50L - ₹1Cr" },
  { value: "10000000-20000000", label: "₹1Cr - ₹2Cr" },
  { value: "20000000-999999999", label: "₹2Cr+" },
];

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
];

export default function Filters({ filters, onFiltersChange, onApply }: FiltersProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [developers, setDevelopers] = useState<Developer[]>([]);

  useEffect(() => {
    let mounted = true;
    fetch('/api/data')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        setProjects((data.projects || []) as Project[]);
        setDevelopers((data.developers || []) as Developer[]);
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  const cityOptions = useMemo(() => [...PRIMARY_MARKETS], []);
  const developerOptions = useMemo(() => developers.map((developer) => developer.name).sort(), [developers]);
  const propertyTypeOptions = useMemo(() => Array.from(new Set(projects.flatMap((project) => project.propertyTypes || project.propertyType || []))).sort(), [projects]);
  const bhkOptions = useMemo(() => Array.from(new Set(projects.flatMap((project) => (project.configurations || []).map((config: any) => config.type)))).sort(), [projects]);

  const updateFilter = (key: keyof ProjectFilters, value: string | undefined) => {
    onFiltersChange({ ...filters, [key]: value || undefined });
  };

  const updateRange = (key: "budgetMin" | "budgetMax", value: string) => {
    const parsed = Number(value);
    onFiltersChange({ ...filters, [key]: Number.isNaN(parsed) ? undefined : parsed });
  };

  return (
    <Card className="border-border/70 bg-card/80">
      <CardContent className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          <span>Filter & refine your search</span>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="md:col-span-2 xl:col-span-2">
            <label className="mb-2 block text-sm font-medium text-foreground">Search</label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={filters.query ?? ""}
                onChange={(event) => onFiltersChange({ ...filters, query: event.target.value })}
                placeholder="Search by city, locality, project..."
                className="pl-9"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Sort By</label>
            <Select value={filters.sortBy ?? "relevance"} onValueChange={(value) => onFiltersChange({ ...filters, sortBy: value as ProjectFilters["sortBy"] })}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Budget</label>
            <Select value={filters.budgetMin && filters.budgetMax ? `${filters.budgetMin}-${filters.budgetMax}` : ""} onValueChange={(value) => {
              const match = value.split("-");
              updateRange("budgetMin", match[0]);
              updateRange("budgetMax", match[1]);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select Budget" />
              </SelectTrigger>
              <SelectContent>
                {budgetOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">City</label>
            <Select value={filters.city ?? ""} onValueChange={(value) => updateFilter("city", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Cities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Cities</SelectItem>
                {cityOptions.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Developer</label>
            <Select value={filters.developer ?? ""} onValueChange={(value) => updateFilter("developer", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Developers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Developers</SelectItem>
                {developerOptions.map((developer) => (
                  <SelectItem key={developer} value={developer}>
                    {developer}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Property Type</label>
            <Select value={filters.propertyType?.[0] ?? ""} onValueChange={(value) => onFiltersChange({ ...filters, propertyType: value ? [value] : undefined })}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                {propertyTypeOptions.map((propertyType) => (
                  <SelectItem key={propertyType} value={propertyType}>
                    {propertyType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Project Status</label>
            <Select value={filters.status ?? ""} onValueChange={(value) => updateFilter("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                {projectStatusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">BHK</label>
            <Select value={filters.bhk?.[0] ?? ""} onValueChange={(value) => onFiltersChange({ ...filters, bhk: value ? [value] : undefined })}>
              <SelectTrigger>
                <SelectValue placeholder="Any BHK" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any BHK</SelectItem>
                {bhkOptions.map((bhk) => (
                  <SelectItem key={bhk} value={bhk}>
                    {bhk}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-4">
          <p className="text-sm text-muted-foreground">Use the filters to narrow by location, budget, status, and configuration.</p>
          <Button onClick={onApply} className="gap-2">
            <Search className="h-4 w-4" />
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
