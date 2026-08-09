import type { Metadata } from "next";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import ContactCTA from "@/components/home/contact-cta";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | YouWe Homes",
  description:
    "Read the YouWe Homes privacy policy to understand how we collect, use, and protect your personal information.",
};

const sections = [
  {
    title: "Information We Collect",
    body: "We may collect your name, email address, phone number, location, property preferences, enquiry details, and any information you provide when contacting us or requesting details about a property. We may also collect technical information such as IP address, browser type, device data, cookies, and website usage information.",
  },
  {
    title: "How We Use Your Information",
    body: "We use your information to respond to property enquiries, provide relevant property recommendations, arrange site visits, connect you with developers or service providers, improve our website and services, communicate updates, and maintain website security.",
  },
  {
    title: "Property Enquiries",
    body: "When you submit an enquiry, your information may be shared with the relevant developer, property representative, or service provider when necessary to respond to your request.",
  },
  {
    title: "Cookies",
    body: "We may use cookies and similar technologies to remember preferences, understand website usage, improve functionality, and analyse traffic. You can manage cookies through your browser settings.",
  },
  {
    title: "Marketing Communications",
    body: "We may contact you regarding properties, services, offers, or updates when permitted. You may request to stop marketing communications at any time.",
  },
  {
    title: "Third-Party Services",
    body: "Our website may contain links or integrations provided by third parties. Their privacy practices are governed by their own policies.",
  },
  {
    title: "Data Security",
    body: "We take reasonable technical and organisational measures to protect personal information. However, no online system can guarantee complete security.",
  },
  {
    title: "Data Retention",
    body: "We retain personal information only for as long as reasonably necessary to provide services, respond to enquiries, maintain records, comply with legal requirements, or resolve disputes.",
  },
  {
    title: "Your Rights",
    body: "Subject to applicable law, users may request access to, correction of, deletion of, or withdrawal of consent for their personal information, where applicable.",
  },
  {
    title: "Children's Privacy",
    body: "Our services are not intentionally directed toward children. We do not knowingly collect personal information from children.",
  },
  {
    title: "Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. Changes will be published on this page with an updated date.",
  },
  {
    title: "Contact Us",
    body: `For privacy-related questions or requests:\n\nYouWe Homes Realtech\n${SITE_CONFIG.address}\nEmail: ${SITE_CONFIG.email}\nPhone: ${SITE_CONFIG.phone}`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Privacy Policy</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Your privacy is important to us.
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
