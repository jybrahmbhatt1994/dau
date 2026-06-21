import type { FacultyHandbookPageData } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const facultyHandbookPageData: FacultyHandbookPageData = {
  hero: {
    title: "Faculty Handbook",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    image: img(1200, 500, "faculty-handbook-hero"),
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Faculty", href: "/faculty" },
      { label: "Faculty Handbook", href: "/faculty/handbook" },
    ],
  },

  subNavLabel: "Page Title",
  subNav: [
    { label: "Link 1", href: "#handbook" },
    { label: "Link 2", href: "/faculty" },
    { label: "Link 3", href: "/faculty/dean" },
    { label: "Link 4", href: "/faculty/recruitment" },
    { label: "Link 5", href: "/faculty/development" },
  ],

  applyBanner: {
    text: "Interested in becoming a faculty@DAU",
    cta: "Apply Now",
    href: "/faculty/recruitment/apply",
  },

  content: {
    paragraphs: [
      "This handbook sets forth policies, procedures, and information that, by common consent, are those governing the University faculty as a whole.\nEither the Office of the Provost, or the Senate Executive Committee, may initiate revisions to this handbook. Following a proposal to revise the handbook, the Provost and the Senate Executive Committee must agree on the proper Senate committee to consider the proposal. After consideration of the proposal, that committee reports its findings to the Provost and Senate Executive Committee. The proposed handbook changes are forwarded as well to the academic units of the University. The authorized governance bodies in each of the academic units will report to the Senate Executive Committee the results of any deliberations on the proposed changes. The Senate Executive Committee reports to the Senate and the Provost about the impact of the proposed changes. After completion of these steps, the Faculty Senate will vote on the proposed changes and communicate the result and the accompanying report to the Board of Trustees. The Board of Trustees will consider the Senate's report and any recommendation from the Provost, for their final action.",
    ],
    downloadButton: {
      label: "Download Handbook",
      href: "/files/faculty-handbook.pdf",
      external: true,
    },
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