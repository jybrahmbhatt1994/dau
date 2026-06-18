import type { FestEventsPageData } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const LOREM =
  "Institute administers its responsibilities for the regulation, quality control and supervision of its academic programs through its academic governance structure. The faculty members play an important role, as key stakeholders, in the functioning and oversight of academic processes. While there are no departments, all our programs are supported by faculty members belonging to several academic areas. An academic-area is a coherent cluster of related knowledge domains and the primary objective of the area-wise organization is to share academic responsibilities related to teaching and program administration. In addition, the areas strive to function as nodes of synergy catalyzing collaboration and conversation among their members.";

const TITLE = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";

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
    { label: "Link 1", href: "#upcoming-fest" },
    { label: "Link 2", href: "#upcoming-events" },
    { label: "Link 3", href: "#upcoming-fest" },
    { label: "Link 4", href: "#upcoming-events" },
    { label: "Link 5", href: "#upcoming-fest" },
  ],

  intro: [LOREM],

  upcomingFest: {
    title: "Upcoming Fest",
    items: [
      { id: "fest-1", title: TITLE, date: "19 Apr, 12:20PM", image: img(1000, 560, "fest-1"), href: "#" },
      { id: "fest-2", title: TITLE, date: "26 Apr, 06:00PM", image: img(1000, 560, "fest-2"), href: "#" },
      { id: "fest-3", title: TITLE, date: "03 May, 11:00AM", image: img(1000, 560, "fest-3"), href: "#" },
    ],
  },

  upcomingEvents: {
    title: "Upcoming Events",
    // 9 supplied; the grid shows 6, then "Show More" reveals the rest.
    items: Array.from({ length: 9 }, (_, n) => ({
      id: `event-${n + 1}`,
      title: TITLE,
      date: "19 Apr, 12:20PM",
      image: img(600, 380, `event-${n + 1}`),
      href: "#",
    })),
  },

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