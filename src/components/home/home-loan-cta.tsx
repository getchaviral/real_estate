"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgePercent, Banknote, Calculator, Phone, ShieldCheck, Sparkles } from "lucide-react";
import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const banks = ["HDFC", "ICICI", "Axis", "SBI", "Kotak"];

export default function HomeLoanCTA() {
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.45 }}>
          <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background">
            <CardContent className="grid gap-8 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8 lg:p-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  <BadgePercent className="h-4 w-4" />
                  Finance support
                </div>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Secure a smarter home loan with expert guidance.</h2>
                <p className="mt-3 max-w-2xl text-lg leading-8 text-muted-foreground">Compare rates, understand eligibility, and move faster with financing specialists who simplify every step.</p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Button className="gap-2">
                    <Calculator className="h-4 w-4" />
                    EMI Calculator
                  </Button>
                  <Button variant="outline" className="gap-2">
                    Check Eligibility
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-5 rounded-2xl border border-border/70 bg-background/70 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Partner Banks
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {banks.map((bank) => (
                      <span key={bank} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground">{bank}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-border/80 bg-card/80 p-6 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Banknote className="h-4 w-4 text-primary" />
                  Why buyers choose us
                </div>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />Fast pre-approval with transparent documentation</li>
                  <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />Loan options from leading banks and NBFCs</li>
                  <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />Instant callback from our finance team</li>
                </ul>

                <Button className="mt-5 w-full gap-2">
                  <Phone className="h-4 w-4" />
                  Request a callback
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
}
