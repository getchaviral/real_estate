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
import { getPrimaryMarket, normalizeLocationText, sortPrimaryMarkets, getFastMovingCities } from "@/lib/locationNormalization";

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

type MegaMenuProps = {
  isActive?: boolean;
};

export function MegaMenu({ isActive = false }: MegaMenuProps) {
  const [activeCity, setActiveCity] = useState<CityOption | null>(null);
  const [cities, setCities] = useState<CityOption[]>(defaultCities);

  useEffect(() => {
    let mounted = true;
    fetch('/api/data')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;

        const p = (data.projects || []) as any[];
        const fastMovingCities = getFastMovingCities(p);

        // Map to { name, slug }
        const cityObjects = fastMovingCities.map((cityName) => {
          // Find if we have a matching slug in data.cities
          const match = (data.cities || []).find((c: any) => normalizeLocationText(c.name) === normalizeLocationText(cityName));
          return {
            name: cityName,
            slug: match?.slug || cityName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          };
        });

        setCities(cityObjects);
        setActiveCity(cityObjects[0] ?? null);
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
          <NavigationMenuTrigger
            className={cn(
              isActive &&
                "bg-muted text-foreground font-semibold hover:text-foreground"
            )}
          >
            Locations
          </NavigationMenuTrigger>
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
