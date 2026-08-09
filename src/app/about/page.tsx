import type { Metadata } from "next";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import ContactCTA from "@/components/home/contact-cta";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us | YouWe Homes",
  description: "Learn more about YouWe Homes and our mission to simplify real estate discovery.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">About Us</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Real estate discovery, simplified.
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              YouWe Homes is dedicated to helping buyers and investors find the right property with trusted developers, curated listings, and expert support.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="rounded-3xl border border-border/70 bg-card/80 p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-foreground">Our Mission</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                At YouWe Homes, our mission is to make property search transparent, efficient, and tailored to your needs. We bring together premium residential and commercial listings, developer insights, and localized expertise so you can make confident decisions.
              </p>
            </div>

            <div className="rounded-3xl border border-border/70 bg-card/80 p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-foreground">What We Offer</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                We offer curated project listings, developer profiles, local market insights, and support for property enquiries. Our platform helps users compare options, discover trusted builders, and explore the right home or investment opportunity.
              </p>
            </div>

            <div className="rounded-3xl border border-border/70 bg-card/80 p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-foreground">Customer Focus</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                We prioritise customer trust and responsiveness. Whether you are exploring new launches, ready-to-move homes, or commercial spaces, our team is committed to offering practical guidance and timely support.
              </p>
            </div>

            <div className="rounded-3xl border border-border/70 bg-card/80 p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-foreground">Contact Information</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
                <p>{SITE_CONFIG.address}</p>
                <p>
                  Email: <a href={`mailto:${SITE_CONFIG.email}`} className="text-primary hover:underline">{SITE_CONFIG.email}</a>
                </p>
                <p>
                  Phone: <a href={`tel:${SITE_CONFIG.phone}`} className="text-primary hover:underline">{SITE_CONFIG.phone}</a>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
