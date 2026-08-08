import { ArrowRight, Building2 } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import ProjectShowcaseSection from "@/components/shared/project-showcase-section";
import type { Project } from "@/types/project";

interface DeveloperProjectGroupsProps {
  projects: Project[];
}

export default function DeveloperProjectGroups({ projects }: DeveloperProjectGroupsProps) {
  const allProjects = projects;
  const newLaunchProjects = projects.filter((project) => project.status === "new-launch");
  const readyToMoveProjects = projects.filter((project) => project.status === "ready-to-move");
  const underConstructionProjects = projects.filter((project) => project.status === "under-construction");
  const completedProjects = projects.filter((project) => project.status === "ready-to-move");

  return (
    <div className="space-y-8">
      <ProjectShowcaseSection
        title="All Projects"
        subtitle="A complete view of this developer’s portfolio"
        projects={allProjects}
        limit={6}
      />

      <ProjectShowcaseSection
        title="New Launch"
        subtitle="Latest offerings designed for modern buyers"
        projects={newLaunchProjects}
        limit={3}
      />

      <ProjectShowcaseSection
        title="Ready to Move"
        subtitle="Completed homes available for immediate possession"
        projects={readyToMoveProjects}
        limit={3}
      />

      <ProjectShowcaseSection
        title="Under Construction"
        subtitle="Premium projects in progress with strong growth potential"
        projects={underConstructionProjects}
        limit={3}
      />

      <ProjectShowcaseSection
        title="Completed Projects"
        subtitle="A legacy of delivery, quality, and trust"
        projects={completedProjects}
        limit={3}
      />
    </div>
  );
}
