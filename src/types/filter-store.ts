import { create } from 'zustand';
import type { ProjectFilters } from '@/types/project';

interface FilterState {
  filters: ProjectFilters;
  setFilter: (key: keyof ProjectFilters, value: any) => void;
  setFilters: (newFilters: Partial<ProjectFilters>) => void;
  clearFilters: () => void;
  getActiveFilterCount: () => number;
}

const defaultFilters: ProjectFilters = {
  page: 1,
  pageSize: 9,
  sortBy: 'relevance',
};

export const useFilterStore = create<FilterState>((set, get) => ({
  filters: defaultFilters,
  setFilter: (key, value) =>
    set(state => ({ filters: { ...state.filters, [key]: value, page: 1 } })),
  setFilters: newFilters =>
    set(state => ({
      filters: { ...state.filters, ...newFilters, page: 1 },
    })),
  clearFilters: () => set({ filters: defaultFilters }),
  getActiveFilterCount: () => {
    const { filters } = get();
    const activeFilters = Object.keys(filters).filter(key => {
      const filterKey = key as keyof ProjectFilters;
      if (['page', 'pageSize', 'sortBy', 'query'].includes(filterKey)) return false;
      const value = filters[filterKey];
      return Array.isArray(value) ? value.length > 0 : value != null;
    });
    return activeFilters.length;
  },
}));