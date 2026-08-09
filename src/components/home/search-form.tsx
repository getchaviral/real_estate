"use client";

import {
  type FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Clock3,
  Search,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

import {
  buildSearchParams,
  getAutocompleteSuggestions,
  getRecentSearches,
  popularSearches,
  saveRecentSearch,
  type RecentSearch,
  type SearchRequest,
  type SearchSuggestion,
} from "@/lib/search";

import { slugify } from "@/lib/csvData";

export function SearchForm() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const visibleSuggestions = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    return getAutocompleteSuggestions(query);
  }, [query]);

  const handleSelectSuggestion = (suggestion: SearchSuggestion) => {
    const nextRequest: SearchRequest = {
      query: suggestion.type === "project" ? suggestion.value : undefined,
      city:
        suggestion.type === "city"
          ? slugify(suggestion.value)
          : undefined,
      developer:
        suggestion.type === "developer"
          ? slugify(suggestion.value)
          : undefined,
      propertyType:
        suggestion.type === "property-type"
          ? slugify(suggestion.value)
          : undefined,
      location:
        suggestion.type === "location"
          ? slugify(suggestion.value)
          : undefined,
      bhk: suggestion.type === "bhk" ? suggestion.value : undefined,
      budget:
        suggestion.type === "budget"
          ? suggestion.value
          : undefined,
      status:
        suggestion.type === "status"
          ? suggestion.value
          : undefined,
    };

    const searchPayload: RecentSearch = {
      id: `${Date.now()}-${suggestion.id}`,
      label: suggestion.label,
      query: suggestion.value,
      filters: nextRequest,
      createdAt: new Date().toISOString(),
    };

    saveRecentSearch(searchPayload);
    setRecentSearches(getRecentSearches());
    setQuery(suggestion.label);
    setIsOpen(false);

    router.push(
      `/projects?${buildSearchParams(nextRequest).toString()}`
    );
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const trimmed = query.trim();

    if (!trimmed) {
      router.push("/projects");
      return;
    }

    const request: SearchRequest = {
      query: trimmed,
      source: "local",
    };

    saveRecentSearch({
      id: `${Date.now()}`,
      label: trimmed,
      query: trimmed,
      filters: request,
      createdAt: new Date().toISOString(),
    });

    setRecentSearches(getRecentSearches());

    router.push(
      `/projects?${buildSearchParams(request).toString()}`
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-4xl"
    >
      <form
        onSubmit={handleSubmit}
        className="relative w-full"
      >
        {/* Search Input */}
        <Input
          aria-label="Search properties"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search by city, project, or developer..."
          className="h-14 w-full rounded-full border-border bg-background/80 pl-12 pr-32 text-base shadow-lg backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-primary/40"
        />

        {/* Search Icon */}
        <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

        {/* Search Button */}
        <Button
          type="submit"
          className="absolute right-2 top-2 h-10 rounded-full px-6"
        >
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>

        {/* Dropdown */}
        {isOpen &&
        (visibleSuggestions.length > 0 ||
          recentSearches.length > 0 ||
          popularSearches.length > 0) ? (
          <Card className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-2xl border-border bg-background shadow-xl">
            <CardContent className="p-0">

              {/* Suggestions */}
              {visibleSuggestions.length > 0 ? (
                <div className="border-b border-border/70 p-3">
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    <Search className="h-3.5 w-3.5" />
                    Suggestions
                  </div>

                  <div className="space-y-1">
                    {visibleSuggestions.map((suggestion) => (
                      <button
                        key={suggestion.id}
                        type="button"
                        onClick={() =>
                          handleSelectSuggestion(suggestion)
                        }
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition hover:bg-muted"
                      >
                        <span>{suggestion.label}</span>

                        <span className="text-xs text-muted-foreground">
                          {suggestion.category}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Recent Searches */}
              {recentSearches.length > 0 ? (
                <div className="border-b border-border/70 p-3">
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    <Clock3 className="h-3.5 w-3.5" />
                    Recent Searches
                  </div>

                  <div className="space-y-1">
                    {recentSearches.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setQuery(item.label);
                          setIsOpen(false);

                          router.push(
                            `/projects?${buildSearchParams(
                              item.filters
                            ).toString()}`
                          );
                        }}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition hover:bg-muted"
                      >
                        <span>{item.label}</span>

                        <span className="text-xs text-muted-foreground">
                          {item.filters.city ??
                            item.filters.developer ??
                            item.filters.propertyType ??
                            item.filters.location ??
                            item.filters.bhk ??
                            item.filters.status ??
                            "Search"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Popular Searches */}
              {popularSearches.length > 0 ? (
                <div className="p-3">
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    <TrendingUp className="h-3.5 w-3.5" />
                    Popular Searches
                  </div>

                  <div className="space-y-1">
                    {popularSearches.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          handleSelectSuggestion(item)
                        }
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition hover:bg-muted"
                      >
                        <span>{item.label}</span>

                        <span className="text-xs text-muted-foreground">
                          {item.category}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

            </CardContent>
          </Card>
        ) : null}
      </form>
    </div>
  );
}