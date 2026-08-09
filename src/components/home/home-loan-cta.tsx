"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, BadgePercent, Banknote, Calculator, Phone, ShieldCheck } from "lucide-react";
import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import image0 from "@/lib/image0.png";

export default function HomeLoanCTA() {
  return (
    <section className="py-8 sm:py-10">
      <Container>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.45 }}>
          <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background">
            <CardContent className="grid gap-8 p-6 md:grid-cols-[0.9fr_1.1fr] md:p-8 lg:p-10">
              <div className="order-1 md:order-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase text-primary">
                  <BadgePercent className="h-4 w-4" />
                  Finance support
                </div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Fast home loan help in one place.</h2>
                <p className="mt-2 max-w-xl text-base leading-7 text-muted-foreground">Quick approval support, lender choice, and callback scheduling without extra steps.</p>

                <div className="mt-5 max-w-lg rounded-2xl border border-border/70 bg-background/70 p-3 sm:p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Banknote className="h-4 w-4 text-primary" />
                    Why it works
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />Quick pre-approval support</li>
                    <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />Top lender options</li>
                    <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />Fast callback booking</li>
                  </ul>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr] sm:max-w-md">
                  <Button className="gap-2 rounded-xl py-2 text-sm">
                    <Calculator className="h-4 w-4" />
                    EMI Calculator
                  </Button>
                  <Button variant="outline" className="gap-2 rounded-xl py-2 text-sm">
                    Check Eligibility
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>

                <Button variant="outline" className="mt-4 w-auto rounded-xl gap-2 px-4 py-2 text-sm">
                  <Phone className="h-4 w-4" />
                  Request a callback
                </Button>
              </div>

              <div className="order-2 md:order-1">
                <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/80 p-4 shadow-sm md:p-6">
                  <div className="relative min-h-[320px] overflow-hidden rounded-[1.75rem] bg-slate-100">
                    <Image
                      src={image0}
                      alt="Finance support"
                      fill
                      sizes="(max-width: 768px) 100vw, 35vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
}
