"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Building2, MapPin, Search, Sparkles } from "lucide-react";
import Container from "@/components/shared/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatPriceRange } from "@/lib/utils";
import { buildSearchParams, getAutocompleteSuggestions, type SearchSuggestion } from "@/lib/search";
import type { Project } from "@/types/project";

const heroBackground = "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1800&q=80";

export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    let mounted = true;
    fetch('/api/data')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        const p = (data.projects || []).map((x: any) => x as Project);
        setProjects(p);
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  const premiumProject = projects.find((project) => project.isFeatured) ?? projects[0];
  const cityOptions = useMemo(() => Array.from(new Set(projects.map((project) => project.cityName))).sort(), [projects]);
  const propertyTypeOptions = useMemo(() => Array.from(new Set(projects.flatMap((project) => project.propertyType || project.propertyTypes || []))).sort(), [projects]);
  const statusOptions = [
    { value: "ready-to-move", label: "Ready to Move" },
    { value: "under-construction", label: "Under Construction" },
    { value: "new-launch", label: "New Launch" },
  ];
  const budgetOptions = [
    { value: "0-5000000", label: "Up to ₹50L" },
    { value: "5000000-10000000", label: "₹50L - ₹1Cr" },
    { value: "10000000-20000000", label: "₹1Cr - ₹2Cr" },
    { value: "20000000-999999999", label: "₹2Cr+" },
  ];

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const nextSuggestions = getAutocompleteSuggestions(query, { projects }).slice(0, 5);
    setSuggestions(nextSuggestions);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSuggestionsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const request = {
      query: query.trim() || undefined,
      city: selectedCity || undefined,
      budget: selectedBudget || undefined,
      propertyType: selectedPropertyType || undefined,
      status: selectedStatus || undefined,
    };

    router.push(`/projects?${buildSearchParams(request).toString()}`);
  };

  const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.label);
    setIsSuggestionsOpen(false);

    const request = {
      query: suggestion.type === "project" ? suggestion.value : undefined,
      city: suggestion.type === "city" ? suggestion.value : undefined,
      developer: suggestion.type === "developer" ? suggestion.value : undefined,
      propertyType: suggestion.type === "property-type" ? suggestion.value : undefined,
      location: suggestion.type === "location" ? suggestion.value : undefined,
      budget: suggestion.type === "budget" ? suggestion.value : undefined,
      status: suggestion.type === "status" ? suggestion.value : undefined,
    };

    router.push(`/projects?${buildSearchParams(request).toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-slate-50">
      <div className="absolute inset-0 bg-cover bg-center opacity-100" style={{ backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.44) 45%, rgba(255,255,255,0.24) 100%), url('${heroBackground}')` }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.16),transparent_32%)]" />

      <Container className="relative flex min-h-[clamp(30rem,70svh,48rem)] items-center py-10 text-left sm:py-14 lg:py-16 xl:py-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-[min(100%,76rem)]">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }} className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-amber-700 sm:mb-3 sm:text-sm">
            India&apos;s Most Trusted Real Estate Platform
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }} className="max-w-4xl text-[clamp(2rem,4.2vw,4.4rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-slate-950 drop-shadow-[0_2px_20px_rgba(255,255,255,0.7)] sm:text-[clamp(2.6rem,5vw,5.2rem)] lg:text-[clamp(3.2rem,5.6vw,5.8rem)]">
            Discover a <span className="text-orange-500">premium</span> address that feels unmistakably yours.
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }} className="mt-3 max-w-3xl text-base leading-7 text-slate-700 sm:mt-4 sm:text-lg sm:leading-8 lg:text-xl">
            Explore refined residences, investment-ready projects, and trusted developers with a search experience designed for modern buyers.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }} className="mx-auto mt-6 w-full max-w-[min(100%,72rem)] rounded-[clamp(1.25rem,2.2vw,1.875rem)] border border-white/20 bg-card/95 p-3 shadow-[0_25px_70px_-28px_rgba(2,6,23,0.5)] backdrop-blur sm:mt-8 sm:p-4 lg:p-5" ref={searchRef}>
            <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.7fr)_minmax(0,0.7fr)_auto]">
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                <Input
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setIsSuggestionsOpen(true);
                  }}
                  onFocus={() => setIsSuggestionsOpen(true)}
                  placeholder="Search city, project, developer, locality..."
                  className="min-h-14 w-full rounded-2xl border border-border bg-background/95 pl-12 pr-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200 focus-visible:ring-offset-0"
                />

                {isSuggestionsOpen && suggestions.length > 0 ? (
                  <div className="absolute left-0 right-0 top-[calc(100%+0.65rem)] z-20 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                    <div className="p-2">
                      {suggestions.map((suggestion) => (
                        <button key={suggestion.id} type="button" onClick={() => handleSuggestionSelect(suggestion)} className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition hover:bg-slate-50">
                          <span className="text-slate-800">{suggestion.label}</span>
                          <span className="text-xs uppercase tracking-[0.2em] text-slate-500">{suggestion.category}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <select value={selectedCity} onChange={(event) => setSelectedCity(event.target.value)} className="hero-search-select min-h-14 w-full rounded-2xl border border-border bg-background/95 px-4 py-3 text-sm font-medium text-foreground shadow-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-orange-200">
                <option value="">All cities</option>
                {cityOptions.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>

              <select value={selectedBudget} onChange={(event) => setSelectedBudget(event.target.value)} className="hero-search-select min-h-14 w-full rounded-2xl border border-border bg-background/95 px-4 py-3 text-sm font-medium text-foreground shadow-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-orange-200">
                <option value="">Budget</option>
                {budgetOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>

              <Button type="submit" size="lg" className="min-h-14 w-full gap-2 rounded-2xl px-6 text-base font-semibold md:w-auto">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </form>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-[22px] border border-slate-200 bg-slate-50/90 px-3 py-3 text-sm text-slate-600">
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((status) => (
                  <button key={status.value} type="button" onClick={() => setSelectedStatus((current) => (current === status.value ? "" : status.value))} className={`rounded-full border px-3 py-1.5 text-[0.7rem] font-medium transition sm:text-xs ${selectedStatus === status.value ? "border-orange-400 bg-orange-50 text-orange-600" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100"}`}>
                    {status.label}
                  </button>
                ))}
              </div>
              <span className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-500 sm:text-xs">Instant suggestions • Smart filters • Live results</span>
            </div>
          </motion.div>

        </motion.div>
      </Container>
    </section>
  );
}
