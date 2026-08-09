"use client";

import ProjectCarousel from "@/components/shared/project-carousel";
import type { Project } from "@/types/project";
import { useEffect, useState } from "react";

export default function UnderConstructionProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let mounted = true;
    fetch('/api/data')
      .then((response) => response.json())
      .then((data) => {
        if (!mounted || !data?.projects) return;
        const csvProjects = (data.projects || []) as Project[];
        setProjects(csvProjects.filter((project) => project.status === 'under-construction'));
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="bg-muted/40 py-10 sm:py-12">
      <ProjectCarousel
        title="Under Construction"
        subtitle="Explore active projects that are under construction from our current portfolio."
        projects={projects}
        viewAllHref="/projects?status=under-construction"
        viewAllLabel="View all under-construction projects"
      />
    </section>
  );
}
