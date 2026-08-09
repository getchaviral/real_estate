import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";
import type { DeveloperAward } from "@/types/developer";

interface AwardsSectionProps {
  awards: DeveloperAward[];
}

export default function AwardsSection({ awards }: AwardsSectionProps) {
  if (!awards.length) {
    return null;
  }

  return (
    <section id="awards" className="py-12 sm:py-16">
      <Container>
        <SectionHeading
          title="Awards & Recognitions"
          subtitle="Industry recognition for innovation, quality, and customer trust"
          align="left"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {awards.map((award) => (
            <Card key={`${award.title}-${award.year}`} className="border-border/70 bg-card/80">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                      {award.year}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-foreground">{award.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{award.organization}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
