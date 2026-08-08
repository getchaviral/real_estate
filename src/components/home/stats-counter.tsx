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
    <section className="relative z-10 -mt-2 pb-6 sm:pb-10">
      <Container>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="grid gap-4 rounded-[32px] border border-border/70 bg-card/95 p-4 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.24)] sm:grid-cols-2 xl:grid-cols-4 xl:p-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-[22px] border border-border/80 bg-muted/70 px-5 py-4 text-center transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:bg-card hover:shadow-sm">
                <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-sm font-medium text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

