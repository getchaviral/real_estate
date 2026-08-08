"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Building2, Heart, Home, MapPin, Maximize2, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types/project";
import { formatPriceRange, getStatusColor } from "@/lib/utils";
import { PROJECT_STATUS_LABELS } from "@/lib/constants";

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();
  const [showShareMenu, setShowShareMenu] = useState(false);

  const firstConfiguration = project.configurations[0];
  const primaryConfiguration = firstConfiguration?.type || project.configuration || "Configuration on request";
  const primaryArea = firstConfiguration?.area || project.unitSizeRange || project.totalArea || "Area on request";
  const primaryPropertyType = Array.isArray(project.propertyType)
    ? project.propertyType.join(' / ')
    : project.propertyType || 'Residential';
  const storageKey = `wishlist:${project.slug}`;
  const isFavorite = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") {
        return () => {};
      }

      const handleStorageChange = () => onStoreChange();
      window.addEventListener("storage", handleStorageChange);
      window.addEventListener("wishlist-change", handleStorageChange);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
        window.removeEventListener("wishlist-change", handleStorageChange);
      };
    },
    () => {
      if (typeof window === "undefined") {
        return false;
      }

      return window.localStorage.getItem(storageKey) === "true";
    },
    () => false
  );

  const toggleFavorite = () => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(storageKey, String(!isFavorite));
    window.dispatchEvent(new Event("wishlist-change"));
  };

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

  const imageSrc = project.images?.hero || project.images?.gallery?.[0] || "/images/property-card-bg.svg";
  const statusVariant = getStatusColor(project.status) as "primary" | "secondary" | "success" | "warning" | "danger" | "outline";
  const developerName = project.developerName || project.builderName || project.developer || "Developer on request";

  return (
    <article className="group relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-[0_12px_35px_-26px_rgba(15,23,42,0.55)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_28px_70px_-34px_rgba(15,23,42,0.58)]">
      <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl bg-slate-950">
        <Image
          src={imageSrc}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1280px) 22rem, 24rem"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-black/10" />

        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2">
          <Badge
            variant={statusVariant}
            size="sm"
            className="rounded-full border border-white/30 bg-white/95 px-3 py-1 text-[11px] font-semibold text-slate-900 shadow-sm backdrop-blur"
          >
            {PROJECT_STATUS_LABELS[project.status] ?? project.rawStatus ?? "Available"}
          </Badge>
        </div>

        <div className="absolute right-3 top-3 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              toggleFavorite();
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-white/90 text-slate-950 shadow-lg backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white"
            aria-label="Toggle wishlist"
          >
            <Heart className={`h-4 w-4 transition ${isFavorite ? "fill-red-500 text-red-500" : "text-slate-950"}`} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handleShare();
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-white/90 text-slate-950 shadow-lg backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white"
            aria-label="Share project"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>

        {showShareMenu ? (
          <div className="absolute right-3 top-14 z-30 w-44 rounded-xl border border-border/70 bg-background/95 p-2 shadow-xl backdrop-blur">
            {shareLinks.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  item.action();
                }}
                className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-foreground transition hover:bg-muted"
              >
                {item.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div>
          <h3 className="line-clamp-2 min-h-[2.75rem] text-[1.05rem] font-semibold leading-[1.35] text-slate-950 transition-colors group-hover:text-primary">
            {project.name}
          </h3>

          <div className="mt-2 space-y-1.5 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-primary" />
              <span className="line-clamp-1">{project.locality}, {project.cityName}</span>
            </div>
          </div>
        </div>

        <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Starting Price</p>
          <p className="mt-1 text-lg font-bold leading-6 text-slate-950">
            {formatPriceRange(project.priceRange.min, project.priceRange.max)}
          </p>

          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Home className="h-3.5 w-3.5" />
                Config
              </div>
              <p className="mt-1 truncate font-semibold text-slate-900">{primaryConfiguration}</p>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Maximize2 className="h-3.5 w-3.5" />
                Area
              </div>
              <p className="mt-1 truncate font-semibold text-slate-900">{primaryArea}</p>
            </div>
          </div>
        </div>

        <div className="mt-3 grid gap-1.5 text-xs font-medium text-slate-500">
          <div className="flex min-w-0 items-center gap-2">
            <Building2 className="h-3.5 w-3.5 shrink-0 text-primary" />
            <span className="truncate">{developerName}</span>
          </div>
          <p className="line-clamp-1">{primaryPropertyType}</p>
        </div>

        <Button
          variant="default"
          size="sm"
          className="relative z-20 mt-auto inline-flex h-10 items-center justify-center gap-2 rounded-full bg-slate-950 px-4 text-sm font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-slate-900 group-hover:shadow-[0_14px_35px_-20px_rgba(15,23,42,0.9)]"
          onClick={(event) => {
            event.stopPropagation();
            goToProject();
          }}
        >
          View Details
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <button type="button" onClick={goToProject} className="absolute inset-0 z-10" aria-label={`Open ${project.name}`} />
    </article>
  );
}

export default ProjectCard;
