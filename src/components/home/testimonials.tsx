"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import testimonialsData from "@/data/testimonials.json";
import type { Testimonial } from "@/types/testimonial";

const testimonials = testimonialsData as Testimonial[];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const featured = testimonials.filter((t) => t.isFeatured);

  const next = () => setCurrent((prev) => (prev + 1) % featured.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + featured.length) % featured.length);

  if (featured.length === 0) return null;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Hear from our happy home buyers across India"
        />

        <div className="relative mt-10">
          <div className="mx-auto max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="text-center">
                  <CardContent className="p-8 sm:p-12">
                    <Quote className="mx-auto h-8 w-8 text-primary/30" />

                    <p className="mt-6 text-lg leading-relaxed text-card-foreground sm:text-xl">
                      &ldquo;{featured[current].content}&rdquo;
                    </p>

                    <div className="mt-6 flex items-center justify-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < featured[current].rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="mt-6">
                      <div className="mx-auto h-12 w-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10" />
                      <p className="mt-3 font-semibold text-card-foreground">
                        {featured[current].name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {featured[current].location}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={prev}
                className="h-10 w-10 rounded-full p-0"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <div className="flex gap-2">
                {featured.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 w-2 rounded-full transition-all ${
                      i === current
                        ? "w-6 bg-primary"
                        : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={next}
                className="h-10 w-10 rounded-full p-0"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

