export const siteConfig = {
  name: "Baby Care Guide",
  tagline: "Complete Newborn & Infant Care for New Parents",
  description:
    "Expert baby care guides covering sleep training, feeding, development milestones, and essential gear. Trusted by thousands of new parents.",
  url: "https://baby.chparenting.com",
  lang: "en",
  locale: "en_US",
  author: "Baby Care Guide Team",
  verification: {
    google: "YOUR_GSC_VERIFICATION_CODE",
  },
  analytics: {
    ga4: "",
  },
  adsense: {
    client: "ca-pub-3493526929407874",
    enabled: true,
  },
  colors: {
    primary: "#3B82F6",
    primaryDark: "#1D4ED8",
    accent: "#D1FAE5",
    background: "#F8FAFC",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Sleep", href: "/sleep/" },
    { label: "Names", href: "/names/" },
    { label: "Feeding", href: "/feeding/" },
    { label: "Gear", href: "/gear/" },
    { label: "Development", href: "/development/" },
    { label: "Tools", href: "/tools/" },
  ],
  sister: {
    pregnancy: "https://pregnancy.chparenting.com",
  },
};

export type SiteConfig = typeof siteConfig;
