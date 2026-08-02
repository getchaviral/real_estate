"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Building2, TrendingUp, Users } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import locationsData from "@/data/locations.json";
import type { Location } from "@/types/location";

const locations = locationsData as Location[];
const popularLocations = locations.filter((location) => location.isPopular).slice(0, 6);

export default function PopularCities() {
  return (
    <section className="py-24 sm:py-28">
      <Container>
        <SectionHeading title="Popular Cities" subtitle="High-growth urban markets with premium projects, proven developers, and strong long-term demand" />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {popularLocations.map((location, index) => (
            <motion.div key={location.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: index * 0.08, duration: 0.4 }}>
              <Link href={`/locations/${location.slug}`} className="block h-full">
                <Card className="group relative h-full overflow-hidden border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-primary/5" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  <div className="relative flex h-full min-h-[280px] flex-col justify-end p-6">
                    <Badge variant="primary" size="sm" className="w-fit bg-white/15 text-white backdrop-blur">
                      {location.state}
                    </Badge>
                    <h3 className="mt-4 text-2xl font-semibold text-white">{location.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/70">{location.description}</p>

                    <div className="mt-5 grid gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                      <div className="flex items-center justify-between text-sm text-white/80">
                        <span className="flex items-center gap-2"><Building2 className="h-4 w-4" />{location.totalProjects}+ active projects</span>
                        <span className="font-semibold text-white">{location.totalDevelopers}+ developers</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-white/80">
                        <span className="flex items-center gap-2"><Users className="h-4 w-4" />Starting from</span>
                        <span className="font-semibold text-white">{formatPrice(location.priceRange.min)}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-white/80"><TrendingUp className="h-4 w-4" />Strong appreciation</span>
                      <Button variant="ghost" size="sm" className="gap-1 bg-white/10 text-white backdrop-blur hover:bg-white/20">
                        Explore City
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
