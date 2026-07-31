import { notFound } from "next/navigation";
import developers from "@/data/developers.json";
import projectsData from "@/data/projects.json";
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

export async function generateStaticParams() {
  return developers.map((developer) => ({
    slug: developer.slug,
  }));
}

function getDeveloper(slug: string): Developer | undefined {
  return (developers as Developer[]).find((developer) => developer.slug === slug);
}

export default function DeveloperPage({ params }: { params: { slug: string } }) {
  const developer = getDeveloper(params.slug);

  if (!developer) {
    notFound();
  }

  const developerProjects = (projectsData as Project[]).filter(
    (project) => project.developerId === developer.id
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
