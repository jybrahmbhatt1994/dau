import type { FacultyRecruitmentPageData } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const facultyRecruitmentPageData: FacultyRecruitmentPageData = {
  hero: {
    title: "Faculty Recruitment",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    image: img(1200, 500, "faculty-recruitment-hero"),
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Faculty", href: "/faculty" },
      { label: "Faculty Recruitment", href: "/faculty/recruitment" },
    ],
  },

  subNavLabel: "Page Title",
  subNav: [
    { label: "Link 1", href: "#openings" },
    { label: "Link 2", href: "#eligibility" },
    { label: "Link 3", href: "#prospective" },
    { label: "Link 4", href: "#compensation" },
    { label: "Link 5", href: "/faculty" },
  ],

  applyBanner: {
    text: "Interested in becoming a faculty@DAU",
    cta: "Apply Now",
    href: "/faculty/recruitment/apply",
  },

  intro: [
    "Dhirubhai Ambani Institute of Information and Communication Technology (DA-IICT) invites applications for full-time faculty positions from highly motivated individuals with a good record of conducting independent, high-quality research and a strong commitment to teaching and educating a diverse group of students at both undergraduate and postgraduate levels.",
  ],

  openings: {
    title: "Current Openings",
    description:
      "Institute administers its responsibilities for the regulation, quality control and supervision of its academic programs through its academic governance structure. The faculty members play an important role, as key stakeholders, in the functioning and oversight of academic processes.",
    cards: [
      { id: "o1", title: "Computer Science",            image: img(180, 180, "open-cs"),     href: "/faculty/recruitment/computer-science" },
      { id: "o2", title: "Data Science",                image: img(180, 180, "open-ds"),     href: "/faculty/recruitment/data-science" },
      { id: "o3", title: "Electronics and VLSI Design", image: img(180, 180, "open-vlsi"),   href: "/faculty/recruitment/electronics-vlsi" },
      { id: "o4", title: "Humanities and Social Sciences", image: img(180, 180, "open-hss"), href: "/faculty/recruitment/humanities" },
      { id: "o5", title: "Mathematics & Statics",       image: img(180, 180, "open-math"),   href: "/faculty/recruitment/mathematics" },
      { id: "o6", title: "Communication Design",        image: img(180, 180, "open-design"), href: "/faculty/recruitment/communication-design" },
    ],
  },

  eligibility: {
    title: "Eligibility Criteria",
    tabs: [
      {
        slug: "assistant",
        label: "Assistant",
        paragraphs: [
          "The minimum academic qualification for admission to the programs is that the candidate must have passed with the minimum percentage of marks as prescribed by the AICTE from time to time in final examination of 10+2 (Class XII) or its equivalent referred to as the qualifying examination (mentioned below). The candidate must have passed in final examination of 10+2 (Class XII) or its equivalent with Mathematics, Physics and any one of Chemistry/Bio-technology/Computer Science/Biology. Candidates appearing in the qualifying examination in 2026 are also eligible to apply for consideration of provisional admission. All candidates who are offered provisional admission will be required to produce the proof of having passed the qualifying examination (10+2 examination or equivalent) to the Institute latest by 30 October 2026, failing which the provisional admission will stand, cancelled.",
        ],
      },
      {
        slug: "associate",
        label: "Associate",
        paragraphs: [
          "Associate-level candidates are expected to hold a Ph.D. degree in a relevant area with a strong record of independent research, peer-reviewed publications, and demonstrated potential for external research funding. A minimum of three years of postdoctoral or equivalent experience in academia or industry is typically required. Candidates should provide evidence of teaching effectiveness, mentorship of graduate students, and active participation in their research community.",
        ],
      },
    ],
  },

  prospective: {
    title: "Prospective Faculty",
    blocks: [
      {
        heading: "Academics and Teaching Infrastructure",
        paragraphs: [
          "Faculty members are engaging in teaching of 3 courses in one academic year. Two courses to teach in one semester and one in the other semester. Faculty member teaching core courses in UG and PG is supported by Teaching Assistants (TAs). Number of TAs assigned depends on the registration of the course. Institute has three air-cooled lecture theatres with seating capacity of more than 300 students. These theatres are equipped with modern audio and video presentation systems. The regular class rooms and tutorial rooms are also equipped with audio-visual aids. Teaching and research laboratories are housed in a laboratory building located in between the lecture theatres and the classrooms. The entire campus is wi-fi enabled.",
        ],
      },
      {
        heading: "Research Environment",
        paragraphs: [
          "DA-IICT stands for a confluence of several interrelated disciplines, from technology and basic sciences to humanities and social sciences catering to both academia and industry. Our aim is to encourage basic, applied and developing research conducted both by students and members of faculty alike. Our encouragement clearly reflects in the policies we have set up for research activities and professional development. Although the needs of our faculty are as diverse as the disciplines they represent, they however share the common goal of building their capacities to generate new ideas and ways of understanding the world.",
          "DA-IICT's infrastructure, ranging from various well-equipped laboratories to Resource Centre (which provides online access to major digital libraries, including those of ACM, IEEE, Springer LNCS, JSTOR) matches the general expectations of inter-disciplinary research. Need-based funding is provided for setting up laboratories and acquiring new equipment. The faculty is also encouraged to seek out latest opportunities for research collaboration and funding. Partnerships with industry are a priority for DA-IICT. Besides, all efforts by faculty to participate in bilateral, international and multi-institutional research grants aimed at solving critical problems will be duly supported. There is provision for consulting work for which faculty members can avail one day per week. For details on our research activities, visit this page. Faculty publication list is here.",
        ],
      },
      {
        heading: "Research Environment",
        paragraphs: [
          "Gandhinagar is organized into well laid out sectors and, in the sectors adjoining the Institute, a good choice of houses is available for rent. There are several schools in Gandhinagar, including Central Board schools like DPS, Gandhinagar, Hillwoods, Podar, Jamnabai Narsee school. More options for housing and schooling are available in Ahmedabad, which is only 30 km from the campus (within easy driving distance). Healthcare support includes a visiting doctor on the campus, a network of consulting doctors, and arrangement with hospitals, such as the Apollo.",
          "Being a capital city, Gandhinagar enjoys the uninterrupted water and power supply throughout the year. The airport and the railway station, both located in Ahmedabad, are within easy reach from the campus in Gandhinagar (20 minutes drive to the airport and about 50 minutes drive to the railway station). The airport has international connectivity, with direct flights to Europe and the USA. For more on Gandhinagar/Ahmedabad click here.",
        ],
      },
    ],
  },

  gallery: {
    images: [
      img(800, 600, "fac-gallery-1"),
      img(800, 600, "fac-gallery-2"),
      img(800, 600, "fac-gallery-3"),
      img(800, 600, "fac-gallery-4"),
      img(800, 600, "fac-gallery-5"),
      img(800, 600, "fac-gallery-6"),
      img(800, 600, "fac-gallery-7"),
      img(800, 600, "fac-gallery-8"),
    ],
  },

  compensation: {
    title: "Compensation Package",
    blocks: [
      {
        heading: "Salary per year in Cost to the Institute (CTI) format",
        paragraphs: [
          "Assistant Professor: Minimum starting salary is Rs. 17 Lakh per annum",
          "(Deserving candidates may be offered additional incentives commensurate with qualification and experience.)",
        ],
      },
      {
        heading: "Research Environment",
        bullets: [
          "Seed Money Research Grant up to Rs. 10.00 lakh.",
          "Cumulative Professional Development Allowance of Rs. 3.00 lakh for every block of three years on a reimbursable basis to the faculty for participating in both national and international conferences and workshops.",
          "Medical Insurance Coverage of Rs. 10 lakh per year for self and family (floater). Premium paid by the Institute.",
          "Medical support: Doctors on campus. Basic medicines are disbursed from the Medical Centre.",
          "Accident Insurance Coverage ranging from Rs. 4.00 lakh to Rs. 12.00 lakh. Premium paid by the Institute.",
          "Leave benefits: Eligible for 8 days of casual leave; 60 days' vacation in a year — if not availed, converted to 30 days of earned leave. Earned leave is cashable on cessation of employment.",
          "Career Progression: The Institute has a well-articulated career progression policy.",
          "Teaching Load: Three courses teaching load in an academic year. For new joinee, two courses (one in each semester) teaching load for the first year, and then three courses in the subsequent year.",
          "Research Incentives: Financial reward of Rs. 1 Lakh for publications in A*/A conferences and Q1 journals.",
          "Collaborative Research: Encouraged to do collaborative research with industry and academia in India and abroad.",
        ],
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