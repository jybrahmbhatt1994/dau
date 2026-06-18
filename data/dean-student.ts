import type { DeanStudentPageData } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const deanStudentPageData: DeanStudentPageData = {
  hero: {
    title: "Dean (Student)",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    image: img(900, 600, "dean-student-hero"),
  },

  // NOTE (placeholder from Figma): rename "Page Title" + "Link 1–5". Links are
  // wired to the real section anchors on this page (#message / #officials /
  // #related); the duplicate targets exist only because the design shows 5 links
  // but the page has 3 sections.
  subNavLabel: "Page Title",
  subNav: [
    { label: "Link 1", href: "#message" },
    { label: "Link 2", href: "#officials" },
    { label: "Link 3", href: "#related" },
    { label: "Link 4", href: "#message" },
    { label: "Link 5", href: "#officials" },
  ],

  desk: {
    title: "Message from Dean\u2019s Desk",
    paragraphs: [
      "Thanks for visiting the Dean (Research) website. DAIICT is committed towards developing and maintaining the highest standards in both teaching and research. Engineering with Humanities and Social Sciences at DAIICT provides a best environment that fosters inter-disciplinary research in cutting edge areas. The faculty at DAIICT contributes to sponsored research and industrial collaboration in different areas. It is my pleasure to inform that research contribution by the faculty has grown over the last decade. Funding support from sponsored research and consultancy has increased in the past few years and so has the number of publications and monographs. DAIICT has a very healthy ambience on campus, clearly an attractive center for generation of ideas, concepts, and technologies. Collaboration with leading universities and industry provides us the motivation for conducting meaningful research. Our Institute website provides a great deal of information on its people, activities, and resources. It is indeed a right moment to invite prospective students and faculty to explore.",
      "I am privileged to be part of DAIICT that thrives to get the best minds of our country and abroad to build world class engineers and researchers. All this success is due to the dedication of my colleagues towards academic activities by bringing their experience into high quality teaching and research. We express our thanks to sponsoring agencies for their encouragement by funding our research. We, at DAIICT are committed to hard work in taking the Institute to the next level.",
    ],
    // NOTE (Figma inconsistency): the page is "Dean (Student)" but the signatory
    // copy reads "Dean of Research". Left as-is to match the design; rename here.
    name: "Dr. Yash M. Vasavada",
    role: "Dean of Research",
    image: img(410, 470, "dean-student-portrait"),
  },

  contact: {
    phone: "079 69 08 08 08",
    email: "dean_student@dau.ac.in",
  },

  officials: {
    title: "Officials",
    // Add more entries here; the section auto-switches to a slider past 4 people.
    people: [
      {
        id: "off-jalpesh-pandya",
        name: "Mr. Jalpesh Pandya",
        position: "Executive Assistant \u2013 Dean (Students)",
        email: "jalpesh_pandya@dau.ac.in",
        phone: "079 69 08 08 09",
        image: img(290, 338, "official-jalpesh"),
      },
    ],
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