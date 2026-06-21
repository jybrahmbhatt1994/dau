import type { DeanFacultyPageData } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const deanFacultyPageData: DeanFacultyPageData = {
  hero: {
    title: "Dean (Faculty)",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    image: img(1200, 500, "dean-faculty-hero"),
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Faculty", href: "/faculty" },
      { label: "Dean (Faculty)", href: "/faculty/dean" },
    ],
  },

  subNavLabel: "Page Title",
  subNav: [
    { label: "Link 1", href: "#message" },
    { label: "Link 2", href: "/faculty" },
    { label: "Link 3", href: "/faculty/recruitment" },
    { label: "Link 4", href: "/faculty/handbook" },
    { label: "Link 5", href: "/faculty/development" },
  ],

  desk: {
    title: "Message from Dean's Desk",
    paragraphs: [
      "Welcome to DA-IICT, Gandhinagar!",
      "We believe in academic excellence through research led teaching. Our faculty is a diverse community of outstanding scholars who design, develop and drive the inter-disciplinary education programs at undergraduate, postgraduate and doctoral levels. In the Faculty Affairs Office, we strive to attract, develop and retain top talent in a culture that values innovation and excellence in teaching-learning and supports research activities for the betterment of humanity.\nExplore our website for more about the academic programs, research groups, student activities, and in particular, the Faculty page. Please write to dean_faculty[at]dau[dot]ac[dot]in should you have any comments, questions, or recommendations. We welcome your feedback or comments.",
    ],
    name: "Dr. Maniklal Das",
    role: "Dean of Faculty Affairs",
    image: img(820, 940, "dean-faculty-portrait"),
    email: "dean_ap@dau.ac.in",
  },

  cta: {
    left: {
      title: "Faculties @ DAU",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "/faculty",
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