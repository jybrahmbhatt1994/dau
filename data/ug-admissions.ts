import type { UgAdmissionsPageData, UgAdmissionCategory } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const logo = (seed: string) => img(200, 80, `logo-${seed}`);

const COMMON_INTRO =
  "Dhirubhai Ambani University (Formerly DA-IICT) has played a pioneering role in developing innovative undergraduate programs in Information and Communication Technology (ICT) in India since 2001. The pedagogy of ICT discipline should make a well-integration of Information Technology, Communication Technology, Electronics Engineering and Social Sciences courses with a solid grounding in Mathematics and Science, Humanities and Social Sciences, which a student cannot be trained in conventional Computer Science & Engineering or Electronics and Communication Engineering alone.";

const PROGRAM_DESC =
  "Information & Communication Technology (ICT) embodies the convergence of Computer and Communication systems and has obtained wide acceptance as a distinct discipline. ICT is considered to be a discipline dealing with accessing, storage, processing, transmission, reception and display of information, primarily using integrated circuits, primarily culminate in the B.Tech. (ICT) program tries to address the optimized convergence of existing Computer Science and Engineering (CSE) as well as Electronics and Communication Engineering (ECE) disciplines by identifying the broad areas of performance capabilities. It is also expected that B.Tech. (ICT) graduates would enjoy a special niche only if they have certain performance capabilities not found in conventional CSE and/or ECE graduates. For details of the program click here.";

/**
 * Build one full UgAdmissionCategory block. Most fields are identical across
 * categories in mock data; tweak per-category content where needed.
 */
