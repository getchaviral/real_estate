import { notFound } from "next/navigation";
import { loadCSVProjects } from '@/services/csv-project-service';
import { normalizeDataset } from '@/lib/csvData';
import faqsData from "@/data/faqs.json";
import propertyTypesMeta from "@/data/property-types.json";
import type { PropertyType } from "@/types/property-type";
import type { Project } from "@/types/project";
import type { Developer } from "@/types/developer";
import type { FAQ } from "@/types/faq";
import HeroSection from "@/components/property-types/hero-section";
import PropertyTypeShowcase from "@/components/property-types/property-type-showcase";
import CityDeveloperSection from "@/components/property-types/city-developer-section";
import DeveloperFAQSection from "@/components/developers/faq-section";
import ContactCTA from "@/components/home/contact-cta";

const propertyTypeMetaMap = new Map(
  (propertyTypesMeta as PropertyType[]).map((item) => [item.slug, item])
);

function normalizeText(value = "") {
  return value.toString().trim().toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ",);
}

export async function generateStaticParams() {
  const projects = loadCSVProjects();
  const { propertyTypes } = normalizeDataset(projects);
  const csvSlugs = propertyTypes.map((propertyType) => propertyType.slug);
  const metaSlugs = Array.from(propertyTypeMetaMap.keys());
  const allSlugs = Array.from(new Set([...csvSlugs, ...metaSlugs]));
  return allSlugs.map((slug) => ({ slug }));
}

function getPropertyType(slug: string): PropertyType | undefined {
  const projects = loadCSVProjects();
  const { propertyTypes } = normalizeDataset(projects);
  const sourcePropertyType = (propertyTypes as any[]).find((propertyType) => propertyType.slug === slug);
  const metaPropertyType = propertyTypeMetaMap.get(slug);

  if (!sourcePropertyType && !metaPropertyType) {
    return undefined;
  }

  return {
    id: slug,
    slug,
    name: sourcePropertyType?.name ?? metaPropertyType?.name ?? slug.replace(/-/g, " "),
    description: metaPropertyType?.description ?? sourcePropertyType?.name ? `Explore ${sourcePropertyType?.name}` : "",
    heroImage: metaPropertyType?.heroImage ?? "/images/hero-real-estate.jpg",
    relatedProjectIds: [],
    relatedDeveloperIds: [],
    relatedLocationIds: [],
  } as PropertyType;
}

export default async function PropertyTypePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const propertyType = getPropertyType(slug);

  if (!propertyType) {
    notFound();
  }

  const normalizedPropertyTypeName = normalizeText(propertyType.name);
  const projects = (loadCSVProjects() as Project[]).filter((project) =>
    (project.propertyTypes || project.propertyType || []).some((type) => {
      const normalizedType = normalizeText(type as string);
      return (
        normalizedType.includes(normalizedPropertyTypeName) ||
        normalizedPropertyTypeName.includes(normalizedType)
      );
    })
  );

  const topCities = Array.from(new Set(projects.map((project) => project.cityName))).filter(Boolean).slice(0, 6);
  const allDevelopers = normalizeDataset(loadCSVProjects()).developers as any[];
  const topDevelopers = allDevelopers
    .filter((developer) => projects.some((project) => project.builderName === developer.name))
    .slice(0, 6)
    .map((developer) => ({ name: developer.name, detail: developer.tagline || '' }));
  const faqs = (faqsData as FAQ[]).slice(0, 4);

  return (
    <>
      <HeroSection propertyType={propertyType} />
      {projects.length > 0 ? (
        <PropertyTypeShowcase
          projects={projects}
          title={`Featured ${propertyType.name}`}
          subtitle={`Explore premium ${propertyType.name.toLowerCase()} options tailored for modern living and investment.`}
        />
      ) : null}
      {topCities.length > 0 ? (
        <CityDeveloperSection
          title={`Top Cities for ${propertyType.name}`}
          subtitle="Popular locations where demand remains strong"
          items={topCities.map((city) => ({ name: city }))}
        />
      ) : null}
      {topDevelopers.length > 0 ? (
        <CityDeveloperSection
          title={`Top Developers for ${propertyType.name}`}
          subtitle="Trusted builders delivering quality inventory"
          items={topDevelopers}
          icon="developer"
        />
      ) : null}
      {faqs.length > 0 ? <DeveloperFAQSection faqs={faqs} /> : null}
      <ContactCTA />
    </>
  );
}
