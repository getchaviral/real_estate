import type { Project, ProjectFilters } from '@/types/project';
import type { PaginatedResponse } from '@/types/api';

export async function getProjects(filters: ProjectFilters = {}): Promise<PaginatedResponse<Project>> {
  const searchParams = new URLSearchParams();
  if (filters.query) searchParams.set('query', filters.query);
  if (filters.category) searchParams.set('category', filters.category);
  if (filters.status) searchParams.set('status', filters.status);
  if (filters.city) searchParams.set('city', filters.city);
  if (filters.developer) searchParams.set('developer', filters.developer);
  if (filters.authority) searchParams.set('authority', filters.authority);
  if (filters.ownership) searchParams.set('ownership', filters.ownership);
  if (filters.propertyType) searchParams.set('propertyType', filters.propertyType.join(','));
  if (filters.bhk) searchParams.set('bhk', filters.bhk.join(','));
  if (filters.budgetMin !== undefined) searchParams.set('budgetMin', String(filters.budgetMin));
  if (filters.budgetMax !== undefined) searchParams.set('budgetMax', String(filters.budgetMax));
  if (filters.page !== undefined) searchParams.set('page', String(filters.page));
  if (filters.pageSize !== undefined) searchParams.set('pageSize', String(filters.pageSize));

  const response = await fetch(`/api/projects?${searchParams.toString()}`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }

  return response.json();
}
