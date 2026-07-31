import { notFound } from "next/navigation";
import propertyTypes from "@/data/property-types.json";
import projectsData from "@/data/projects.json";
import developersData from "@/data/developers.json";
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
  return propertyTypes.map((propertyType) => ({
    slug: propertyType.slug,
  }));
}

function getPropertyType(slug: string): PropertyType | undefined {
  return (propertyTypes as PropertyType[]).find((propertyType) => propertyType.slug === slug);
}

export default function PropertyTypePage({ params }: { params: { slug: string } }) {
  const propertyType = getPropertyType(params.slug);

  if (!propertyType) {
    notFound();
  }

  const projects = (projectsData as Project[]).filter((project) =>
    project.propertyType.some((type) => type.toLowerCase().includes(propertyType.name.toLowerCase()))
  );

  const topCities = Array.from(new Set(projects.map((project) => project.cityName))).slice(0, 6);
  const topDevelopers = (developersData as Developer[])
    .filter((developer) => developer.projectIds.some((projectId) => projects.some((project) => project.id === projectId)))
    .slice(0, 6)
    .map((developer) => ({ name: developer.name, detail: developer.tagline }));
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
