"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Building2, Star } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import developersData from "@/data/developers.json";
import type { Developer } from "@/types/developer";

const developers = developersData as Developer[];
const featuredDevelopers = developers.slice(0, 4);

export default function TopDevelopers() {
  return (
    <section className="bg-muted/50 py-16 sm:py-20">
      <Container>
        <SectionHeading title="Top Developers" subtitle="Trusted builders with strong delivery records, premium craftsmanship, and transparent customer experience" />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featuredDevelopers.map((developer, index) => (
            <motion.div key={developer.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: index * 0.08, duration: 0.4 }}>
              <Link href={`/developers/${developer.slug}`} className="block h-full">
                <Card className="group h-full overflow-hidden border-border/70 bg-background/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
                      <Building2 className="h-8 w-8" />
                    </div>

                    <h3 className="text-base font-semibold text-card-foreground transition-colors group-hover:text-primary">{developer.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{developer.tagline}</p>

                    <div className="mt-4 flex items-center justify-center gap-1 text-sm text-foreground">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{developer.ratings}</span>
                      <span className="text-muted-foreground">({developer.totalReviews} reviews)</span>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-muted/70 p-3 text-sm">
                      <div>
                        <p className="font-semibold text-foreground">{developer.completedProjects}</p>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Completed</p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{developer.ongoingProjects}</p>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Ongoing</p>
                      </div>
                    </div>

                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                      View Profile
                      <ArrowRight className="h-4 w-4" />
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

