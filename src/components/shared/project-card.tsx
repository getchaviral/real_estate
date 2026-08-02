"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Building2, Heart, MapPin, Share2, Square, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types/project";
import { formatPrice, formatPriceRange, getStatusColor } from "@/lib/utils";
import { PROJECT_STATUS_LABELS } from "@/lib/constants";

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const firstConfiguration = project.configurations[0];
  const primaryBhk = firstConfiguration?.type ?? "3 BHK";
  const primaryArea = firstConfiguration?.area ?? project.totalArea;
  const storageKey = `wishlist:${project.slug}`;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedValue = window.localStorage.getItem(storageKey);
    setIsFavorite(storedValue === "true");
  }, [storageKey]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(storageKey, String(isFavorite));
  }, [isFavorite, storageKey]);

  const handleCopyLink = async (slug: string) => {
    const url = `${window.location.origin}/projects/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setShowShareMenu(false);
    } catch {
      window.prompt("Copy this link", url);
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: project.name,
          text: `${project.name} - ${project.tagline}`,
          url: `${window.location.origin}/projects/${project.slug}`,
        });
        return;
      } catch {
        // Fall back to the dropdown below
      }
    }

    setShowShareMenu((value) => !value);
  };

  const shareLinks = useMemo(
    () => [
      { label: "Copy Link", action: () => handleCopyLink(project.slug) },
      {
        label: "WhatsApp",
        action: () => window.open(`https://wa.me/?text=${encodeURIComponent(`${project.name} - ${window.location.origin}/projects/${project.slug}`)}`, "_blank", "noopener,noreferrer"),
      },
      {
        label: "LinkedIn",
        action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${window.location.origin}/projects/${project.slug}`)}`, "_blank", "noopener,noreferrer"),
      },
      {
        label: "X (Twitter)",
        action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${project.name} - ${window.location.origin}/projects/${project.slug}`)}`, "_blank", "noopener,noreferrer"),
      },
      {
        label: "Email",
        action: () => window.open(`mailto:?subject=${encodeURIComponent(project.name)}&body=${encodeURIComponent(`${window.location.origin}/projects/${project.slug}`)}`),
      },
    ],
    [project.name, project.slug]
  );

  const goToProject = () => {
    router.push(`/projects/${project.slug}`);
  };

  const imageSrc = project.images.hero || "/images/property-card-bg.svg";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-border/70 bg-card/95 shadow-[0_12px_34px_-22px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_48px_-24px_rgba(15,23,42,0.35)]">
      <div className="relative h-40 overflow-hidden sm:h-44">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setIsFavorite((value) => !value);
          }}
          className="absolute right-3 top-3 z-20 rounded-full border border-white/35 bg-white/80 p-2.5 text-foreground shadow-lg backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white"
          aria-label="Toggle wishlist"
        >
          <Heart className={`h-4 w-4 transition ${isFavorite ? "fill-red-500 text-red-500" : "text-foreground"}`} />
        </button>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleShare();
          }}
          className="absolute right-3 top-16 z-20 rounded-full border border-white/35 bg-white/80 p-2.5 text-foreground shadow-lg backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white"
          aria-label="Share project"
        >
          <Share2 className="h-4 w-4" />
        </button>

        {showShareMenu ? (
          <div className="absolute right-3 top-[5.65rem] z-30 w-44 rounded-2xl border border-border/70 bg-background/95 p-2 shadow-xl backdrop-blur">
            {shareLinks.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  item.action();
                }}
                className="flex w-full items-center rounded-xl px-3 py-2 text-left text-sm text-foreground transition hover:bg-muted"
              >
                {item.label}
              </button>
            ))}
          </div>
        ) : null}

        <div className="absolute left-3 top-3 z-20">
          <Badge variant={getStatusColor(project.status) as any} size="sm" className="capitalize shadow-sm">
            {PROJECT_STATUS_LABELS[project.status]}
          </Badge>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <Image
          src={imageSrc}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1280px) 22rem, 24rem"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-white/85">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Premium Listing</span>
          </div>
          <p className="mt-1.5 text-xl font-semibold text-white">{formatPriceRange(project.priceRange.min, project.priceRange.max)}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-card-foreground transition-colors group-hover:text-primary">{project.name}</h3>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span className="line-clamp-1">{project.locality}, {project.cityName}</span>
            </p>
          </div>
          <div className="rounded-full border border-border/70 bg-muted/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {project.category}
          </div>
        </div>

        <div className="mt-2 grid grid-cols-3 gap-1.5 rounded-xl border border-border/70 bg-muted/40 p-2 text-xs">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">BHK</p>
            <p className="mt-0.5 font-semibold text-foreground">{primaryBhk}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Area</p>
            <p className="mt-0.5 flex items-center gap-1 font-semibold text-foreground">
              <Square className="h-3 w-3" />
              {primaryArea}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Price</p>
            <p className="mt-0.5 font-semibold text-foreground">{formatPrice(project.priceRange.min)}</p>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-border/70 pt-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Building2 className="h-3.5 w-3.5 text-primary" />
            <span className="line-clamp-1">{project.developerName}</span>
          </div>
          <span className="text-xs uppercase tracking-[0.2em]">{project.totalUnits} units</span>
        </div>

        <div className="mt-2 flex items-center gap-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Button variant="default" size="sm" className="flex-1 gap-1.5 rounded-full px-2.5 py-1.5 text-xs" onClick={(event) => { event.stopPropagation(); goToProject(); }}>
            View Details
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="sm" className="rounded-full px-2.5 py-1.5 text-xs" onClick={(event) => { event.stopPropagation(); goToProject(); }}>
            Book Visit
          </Button>
        </div>
      </div>

      <button type="button" onClick={goToProject} className="absolute inset-0 z-10" aria-label={`Open ${project.name}`} />
    </article>
  );
}

export default ProjectCard;
