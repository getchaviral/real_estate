import { notFound } from "next/navigation";
import { loadCSVProjects } from '@/services/csv-project-service';
import { normalizeDataset } from '@/lib/csvData';
import locationsJson from "@/data/locations.json";
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
import { matchesProjectLocationSlug } from "@/lib/locationNormalization";
import { getFallbackImage } from "@/lib/fallback-images";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Building2, MapPin, Sparkles } from "lucide-react";
import FAQSection from "@/components/home/faq-section";
import ContactCTA from "@/components/home/contact-cta";
import BlogPreview from "@/components/home/blog-preview";
import MotionWrapper from "@/components/shared/motion-wrapper";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Build a full Location object from a CSV-derived city stub when no matching
 * entry is found in locations.json. This ensures city pages never crash.
 */
function synthesizeLocation(csvCity: { id: string; name: string; slug: string; count: number }): Location {
  return {
    id: csvCity.id,
    slug: csvCity.slug,
    name: csvCity.name,
    state: "India",
    description: `Explore premium real estate projects in ${csvCity.name}. Find new launches, ready-to-move apartments, and ongoing projects by top developers.`,
    heroImage: getFallbackImage(`${csvCity.slug}-hero`),
    isPopular: true,
    totalProjects: csvCity.count,
    totalDevelopers: 0,
    popularLocalities: [],
    priceRange: { min: 2000000, max: 30000000, currency: "INR" },
    avgPricePerSqft: 6000,
    marketInsights: [
      { year: 2023, priceTrend: 9.0, supply: 5000, demand: 6500 },
      { year: 2024, priceTrend: 11.0, supply: 5500, demand: 7500 },
    ],
    faqs: [],
    featuredProjectIds: [],
    topDeveloperIds: [],
    meta: {
      title: `Properties in ${csvCity.name}`,
      description: `Find residential and commercial properties in ${csvCity.name}.`,
      keywords: `${csvCity.name} real estate`,
    },
    createdAt: "",
    updatedAt: "",
  };
}

function getLocation(slug: string): Location | undefined {
  // 1. Check the static JSON first (has full metadata)
  const fromJson = (locationsJson as Location[]).find((l) => l.slug === slug);
  if (fromJson) return fromJson;

  // 2. Fall back to CSV-derived city list (synthesize a minimal Location)
  const projects = loadCSVProjects();
  const { cities } = normalizeDataset(projects);
  const csvCity = (cities as { id: string; name: string; slug: string; count: number }[]).find(
    (c) => c.slug === slug
  );
  if (csvCity) return synthesizeLocation(csvCity);

  return undefined;
}

export async function generateStaticParams() {
  // Union of JSON slugs and CSV-derived slugs
  const jsonSlugs = (locationsJson as Location[]).map((l) => ({ slug: l.slug }));

  const projects = loadCSVProjects();
  const { cities } = normalizeDataset(projects);
  const csvSlugs = (cities as { slug: string }[]).map((c) => ({ slug: c.slug }));

  // Deduplicate
  const seen = new Set<string>();
  return [...jsonSlugs, ...csvSlugs].filter(({ slug }) => {
    if (seen.has(slug)) return false;
    seen.add(slug);
    return true;
  });
}

// ---------------------------------------------------------------------------
// Fallback content for empty sections
// ---------------------------------------------------------------------------

