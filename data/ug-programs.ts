import type { UgProgramsPageData } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const PROG_EXCERPT =
  "Dhirubhai Ambani University (Formerly DA-IICT) has played a pioneering role in developing innovative undergraduate programs";

const SUPPORT_EXCERPT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

export const ugProgramsPageData: UgProgramsPageData = {
  hero: {
    title: "Undergraduate Programs",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    image: img(1280, 560, "ug-hero"),
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Academics", href: "/academics" },
      { label: "Undergraduate Programs", href: "/academics/ug-programs" },
    ],
  },

  // NOTE: the Figma shows "Academic Areas" here — it looks like a leftover
  // placeholder. Change to "Undergraduate Programs" if that was the intent.
  subNavLabel: "Academic Areas",
  subNav: [
    { label: "Courses", href: "#courses" },
    { label: "Admissions", href: "#admissions" },
    { label: "Faculty", href: "#faculty" },
    { label: "Academic Support", href: "#support" },
    { label: "Related Links", href: "#related" },
  ],

  intro: [
    "Dhirubhai Ambani University (Formerly DA-IICT) has played a pioneering role in developing innovative undergraduate programs in Information and Communication Technology (ICT) in India since 2001. The pedagogy of ICT discipline should make a well-integration of Information Technology, Communication Technology, Electronics Engineering and Social Sciences courses with a solid grounding in Mathematics and Science, Humanities and Social Sciences, which a student cannot be trained in conventional Computer Science & Engineering or Electronics and Communication Engineering alone.",
    "In recent times, the institute has introduce another undergraduate program in Mathematics and Computing (MnC) that provides a strong foundation in Mathematics, Statistics and Computer Science followed by interdisciplinary electives and project works in industry relevant areas.",
    "The institute offers SIX undergraduate programs, Bachelor of Technology (B.Tech.), a four-year (eight semesters) of duration, leading to the degrees of",
  ],

  courses: {
    title: "Courses",
    description: "", // title only (no right-side text in the Figma)
    cards: [
      { id: "btech-ict", title: "B.Tech (ICT)", excerpt: PROG_EXCERPT, image: img(732, 488, "ug-ict"), href: "/academics/ug-programs/btech-ict" },
      { id: "btech-mnc", title: "B.Tech (MnC)", excerpt: PROG_EXCERPT, image: img(732, 488, "ug-mnc"), href: "/academics/ug-programs/btech-mnc" },
      { id: "btech-evd", title: "B.Tech (EVD)", excerpt: PROG_EXCERPT, image: img(732, 488, "ug-evd"), href: "/academics/ug-programs/btech-evd" },
      { id: "btech-csai", title: "B.Tech (CS & AI)", excerpt: PROG_EXCERPT, image: img(732, 488, "ug-csai"), href: "/academics/ug-programs/btech-cs-ai" },
      { id: "btech-ict-hons", title: "B.Tech (ICT - Honours)", excerpt: PROG_EXCERPT, image: img(732, 488, "ug-hons"), href: "/academics/ug-programs/btech-ict-honours" },
    ],
  },

  admissionCta: {
    eyebrow: "Ready to take a leap?",
    title: "Admissions started for 2027",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },

  faculty: {
    title: "Faculty",
    description:
      "Dhirubhai Ambani University (Formerly DA-IICT) has played a pioneering role in developing innovative undergraduate programs in Information and Communication Technology (ICT) in India since 2001. The pedagogy of ICT discipline should make a well-integration of Information Technology, Communication Technology.",
    members: [
      { id: "f1", name: "Faculty Name", position: "Position, Department", image: img(580, 700, "ug-fac-1"), href: "/faculty/1" },
      { id: "f2", name: "Faculty Name", position: "Position, Department", image: img(580, 700, "ug-fac-2"), href: "/faculty/2" },
      { id: "f3", name: "Faculty Name", position: "Position, Department", image: img(580, 700, "ug-fac-3"), href: "/faculty/3" },
      { id: "f4", name: "Faculty Name", position: "Position, Department", image: img(580, 700, "ug-fac-4"), href: "/faculty/4" },
      { id: "f5", name: "Faculty Name", position: "Position, Department", image: img(580, 700, "ug-fac-5"), href: "/faculty/5" },
      { id: "f6", name: "Faculty Name", position: "Position, Department", image: img(580, 700, "ug-fac-6"), href: "/faculty/6" },
    ],
  },

  support: {
    title: "Academic Support",
    cards: [
      { id: "resource", title: "Resource Centre", excerpt: SUPPORT_EXCERPT, image: img(844, 460, "ug-support-resource"), href: "/academics/support/resource-centre" },
      { id: "software", title: "Software Labs", excerpt: SUPPORT_EXCERPT, image: img(844, 460, "ug-support-software"), href: "/academics/support/software-labs" },
      { id: "hardware", title: "Hardware Labs", excerpt: SUPPORT_EXCERPT, image: img(844, 460, "ug-support-hardware"), href: "/academics/support/hardware-labs" },
      { id: "studios", title: "Design Studios", excerpt: SUPPORT_EXCERPT, image: img(844, 460, "ug-support-studios"), href: "/academics/support/design-studios" },
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