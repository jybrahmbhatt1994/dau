import type { FestEventsPageData } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const LOREM =
  "Institute administers its responsibilities for the regulation, quality control and supervision of its academic programs through its academic governance structure. The faculty members play an important role, as key stakeholders, in the functioning and oversight of academic processes. While there are no departments, all our programs are supported by faculty members belonging to several academic areas. An academic-area is a coherent cluster of related knowledge domains and the primary objective of the area-wise organization is to share academic responsibilities related to teaching and program administration. In addition, the areas strive to function as nodes of synergy catalyzing collaboration and conversation among their members.";

export const festEventsPageData: FestEventsPageData = {
  hero: {
    title: "Fest & Events",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    image: img(900, 600, "fest-events-hero"),
  },

  // NOTE (placeholder from Figma): rename "Page Title" + "Link 1–5".
  subNavLabel: "Page Title",
  subNav: [
    { label: "Link 1", href: "#fest-events-grid" },
    { label: "Link 2", href: "#fest-events-grid" },
    { label: "Link 3", href: "#fest-events-grid" },
    { label: "Link 4", href: "#fest-events-grid" },
    { label: "Link 5", href: "#fest-events-grid" },
  ],

  intro: [LOREM],

  // Manually curated grid — image + button, admin-entered in ACF (not
  // fetched from any CPT).
  cards: [
    { id: "0", image: img(600, 600, "fest-1"), buttonLabel: "Show More", href: "#", newTab: false },
    { id: "1", image: img(600, 600, "fest-2"), buttonLabel: "Show More", href: "#", newTab: false },
    { id: "2", image: img(600, 600, "event-1"), buttonLabel: "Show More", href: "#", newTab: false },
    { id: "3", image: img(600, 600, "event-2"), buttonLabel: "Show More", href: "#", newTab: false },
  ],

  cta: {
    left: {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "#",
    },
    right: {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "#",
    },
  },
};