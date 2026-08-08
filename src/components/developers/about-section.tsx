import { Building2, CalendarDays, Globe2, Mail, MapPin, Phone, Star } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import type { Developer } from "@/types/developer";

interface DeveloperAboutSectionProps {
  developer: Developer;
}

export default function DeveloperAboutSection({ developer }: DeveloperAboutSectionProps) {
  const stats = [
    { label: "Founded", value: String(developer.foundedYear ?? "N/A") },
    { label: "Projects", value: String(developer.totalProjects ?? 0) },
    { label: "Completed", value: String(developer.completedProjects ?? 0) },
    { label: "Ongoing", value: String(developer.ongoingProjects ?? 0) },
  ];

  return (
    <section id="about-developer" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          title={`About ${developer.name}`}
          subtitle={developer.tagline}
          align="left"
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <p className="text-lg leading-8 text-muted-foreground">
              {developer.description}
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border/70 bg-card/70 p-4">
                  <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {developer.cityIds.map((cityId) => (
                <span
                  key={cityId}
                  className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary"
                >
                  {cityId}
                </span>
              ))}
            </div>
          </div>

          <Card className="border-border/70 bg-card/80">
            <CardContent className="space-y-5 p-6">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <Star className="h-4 w-4" />
                <span>
                  {developer.ratings.toFixed(1)} rating from {developer.totalReviews} reviews
                </span>
              </div>

              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{developer.contact.phone}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{developer.contact.email}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{developer.contact.address}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Globe2 className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{developer.contact.website}</span>
                </div>
              </div>

              <div className="rounded-lg border border-border/70 bg-muted/40 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Building2 className="h-4 w-4" />
                  <span>Project Portfolio</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Delivering thoughtfully designed homes across premium cities with a focus on quality, trust, and long-term value.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
}
