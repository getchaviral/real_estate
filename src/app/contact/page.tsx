import Link from "next/link";
import { Clock3, Mail, MapPin, Phone, ArrowRight, Building2 } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ContactCTA from "@/components/home/contact-cta";
import { SITE_CONFIG } from "@/lib/constants";

const contactFaqs = [
  {
    question: "How quickly can I expect a response?",
    answer: "Our team typically responds within 24 hours during business days.",
  },
  {
    question: "Can I schedule a property visit?",
    answer: "Yes. We can arrange site visits, video walkthroughs, and consultations with our advisors.",
  },
  {
    question: "Do you help with financing and documentation?",
    answer: "Absolutely. We provide support for pricing, paperwork, and loan guidance for qualified buyers.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-20 sm:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Contact Us</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Let&apos;s help you find the right property.
              </h1>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                Speak with our real estate advisors for premium listings, investment guidance, and personalized property tours.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="tel:+9118001234567" className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-primary px-2.5 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/80">
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
                <a href="mailto:hello@realestate.com" className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-border bg-background px-2.5 py-2 text-sm font-medium text-foreground transition hover:bg-muted">
                  <Mail className="h-4 w-4" />
                  Email Us
                </a>
              </div>
            </div>

            <Card className="border-border/70 bg-card/80 shadow-card">
              <CardContent className="p-6 sm:p-8">
                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">Name</label>
                      <Input placeholder="Your name" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">Email</label>
                      <Input type="email" placeholder="you@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">Phone</label>
                    <Input type="tel" placeholder="+91 98765 43210" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">Message</label>
                    <textarea
                      rows={5}
                      placeholder="Tell us about your property goals..."
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2">
                    Send Inquiry
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Card className="border-border/70 bg-card/80">
              <CardContent className="space-y-5 p-6 sm:p-8">
                <SectionHeading title="Visit Our Office" subtitle="Meet our team and explore your next investment opportunity." align="left" />
                <div className="space-y-4 text-sm text-muted-foreground">
                  <div className="flex gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>{SITE_CONFIG.address}</span>
                  </div>
                  <div className="flex gap-3">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-foreground">
                      {SITE_CONFIG.phone}
                    </a>
                  </div>
                  <div className="flex gap-3">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-foreground">
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>

                <div className="rounded-xl border border-border/70 bg-muted/40 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Clock3 className="h-4 w-4 text-primary" />
                    Business Hours
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li>Monday - Friday: 9:00 AM - 7:00 PM</li>
                    <li>Saturday: 10:00 AM - 5:00 PM</li>
                    <li>Sunday: By Appointment</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-card/80">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  <Building2 className="h-4 w-4" />
                  Office Location
                </div>
                <div className="mt-4 flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-border bg-muted/40 p-6 text-center text-muted-foreground">
                  <div>
                    <p className="text-base font-medium text-foreground">Google Maps Placeholder</p>
                    <p className="mt-2">Interactive map view will appear here once a Google Maps embed is configured.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading title="Frequently Asked Questions" subtitle="Everything you need to know before reaching out to us." />
          <div className="mx-auto mt-10 max-w-3xl space-y-4">
            {contactFaqs.map((faq) => (
              <Card key={faq.question} className="border-border/70 bg-card/80">
                <CardContent className="p-5">
                  <h3 className="text-base font-semibold text-foreground">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
