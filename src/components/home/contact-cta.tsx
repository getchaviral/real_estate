"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MessageSquare, ArrowRight } from "lucide-react";
import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";

export default function ContactCTA() {
  return (
    <section className="cta-gradient py-16 sm:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl">
            Ready to Find Your Dream Home?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
            Our expert team is here to help you every step of the way. Get in
            touch with us today.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="gap-2 bg-white text-primary hover:bg-white/90"
            >
              <Phone className="h-5 w-5" />
              {SITE_CONFIG.phone}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Mail className="h-5 w-5" />
              {SITE_CONFIG.email}
            </Button>
            <Button
              size="lg"
              className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <MessageSquare className="h-5 w-5" />
              WhatsApp Chat
            </Button>
          </div>

          <div className="mt-8">
            <Button
              variant="ghost"
              size="lg"
              className="gap-2 text-primary-foreground/80 hover:text-primary-foreground"
            >
              Schedule a Consultation
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

