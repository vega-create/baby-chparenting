export const siteConfig = {
  name: "Baby Care Guide",
  tagline: "Trusted by Parents. Loved by Babies.",
  shortTagline: "Complete Baby Care Guide",
  description:
    "Expert baby care guides covering sleep training, feeding, development milestones, and essential gear. Trusted by thousands of new parents.",
  url: "https://baby.chparenting.com",
  lang: "en",
  locale: "en_US",
  author: "Baby Care Guide Team",
  analytics: {
    ga4: "G-EEXQ89S184",
    metaPixel: "1618211680314049",
  },
  adsense: {
    client: "ca-pub-3493526929407874",
    enabled: true,
  },
  // 2026 redesign palette — soft sky-blue + cream + pastel accents.
  colors: {
    primary: "#5B9BD5",         // Hero CTA + brand
    primaryDark: "#2E6FB8",     // Hover + heading dark
    primaryLight: "#E6F0FB",    // Soft tint / pill bg
    background: "#FBFCFE",      // Cream-tinged page bg
    cardBg: "#FFFFFF",          // White cards
    text: "#1E3A5F",            // Heading navy
    textMuted: "#6B7B91",       // Body muted
    softYellow: "#FFE9B3",
    softGreen:  "#CDE9D6",
    softPink:   "#FBD7DD",
    softPurple: "#DCD3F0",
  },
  // 7-item primary nav — Sleep, Feeding, Development, Gear, Tools, Blog, About.
  nav: [
    { label: "Sleep",       href: "/sleep/" },
    { label: "Feeding",     href: "/feeding/" },
    { label: "Development", href: "/development/" },
    { label: "Gear",        href: "/gear/" },
    { label: "Tools",       href: "/tools/", hasDropdown: true },
    { label: "Blog",        href: "/blog/" },
    { label: "About",       href: "/about/" },
  ],
  // Tools dropdown — grouped by category for the header mega-menu.
  // Color matches the per-category icon on the Tools page.
  toolsMenu: [
    {
      group: "Sleep", color: "#5B9BD5", icon: "moon",
      items: [
        { label: "Sleep Tracker",      href: "/tools/sleep-tracker/" },
        { label: "Bedtime Calculator", href: "/tools/bedtime-calculator/" },
        { label: "White Noise",        href: "/tools/white-noise/" },
      ],
    },
    {
      group: "Feeding", color: "#7BC0A0", icon: "bottle",
      items: [
        { label: "Feeding Timer",      href: "/tools/feeding-timer/" },
        { label: "Bottle Calculator",  href: "/tools/bottle-calculator/" },
        { label: "Solids Readiness",   href: "/tools/solids-readiness/" },
      ],
    },
    {
      group: "Growth & Development", color: "#E8B86E", icon: "ruler",
      items: [
        { label: "Growth Calculator",  href: "/tools/growth-calculator/" },
        { label: "Milestone Checker",  href: "/tools/milestone-checker/" },
        { label: "Tummy Time Tracker", href: "/tools/tummy-time/" },
        { label: "Language Quiz",      href: "/tools/language-quiz/" },
      ],
    },
    {
      group: "Names", color: "#A89BD4", icon: "blocks",
      items: [
        { label: "Name Generator",     href: "/tools/name-generator/" },
        { label: "Sibling Names",      href: "/tools/sibling-names/" },
        { label: "Name Trends",        href: "/tools/name-trends/" },
      ],
    },
    {
      group: "Gear & Safety", color: "#B68C73", icon: "stroller",
      items: [
        { label: "Diaper Size Guide",  href: "/tools/diaper-size/" },
        { label: "Car Seat Finder",    href: "/tools/car-seat-finder/" },
      ],
    },
  ],
  // Top-right header CTA.
  parentsCtaUrl:   "/about/",
  parentsCtaLabel: "For Parents",
  // Footer column groupings.
  footerColumns: {
    guides: [
      { label: "Sleep Guide",       href: "/sleep/" },
      { label: "Feeding Guide",     href: "/feeding/" },
      { label: "Development Guide", href: "/development/" },
      { label: "Gear Guide",        href: "/gear/" },
    ],
    tools: [
      { label: "Sleep Tracker",     href: "/tools/sleep-tracker/" },
      { label: "Feeding Timer",     href: "/tools/feeding-timer/" },
      { label: "Growth Tracker",    href: "/tools/growth-tracker/" },
      { label: "Milestone Tracker", href: "/tools/milestone-tracker/" },
      { label: "Name Generator",    href: "/names/" },
    ],
    resources: [
      { label: "Blog",         href: "/blog/" },
      { label: "About Us",     href: "/about/" },
      { label: "For Parents",  href: "/about/" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy/" },
      { label: "Terms of Use",   href: "/terms/" },
      { label: "Disclaimer",     href: "/privacy/#disclaimer" },
    ],
  },
  social: {
    facebook:  "https://www.facebook.com/chparenting",
    instagram: "https://www.instagram.com/chparenting/",
    pinterest: "https://www.pinterest.com/chparenting/",
    youtube:   "https://www.youtube.com/@chparenting",
  },
  sister: {
    pregnancy: "https://pregnancy.chparenting.com",
  },
};

export type SiteConfig = typeof siteConfig;
