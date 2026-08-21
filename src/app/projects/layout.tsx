import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Real Estate Projects",
  description: "Browse residential and commercial real estate projects across India's leading markets.",
  alternates: { canonical: "/projects" },
  robots: { index: true, follow: true },
};

export default function ProjectsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}