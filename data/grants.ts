import type { GrantsPageData } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const GRANT_DESC =
  "Dhirubhai Ambani University (Formerly DA-IICT) has played a pioneering role in developing innovative undergraduate programs in Information and Communication Technology (ICT) in India since 2001. The pedagogy of ICT discipline should make a well-integration of Information Technology, Communication Technology.";

export const grantsPageData: GrantsPageData = {
  hero: {
    title: "Grants & Projects",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    image: img(1200, 500, "grants-hero"),
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Research", href: "/research" },
      { label: "Grants & Projects", href: "/research/grants" },
    ],
  },

  subNavLabel: "Page Title",
  subNav: [
    { label: "Link 1", href: "#intro" },
    { label: "Link 2", href: "#grants" },
    { label: "Link 3", href: "#sponsored" },
    { label: "Link 4", href: "/research/awards" },
    { label: "Link 5", href: "/research/dean" },
  ],

  intro: [
    "Machine learning and Data science deals with data-aware mathematical models, algorithms and computational tools to manage, analyse and process possibly large scale data for various applications. There are several faculty members at DAIICT working in applications of Machine learning to wide-ranging domains like Image Processing and Computer Vision, Speech Processing, Information Retrieval, Natural Language Processing, Computational Neuroscience, Multimedia Forensics and Security, Biometrics, and Signal Processing and Communication. Faculty also work on core issues in Machine learning like Dimensionality reduction and Adversarial Machine learning. Aspects of Data Science pursued at DAIICT include Modeling Complex networks, Databases and Computational algorithms and tools for simulations on HPC and GPUs. Computing facility at the institute is available in the form of a HPC cluster, apart from GPU's funded by projects. The Speech lab and Information Retrieval lab at DAIICT fall under the umbrella of Machine learning and Data Science.",
  ],

  tabs: [
    {
      tabLabel: "Available Grants",
      sectionTitle: "Available Grants",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
      cards: [
        {
          id: "ag1",
          name: "Grant Name",
          description: GRANT_DESC,
          applyLabel: "Apply",
          applyHref: "/research/grants/apply/1",
        },
        {
          id: "ag2",
          name: "Grant Name",
          description: GRANT_DESC,
          applyLabel: "Apply",
          applyHref: "/research/grants/apply/2",
        },
        {
          id: "ag3",
          name: "Grant Name",
          description: GRANT_DESC,
          applyLabel: "Apply",
          applyHref: "/research/grants/apply/3",
        },
        {
          id: "ag4",
          name: "Grant Name",
          description: GRANT_DESC,
          applyLabel: "Apply",
          applyHref: "/research/grants/apply/4",
        },
      ],
    },
    {
      tabLabel: "Past Grants",
      sectionTitle: "Past Grants",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
      cards: [
        {
          id: "pg1",
          name: "Grant Name",
          description: GRANT_DESC,
          applyLabel: "View",
          applyHref: "/research/grants/past/1",
        },
        {
          id: "pg2",
          name: "Grant Name",
          description: GRANT_DESC,
          applyLabel: "View",
          applyHref: "/research/grants/past/2",
        },
        {
          id: "pg3",
          name: "Grant Name",
          description: GRANT_DESC,
          applyLabel: "View",
          applyHref: "/research/grants/past/3",
        },
      ],
    },
  ],

  sponsored: {
    title: "Sponsored Research",
    projects: [
      {
        id: "sr1",
        pi: "Prof. Anil Roy / Prof. Bakul Gohel",
        title: 'Development of Proof of Concept of "Optical Camera-based Smart Navigation System for Assisting Total Knee Arthroplasty"',
        fundingAgency: "Gujarat Gas Ltd. Through GCSRA",
        duration: "Feb 2023 to ongoing",
        amount: "52,75,308 INR",
      },
      {
        id: "sr2",
        pi: "Prof. Anil Roy / Prof. Bakul Gohel",
        title: 'Development of Proof of Concept of "Optical Camera-based Smart Navigation System for Assisting Total Knee Arthroplasty"',
        fundingAgency: "Gujarat Gas Ltd. Through GCSRA",
        duration: "Feb 2023 to ongoing",
        amount: "52,75,308 INR",
      },
      {
        id: "sr3",
        pi: "Prof. Anil Roy / Prof. Bakul Gohel",
        title: 'Development of Proof of Concept of "Optical Camera-based Smart Navigation System for Assisting Total Knee Arthroplasty"',
        fundingAgency: "Gujarat Gas Ltd. Through GCSRA",
        duration: "Feb 2023 to ongoing",
        amount: "52,75,308 INR",
      },
      {
        id: "sr4",
        pi: "Prof. Anil Roy / Prof. Bakul Gohel",
        title: 'Development of Proof of Concept of "Optical Camera-based Smart Navigation System for Assisting Total Knee Arthroplasty"',
        fundingAgency: "Gujarat Gas Ltd. Through GCSRA",
        duration: "Feb 2023 to ongoing",
        amount: "52,75,308 INR",
      },
      {
        id: "sr5",
        pi: "Prof. Anil Roy / Prof. Bakul Gohel",
        title: 'Development of Proof of Concept of "Optical Camera-based Smart Navigation System for Assisting Total Knee Arthroplasty"',
        fundingAgency: "Gujarat Gas Ltd. Through GCSRA",
        duration: "Feb 2023 to ongoing",
        amount: "52,75,308 INR",
      },
      {
        id: "sr6",
        pi: "Prof. Anil Roy / Prof. Bakul Gohel",
        title: 'Development of Proof of Concept of "Optical Camera-based Smart Navigation System for Assisting Total Knee Arthroplasty"',
        fundingAgency: "Gujarat Gas Ltd. Through GCSRA",
        duration: "Feb 2023 to ongoing",
        amount: "52,75,308 INR",
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