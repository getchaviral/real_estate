"use client";

import ProjectCarousel from "@/components/shared/project-carousel";
import type { Project } from "@/types/project";
import { useEffect, useState } from "react";

export default function TopProperties() {
  const [newlyLaunchedProjects, setNewlyLaunchedProjects] = useState<Project[]>([]);
  useEffect(() => {
    let mounted = true;
    fetch('/api/data')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        const projects = (data.projects || []) as Project[];
        setNewlyLaunchedProjects(projects.filter((project) => project.isNewLaunch || project.status === "new-launch").slice(0, 8));
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  return (
    <section className="bg-muted/40 py-8 sm:py-10">
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
