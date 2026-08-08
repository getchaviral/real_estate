import { notFound } from "next/navigation";
import { loadCSVProjects } from '@/services/csv-project-service';
import { normalizeDataset } from '@/lib/csvData';
import faqsData from "@/data/faqs.json";
import type { PropertyType } from "@/types/property-type";
import type { Project } from "@/types/project";
import type { Developer } from "@/types/developer";
import type { FAQ } from "@/types/faq";
import HeroSection from "@/components/property-types/hero-section";
import PropertyTypeDescriptionSection from "@/components/property-types/description-section";
import PropertyTypeShowcase from "@/components/property-types/property-type-showcase";
import CityDeveloperSection from "@/components/property-types/city-developer-section";
import DeveloperFAQSection from "@/components/developers/faq-section";
import ContactCTA from "@/components/home/contact-cta";

export async function generateStaticParams() {
  const projects = loadCSVProjects();
  const { propertyTypes } = normalizeDataset(projects);
  return propertyTypes.map((propertyType) => ({ slug: propertyType.slug }));
}

function getPropertyType(slug: string): PropertyType | undefined {
  const projects = loadCSVProjects();
  const { propertyTypes } = normalizeDataset(projects);
  return (propertyTypes as any[]).find((propertyType) => propertyType.slug === slug);
}

export default async function PropertyTypePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const propertyType = getPropertyType(slug);

  if (!propertyType) {
    notFound();
  }

  const projects = (loadCSVProjects() as Project[]).filter((project) =>
    (project.propertyTypes || []).some((type) => type.toLowerCase().includes(propertyType.name.toLowerCase()))
  );

  const topCities = Array.from(new Set(projects.map((project) => project.cityName))).slice(0, 6);
  const allDevelopers = normalizeDataset(loadCSVProjects()).developers as any[];
  const topDevelopers = allDevelopers
    .filter((developer) => projects.some((project) => project.builderName === developer.name))
    .slice(0, 6)
    .map((developer) => ({ name: developer.name, detail: developer.tagline || '' }));
  const faqs = (faqsData as FAQ[]).slice(0, 4);

  return (
    <>
      <HeroSection propertyType={propertyType} />
      <PropertyTypeDescriptionSection propertyType={propertyType} />
      <PropertyTypeShowcase
        projects={projects}
        title={`Featured ${propertyType.name}`}
        subtitle={`Explore premium ${propertyType.name.toLowerCase()} options tailored for modern living and investment.`}
      />
      <CityDeveloperSection
        title={`Top Cities for ${propertyType.name}`}
        subtitle="Popular locations where demand remains strong"
        items={topCities.map((city) => ({ name: city }))}
      />
      <CityDeveloperSection
        title={`Top Developers for ${propertyType.name}`}
        subtitle="Trusted builders delivering quality inventory"
        items={topDevelopers}
        icon="developer"
      />
      <DeveloperFAQSection faqs={faqs} />
      <ContactCTA />
    </>
  );
}
