import type { FinancialSupportPageData } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const CARD_EXCERPT =
  "Dhirubhai Ambani University (Formerly DA-IICT) has played a pioneering role in developing innovative undergraduate programs";

export const ugScholarshipsPageData: FinancialSupportPageData = {
  hero: {
    title: "Scholarships",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    image: img(1200, 500, "ug-scholarships-hero"),
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Admission", href: "/admission" },
      { label: "Scholarships", href: "/admission/scholarships" },
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
    title: "Scholarships",
    paragraphs: [
      "A few students admitted to the programs are awarded merit scholarships equivalent to full tuition fees. The Institute shall draw a list of students eligible for merit scholarship based on the admission ranks drawn from Gujarat and All India Categories separately. In addition, few merit-cum-means scholarships are offered to the students with highest ranks subject to a means test.",
    ],
  },

  otherScholarships: {
    title: "Scholarships Offered",
    description: "",
    cards: [
      {
        id: "ugsch1",
        title: "B.Tech. Institute Fellowships",
        excerpt: CARD_EXCERPT,
        image: img(600, 400, "ug-scholarship-fellowships"),
        href: "/admission/scholarships/institute-fellowships",
      },
      {
        id: "ugsch2",
        title: "B.Tech. Merit and Merit-cum-Means Scholarships",
        excerpt: CARD_EXCERPT,
        image: img(600, 400, "ug-scholarship-merit"),
        href: "/admission/scholarships/merit-scholarships",
      },
      {
        id: "ugsch3",
        title: "Jai Jhulelal Scholarships for B.Tech. Students",
        excerpt: CARD_EXCERPT,
        image: img(600, 400, "ug-scholarship-jai-jhulelal"),
        href: "/admission/scholarships/jai-jhulelal",
      },
      {
        id: "ugsch4",
        title: "The Satnaam WaheGuruji Scholarship",
        excerpt: CARD_EXCERPT,
        image: img(600, 400, "ug-scholarship-satnaam"),
        href: "/admission/scholarships/satnaam-waheguruji",
      },
      {
        id: "ugsch5",
        title: "Alumni Sponsored Scholarship",
        excerpt: CARD_EXCERPT,
        image: img(600, 400, "ug-scholarship-alumni"),
        href: "/admission/scholarships/alumni-sponsored",
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