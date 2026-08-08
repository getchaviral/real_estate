"use client";

import { useSyncExternalStore } from "react";
import { Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectDetailActionsProps {
  projectName: string;
  slug: string;
}

export default function ProjectDetailActions({ projectName, slug }: ProjectDetailActionsProps) {
  const storageKey = `wishlist:${slug}`;
  const isFavorite = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") {
        return () => {};
      }

      const handleChange = () => onStoreChange();
      window.addEventListener("storage", handleChange);
      window.addEventListener("wishlist-change", handleChange);

      return () => {
        window.removeEventListener("storage", handleChange);
        window.removeEventListener("wishlist-change", handleChange);
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

  const toggleWishlist = () => {
    window.localStorage.setItem(storageKey, String(!isFavorite));
    window.dispatchEvent(new Event("wishlist-change"));
  };

  const shareProject = async () => {
    const url = `${window.location.origin}/projects/${slug}`;

    if ("share" in navigator) {
      try {
        await navigator.share({ title: projectName, url });
        return;
      } catch {
        // Fall back to clipboard copy.
      }
    }

    await navigator.clipboard.writeText(url);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={toggleWishlist}
        className="h-11 gap-2 rounded-full border-white/30 bg-white/95 px-5 text-slate-950 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white"
      >
        <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
        Wishlist
      </Button>
      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={shareProject}
        className="h-11 gap-2 rounded-full border-white/30 bg-white/95 px-5 text-slate-950 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white"
      >
        <Share2 className="h-4 w-4" />
        Share
      </Button>
    </div>
  );
}
