"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Container from "@/components/shared/container";
import { SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  const handleDeveloperClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      event.preventDefault();
      const target = document.getElementById("top-developers");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    router.push("/#top-developers");
  };

  return (
    <footer className="border-t border-border bg-card">
      <Container>
        <div className="py-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-semibold tracking-tight text-foreground">
              YouWe Homes
            </Link>
            <p className="max-w-sm text-sm leading-7 text-muted-foreground">
              Premium real estate solutions with curated listings, trusted developers, and tailored finance support across India.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {[
                { label: "About Us", href: "/about" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms & Conditions", href: "/terms-and-conditions" },
                { label: "Cookie Policy", href: "/cookie-policy" },
                { label: "Contact Us", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {[
                { label: "Projects", href: "/projects" },
                { label: "Property Types", href: "/#property-types" },
                { label: "Developers", href: "/#top-developers", onClick: handleDeveloperClick },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-foreground transition-colors"
                    onClick={item.onClick}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Contact Us
            </h3>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <span>{SITE_CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="hover:text-foreground transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-foreground transition-colors"
                >
                  {SITE_CONFIG.email}
                </a>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                RERA No.: {SITE_CONFIG.reraNumber}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border py-6 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} YouWe Homes. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
