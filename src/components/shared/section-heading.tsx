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
  const headingContent = children ?? title;

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
      {headingContent ? (
        <h2 className="text-3xl font-semibold tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl">
          {headingContent}
        </h2>
      ) : null}
      {subtitle && (
        <p className="mt-4 text-lg leading-8 text-muted-foreground sm:text-xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

