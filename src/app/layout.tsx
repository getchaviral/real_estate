import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "RealEstate - Find Your Dream Home",
    template: "%s | RealEstate",
  },
  description:
    "Discover premium residential and commercial properties across India's top cities. Find your dream home with India's most trusted real estate platform.",
  keywords: [
    "real estate",
    "property",
    "home",
    "apartments",
    "India",
    "Mumbai",
    "Bangalore",
    "Delhi NCR",
    "Pune",
    "Hyderabad",
    "Chennai",
  ],
  openGraph: {
    title: "RealEstate - Find Your Dream Home",
    description:
      "Discover premium residential and commercial properties across India's top cities.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", inter.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}

