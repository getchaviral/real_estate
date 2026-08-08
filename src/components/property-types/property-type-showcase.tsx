import { Building2 } from "lucide-react";
import type { Project } from "@/types/project";
import ProjectShowcaseSection from "@/components/shared/project-showcase-section";

interface PropertyTypeShowcaseProps {
  projects: Project[];
  title: string;
  subtitle: string;
  limit?: number;
}

export default function PropertyTypeShowcase({ projects, title, subtitle, limit = 6 }: PropertyTypeShowcaseProps) {
  return (
    <ProjectShowcaseSection
      title={title}
      subtitle={subtitle}
      projects={projects}
      limit={limit}
      showButton={projects.length > limit}
      buttonLabel={`View All ${title}`}
    />
  );
}
