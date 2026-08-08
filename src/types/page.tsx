import { getProjects } from '@/services/project-server-service';
import type { Project, ProjectFilters } from '@/types/project';
import { Suspense } from 'react';

type ProjectCategoryPageProps = {
  params: { category: 'residential' | 'commercial' };
  searchParams: ProjectFilters;
};

export function generateMetadata({ params }: ProjectCategoryPageProps) {
  const title =
    params.category === 'residential'
      ? 'Residential Projects'
      : 'Commercial Projects';
  return {
    title: `${title} | Real Estate`,
    description: `Browse our latest ${params.category} projects.`,
  };
}

export default async function ProjectCategoryPage({
  params,
  searchParams,
}: ProjectCategoryPageProps) {
  const filters: ProjectFilters = {
    ...searchParams,
    category: params.category,
    page: Number(searchParams.page) || 1,
  };

  const { data: projects, meta } = await getProjects(filters);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-4 capitalize">{params.category} Projects</h1>
      <p>Project listing for {params.category} will be built here.</p>
    </div>
  );
}