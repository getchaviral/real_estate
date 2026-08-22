"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useCallback, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Container from "@/components/shared/container";
import { MegaMenu } from "@/components/ui/mega-menu";
import { PropertyTypesMegaMenu } from "@/components/ui/property-types-mega-menu";
import { SITE_CONFIG } from "@/lib/constants";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleDeveloperClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname === "/") {
        event.preventDefault();
        const target = document.getElementById("top-developers");
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }

      setIsOpen(false);
      router.push("/#top-developers");
    },
    [pathname, router]
  );

  // Active state helpers
  const isHome = pathname === "/";
  const isProjects = pathname === "/projects" || pathname.startsWith("/projects/");
  const isDevelopers = pathname.startsWith("/developers");
  const isLocations = pathname === "/locations" || pathname.startsWith("/locations/");
  const isPropertyTypes = pathname === "/property-types" || pathname.startsWith("/property-types/");
  const isContact = pathname === "/contact" || pathname.startsWith("/contact/");

  const activeLinkClass =
    "text-sm font-semibold text-foreground transition-colors";
  const inactiveLinkClass =
    "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors";

  const mobileActiveLinkClass =
    "px-2 py-1 text-sm font-semibold text-foreground transition-colors";
  const mobileInactiveLinkClass =
    "px-2 py-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl shadow-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-white p-1 shadow-sm">
              <Image
                src="/images/YouWehomeslogo.cdr.png"
                alt={SITE_CONFIG.name}
                width={48}
                height={48}
                priority
                className="h-full w-full object-contain"
              />
            </span>
            <span className="font-bold text-xl">{SITE_CONFIG.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={isHome ? activeLinkClass : inactiveLinkClass}
            >
              Home
            </Link>

            <Link
              href="/projects"
              className={isProjects ? activeLinkClass : inactiveLinkClass}
            >
              Projects
            </Link>

            <Link
              href="/#top-developers"
              className={isDevelopers ? activeLinkClass : inactiveLinkClass}
              onClick={handleDeveloperClick}
            >
              Developers
            </Link>

            <MegaMenu isActive={isLocations} />

            <PropertyTypesMegaMenu isActive={isPropertyTypes} />

            <Link
              href="/contact"
              className={isContact ? activeLinkClass : inactiveLinkClass}
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden h-9 w-9 p-0"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-4 pb-6">
            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                className={isHome ? mobileActiveLinkClass : mobileInactiveLinkClass}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>

              <Link
                href="/projects"
                className={isProjects ? mobileActiveLinkClass : mobileInactiveLinkClass}
                onClick={() => setIsOpen(false)}
              >
                Projects
              </Link>

              <Link
                href="/#top-developers"
                className={isDevelopers ? mobileActiveLinkClass : mobileInactiveLinkClass}
                onClick={(event) => {
                  setIsOpen(false);
                  handleDeveloperClick(event);
                }}
              >
                Developers
              </Link>

              <Link
                href="/locations"
                className={isLocations ? mobileActiveLinkClass : mobileInactiveLinkClass}
                onClick={() => setIsOpen(false)}
              >
                Locations
              </Link>

              <Link
                href="/property-types"
                className={isPropertyTypes ? mobileActiveLinkClass : mobileInactiveLinkClass}
                onClick={() => setIsOpen(false)}
              >
                Property Types
              </Link>

              <Link
                href="/contact"
                className={isContact ? mobileActiveLinkClass : mobileInactiveLinkClass}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}