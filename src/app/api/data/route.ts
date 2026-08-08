import { NextResponse } from 'next/server';
import { loadCSVProjects } from '@/services/csv-project-service';
import { normalizeDataset } from '@/lib/csvData';

export async function GET() {
  try {
    const projects = loadCSVProjects();
    const normalized = normalizeDataset(projects);
    return NextResponse.json(normalized, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to read CSV' }, { status: 500 });
  }
}
