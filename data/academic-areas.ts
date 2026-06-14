import type { AcademicAreasPageData } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const academicAreasPageData: AcademicAreasPageData = {
  hero: {
    title: "Academic Areas",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    image: img(1280, 560, "academic-areas-hero"),
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Academics", href: "/academics" },
      { label: "Academic Areas", href: "/academics/areas" },
    ],
  },

  subNav: [
    { label: "Areas of Study", href: "#areas-of-study" },
    { label: "Related Links", href: "#related" },
  ],

  intro: [
    "Institute administers its responsibilities for the regulation, quality control and supervision of its academic programs through its academic governance structure. The faculty members play an important role, as key stakeholders, in the functioning and oversight of academic processes. While there are no departments, all our programs are supported by faculty members belonging to several academic areas. An academic-area is a coherent cluster of related knowledge domains and the primary objective of the area-wise organization is to share academic responsibilities related to teaching and program administration. In addition, the areas strive to function as nodes of synergy catalyzing collaboration and conversation among their members.",
    "Each faculty is a member of one or more areas depending on their academic interests. Each area has an Area-Coordinator appointed by the Director, on a rotation basis, for a term of two years and acts as a facilitator for the area members. The area-coordinators representing the academic-areas help the Deans to run the academic governance of the institute. The primary objective of such an academic governance structure is to make academic policy and decision making largely consultative, decentralized, inclusive and democratic.",
  ],

  areasOfStudy: {
    title: "Areas of Study",
    description:
      "Institute administers its responsibilities for the regulation, quality control and supervision of its academic programs through its academic governance structure. The faculty members play an important role, as key stakeholders, in the functioning and oversight of academic processes.",
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