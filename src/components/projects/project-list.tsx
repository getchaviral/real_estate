"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/components/shared/project-card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { getProjects } from "@/services/project-client-service";
import type { Project, ProjectFilters } from "@/types/project";

interface ProjectListProps {
  filters: ProjectFilters;
  page: number;
  onPageChange: (page: number) => void;
  onCountChange?: (count: number) => void;
}

export default function ProjectList({ filters, page, onPageChange, onCountChange }: ProjectListProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadProjects = async () => {
      setLoading(true);
      const response = await getProjects({ ...filters, page, pageSize: 9 });
      if (isMounted) {
        setProjects(response.data);
        setTotalPages(response.meta.totalPages || 1);
        onCountChange?.(response.meta.total || response.data.length);
        setLoading(false);
      }
    };

    loadProjects();
    return () => {
      isMounted = false;
    };
  }, [filters, page]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-72 animate-pulse rounded-xl border border-border bg-muted/40" />
        ))}
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card/60 p-10 text-center text-muted-foreground">
        No projects matched your criteria. Try adjusting the filters.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {totalPages > 1 ? (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={(event) => { event.preventDefault(); if (page > 1) onPageChange(page - 1); }} />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink href="#" isActive={pageNumber === page} onClick={(event) => { event.preventDefault(); onPageChange(pageNumber); }}>
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href="#" onClick={(event) => { event.preventDefault(); if (page < totalPages) onPageChange(page + 1); }} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : null}
    </div>
  );
}
