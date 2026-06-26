import type { AdministrationPageData, LeaderProfileContent } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const INTRO =
  "Dhirubhai Ambani Institute of Information and Communication Technology (DA-IICT), Gandhinagar represents Wave-4 of educational innovation in Gujarat.\nThe first wave was the nationalist wave and led to Gandhian experiments in education including Nai Talim. The Gujarat Vidyapith established in 1920 was a hybrid model of a University based on Gandhian principles.";

const BIO = [
  "Mr. Siddharth Swaminarayan has over four decades of extensive and variegated experience as a direct recruit officer in the Government of Gujarat and an academic administrator of Higher and Professional Institutions of repute (Gujarat University, National Institute of Fashion Technology, National Institute of Design Ahmedabad, and Ahmedabad University).",
  "He has his Bachelor's and Master's Degrees in Commerce from Gujarat University and an MBA from the B K School of Business Management, Ahmedabad.",
  "As an institution builder, he was the key official in setting up NIFT Gandhinagar, Bhopal, and Shillong Campuses; setting up four new NIDs in Vijayawada, Bhopal, Kurukshetra and Jorhat. He was the key resource person in drafting the NIFT Act and the NID Act declaring them as Institutions of National Importance and drafting of First Statutes and Ordinances. He has authored a book on the State Public Administration. He is also visiting faculty in the said subject in Sardar Patel Institute of Public Administration for the pre-service training of direct recruit class 1 and 2 Officers.",
];

const profile = (
  id: string,
  title: string,
  name: string,
  role: string,
): LeaderProfileContent => ({
  id,
  title,
  name,
  role,
  image: img(720, 900, id),
  bio: BIO,
});

export const administrationPageData: AdministrationPageData = {
  hero: {
    title: "Administration",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    image: img(1280, 560, "administration-hero"),
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Administration", href: "/about/administration" },
    ],
  },

  // NOTE: Figma shows "Page Title" + Link 1–5 (placeholders).
  subNavLabel: "Page Title",
  subNav: [
    { label: "Link 1", href: "#registrars-office" },
    { label: "Link 2", href: "#head-hr-admin" },
    { label: "Link 3", href: "#controller-of-examination" },
    { label: "Link 4", href: "#librarian" },
    { label: "Link 5", href: "#office-of-directors" },
  ],

  intro: [INTRO],

  profiles: [
    profile("registrars-office", "Registrar's Office", "Mr. Siddharth Swaminarayan", "Executive Registrar"),
    profile("head-hr-admin", "Head HR & Admin", "Some Name", "Position"),
    profile("controller-of-examination", "Controller of Examination", "Some Name", "Position"),
    profile("librarian", "Librarian", "Some Name", "Position"),
    profile("office-of-director-general", "Office of Director General", "Some Name", "Position"),
    profile("office-of-directors", "Office of Directors", "Some Name", "Position"),
  ],

  diversity: {
    title: "We Are One of The Largest, Most Diverse Universities in India",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
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