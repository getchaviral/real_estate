"use client";

import { useMemo, useState } from "react";
import ProjectCarousel from "@/components/shared/project-carousel";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types/project";

const projects = projectsData as Project[];
const fastMovingProjects = projects.filter((project) => project.isFeatured);
const cityOptions = ["All", ...Array.from(new Set(fastMovingProjects.map((project) => project.cityName))).sort()];

export default function FeaturedProjects() {
  const [selectedCity, setSelectedCity] = useState("All");

  const filteredProjects = useMemo(() => {
    if (selectedCity === "All") {
      return fastMovingProjects;
    }

    return fastMovingProjects.filter((project) => project.cityName === selectedCity);
  }, [selectedCity]);

  const filteredLocations = Array.from(new Set(filteredProjects.map((project) => project.cityName)));
  const filteredNames = filteredProjects.map((project) => project.name);

  return (
    <section className="-mt-4 pt-8 pb-8 sm:-mt-6 sm:pt-10 sm:pb-10 lg:-mt-8 lg:pt-12 lg:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-border/70 bg-card/95 p-4 shadow-[0_18px_60px_-30px_rgba(15,23,42,0.25)] sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Popular Projects</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                Select a city to see only the projects that are moving fastest in that market.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {cityOptions.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setSelectedCity(city)}
                  className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                    selectedCity === city
                      ? "bg-foreground text-background shadow-lg"
                      : "border border-border bg-background text-foreground hover:border-foreground"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-border/70 bg-background/80 p-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => setSelectedCity("All")}
              className="flex items-center gap-2 rounded-full border border-border/70 bg-background px-3 py-2 text-left transition hover:border-foreground"
            >
              <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Selected city</span>
              <span className="rounded-full bg-foreground px-3 py-1 text-sm font-medium text-background">{selectedCity}</span>
            </button>
            <div className="flex flex-wrap gap-2">
              {filteredLocations.slice(0, 4).map((location) => (
                <button
                  key={location}
                  type="button"
                  onClick={() => setSelectedCity(location)}
                  className={`rounded-full border px-3 py-1 text-xs transition ${
                    selectedCity === location
                      ? "border-foreground bg-foreground text-background"
                      : "border-border/70 bg-muted/70 text-foreground hover:border-foreground"
                  }`}
                >
                  {location}
                </button>
              ))}
            </div>
          </div> */}
        </div>

        <div className="mt-4 sm:mt-5 lg:mt-6">
          <ProjectCarousel
            title=""
            subtitle=""
            projects={filteredProjects}
            viewAllHref="/projects"
            viewAllLabel="View all projects"
            extraInfo={null}
          />
        </div>
      </div>
    </section>
  );
}

