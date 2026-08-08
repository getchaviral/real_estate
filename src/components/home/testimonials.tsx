"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import testimonialsData from "@/data/testimonials.json";
import type { Testimonial } from "@/types/testimonial";

const testimonials = testimonialsData as Testimonial[];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const featured = testimonials.filter((testimonial) => testimonial.isFeatured);

  const next = () => setCurrent((prev) => (prev + 1) % featured.length);
  const prev = () => setCurrent((prev) => (prev - 1 + featured.length) % featured.length);

  if (featured.length === 0) return null;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading title="Client Stories" subtitle="Trusted by first-time buyers, families, and investors across India" />

        <div className="relative mt-10">
          <div className="mx-auto max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <Card className="overflow-hidden border-border/70 bg-background/80">
                  <CardContent className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[0.7fr_1.3fr] lg:p-12">
                    <div className="flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-primary/15 via-primary/5 to-background p-6 text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background/80 shadow-sm">
                        <Quote className="h-7 w-7 text-primary" />
                      </div>
                      <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Buyer review</p>
                      <div className="mt-4 flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star key={index} className={`h-4 w-4 ${index < featured[current].rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`} />
                        ))}
                      </div>
                      <p className="mt-4 text-sm font-medium text-foreground">{featured[current].name}</p>
                      <p className="text-sm text-muted-foreground">{featured[current].location}</p>
                    </div>

                    <div>
                      <p className="text-lg leading-8 text-foreground sm:text-xl">“{featured[current].content}”</p>
                      <div className="mt-6 rounded-2xl border border-border/70 bg-muted/70 p-4 text-sm text-muted-foreground">
                        <p className="font-semibold text-foreground">Project Purchased</p>
                        <p className="mt-1">{featured[current].projectId}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex items-center justify-center gap-4">
              <Button variant="outline" size="sm" onClick={prev} className="h-10 w-10 rounded-full p-0"><ChevronLeft className="h-5 w-5" /></Button>
              <div className="flex gap-2">
                {featured.map((_, index) => (
                  <button key={index} onClick={() => setCurrent(index)} className={`h-2 w-2 rounded-full transition-all ${index === current ? "w-6 bg-primary" : "bg-muted-foreground/30"}`} />
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={next} className="h-10 w-10 rounded-full p-0"><ChevronRight className="h-5 w-5" /></Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

