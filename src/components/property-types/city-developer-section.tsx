import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, MapPin } from "lucide-react";

interface CityDeveloperSectionProps {
  title: string;
  subtitle: string;
  items: Array<{ name: string; detail?: string }>;
  icon?: "city" | "developer";
}

export default function CityDeveloperSection({ title, subtitle, items, icon = "city" }: CityDeveloperSectionProps) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading title={title} subtitle={subtitle} align="left" />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.name} className="border-border/70 bg-card/80">
              <CardContent className="flex items-center gap-3 p-5">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  {icon === "developer" ? <Building2 className="h-5 w-5" /> : <MapPin className="h-5 w-5" />}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                  {item.detail ? <p className="text-sm text-muted-foreground">{item.detail}</p> : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
