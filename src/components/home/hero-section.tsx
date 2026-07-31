"use client";

import { motion } from "framer-motion";
import { Search, MapPin, Building, Users, Home } from "lucide-react";
import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const StatCard = ({
  icon: Icon,
  value,
  label,
  delay,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="text-center p-4 rounded-lg transition-colors hover:bg-white/10"
  >
    <Icon className="mx-auto h-8 w-8 mb-2 text-accent" />
    <div className="text-3xl font-bold text-hero-foreground sm:text-4xl">
      {value}
    </div>
    <div className="mt-1 text-sm text-hero-muted">{label}</div>
  </motion.div>
);

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-hero-background">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-hero-background via-hero-background/80 to-transparent" />

      <Container className="relative flex flex-col items-center justify-center py-20 md:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-4 text-base font-medium tracking-wider text-hero-accent uppercase"
          >
            India's Most Trusted Real Estate Platform
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl font-extrabold leading-tight tracking-tighter text-hero-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Find Your{" "}
            <span className="hero-gradient-text">
              Dream Home
            </span>{" "}
            Today
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-hero-muted"
          >
            Explore thousands of residential and commercial properties across
            India's top cities. Your perfect home is just a search away.
          </motion.p>

          {/* Search Bar */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mx-auto mt-10 max-w-2xl w-full"
          >
            <div className="flex flex-col sm:flex-row gap-3 hero-search-wrapper p-2 rounded-xl backdrop-blur-sm">
              <div className="relative flex-1">
                <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-hero-muted" />
                <Input
                  placeholder="Search by City, Project, or Developer..."
                  className="w-full h-14 pl-12 pr-4 text-lg bg-transparent border-none hero-search-input placeholder-hero-search-placeholder focus-visible:ring-1 focus-visible:ring-white/30 focus-visible:ring-offset-0"
                />
              </div>
              <Button size="lg" className="h-14 gap-2 rounded-lg text-base font-semibold px-8">
                <Search className="h-5 w-5" />
                Search
              </Button>
            </div>
          </motion.form>
        </motion.div>
      </Container>
    </section>
  );
}

