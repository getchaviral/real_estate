import { notFound } from "next/navigation";
import { loadCSVProjects } from '@/services/csv-project-service';
import { normalizeDataset } from '@/lib/csvData';
import blogs from "@/data/blogs.json";
import faqs from "@/data/faqs.json";
import type { Location } from "@/types/location";
import type { Project } from "@/types/project";
import type { Developer } from "@/types/developer";
import type { Blog } from "@/types/blog";
import type { FAQ } from "@/types/faq";
import HeroSection from "@/components/locations/hero-section";
import { SearchForm } from "@/components/home/search-form";
import StatsCounter from "@/components/home/stats-counter";
import ProjectShowcaseSection from "@/components/shared/project-showcase-section";
import LocationSectionShell from "@/components/shared/location-section-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Building2, MapPin, Sparkles } from "lucide-react";
import FAQSection from "@/components/home/faq-section";
import ContactCTA from "@/components/home/contact-cta";
import BlogPreview from "@/components/home/blog-preview";
import MotionWrapper from "@/components/shared/motion-wrapper";

export async function generateStaticParams() {
  const projects = loadCSVProjects();
  const { cities } = normalizeDataset(projects);
  return cities.map((location) => ({ slug: location.slug }));
}

function getLocation(slug: string): Location | undefined {
  const projects = loadCSVProjects();
  const { cities } = normalizeDataset(projects);
  return (cities as any[]).find((location) => location.slug === slug);
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = getLocation(slug);

  if (!location) {
    notFound();
  }

  const allProjects = loadCSVProjects();
  const locationProjects = (allProjects as Project[]).filter((project) =>
    project.cityName.toLowerCase() === location.name.toLowerCase() ||
    project.locality.toLowerCase().includes(location.name.toLowerCase())
  );

  const featuredProjects = locationProjects.filter((project) => project.isFeatured);
  const topProperties = locationProjects.slice(0, 4);
  const newLaunchProjects = locationProjects.filter((project) => project.status === "new-launch");
  const readyToMoveProjects = locationProjects.filter((project) => project.status === "ready-to-move");
  const underConstructionProjects = locationProjects.filter((project) => project.status === "under-construction");

  const { developers: allDevelopers } = normalizeDataset(allProjects);
  const locationDevelopers = (allDevelopers as any[]).filter((developer) => {
    // include developer if any of their projects are in this city
    return allProjects.some((p) => p.builderName === developer.name && p.cityName === location.name);
  });

  const propertyTypes = Array.from(
    new Set(
      locationProjects.flatMap((project) => project.propertyTypes || project.propertyType || [])
    )
  ).map((name, index) => ({
    id: `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${index}`,
    name,
    description: `Premium ${name} options in ${location.name}`,
  }));

  const featuredBlogs = (blogs as Blog[]).slice(0, 3);
  const locationFaqs = (faqs as FAQ[]).filter((faq) => faq.category === "real-estate" || faq.category === "buying").slice(0, 6);

  const marketInsights = location.marketInsights ?? [];

  return (
    <>
      <HeroSection location={location} />

      <section className="relative -mt-10 z-10 pb-8">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <MotionWrapper
            transition={{ duration: 0.35 }}
            className="rounded-2xl border border-border/70 bg-card/95 p-4 shadow-card backdrop-blur sm:p-6"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Search Properties</p>
                <p className="mt-1 text-sm text-muted-foreground">Find homes, villas, and commercial spaces in {location.name}</p>
              </div>
              <div className="w-full lg:max-w-2xl">
                <SearchForm />
              </div>
            </div>
          </MotionWrapper>
        </div>
      </section>

      <StatsCounter />

      {featuredProjects.length > 0 ? (
        <ProjectShowcaseSection
          title={`Featured Projects in ${location.name}`}
          subtitle="Curated projects that define the best opportunities in the city"
          projects={featuredProjects}
          limit={3}
        />
      ) : null}

      {topProperties.length > 0 ? (
        <ProjectShowcaseSection
          title={`Top Properties in ${location.name}`}
          subtitle="Highly sought-after homes and investment-ready spaces"
          projects={topProperties}
          limit={4}
          className="bg-muted/40"
        />
      ) : null}

      {locationProjects.length > 0 ? (
        <ProjectShowcaseSection
          title={`Explore Projects in ${location.name}`}
          subtitle="Browse all available properties tailored to this location"
          projects={locationProjects}
          limit={6}
        />
      ) : null}

      {newLaunchProjects.length > 0 ? (
        <ProjectShowcaseSection
          title={`New Launch in ${location.name}`}
          subtitle="Upcoming inventory for buyers looking for early access"
          projects={newLaunchProjects}
          limit={3}
          className="bg-muted/40"
        />
      ) : null}

      {readyToMoveProjects.length > 0 ? (
        <ProjectShowcaseSection
          title={`Ready to Move in ${location.name}`}
          subtitle="Immediate possession homes for faster decision-making"
          projects={readyToMoveProjects}
          limit={3}
        />
      ) : null}

      {underConstructionProjects.length > 0 ? (
        <ProjectShowcaseSection
          title={`Under Construction in ${location.name}`}
          subtitle="Projects with strong growth potential and phased delivery"
          projects={underConstructionProjects}
          limit={3}
          className="bg-muted/40"
        />
      ) : null}

      <LocationSectionShell
        title={`Popular Localities in ${location.name}`}
        subtitle="Popular neighborhoods that offer convenience, connectivity, and lifestyle value"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* no locality data in CSV; show top localities from projects */}
          {Array.from(new Set(locationProjects.map((p) => p.locality))).slice(0, 8).map((locality, index) => (
            <MotionWrapper
              key={locality || index}
              transition={{ delay: index * 0.08, duration: 0.4 }}
            >
              <Card className="h-full border-border/70 bg-card/70 hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 text-primary">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-semibold">{locality}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">A fast-growing neighborhood with strong demand and premium lifestyle options.</p>
                </CardContent>
              </Card>
            </MotionWrapper>
          ))}
        </div>
      </LocationSectionShell>

      {locationDevelopers.length > 0 ? (
        <LocationSectionShell
          title={`Top Developers in ${location.name}`}
          subtitle="Trusted builders delivering quality projects in this market"
          className="bg-muted/40"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {locationDevelopers.map((developer, index) => (
              <MotionWrapper
                key={developer.id}
                transition={{ delay: index * 0.08, duration: 0.4 }}
              >
                <Card className="h-full text-center">
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Building2 className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold text-card-foreground">{developer.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{developer.tagline}</p>
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>{developer.totalProjects}+ projects</span>
                    </div>
                  </CardContent>
                </Card>
              </MotionWrapper>
            ))}
          </div>
        </LocationSectionShell>
      ) : null}

      <LocationSectionShell
        title={`Property Types in ${location.name}`}
        subtitle="Choose from apartments, villas, plots, and more"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(propertyTypes as Array<{ id: string; name: string; description: string }>).slice(0, 4).map((propertyType) => (
            <Card key={propertyType.id} className="h-full">
              <CardContent className="p-5">
                <Badge variant="outline" className="mb-3">
                  {propertyType.name}
                </Badge>
                <p className="text-sm text-muted-foreground">{propertyType.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </LocationSectionShell>

      <LocationSectionShell
        title={`Why Invest in ${location.name}`}
        subtitle="A market defined by strong demand, better infrastructure, and long-term value"
        className="bg-muted/40"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Strong Connectivity", content: `${location.name} offers excellent access to business districts, transit, and lifestyle amenities.` },
            { title: "High Demand", content: `Buyer and tenant demand remains strong, supported by job growth and infrastructure upgrades.` },
            { title: "Long-Term Growth", content: `The city continues to attract investment with rising capital values and steady rental yield.` },
          ].map((item) => (
            <Card key={item.title} className="h-full">
              <CardContent className="p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </LocationSectionShell>

      <LocationSectionShell
        title={`Market Trends in ${location.name}`}
        subtitle="Recent growth indicators that reflect how the market is moving"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {marketInsights.map((insight) => (
            <Card key={insight.year} className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-card-foreground">{insight.year}</h3>
                  <Badge variant="primary">+{insight.priceTrend.toFixed(1)}%</Badge>
                </div>
                <div className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                  <div>
                    <p className="font-medium text-foreground">Supply</p>
                    <p>{insight.supply.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Demand</p>
                    <p>{insight.demand.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </LocationSectionShell>

      {featuredBlogs.length > 0 ? <BlogPreview /> : null}

      <FAQSection />
      <ContactCTA />
    </>
  );
}
