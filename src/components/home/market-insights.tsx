"use client";

import { motion } from "framer-motion";
import { ArrowRight, BarChart3, TrendingUp } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const insights = [
  { title: "Price Trends", value: "+11.4%", descriptor: "Annual appreciation in premium corridors", badge: "Rising" },
  { title: "Investment Score", value: "9.2/10", descriptor: "Strong fundamentals across growth hubs", badge: "High Conviction" },
  { title: "Rental Yield", value: "4.8%", descriptor: "Competitive yields for long-term wealth creation", badge: "Stable" },
  { title: "Growth Potential", value: "+18%", descriptor: "Projected demand surge in the next 24 months", badge: "Momentum" },
];

export default function MarketInsights() {
  return (
    <section className="bg-muted/40 py-16 sm:py-20">
      <Container>
        <SectionHeading subtitle="Data-backed guidance to help you invest with confidence in premium addresses and emerging micro-markets" />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {insights.map((item, index) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: index * 0.08, duration: 0.4 }}>
              <Card className="h-full border-border/70 bg-background/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="inline-flex items-center gap-2 text-primary"><BarChart3 className="h-4 w-4" />{item.title}</span>
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{item.badge}</span>
                  </div>
                  <p className="mt-4 text-3xl font-semibold text-foreground">{item.value}</p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.descriptor}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Button variant="outline" className="gap-2">Explore market reports <ArrowRight className="h-4 w-4" /></Button>
        </div>
      </Container>
    </section>
  );
}
