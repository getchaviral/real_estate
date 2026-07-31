"use client";

import { motion } from "framer-motion";
import { Check, Search, Handshake, Home } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const journeySteps = [
  {
    icon: Search,
    title: "Discover & Explore",
    description: "Browse thousands of properties and filter by your preferences.",
  },
  {
    icon: Handshake,
    title: "Expert Consultation",
    description: "Connect with our real estate experts for personalized advice.",
  },
  {
    icon: Home,
    title: "Site Visits & Booking",
    description: "Schedule site visits and book your dream home with ease.",
  },
  {
    icon: Check,
    title: "Seamless Handover",
    description: "Experience a smooth and transparent handover process.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          title="Your Home Buying Journey, Simplified"
          subtitle="We guide you at every step, from finding your dream home to getting the keys."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {journeySteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <Card className="h-full text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <step.icon className="h-6 w-6" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg font-semibold">{step.title}</CardTitle>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
