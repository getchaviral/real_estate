import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import type { PropertyType } from "@/types/property-type";

interface PropertyTypeDescriptionSectionProps {
  propertyType: PropertyType;
  title?: string;
  subtitle?: string;
}

export default function PropertyTypeDescriptionSection({ propertyType, title, subtitle }: PropertyTypeDescriptionSectionProps) {
  const headingTitle = title ?? `${propertyType.name} at a Glance`;
  const headingSubtitle = subtitle ?? "A curated collection for buyers, investors, and business owners";

  return (
    <section id="description" className="py-16 sm:py-20">
      <Container>
        <SectionHeading title={headingTitle} subtitle={headingSubtitle} align="left" />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-border/70 bg-card/80">
            <CardContent className="p-6">
              <p className="text-lg leading-8 text-muted-foreground">{propertyType.description}</p>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground">Why buyers choose {propertyType.name}</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>• Premium options across major growth corridors</li>
                <li>• Flexible layouts and investment-friendly pricing</li>
                <li>• Strong demand from families, investors, and businesses</li>
                <li>• Verified projects backed by trusted developers</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
}
