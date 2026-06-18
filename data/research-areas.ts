import type { ResearchAreasPageData } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const researchAreasPageData: ResearchAreasPageData = {
  hero: {
    title: "Research Areas",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    image: img(1200, 500, "research-areas-hero"),
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Research", href: "/research" },
      { label: "Research Areas", href: "/research/areas" },
    ],
  },

  subNavLabel: "Page Title",
  subNav: [
    { label: "Link 1", href: "#intro" },
    { label: "Link 2", href: "#areas" },
    { label: "Link 3", href: "/research/dean" },
    { label: "Link 4", href: "/research/grants" },
    { label: "Link 5", href: "/research/awards" },
  ],

  intro: [
    "Institute administers its responsibilities for the regulation, quality control and supervision of its academic programs through its academic governance structure. The faculty members play an important role, as key stakeholders, in the functioning and oversight of academic processes. While there are no departments, all our programs are supported by faculty members belonging to several academic areas. An academic-area is a coherent cluster of related knowledge domains and the primary objective of the area-wise organization is to share academic responsibilities related to teaching and program administration. In addition, the areas strive to function as nodes of synergy catalyzing collaboration and conversation among their members.",
    "Each faculty is a member of one or more areas depending on their academic interests. Each area has an Area-Coordinator appointed by the Director, on a rotation basis, for a term of two years and acts as a facilitator for the area members. The area-coordinators representing the academic-areas help the Deans to run the academic governance of the institute. The primary objective of such an academic governance structure is to make academic policy and decision making largely consultative, decentralized, inclusive and democratic.",
  ],

  areas: {
    title: "Areas",
    description:
      "Institute administers its responsibilities for the regulation, quality control and supervision of its academic programs through its academic governance structure. The faculty members play an important role, as key stakeholders, in the functioning and oversight of academic processes.",
    cards: [
      {
        id: "area-1",
        title: "AI, ML and Data Science",
        image: img(148, 148, "area-aiml"),
        href: "/research/areas/ai-ml-data-science",
      },
      {
        id: "area-2",
        title: "Algorithms and Theory of computation",
        image: img(148, 148, "area-algo"),
        href: "/research/areas/algorithms-theory",
      },
      {
        id: "area-3",
        title: "Communications and signal processing",
        image: img(148, 148, "area-comm"),
        href: "/research/areas/communications-signal",
      },
      {
        id: "area-4",
        title: "Humanities, Social Sciences and Design",
        image: img(148, 148, "area-hss"),
        href: "/research/areas/humanities-social-design",
      },
      {
        id: "area-5",
        title: "Physics and Mathematical Sciences",
        image: img(148, 148, "area-physics"),
        href: "/research/areas/physics-math",
      },
      {
        id: "area-6",
        title: "Software systems and Networking",
        image: img(148, 148, "area-software"),
        href: "/research/areas/software-networking",
      },
      {
        id: "area-7",
        title: "VLSI and Embedded Systems",
        image: img(148, 148, "area-vlsi"),
        href: "/research/areas/vlsi-embedded",
      },
    ],
  },

  cta: {
    left: {
      title: "Dean (Faculty)",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "/academics/dean",
    },
    right: {
      title: "Faculty List",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "/faculty",
    },
  },
};