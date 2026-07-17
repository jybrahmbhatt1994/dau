import type { FacultyPageData, FacultyCardData } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

/** Generate N faculty members with a unique seed per card for picsum images */
const makeFaculty = (slug: string, count: number): FacultyCardData[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `${slug}-${i + 1}`,
    name: "Faculty Name",
    position: "Assistant Professor",
    department: "Computer Science",
    interests:
      "Machine Learning, Statistical Signal Processing, RF Communications, Computer Vision, Autonomous Vehicles",
    phone: "079-68261598",
    address: "# 3208, FB-3, DAU, Gandhinagar, Gujarat, India – 382007",
    email: `faculty_${i + 1}@dau.ac.in`,
    image: img(290, 360, `${slug}-${i + 1}`),
    href: `/faculty/${slug}/${i + 1}`,
  }));

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

  // Faculty categorised by type — one tab per category.
  // NOTE: no `intro` field here — the redesigned FacultyTabData is just
  // { slug, label, members }. The old cream "Apply Banner" and per-tab
  // intro paragraph were both dropped in the Faculty page redesign.
  tabs: [
    {
      slug: "regular-faculty",
      label: "Regular Faculty",
      members: makeFaculty("regular", 28),
    },
    {
      slug: "visiting-faculty",
      label: "Visiting Faculty",
      members: makeFaculty("visiting", 8),
    },
    {
      slug: "distinguished-profs",
      label: "Distinguished Profs.",
      members: makeFaculty("distinguished", 6),
    },
    {
      slug: "professor-of-practice",
      label: "Professor of Practice",
      members: makeFaculty("practice", 5),
    },
    {
      slug: "international-faculty",
      label: "International Faculty",
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