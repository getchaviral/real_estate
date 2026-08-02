"use client";

import ProjectCarousel from "@/components/shared/project-carousel";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types/project";

const projects = projectsData as Project[];
const fastMovingProjects = projects.filter((project) => project.isFeatured).slice(0, 8);

export default function FeaturedProjects() {
  return (
    <section className="py-24 sm:py-28">
      <ProjectCarousel
        title="Fast Moving Projects"
        subtitle="Premium addresses in high-demand locations with strong buyer interest and quick sales"
        projects={fastMovingProjects}
        viewAllHref="/projects"
        viewAllLabel="View all projects"
      />
    </section>
  );
}

