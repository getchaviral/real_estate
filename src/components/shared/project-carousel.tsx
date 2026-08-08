"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Container from "@/components/shared/container";
import ProjectCard from "@/components/shared/project-card";
import SectionHeading from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types/project";

interface ProjectCarouselProps {
  title: string;
  subtitle: string;
  projects: Project[];
  extraInfo?: ReactNode;
  viewAllHref?: string;
  viewAllLabel?: string;
  className?: string;
}

export default function ProjectCarousel({
  title,
  subtitle,
  projects,
  extraInfo,
  viewAllHref,
  viewAllLabel = "View all projects",
  className,
}: ProjectCarouselProps) {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
    }
  };

  useEffect(() => {
    checkScroll();
    const node = scrollRef.current;
    node?.addEventListener("scroll", checkScroll, { passive: true });

    return () => node?.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 420;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 280);
    }
  };

  return (
    <section className={className}>
      <Container>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex-1">
            <SectionHeading title={title} subtitle={subtitle} />
            {extraInfo ? <div className="mt-2">{extraInfo}</div> : null}
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="rounded-full border border-border bg-card/90 p-2.5 transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Scroll left"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="rounded-full border border-border bg-card/90 p-2.5 transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Scroll right"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="mt-3 flex gap-3 overflow-x-auto pb-2 pl-0.5 pr-0.5 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollBehavior: "smooth" }}
        >
          {projects.map((project) => (
            <div key={project.id} className="w-[84vw] max-w-[16rem] shrink-0 snap-start sm:w-72 lg:w-[17rem]">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {viewAllHref ? (
          <div className="mt-4 flex justify-start sm:mt-6 sm:justify-end">
            <Button variant="outline" size="lg" className="gap-2" onClick={() => router.push(viewAllHref)}>
              {viewAllLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
