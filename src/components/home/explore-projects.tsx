"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Home,
  Landmark,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const categories = [
  {
    title: "New Launch",
    subtitle: "Early access to premium upcoming developments",
    metric: "12 new projects",
    details: "Ideal for investors seeking first-mover pricing and high appreciation potential.",
    icon: Sparkles,
    accent: "from-primary/20 via-primary/10 to-background",
    badge: "Trending",
  },
  {
    title: "Ready to Move",
    subtitle: "Move in immediately with complete amenities",
    metric: "35 handpicked homes",
    details: "Perfect for buyers who want possession without waiting and immediate occupancy.",
    icon: Home,
    accent: "from-emerald-500/15 via-emerald-400/10 to-background",
    badge: "Instant",
  },
  {
    title: "Under Construction",
    subtitle: "Flexible pricing with strong value growth",
    metric: "18 projects live",
    details: "Great for buyers who want modern layouts and cost advantages before completion.",
    icon: Building2,
    accent: "from-amber-500/15 via-amber-400/10 to-background",
    badge: "Value",
  },
  {
    title: "Luxury",
    subtitle: "Signature homes with elite amenities",
    metric: "8 premium addresses",
    details: "Designed for clients who expect concierge service, sky lounges, and expansive layouts.",
    icon: Landmark,
    accent: "from-violet-500/15 via-violet-400/10 to-background",
    badge: "Exclusive",
  },
  {
    title: "Affordable",
    subtitle: "Smart homes that fit your budget",
    metric: "24 budget options",
    details: "Explore practical homes with high connectivity, excellent ROI, and compact living.",
    icon: ShieldCheck,
    accent: "from-sky-500/15 via-sky-400/10 to-background",
    badge: "Smart",
  },
  {
    title: "Commercial",
    subtitle: "Office and retail spaces for growth",
    metric: "11 investment-ready units",
    details: "Suitable for businesses seeking strategic locations, strong footfall, and modern infrastructure.",
    icon: BriefcaseBusiness,
    accent: "from-orange-500/15 via-orange-400/10 to-background",
    badge: "Business",
  },
];

export default function ExploreProjects() {
  return (
    <section className="bg-muted/40 py-16 sm:py-20">
      <Container>
        <SectionHeading
          title="Explore by Buying Goal"
          subtitle="Compelling property options for every stage of your real estate journey"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
            >
              <Card className="group h-full overflow-hidden border-border/70 bg-background/80">
                <div className={`bg-gradient-to-br ${category.accent} p-6`}>
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-background/80 text-primary shadow-sm">
                      <category.icon className="h-5 w-5" />
                    </div>
                    <Badge variant="primary" size="sm">
                      {category.badge}
                    </Badge>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-xl font-semibold text-foreground">
                      {category.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {category.subtitle}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between rounded-xl bg-background/70 px-3 py-2 text-sm">
                    <span className="text-muted-foreground">{category.metric}</span>
                    <span className="font-semibold text-foreground">Live now</span>
                  </div>
                </div>

                <CardContent className="p-6">
                  <p className="text-sm leading-6 text-muted-foreground">
                    {category.details}
                  </p>
                  <Button variant="ghost" size="sm" className="mt-5 gap-1 text-primary">
                    Explore {category.title}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
