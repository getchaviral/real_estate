"use client";

import ProjectCarousel from "@/components/shared/project-carousel";
import type { Project } from "@/types/project";
import { useEffect, useState } from "react";

export default function ReadyToMoveProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let mounted = true;
    fetch('/api/data')
      .then((response) => response.json())
      .then((data) => {
        if (!mounted || !data?.projects) return;
        const csvProjects = (data.projects || []) as Project[];
        setProjects(csvProjects.filter((project) => project.status === 'ready-to-move'));
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="bg-background py-16 sm:py-20">
      <ProjectCarousel
        title="Ready to Move"
        subtitle="Browse completed homes and immediate possession projects from our portfolio."
        projects={projects}
        viewAllHref="/projects?status=ready-to-move"
        viewAllLabel="View all ready-to-move projects"
      />
    </section>
  );
}
