"use client";

import Link from "next/link";
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

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl shadow-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl">
            {SITE_CONFIG.name}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>

            <Link
              href="/projects"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Projects
            </Link>

            <Link
              href="/#top-developers"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={handleDeveloperClick}
            >
              Developers
            </Link>

            <MegaMenu />

            <PropertyTypesMegaMenu />

            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
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
                className="px-2 py-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>

              <Link
                href="/projects"
                className="px-2 py-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Projects
              </Link>

              <Link
                href="/#top-developers"
                className="px-2 py-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={(event) => {
                  setIsOpen(false);
                  handleDeveloperClick(event);
                }}
              >
                Developers
              </Link>

              <Link
                href="/locations"
                className="px-2 py-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Locations
              </Link>

              <Link
                href="/contact"
                className="px-2 py-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
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