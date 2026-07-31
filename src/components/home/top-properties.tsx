"use client";

import { motion } from "framer-motion";
import { MapPin, Building2, ArrowRight } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPriceRange, getStatusColor } from "@/lib/utils";
import { PROJECT_STATUS_LABELS } from "@/lib/constants";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types/project";

const projects = projectsData as Project[];
const topProperties = projects.filter((p) => p.isFeatured).slice(0, 4);

export default function TopProperties() {
  return (
    <section className="py-16 sm:py-20 bg-muted/40">
      <Container>
        <SectionHeading
          title="Top Properties"
          subtitle="Handpicked premium properties from India's top developers"
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {topProperties.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="group h-full overflow-hidden">
                {/* Image Placeholder */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 sm:h-56">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Building2 className="h-12 w-12 text-primary/30" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Badges */}
                  <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    <Badge
                      variant={getStatusColor(project.status) as any}
                      size="sm"
                      className="backdrop-blur-sm"
                    >
                      {PROJECT_STATUS_LABELS[project.status]}
                    </Badge>
                  </div>

                  {/* Price Overlay */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-lg font-bold text-white">
                      {formatPriceRange(
                        project.priceRange.min,
                        project.priceRange.max
                      )}
                    </p>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {project.locality}, {project.cityName}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <Button variant="outline" size="lg" className="gap-2">
            View All Properties
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
