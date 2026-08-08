import type { Project, ProjectFilters } from '@/types/project';
import type { PaginatedResponse } from '@/types/api';
import { loadCSVProjects } from '@/services/csv-project-service';
import { matchesPrimaryMarket } from '@/lib/locationNormalization';
import { matchesBuyingGoal } from '@/lib/project-categories';

const allProjects: Project[] = loadCSVProjects();

export async function getProjects(
  filters: ProjectFilters = {}
): Promise<PaginatedResponse<Project>> {
  await new Promise(resolve => setTimeout(resolve, 300));

  let filteredProjects = [...allProjects];

  if (filters.query) {
    const query = filters.query.toLowerCase();
    filteredProjects = filteredProjects.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.locality.toLowerCase().includes(query) ||
        p.cityName.toLowerCase().includes(query)
    );
  }
  if (filters.category) {
    filteredProjects = filteredProjects.filter((p) => p.category === filters.category);
  }
  if (filters.status) {
    filteredProjects = filteredProjects.filter((p) => p.status === filters.status);
  }
  if (filters.city) {
    filteredProjects = filteredProjects.filter((p) => matchesPrimaryMarket(p, filters.city!));
  }
  if (filters.authority) {
    filteredProjects = filteredProjects.filter((p) => matchesBuyingGoal(p, 'authority', filters.authority!));
  }
  if (filters.ownership) {
    filteredProjects = filteredProjects.filter((p) => matchesBuyingGoal(p, 'ownership', filters.ownership!));
  }
  if (filters.budgetMin) {
    filteredProjects = filteredProjects.filter((p) => (p.priceRange.min ?? 0) >= filters.budgetMin!);
  }
  if (filters.budgetMax) {
    filteredProjects = filteredProjects.filter((p) => (p.priceRange.max ?? 0) <= filters.budgetMax!);
  }
  if (filters.bhk && filters.bhk.length > 0) {
    filteredProjects = filteredProjects.filter((p) =>
      p.configurations.some((c) => filters.bhk?.includes(c.type))
    );
  }

  switch (filters.sortBy) {
    case 'price-asc':
      filteredProjects.sort((a, b) => (a.priceRange.min ?? 0) - (b.priceRange.min ?? 0));
      break;
    case 'price-desc':
      filteredProjects.sort((a, b) => (b.priceRange.min ?? 0) - (a.priceRange.min ?? 0));
      break;
    case 'newest':
      filteredProjects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    default:
      break;
  }

  const page = filters.page || 1;
  const pageSize = filters.pageSize || 9;
  const total = filteredProjects.length;
  const totalPages = Math.ceil(total / pageSize);
  const paginatedData = filteredProjects.slice((page - 1) * pageSize, page * pageSize);

  return {
    success: true,
    data: paginatedData,
    meta: {
      page,
      pageSize,
      total,
      totalPages,
    },
  };
}

export async function getProject(slug: string): Promise<Project | null> {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return allProjects.find((project) => project.slug === slug) ?? null;
}
