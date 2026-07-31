"use client";

import { useState } from "react";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import Filters from "@/components/projects/filters";
import ProjectList from "@/components/projects/project-list";
import type { ProjectFilters } from "@/types/project";

export default function ProjectsPage() {
  const [filters, setFilters] = useState<ProjectFilters>({ sortBy: "relevance", page: 1, pageSize: 9 });
  const [page, setPage] = useState(1);
  const [appliedFilters, setAppliedFilters] = useState<ProjectFilters>({ sortBy: "relevance", page: 1, pageSize: 9 });

  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters, page: 1, pageSize: 9 });
    setPage(1);
  };

  return (
    <Container className="py-16">
      <SectionHeading title="All Projects" subtitle="Browse a curated selection of premium properties with advanced filters and pagination" />
      <div className="mt-8 grid grid-cols-1 gap-8">
        <Filters filters={filters} onFiltersChange={setFilters} onApply={handleApplyFilters} />
        <ProjectList filters={appliedFilters} page={page} onPageChange={setPage} />
      </div>
    </Container>
  );
}
