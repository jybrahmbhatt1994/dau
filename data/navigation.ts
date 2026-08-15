import type { NavItem, UtilityLink } from "@/lib/types";

// Primary navigation. Labels follow the Figma header; dropdown children
// follow nav-menu.md. When moving to WordPress, populate this from a
// "menus" endpoint (e.g. WPGraphQL `menuItems`) and keep the same shape.
export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    // Parent trigger only — no page of its own. All real destinations
    // live on the children below (per client requirement).
    label: "Academics",
    href: "/academics",
    children: [
      { label: "Office of Dean Academics", href: "/academics/dean" },
      {
        // "Schools" is a trigger-only group, same rule as the parent.
        label: "Schools",
        href: "#",
        children: [
          {
            // SOT itself has no standalone page in this hierarchy — only
            // its programmes do. Give it a real href instead if SOT should
            // also be clickable on desktop (see chat note).
            label: "School of Technology",
            href: "/academics/sot",
            children: [
              { label: "Undergraduate Programmes", href: "/academics/program/undergraduate-programs" },
              { label: "Dual Degree", href: "/academics/program/dual-degree-programs" },
              { label: "Graduate Programmes", href: "/academics/program/postgraduate-programs" },
              { label: "Doctoral Programmes", href: "/academics/program/doctoral-program" },
            ],
          },
          { label: "School of Law", href: "https://sol.daiict.ac.in/" },
        ],
      },
      { label: "Academic Areas", href: "/academics/areas" },
      {
        // "Schools" is a trigger-only group, same rule as the parent.
        label: "Academic Support",
        href: "#",
        children: [
          { label: "Resource Centre", href: "/academics/support/resource-centre" },
          { label: "Research Labs", href: "https://lab.daiict.ac.in/index.php/essential/lab-da-iict" },
          { label: "Teaching Labs", href: "https://lab.daiict.ac.in/index.php/essential/lab-da-iict" },
          { label: "Computional Resources", href: "/academics/support/computational-resources" },
        ],
      },
      // TODO: replace with the real LMS URL — external link, opens in new tab.
      { label: "Moodle", href: "https://moodle.dau.ac.in" },
    ],
  },
  {
    label: "Admission",
    href: "#",
    children: [
      { label: "Programme Admission", href: "/admission" },
      { label: "Scholarships", href: "/admission/scholarships" },
      { label: "Financial Support", href: "/admission/financial-support" },
    ],
  },
  {
    label: "Faculty",
    href: "#",
    children: [
      { label: "Office of the Dean-Faculty", href: "/faculty/dean" },
      { label: "Faculty", href: "/faculty" },
      { label: "Faculty Recruitment", href: "/faculty/recruitment" },
      { label: "Faculty Development & Evaluation", href: "/faculty/development" },
      { label: "Faculty Handbook", href: "/faculty/handbook" },
    ],
  },
  {
    label: "Research",
    href: "#",
    children: [
      // { label: "Research", href: "/research" },
      { label: "Office of the Dean-Research", href: "/research/dean" },
      { label: "Research Areas", href: "/research/areas" },
      // { label: "Research Labs", href: "#" },
      { label: "Grants & Projects", href: "/research/grants" },
      { label: "Noteworthy Contributions", href: "#",
        children: [
          { label: "Accomplishments", href: "#" },
          { label: "Outreach and Contrbutions", href: "#" },
        ],
       },
      { label: "Partnerships", href: "#" },
      { label: "Awards", href: "/research/awards" },
    ],
  },
  {
    label: "Placement",
    href: "#",
    children: [
      // { label: "Placement", href: "/placements" },
      { label: "Placement Team", href: "/placements/team" },
      { label: "Placement Stats", href: "/placements/stats" },
      { label: "The Career Preparatory Programme", href: "/placements/career-preparatory-programme" },
      { label: "Top Recruiter", href: "/placements/recruiters" },
      { label: "Placement Internship", href: "/placements/internships" },
    ],
  },
  {
    label: "Life@DAU",
    href: "#",
    children: [
      // { label: "Overview", href: "/life" },
      { label: "Office of Dean Students", href: "/life/dean" },
      { label: "Campus Life", href: "/life/campus" },
      { label: "Student Support", href: "/life/support" },
      { label: "Fest & Events", href: "/life/events" },
    ],
  },
  {
    label: "News & Events",
    href: "#",
    children: [
      { label: "Newsroom", href: "/newsroom" },
      { label: "In focus", href: "/newsroom/student-stories" },
      { label: "Alumni Write Ups", href: "/newsroom/alumni-write-ups" },
      { label: "Photo Gallery", href: "/newsroom/photo-gallery" },
    ],
  },
  { label: "Centers", href: "#",
    children: [
      { label: "Resource Centre", href: "/academics/support/resource-centre" },
      { label: "SELC", href: "#" },
      { label: "DCEI", href: "#" },
    ],
   },
  {
    label: "About",
    href: "#",
    children: [
      { label: "Mission and Vision", href: "/about" },
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