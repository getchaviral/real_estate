"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import type { FAQ } from "@/types/faq";

interface DeveloperFAQSectionProps {
  faqs: FAQ[];
}

function FAQItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border/70 last:border-0">
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-4 py-5 text-left">
        <span className="text-base font-medium text-foreground">{faq.question}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen ? (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pb-5 text-sm leading-7 text-muted-foreground">{faq.answer}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function DeveloperFAQSection({ faqs }: DeveloperFAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section id="faqs" className="py-16 sm:py-20">
      <Container>
        <SectionHeading title="FAQs" subtitle="Common questions about this developer and their projects" align="left" />
        <div className="mt-10 mx-auto max-w-3xl rounded-2xl border border-border/70 bg-card/80 p-6 shadow-card sm:p-8">
          {faqs.map((faq) => (
            <FAQItem key={faq.id} faq={faq} isOpen={openId === faq.id} onToggle={() => setOpenId(openId === faq.id ? null : faq.id)} />
          ))}
        </div>
      </Container>
    </section>
  );
}
