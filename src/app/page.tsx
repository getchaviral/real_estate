import HeroSection from "@/components/home/hero-section";
import StatsCounter from "@/components/home/stats-counter";
import FeaturedProjects from "@/components/home/featured-projects";
import ExploreProjects from "@/components/home/explore-projects";
import PopularCities from "@/components/home/popular-cities";
import PopularLocalities from "@/components/home/popular-localities";
import TopProperties from "@/components/home/top-properties";
import TopDevelopers from "@/components/home/top-developers";
import PropertyTypes from "@/components/home/property-types";
import WhyChooseUs from "@/components/home/why-choose-us";
import LatestBlogs from "@/components/home/blog-preview";
import Testimonials from "@/components/home/testimonials";
import FAQSection from "@/components/home/faq-section";
import HomeLoanCTA from "@/components/home/home-loan-cta";
import MarketInsights from "@/components/home/market-insights";
import Newsletter from "@/components/home/newsletter";
import ContactCTA from "@/components/home/contact-cta";

const homeSections = [
  HeroSection,
  StatsCounter,
  FeaturedProjects,
  ExploreProjects,
  PopularCities,
  PopularLocalities,
  TopProperties,
  TopDevelopers,
  PropertyTypes,
  WhyChooseUs,
  HomeLoanCTA,
  MarketInsights,
  LatestBlogs,
  Testimonials,
  FAQSection,
  Newsletter,
  ContactCTA,
];

export default function Home() {
  return (
    <div className="overflow-hidden bg-background">
      {homeSections.map((Section, index) => (
        <div key={`section-${index}`} className={`relative ${index % 2 === 0 ? "bg-background" : "bg-muted/40"}`}>
          <Section />
          {index < homeSections.length - 1 && (
            <div className="mx-auto h-px w-full max-w-7xl bg-gradient-to-r from-transparent via-border/70 to-transparent" />
          )}
        </div>
      ))}
    </div>
  );
}

