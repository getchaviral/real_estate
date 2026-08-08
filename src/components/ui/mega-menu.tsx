"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { getPrimaryMarket, normalizeLocationText, sortPrimaryMarkets } from "@/lib/locationNormalization";

type CityOption = { name: string; slug: string };

const defaultCities: CityOption[] = [];

const citySections = [
  "Featured Projects",
  "Top Properties",
  "Property Types",
  "Popular Localities",
  "Top Developers",
  "New Launch",
  "Ready to Move",
  "Under Construction",
];

export function MegaMenu() {
  const [activeCity, setActiveCity] = useState<CityOption | null>(null);
  const [cities, setCities] = useState<CityOption[]>(defaultCities);

  useEffect(() => {
    let mounted = true;
    fetch('/api/data')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;

        const fastMovingNames = new Set<string>();
        (data.projects || []).forEach((project: { cityName?: string; location?: string; locationSectorArea?: string }) => {
          const primaryMarket = getPrimaryMarket(project as any) || project.cityName;
          if (primaryMarket) {
            fastMovingNames.add(primaryMarket);
          }
        });

        const cs = (data.cities || [])
          .map((c: any) => ({ name: c.name, slug: c.slug }))
          .filter((city: CityOption) => city.name && city.slug && fastMovingNames.has(city.name))
          .sort((a: CityOption, b: CityOption) => a.name.localeCompare(b.name, 'en-IN', { sensitivity: 'base' }));

        const sortedCities = sortPrimaryMarkets(cs as Array<{ name: string; slug: string }>);
        setCities(sortedCities);
        setActiveCity(sortedCities[0] ?? null);
      })
      .catch(() => {
        setCities([]);
        setActiveCity(null);
      });
    return () => { mounted = false; };
  }, []);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Locations</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[600px] grid-cols-3 gap-4 p-4">
              <div className="col-span-1">
                <h3 className="font-bold text-lg mb-2">Popular Cities</h3>
                <ul>
                  {cities.map((city) => {
                    const isActive = activeCity ? normalizeLocationText(city.name) === normalizeLocationText(activeCity.name) : false;
                    return (
                      <li key={city.slug}>
                        <NavigationMenuLink
                          className={cn(
                            "block p-2 rounded-md hover:bg-muted",
                            isActive && "bg-muted font-semibold"
                          )}
                          onMouseEnter={() => setActiveCity(city)}
                        >
                          <Link href={`/locations/${city.slug}`} className="block w-full">
                            {city.name}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="col-span-2">
                <h3 className="font-bold text-lg mb-2">{activeCity?.name ?? "Locations"}</h3>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  {citySections.map((section) => {
                    const activeSlug = activeCity?.slug;
                    return (
                      <li key={section}>
                        <NavigationMenuLink className="hover:text-foreground">
                          <Link
                            href={activeSlug ? `/locations/${activeSlug}#${section.toLowerCase().replace(/\s+/g, "-")}` : "/locations"}
                            className="block w-full"
                          >
                            {section}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
