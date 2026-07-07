import { ugAdmissionsPageData } from "@/data/ug-admissions";
import type {
  AdmissionCategoryOption,
  AdmissionCourseOption,
  AdmissionDataset,
  AdmissionPageData,
  AdmissionStreamOption,
  UgAdmissionCategory,
} from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

// ─────────────────────────────────────────────────────────────────────────────
//  FILTER HIERARCHY
//  Slugs mirror the WP taxonomy term slugs 1:1 (admission_stream /
//  admission_course / admission_category). When WP goes live this whole
//  block is replaced by the term lists coming from the REST API.
// ─────────────────────────────────────────────────────────────────────────────

const course = (
  slug: string,
  label: string,
  hasCategories = false
): AdmissionCourseOption => ({ slug, label, hasCategories });

export const admissionStreams: AdmissionStreamOption[] = [
  {
    slug: "undergraduate",
    label: "Undergraduate",
    courses: [
      course("btech-ict", "B.Tech. (ICT)", true),
      course(
        "btech-ict-cs",
        "B.Tech. (Honours) in ICT with minor in Computational Science",
        true
      ),
      course("btech-mnc", "B.Tech. (MnC)", true),
      course("btech-evd", "B.Tech. (EVD)", true),
      course("btech-cs-ai", "B.Tech. (CS and AI)", true),
      course("btech-ece-ai", "B.Tech. (ECE-AI)", true),
    ],
  },
  {
    slug: "dual-degree",
    label: "Dual Degree",
    courses: [
      course("bsms-it", "BS-MS in Information Technology"),
      course("bsms-dsai", "BS-MS in Data Science & Artificial Intelligence"),
    ],
  },
  {
    slug: "postgraduate",
    label: "Postgraduate",
    courses: [
      course("mtech-ict", "M.Tech. (ICT)"),
      course("msc-it", "M.Sc. (IT)"),
      course("msc-agri-analytics", "M.Sc. (Agriculture Analytics)"),
      course("msc-data-science", "M.Sc. (Data Science)"),
      course("mdes-iuxd", "M.Des. (IUxD)"),
    ],
  },
  {
    slug: "phd",
    label: "Ph.D",
    courses: [
      course("phd-regular", "Ph.D. (Regular & Part-Time)"),
      course("phd-visvesvaraya", "Visvesvaraya Ph.D. Scheme"),
    ],
  },
];

export const admissionCategories: AdmissionCategoryOption[] = [
  { slug: "all-india", label: "All India Category" },
  { slug: "gujarat", label: "Gujarat Category" },
  { slug: "nri-dafs", label: "NRI and Foreign National (DAFS) Category" },
];

// ─────────────────────────────────────────────────────────────────────────────
//  DATASETS (mock)
//  One dataset = one future WP `admission` post. B.Tech courses get one per
//  category (6 × 3 = 18); every other course gets exactly one (9). Content is
//  derived from the existing ug-admissions mock so all section components
//  render realistically; a marker line is prepended to the intro so filter
//  changes are visibly verifiable during development.
// ─────────────────────────────────────────────────────────────────────────────

/** B.Tech course × category → dataset, reusing the matching mock category. */
function categoryDataset(
  courseSlug: string,
  courseLabel: string,
  cat: UgAdmissionCategory
): AdmissionDataset {
  const { slug, label, ...content } = cat;
  return {
    ...content,
    courseSlug,
    categorySlug: slug,
    intro: [
      `You are viewing admission details for ${courseLabel} — ${label}.`,
      ...content.intro,
    ],
  };
}

/** Course without categories → single dataset from the All-India base. */
function standaloneDataset(
  courseSlug: string,
  courseLabel: string
): AdmissionDataset {
  const base = ugAdmissionsPageData.categories[0];
  const { slug, label, ...content } = base;
  return {
    ...content,
    courseSlug,
    intro: [
      `You are viewing admission details for ${courseLabel}.`,
      ...content.intro,
    ],
    intake: {
      title: "Intake",
      items: [{ id: "i1", program: courseLabel, count: "40" }],
    },
    selectionCriteria: {
      title: "Selection Criteria",
      paragraphs: [
        `Admission to ${courseLabel} is based on the eligibility and merit criteria published by the Institute for the current academic year. Shortlisted candidates will be offered admission (confirmed/waitlisted) in order of their merit.`,
        "The DAU (Formerly DA-IICT) reserves the right to change the eligibility, number of seats, admission policy and procedures etc., without any prior notice.",
      ],
    },
  };
}

export const admissionDatasets: AdmissionDataset[] = admissionStreams.flatMap(
  (stream) =>
    stream.courses.flatMap((c) =>
      c.hasCategories
        ? ugAdmissionsPageData.categories.map((cat) =>
            categoryDataset(c.slug, c.label, cat)
          )
        : [standaloneDataset(c.slug, c.label)]
    )
);

// ─────────────────────────────────────────────────────────────────────────────
//  PAGE DATA (/admission)
// ─────────────────────────────────────────────────────────────────────────────

export const admissionPageData: AdmissionPageData = {
  hero: {
    title: "Admissions",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    image: img(1200, 500, "admission-hero"),
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Admission", href: "/admission" },
    ],
  },

  subNavLabel: "Admissions",
  subNav: [
    { label: "Imp. Dates", href: "#important-dates" },
    { label: "Intake", href: "#intake" },
    { label: "Program", href: "#program-structures" },
    { label: "Placement", href: "#placement-stats" },
    { label: "Eligibility", href: "#eligibility" },
    { label: "Selection", href: "#selection-criteria" },
    { label: "Fees", href: "#fee-structure" },
    { label: "Scholarships", href: "#scholarships" },
    { label: "Related Links", href: "#how-to-apply" },
  ],

  applyBanner: {
    text: "Admissions are open, Apply Now!",
    cta: "Apply Now",
    href: "/admission/apply",
  },

  filter: {
    streams: admissionStreams,
    categories: admissionCategories,
    placeholders: {
      stream: "Select Stream",
      course: "Select Course",
      category: "Select Category",
    },
    emptyPrompt:
      "Select a stream and course above to view important dates, eligibility, fee structure, scholarships and the complete application guide.",
  },

  contact: {
    phone: "079 69 08 08 08",
    email: "admissions@dau.ac.in",
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
