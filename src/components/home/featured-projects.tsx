"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { Project } from "@/types/project";

const statusLabelMap: Record<string, string> = {
  "ready-to-move": "Ready to Move",
  "ready to move": "Ready to Move",
  "under-construction": "Under Construction",
  "under construction": "Under Construction",
  "new-launch": "New Launch",
  "new launch": "New Launch",
  "pre-launch": "Pre Launch",
  "pre launch": "Pre Launch",
};

function formatPrice(priceRange?: Project["priceRange"]) {
  if (!priceRange?.min) return "Price on request";
  return `Starts from ${new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: priceRange.currency || "INR",
    maximumFractionDigits: 0,
  }).format(priceRange.min)}`;
}

function formatPropertyType(type?: Project["propertyType"]) {
  if (Array.isArray(type)) return type.map((item) => item.replace(/-/g, " ")).join(" / ");
  if (typeof type === "string") return type.replace(/-/g, " ");
  return "Residential";
}

function getProjectArea(project: Project) {
  if (project.totalArea) return project.totalArea;
  const firstConfig = project.configurations?.[0];
  return firstConfig?.area ?? "Area details";
}

function getStatusLabel(status?: string) {
  return statusLabelMap[status?.toString()?.toLowerCase() ?? ""] || status || "Status";
}

function getHeroImage(project: Project) {
  return project.images?.hero || project.images?.gallery?.[0] || "/images/placeholder-project.jpg";
}

function getCardHeight() {
  return 420; // target between 400-430
}

function getVisibleCardWidth(cardsPerView: number, total: number) {
  const visible = Math.min(cardsPerView, total || 1);
  if (visible === 4) return `calc((100% - 72px) / 4)`;
  if (visible === 2) return `calc((100% - 20px) / 2)`;
  return "min(100%, 300px)";
}

