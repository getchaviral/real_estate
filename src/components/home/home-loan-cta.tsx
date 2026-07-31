"use client";

import { motion } from "framer-motion";
import { Calculator, ArrowRight, BadgePercent } from "lucide-react";
import Container from "@/components/shared/container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomeLoanCTA() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
        >
          <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background">
            <CardContent className="grid gap-8 p-8 md:grid-cols-[1.2fr_0.8fr] md:p-10 lg:p-12">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  <BadgePercent className="h-4 w-4" />
                  Finance support
                </div>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Secure a smart home loan with expert guidance.
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
                  Compare interest rates, understand eligibility, and move closer to your next property with our financing specialists.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button className="gap-2">
                    <Calculator className="h-4 w-4" />
                    Calculate EMI
                  </Button>
                  <Button variant="outline" className="gap-2">
                    Talk to advisor
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground">Why buyers choose us</h3>
                <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                  <li>• Fast pre-approval with transparent documentation</li>
                  <li>• Loan options from leading banks and NBFCs</li>
                  <li>• Guidance for salaried, self-employed, and NRI buyers</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
}
