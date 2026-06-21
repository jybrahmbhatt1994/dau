import type { PlacementStatsPageData } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const placementStatsPageData: PlacementStatsPageData = {
  hero: {
    title: "Placement Stats",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    image: img(1200, 500, "placement-stats-hero"),
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Placement", href: "/placements" },
      { label: "Placement Stats", href: "/placements/stats" },
    ],
  },

  subNavLabel: "Page Title",
  subNav: [
    { label: "Link 1", href: "#ug-placements" },
    { label: "Link 2", href: "#pg-placements" },
    { label: "Link 3", href: "#success-stories" },
    { label: "Link 4", href: "/placements/recruiters" },
    { label: "Link 5", href: "/placements/internships" },
  ],

  intro: [
    "Institute administers its responsibilities for the regulation, quality control and supervision of its academic programs through its academic governance structure. The faculty members play an important role, as key stakeholders, in the functioning and oversight of academic processes. While there are no departments, all our programs are supported by faculty members belonging to several academic areas. An academic-area is a coherent cluster of related knowledge domains and the primary objective of the area-wise organization is to share academic responsibilities related to teaching and program administration. In addition, the areas strive to function as nodes of synergy catalyzing collaboration and conversation among their members.",
  ],

  gallery: {
    images: [
      img(800, 600, "place-gal-1"),
      img(800, 600, "place-gal-2"),
      img(800, 600, "place-gal-3"),
      img(800, 600, "place-gal-4"),
      img(800, 600, "place-gal-5"),
      img(800, 600, "place-gal-6"),
      img(800, 600, "place-gal-7"),
      img(800, 600, "place-gal-8"),
    ],
  },

  ugPlacements: {
    id: "ug-placements",
    title: "UG Placements",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    legend: {
      highestLabel: "Highest",
      averageLabel: "Average",
    },
    buckets: [
      { label: "2025-26", highest: 57,   average: 14.3 },
      { label: "2024-25", highest: 91.9, average: 17.6 },
      { label: "2023-24", highest: 55.5, average: 18.2 },
    ],
  },

  pgPlacements: {
    id: "pg-placements",
    title: "PG Placements",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    legend: {
      highestLabel: "Highest",
      averageLabel: "Average",
    },
    buckets: [
      { label: "2025-26", highest: 57,   average: 14.3 },
      { label: "2024-25", highest: 91.9, average: 17.6 },
      { label: "2023-24", highest: 55.5, average: 18.2 },
    ],
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
        image: img(640, 800, "story-1"),
      },
      {
        id: "s2",
        quote:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
        name: "Student Name",
        year: "2018",
        image: img(640, 800, "story-2"),
      },
      {
        id: "s3",
        quote:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
        name: "Student Name",
        year: "2019",
        image: img(640, 800, "story-3"),
      },
    ],
  },

  cta: {
    left: {
      // No title — title-less CTA per Figma
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "/placements/team",
    },
    right: {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "/placements/recruiters",
    },
  },
};