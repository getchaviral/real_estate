"use client";

import { motion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";

interface MotionWrapperProps extends MotionProps {
  children: ReactNode;
  className?: string;
}

export default function MotionWrapper({ children, className, ...props }: MotionWrapperProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      {...props}
    >
      {children}
    </motion.div>
  );
}