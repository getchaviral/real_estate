"use client";

import { motion } from "framer-motion";
import { TrendingUp, ArrowRight } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const insights = [
  {
    title: "Rental yields remain strong",
    description: "Premium neighborhoods continue to outperform due to sustained demand and infrastructure upgrades.",
    stat: "+11.4%",
  },
  {
    title: "New launches command premium pricing",
    description: "Buyers are favoring branded developments that offer superior amenities and faster delivery.",
    stat: "3.8x demand",
  },
  {
    title: "Commercial corridors are heating up",
    description: "Retail and mixed-use projects near transit nodes are attracting institutional interest.",
    stat: "18% growth",
  },
];

export default function MarketInsights() {
  return (
    <section className="bg-muted/40 py-16 sm:py-20">
      <Container>
        <SectionHeading
          title="Market Insights"
          subtitle="Data-backed guidance to help you time your investment with confidence"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {insights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
            >
              <Card className="h-full border-border/70 bg-background/80">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-primary">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-semibold">Insight</span>
                  </div>
                  <p className="mt-4 text-3xl font-semibold text-foreground">{item.stat}</p>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" className="gap-2">
            Explore market reports
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
