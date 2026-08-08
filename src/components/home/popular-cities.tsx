"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Building2, TrendingUp, Users } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { useEffect, useState } from "react";
import type { Location } from "@/types/location";

type PopularLocation = Location & { count?: number };

export default function PopularCities() {
  const [popularLocations, setPopularLocations] = useState<PopularLocation[]>([]);
  useEffect(() => {
    let mounted = true;
    fetch('/api/data')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        const cities = (data.cities || []) as Location[];
        setPopularLocations(cities.slice(0, 6));
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  return (
    <section className="py-24 sm:py-28">
      <Container>
        <SectionHeading title="Popular Cities" subtitle="High-growth urban markets with premium projects, proven developers, and strong long-term demand" />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {popularLocations.map((location, index) => (
            <motion.div key={location.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: index * 0.08, duration: 0.4 }}>
              <Link href={`/locations/${location.slug}`} className="block h-full">
                <Card className="group h-full">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{location.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{location.count} projects</p>
                      </div>
                      <Button variant="ghost" size="sm">Explore</Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
