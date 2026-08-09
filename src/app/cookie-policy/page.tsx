import type { Metadata } from "next";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import ContactCTA from "@/components/home/contact-cta";

export const metadata: Metadata = {
  title: "Cookie Policy | YouWe Homes",
  description: "Understand how YouWe Homes uses cookies and related technologies on our website.",
};

const sections = [
  {
    title: "What Are Cookies?",
    body: "Cookies are small text files stored on your device by your browser when you visit websites. They help the site remember information about your visit and improve your browsing experience.",
  },
  {
    title: "How We Use Cookies",
    body: "We may use cookies to remember your preferences, analyse website traffic, deliver personalised content, and improve website performance.",
  },
  {
    title: "Managing Cookies",
    body: "Most browsers allow you to manage or disable cookies through their settings. Disabling cookies may affect some website features or user experience.",
  },
  {
    title: "Third-Party Cookies",
    body: "Our site may include third-party tools or integrations that set their own cookies. Their use of cookies is governed by the third party's privacy and cookie policies.",
  },
  {
    title: "Changes to This Policy",
    body: "We may update this Cookie Policy from time to time. Any changes will be published on this page.",
  },
];

export default function CookiePolicyPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Cookie Policy</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Understanding cookies on YouWe Homes.
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              We use cookies to enhance your experience and measure website performance.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-4xl space-y-5">
            {sections.map((section) => (
              <div key={section.title} className="rounded-3xl border border-border/70 bg-card/80 p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{section.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
