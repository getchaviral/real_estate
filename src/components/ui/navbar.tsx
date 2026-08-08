"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Container from "@/components/shared/container";
import { MegaMenu } from "@/components/ui/mega-menu";
import { PropertyTypesMegaMenu } from "@/components/ui/property-types-mega-menu";
import { SITE_CONFIG } from "@/lib/constants";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-foreground"
          >
            <span className="text-primary">{SITE_CONFIG.name}</span>
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
              href="/developers"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Developers
            </Link>
            <MegaMenu />
            <PropertyTypesMegaMenu />
            <Link
              href="/blogs"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Blogs
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button className="hidden sm:inline-flex">Get Started</Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden h-9 w-9 p-0"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-4 pb-6">
            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/projects"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                onClick={() => setIsOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="/developers"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                onClick={() => setIsOpen(false)}
              >
                Developers
              </Link>
              <Link
                href="/locations"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                onClick={() => setIsOpen(false)}
              >
                Locations
              </Link>
              <Link
                href="/blogs"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                onClick={() => setIsOpen(false)}
              >
                Blogs
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Button className="mt-2 w-full">Get Started</Button>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}

