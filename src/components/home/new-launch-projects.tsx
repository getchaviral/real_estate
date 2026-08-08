"use client";

import ProjectCarousel from "@/components/shared/project-carousel";
import type { Project } from "@/types/project";
import { useEffect, useState } from "react";

export default function NewLaunchProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let mounted = true;
    fetch('/api/data')
      .then((response) => response.json())
      .then((data) => {
        if (!mounted || !data?.projects) return;
        const csvProjects = (data.projects || []) as Project[];
        setProjects(csvProjects.filter((project) => project.status === 'new-launch' || project.isNewLaunch));
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="bg-background py-10 sm:py-14">
      <ProjectCarousel
        title="New Launch"
        subtitle="See the latest launches and upcoming projects from our curated portfolio."
        projects={projects}
        viewAllHref="/projects?status=new-launch"
        viewAllLabel="View all launches"
      />
    </section>
  );
}
