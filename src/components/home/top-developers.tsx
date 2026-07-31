"use client";

import { motion } from "framer-motion";
import { Star, Building2, Award, ArrowRight } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import developersData from "@/data/developers.json";
import type { Developer } from "@/types/developer";

const developers = developersData as Developer[];

export default function TopDevelopers() {
  return (
    <section className="bg-muted/50 py-16 sm:py-20">
      <Container>
        <SectionHeading
          title="Top Developers"
          subtitle="India's most trusted real estate developers with proven track records"
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {developers.map((developer, index) => (
            <motion.div
              key={developer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="group h-full text-center">
                <CardContent className="p-6">
                  {/* Logo Placeholder */}
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5">
                    <Building2 className="h-8 w-8 text-primary/40" />
                  </div>

                  <h3 className="text-base font-semibold text-card-foreground group-hover:text-primary transition-colors">
                    {developer.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                    {developer.tagline}
                  </p>

                  {/* Rating */}
                  <div className="mt-3 flex items-center justify-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-card-foreground">
                      {developer.ratings}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({developer.totalReviews} reviews)
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4">
                    <div className="text-center">
                      <div className="text-sm font-bold text-card-foreground">
                        {developer.totalProjects}
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        Projects
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-card-foreground">
                        {developer.completedProjects}
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        Completed
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-card-foreground">
                        {developer.ongoingProjects}
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        Ongoing
                      </div>
                    </div>
                  </div>

                  {/* Awards */}
                  {developer.awards.length > 0 && (
                    <div className="mt-3 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                      <Award className="h-3 w-3 text-accent" />
                      <span>{developer.awards[0].title}</span>
                    </div>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 w-full gap-1"
                  >
                    View Profile
                    <ArrowRight className="h-3 w-3" />
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

