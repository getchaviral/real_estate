"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
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

const tabs = [
  { id: "new-launch", label: "New Launch" },
  { id: "ready-to-move", label: "Ready to Move" },
  { id: "under-construction", label: "Under Construction" },
];

export default function PropertyTypes() {
  const [activeTab, setActiveTab] = useState("new-launch");

  const filteredProjects = projects.filter((p) => p.status === activeTab);

  return (
    <section className="bg-muted/50 py-16 sm:py-20">
      <Container>
        <SectionHeading
          title="Explore by Category"
          subtitle="Find properties that match your timeline and preferences"
        />

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-muted-foreground hover:bg-muted"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Card className="group h-full overflow-hidden">
                    <div className="relative h-40 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 sm:h-48">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute left-3 top-3">
                        <Badge
                          variant={getStatusColor(project.status) as any}
                          size="sm"
                          className="backdrop-blur-sm"
                        >
                          {PROJECT_STATUS_LABELS[project.status]}
                        </Badge>
                      </div>
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
                      <h3 className="text-base font-semibold text-card-foreground group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>
                          {project.locality}, {project.cityName}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.configurations.slice(0, 3).map((config) => (
                          <span
                            key={config.type}
                            className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                          >
                            {config.type}
                          </span>
                        ))}
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                        <span className="text-xs text-muted-foreground">
                          {project.developerName}
                        </span>
                        <Button variant="ghost" size="sm" className="gap-1 text-xs text-primary">
                          Details
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="py-16 text-center text-muted-foreground">
              No projects found in this category.
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
