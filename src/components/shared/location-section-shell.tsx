import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import type { ReactNode } from "react";

interface LocationSectionShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export default function LocationSectionShell({
  title,
  subtitle,
  children,
  className = "",
}: LocationSectionShellProps) {
  return (
    <section className={`py-10 sm:py-14 ${className}`.trim()}>
      <Container>
        <SectionHeading title={title} subtitle={subtitle} />
        <div className="mt-8">{children}</div>
      </Container>
    </section>
  );
}
