import type { InternshipsPageData } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const internshipsPageData: InternshipsPageData = {
  hero: {
    title: "Internships",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    image: img(1200, 500, "internships-hero"),
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Placement", href: "/placements" },
      { label: "Internships", href: "/placements/internships" },
    ],
  },

  subNavLabel: "Page Title",
  subNav: [
    { label: "Link 1", href: "#apply" },
    { label: "Link 2", href: "#intro" },
    { label: "Link 3", href: "/placements/stats" },
    { label: "Link 4", href: "/placements/recruiters" },
    { label: "Link 5", href: "/placements/team" },
  ],

  applyBanner: {
    text: "Interested in internship?",
    cta: "Apply Now",
    href: "/placements/internships/apply",
  },

  intro: [
    "Institute administers its responsibilities for the regulation, quality control and supervision of its academic programs through its academic governance structure. The faculty members play an important role, as key stakeholders, in the functioning and oversight of academic processes. While there are no departments, all our programs are supported by faculty members belonging to several academic areas. An academic-area is a coherent cluster of related knowledge domains and the primary objective of the area-wise organization is to share academic responsibilities related to teaching and program administration. In addition, the areas strive to function as nodes of synergy catalyzing collaboration and conversation among their members.",
  ],

  carousel: {
    slides: [
      { image: img(960, 600, "intern-1"), caption: "UnifyApps Visit" },
      { image: img(960, 600, "intern-2"), caption: "Microsoft Research India" },
      { image: img(960, 600, "intern-3"), caption: "TCS Innovation Lab" },
      { image: img(960, 600, "intern-4"), caption: "Goldman Sachs Engineering" },
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
      href: "/placements/recruiters",
    },
  },
};