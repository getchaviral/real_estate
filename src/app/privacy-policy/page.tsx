import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import ContactCTA from "@/components/home/contact-cta";
import { SITE_CONFIG } from "@/lib/constants";

const sections = [
  {
    title: "Information We Collect",
    body: "We collect information that helps us understand your property preferences and provide a better experience. This may include your name, email address, phone number, property interests, and any information you voluntarily share through our contact forms or consultations.",
  },
  {
    title: "How We Use Information",
    body: "The information we collect is used to respond to inquiries, personalize property recommendations, schedule visits, improve our services, and communicate updates about relevant listings and offers.",
  },
  {
    title: "Cookies",
    body: "Our website may use cookies and similar technologies to remember your preferences, analyze traffic, and improve site performance. You can disable cookies in your browser settings, though some site features may be affected.",
  },
  {
    title: "Third-Party Services",
    body: "We may use trusted third-party tools such as analytics, mapping, and communication services to improve the website experience. These providers only process information as permitted by law and our instructions.",
  },
  {
    title: "Data Security",
    body: "We take reasonable measures to protect your personal information from unauthorized access, loss, or misuse. However, no method of digital transmission or storage is completely secure.",
  },
  {
    title: "User Rights",
    body: "You have the right to request access to, correction of, or deletion of your personal information where applicable. Please contact us if you would like to exercise these rights.",
  },
  {
    title: "Policy Updates",
    body: "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any updates will be posted on this page with the revised effective date.",
  },
  {
    title: "Contact Information",
    body: `For privacy-related questions, please contact us at ${SITE_CONFIG.email} or call ${SITE_CONFIG.phone}.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-20 sm:py-28">
        <Container>
          <SectionHeading
            title="Privacy Policy"
            subtitle="Your trust matters to us. This page explains how we collect, use, and protect your information."
          />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-4xl space-y-5">
            {sections.map((section) => (
              <Card key={section.title} className="border-border/70 bg-card/80">
                <CardContent className="p-6 sm:p-8">
                  <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                  <p className="mt-3 text-sm leading-8 text-muted-foreground">{section.body}</p>
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
