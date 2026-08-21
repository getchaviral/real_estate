import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { loadCSVProjects } from '@/services/csv-project-service';
import { normalizeDataset } from '@/lib/csvData';
import faqsData from "@/data/faqs.json";
import type { Developer } from "@/types/developer";
import type { Project } from "@/types/project";
import type { FAQ } from "@/types/faq";
import HeroSection from "@/components/developers/hero-section";
import DeveloperAboutSection from "@/components/developers/about-section";
import DeveloperProjectGroups from "@/components/developers/developer-project-groups";
import AwardsSection from "@/components/developers/awards-section";
import DeveloperFAQSection from "@/components/developers/faq-section";
import ContactCTA from "@/components/home/contact-cta";
import { developerMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const projects = loadCSVProjects();
  const { developers } = normalizeDataset(projects);
  return developers.map((developer) => ({ slug: developer.slug }));
}

function getDeveloper(slug: string): Developer | undefined {
  const projects = loadCSVProjects();
  const { developers } = normalizeDataset(projects);
  return (developers as any[]).find((developer) => developer.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const developer = getDeveloper(slug);

  return developer ? developerMetadata(developer.name, developer.slug, developer.totalProjects) : {};
}

export default async function DeveloperPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const developer = getDeveloper(slug);

  if (!developer) {
    notFound();
  }

  const allProjects = loadCSVProjects();
  const developerProjects = (allProjects as Project[]).filter(
    (project) => project.builderName === developer.name
  );
  const developerFaqs = (faqsData as FAQ[]).slice(0, 4);

  return (
    <>
      <HeroSection developer={developer} />
      <DeveloperAboutSection developer={developer} />
      <DeveloperProjectGroups projects={developerProjects} />
      <AwardsSection awards={developer.awards} />
      <DeveloperFAQSection faqs={developerFaqs} />
      <ContactCTA />
    </>
  );
}
