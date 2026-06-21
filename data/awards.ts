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
    { label: "Link 3", href: "#policy" },
    { label: "Link 4", href: "/research/grants" },
    { label: "Link 5", href: "/research/dean" },
  ],

  intro: [
    "Machine learning and Data science deals with data-aware mathematical models, algorithms and computational tools to manage, analyse and process possibly large scale data for various applications. There are several faculty members at DAIICT working in applications of Machine learning to wide-ranging domains like Image Processing and Computer Vision, Speech Processing, Information Retrieval, Natural Language Processing, Computational Neuroscience, Multimedia Forensics and Security, Biometrics, and Signal Processing and Communication. Faculty also work on core issues in Machine learning like Dimensionality reduction and Adversarial Machine learning. Aspects of Data Science pursued at DAIICT include Modeling Complex networks, Databases and Computational algorithms and tools for simulations on HPC and GPUs. Computing facility at the institute is available in the form of a HPC cluster, apart from GPU's funded by projects. The Speech lab and Information Retrieval lab at DAIICT fall under the umbrella of Machine learning and Data Science.",
  ],

  awardees: {
    title: "List of Awardees",
    years: [
      { year: "2025-26", awardees: makeRows("2025-26", 6) },
      { year: "2024-25", awardees: makeRows("2024-25", 4) },
      { year: "2023-24", awardees: makeRows("2023-24", 4) },
    ],
  },

  policy: {
    title: "Policy",
    introParagraphs: [
      "The Office of Dean (Research) implements policies and procedures relating to the following matters:",
    ],
    bulletGroups: [
      {
        items: [
          "Carrying out /monitoring any sponsored project, consultancy project, including manpower requirement;",
          "Submission of project proposals to the funding agencies.",
        ],
      },
      {
        lead: "All sponsored projects are monitored by an internal committee consisting of the Director, Dean (Research) and PI of the respective project. There is a purchase policy for externally sponsored projects.",
        items: [
          "For capital expenditures of Rs. 20,000/- or above, approval of Dean (Research) is required.",
          "For capital expenditures of Rs. 1 lakh or above, a purchase committee is constituted by Dean (Research).",
        ],
      },
    ],
    outroParagraphs: [
      "The office of Dean (Research) also oversees organisation and /or participation by faculty and research scholars in workshops, seminars and conferences. There is an Institute-wide policy to support presentation of research papers by faculty and research scholars at academic conferences in India or abroad. A Cumulative Professional Development Allowance (CPDA) of Rupees 3 lakhs is earmarked for every block of three years on reimbursable basis to the faculty (after confirmation of their service) for participating in both national and international conferences and workshops.",
      "The office of Dean (Research) also creates awareness of funding opportunities through Institute's Research Promotion Committee. For new faculty, a seed grant of up to Rs. 5 lakhs is granted on approval of the proposal by Dean (Research) through the Institute's Research Promotion Committee.",
      "Dean (Research) office also promotes Entrepreneurship and Innovation. A Centre for Entrepreneurship and Innovation at DA-IICT (CEII) is established at DA-IICT with Dean (Research) as its member of the Board of Governors. CEII has the status of a section 8 Company.",
      "Dean (Research) is the Faculty Convenor of the Research Club, a student club to spread awareness among students about research and help them climb some milestones. It is intended to provide a social setting to stimulate inter-disciplinary research among the student at DA-IICT.",
    ],
    button: {
      label: "Download Policy Document",
      href: "/files/research-policy.pdf",
      external: true,
    },
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