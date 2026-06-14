import type { ProgramPageData } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const PO_LEAD = "Engineering knowledge:";
const PO_BODY =
  "Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems.";
const PSO_BODY =
  "To apply the theoretical concepts of computer engineering and practical knowledge in analysis, design and development of computing systems and interdisciplinary applications.";

const SEM_COURSES = [
  { name: "Introduction to ICT", ltpc: "1-0-2-2" },
  { name: "Language & Literature", ltpc: "3-0-0-3" },
  { name: "Calculus", ltpc: "3-1-0-4" },
  { name: "Intro to Programming", ltpc: "3-0-0-3" },
  { name: "Introduction to ICT", ltpc: "1-0-2-2" },
  { name: "Language & Literature", ltpc: "3-0-0-3" },
  { name: "Calculus", ltpc: "3-1-0-4" },
  { name: "Intro to Programming", ltpc: "3-0-0-3" },
];

const ELECTIVE_NAMES = [
  "Graph Theory and Algorithms",
  "Approximation Algorithms",
  "Data Mining and Visualization",
  "Introduction to Complex Network",
  "Human Computer Interaction",
];

const FAQ_Q = "Lorem ipsum dolor sit amet, consectetur adipiscing elit?";
const FAQ_A =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam";

export const btechIctPageData: ProgramPageData = {
  hero: {
    title: "B.Tech (ICT)",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    image: img(1280, 560, "btech-hero"),
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Academics", href: "/academics" },
      { label: "Undergraduate Programs", href: "/academics/ug-programs" },
      { label: "B.Tech (ICT)", href: "/academics/btech-ict" },
    ],
  },

  // NOTE: Figma shows "Page Title" + Link 1–5 here (placeholders).
  subNavLabel: "Page Title",
  subNav: [
    { label: "Link 1", href: "#honours" },
    { label: "Link 2", href: "#semesters" },
    { label: "Link 3", href: "#electives" },
    { label: "Link 4", href: "#faqs" },
    { label: "Link 5", href: "#related" },
  ],

  applyBanner: {
    text: "Admissions are open, Apply Now!",
    cta: "Apply Now",
    href: "/apply",
  },

  intro: [
    "Dhirubhai Ambani University (Formerly DA-IICT) has played a pioneering role in developing innovative undergraduate programs in Information and Communication Technology (ICT) in India since 2001. The pedagogy of ICT discipline should make a well-integration of Information Technology, Communication Technology, Electronics Engineering and Social Sciences courses with a solid grounding in Mathematics and Science, Humanities and Social Sciences, which a student cannot be trained in conventional Computer Science & Engineering or Electronics and Communication Engineering alone.",
  ],

  honours: {
    id: "honours",
    title: "B.Tech. (Honours) in ICT",
    paragraphs: [
      "Apart from satisfying all credit/course/internship/project requirements stipulated for the B.Tech. (ICT) program, the B.Tech. (Honours) in ICT requires a student to complete a minimum of 15 additional credits (and a minimum of five additional courses) in the form of electives. The electives available for the Honours program shall be specified by the Dean-AP, and the flexibility to choose honours qualified elective courses starts from the fourth semester of the program. The students do not have to sign up for this program, and any student who meets the criteria listed below at the time of graduation will be conferred with the B.Tech. (Honours) in ICT degree.",
    ],
    bullets: [
      "All requirements for B.Tech. (ICT) program",
      "Additional minimum 5 designated courses/15 credits.",
      "Passed in these additional 5 courses.",
      "Minimum final CPI of 6.5.",
    ],
    image: img(700, 760, "btech-honours"),
  },

  honoursMinor: {
    title: "B.Tech. (Honours) in ICT With Minor",
    paragraphs: [
      "Depending on the faculty resources and student interest, the institute offers a Minor in a particular area to students of the B.Tech. (ICT) program. This will enable students to pursue an in-depth study into an area within ICT or get introduced to an area which complements ICT.",
      "Apart from satisfying all credit/course/internship/project requirements stipulated for the B.Tech(ICT) program, the B.Tech. (Honours) in ICT with Minor requires a student to complete a minimum of 15 additional credits (and a minimum of five additional courses) in the form of electives which are aligned with the area in which the Minor is offered. The courses under any Minor begin in Semester 4 and can culminate in Semester 7, and may involve a sequence of Core courses, Elective courses, and/or project based courses. The first Minors program offered by the Institute is the Minor in Robotics and Autonomous Systems(RAS), and was offered to the batch of B.Tech. (ICT) 2021 students. The eligibility criteria to enrol in each Minor and criteria to successfully complete the Minor are specific to each Minor. It is to be noted that the B.Tech. (Honours) in ICT with Minor in Computational Science is a separate program, and should not be considered as a Minor under this section for all operational purposes. The description, benefits, eligibility criteria, criteria for successful completion, and detailed course content for each Minor can be found here:",
    ],
    button: { label: "Know More", href: "/academics/btech-ict/minors" },
  },

  outcomes: {
    programOutcomes: {
      title: "Program Outcomes",
      viewAllHref: "/academics/btech-ict/program-outcomes",
      items: [
        { code: "PO1", lead: PO_LEAD, body: PO_BODY },
        { code: "PO2", lead: PO_LEAD, body: PO_BODY },
        { code: "PO3", lead: PO_LEAD, body: PO_BODY },
      ],
    },
    specificOutcomes: {
      title: "The Programme Specific Outcomes",
      items: [
        { code: "PSO1", body: PSO_BODY },
        { code: "PSO2", body: PSO_BODY },
        { code: "PSO3", body: PSO_BODY },
      ],
    },
  },

  coreCourses: {
    title: "Core Courses",
    paragraphs: [
      "Set of compulsory courses taken by every student for first five semesters. These courses are from the technical areas of Computer Science and Information Technology, Electronics and Communication, as well as courses in Humanities, Mathematics and Basic Sciences",
    ],
  },

  electiveCourses: {
    title: "Elective Courses",
    paragraphs: [
      "These courses add to both, the technical strength and humanities and social science skills of the program. The students can choose the elective courses from the available ones from fifth semester onwards. The elective courses are grouped into the following categories",
    ],
    bullets: [
      "ICT Electives",
      "Technical Electives",
      "Humanities and Social Sciences Electives",
      "Science Electives",
      "Open Electives",
    ],
  },

  coCurricular: {
    title: "Co-curricular Activities and Exploration Project",
    paragraphs: [
      "Co-curricular activities are non-class activities like sports, cultural and technical club activities. These courses run over the first four semesters and are graded Pass/Fail. Exploration projects allow students to explore their surroundings to identify interesting problems that admit a design based and/or hardware based solution and make such a product by leveraging the introduction to ICT skills learnt in the first semester. Students are expected to work in groups of 8 to 10 under a faculty mentor over two semesters - second and third semester. This course will be graded on a Pass/Fail basis.",
      "A unique feature of the program is the mandatory rural internship, which is expected to give the student a feel of his/her social milieu and is typically carried out with an NGO and Govt. organizations. The rural internship is offered in the Winter break after the 3rd semester. After the completion of foundation courses, the student is required to take a 6-8 week mandatory industrial/research internship, which is offered in the summer break after the 6th semester. The student has a choice of taking an industrial internship or a research internship depending on his/her career goals. The student is required to take at least a semester long BTech project (BTP), during which he/she is required to demonstrate his/her ability to learn current areas of research and/or industrial interest. Furthermore, a student has option to do BTP as on-campus or off-campus mode, where the on-campus mode allows the student to explore his/her research interest under the supervision of a faculty, whereas the off-campus mode allows the student in getting exposure to industry and/or other R&D organizations/universities.",
      "Most of the foundation courses are offered in the first four semesters and a part of the fifth semester. These courses are from the technical areas of Computer Science and Information Technology, Electronics and Communication, as well as courses in Humanities, Mathematics and Basic Sciences. In the remaining 3 and a half semesters, students take elective courses and do internships and projects.",
      "The curriculum accommodates 148 credits, out of which 129 credits for courses and 19 credits for internships and project work. In addition, there are 6 credits for Co-curricular Activities courses and Exploratory Projects. Out of the 129 required coursework credits, 90 credits are allocated to compulsory courses (Foundation courses) and 39 credits are allocated to four kinds of electives (12 credits are allocated to ICT electives, 12 credits to Technical electives, 6 credits to Science electives, 3 credits to HASS elective and 6 credits to Open electives), which the student can choose according to his/her inclination and interest. Honours students also take additional five courses from the designation basket and obtain a minimum of 15 credits.",
    ],
    gallery: [
      img(480, 600, "btech-gal-1"),
      img(480, 600, "btech-gal-2"),
      img(480, 600, "btech-gal-3"),
      img(480, 600, "btech-gal-4"),
      img(480, 600, "btech-gal-5"),
      img(480, 600, "btech-gal-6"),
      img(480, 600, "btech-gal-7"),
    ],
  },

  semesters: {
    title: "Semester Breakdown",
    description:
      "Each course is associated with a fixed number of credits. Credits are awarded on an L-T-P-C system (C=L+T+P/2) per semester, that is, the number of contact hours for Lectures (L), Tutorials (T) and Practical (P) in a week. Nominally, since a semester has around 13-14 weeks of classes, therefore, a 3 credit lecture course would amount to approximately 40 lecture hours in a semester.",
    items: [
      { id: "sem1", title: "Semester 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam", courses: SEM_COURSES },
      { id: "sem2", title: "Semester 2", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", courses: SEM_COURSES },
      { id: "sem3", title: "Semester 3", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", courses: SEM_COURSES },
      { id: "sem4", title: "Semester 4", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", courses: SEM_COURSES },
      { id: "sem5", title: "Semester 5", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", courses: SEM_COURSES },
      { id: "sem6", title: "Semester 6", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", courses: SEM_COURSES },
      { id: "sem7", title: "Semester 7", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", courses: SEM_COURSES },
      { id: "sem8", title: "Semester 8", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", courses: SEM_COURSES },
    ],
  },

  electives: {
    title: "List of Electives",
    description:
      "Set of compulsory courses taken by every student for first five semesters. These courses are from the technical areas of Computer Science and Information Technology, Electronics and Communication, as well as courses in Humanities, Mathematics and Basic Sciences",
    items: [...ELECTIVE_NAMES, ...ELECTIVE_NAMES, ...ELECTIVE_NAMES],
  },

  admissionCta: {
    eyebrow: "Ready to take a leap?",
    title: "Admissions started for 2027",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },

  faqs: {
    title: "FAQs",
    items: [
      { id: "faq1", question: FAQ_Q, answer: FAQ_A },
      { id: "faq2", question: FAQ_Q, answer: FAQ_A },
      { id: "faq3", question: FAQ_Q, answer: FAQ_A },
      { id: "faq4", question: FAQ_Q, answer: FAQ_A },
      { id: "faq5", question: FAQ_Q, answer: FAQ_A },
    ],
  },

  contact: {
    phone: "079 69 08 08 08",
    email: "ug_admissions@dau.ac.in",
  },

  cta: {
    calendar: {
      title: "Academic Calendar",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "/academics/calendar",
    },
    areas: {
      title: "Academic Areas",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "/academics/areas",
    },
  },
};