import type { NavItem, UtilityLink } from "@/lib/types";

// Primary navigation. Labels follow the Figma header; dropdown children
// follow nav-menu.md. When moving to WordPress, populate this from a
// "menus" endpoint (e.g. WPGraphQL `menuItems`) and keep the same shape.
export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "Dean", href: "/academics/dean" },
      { label: "SOT", href: "/academics/sot" },
      { label: "Academic Areas", href: "/academics/areas" },
      { label: "UG Programs", href: "/academics/ug-programs" },
      { label: "B.Tech", href: "/academics/btech" },
    ],
  },
  {
    label: "Admission",
    href: "/admission",
    children: [
      { label: "Financial Support", href: "/admission/financial-support" },
      { label: "UG Scholarships", href: "/admission/ug-scholarships" },
    ],
  },
  {
    label: "Faculty",
    href: "/faculty",
    children: [
      { label: "Dean Faculty", href: "/faculty/dean" },
      { label: "Faculty Recruitment", href: "/faculty/recruitment" },
      { label: "Faculty Handbook", href: "/faculty/handbook" },
      { label: "Faculty Development & Evaluation", href: "/faculty/development" },
    ],
  },
  {
    label: "Research",
    href: "/research",
    children: [
      { label: "Dean Research", href: "/research/dean" },
      { label: "Research Areas", href: "/research/areas" },
      { label: "Grants & Projects", href: "/research/grants" },
      { label: "Awards", href: "/research/awards" },
    ],
  },
  {
    label: "Placement",
    href: "/placements",
    children: [
      { label: "Placement Team", href: "/placements/team" },
      { label: "Placement Stats", href: "/placements/stats" },
      { label: "Top Recruiter", href: "/placements/top-recruiters" },
      { label: "Placement Internship", href: "/placements/internship" },
    ],
  },
  {
    label: "Life@DAU",
    href: "/life",
    children: [
      { label: "Dean Student", href: "/life/dean" },
      { label: "Campus Life", href: "/life/campus" },
      { label: "Student Support", href: "/life/support" },
      { label: "Fest & Events", href: "/life/events" },
    ],
  },
  {
    label: "News & Events",
    href: "/newsroom",
    children: [
      { label: "Infocus Template", href: "/newsroom/infocus" },
      { label: "Newsletter", href: "/newsroom/newsletter" },
      { label: "Photo Gallery", href: "/newsroom/gallery" },
    ],
  },
  { label: "Centers", href: "/centers" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Leadership", href: "/about/leadership" },
      { label: "Administration", href: "/about/administration" },
    ],
  },
];

export const utilityLinks: UtilityLink[] = [
  { label: "Apply", href: "/apply" },
  { label: "Scholarships", href: "/admission/ug-scholarships" },
  { label: "Alumni", href: "/alumni" },
  { label: "Work@DAU", href: "/careers" },
  { label: "Resources", href: "/resources" },
  { label: "Accreditations & Compliance", href: "/accreditations" },
  { label: "People", href: "/people" },
  { label: "Campus Tour", href: "/campus-tour" },
];

export const footerLinks = {
  primary: [
    { label: "Academics & Admissions", href: "/academics" },
    { label: "Faculty & Research", href: "/faculty" },
    { label: "Placements", href: "/placements" },
    { label: "Life@DAU", href: "/life" },
    { label: "News & Events", href: "/newsroom" },
    { label: "Centers", href: "/centers" },
    { label: "About Us", href: "/about" },
    { label: "People", href: "/people" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
  portal: [
    { label: "eCampus", href: "#" },
    { label: "Alumni Portal", href: "#" },
    { label: "Payment Portal", href: "#" },
    { label: "Donation", href: "#" },
    { label: "Student Service & Exam Rules", href: "#" },
    { label: "Parents", href: "#" },
    { label: "Application Portal", href: "#" },
  ],
  other: [
    { label: "UGC Performa/Mandatory Disclosure", href: "#" },
    { label: "CEP", href: "#" },
    { label: "Holiday List", href: "#" },
    { label: "eProcurement", href: "#" },
  ],
};
