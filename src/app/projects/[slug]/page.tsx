import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  FileText,
  Home,
  Landmark,
  Mail,
  MapPin,
  Maximize2,
  Phone,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import Container from "@/components/shared/container";
import ProjectCard from "@/components/shared/project-card";
import ProjectDetailActions from "@/components/projects/project-detail-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProject } from "@/services/project-server-service";
import { loadCSVProjects } from "@/services/csv-project-service";
import { normalizeDataset } from "@/lib/csvData";
import { formatPriceRange, getStatusColor } from "@/lib/utils";
import { PROJECT_STATUS_LABELS } from "@/lib/constants";
import { getFallbackImage } from "@/lib/fallback-images";
import type { Project } from "@/types/project";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

type BadgeVariant = "primary" | "secondary" | "success" | "warning" | "danger" | "outline";

const NOT_AVAILABLE = "Not available";

function cleanValue(value?: string | number | null) {
  if (value === undefined || value === null || String(value).trim() === "") {
    return NOT_AVAILABLE;
  }

  return String(value).trim();
}

function cleanList(values?: string[] | string) {
  const source = Array.isArray(values) ? values : values ? String(values).split(/[,;|]/) : [];

  return source.map((value) => value.trim()).filter(Boolean);
}

function formatProjectPrice(project: Project) {
  if (project.priceRange?.min || project.priceRange?.max) {
    return formatPriceRange(project.priceRange.min, project.priceRange.max);
  }

  return cleanValue(project.priceRangeApprox);
}

function getPrimaryImage(project: Project) {
  const image = project.images?.hero;

  if (image && image !== "/images/placeholder-project.jpg" && image !== "/images/property-card-bg.svg") {
    return image;
  }

  return getFallbackImage(project.slug);
}

function getProjectFacts(project: Project) {
  const propertyTypes = cleanList(project.propertyTypes || project.propertyType);
  const configurations = cleanList(
    project.configurations?.map((configuration) => configuration.type).filter((value) => value && value !== "N/A")
  );

  return [
    {
      label: "Property Type",
      value: propertyTypes.length ? propertyTypes.join(", ") : cleanValue(project.projectType),
      icon: Home,
    },
    {
      label: "Configurations",
      value: configurations.length ? configurations.join(", ") : cleanValue(project.configuration),
      icon: Building2,
    },
    {
      label: "Area",
      value: cleanValue(project.unitSizeRange || project.totalArea || project.areaAcres),
      icon: Maximize2,
    },
    {
      label: "Total Units",
      value: cleanValue(project.totalUnits ?? project.units),
      icon: Landmark,
    },
    {
      label: "Total Towers",
      value: cleanValue(project.totalTowers ?? project.towers),
      icon: Building2,
    },
    {
      label: "Possession Date",
      value: cleanValue(project.possessionDate || project.possessionCompletion),
      icon: CalendarDays,
    },
    {
      label: "RERA Number",
      value: cleanValue(project.reraNumber || project.reraNo),
      icon: ShieldCheck,
    },
  ];
}

