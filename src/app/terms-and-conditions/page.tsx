import type { Metadata } from "next";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import ContactCTA from "@/components/home/contact-cta";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions | YouWe Homes",
  description:
    "Review the terms and conditions that govern your use of the YouWe Homes website and services.",
};

const sections = [
  {
    title: "Use of Website",
    body: "You may use YouWe Homes to browse property information, explore developers and locations, search properties, and submit enquiries for legitimate personal or business purposes.",
  },
  {
    title: "Property Information",
    body: "Property information including prices, availability, specifications, project status, images, amenities, and other details may be provided by developers, property owners, or other sources. Information may change without notice. Users should independently verify important property information before making any decision.",
  },
  {
    title: "No Guarantee of Availability",
    body: "Listing a property on YouWe Homes does not guarantee that the property remains available, that the displayed price is current, or that a transaction will be completed.",
  },
  {
    title: "Property Enquiries",
    body: "When you submit an enquiry, you agree that YouWe Homes and relevant property representatives may contact you regarding the enquiry and related services.",
  },
  {
    title: "User Responsibilities",
    body: "You agree to provide accurate information, use the website lawfully, avoid submitting false or misleading information, and not attempt to interfere with or misuse the website.",
  },
  {
    title: "Intellectual Property",
    body: "Website content, branding, design, graphics, text, logos, and software belonging to YouWe Homes may not be copied, reproduced, modified, or distributed without appropriate permission.",
  },
  {
    title: "Third-Party Content",
    body: "Some information, links, services, or property listings may originate from third parties. YouWe Homes is not responsible for the independent actions, policies, representations, or services of third parties.",
  },
  {
    title: "Limitation of Liability",
    body: "YouWe Homes makes reasonable efforts to maintain accurate information but does not guarantee that all website information will always be complete, accurate, current, or error-free. Users should conduct their own verification before entering into a property transaction.",
  },
  {
    title: "Website Availability",
    body: "We may modify, suspend, or discontinue parts of the website or its services when necessary for maintenance, improvements, security, or other operational reasons.",
  },
  {
    title: "Privacy",
    body: "Your use of the website is also subject to our Privacy Policy, which explains how we collect and use personal information.",
  },
  {
    title: "Changes to Terms",
    body: "We may update these Terms & Conditions from time to time. Updated terms will be published on this page.",
  },
  {
    title: "Governing Law",
    body: "These terms shall be interpreted in accordance with applicable laws of India, subject to the jurisdiction of the appropriate courts.",
  },
  {
    title: "Contact Us",
    body: `For questions about these terms:\n\nYouWe Homes Realtech\n${SITE_CONFIG.address}\nEmail: ${SITE_CONFIG.email}\nPhone: ${SITE_CONFIG.phone}`,
  },
];

export default function TermsAndConditionsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Terms & Conditions</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Website terms for YouWe Homes.
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Last Updated: August 2026
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-4xl space-y-5">
            {sections.map((section) => (
              <Card key={section.title} className="border-border/70 bg-card/80">
                <CardContent className="p-6 sm:p-8">
                  <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                  {section.body.split("\n\n").map((paragraph, index) => (
                    <p className="mt-3 text-sm leading-7 text-muted-foreground" key={index}>
                      {paragraph}
                    </p>
                  ))}
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
