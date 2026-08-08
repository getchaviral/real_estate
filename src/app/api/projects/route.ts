import { NextResponse } from 'next/server';
import { getProjects as fetchProjects } from '@/types/project-service';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query') || undefined;
  const category = url.searchParams.get('category') as any;
  const status = url.searchParams.get('status') || undefined;
  const city = url.searchParams.get('city') || undefined;
  const developer = url.searchParams.get('developer') || undefined;
  const authority = url.searchParams.get('authority') || undefined;
  const ownership = url.searchParams.get('ownership') || undefined;
  const propertyType = url.searchParams.get('propertyType')?.split(',').filter(Boolean) || undefined;
  const bhk = url.searchParams.get('bhk')?.split(',').filter(Boolean) || undefined;
  const budgetMin = url.searchParams.get('budgetMin') ? Number(url.searchParams.get('budgetMin')) : undefined;
  const budgetMax = url.searchParams.get('budgetMax') ? Number(url.searchParams.get('budgetMax')) : undefined;
  const page = url.searchParams.get('page') ? Number(url.searchParams.get('page')) : 1;
  const pageSize = url.searchParams.get('pageSize') ? Number(url.searchParams.get('pageSize')) : 9;

  const result = await fetchProjects({
    query,
    category,
    status,
    city,
    developer,
    authority,
    ownership,
    propertyType,
    bhk,
    budgetMin,
    budgetMax,
    page,
    pageSize,
  });

  return NextResponse.json(result);
}