export async function generateStaticParams() {
  const projects = loadCSVProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const allProjects = loadCSVProjects();
  const { developers } = normalizeDataset(allProjects);
  const developer = developers.find((item) => item.name === project.developerName || item.name === project.builderName);
  const statusVariant = getStatusColor(project.status) as BadgeVariant;
  const statusLabel = PROJECT_STATUS_LABELS[project.status] ?? cleanValue(project.rawStatus || project.status);
  const facts = getProjectFacts(project);
  const features = cleanList(project.features);
  const amenities = cleanList(project.amenities);
  const similarProjects = allProjects
    .filter(
      (item) =>
        item.slug !== project.slug &&
        (item.cityName === project.cityName || item.developerName === project.developerName)
    )
    .slice(0, 4);

  return (
    <main className="bg-slate-50">
      <Container className="py-6 sm:py-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="transition hover:text-slate-950">
            Home
          </Link>
          <span>/</span>
          <Link href="/projects" className="transition hover:text-slate-950">
            Projects
          </Link>
          <span>/</span>
          <span className="font-medium text-slate-950">{project.name}</span>
        </nav>
      </Container>

      <section className="bg-white">
        <Container className="pb-10">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative min-h-[320px] overflow-hidden rounded-xl bg-slate-950 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.65)] sm:min-h-[430px]">
              <Image
                src={getPrimaryImage(project)}
                alt={project.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-3">
                <Badge
                  variant={statusVariant}
                  size="lg"
                  className="border border-white/30 bg-white/95 text-slate-950 shadow-sm"
                >
                  {statusLabel}
                </Badge>
                <ProjectDetailActions projectName={project.name} slug={project.slug} />
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-[0_18px_50px_-35px_rgba(15,23,42,0.45)] sm:p-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
                  Project Details
                </p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  {project.name}
                </h1>
                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    <span>{cleanValue(project.developerName || project.builderName)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{cleanValue(project.location || project.locationSectorArea)}</span>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Starting Price</p>
                  <p className="mt-1 text-2xl font-bold text-slate-950">{formatProjectPrice(project)}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <a
                  href="#enquiry"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-slate-950 px-5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-slate-900"
                >
                  Enquire Now
                </a>
                <a
                  href="#enquiry"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:border-slate-950 hover:bg-slate-950 hover:text-white"
                >
                  Schedule Site Visit
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="space-y-10 py-10 sm:py-14">
        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Key Project Information</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => {
              const Icon = fact.icon;
              return (
                <div key={fact.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{fact.label}</p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-slate-950">{fact.value}</p>
                </div>
              );
            })}
          </div>
        </section>

        {project.description ? (
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">About Project</h2>
            <p className="mt-4 leading-7 text-slate-600">{project.description}</p>
          </section>
        ) : null}

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-slate-950">
              <FileText className="h-5 w-5 text-primary" />
              Features
            </h2>
            {features.length ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {features.map((feature) => (
                  <span key={feature} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700">
                    {feature}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-500">{NOT_AVAILABLE}</p>
            )}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-slate-950">
              <Sparkles className="h-5 w-5 text-primary" />
              Amenities
            </h2>
            {amenities.length ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm font-medium text-slate-700">{amenity}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-500">{NOT_AVAILABLE}</p>
            )}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.75fr]">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Location</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                ["Location", project.location || project.locationSectorArea],
                ["Full Address", project.address],
                ["City", project.cityName],
                ["Area / Locality", project.locality],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-950">{cleanValue(value)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Developer</h2>
            <div className="mt-5 flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-white">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-slate-950">{cleanValue(project.developerName || project.builderName)}</p>
                {developer ? (
                  <Link href={`/developers/${developer.slug}`} className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary transition hover:gap-2">
                    View developer profile
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <p className="mt-2 text-sm text-slate-500">Developer profile not available</p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="enquiry" className="grid gap-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">Contact</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Send an enquiry</h2>
            <p className="mt-3 leading-7 text-slate-600">
              Share your details and our team will help with pricing, availability, and site visit scheduling.
            </p>
          </div>

          <form className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Name
              <span className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 outline-none transition focus:border-slate-950" placeholder="Your name" />
              </span>
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Phone
              <span className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 outline-none transition focus:border-slate-950" placeholder="Phone number" />
              </span>
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700 sm:col-span-2">
              Email
              <span className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 outline-none transition focus:border-slate-950" placeholder="Email address" />
              </span>
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700 sm:col-span-2">
              Message
              <textarea className="min-h-28 w-full rounded-lg border border-slate-200 bg-white p-3 outline-none transition focus:border-slate-950" defaultValue={`I am interested in ${project.name}.`} />
            </label>
            <Button type="submit" size="lg" className="h-12 rounded-full bg-slate-950 font-semibold text-white hover:bg-slate-900 sm:col-span-2">
              Submit Enquiry
            </Button>
          </form>
        </section>

        {similarProjects.length ? (
          <section>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Similar Projects</h2>
                <p className="mt-2 text-slate-600">More projects from the same city or developer.</p>
              </div>
              <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3">
                View all projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {similarProjects.map((item) => (
                <ProjectCard key={item.id} project={item} />
              ))}
            </div>
          </section>
        ) : null}
      </Container>
    </main>
  );
}
