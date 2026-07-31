"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import Container from "@/components/shared/container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
        >
          <Card className="overflow-hidden border-border/70 bg-card/80">
            <CardContent className="grid gap-6 p-8 md:grid-cols-[1.1fr_0.9fr] md:p-10 lg:p-12">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Stay informed</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Get curated property alerts and market updates.
                </h2>
                <p className="mt-4 max-w-xl text-lg leading-8 text-muted-foreground">
                  Subscribe to receive launch notifications, price trends, and neighborhood recommendations curated for your goals.
                </p>
              </div>

              <div className="rounded-2xl border border-border/80 bg-background/80 p-5 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  Join 12k+ buyers
                </div>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <Input placeholder="Enter your email" className="h-11" />
                  <Button className="h-11 gap-2">
                    Subscribe
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  No spam, only useful real estate insights.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
}
