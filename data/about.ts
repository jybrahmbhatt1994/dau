import type { AboutPageData } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const VM_BODY =
  "DA-IICT is a place where academic programmes meet research-driven teaching, faculty with rich experience in research, state of the art ICT infrastructure and a vibrant campus life. Our jubilant student fraternity, highly qualified faculty, interdisciplinary curricula, and vibrant campus ambience are tightly interwoven to provide the highest standards of academic excellence and all-round development of its students.";

// "\n" marks a line break inside a block; blank array entries separate blocks.
const INTRO_BLOCK_1 =
  "Dhirubhai Ambani Institute of Information and Communication Technology (DA-IICT), Gandhinagar represents Wave-4 of educational innovation in Gujarat.\nThe first wave was the nationalist wave and led to Gandhian experiments in education including Nai Talim. The Gujarat Vidyapith established in 1920 was a hybrid model of a University based on Gandhian principles.";

const INTRO_BLOCK_2 =
  "The second wave led to the establishment of a whole range of educational institutions in Gujarat, mainly private colleges.\nThe third wave, an inspired one, was spearheaded by the Industrialist Kasturbhai Lalbhai and the Scientist Vikram Sarabhai and led to the establishment of a network of national institutes of international renown. A whole array of remarkable intellectuals provided the leadership of these Institutes.\nIt was in Wave 4 when the focus shifted to higher education and private participation. One of the Institutes created during this period is DA-IICT in 2001. It is the only advanced research and teaching Institute named after the Late Dhirubhai Ambani, the founder of Reliance Group.";

export const aboutPageData: AboutPageData = {
  hero: {
    title: "About DAU",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    image: img(1280, 560, "about-hero"),
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
    ],
  },

  // NOTE: Figma shows "Page Title" + Link 1–5 here (placeholders).
  subNavLabel: "Page Title",
  subNav: [
    { label: "Link 1", href: "#vision" },
    { label: "Link 2", href: "#link-2" },
    { label: "Link 3", href: "#link-3" },
    { label: "Link 4", href: "#link-4" },
    { label: "Link 5", href: "#link-5" },
  ],

  intro: {
    paragraphs: [INTRO_BLOCK_1, INTRO_BLOCK_2],
    vision: { title: "Vision", body: VM_BODY },
    mission: { title: "Mission", body: VM_BODY },
  },

  media: {
    image: img(820, 620, "about-campus"),
    paragraphs: [INTRO_BLOCK_1, INTRO_BLOCK_2],
  },

  diversity: {
    title: "We Are One of The Largest, Most Diverse Universities in India",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
  },

  contact: {
    socialTitle: "Connect on social",
    socialDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    contactTitle: "Contact Us",
    contactDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    phone: "+91-9876543212",
    email: "info@daiict.ac.in",
  },
};