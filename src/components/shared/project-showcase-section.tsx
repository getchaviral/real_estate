"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPriceRange, getStatusColor } from "@/lib/utils";
import { PROJECT_STATUS_LABELS } from "@/lib/constants";
import { getFallbackImage } from "@/lib/fallback-images";
import type { Project } from "@/types/project";

interface ProjectShowcaseSectionProps {
  title: string;
  subtitle: string;
  projects: Project[];
  limit?: number;
  className?: string;
  showButton?: boolean;
  buttonLabel?: string;
  buttonVariant?: "default" | "outline" | "ghost" | "secondary" | "destructive" | "link";
}

function ProjectImage({ project }: { project: Project }) {
  const [imgError, setImgError] = useState(false);
  const fallbackImage = getFallbackImage(project.slug);
  const imageSrc = imgError
    ? fallbackImage
    : project.images?.hero || project.images?.gallery?.[0] || fallbackImage;

  return (
    <Image
      src={imageSrc}
      alt={project.name}
      fill
      sizes="(max-width: 768px) 90vw, (max-width: 1280px) 22rem, 24rem"
      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
      onError={() => setImgError(true)}
    />
  );
}

export default function ProjectShowcaseSection({
  title,
  subtitle,
  projects,
  limit = 6,
  className = "",
  showButton = false,
  buttonLabel = "View All Projects",
  buttonVariant = "outline",
}: ProjectShowcaseSectionProps) {
  const visibleProjects = projects.slice(0, limit);

  return (
    <section className={`py-10 sm:py-14 ${className}`.trim()}>
      <Container>
        <SectionHeading title={title} subtitle={subtitle} />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <Card className="group h-full overflow-hidden">
                <div className="relative h-48 overflow-hidden rounded-t-xl bg-slate-950 sm:h-56">
                  <ProjectImage project={project} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    <Badge
                      variant={getStatusColor(project.status) as any}
                      size="sm"
                      className="backdrop-blur-sm"
                    >
                      {PROJECT_STATUS_LABELS[project.status]}
                    </Badge>
                    {project.isNewLaunch && (
                      <Badge variant="primary" size="sm" className="backdrop-blur-sm">
                        New Launch
                      </Badge>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-lg font-bold text-white">
                      {formatPriceRange(project.priceRange.min, project.priceRange.max)}
                    </p>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-card-foreground transition-colors group-hover:text-primary">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                    {project.tagline}
                  </p>

                  <div className="mt-3 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {project.locality}, {project.cityName}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.configurations.slice(0, 3).map((config) => (
                      <span
                        key={config.type}
                        className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {config.type}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-sm text-muted-foreground">
                      {project.developerName}
                    </span>
                    <Button variant="ghost" size="sm" className="gap-1 text-primary">
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="mt-10 text-center"
          >
            <Button variant={buttonVariant} size="lg" className="gap-2">
              {buttonLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </Container>
    </section>
  );
}