function makeCategory(
  slug: string,
  label: string,
  overrides: Partial<UgAdmissionCategory> = {}
): UgAdmissionCategory {
  return {
    slug,
    label,
    intro: [COMMON_INTRO],

    importantDates: {
      title: "Important Dates",
      items: [
        { id: "d1", label: "Filling of online Application Forms commences on", value: "24 March 2026" },
        { id: "d2", label: "On-line application closes on",                    value: "To be decided", pending: true },
        { id: "d3", label: "Announcement of Merit List",                        value: "To be decided", pending: true },
        { id: "d4", label: "Fees Payment window for shortlisted candidates",    value: "To be decided", pending: true },
        { id: "d5", label: "Announcement of Admission Status",                  value: "To be decided", pending: true },
        { id: "d6", label: "Registration and document verification at DAU campus for confirmed candidates (Tentative)", value: "01 June 2026" },
        { id: "d7", label: "Orientation Program (Tentative)",                   value: "21-24 July 2026" },
        { id: "d8", label: "Commencement of Classes (Tentative)",               value: "27 July 2026" },
      ],
    },

    intake: {
      title: "Intake",
      items: [
        { id: "i1", program: "B.Tech. Information and Communication Technology (ICT)", count: "72" },
        { id: "i2", program: "B.Tech. (Honours) in ICT with minor in Computational Science", count: "54" },
        { id: "i3", program: "B.Tech. Mathematics and Computing", count: "54" },
        { id: "i4", program: "B.Tech. Electronics and VLSI Design", count: "24" },
        { id: "i5", program: "B.Tech. Computer Science and Artificial Intelligence", count: "72" },
        { id: "i6", program: "B.Tech. Electronics and Communication Engineering – Artificial Intelligence", count: "36" },
      ],
    },

    programStructures: {
      title: "Program Structures",
      items: [
        {
          id: "ps1",
          title: "B.Tech Information and Communication Technology (ICT)",
          description: PROGRAM_DESC,
          image: img(600, 450, "prog-ict"),
          brochureHref: "/files/brochure-btech-ict.pdf",
        },
        {
          id: "ps2",
          title: "B.Tech. (Honours) in ICT with minor in Computational Science",
          description: PROGRAM_DESC,
          image: img(600, 450, "prog-ict-honours"),
          brochureHref: "/files/brochure-btech-ict-honours.pdf",
        },
        {
          id: "ps3",
          title: "B. Tech. Mathematics and Computing (MnC)",
          description: PROGRAM_DESC,
          image: img(600, 450, "prog-mnc"),
          brochureHref: "/files/brochure-btech-mnc.pdf",
        },
        {
          id: "ps4",
          title: "B. Tech. Electronics and VLSI Design (EVD)",
          description: PROGRAM_DESC,
          image: img(600, 450, "prog-evd"),
          brochureHref: "/files/brochure-btech-evd.pdf",
        },
        {
          id: "ps5",
          title: "B.Tech. Computer Science and Artificial Intelligence (CS and AI)",
          description: PROGRAM_DESC,
          image: img(600, 450, "prog-cs-ai"),
          brochureHref: "/files/brochure-btech-cs-ai.pdf",
        },
        {
          id: "ps6",
          title: "B.Tech. Electronics and Communication Engineering – Artificial Intelligence (ECE-AI)",
          description: PROGRAM_DESC,
          image: img(600, 450, "prog-ece-ai"),
          brochureHref: "/files/brochure-btech-ece-ai.pdf",
        },
      ],
    },

    placementStats: {
      title: "Placement Stats",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
      legend: {
        highestLabel: "Highest",
        averageLabel: "Average",
      },
      buckets: [
        { label: "2025-26", highest: 57,   average: 14.3 },
        { label: "2024-25", highest: 91.9, average: 17.6 },
        { label: "2023-24", highest: 55.5, average: 18.2 },
      ],
      logos: [
        { id: "l1", name: "Logoipsum",            logo: logo("logoipsum-1") },
        { id: "l2", name: "logo ipsum",           logo: logo("logoipsum-2") },
        { id: "l3", name: "Logoipsum University", logo: logo("logoipsum-3") },
        { id: "l4", name: "Logoipsum",            logo: logo("logoipsum-4") },
        { id: "l5", name: "IPSUM",                logo: logo("ipsum") },
        { id: "l6", name: "Logoipsum",            logo: logo("logoipsum-5") },
        { id: "l7", name: "logo",                 logo: logo("logoipsum-6") },
      ],
      stats: [
        { value: "500+",  label: "Students placed" },
        { value: "600+",  label: "Placement Offers" },
        { value: "124",   label: "Recruiters" },
        { value: "50LPA", label: "Highest salary offered" },
      ],
    },

    eligibility: {
      title: "Eligibility Criteria",
      tabs: [
        {
          slug: "education",
          label: "Education",
          paragraphs: [
            "The minimum academic qualification for admission to the programs is that the candidate must have passed with the minimum percentage of marks as prescribed by the AICTE from time to time in final examination of 10+2 (Class XII) or its equivalent referred to as the qualifying examination (mentioned below). The candidate must have passed in final examination of 10+2 (Class XII) or its equivalent with Mathematics, Physics and any one of Chemistry/Bio-technology/Computer Science/Biology. Candidates appearing in the qualifying examination in 2026 are also eligible to apply for consideration of provisional admission. All candidates who are offered provisional admission will be required to produce the proof of having passed the qualifying examination (10+2 examination or equivalent) to the Institute latest by 30 October 2026, failing which the provisional admission will stand, cancelled.",
            "If a candidate is found ineligible at a later date, even after admission to School of Technology, Dhirubhai Ambani University (Formerly DA-IICT), her/his admission will be cancelled. All admissions will be subject to verification of facts from the original testimonials/certificates/documents of the candidates. The decision of the competent authority at DAU (Formerly DA-IICT) regarding eligibility of any candidate shall be final.",
          ],
          bullets: [
            "The final examination of the 10+2 system, conducted by any recognized Central/State Board, such as Central Board of Secondary Education, New Delhi; Council for the Indian School Certificate Examinations, New Delhi; etc.",
            "Intermediate or two-year Pre-University examination conducted by a recognized Board/University.",
            "Final examination of the two-year course of the Joint Services Wing of the National Defense Academy.",
            "Senior Secondary School Examination conducted by the National Institute of Open Schooling with a minimum of five subjects.",
            "Any Public School/Board/University examination in India or in any foreign country recognized as equivalent to the 10+2 system by the Association of Indian Universities (AIU).",
            "H.S.C. vocational examination.",
            "A Diploma recognized by AICTE or a State Board of Technical Education of at least 3 years duration.",
            "General Certificate Education (GCE) examination (London/ Cambridge / Sri Lanka) at the Advanced (A) level.",
            "High School Certificate Examination of the Cambridge University or International Baccalaureate Diploma of the International Baccalaureate Office, Geneva.",
            "Candidates who have completed the Class 12 (or equivalent) examination outside India or from a Board not specified above should produce a certificate from the Association of Indian Universities (AIU) to the effect that the examination they have passed is equivalent to the Class 12 Examination. If the passing board of the qualifying examination is a foreign board having centre/s in India, approval letter issued to such school/centre by the respective State Government Education Department shall be required along with AIU equivalence certificate.",
            "In case the Class 12 Examination is not a public examination, the candidate must have passed at least one public (Board or Pre-University) examination earlier.",
            "Board of Open Schooling and Skill Education (BOSSE), Sikkim",
          ],
        },
        {
          slug: "age",
          label: "Age",
          paragraphs: [
            "Candidates seeking admission to the undergraduate programmes must satisfy the minimum age requirement as per AICTE norms. There is no upper age limit for admission to the B.Tech programmes at DAU. However, candidates must have completed Class XII or its equivalent at the time of applying.",
          ],
        },
      ],
    },

    selectionCriteria: {
      title: "Selection Criteria",
      paragraphs: [
        "Admission to the B. Tech. programs will be based on the All India Rank of Joint Entrance Examination 2026 (JEE-2026) Main, which is conducted by the National Testing Agency, Government of India. Therefore, candidates who are appearing for JEE 2026 Main can only apply for these programs.",
        "The short-listed candidates will be offered admission (confirmed/waitlisted) in order of their merit (based on the All India Ranking of JEE (Main) 2026). All India Category candidates belonging to Scheduled Caste and Scheduled Tribe will be admitted on relaxed criteria as compared to the general category candidates. In case some of the reserved seats are not filled in, the unfilled seats will be transferred to the general category.",
        "The DAU (Formerly DA-IICT) reserves the right to change the eligibility, number of seats, admission policy and procedures etc., for All India Category without any prior Notice.",
      ],
    },

    feeStructure: {
      title: "Fee Structure",
      intro:
        "At the time of counselling an amount of Rs.2,17,500 (Rs.1,92,500 towards Tuition Fee for the First Semester and Rs. 25,000 towards Caution Deposit) is to be paid. Subsequently, fees are charged semester-wise, with the registration at the beginning of each semester.",
      cards: [
        { id: "f1", label: "Tuition fee*",     value: "Rs.1,92,500 per Semester" },
        { id: "f2", label: "Registration Fee", value: "Rs. 2,500 per Semester" },
        { id: "f3", label: "Caution Deposit",  value: "Rs.25,000", subNote: "Refundable at program end" },
        { id: "f4", label: "Hostel Rent",      value: "Rs. 37,800 per semester" },
        { id: "f5", label: "Food",             value: "On actuals. There are multiple food options available in the campus. (The expense will be approximately Rs. 5,500 per month)", highlight: true },
      ],
      footnotes: [
        "* This Fee Structure is submitted to the Appellate Committee of the State Government for consideration.",
        "* Subject to revision every Academic Year at 10%.",
      ],
      notes: [
        {
          heading: "Value Added Course 1 Fee:",
          paragraphs: [
            "A value added course - SHILP (on Device Fabrication and Characterization) with CEERI Pilani is scheduled in Summer Break after the 2nd semester for B.Tech. (EVD) students. The fee for this value added course is Rs. 18,000 and to be paid along with the 2nd semester tuition fee.",
          ],
        },
        {
          heading: "Value Added Course 2 Fee:",
          paragraphs: [
            "To support the Digital IC Design and Tape Out in the fourth semester, a value added state-of-the-art Industrial Skill Development Course on VLSI Chip Design & Fabrication is scheduled in the semester. The important takeaway is to provide hands-on training that will give students an in-depth understanding of fabrication, process, and characterization, nurture their technical skills, gain practical experience in product development and make them industry-ready.",
            "The fee for this value-added course that will support the student to get fabricated chip from a Chip foundry, is around Rs. 25,000 per student and it is to be paid along with the fourth-semester tuition fees.",
            "Additional value added courses if organized by the Institute, the details about the corresponding course and fee will be intimated to the students well in advance. Subject to revision every Academic Year from 8 to 10%.",
          ],
        },
      ],
      educationLoan: {
        heading: "Education Loan",
        description:
          "The Institute will facilitate the students to avail educational loan from selected Banks. The bank officials will be present on campus at the time of registration of admitted students so as to enable the students to obtain details on procedures and terms and conditions of the loan. The students can also avail loan from banks of their choice and in either of the case; the Institute will extend support in completing the loan documentation process.",
        image: img(720, 480, "loan-banner"),
        ctaLabel: "Get Details",
        ctaHref: "/admission/ug/education-loan",
      },
      refundNote:
        "The refund policy for the withdrawing candidates is in accordance with the UGC rules.",
    },

    scholarships: {
      title: "Scholarships",
      intro:
        "DAU (Formerly DA-IICT), encourages bright young students to join its undergraduate, postgraduate and doctoral programs. The institute is committed to ensuring that every talented and deserving aspirant has access to its programs. Over the last five years, more than 3500 students across UG and PG have benefitted from the various scholarships offered at DAU (Formerly DA-IICT).",
      bullets: [
        "The Institute offers several merit cum means scholarships for students aspiring to join its UG and PG programs.",
        "UG and PG aspirants can also apply for scholarships provided by the Government of Gujarat. Additionally, DAU also offers scholarships that have been instituted by its alumni.",
        "Aspirants to the PhD program can benefit from the various fellowships available at the Institute.",
      ],
      cards: [
        {
          id: "sch1",
          title: "Financial Support",
          description:
            "DA-IICT is a place where academic programmes meet research-driven teaching, faculty with rich experience in research, state of the art ICT infrastructure and a vibrant campus life. Our jubilant student fraternity, highly qualified faculty, interdisciplinary curricula, and vibrant campus ambience are tightly interwoven to provide the highest standards of academic excellence and all-round development of its students.",
          ctaLabel: "Know More",
          ctaHref: "/admission/financial-support",
        },
        {
          id: "sch2",
          title: "UG Scholarships",
          description:
            "DA-IICT is a place where academic programmes meet research-driven teaching, faculty with rich experience in research, state of the art ICT infrastructure and a vibrant campus life. Our jubilant student fraternity, highly qualified faculty, interdisciplinary curricula, and vibrant campus ambience are tightly interwoven to provide the highest standards of academic excellence and all-round development of its students.",
          ctaLabel: "Know More",
          ctaHref: "/admission/scholarships",
        },
      ],
    },

    howToApply: {
      title: "How to apply?",
      backgroundImage: img(1600, 720, "apply-bg"),
      steps: [
        "There is one single online application form for B.Tech which includes B.Tech. (ICT), B.Tech (Honours) in ICT with minor in CS, B Tech (MnC), B.Tech. (EVD), B.Tech. (CS and AI) and B.Tech. (ECE-AI) programs. Applicants have to select preferences in order of their programs of choice.",
        "Please submit online application form by clicking on the link given below. Application fee (non-refundable) is Rs. 1500/- plus GST 18% (Total: Rs. 1770/-).",
        "The Candidate has to satisfy the eligibility criteria in order for her/his application to be considered for final admission.",
        "The admission to the candidates to the programs will be based on the All India Rank of Joint Entrance Examination 2026 (JEE-2026) Main. Therefore, candidates who are appearing for JEE 2026 Main can only apply for these programs.",
        "The short-listed candidates, based on the All India Ranking of JEE (Main) 2026, will be offered admission (confirmed/waitlisted) in order of their merit (based on the All India Ranking of JEE (Main) 2026). Counselling will be done online. Applicants are advised, from the date of announcement of first merit list, to check for e-mail communications from the Institute to learn about the admission status and steps they need to take to continue with the counselling process.",
        "The candidates who have accepted admission offers will be asked to appear for registration, document verification and payment of fees. Subsequent to this there will be orientation for those who have been given confirmed admission.",
      ],
      cta: {
        label: "Apply Now",
        href: "/admission/ug/apply",
      },
    },

    faqs: {
      title: "FAQs",
      items: [
        {
          id: "faq1",
          question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
          answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        },
        {
          id: "faq2",
          question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
          answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          id: "faq3",
          question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
          answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          id: "faq4",
          question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
          answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          id: "faq5",
          question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
          answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
      ],
    },

    ...overrides,
  };
}

export const ugAdmissionsPageData: UgAdmissionsPageData = {
  hero: {
    title: "Undergraduate Admissions",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    image: img(1200, 500, "ug-admission-hero"),
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Admission", href: "/admission" },
      { label: "Undergraduate Admissions", href: "/admission/ug" },
    ],
  },

  subNavLabel: "Undergraduate Admissions",
  subNav: [
    { label: "Imp. Dates",   href: "#important-dates" },
    { label: "Intake",       href: "#intake" },
    { label: "Program",      href: "#program-structures" },
    { label: "Placement",    href: "#placement-stats" },
    { label: "Eligibility",  href: "#eligibility" },
    { label: "Selection",    href: "#selection-criteria" },
    { label: "Fees",         href: "#fee-structure" },
    { label: "Scholarships", href: "#scholarships" },
    { label: "Related Links", href: "#how-to-apply" },
  ],

  applyBanner: {
    text: "Admissions are open, Apply Now!",
    cta: "Apply Now",
    href: "/admission/ug/apply",
  },

  categories: [
    makeCategory("all-india", "All India Category"),
    makeCategory("gujarat",   "Gujarat Category"),
    makeCategory("nri-dafs",  "NRI and Foreign National (DAFS) Category"),
  ],

  contact: {
    phone: "079 69 08 08 08",
    email: "ug_admissions@dau.ac.in",
  },

  cta: {
    left: {
      title: "Academic Calendar",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "/academics/calendar",
    },
    right: {
      title: "Academic Areas",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "/academics/areas",
    },
  },
};