export default function FeaturedProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState(cityOptions[0] ?? "");
  const [cardsPerView, setCardsPerView] = useState(4);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(300);
  const [cardGap, setCardGap] = useState(24);
  const sliderRef = useRef<HTMLDivElement>(null);

  const filteredProjects = useMemo(
    () => featuredProjects.filter((project) => project.cityName === selectedCity),
    [selectedCity],
  );

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      const perView = width >= 1024 ? 4 : width >= 768 ? 2 : 1;
      setCardsPerView(perView);

      if (perView === 4) {
        setCardWidth(300);
        setCardGap(24);
      } else if (perView === 2) {
        setCardWidth(280);
        setCardGap(20);
      } else {
        const available = Math.min(300, Math.max(260, width - 32));
        setCardWidth(available);
        setCardGap(16);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // fetch dataset from API (CSV-backed)
  useEffect(() => {
    let mounted = true;
    fetch('/api/data')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        const p = (data.projects || []) as Project[];
        setProjects(p);
        const featured = p.filter((proj: Project) => proj.isFeatured);
        setFeaturedProjects(featured);
        const allCities = Array.from(
          new Set(p.map((project) => project.cityName).filter(Boolean)),
        ).sort();
        const featuredCities = Array.from(
          new Set(featured.map((project) => project.cityName).filter(Boolean)),
        ).sort();
        setCityOptions(allCities);
        setSelectedCity(featuredCities[0] ?? allCities[0] ?? '');
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [selectedCity]);

  const visibleCount = Math.min(cardsPerView, filteredProjects.length || 1);
  const maxIndex = Math.max(filteredProjects.length - visibleCount, 0);

  useEffect(() => {
    if (activeIndex > maxIndex) setActiveIndex(maxIndex);
  }, [activeIndex, maxIndex]);

  const handlePrev = () => setActiveIndex((current) => Math.max(current - 1, 0));
  const handleNext = () => setActiveIndex((current) => Math.min(current + 1, maxIndex));

  return (
    <section className="w-full bg-slate-50 py-10">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
            >
              Fast Moving Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
              className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg"
            >
              Discover premium projects across top locations.
            </motion.p>
          </div>

          <motion.a
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.12 }}
            href="/projects"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            View All →
          </motion.a>
        </div>

        <LocationTabs cities={cityOptions} activeCity={selectedCity} onChange={setSelectedCity} />

        <div className="relative mt-6 overflow-hidden rounded-[2rem] bg-white px-4 py-6 shadow-[0_18px_60px_-36px_rgba(15,23,42,0.25)] sm:px-6">
          <div className="absolute right-4 top-1/2 z-20 flex -translate-y-1/2 gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-lg transition hover:border-slate-300"
              aria-label="Previous projects"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 6 9 12l6 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-lg transition hover:border-slate-300"
              aria-label="Next projects"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 6 6 6-6 6" />
              </svg>
            </button>
          </div>

          <div className="overflow-hidden">
              <motion.div
                ref={sliderRef}
                drag="x"
                dragElastic={0.12}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) handleNext();
                  if (info.offset.x > 80) handlePrev();
                }}
                animate={{ x: `-${activeIndex * (cardWidth + cardGap)}px` }}
                transition={{ type: "spring", stiffness: 210, damping: 28 }}
                className="flex"
                style={{
                  gap: cardGap,
                  minHeight: getCardHeight(),
                  width: filteredProjects.length
                    ? `${filteredProjects.length * (cardWidth + cardGap) - cardGap}px`
                    : undefined,
                }}
              >
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex-shrink-0"
                    style={{
                      flex: cardsPerView === 1 ? `0 0 min(100%, ${cardWidth}px)` : `0 0 ${cardWidth}px`,
                      width: cardsPerView === 1 ? `min(100%, ${cardWidth}px)` : `${cardWidth}px`,
                      height: `${getCardHeight()}px`,
                    }}
                  >
                    <ProjectCard project={project} onClick={() => router.push(`/projects/${project.slug}`)} />
                  </motion.div>
                ))}
              </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LocationTabs({
  cities,
  activeCity,
  onChange,
}: {
  cities: string[];
  activeCity: string;
  onChange: (city: string) => void;
}) {
  return (
    <div className="mt-6 overflow-x-auto pb-3">
      <div className="inline-flex min-w-full gap-4 px-1 sm:min-w-max">
        {cities.map((city) => {
          const isActive = city === activeCity;
          return (
            <motion.button
              key={city}
              type="button"
              onClick={() => onChange(city)}
              whileTap={{ scale: 0.98 }}
              className="relative rounded-full px-5 py-3 text-sm font-semibold transition"
              style={{
                background: isActive ? "#f8fafc" : "#ffffff",
                color: isActive ? "#0f172a" : "#475569",
                boxShadow: isActive ? "0 16px 32px rgba(15,23,42,0.08)" : "none",
              }}
            >
              {city}
              {isActive ? (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute inset-x-5 bottom-0 h-1 rounded-full bg-sky-600"
                />
              ) : null}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const statusLabel = getStatusLabel(project.status);
  const typeLabel = formatPropertyType(project.propertyType);
  const priceLabel = formatPrice(project.priceRange);
  const areaLabel = getProjectArea(project);
  const heroImage = getHeroImage(project);

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.99 }}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_60px_-28px_rgba(15,23,42,0.16)] transition duration-300 hover:shadow-[0_24px_60px_-20px_rgba(15,23,42,0.2)]"
    >
      <div className="relative overflow-hidden bg-slate-100">
        <div className="relative h-48 w-full overflow-hidden"> 
          <img
            src={heroImage}
            alt={project.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </div>

        <div className="absolute right-3 top-3 flex items-center gap-2">
          <WishlistButton />
          <ShareButton />
        </div>

        <div className="absolute left-4 bottom-4 rounded-full bg-slate-950/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white shadow-lg shadow-slate-950/20">
          {statusLabel}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-slate-950">{project.name}</h3>
          <p className="mt-1 text-xs text-slate-500">{project.locality}, {project.cityName}</p>
        </div>

        <div className="grid gap-2 text-xs sm:grid-cols-2">
          <CardDetail label="Starting Price" value={priceLabel} />
          <CardDetail label="Configuration" value={typeLabel} />
          <CardDetail label="Area" value={areaLabel} />
          <CardDetail label="Developer" value={project.developerName} />
        </div>

        <div className="mt-auto flex items-center justify-between gap-3">
          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-sky-700">View Details</span>
          <span className="hidden rounded-full bg-slate-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 sm:inline-block">
            Premium
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function CardDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] bg-slate-50 p-3">
      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-1 font-semibold text-sm text-slate-950">{value}</p>
    </div>
  );
}

function WishlistButton() {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white bg-white shadow-sm shadow-slate-950/10 transition"
      aria-label="Add to wishlist"
      onClick={(event) => event.stopPropagation()}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-rose-500">
        <path d="M12.1 21.35c-.4.4-1.05.4-1.45 0l-7.5-7.5a4.962 4.962 0 0 1 0-7.05 4.966 4.966 0 0 1 7.05 0l1.9 1.9 1.9-1.9a4.966 4.966 0 0 1 7.05 0 4.962 4.962 0 0 1 0 7.05l-7.5 7.5Z" fill="currentColor" />
      </svg>
    </motion.button>
  );
}

function ShareButton() {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white bg-white shadow-sm shadow-slate-950/10 transition"
      aria-label="Share project"
      onClick={(event) => event.stopPropagation()}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-slate-700">
        <path d="M15 8a3 3 0 1 0-2.83-4H9a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3.17A3 3 0 1 0 15 16h.17A3 3 0 1 0 15 8Zm-3-2.5a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1Zm1.83 10A3.003 3.003 0 0 0 13 17.5 3 3 0 0 0 15.5 15h-1.67Zm.17-9A3.003 3.003 0 0 0 12.5 5 3 3 0 0 0 10 7.5h1.67Z" fill="currentColor" />
      </svg>
    </motion.button>
  );
}
