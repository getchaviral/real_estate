import fs from 'fs';
import path from 'path';
import { readCSVProjectsFromString } from '@/lib/csvData';
import type { Project } from '@/types/project';

const csvFiles = [
  path.join(process.cwd(), 'src', 'developer_projects_noida_greater_noida.csv'),
  path.join(process.cwd(), 'project-details.csv'),
];

export function loadCSVProjects(): Project[] {
  const projects: Project[] = [];

  for (const csvFilePath of csvFiles) {
    if (!fs.existsSync(csvFilePath)) {
      continue;
    }

    const raw = fs.readFileSync(csvFilePath, 'utf8');
    projects.push(...readCSVProjectsFromString(raw));
  }

  if (projects.length === 0) {
    throw new Error(`No CSV project files found in: ${csvFiles.join(', ')}`);
  }

  return projects;
}
