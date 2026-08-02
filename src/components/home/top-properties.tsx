"use client";

import ProjectCarousel from "@/components/shared/project-carousel";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types/project";

const projects = projectsData as Project[];
const newlyLaunchedProjects = projects.filter((project) => project.isNewLaunch || project.status === "new-launch").slice(0, 8);

export default function TopProperties() {
  return (
    <section className="bg-muted/40 py-16 sm:py-20">
      <ProjectCarousel
        title="Newly Launched Projects"
        subtitle="Early-access addresses from the latest launches with strong upside potential"
        projects={newlyLaunchedProjects}
        viewAllHref="/projects?status=new-launch"
        viewAllLabel="View all launches"
      />
    </section>
  );
}
