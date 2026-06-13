import type { AcademicsData } from "@/lib/types";

/**
 * Placeholder image helper (same pattern as data/home.ts `img()`).
 * picsum.photos must be allowed in next.config.mjs → images.remotePatterns.
 * Swap these for real `public/` assets or WP media when wiring the backend.
 */
const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const LOREM =
  "Dhirubhai Ambani University (Formerly DA-IICT) has played a pioneering role in developing innovative undergraduate programs";

export const academicsData: AcademicsData = {
  hero: {
    title: "Academics",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    image: img(1280, 560, "academics-hero"),
    // Breadcrumb is optional; the design uses the anchor sub-nav instead.
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Academics", href: "/academics" },
    ],
  },

  subNav: [
    { label: "Office of Dean", href: "#dean" },
    { label: "Schools", href: "#schools" },
    { label: "Academic Areas", href: "#areas" },
    { label: "Academic Support", href: "#support" },
    { label: "Related Links", href: "#related" },
  ],

  dean: {
    title: "Message from the Desk of Dean Academic Programs",
    paragraphs: [
      "DA-IICT is a place where academic programmes meet research-driven teaching, faculty with rich experience in research, state of the art ICT infrastructure and a vibrant campus life. Our jubilant student fraternity, highly qualified faculty, interdisciplinary curricula, and vibrant campus ambience are tightly interwoven to provide the highest standards of academic excellence and all-round development of its students. The strength of our academic programs lies in the interdisciplinary teaching-learning process backed by a strong research-driven training. Our graduates are equipped with strong foundational knowledge, skilled in advanced tools and technologies, and carry prodigious personality to aptly represent themselves as successful leaders in our society and contribute towards the betterment of humanity.",
      "I invite you to visit our campus and interact with our faculty, staff and students, and experience the enriching academic and research ambience of the institute.",
    ],
    email: "dean_ap@daiict.ac.in",
    image: img(700, 800, "academics-dean"),
  },

  schools: {
    title: "Schools",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    cards: [
      {
        id: "sot",
        title: "School Of Technology",
        image: img(1280, 540, "school-tech"),
        href: "/academics/sot",
      },
      {
        id: "sol",
        title: "School Of Law",
        image: img(1280, 540, "school-law"),
        href: "/academics/sol",
      },
    ],
  },

  programs: {
    title: "Academics",
    description:
      "Dhirubhai Ambani University (Formerly DA-IICT) has played a pioneering role in developing innovative undergraduate programs in Information and Communication Technology (ICT) in India since 2001. The pedagogy of ICT discipline should make a well-integration of Information Technology, Communication Technology.",
    cards: [
      { id: "ug", title: "Undergraduate Programs", excerpt: LOREM, image: img(732, 488, "prog-ug"), href: "/academics/ug-programs" },
      { id: "dual", title: "Dual Degree Programs", excerpt: LOREM, image: img(732, 488, "prog-dual"), href: "/academics/dual-degree" },
      { id: "pg", title: "Postgraduate Programs", excerpt: LOREM, image: img(732, 488, "prog-pg"), href: "/academics/pg-programs" },
      { id: "phd", title: "Doctoral Programs", excerpt: LOREM, image: img(732, 488, "prog-phd"), href: "/academics/doctoral" },
    ],
  },

  areas: {
    title: "Academic Areas",
    description:
      "Institute administers its responsibilities for the regulation, quality control and supervision of its academic programs through its academic governance structure. The faculty members play an important role, as key stakeholders, in the functioning and oversight of academic processes. While there are no departments, all our programs are supported by faculty members belonging to several academic areas. An academic-area is a coherent cluster of related knowledge domains and the primary objective of the area-wise organization is to share academic responsibilities related to teaching and program administration. In addition, the areas strive to function as nodes of synergy catalyzing collaboration and conversation among their members.",
    cards: [
      { id: "cs", title: "Computer Science", image: img(300, 300, "area-cs"), href: "/academics/areas/computer-science" },
      { id: "csp", title: "Communication and Signal Processing", image: img(300, 300, "area-csp"), href: "/academics/areas/communication-signal-processing" },
      { id: "vlsi", title: "Electronics and VLSI", image: img(300, 300, "area-vlsi"), href: "/academics/areas/electronics-vlsi" },
      { id: "hss", title: "Humanities and Social Sciences", image: img(300, 300, "area-hss"), href: "/academics/areas/humanities-social-sciences" },
      { id: "phy", title: "Physics", image: img(300, 300, "area-phy"), href: "/academics/areas/physics" },
      { id: "math", title: "Mathematics", image: img(300, 300, "area-math"), href: "/academics/areas/mathematics" },
      { id: "design", title: "Design", image: img(300, 300, "area-design"), href: "/academics/areas/design" },
    ],
  },

  support: {
    title: "Academic Support",
    cards: [
      { id: "resource", title: "Resource Centre", excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: img(844, 460, "support-resource"), href: "/academics/support/resource-centre" },
      { id: "software", title: "Software Labs", excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: img(844, 460, "support-software"), href: "/academics/support/software-labs" },
      { id: "hardware", title: "Hardware Labs", excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: img(844, 460, "support-hardware"), href: "/academics/support/hardware-labs" },
      { id: "studios", title: "Design Studios", excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: img(844, 460, "support-studios"), href: "/academics/support/design-studios" },
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
    catalogue: {
      title: "Course Catalogue",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "/academics/course-catalogue",
    },
  },
};
