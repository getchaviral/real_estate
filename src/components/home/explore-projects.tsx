"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types/project";
import { CATEGORY_DEFINITIONS, matchesBuyingGoal } from "@/lib/project-categories";

export default function ExploreProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let mounted = true;
    fetch("/api/data")
      .then((response) => response.json())
      .then((data) => {
        if (!mounted || !Array.isArray(data?.projects)) return;
        setProjects(data.projects as Project[]);
      })
      .catch(() => {
        setProjects([]);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    return CATEGORY_DEFINITIONS.map((category) => ({
      ...category,
      count: projects.filter((project) => matchesBuyingGoal(project, category.queryKey, category.queryValue)).length,
    })).filter((category) => category.count > 0);
  }, [projects]);

  if (!categories.length) return null;

  return (
    <section className="bg-background py-16 sm:py-20">
      <Container>
        <SectionHeading
          title="Explore by Buying Goal"
          subtitle="Find projects based on location authority, ownership, and investment preference."
        />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.title}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-900">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-slate-950">
                    {category.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {category.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-slate-900">
                      {category.count} Projects
                    </span>
                    <Button
                      variant="link"
                      className="gap-1 px-0 text-sm font-semibold text-primary"
                      onClick={() => router.push(`/projects?${category.queryKey}=${encodeURIComponent(category.queryValue)}`)}
                    >
                      Explore Projects
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
