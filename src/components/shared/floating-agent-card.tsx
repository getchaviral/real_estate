"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import image0 from "@/lib/image0.png";

const TOP_OF_PAGE_THRESHOLD = 150;
const MOBILE_QUERY = "(max-width: 640px)";

export default function FloatingAgentCard() {
  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);
    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);
    return () => mediaQuery.removeEventListener("change", updateIsMobile);
  }, []);

  useEffect(() => {
    const financeSection = document.getElementById("finance-support");
    let financeInView = false;

    const evaluate = () => {
      const atTopOfPage = window.scrollY <= TOP_OF_PAGE_THRESHOLD;
      setCollapsed(atTopOfPage || financeInView);
    };

    window.addEventListener("scroll", evaluate, { passive: true });

    let observer: IntersectionObserver | undefined;
    if (financeSection) {
      observer = new IntersectionObserver(
        ([entry]) => {
          financeInView = entry.isIntersecting;
          evaluate();
        },
        { threshold: 0.2 }
      );
      observer.observe(financeSection);
    }

    evaluate();

    return () => {
      window.removeEventListener("scroll", evaluate);
      observer?.disconnect();
    };
  }, [pathname]);

  const expanded = !collapsed;
  const collapsedSize = isMobile ? 44 : 56;
  const expandedSize = isMobile ? { width: 152, height: 92 } : { width: 208, height: 128 };

  return (
    <Link
      href="/contact"
      aria-label="Talk to our real estate advisor"
      className="fixed bottom-20 right-4 z-40 block sm:bottom-24 sm:right-6"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="relative overflow-hidden border border-border bg-card shadow-xl"
        style={{
          width: expanded ? expandedSize.width : collapsedSize,
          height: expanded ? expandedSize.height : collapsedSize,
          borderRadius: expanded ? 18 : collapsedSize / 2,
        }}
      >
        <Image
          src={image0}
          alt="Talk to our real estate advisor"
          fill
          sizes="220px"
          className="object-cover"
          style={{ objectPosition: "78% 22%" }}
        />
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1.5 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-2.5 py-2 sm:gap-2 sm:px-3 sm:py-2.5"
            >
              <span className="text-[11px] font-semibold leading-tight text-white sm:text-xs">Talk to our expert</span>
              <ArrowRight className="h-3 w-3 shrink-0 text-white sm:h-3.5 sm:w-3.5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
}
