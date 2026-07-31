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
import locations from "@/data/locations.json";
import { useState } from "react";
import { cn } from "@/lib/utils";

const cities = [
  { name: "Mumbai", slug: "mumbai" },
  { name: "Ahmedabad", slug: "ahmedabad" },
  { name: "Pune", slug: "pune" },
  { name: "Bangalore", slug: "bangalore" },
  { name: "Delhi NCR", slug: "delhi-ncr" },
  { name: "Hyderabad", slug: "hyderabad" },
  { name: "Noida", slug: "noida" },
  { name: "Gurgaon", slug: "gurgaon" },
  { name: "Chennai", slug: "chennai" },
];

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
  const [activeCity, setActiveCity] = useState(cities[0].name);

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
                  {cities.map((city) => (
                    <li key={city.slug}>
                      <Link
                        href={`/locations/${city.slug}`}
                        className={cn(
                          "block p-2 rounded-md hover:bg-muted",
                          activeCity === city.name && "bg-muted font-semibold"
                        )}
                        onMouseEnter={() => setActiveCity(city.name)}
                      >
                        {city.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-2">
                <h3 className="font-bold text-lg mb-2">{activeCity}</h3>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  {citySections.map((section) => (
                    <li key={section}>
                      <Link
                        href={`/locations/${
                          cities.find((c) => c.name === activeCity)?.slug
                        }#${section.toLowerCase().replace(/\s+/g, "-")}`}
                        className="hover:text-foreground"
                      >
                        {section}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
