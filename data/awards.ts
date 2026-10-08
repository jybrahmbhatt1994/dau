import type { AwardsPageData } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const SAMPLE_ROW = {
  studentName: "CHAITANYA MEHUL SHETH",
  publicationMonth: "Jul-25",
  publicationVenue: "IEEE Sensors Journal",
  facultyAuthor: "MANISH KUMAR",
  title:
    "UASPAR: Utility-based Adaptive Sensor Placement and Reconfiguration for Energy Efficient Wireless Sensor Networks",
};

const makeRows = (yearKey: string, count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: `${yearKey}-${i + 1}`,
    ...SAMPLE_ROW,
  }));

export const awardsPageData: AwardsPageData = {
  hero: {
    title: "Awards & Recognition",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    image: img(1200, 500, "awards-hero"),
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Research", href: "/research" },
      { label: "Awards & Recognition", href: "/research/awards" },
    ],
  },

  subNavLabel: "Page Title",
  subNav: [
    { label: "Link 1", href: "#intro" },
    { label: "Link 2", href: "#awardees" },
    { label: "Link 3", href: "#awardees" },
    { label: "Link 4", href: "/research/grants" },
    { label: "Link 5", href: "/research/dean" },
  ],

  intro: [
    "Machine learning and Data science deals with data-aware mathematical models, algorithms and computational tools to manage, analyse and process possibly large scale data for various applications. There are several faculty members at DAIICT working in applications of Machine learning to wide-ranging domains like Image Processing and Computer Vision, Speech Processing, Information Retrieval, Natural Language Processing, Computational Neuroscience, Multimedia Forensics and Security, Biometrics, and Signal Processing and Communication. Faculty also work on core issues in Machine learning like Dimensionality reduction and Adversarial Machine learning. Aspects of Data Science pursued at DAIICT include Modeling Complex networks, Databases and Computational algorithms and tools for simulations on HPC and GPUs. Computing facility at the institute is available in the form of a HPC cluster, apart from GPU's funded by projects. The Speech lab and Information Retrieval lab at DAIICT fall under the umbrella of Machine learning and Data Science.",
  ],

  introButton: {
    label: "View Policy",
    href: "/files/Policy_Student-Research-Excellence-VER_1",
    external: true,
  },

  awardees: {
    title: "List of Awardees",
    years: [
      { year: "2025-26", awardees: makeRows("2025-26", 6) },
      { year: "2024-25", awardees: makeRows("2024-25", 4) },
      { year: "2023-24", awardees: makeRows("2023-24", 4) },
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