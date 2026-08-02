import type { Project, ProjectFilters } from '@/types/project';
import type { PaginatedResponse } from '@/types/api';
import { entityStore } from '@/data/entities';

const sourceProjects = entityStore.getProjects() as Project[];

// I'm adding more projects to the data by duplicating and slightly modifying existing ones
// to ensure we have enough data for pagination (24 projects total).
const allProjects: Project[] = [
  ...sourceProjects,
  ...sourceProjects.map(p => ({ ...p, id: `${p.id}-copy-1`, slug: `${p.slug}-copy-1` })),
  ...sourceProjects.map(p => ({ ...p, id: `${p.id}-copy-2`, slug: `${p.slug}-copy-2` })),
  ...sourceProjects.map(p => ({ ...p, id: `${p.id}-copy-3`, slug: `${p.slug}-copy-3` })),
].slice(0, 24);

export async function getProjects(
  filters: ProjectFilters = {}
): Promise<PaginatedResponse<Project>> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  let filteredProjects = [...allProjects];

  // Filtering
  if (filters.query) {
    const query = filters.query.toLowerCase();
    filteredProjects = filteredProjects.filter(
      p =>
        p.name.toLowerCase().includes(query) ||
        p.locality.toLowerCase().includes(query) ||
        p.cityName.toLowerCase().includes(query)
    );
  }
  if (filters.category) {
    filteredProjects = filteredProjects.filter(p => p.category === filters.category);
  }
  if (filters.status) {
    filteredProjects = filteredProjects.filter(p => p.status === filters.status);
  }
  if (filters.city) {
    filteredProjects = filteredProjects.filter(p => p.cityName === filters.city);
  }
  if (filters.budgetMin) {
    filteredProjects = filteredProjects.filter(p => p.priceRange.min >= filters.budgetMin!);
  }
  if (filters.budgetMax) {
    filteredProjects = filteredProjects.filter(p => p.priceRange.max <= filters.budgetMax!);
  }
  if (filters.bhk && filters.bhk.length > 0) {
    filteredProjects = filteredProjects.filter(p =>
      p.configurations.some(c => filters.bhk?.includes(c.type))
    );
  }

  // Sorting
  switch (filters.sortBy) {
    case 'price-asc':
      filteredProjects.sort((a, b) => a.priceRange.min - b.priceRange.min);
      break;
    case 'price-desc':
      filteredProjects.sort((a, b) => b.priceRange.min - a.priceRange.min);
      break;
    case 'newest':
      filteredProjects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    default: // relevance (default order)
      break;
  }

  // Pagination
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
  await new Promise(resolve => setTimeout(resolve, 250));
  return allProjects.find((project) => project.slug === slug) ?? null;
}
