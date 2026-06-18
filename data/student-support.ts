import type { StudentSupportPageData } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const LOREM =
  "Institute administers its responsibilities for the regulation, quality control and supervision of its academic programs through its academic governance structure. The faculty members play an important role, as key stakeholders, in the functioning and oversight of academic processes. While there are no departments, all our programs are supported by faculty members belonging to several academic areas. An academic-area is a coherent cluster of related knowledge domains and the primary objective of the area-wise organization is to share academic responsibilities related to teaching and program administration. In addition, the areas strive to function as nodes of synergy catalyzing collaboration and conversation among their members.";

export const studentSupportPageData: StudentSupportPageData = {
  hero: {
    title: "Student Support",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    image: img(900, 600, "student-support-hero"),
  },

  // NOTE (placeholder from Figma): rename "Page Title" + "Link 1–5".
  subNavLabel: "Page Title",
  subNav: [
    { label: "Link 1", href: "#wellbeing" },
    { label: "Link 2", href: "#anti-ragging" },
    { label: "Link 3", href: "#medical" },
    { label: "Link 4", href: "#wellbeing" },
    { label: "Link 5", href: "#medical" },
  ],

  intro: [LOREM],

  wellbeing: {
    title: "Student Wellbeing",
    paragraphs: [LOREM],
    phone: "079 69 08 08 08",
    email: "dean_student@dau.ac.in",
  },

  antiRagging: [
    {
      id: "ragging-programme",
      title: "National Ragging Prevention Programme",
      paragraphs: [
        "Information & Communication Technology (ICT) embodies the convergence of Computer and Communication systems and has obtained wide acceptance as a distinct discipline. ICT is considered to be a discipline dealing with accessing, storage, processing, transmission, reception and display of information, primarily using digital systems and techniques. The curriculum in the B.Tech. (ICT) program tries to address the optimized convergence of existing Computer Science and Engineering (CSE) as well as Electronics and Communication Engineering (ECE) disciplines by identifying the broad areas of performance capabilities. It is also expected that B.Tech. (ICT) graduates would enjoy a special niche only if they have certain performance capabilities not found in conventional CSE and/or ECE graduates. For details of the program click",
      ],
      link: { label: "here", href: "#" },
      image: img(560, 420, "ragging-programme"),
      button: { label: "Know More", href: "#" },
    },
    {
      id: "anti-ragging-committee",
      title: "Anti-Ragging Committee & Squad Details",
      paragraphs: [LOREM],
      button: { label: "Know More", href: "#" },
    },
  ],

  medical: {
    title: "Medical Facility",
    intro: [
      "The campus has a Medical Centre with reasonable stock of medicines. Two Doctors visit the campus daily\u2014one Doctor in the morning, forenoon and the other in the evening. An updated panel of medical specialists is also announced in the beginning of every academic year. The Campus Doctors provide free consultation and medicines disbursed from the Centre are free of any charge. The contact details of the Doctors visiting campus are as follows:",
    ],
    cells: [
      { name: "Dr. Arvindsinh Vaghela", time: "08.00 to 09.00 hrs" },
      { name: "Dr. (Mrs). Charulata Harshe", time: "12.45 to 13.45 hrs" },
      { name: "Dr. (Mrs.) Anjana Ved", time: "17.45 to 18.45 hrs" },
    ],
    outro: [
      "DA-IICT has signed a Memorandums of Understanding with Aashka Multispecialty Hospital, Gandhinagar, a Hospital with most modern and advanced medical and para-medical facilities, for providing medical facilities to the faculty, staff and students for priority admission and treatment on concessional rate. The Hospital is adjacent to DA-IICT campus and can be reached within ten minutes. A similar arrangement has also been made with Apollo Hospital, Gandhinagar.\nAn Institute vehicle with the Driver is always on 24\u00d77 duties to handle medical emergencies.",
      "All students are covered under the Group Mediclaim Insurance Policy (coverage of Rs. 2.50 lakh per annum) with Reliance General Insurance Company on payment of premium paid by the University and completion of certain procedures registration. With this medical coverage, the students can avail cashless in-patient medical treatment in various hospitals approved by the Reliance General Insurance Company.",
    ],
  },

  cta: {
    left: {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "#",
    },
    right: {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "#",
    },
  },
};