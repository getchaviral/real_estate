"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/shared/project-card";
import type { Project } from "@/types/project";
import { getPrimaryMarket, matchesPrimaryMarket, sortPrimaryMarkets } from "@/lib/locationNormalization";

function FastMovingProjectCard({ project }: { project: Project }) {
  return <ProjectCard project={project} />;
}

export default function PopularProjects() {
  const router = useRouter();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetch("/api/data")
      .then((response) => response.json())
      .then((data) => {
        if (!mounted || !Array.isArray(data?.projects)) return;
        const csvProjects = data.projects as Project[];
        setProjects(csvProjects);
      })
      .catch(() => {
        setProjects([]);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const cities = useMemo(() => {
    const marketCounts = new Map<string, number>();

    projects.forEach((project) => {
      const primaryMarket = getPrimaryMarket(project) || project.cityName;
      if (!primaryMarket) return;
      marketCounts.set(primaryMarket, (marketCounts.get(primaryMarket) ?? 0) + 1);
    });

    return sortPrimaryMarkets(Array.from(marketCounts, ([name, count]) => ({ name, count })));
  }, [projects]);

  useEffect(() => {
    if (!cities.length) {
      setSelectedCity("");
      return;
    }

    if (!selectedCity || !cities.some((city) => city.name === selectedCity)) {
      setSelectedCity(cities[0].name);
    }
  }, [cities, selectedCity]);

  const activeCity = selectedCity || cities[0]?.name || "";

  const filteredProjects = useMemo(
    () => projects.filter((project) => matchesPrimaryMarket(project, activeCity)),
    [projects, activeCity]
  );

  const viewAllHref = activeCity ? `/projects?city=${encodeURIComponent(activeCity)}` : "/projects";

  const updateScrollState = () => {
    const node = carouselRef.current;
    if (!node) return;

    const { scrollLeft, scrollWidth, clientWidth } = node;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  };

  useEffect(() => {
    const node = carouselRef.current;
    if (!node) return;

    updateScrollState();
    node.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      node.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [filteredProjects.length]);

  useEffect(() => {
    carouselRef.current?.scrollTo({ left: 0, behavior: "smooth" });
    window.setTimeout(updateScrollState, 320);
  }, [selectedCity]);

  const scrollCarousel = (direction: "left" | "right") => {
    const node = carouselRef.current;
    if (!node) return;

    node.scrollBy({
      left: direction === "left" ? -node.clientWidth : node.clientWidth,
      behavior: "smooth",
    });
    window.setTimeout(updateScrollState, 320);
  };

  return (
    <section className="overflow-hidden bg-slate-50 dark:bg-slate-950 py-6 sm:py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Fast Moving Projects
            </h2>
            <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">
              Discover premium residential and commercial projects across India&apos;s top cities.
            </p>
          </div>
          <Button
            variant="outline"
            size="lg"
            className="h-11 w-fit gap-2 rounded-full border-slate-300 bg-white px-5 font-semibold shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-slate-950 hover:bg-slate-950 hover:text-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-500 dark:hover:bg-slate-800"
            onClick={() => router.push(viewAllHref)}
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-5 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex min-w-max items-center gap-6 border-b border-slate-200 pr-4 sm:gap-7">
            {cities.map((city) => {
              const isActive = city.name === activeCity;
              return (
                <button
                  key={city.name}
                  type="button"
                  onClick={() => setSelectedCity(city.name)}
                  className={`relative whitespace-nowrap px-1 pb-3 text-sm font-semibold transition duration-300 ${
                    isActive
                      ? "text-slate-950"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {city.name}
                  <span className="ml-1.5 text-xs font-medium text-slate-400">({city.count})</span>
                  <span
                    className={`absolute bottom-[-1px] left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-slate-950 transition-all duration-300 ${
                      isActive ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative mt-5">
          {filteredProjects.length > 0 ? (
            <>
              <button
                type="button"
                onClick={() => scrollCarousel("left")}
                disabled={!canScrollLeft}
                className="absolute left-0 top-1/2 z-20 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-[0_18px_45px_-18px_rgba(15,23,42,0.45)] transition duration-300 hover:-translate-x-[55%] hover:bg-slate-950 hover:text-white disabled:pointer-events-none disabled:opacity-0 md:flex dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:shadow-[0_18px_45px_-18px_rgba(0,0,0,0.5)] dark:hover:bg-slate-800"
                aria-label="Previous projects"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>

              <div
                ref={carouselRef}
                className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 sm:gap-5 lg:gap-6"
                style={{ scrollBehavior: "smooth" }}
              >
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="w-[84vw] max-w-[16rem] shrink-0 snap-start sm:w-72 lg:w-[17rem]"
                  >
                    <FastMovingProjectCard project={project} />
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => scrollCarousel("right")}
                disabled={!canScrollRight}
                className="absolute right-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-[0_18px_45px_-18px_rgba(15,23,42,0.45)] transition duration-300 hover:translate-x-[55%] hover:bg-slate-950 hover:text-white disabled:pointer-events-none disabled:opacity-0 md:flex dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:shadow-[0_18px_45px_-18px_rgba(0,0,0,0.5)] dark:hover:bg-slate-800"
                aria-label="Next projects"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
              <p className="text-lg font-semibold text-slate-950 dark:text-slate-100">No projects available for this city yet.</p>
              <p className="mt-2 text-sm leading-6">Choose another city from the tabs to explore more premium projects.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
