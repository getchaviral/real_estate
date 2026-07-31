"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Building2, Users, MapPin, Award } from "lucide-react";
import Container from "@/components/shared/container";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function Counter({ end, suffix = "", duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { icon: Building2, value: 10000, suffix: "+", label: "Properties Listed" },
  { icon: Users, value: 500, suffix: "+", label: "Trusted Developers" },
  { icon: MapPin, value: 50, suffix: "+", label: "Cities Covered" },
  { icon: Award, value: 25000, suffix: "+", label: "Happy Clients" },
];

export default function StatsCounter() {
  return (
    <section className="relative -mt-16 z-10 pb-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-4 rounded-2xl bg-card p-6 shadow-card sm:grid-cols-4 sm:gap-8 sm:p-10"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-card-foreground sm:text-3xl">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

