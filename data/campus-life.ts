import type { CampusLifePageData } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

// The Figma uses one placeholder paragraph throughout — kept as a single const.
const LOREM =
  "Institute administers its responsibilities for the regulation, quality control and supervision of its academic programs through its academic governance structure. The faculty members play an important role, as key stakeholders, in the functioning and oversight of academic processes. While there are no departments, all our programs are supported by faculty members belonging to several academic areas. An academic-area is a coherent cluster of related knowledge domains and the primary objective of the area-wise organization is to share academic responsibilities related to teaching and program administration. In addition, the areas strive to function as nodes of synergy catalyzing collaboration and conversation among their members.";

export const campusLifePageData: CampusLifePageData = {
  hero: {
    title: "Campus Life",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    image: img(900, 600, "campus-life-hero"),
  },

  // NOTE (placeholder from Figma): rename "Page Title" + "Link 1–5". Links are
  // wired to the real section anchors below.
  subNavLabel: "Page Title",
  subNav: [
    { label: "Link 1", href: "#student-life" },
    { label: "Link 2", href: "#residence-life" },
    { label: "Link 3", href: "#sports" },
    { label: "Link 4", href: "#student-body" },
    { label: "Link 5", href: "#success-stories" },
  ],

  intro: [LOREM],

  studentLife: {
    id: "student-life",
    title: "Student Life",
    paragraphs: [LOREM],
    afterParagraphs: [LOREM],
    media: {
      kind: "gallery",
      images: [
        img(600, 640, "sl-1"),
        img(600, 640, "sl-2"),
        img(600, 640, "sl-3"),
        img(600, 640, "sl-4"),
        img(600, 640, "sl-5"),
        img(600, 640, "sl-6"),
      ],
    },
  },

  virtualTour: {
    image: img(1600, 800, "virtual-tour"),
    label: "Virtual Tour",
    href: "#",
  },

  residenceLife: {
    id: "residence-life",
    title: "Residence Life",
    paragraphs: [LOREM],
    media: {
      kind: "carousel",
      slides: [
        { image: img(900, 680, "res-1"), caption: "UNIFYAPPS VISIT" },
        { image: img(900, 680, "res-2"), caption: "INDUSTRY MEETUP" },
        { image: img(900, 680, "res-3"), caption: "HOSTEL NIGHT" },
      ],
    },
  },

  sportsFacilities: {
    id: "sports",
    title: "Sports Facilities",
    paragraphs: [LOREM],
    media: {
      kind: "duo",
      images: [img(760, 600, "sports-1"), img(760, 600, "sports-2")],
    },
  },

  clubs: {
    title: "Student Clubs",
    description: "", // title-only heading
    cards: Array.from({ length: 6 }, (_, n) => ({
      id: `club-${n + 1}`,
      title: "Club Name",
      excerpt:
        "Dhirubhai Ambani University (Formerly DA-IICT) has played a pioneering role in developing innovative undergraduate programs",
      image: img(600, 400, `club-${n + 1}`),
      href: "#",
    })),
  },

  studentBody: {
    title: "Student Body Government",
    members: Array.from({ length: 8 }, (_, n) => ({
      id: `sbg-${n + 1}`,
      name: "Faculty Name",
      position: "Position, Department",
      image: img(289, 352, `sbg-${n + 1}`),
      href: "#",
    })),
  },

  ieee: {
    id: "ieee",
    title: "IEEE Branch",
    paragraphs: [LOREM],
    media: {
      kind: "carousel",
      slides: [
        { image: img(900, 680, "ieee-1") },
        { image: img(900, 680, "ieee-2") },
        { image: img(900, 680, "ieee-3") },
      ],
    },
  },

  successStories: {
    title: "Success Stories",
    description: "",
    items: [
      {
        id: "story-1",
        quote:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
        name: "Student Name",
        year: "2017",
        image: img(600, 800, "story-1"),
      },
      {
        id: "story-2",
        quote:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
        name: "Student Name",
        year: "2019",
        image: img(600, 800, "story-2"),
      },
      {
        id: "story-3",
        quote:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
        name: "Student Name",
        year: "2021",
        image: img(600, 800, "story-3"),
      },
      {
        id: "story-4",
        quote:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
        name: "Student Name",
        year: "2023",
        image: img(600, 800, "story-4"),
      },
    ],
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