"use client";

import { motion } from "framer-motion";
import { Building2, Users, ArrowRight } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import locationsData from "@/data/locations.json";
import type { Location } from "@/types/location";

const locations = locationsData as Location[];
const popularLocations = locations.filter((l) => l.isPopular);

export default function PopularCities() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          title="Popular Cities"
          subtitle="Explore properties in India's most sought-after cities"
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularLocations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="group relative h-64 overflow-hidden sm:h-72" hover={false}>
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-primary/5" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white">{location.name}</h3>
                  <p className="mt-1 text-sm text-white/70">{location.state}</p>

                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-sm text-white/70">
                      <Building2 className="h-4 w-4" />
                      <span>{location.totalProjects} Projects</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-white/70">
                      <Users className="h-4 w-4" />
                      <span>{location.totalDevelopers} Developers</span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-4 w-fit gap-1 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                  >
                    Explore City
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <Button variant="outline" size="lg" className="gap-2">
            View All Cities
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
