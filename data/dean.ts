import type { DeanPageData } from "@/lib/types";

/** picsum placeholder helper (same pattern as data/home.ts / data/academics.ts). */
const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const deanPageData: DeanPageData = {
  hero: {
    title: "Office of Dean",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    image: img(1280, 560, "dean-hero"),
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Academics", href: "/academics" },
      { label: "Office of Dean", href: "/academics/dean" },
    ],
  },

  subNav: [
    { label: "Message from Dean's Desk", href: "#message" },
    { label: "Officials", href: "#officials" },
    { label: "Related Links", href: "#related" },
  ],

  desk: {
    title: "Message from Dean's Desk",
    paragraphs: [
      "DA-IICT is a place where academic programmes meet research-driven teaching, faculty with rich experience in research, state of the art ICT infrastructure and a vibrant campus life. Our jubilant student fraternity, highly qualified faculty, interdisciplinary curricula, and vibrant campus ambience are tightly interwoven to provide the highest standards of academic excellence and all-round development of its students. The strength of our academic programs lies in the interdisciplinary teaching-learning process backed by a strong research-driven training. Our graduates are equipped with strong foundational knowledge, skilled in advanced tools and technologies, and carry prodigious personality to aptly represent themselves as successful leaders in our society and contribute towards the betterment of humanity.",
      "I invite you to visit our campus and interact with our faculty, staff and students, and experience the enriching academic and research ambience of the institute.",
    ],
    image: img(720, 820, "dean-portrait"),
    functionsTitle: "Functions of Office of the Dean",
    functionsParagraphs: [
      "DA-IICT is a place where academic programmes meet research-driven teaching, faculty with rich experience in research, state of the art ICT infrastructure and a vibrant campus life. Our jubilant student fraternity, highly qualified faculty, interdisciplinary curricula, and vibrant campus ambience are tightly interwoven to provide the highest standards of academic excellence and all-round development of its students. The strength of our academic programs lies in the interdisciplinary teaching-learning process backed by a strong research-driven training. Our graduates are equipped with strong foundational knowledge, skilled in advanced tools and technologies, and carry prodigious personality to aptly represent themselves as successful leaders in our society and contribute towards the betterment of humanity.",
      "I invite you to visit our campus and interact with our faculty, staff and students, and experience the enriching academic and research ambience of the institute.",
    ],
    email: "dean_ap@dau.ac.in",
  },

  officials: {
    title: "Officials",
    people: [
      {
        id: "jalpesh-pandya",
        name: "Mr. Jalpesh Pandya",
        position: "Deputy Registrar (Academic)",
        email: "deputy-registrar@dau.ac.in",
        phone: "(+91) 079-68261732",
        image: img(580, 680, "official-1"),
      },
      {
        id: "pritesh-panchal",
        name: "Mr. Pritesh Panchal",
        position: "Executive Assistant, Dean (AP)",
        email: "dean-ap_office@dau.ac.in",
        phone: "(+91) 079-68261733",
        image: img(580, 680, "official-2"),
      },
    ],
  },

  cta: {
    calendar: {
      title: "Academic Calendar",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "/academics/calendar",
    },
    areas: {
      title: "Academic Areas",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "/academics/areas",
    },
  },
};