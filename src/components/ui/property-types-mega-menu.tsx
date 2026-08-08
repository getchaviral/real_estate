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
import { cn } from "@/lib/utils";

const propertyTypes = [
  { name: "Apartment", slug: "apartment" },
  { name: "Villa", slug: "villa" },
  { name: "Plot", slug: "plot" },
  { name: "Commercial", slug: "commercial" },
  { name: "Office Space", slug: "office-space" },
  { name: "Retail Shop", slug: "retail-shop" },
  { name: "Independent Floor", slug: "independent-floor" },
];

export function PropertyTypesMegaMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Property Types</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
              {propertyTypes.map((property, index) => (
                <Link
                  key={`${property.slug}-${index}`}
                  href={`/property-types/${property.slug}`}
                  className={cn(
                    "block p-2 rounded-md hover:bg-muted",
                  )}
                >
                  {property.name}
                </Link>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
