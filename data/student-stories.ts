import type { CardGridPageData, NewsArticle } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const TITLE = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";

// 18 items → 2 pages at 9/page.
const items: NewsArticle[] = Array.from({ length: 18 }, (_, i) => ({
  id: `ss-${i + 1}`,
  title: TITLE,
  date: "19 Apr, 12:20PM",
  image: img(640, 360, `student-story-${i + 1}`),
  href: `/infocus/student-stories/${i + 1}`,
}));

export const studentStoriesPageData: CardGridPageData = {
  hero: {
    title: "Student Stories",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    image: img(1280, 560, "student-stories-hero"),
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "In Focus", href: "/newsroom" },
      { label: "Student Stories", href: "/newsroom/student-stories" },
    ],
  },

  // NOTE: Figma shows "Page Title" + Link 1–5 (placeholders).
  subNavLabel: "Page Title",
  subNav: [
    { label: "Link 1", href: "#stories" },
    { label: "Link 2", href: "#link-2" },
    { label: "Link 3", href: "#link-3" },
    { label: "Link 4", href: "#link-4" },
    { label: "Link 5", href: "#related" },
  ],

  intro: [
    "Institute administers its responsibilities for the regulation, quality control and supervision of its academic programs through its academic governance structure. The faculty members play an important role, as key stakeholders, in the functioning and oversight of academic processes. While there are no departments, all our programs are supported by faculty members belonging to several academic areas. An academic-area is a coherent cluster of related knowledge domains and the primary objective of the area-wise organization is to share academic responsibilities related to teaching and program administration. In addition, the areas strive to function as nodes of synergy catalyzing collaboration and conversation among their members.",
  ],

  items,

  // Title-less CTA (matches the Figma — description + button only).
  cta: {
    left: {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "/infocus/submit",
    },
    right: {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "/infocus/archive",
    },
  },
};