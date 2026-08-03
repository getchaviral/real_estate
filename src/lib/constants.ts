export const SITE_CONFIG = {
  name: "RealEstate",
  tagline: "Find Your Dream Home",
  description:
    "Discover premium residential and commercial properties across India's top cities.",
  email: "hello@realestate.com",
  phone: "+91 1800-123-4567",
  address: "YouWe Homes Realtech, B 94, B Block, Sector 151 Noida",
  reraNumber: "UPRERAAGT21978",
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
  },
} as const;

export const PROJECT_STATUS_LABELS: Record<string, string> = {
  "ready-to-move": "Ready to Move",
  "under-construction": "Under Construction",
  "new-launch": "New Launch",
  upcoming: "Upcoming",
  "pre-launch": "Pre-Launch",
} as const;

export const PROJECT_CATEGORY_LABELS: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial",
} as const;

