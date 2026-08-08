"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Building2, Compass, Landmark, Home, Warehouse, Store } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/types/project";
import type { PropertyType } from "@/types/property-type";
import { useEffect, useState } from "react";

const [projects, setProjects] = [[], () => {}] as any;
const [propertyTypes, setPropertyTypes] = [[], () => {}] as any;

// client-side fetch of dataset
function useDataset() {
  const [p, setP] = useState<Project[]>([]);
  const [pt, setPt] = useState<PropertyType[]>([]);
  useEffect(() => {
    let mounted = true;
    fetch('/api/data')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        setP((data.projects || []) as Project[]);
        setPt((data.propertyTypes || []) as PropertyType[]);
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);
  return { projects: p, propertyTypes: pt };
}

export default function PropertyTypes() {
  const { projects: projectsState, propertyTypes: propertyTypesState } = useDataset();
  const projects = projectsState;
  const propertyTypes = propertyTypesState;

const icons = {
  apartment: Home,
  villa: Building2,
  plot: Compass,
  commercial: Landmark,
  "office-space": Warehouse,
  "retail-shop": Store,
};

  const getPropertyCount = (propertyType: PropertyType) => {
    const normalizedName = propertyType.name.toLowerCase().replace(/\s+/g, "");

    return projects.filter((project) =>
      (project.propertyTypes || project.propertyType || []).some((type: string) => {
        const normalizedType = type.toLowerCase().replace(/\s+/g, "");
        return normalizedType.includes(normalizedName) || normalizedName.includes(normalizedType);
      })
    ).length;
  };

  return (
    <section className="bg-muted/40 py-10 sm:py-14">
      <Container>
        <SectionHeading title="Property Types" subtitle="Explore the formats that match your requirement, lifestyle, and investment strategy" />

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {propertyTypes.slice(0, 6).map((propertyType, index) => {
            const Icon = icons[(propertyType.slug as keyof typeof icons) ?? "apartment"] ?? Home;
            const projectCount = getPropertyCount(propertyType);

            return (
              <motion.div key={propertyType.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: index * 0.08, duration: 0.4 }}>
                <Link href={`/property-types/${propertyType.slug}`} className="block h-full">
                  <Card className="group h-full overflow-hidden border-border/80 bg-card/95 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-28px_rgba(15,23,42,0.24)]">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">{projectCount}+ listings</span>
                      </div>

                      <h3 className="mt-4 text-xl font-semibold text-card-foreground transition-colors group-hover:text-primary">{propertyType.name}</h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{propertyType.description}</p>

                      <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm">
                        <span className="text-muted-foreground">Handpicked options</span>
                        <span className="inline-flex items-center gap-1 font-medium text-primary">
                          Explore
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
