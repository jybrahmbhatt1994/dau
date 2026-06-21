import type { FinancialSupportPageData } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const CARD_EXCERPT =
  "Dhirubhai Ambani University (Formerly DA-IICT) has played a pioneering role in developing innovative undergraduate programs";

export const financialSupportPageData: FinancialSupportPageData = {
  hero: {
    title: "Financial Support",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    image: img(1200, 500, "financial-support-hero"),
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Admission", href: "/admission" },
      { label: "Financial Support", href: "/admission/financial-support" },
    ],
  },

  subNavLabel: "Undergraduate Admissions",
  subNav: [
    { label: "DAU Scholarships",   href: "#dau-scholarships" },
    { label: "Other Scholarships", href: "#other-scholarships" },
    { label: "FAQs",               href: "#faqs" },
    { label: "Related Links",      href: "#related" },
  ],

  dauScholarships: {
    title: "DAU Scholarships",
    paragraphs: [
      "A few students admitted to the programs are awarded merit scholarships equivalent to full tuition fees. The Institute shall draw a list of students eligible for merit scholarship based on the admission ranks drawn from Gujarat and All India Categories separately. In addition, few merit-cum-means scholarships are offered to the students with highest ranks subject to a means test.",
    ],
  },

  otherScholarships: {
    title: "Other Scholarships",
    description: "",
    cards: [
      {
        id: "sch1",
        title: "Hon. Chief Minister Scholarship Scheme",
        excerpt: CARD_EXCERPT,
        image: img(600, 400, "scholarship-cm"),
        href: "/admission/scholarships/chief-minister",
      },
      {
        id: "sch2",
        title: "Mukhya Mantri Yuva Swavalamban Yojna",
        excerpt: CARD_EXCERPT,
        image: img(600, 400, "scholarship-mmysy"),
        href: "/admission/scholarships/mmysy",
      },
      {
        id: "sch3",
        title: "Digital Gujarat Portal",
        excerpt: CARD_EXCERPT,
        image: img(600, 400, "scholarship-digital-gujarat"),
        href: "/admission/scholarships/digital-gujarat",
      },
      {
        id: "sch4",
        title: "National Scholarships Portal",
        excerpt: CARD_EXCERPT,
        image: img(600, 400, "scholarship-national"),
        href: "/admission/scholarships/national-portal",
      },
      {
        id: "sch5",
        title: "Post Matric Scholarship",
        excerpt: CARD_EXCERPT,
        image: img(600, 400, "scholarship-post-matric"),
        href: "/admission/scholarships/post-matric",
      },
    ],
  },

  faqs: {
    title: "FAQs",
    items: [
      {
        id: "faq1",
        question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      },
      {
        id: "faq2",
        question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        id: "faq3",
        question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        id: "faq4",
        question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        id: "faq5",
        question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
    ],
  },

  contact: {
    phone: "079 69 08 08 08",
    email: "ug_admissions@dau.ac.in",
  },

  cta: {
    left: {
      title: "Academic Calendar",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "/academics/calendar",
    },
    right: {
      title: "Academic Areas",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "/academics/areas",
    },
  },
};