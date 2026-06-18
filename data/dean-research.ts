import type { DeanResearchPageData } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const deanResearchPageData: DeanResearchPageData = {
  hero: {
    title: "Dean (Research)",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    image: img(1200, 500, "research-hero"),
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Research", href: "/research" },
      { label: "Dean (Research)", href: "/research/dean" },
    ],
  },

  subNavLabel: "Page Title",
  subNav: [
    { label: "Message", href: "#message" },
    { label: "Functions", href: "#functions" },
    { label: "Officials", href: "#officials" },
    { label: "Research Areas", href: "/research/areas" },
    { label: "Grants & Projects", href: "/research/grants" },
  ],

  desk: {
    title: "Message from Dean's Desk",
    paragraphs: [
      "Thanks for visiting the Dean (Research) website. DAIICT is committed towards developing and maintaining the highest standards in both teaching and research. Engineering with Humanities and Social Sciences at DAIICT provides a best environment that fosters inter-disciplinary research in cutting edge areas. The faculty of DAIICT contributes to sponsored research and industrial collaboration in different areas. It is my pleasure to inform that research contribution by the faculty has grown over the last decade. Funding support from sponsored research and consultancy has increased in the past few years and so has the number of publications and monographs.",
      "DAIICT has a very healthy ambience on campus, clearly an attractive center for generation of ideas, concepts, and technologies. Collaboration with leading universities and industry provides us the motivation for conducting meaningful research. Our Institute website provides a great deal of information on its people, activities, and resources. It is indeed a right moment to invite prospective students and faculty to explore.",
      "I am privileged to be part of DAIICT that thrives to get the best minds of our country and abroad to build world class engineers and researchers. All this success is due to the dedication of my colleagues towards academic activities by bringing their experience into high quality teaching and research. We express our thanks to sponsoring agencies for their encouragement by funding our research. We, at DAIICT are committed to hard work in taking the Institute to the next level.",
    ],
    name: "Dr. Yash M. Vasavada",
    role: "Dean of Research",
    image: img(820, 940, "dean-research-portrait"),
    phone: "079 69 08 08 08",
    email: "dean_research@dau.ac.in",
  },

  functions: {
    title: "Functions of Office of the Dean",
    introParagraphs: [
      "The Office of Dean (Research) implements policies and procedures relating to the following matters:",
    ],
    bulletGroups: [
      {
        items: [
          "Carrying out /monitoring any sponsored project, consultancy project, including manpower requirement;",
          "Submission of project proposals to the funding agencies.",
        ],
      },
      {
        lead: "All sponsored projects are monitored by an internal committee consisting of the Director, Dean (Research) and PI of the respective project. There is a purchase policy for externally sponsored projects.",
        items: [
          "For capital expenditures of Rs. 20,000/- or above, approval of Dean (Research) is required.",
          "For capital expenditures of Rs. 1 lakh or above, a purchase committee is constituted by Dean (Research).",
        ],
      },
    ],
    outroParagraphs: [
      "The office of Dean (Research) also oversees organisation and /or participation by faculty and research scholars in workshops, seminars and conferences. There is an Institute-wide policy to support presentation of research papers by faculty and research scholars at academic conferences in India or abroad. A Cumulative Professional Development Allowance (CPDA) of Rupees 3 lakhs is earmarked for every block of three years on reimbursable basis to the faculty (after confirmation of their service) for participating in both national and international conferences and workshops.",
      "The office of Dean (Research) also creates awareness of funding opportunities through Institute's Research Promotion Committee. For new faculty, a seed grant of up to Rs. 5 lakhs is granted on approval of the proposal by Dean (Research) through the Institute's Research Promotion Committee.",
      "Dean (Research) office also promotes Entrepreneurship and Innovation. A Centre for Entrepreneurship and Innovation at DA-IICT (CEII) is established at DA-IICT with Dean (Research) as its member of the Board of Governors. CEII has the status of a section 8 Company.",
      "Dean (Research) is the Faculty Convenor of the Research Club, a student club to spread awareness among students about research and help them climb some milestones. It is intended to provide a social setting to stimulate inter-disciplinary research among the student at DA-ICT.",
    ],
  },

  officials: {
    title: "Officials",
    people: [
      {
        id: "o1",
        name: "Mr. Jalpesh Pandya",
        position: "Deputy Registrar (Academic)",
        email: "jalpesh.pandya@dau.ac.in",
        phone: "(+91) 079-68261733",
        image: img(290, 338, "official-pandya"),
      },
      {
        id: "o2",
        name: "Mr. Pritesh Panchal",
        position: "Executive Assistant, Dean (AP)",
        email: "dean-ap.office@dau.ac.in",
        phone: "(+91) 079-68261733",
        image: img(290, 338, "official-panchal"),
      },
    ],
  },

  cta: {
    left: {
      title: "Dean (Faculty)",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "/academics/dean",
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