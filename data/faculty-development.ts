import type { FacultyDevelopmentPageData } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const COMMON_PARA =
  "Institute administers its responsibilities for the regulation, quality control and supervision of its academic programs through its academic governance structure. The faculty members play an important role, as key stakeholders, in the functioning and oversight of academic processes. While there are no departments, all our programs are supported by faculty members belonging to several academic areas. An academic-area is a coherent cluster of related knowledge domains and the primary objective of the area-wise organization is to share academic responsibilities related to teaching and program administration. In addition, the areas strive to function as nodes of synergy catalyzing collaboration and conversation among their members.";

const PARA_LITE =
  "Institute administers its responsibilities for the regulation, quality control and supervision of its academic programs through its academic governance structure. The faculty members play an important role, as key stakeholders, in the functioning and oversight of academic processes.";

const POLICY_DESC =
  "Dhirubhai Ambani University (Formerly DA-IICT), Gandhinagar represents Wave-4 of educational innovation in Gujarat. The first wave was the nationalist wave and led to Gandhian experiments in education including Nai Talim. The Gujarat Vidyapith established in 1920 was a hybrid model of a University based on Gandhian principles.";

export const facultyDevelopmentPageData: FacultyDevelopmentPageData = {
  hero: {
    title: "Faculty Development & Evaluation",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    image: img(1200, 500, "faculty-development-hero"),
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Faculty", href: "/faculty" },
      { label: "Faculty Development & Evaluation", href: "/faculty/development" },
    ],
  },

  subNavLabel: "Page Title",
  subNav: [
    { label: "Link 1", href: "#fdps" },
    { label: "Link 2", href: "#enhancement" },
    { label: "Link 3", href: "#industry" },
    { label: "Link 4", href: "#evaluation" },
    { label: "Link 5", href: "#policy-guidelines" },
  ],

  intro: [COMMON_PARA],

  fdps: {
    title: "Faculty Development Programs (FDPs)",
    introParagraphs: [COMMON_PARA],
    bulletGroups: [
      {
        items: [
          "Regular workshops, seminars, and training sessions",
          "Topics: pedagogy, emerging technologies, research methods, industry trends",
          "Internal and external expert-led sessions",
        ],
      },
    ],
    outroParagraphs: [],
    // No `button` — PolicySection's button is optional
  },

  enhancement: {
    title: "Teaching & Learning Enhancement",
    description: COMMON_PARA,
    cards: [
      {
        id: "e1",
        title: "Innovative teaching methodologies (case-based learning, experiential learning)",
        image: img(160, 160, "enhance-1"),
        href: "/faculty/development/methodologies",
      },
      {
        id: "e2",
        title: "Use of digital tools, LMS platforms, and AI-enabled teaching aids",
        image: img(160, 160, "enhance-2"),
        href: "/faculty/development/digital-tools",
      },
      {
        id: "e3",
        title: "Curriculum design and outcome-based education (OBE) training",
        image: img(160, 160, "enhance-3"),
        href: "/faculty/development/curriculum-design",
      },
    ],
  },

  industry: {
    title: "Industry Exposure & Collaboration",
    introParagraphs: [COMMON_PARA],
    bullets: [
      "Faculty internships/immersion programs in industry",
      "Participation in industry conferences and conclaves",
      "Guest lectures and collaborative projects",
    ],
    outroParagraphs: [],
    slides: [
      { image: img(960, 600, "industry-1"), caption: "UnifyApps Visit" },
      { image: img(960, 600, "industry-2"), caption: "Microsoft Research India" },
      { image: img(960, 600, "industry-3"), caption: "TCS Innovation Lab" },
    ],
  },

  evaluation: {
    title: "Faculty Evaluation",
    intro: COMMON_PARA,
    blocks: [
      {
        heading: "Transparent and structured performance evaluation system",
        paragraphs: [POLICY_DESC],
      },
      {
        heading: "Multi-dimensional approach (teaching, research, service, industry engagement)",
        paragraphs: [POLICY_DESC],
      },
    ],
  },

  teachingEffectiveness: {
    title: "Teaching Effectiveness",
    intro: COMMON_PARA,
    cards: [
      { id: "te1", label: "Student feedback (course-wise, semester-wise)", image: img(180, 180, "te-1") },
      { id: "te2", label: "Peer review of teaching",                         image: img(180, 180, "te-2") },
      { id: "te3", label: "Classroom observation and audits",                image: img(180, 180, "te-3") },
    ],
  },

  continuousImprovement: {
    title: "Continuous Improvement",
    intro: PARA_LITE,
    blocks: [
      {
        heading: "Feedback-driven development plans",
        paragraphs: [POLICY_DESC],
      },
      {
        heading: "Training recommendations based on evaluation outcomes",
        paragraphs: [POLICY_DESC],
      },
    ],
  },

  policyGuidelines: {
    title: "Policy & Guidelines",
    cards: [
      {
        id: "p1",
        title: "Faculty development policy document",
        description: POLICY_DESC,
        ctaLabel: "Know More",
        ctaHref: "/faculty/development/policy",
      },
      {
        id: "p2",
        title: "Evaluation and appraisal guidelines",
        description: POLICY_DESC,
        ctaLabel: "Know More",
        ctaHref: "/faculty/development/appraisal",
      },
      {
        id: "p3",
        title: "Code of conduct and ethics",
        description: POLICY_DESC,
        ctaLabel: "Know More",
        ctaHref: "/faculty/development/code-of-conduct",
      },
    ],
  },

  highlights: {
    title: "Awards & Highlights",
    items: [
      {
        id: "h1",
        image: img(340, 256, "hl-1"),
        date: "28 Mar, 2026",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        href: "/news/1",
      },
      {
        id: "h2",
        image: img(340, 256, "hl-2"),
        date: "28 Mar, 2026",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        href: "/news/2",
      },
      {
        id: "h3",
        image: img(340, 256, "hl-3"),
        date: "28 Mar, 2026",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        href: "/news/3",
      },
      {
        id: "h4",
        image: img(340, 256, "hl-4"),
        date: "28 Mar, 2026",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        href: "/news/4",
      },
    ],
  },

  diversity: {
    title: "We Are One of The Largest, Most Diverse Universities in India",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
  },

  contact: {
    socialTitle: "Connect on social",
    socialDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    linkedinUrl: "#",   // ← add this
    xUrl: "#",          // ← add this
    contactTitle: "Contact Us",
    contactDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    phone: "+91-9876543212",
    email: "info@daiict.ac.in",
  },
};