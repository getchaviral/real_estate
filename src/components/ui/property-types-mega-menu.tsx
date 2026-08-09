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
  { name: "Residential", slug: "residential" },
  { name: "Commercial", slug: "commercial" },
  { name: "Residential + Commercial", slug: "residential-commercial" },
  { name: "Residential Studio", slug: "residential-studio" },
  { name: "Mixed Residential", slug: "mixed-residential" },
];

type PropertyTypesMegaMenuProps = {
  isActive?: boolean;
};

export function PropertyTypesMegaMenu({
  isActive = false,
}: PropertyTypesMegaMenuProps) {
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
            Property Types
          </NavigationMenuTrigger>
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
