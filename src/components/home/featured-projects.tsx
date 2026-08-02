"use client";

import ProjectCarousel from "@/components/shared/project-carousel";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types/project";

const projects = projectsData as Project[];
const fastMovingProjects = projects.filter((project) => project.isFeatured).slice(0, 8);

export default function FeaturedProjects() {
  return (
    <section className="-mt-4 pt-8 pb-8 sm:-mt-6 sm:pt-10 sm:pb-10 lg:-mt-8 lg:pt-12 lg:pb-12">
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