const FALLBACK_PROPERTY_TYPES = [
  { id: "residential", name: "Residential", description: "Premium apartments, villas, and independent floors for modern living." },
  { id: "commercial", name: "Commercial", description: "Office spaces, retail units, and business parks for your enterprise." },
  { id: "plotted", name: "Plotted Development", description: "Freehold land in well-planned townships with all amenities." },
  { id: "mixed", name: "Mixed Use", description: "Integrated projects combining residential and commercial spaces." },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = getLocation(slug);

  if (!location) {
    notFound();
  }

  const allProjects = loadCSVProjects();
  const locationProjects = (allProjects as Project[]).filter(
    (project) => matchesProjectLocationSlug(project, slug)
  );

  const featuredProjects = locationProjects.filter((project) => project.isFeatured);
  const topProperties = locationProjects.slice(0, 4);
  const newLaunchProjects = locationProjects.filter((project) => project.status === "new-launch");
  const readyToMoveProjects = locationProjects.filter((project) => project.status === "ready-to-move");
  const underConstructionProjects = locationProjects.filter((project) => project.status === "under-construction");

  const { developers: allDevelopers } = normalizeDataset(allProjects);
  const locationDevelopers = (allDevelopers as any[]).filter((developer) => {
    return allProjects.some(
      (p) => p.builderName === developer.name && matchesProjectLocationSlug(p, slug)
    );
  });

  // Property types — prefer CSV data, fall back to static list
  const csvPropertyTypes = Array.from(
    new Set(
      locationProjects.flatMap((project) => project.propertyTypes || project.propertyType || [])
    )
  ).map((name, index) => ({
    id: `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${index}`,
    name,
    description: `Premium ${name} options in ${location.name}`,
  }));
  const propertyTypes = csvPropertyTypes.length > 0 ? csvPropertyTypes : FALLBACK_PROPERTY_TYPES;

  // Popular localities — prefer CSV data, then JSON data
  const csvLocalities = Array.from(new Set(locationProjects.map((p) => p.locality))).filter(Boolean);
  const jsonLocalities = (location.popularLocalities || []).map((l) => l.name);
  const popularLocalities: string[] =
    csvLocalities.length > 0 ? csvLocalities.slice(0, 8) : jsonLocalities.slice(0, 8);

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

      {/* ── Featured Projects ── */}
      <div id="featured-projects">
        {featuredProjects.length > 0 ? (
          <ProjectShowcaseSection
            title={`Featured Projects in ${location.name}`}
            subtitle="Curated projects that define the best opportunities in the city"
            projects={featuredProjects}
            limit={3}
          />
        ) : topProperties.length > 0 ? (
          <ProjectShowcaseSection
            title={`Featured Projects in ${location.name}`}
            subtitle="Curated projects that define the best opportunities in the city"
            projects={topProperties}
            limit={3}
          />
        ) : null}
      </div>

      {/* ── Top Properties ── */}
      <div id="top-properties">
        {topProperties.length > 0 ? (
          <ProjectShowcaseSection
            title={`Top Properties in ${location.name}`}
            subtitle="Highly sought-after homes and investment-ready spaces"
            projects={topProperties}
            limit={4}
            className="bg-muted/40"
          />
        ) : null}
      </div>

      {locationProjects.length > 0 ? (
        <ProjectShowcaseSection
          title={`Explore Projects in ${location.name}`}
          subtitle="Browse all available properties tailored to this location"
          projects={locationProjects}
          limit={6}
        />
      ) : null}

      {/* ── New Launch ── */}
      <div id="new-launch">
        {newLaunchProjects.length > 0 ? (
          <ProjectShowcaseSection
            title={`New Launch in ${location.name}`}
            subtitle="Upcoming inventory for buyers looking for early access"
            projects={newLaunchProjects}
            limit={3}
            className="bg-muted/40"
          />
        ) : null}
      </div>

      {/* ── Ready to Move ── */}
      <div id="ready-to-move">
        {readyToMoveProjects.length > 0 ? (
          <ProjectShowcaseSection
            title={`Ready to Move in ${location.name}`}
            subtitle="Immediate possession homes for faster decision-making"
            projects={readyToMoveProjects}
            limit={3}
          />
        ) : null}
      </div>

      {/* ── Under Construction ── */}
      <div id="under-construction">
        {underConstructionProjects.length > 0 ? (
          <ProjectShowcaseSection
            title={`Under Construction in ${location.name}`}
            subtitle="Projects with strong growth potential and phased delivery"
            projects={underConstructionProjects}
            limit={3}
            className="bg-muted/40"
          />
        ) : null}
      </div>

      {/* ── Popular Localities ── */}
      <div id="popular-localities">
        <LocationSectionShell
          title={`Popular Localities in ${location.name}`}
          subtitle="Popular neighborhoods that offer convenience, connectivity, and lifestyle value"
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {popularLocalities.map((locality, index) => (
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
      </div>

      {/* ── Top Developers ── */}
      <div id="top-developers">
        <LocationSectionShell
          title={`Top Developers in ${location.name}`}
          subtitle="Trusted builders delivering quality projects in this market"
          className="bg-muted/40"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {locationDevelopers.length > 0 ? (
              locationDevelopers.map((developer, index) => (
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
              ))
            ) : (
              // Fallback when no CSV developer data for this city
              [
                { name: "Top Developers", tagline: `Building the future of ${location.name}` },
                { name: "Premium Builders", tagline: "Quality construction, timely delivery" },
                { name: "Trusted Groups", tagline: "Decades of experience, thousands of homes" },
                { name: "Licensed Developers", tagline: "RERA-compliant projects across the city" },
              ].map((item, index) => (
                <MotionWrapper key={item.name} transition={{ delay: index * 0.08, duration: 0.4 }}>
                  <Card className="h-full text-center">
                    <CardContent className="p-6">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <Building2 className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="text-base font-semibold text-card-foreground">{item.name}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{item.tagline}</p>
                    </CardContent>
                  </Card>
                </MotionWrapper>
              ))
            )}
          </div>
        </LocationSectionShell>
      </div>

      {/* ── Property Types ── */}
      <div id="property-types">
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
      </div>

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

      {marketInsights.length > 0 ? (
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
      ) : null}

      <BlogPreview />
      <FAQSection />
      <ContactCTA />
    </>
  );
}
