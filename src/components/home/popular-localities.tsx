"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import locationsData from "@/data/locations.json";
import { formatPrice } from "@/lib/utils";
import type { Location } from "@/types/location";

const locations = locationsData as Location[];
const popularLocalities = locations.filter((l) => l.isPopular).slice(0, 6);

export default function PopularLocalities() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          title="Popular Localities"
          subtitle="High-demand neighborhoods with strong rental demand and steady appreciation"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {popularLocalities.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
            >
              <Card className="group h-full overflow-hidden border-border/70 bg-card/80">
                <div className="relative h-40 overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-background">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
                      Prime address
                    </p>
                    <h3 className="mt-1 text-xl font-semibold text-white">{location.name}</h3>
                    <p className="mt-1 text-sm text-white/80">{location.state}</p>
                  </div>
                </div>

                <CardContent className="p-5">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{location.name}, {location.state}</span>
                  </div>

                  <div className="mt-4 grid gap-3 rounded-xl bg-muted/70 p-3 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Projects
                      </p>
                      <p className="mt-1 text-sm font-semibold text-foreground">
                        {location.totalProjects}+ active
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Starting from
                      </p>
                      <p className="mt-1 text-sm font-semibold text-foreground">
                        {formatPrice(location.priceRange.min)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Avg. ₹{location.avgPricePerSqft.toLocaleString()}/sqft
                    </span>
                    <Button variant="ghost" size="sm" className="gap-1 text-primary">
                      Explore
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
