import type { TopRecruitersPageData } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

// Logo placeholder — keeps a consistent landscape aspect for the grid cards.
const logo = (seed: string) => img(220, 120, `logo-${seed}`);

// Recruiter names lifted from the Figma. Replace with WP media URLs when CMS
// is live; the grid layout adapts automatically to whatever count is provided.
const RECRUITER_NAMES = [
  "Apple",          "Microsoft",     "Google",        "Amazon",       "Morgan Stanley",
  "DE Shaw & Co",   "Atlassian",     "Flipkart",      "Deutsche Bank","UnifyApps",
  "Barclays",       "Searce",        "TCS",           "Oracle",       "GE",
  "Hashedin",       "Colgate-Palmolive","Futures First","Optum",      "OYO",
  "Jupiter",        "Delhivery",     "KPMG",          "Toplyne",      "Eyesys",
  "Trilogy",        "Toddle",        "MAQ Software",  "Ontic",        "Injala",
  "IBM",            "Tejas Networks","Silicon Labs",  "Infochips",    "Matrix",
  "Shipmints",      "HDFC Bank",     "Hevo",          "Infoanalytica","Intello Labs",
  "Goldman Sachs",  "Sprinklr",      "Texion",        "Bank of America","Clientjoy",
  "Infocusp",       "Media.net",     "Wells Fargo",   "Jio",          "Karza",
  "Graviton",       "LinkedIn",      "Nutanix",       "Skolar",       "BNY",
  "OpsHub",         "Juniper Networks","Intuit",      "Regalo",       "Cloudera",
  "Navi",           "Awaaz.de",      "GSC",           "Zuru",         "Unisys",
  "Infosys",        "Pirimid Fintech","ZS",           "Larsen & Toubro","Gameskraft",
  "Uber",           "Govivace",      "Synopsys",      "BISAG-N",      "Atlan",
  "Panamax",        "Tech Mahindra", "Schneider Electric","Shiprocket","Siemens",
];

export const topRecruitersPageData: TopRecruitersPageData = {
  hero: {
    title: "Top Recruiters",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    image: img(1200, 500, "top-recruiters-hero"),
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Placement", href: "/placements" },
      { label: "Top Recruiters", href: "/placements/recruiters" },
    ],
  },

  subNavLabel: "Page Title",
  subNav: [
    { label: "Link 1", href: "#stats" },
    { label: "Link 2", href: "#recruiters" },
    { label: "Link 3", href: "/placements/stats" },
    { label: "Link 4", href: "/placements/team" },
    { label: "Link 5", href: "/placements/internships" },
  ],

  intro: [
    "Institute administers its responsibilities for the regulation, quality control and supervision of its academic programs through its academic governance structure. The faculty members play an important role, as key stakeholders, in the functioning and oversight of academic processes. While there are no departments, all our programs are supported by faculty members belonging to several academic areas. An academic-area is a coherent cluster of related knowledge domains and the primary objective of the area-wise organization is to share academic responsibilities related to teaching and program administration. In addition, the areas strive to function as nodes of synergy catalyzing collaboration and conversation among their members.",
  ],

  stats: [
    { value: "500+",  label: "Students placed" },
    { value: "600+",  label: "Placement Offers" },
    { value: "124",   label: "Recruiters" },
    { value: "50LPA", label: "Highest salary offered" },
  ],

  recruiters: {
    title: "Recruiters",
    items: RECRUITER_NAMES.map((name, i) => ({
      id: `r-${i + 1}`,
      name,
      logo: logo(name.toLowerCase().replace(/[^a-z0-9]+/g, "-")),
      // href intentionally omitted — cards are non-interactive by default
    })),
  },

  successStories: {
    title: "Success Stories",
    items: [
      {
        id: "s1",
        quote:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
        name: "Student Name",
        year: "2017",
        image: img(640, 800, "tr-story-1"),
      },
      {
        id: "s2",
        quote:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
        name: "Student Name",
        year: "2018",
        image: img(640, 800, "tr-story-2"),
      },
      {
        id: "s3",
        quote:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
        name: "Student Name",
        year: "2019",
        image: img(640, 800, "tr-story-3"),
      },
    ],
  },

  cta: {
    left: {
      // Title-less per Figma
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "/placements/team",
    },
    right: {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "/placements/stats",
    },
  },
};