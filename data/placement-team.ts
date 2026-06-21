import type { PlacementTeamPageData } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const makeMembers = (slug: string, count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: `${slug}-${i + 1}`,
    name: "Faculty Name",
    position: "Position, Department",
    image: img(290, 360, `${slug}-${i + 1}`),
    href: `/placements/${slug}/${i + 1}`,
  }));

export const placementTeamPageData: PlacementTeamPageData = {
  hero: {
    title: "Placement Team",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    image: img(1200, 500, "placement-team-hero"),
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Placement", href: "/placements" },
      { label: "Placement Team", href: "/placements/team" },
    ],
  },

  subNavLabel: "Page Title",
  subNav: [
    { label: "Link 1", href: "#placement-cell" },
    { label: "Link 2", href: "#student-cell" },
    { label: "Link 3", href: "/placements/stats" },
    { label: "Link 4", href: "/placements/recruiters" },
    { label: "Link 5", href: "/placements/internships" },
  ],

  intro: [
    "Institute administers its responsibilities for the regulation, quality control and supervision of its academic programs through its academic governance structure. The faculty members play an important role, as key stakeholders, in the functioning and oversight of academic processes. While there are no departments, all our programs are supported by faculty members belonging to several academic areas. An academic-area is a coherent cluster of related knowledge domains and the primary objective of the area-wise organization is to share academic responsibilities related to teaching and program administration. In addition, the areas strive to function as nodes of synergy catalyzing collaboration and conversation among their members.",
  ],

  placementCell: {
    title: "Placement Cell Team",
    members: makeMembers("pct", 4),
  },

  studentCell: {
    title: "Student Placement Cell",
    members: makeMembers("spc", 28),
  },

  cta: {
    left: {
      title: "Dean (Faculty)",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "/faculty/dean",
    },
    right: {
      title: "Faculty List",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "/faculty",
    },
  },
};