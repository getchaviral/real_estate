"use client";

import { motion } from "framer-motion";
import { ArrowRight, BellRing, Mail } from "lucide-react";
import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.45 }}>
          <Card className="overflow-hidden border-border/70 bg-card/80">
            <CardContent className="grid gap-6 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8 lg:p-10">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Stay informed</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Get first access to curated launches, price drops, and smart investment alerts.</h2>
                <p className="mt-3 max-w-xl text-lg leading-8 text-muted-foreground">Receive handpicked opportunities, market updates, and neighborhood insights tailored to your buying goals.</p>
              </div>

              <div className="rounded-3xl border border-border/80 bg-background/80 p-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <BellRing className="h-4 w-4 text-primary" />
                  Join 12k+ buyers and investors
                </div>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <Input placeholder="Enter your email" className="h-11" />
                  <Button className="h-11 gap-2">Subscribe <ArrowRight className="h-4 w-4" /></Button>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  No spam. Only useful updates.
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
}
