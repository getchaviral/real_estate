"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  children?: React.ReactNode;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  className = "",
  children,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`max-w-2xl ${
        align === "center" ? "mx-auto text-center" : "text-left"
      } ${className}`}
    >
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {children ?? title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

