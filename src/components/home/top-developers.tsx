"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import type { Project } from "@/types/project";

interface BuilderSummary {
  id: string;
  slug: string;
  name: string;
  totalProjects: number;
}

function slugify(text?: string) {
  return (text || "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function TopDevelopers() {
  const [topDevelopers, setTopDevelopers] = useState<BuilderSummary[]>([]);

  useEffect(() => {
    let mounted = true;
    fetch('/api/data')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        const projects = (data.projects || []) as Project[];
        const builderMap = new Map<string, BuilderSummary>();

        projects.forEach((project) => {
          const builderName = project.builderName || project.developerName || 'Unknown Builder';
          const builderSlug = slugify(builderName) || 'unknown-builder';
          const existing = builderMap.get(builderSlug);

          if (existing) {
            existing.totalProjects += 1;
          } else {
            builderMap.set(builderSlug, {
              id: builderSlug,
              slug: builderSlug,
              name: builderName,
              totalProjects: 1,
            });
          }
        });

        const builders = Array.from(builderMap.values()).sort((a, b) => b.totalProjects - a.totalProjects);
        setTopDevelopers(builders.slice(0, 8));
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="bg-muted/50 py-8 sm:py-10">
      <Container>
        <SectionHeading title="Top Builders" subtitle="Builders ranked by active projects." />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {topDevelopers.map((builder, index) => (
            <motion.div
              key={builder.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
            >
              <Link href={`/developers/${builder.slug}`} className="block h-full">
                <Card className="group h-full overflow-hidden border-border/70 bg-background/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                  <CardContent className="p-5 text-center">
                    <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
                      <Building2 className="h-8 w-8" />
                    </div>

                    <h3 className="text-base font-semibold text-card-foreground transition-colors group-hover:text-primary">
                      {builder.name}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {builder.totalProjects} projects
                    </p>

                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                      View Profile
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

