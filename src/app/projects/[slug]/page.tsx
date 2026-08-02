import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Bath, BedDouble, Building2, CalendarRange, Compass, MapPin, Square, Sparkles } from "lucide-react";
import Container from "@/components/shared/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProject } from "@/services/project-service";
import { formatPriceRange, getStatusColor } from "@/lib/utils";
import { PROJECT_STATUS_LABELS } from "@/lib/constants";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <Container className="py-16">
      <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:gap-3">
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </Link>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-[0_20px_60px_-30px_rgba(15,23,42,0.32)]">
          <div className="relative h-[22rem] overflow-hidden sm:h-[28rem]">
            <Image src={project.images.hero} alt={project.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute left-4 top-4 z-10">
              <Badge variant={getStatusColor(project.status) as any} className="capitalize">
                {PROJECT_STATUS_LABELS[project.status]}
              </Badge>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center gap-2 text-sm text-white/85">
                <Sparkles className="h-4 w-4" />
                <span>Curated premium listing</span>
              </div>
              <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">{project.name}</h1>
              <p className="mt-2 flex items-center gap-2 text-sm text-white/80">
                <MapPin className="h-4 w-4" />
                {project.locality}, {project.cityName}
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-full border border-border/70 bg-muted/60 px-3 py-1.5 text-sm font-medium text-foreground">
                {project.category}
              </div>
              <div className="rounded-full border border-border/70 bg-muted/60 px-3 py-1.5 text-sm font-medium text-foreground">
                By {project.developerName}
              </div>
              <div className="rounded-full border border-border/70 bg-muted/60 px-3 py-1.5 text-sm font-medium text-foreground">
                {project.totalUnits} units
              </div>
            </div>

            <p className="mt-6 text-lg text-muted-foreground">{project.description}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border/70 bg-muted/40 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Starting at</p>
                <p className="mt-2 text-xl font-semibold text-foreground">{formatPriceRange(project.priceRange.min, project.priceRange.max)}</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-muted/40 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Configurations</p>
                <p className="mt-2 text-xl font-semibold text-foreground">{project.configurations.map((item) => item.type).join(", ")}</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-muted/40 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Area</p>
                <p className="mt-2 text-xl font-semibold text-foreground">{project.totalArea}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {project.configurations.slice(0, 4).map((config) => (
                <div key={config.type} className="rounded-2xl border border-border/70 bg-background/70 p-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-foreground">{config.type}</h2>
                    <span className="text-sm text-muted-foreground">{config.area}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><BedDouble className="h-4 w-4" />3 Bed</span>
                    <span className="flex items-center gap-1"><Bath className="h-4 w-4" />2 Bath</span>
                    <span className="flex items-center gap-1"><Square className="h-4 w-4" />{config.area}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.3)]">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Project Snapshot</h2>
            </div>
            <div className="mt-5 space-y-4 text-sm text-muted-foreground">
              <div className="flex items-center justify-between rounded-xl bg-muted/40 px-3 py-3">
                <span className="flex items-center gap-2"><CalendarRange className="h-4 w-4" />Possession</span>
                <span className="font-medium text-foreground">{project.possessionDate}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-muted/40 px-3 py-3">
                <span className="flex items-center gap-2"><Compass className="h-4 w-4" />Location</span>
                <span className="font-medium text-foreground">{project.locality}</span>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <Button className="w-full rounded-full">Book Site Visit</Button>
              <Button variant="outline" className="w-full rounded-full">Request Brochure</Button>
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}
