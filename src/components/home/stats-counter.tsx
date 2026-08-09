"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Building2, MapPin, Users } from "lucide-react";
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

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { icon: Building2, value: 10000, suffix: "+", label: "Properties Listed" },
  { icon: Users, value: 500, suffix: "+", label: "Trusted Developers" },
  { icon: MapPin, value: 50, suffix: "+", label: "Cities Covered" },
  { icon: Award, value: 25000, suffix: "+", label: "Happy Clients" },
];

export default function StatsCounter() {
  return (
    <section className="border-y border-border">
      <Container>
        <div className="grid grid-cols-2 gap-px border-x border-border bg-border md:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background p-6 text-center"
              >
                <Icon className="mx-auto h-8 w-8 text-primary" />
                <div className="mt-3 text-3xl font-bold tracking-tighter text-foreground sm:text-4xl">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
