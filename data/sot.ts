import type { SchoolPageData } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const PROG_EXCERPT =
  "Dhirubhai Ambani University (Formerly DA-IICT) has played a pioneering role in developing innovative undergraduate programs";

const SPLIT_DESC =
  "Dhirubhai Ambani University (Formerly DA-IICT) has played a pioneering role in developing innovative undergraduate programs in Information and Communication Technology (ICT) in India since 2001.";

const VM_BODY =
  "DA-IICT is a place where academic programmes meet research-driven teaching, faculty with rich experience in research, state of the art ICT infrastructure and a vibrant campus life. Our jubilant student fraternity, highly qualified faculty, interdisciplinary curricula, and vibrant campus ambience are tightly interwoven to provide the highest standards of academic excellence and all-round development of its students.";

const NEWS_TITLE = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";

export const sotPageData: SchoolPageData = {
  hero: {
    eyebrow: "School of technology,",
    eyebrowSub: "Dhirubhai Ambani University",
    rankLabel: "Ranked",
    rankValue: "#1",
    subline: "Among new age adademics by Times of India",
    images: [
      { url: "/images/hero-slider-1.png", alt: "DAU campus main building" },
      { url: img(1000, 700, "campus-life-2"), alt: "DAU campus life" },
      { url: img(1000, 700, "campus-life-3"), alt: "DAU students" },
      { url: img(1000, 700, "campus-life-4"), alt: "DAU facilities" },
    ],
  },

  subNav: [
    { label: "Vision & Mission", href: "#vision" },
    { label: "Programs", href: "#programs" },
    { label: "Research Areas", href: "#research" },
    { label: "People", href: "#people" },
    { label: "News & Events", href: "#news" },
    { label: "Related Links", href: "#related" },
  ],

  intro: {
    paragraphs: [
      "DA-IICT is a place where academic programmes meet research-driven teaching, faculty with rich experience in research, state of the art ICT infrastructure and a vibrant campus life. Our jubilant student fraternity, highly qualified faculty, interdisciplinary curricula, and vibrant campus ambience are tightly interwoven to provide the highest standards of academic excellence and all-round development of its students. The strength of our academic programs lies in the interdisciplinary teaching-learning process backed by a strong research-driven training. Our graduates are equipped with strong foundational knowledge, skilled in advanced tools and technologies, and carry prodigious personality to aptly represent themselves as successful leaders in our society and contribute towards the betterment of humanity.",
      "I invite you to visit our campus and interact with our faculty, staff and students, and experience the enriching academic and research ambience of the institute.",
    ],
    vision: { title: "Vision", body: VM_BODY },
    mission: { title: "Mission", body: VM_BODY },
  },

  programs: {
    title: "Programs",
    description: SPLIT_DESC,
    cards: [
      { id: "btech-ict", title: "B.Tech (ICT)", excerpt: PROG_EXCERPT, image: img(732, 488, "sot-prog-ict"), href: "/academics/sot/btech-ict" },
      { id: "btech-mnc", title: "B.Tech (MnC)", excerpt: PROG_EXCERPT, image: img(732, 488, "sot-prog-mnc"), href: "/academics/sot/btech-mnc" },
      { id: "btech-evd", title: "B.Tech (EVD)", excerpt: PROG_EXCERPT, image: img(732, 488, "sot-prog-evd"), href: "/academics/sot/btech-evd" },
      { id: "btech-csai", title: "B.Tech (CS & AI)", excerpt: PROG_EXCERPT, image: img(732, 488, "sot-prog-csai"), href: "/academics/sot/btech-cs-ai" },
    ],
  },

  research: {
    title: "Research Areas",
    description: SPLIT_DESC,
    cards: [
      { id: "hssd", title: "Humanities, Social Science and Design", image: img(836, 460, "sot-res-hssd"), href: "/academics/sot/research/hssd" },
      { id: "pms", title: "Physics & Mathematical Sciences", image: img(836, 460, "sot-res-pms"), href: "/academics/sot/research/pms" },
      { id: "ssn", title: "Software Systems & Networking", image: img(836, 460, "sot-res-ssn"), href: "/academics/sot/research/ssn" },
      { id: "lds", title: "Learning, Data & Systems", image: img(836, 460, "sot-res-lds"), href: "/academics/sot/research/lds" },
    ],
  },

  people: {
    title: "People",
    categories: [
      { id: "faculty", label: "Faculty", image: img(360, 360, "sot-people-faculty"), href: "/academics/sot/faculty" },
      { id: "doctoral", label: "Doctoral Scholars", image: img(360, 360, "sot-people-doctoral"), href: "/academics/sot/doctoral-scholars" },
      { id: "alumni", label: "Alumni", image: img(360, 360, "sot-people-alumni"), href: "/academics/sot/alumni" },
      { id: "staff", label: "Staff", image: img(360, 360, "sot-people-staff"), href: "/academics/sot/staff" },
      { id: "parents", label: "Parents", image: img(360, 360, "sot-people-parents"), href: "/academics/sot/parents" },
    ],
  },

  news: {
    title: "News & Events",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    featured: {
      id: "feat",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
      date: "28 Mar, 2026",
      image: img(1044, 660, "sot-news-feat"),
      href: "/news/feature",
    },
    list: [
      { id: "n1", title: NEWS_TITLE, date: "28 Mar, 2026", image: img(280, 220, "sot-news-1"), href: "/news/1" },
      { id: "n2", title: NEWS_TITLE, date: "28 Mar, 2026", image: img(280, 220, "sot-news-2"), href: "/news/2" },
      { id: "n3", title: NEWS_TITLE, date: "28 Mar, 2026", image: img(280, 220, "sot-news-3"), href: "/news/3" },
      { id: "n4", title: NEWS_TITLE, date: "28 Mar, 2026", image: img(280, 220, "sot-news-4"), href: "/news/4" },
    ],
  },

  events: {
    title: "Upcoming Events",
    items: [
      { id: "e1", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "19 Apr, 12:20PM", image: img(836, 460, "sot-event-1"), href: "/events/1" },
      { id: "e2", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "19 Apr, 12:20PM", image: img(836, 460, "sot-event-2"), href: "/events/2" },
      { id: "e3", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "19 Apr, 12:20PM", image: img(836, 460, "sot-event-3"), href: "/events/3" },
    ],
    allHref: "/events",
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