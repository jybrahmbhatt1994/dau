import type { FacultyPageData } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

/** Generate N faculty members with a unique seed per card for picsum images */
const makeFaculty = (slug: string, count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: `${slug}-${i + 1}`,
    name: "Faculty Name",
    position: "Position, Department",
    image: img(290, 360, `${slug}-${i + 1}`),
    href: `/faculty/${slug}/${i + 1}`,
  }));

const INTRO =
  "Dhirubhai Ambani University (Formerly DA-IICT) has played a pioneering role in developing innovative undergraduate programs in Information and Communication Technology (ICT) in India since 2001. The pedagogy of ICT discipline should make a well-integration of Information Technology, Communication Technology, Electronics Engineering and Social Sciences courses with a solid grounding in Mathematics and Science, Humanities and Social Sciences, which a student cannot be trained in conventional Computer Science & Engineering or Electronics and Communication Engineering alone.";

export const facultyPageData: FacultyPageData = {
  hero: {
    title: "Faculty",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    image: img(1200, 500, "faculty-hero"),
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Faculty", href: "/faculty" },
    ],
  },

  subNavLabel: "Page Title",
  subNav: [
    { label: "Link 1", href: "#apply" },
    { label: "Link 2", href: "#faculty-explorer" },
    { label: "Link 3", href: "/faculty/dean" },
    { label: "Link 4", href: "/faculty/recruitment" },
    { label: "Link 5", href: "/faculty/handbook" },
  ],

  applyBanner: {
    text: "Interested in becoming a faculty@DAU",
    cta: "Apply Now",
    href: "/faculty/recruitment/apply",
  },

  // Faculty categorised by type — one tab per category.
  // Data shape is keyed by `slug` so CMS can fetch each category separately.
  tabs: [
    {
      slug: "regular-faculty",
      label: "Regular Faculty",
      intro: INTRO,
      members: makeFaculty("regular", 28),
    },
    {
      slug: "visiting-faculty",
      label: "Visiting Faculty",
      intro: INTRO,
      members: makeFaculty("visiting", 8),
    },
    {
      slug: "distinguished-profs",
      label: "Distinguished Profs.",
      intro: INTRO,
      members: makeFaculty("distinguished", 6),
    },
    {
      slug: "professor-of-practice",
      label: "Professor of Practice",
      intro: INTRO,
      members: makeFaculty("practice", 5),
    },
    {
      slug: "international-faculty",
      label: "International Faculty",
      intro: INTRO,
      members: makeFaculty("international", 4),
    },
  ],

  cta: {
    left: {
      title: "Dean (Faculty)",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "/faculty/dean",
    },
    right: {
      title: "Faculty Recruitment",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "/faculty/recruitment",
    },
  },
};