// Content type definitions.
// These intentionally mirror the shape we expect to map from WordPress
// (REST `wp/v2` or WPGraphQL). Keep components depending on THESE types,
// not on the WordPress response shape, so the CMS can change freely.

export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export interface UtilityLink {
  label: string;
  href: string;
}

export interface ProgramCard {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  position: string;
  image: string;
  href: string;
}

export interface ResearchCard {
  id: string;
  title: string;
  date: string;
  image: string;
  href: string;
}

export interface PublicationItem {
  id: string;
  title: string;
  date: string;
  image: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface LifeCard {
  id: string;
  title: string;
  image: string;
  href: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt?: string;
  date: string;
  image: string;
  href: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  image: string;
  href: string;
}

export interface SectionIntro {
  title: string;
  description: string;
}

export interface HeroImage {
  url: string;
  alt: string;
}

export interface HeroContent {
  eyebrow: string;
  eyebrowSub?: string;
  rankLabel: string;
  rankValue: string;
  subline: string;
  images: HeroImage[]; // was: string[]
}

export interface ContactContent {
  socialTitle: string;
  socialDescription: string;
  linkedinUrl: string;
  xUrl: string;
  contactTitle: string;
  contactDescription: string;
  phone: string;
  email: string;
}

export interface HomeData {
  hero: HeroContent;
  academics: SectionIntro & { cards: ProgramCard[] };
  admissionCta: {
    eyebrow: string;
    title: string;
    description: string;
  };
  faculty: SectionIntro & { members: FacultyMember[] };
  research: SectionIntro & { cards: ResearchCard[] };
  publications: SectionIntro & { items: PublicationItem[] };
  placements: SectionIntro & {
    gallery: string[];
    recruiters: RecruiterLogo[];
    stats: Stat[];
  };
  life: SectionIntro & { cards: LifeCard[] };
  news: SectionIntro & { featured: NewsArticle; list: NewsArticle[] };
  events: { title: string; items: EventItem[] };
  centers: SectionIntro & { cards: ProgramCard[] };
  diversity: { title: string; description: string; image: string };
  contact: ContactContent;
}

// ============================================================================
//  SHARED INNER-PAGE PRIMITIVES
//  Reuse PageHeroContent / SubNavLink / CtaPanel on every inner page.
// ============================================================================

/** Shared inner-page hero (image + dark panel with title/subline). */
export interface PageHeroContent {
  title: string;
  subline?: string;
  image: string;
  breadcrumb?: NavChild[];
}

/** A link in the lavender page anchor-nav bar under the hero. */
export interface SubNavLink {
  label: string;
  href: string;
}

/** One half of a gold/red split CTA. Title optional (some CTAs are title-less). */
export interface CtaPanel {
  title?: string;
  description: string;
  cta: string;
  href: string;
}

// ============================================================================
//  ACADEMICS — landing page
// ============================================================================

export interface DeanMessageContent {
  title: string;
  paragraphs: string[];
  email: string;
  image: string;
}

export interface SchoolCard {
  id: string;
  title: string;
  image: string;
  href: string;
}

export interface AreaCard {
  id: string;
  title: string;
  image: string;
  href: string;
}

export interface SupportCard {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
}

export interface AcademicsData {
  hero: PageHeroContent;
  subNav: SubNavLink[];
  dean: DeanMessageContent;
  schools: SectionIntro & { cards: SchoolCard[] };
  programs: SectionIntro & { cards: ProgramCard[] };
  areas: { title: string; description: string; cards: AreaCard[] };
  support: { title: string; cards: SupportCard[] };
  cta: { calendar: CtaPanel; catalogue: CtaPanel };
}

// ============================================================================
//  ACADEMICS — Office of Dean sub-page (/academics/dean)
// ============================================================================

export interface Official {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  image: string;
}

export interface DeansDeskContent {
  title: string;
  paragraphs: string[];
  image: string;
  /** Academics-dean variant */
  functionsTitle?: string;
  functionsParagraphs?: string[];
  email?: string;
  /** Student-dean variant */
  name?: string;
  role?: string;
}

export interface DeanStudentPageData {
  hero: PageHeroContent;
  subNavLabel: string;
  subNav: SubNavLink[];
  desk: DeansDeskContent;
  contact: { phone: string; email: string };
  officials: { title: string; people: Official[] };
  cta: { left: CtaPanel; right: CtaPanel };
}

export interface DeanPageData {
  hero: PageHeroContent;
  subNav: SubNavLink[];
  desk: DeansDeskContent;
  officials: { title: string; people: Official[] };
  cta: { calendar: CtaPanel; areas: CtaPanel };
}

// ============================================================================
//  SCHOOL sub-page (e.g. /academics/sot — School of Technology)
//  Hero reuses HeroContent (homepage hero, dark panel variant).
// ============================================================================

export interface ResearchArea {
  id: string;
  title: string;
  image: string;
  href: string;
}

export interface PeopleCategory {
  id: string;
  label: string;
  image: string;
  href: string;
}

export interface VisionMissionBlock {
  title: string;
  body: string;
}

export interface SchoolPageData {
  hero: HeroContent;
  subNav: SubNavLink[];
  intro: {
    paragraphs: string[];
    vision: VisionMissionBlock;
    mission: VisionMissionBlock;
  };
  programs: SectionIntro & { cards: ProgramCard[] };
  research: SectionIntro & { cards: ResearchArea[] };
  people: { title: string; categories: PeopleCategory[] };
  /** Reuses the existing homepage <NewsEvents /> component and its data shape. */
  news: HomeData["news"];
  events: { title: string; items: EventItem[]; allHref: string };
  cta: { calendar: CtaPanel; areas: CtaPanel };
}

// ============================================================================
//  ACADEMICS — Academic Areas sub-page (/academics/areas)
//  Reuses AreaCard (grid) + the AcademicAreas component.
// ============================================================================

export interface AcademicAreasPageData {
  hero: PageHeroContent;
  subNav: SubNavLink[];
  /** Full-width intro paragraphs (one entry per paragraph). */
  intro: string[];
  areasOfStudy: { title: string; description: string; cards: AreaCard[] };
  cta: { calendar: CtaPanel; catalogue: CtaPanel };
}

// ============================================================================
//  ACADEMICS — Undergraduate Programs sub-page (/academics/ug-programs)
//  Pure composition: reuses ProgramSlider (Courses), the homepage AdmissionCTA
//  + FacultySection, AcademicSupport, ProseIntro and SplitCta.
// ============================================================================

export interface UgProgramsPageData {
  hero: PageHeroContent;
  /** Left label in the lavender sub-nav bar. */
  subNavLabel: string;
  subNav: SubNavLink[];
  /** Full-width intro paragraphs. */
  intro: string[];
  /** "Courses" slider — leave description "" to show the title only. */
  courses: SectionIntro & { cards: ProgramCard[] };
  /** Reuses the homepage AdmissionCTA data shape. */
  admissionCta: HomeData["admissionCta"];
  /** Reuses the homepage FacultySection data shape. */
  faculty: HomeData["faculty"];
  support: { title: string; cards: SupportCard[] };
  cta: { calendar: CtaPanel; catalogue: CtaPanel };
}

// ============================================================================
//  ACADEMICS — Program detail page (e.g. /academics/btech-ict)
// ============================================================================

/** Flexible rich block: title + prose, with optional bullets/image/gallery/button. */
export interface ProgramBlock {
  id?: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  /** If present, renders as a 2-column block with the image on the right. */
  image?: string;
  /** If present, renders a full-width image strip beneath the prose. */
  gallery?: string[];
  /** Optional centered gold button. */
  button?: { label: string; href: string };
}

export interface OutcomeItem {
  code: string; // "PO1", "PSO1", …
  lead?: string; // bold lead-in, e.g. "Engineering knowledge:"
  body: string;
}

export interface SemesterItem {
  id: string;
  title: string; // "Semester 1"
  description: string;
  courses: { name: string; ltpc: string }[]; // ltpc values, e.g. "1-0-2-2"
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ProgramPageData {
  hero: PageHeroContent;
  subNavLabel: string;
  subNav: SubNavLink[];
  applyBanner: { text: string; cta: string; href: string };
  intro: string[];
  honours: ProgramBlock;
  honoursMinor: ProgramBlock;
  outcomes: {
    programOutcomes: { title: string; viewAllHref: string; items: OutcomeItem[] };
    specificOutcomes: { title: string; items: OutcomeItem[] };
  };
  coreCourses: ProgramBlock;
  electiveCourses: ProgramBlock;
  coCurricular: ProgramBlock;
  semesters: { title: string; description: string; items: SemesterItem[] };
  electives: { title: string; description: string; items: string[] };
  admissionCta: HomeData["admissionCta"];
  faqs: { title: string; items: FaqItem[] };
  contact: { phone: string; email: string };
  cta: { calendar: CtaPanel; areas: CtaPanel };
}

// ============================================================================
//  ABOUT — About DAU page (/about)
//  Reuses SchoolIntro (intro + Vision/Mission), the homepage ConnectContact,
//  plus a media+text block and a diversity callout.
// ============================================================================

export interface AboutPageData {
  hero: PageHeroContent;
  subNavLabel: string;
  subNav: SubNavLink[];
  /** Same shape SchoolIntro consumes (paragraphs + Vision/Mission). */
  intro: {
    paragraphs: string[];
    vision: VisionMissionBlock;
    mission: VisionMissionBlock;
  };
  media: { image: string; paragraphs: string[] };
  diversity: { title: string; description: string };
  /** Reuses the homepage ConnectContact data shape. */
  contact: HomeData["contact"];
}

// ============================================================================
//  ABOUT — Leadership page (/about/leadership)
//  Reuses ProseIntro, DiversityCallout, ConnectContact + a people slider and a
//  single-leader profile.
// ============================================================================

export interface LeaderProfileContent {
  id?: string; // optional anchor id
  title: string; // section title, e.g. "President"
  name: string;
  role: string;
  image: string;
  bio: string[];
}

export interface LeadershipPageData {
  hero: PageHeroContent;
  subNavLabel: string;
  subNav: SubNavLink[];
  intro: string[];
  president: LeaderProfileContent;
  boardOfGovernors: SectionIntro & { members: FacultyMember[] };
  academicCouncil: SectionIntro & { members: FacultyMember[] };
  financeCommittee: SectionIntro & { members: FacultyMember[] };
  directorGeneral: LeaderProfileContent;
  directors: SectionIntro & { members: FacultyMember[] };
  diversity: { title: string; description: string };
  contact: HomeData["contact"];
}

// ============================================================================
//  ABOUT — Administration page (/about/administration)
//  A sequence of LeaderProfile blocks (alternating image side) + reused
//  ProseIntro / DiversityCallout / ConnectContact.
// ============================================================================

export interface AdministrationPageData {
  hero: PageHeroContent;
  subNavLabel: string;
  subNav: SubNavLink[];
  intro: string[];
  /** Offices in display order; the route alternates image side + background. */
  profiles: LeaderProfileContent[];
  diversity: { title: string; description: string };
  contact: HomeData["contact"];
}

// ============================================================================
//  NEWS / IN FOCUS pages
// ============================================================================

export interface MediaLinkItem {
  id: string;
  date: string;
  title: string;
  href: string;
}

export interface MediaColumn {
  title: string;
  items: MediaLinkItem[];
  viewAllHref: string;
}

// --- Newsroom (/newsroom) ---------------------------------------------------
export interface NewsroomPageData {
  hero: PageHeroContent;
  subNavLabel: string;
  subNav: SubNavLink[];
  intro: string[];
  media: { inMedia: MediaColumn; pressRelease: MediaColumn };
  /** Reuses the homepage <NewsEvents /> shape (title + featured + list). */
  latestNews: HomeData["news"];
  stories: SectionIntro & { items: NewsArticle[]; viewAllHref: string };
  /** Reuses the generalized <SchoolsSection /> (banner + title + arrow). */
  podcasts: SectionIntro & { cards: SchoolCard[] };
  cta: { left: CtaPanel; right: CtaPanel };
}

// --- Photo Gallery (/newsroom/photo-gallery) --------------------------------
export interface PhotoGalleryPageData {
  hero: PageHeroContent;
  subNavLabel: string;
  subNav: SubNavLink[];
  /** Left-column paragraph (SchoolsSection with no title). */
  intro: string;
  categories: SchoolCard[];
  cta: { calendar: CtaPanel; areas: CtaPanel };
}

// --- Card-grid template (Newsletters + Student Stories) ---------------------
export interface CardGridPageData {
  hero: PageHeroContent;
  subNavLabel: string;
  subNav: SubNavLink[];
  intro: string[];
  items: NewsArticle[]; // image + date + title + href
  cta: { left: CtaPanel; right: CtaPanel };
}
// ============================================================================
//  LIFE@DAU — Campus Life page (/life/campus)
//  Reuses PageHero, PageSubNav, ProseIntro, ProgramSlider/ProgramCard,
//  ProgramGallery and SplitCta; adds Campus-Life-specific media/feature blocks.
// ============================================================================

export interface MediaCarouselSlide {
  image: string;
  caption?: string;
}

/** Media slot for a FeatureSection: a full-bleed gallery, a two-up image pair,
 *  or a single-image carousel. */
export type FeatureMedia =
  | { kind: "gallery"; images: string[] }
  | { kind: "duo"; images: [string, string] }
  | { kind: "carousel"; slides: MediaCarouselSlide[] };

/** "Title + prose + media" block. `afterParagraphs` render below the media. */
export interface FeatureSection {
  id?: string;
  title: string;
  paragraphs: string[];
  afterParagraphs?: string[];
  media: FeatureMedia;
}

export interface VirtualTourContent {
  image: string;
  label: string;
  href: string;
}

export interface SuccessStory {
  id: string;
  quote: string;
  name: string;
  year: string;
  image: string;
}

export interface CampusLifePageData {
  hero: PageHeroContent;
  subNavLabel: string;
  subNav: SubNavLink[];
  /** Full-width intro paragraphs (ProseIntro). */
  intro: string[];
  studentLife: FeatureSection; // gallery + trailing paragraph
  virtualTour: VirtualTourContent;
  residenceLife: FeatureSection; // captioned single-image carousel
  sportsFacilities: FeatureSection; // two-up images
  /** "Student Clubs" — reuses ProgramSlider (pass description "" for title-only). */
  clubs: SectionIntro & { cards: ProgramCard[] };
  studentBody: { title: string; members: FacultyMember[] };
  ieee: FeatureSection; // single-image carousel (no caption)
  successStories: SectionIntro & { items: SuccessStory[] };
  /** title-less gold + red split CTA. */
  cta: { left: CtaPanel; right: CtaPanel };
}

// ============================================================================
//  LIFE@DAU — Student Support page (/life/support)
//  Reuses PageHero, PageSubNav, ProseIntro, ProgramContentBlock (Wellbeing
//  intro), ContactPills and SplitCta; adds a rich accordion + a schedule block.
// ============================================================================
 
export interface SupportAccordionItem {
  id: string;
  title: string;
  paragraphs?: string[];
  /** Optional inline link appended to the last paragraph (e.g. "click here"). */
  link?: { label: string; href: string };
  image?: string;
  button?: { label: string; href: string };
}
 
export interface ScheduleCell {
  name: string;
  time: string;
}
 
export interface StudentSupportPageData {
  hero: PageHeroContent;
  subNavLabel: string;
  subNav: SubNavLink[];
  intro: string[];
  /** "Student Wellbeing" — title + prose + cream contact pills. */
  wellbeing: { title: string; paragraphs: string[]; phone: string; email: string };
  /** Anti-ragging accordion (first item open by default). */
  antiRagging: SupportAccordionItem[];
  /** "Medical Facility" — title + intro + schedule grid + trailing prose. */
  medical: { title: string; intro: string[]; cells: ScheduleCell[]; outro: string[] };
  /** title-less gold + red split CTA. */
  cta: { left: CtaPanel; right: CtaPanel };
}

// ============================================================================
//  LIFE@DAU — Fest & Events page (/life/events)
//  Reuses PageHero, PageSubNav, ProseIntro, PaginatedCardGrid ("more" mode) and
//  SplitCta; adds a featured "Upcoming Fest" carousel.
// ============================================================================
 
export interface FestEventsPageData {
  hero: PageHeroContent;
  subNavLabel: string;
  subNav: SubNavLink[];
  intro: string[];
  /** "Upcoming Fest" featured carousel (date + title overlay card). */
  upcomingFest: { title: string; items: EventItem[] };
  /** "Upcoming Events" 3-col grid with a Show More button. */
  upcomingEvents: { title: string; items: NewsArticle[] };
  cta: { left: CtaPanel; right: CtaPanel };
}

// ============================================================================
//  RESEARCH — Dean (Research) page (/research/dean)
//  Reuses PageHero, PageSubNav, OfficialsSection, SplitCta.
//  New: DeanResearchDesk (desk message + cream contact pills),
//       ResearchFunctionsBlock (mixed prose + bullets).
// ============================================================================

export interface DeanResearchDeskData {
  title: string;
  paragraphs: string[];
  name: string;
  role: string;
  image: string;
  phone: string;
  email: string;
}

export interface ResearchBulletGroup {
  /** Optional lead sentence rendered as a paragraph before the bullet list. */
  lead?: string;
  items: string[];
}

export interface ResearchFunctionsData {
  title: string;
  /** Prose paragraphs before the first bullet group. */
  introParagraphs: string[];
  /** One or more groups of bullet items, each with an optional lead sentence. */
  bulletGroups: ResearchBulletGroup[];
  /** Prose paragraphs after all bullet groups. */
  outroParagraphs: string[];
}

export interface DeanResearchPageData {
  hero: PageHeroContent;
  subNavLabel: string;
  subNav: SubNavLink[];
  desk: DeanResearchDeskData;
  functions: ResearchFunctionsData;
  officials: { title: string; people: Official[] };
  /** left = gold half (e.g. "Dean Faculty"), right = red half (e.g. "Faculty List") */
  cta: { left: CtaPanel; right: CtaPanel };
}

// ============================================================================
//  RESEARCH — Research Areas page (/research/areas)
//  Reuses PageHero, PageSubNav, ProseIntro, ResearchAreasGrid (new component
//  that mirrors AcademicAreas but stays on a white background throughout),
//  and SplitCta.
// ============================================================================

export interface ResearchAreasPageData {
  hero: PageHeroContent;
  subNavLabel: string;
  subNav: SubNavLink[];
  /** Full-width intro paragraphs on white background (ProseIntro). */
  intro: string[];
  /** "Areas" section — BleedTitle + description + 2-col AreaCard grid. */
  areas: {
    title: string;
    description: string;
    cards: AreaCard[];
  };
  /** left = gold half ("Dean Faculty"), right = red half ("Faculty List") */
  cta: { left: CtaPanel; right: CtaPanel };
}

// ============================================================================
//  RESEARCH — Research Area Detail page (/research/areas/[slug])
//  Dynamic page per research area (AI/ML, Algorithms, etc.).
//  New sections: AreaDetailIntro (2-col prose + director message),
//  AreaFacultySlider (portrait row), ResearchGroupsGrid (lab cards + button),
//  SponsoredResearchTable (paginated table), CurrentPublications (3-col cards),
//  VideoCta (full-bleed play button), UpcomingEvents (reused), SplitCta.
// ============================================================================

/** Inline types used only on the detail page */
export interface AreaDetailIntroData {
  paragraphs: string[];
  directorName: string;
  directorRole: string;
  directorMessage: string;
}

export interface SponsoredProject {
  id: string;
  pi: string;
  title: string;
  fundingAgency: string;
  duration: string;
  amount: string;
}

export interface PublicationCard {
  id: string;
  image: string;
  date: string;
  excerpt: string;
  author: string;
  href: string;
}

export interface VideoCta {
  image: string;
  label: string;
  href: string;
}

export interface ResearchAreaDetailPageData {
  hero: PageHeroContent;
  subNavLabel: string;
  subNav: SubNavLink[];
  intro: AreaDetailIntroData;
  faculty: SectionIntro & { members: FacultyMember[] };
  groups: {
    title: string;
    cards: AreaCard[];
    projectsHref: string;
    projectsCta: string;
  };
  sponsored: {
    title: string;
    projects: SponsoredProject[];
  };
  publications: {
    title: string;
    items: PublicationCard[];
  };
  videoCta: VideoCta;
  events: { title: string; items: EventItem[]; allHref: string };
  cta: { left: CtaPanel; right: CtaPanel };
}

// ============================================================================
//  RESEARCH — Grants & Projects page (/research/grants)
//  Reuses PageHero, PageSubNav, ProseIntro, SponsoredResearchTable, SplitCta.
//  New: GrantsTabs — client-side tab switcher with sticky-left heading and
//  vertical grant cards list.
// ============================================================================

/** Single grant entry shown inside a tab panel */
export interface GrantCard {
  id: string;
  name: string;
  description: string;
  applyLabel: string;
  applyHref: string;
  /** Optional href for the whole card header; arrow is decorative when omitted */
  detailHref?: string;
}

/** One tab panel: pill label + section heading + description + cards list */
export interface GrantsTabList {
  tabLabel: string;
  sectionTitle: string;
  description: string;
  cards: GrantCard[];
}

export interface GrantsPageData {
  hero: PageHeroContent;
  subNavLabel: string;
  subNav: SubNavLink[];
  intro: string[];
  /** Exactly two tabs by Figma: Available Grants + Past Grants */
  tabs: [GrantsTabList, GrantsTabList];
  /** Reuses the SponsoredResearchTable + SponsoredProject types */
  sponsored: {
    title: string;
    projects: SponsoredProject[];
  };
  cta: { left: CtaPanel; right: CtaPanel };
}

// ============================================================================
//  RESEARCH — Awards & Recognition page (/research/awards)
//  Reuses PageHero, PageSubNav, ProseIntro, SplitCta.
//  New: AwardeesTable — year-keyed list of awardees with segmented year tabs.
//       PolicySection — BleedTitle + mixed prose/bullets + optional gold CTA.
// ============================================================================

/** Single awardee row in the List of Awardees table */
export interface Awardee {
  id: string;
  studentName: string;
  publicationMonth: string;
  publicationVenue: string;
  facultyAuthor: string;
  title: string;
}

/**
 * One year's awardee list. Keyed by year string so the CMS can later fetch
 * each year independently without changing the component contract.
 */
export interface AwardeesYearGroup {
  year: string;        // e.g. "2025-26"
  awardees: Awardee[];
}

/** A group of bullet items used by PolicySection */
export interface PolicyBulletGroup {
  /** Optional lead sentence rendered as a paragraph before the bullet list */
  lead?: string;
  items: string[];
}

/** Content shape consumed by PolicySection */
export interface PolicyData {
  title: string;
  introParagraphs: string[];
  bulletGroups: PolicyBulletGroup[];
  outroParagraphs: string[];
  button?: {
    label: string;
    href: string;
    external?: boolean;
  };
}

export interface AwardsPageData {
  hero: PageHeroContent;
  subNavLabel: string;
  subNav: SubNavLink[];
  intro: string[];
  awardees: {
    title: string;
    /** Ordered list of years (newest first usually). Active = years[0] */
    years: AwardeesYearGroup[];
  };
  policy: PolicyData;
  cta: { left: CtaPanel; right: CtaPanel };
}

// ============================================================================
//  FACULTY — landing page (/faculty)
//  Reuses PageHero, PageSubNav, AdmissionsBanner, SplitCta.
//  New: FacultyExplorer — tabs (by faculty type) + intro + search + paginated
//       grid + FacultyCard (portrait with hover-reveal navy panel).
// ============================================================================

/**
 * One faculty category (= one tab on the explorer).
 * Keyed by `slug` so CMS can fetch each category's faculty independently.
 */
export interface FacultyTabData {
  /** Stable slug used for data lookups and any future routing */
  slug: string;
  /** Pill label shown in the tab row (e.g. "Regular Faculty") */
  label: string;
  /** Intro paragraph shown below the tabs when this tab is active */
  intro: string;
  members: FacultyMember[];
}

export interface FacultyPageData {
  hero: PageHeroContent;
  subNavLabel: string;
  subNav: SubNavLink[];
  /** Cream banner near the top — "Interested in becoming a faculty" + CTA */
  applyBanner: { text: string; cta: string; href: string };
  tabs: FacultyTabData[];
  cta: { left: CtaPanel; right: CtaPanel };
}

// ============================================================================
//  FACULTY — Dean (Faculty) sub-page (/faculty/dean)
//  Reuses PageHero, PageSubNav, SplitCta.
//  New: DeanFacultyDesk — message + portrait + single lavender email pill
//  on a white band. Variant of the Dean (Research) desk pattern, white-bg with
//  email-only contact.
// ============================================================================

export interface DeanFacultyDeskData {
  title: string;
  /** Paragraphs render with whitespace-pre-line so "\n" inside a string
   *  becomes a line break (used to separate the greeting from body copy). */
  paragraphs: string[];
  name: string;
  role: string;
  image: string;
  email: string;
}

export interface DeanFacultyPageData {
  hero: PageHeroContent;
  subNavLabel: string;
  subNav: SubNavLink[];
  desk: DeanFacultyDeskData;
  /** left = gold ("Faculties @ DAU"), right = red ("Faculty Recruitment") */
  cta: { left: CtaPanel; right: CtaPanel };
}

// ============================================================================
//  FACULTY — Faculty Recruitment sub-page (/faculty/recruitment)
//  Reuses PageHero, PageSubNav, ProseIntro, AdmissionsBanner, ProgramGallery,
//  SplitCta. New: CurrentOpenings (2-col cards), EligibilityCriteria (tabs),
//  TitledProseBlock (generic titled sub-blocks).
// ============================================================================

/** Single tab on the Eligibility Criteria section */
export interface EligibilityTab {
  /** Stable slug (e.g. "assistant", "associate", "education", "age") */
  slug: string;
  /** Pill label shown in the segmented control */
  label: string;
  /** Body paragraphs rendered when this tab is active */
  paragraphs: string[];
  /** Optional bullet list rendered below the paragraphs */
  bullets?: string[];
}

/** One titled sub-block inside a TitledProseBlock section. */
export interface TitledSubBlock {
  /** Optional h3 heading above the prose */
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  /** Optional lead-in paragraph above the bullets */
  bulletsLead?: string;
}

/** Content shape consumed by TitledProseBlock */
export interface TitledProseBlockData {
  title: string;
  /** Optional section-level intro paragraph between the title and sub-blocks */
  intro?: string;
  blocks: TitledSubBlock[];
}

export interface FacultyRecruitmentPageData {
  hero: PageHeroContent;
  subNavLabel: string;
  subNav: SubNavLink[];
  /** Cream banner near the top — same shape as the Faculty landing banner */
  applyBanner: { text: string; cta: string; href: string };
  intro: string[];
  openings: {
    title: string;
    description: string;
    cards: AreaCard[];
  };
  eligibility: {
    title: string;
    tabs: EligibilityTab[];
  };
  /** "Prospective Faculty" — multi-block titled prose */
  prospective: TitledProseBlockData;
  /** Image strip between Prospective Faculty and Compensation Package */
  gallery: { images: string[] };
  /** "Compensation Package" — multi-block titled prose with bullets */
  compensation: TitledProseBlockData;
  cta: { left: CtaPanel; right: CtaPanel };
}

// ============================================================================
//  FACULTY — Faculty Handbook sub-page (/faculty/handbook)
//  Reuses PageHero, PageSubNav, AdmissionsBanner, SplitCta.
//  New: HandbookContent — prose + centered gold "Download Handbook" button.
// ============================================================================

export interface HandbookContentData {
  /** Each entry renders as a <p>. Use `\n` inside a string for line breaks. */
  paragraphs: string[];
  downloadButton: {
    label: string;
    href: string;
    /** If true, opens in a new tab (typical for PDF downloads). */
    external?: boolean;
  };
}

export interface FacultyHandbookPageData {
  hero: PageHeroContent;
  subNavLabel: string;
  subNav: SubNavLink[];
  /** Cream "Interested in becoming a faculty@DAU" banner near the top */
  applyBanner: { text: string; cta: string; href: string };
  content: HandbookContentData;
  cta: { left: CtaPanel; right: CtaPanel };
}

// ============================================================================
//  FACULTY — Faculty Development & Evaluation (/faculty/development)
//  Reuses PageHero, PageSubNav, ProseIntro, PolicySection, TitledProseBlock,
//  DiversityCallout, ConnectContact.
//  New: TeachingEnhancement (2-col cards on surface), IndustryExposure
//  (prose + bullets + image carousel), EffectivenessCards (3-col ink-bg row),
//  PolicyGuidelines (sticky-left + stacked cards), AwardsHighlights (2-col
//  image-left article cards).
// ============================================================================

/** Single slide in the Industry Exposure image carousel */
export interface CarouselSlide {
  image: string;
  caption: string;
}

/** Single card on Teaching Effectiveness 3-up row (ink bg) */
export interface EffectivenessCard {
  id: string;
  label: string;
  image: string;
}

/** Single card in the Policy & Guidelines stack */
export interface PolicyGuidelineCard {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

/** Single item in the Awards & Highlights 2-col grid */
export interface AwardHighlight {
  id: string;
  image: string;
  date: string;
  excerpt: string;
  href: string;
}

export interface FacultyDevelopmentPageData {
  hero: PageHeroContent;
  subNavLabel: string;
  subNav: SubNavLink[];
  intro: string[];

  /** "Faculty Development Programs (FDPs)" — reuses PolicySection shape
   *  (paragraphs + bullets, optional CTA omitted). */
  fdps: PolicyData;

  /** "Teaching & Learning Enhancement" — title + description + AreaCard grid */
  enhancement: {
    title: string;
    description: string;
    cards: AreaCard[];
  };

  /** "Industry Exposure & Collaboration" — prose + bullets + carousel */
  industry: {
    title: string;
    introParagraphs: string[];
    bullets: string[];
    outroParagraphs?: string[];
    slides: CarouselSlide[];
  };

  /** "Faculty Evaluation" — 2-col titled sub-blocks on dark ink */
  evaluation: TitledProseBlockData;

  /** "Teaching Effectiveness" — 3-col image+label cards on dark ink */
  teachingEffectiveness: {
    title: string;
    intro?: string;
    cards: EffectivenessCard[];
  };

  /** "Continuous Improvement" — 2-col titled sub-blocks on dark ink */
  continuousImprovement: TitledProseBlockData;

  /** "Policy & Guidelines" — sticky-left title + vertical cards */
  policyGuidelines: {
    title: string;
    cards: PolicyGuidelineCard[];
  };

  /** "Awards & Highlights" — 2-col image-left article cards */
  highlights: {
    title: string;
    items: AwardHighlight[];
  };

  /** Centered diversity callout (reuses existing DiversityCallout) */
  diversity: { title: string; description: string };

  /** Reuses homepage ConnectContact shape */
  contact: ContactContent;
}

// ============================================================================
//  PLACEMENT — Placement Team page (/placements/team)
//  Reuses PageHero, PageSubNav, ProseIntro, FacultyCard, Pagination, SplitCta.
//  New: FacultyMembersGrid — reusable BleedTitle + 4-col grid with optional
//  pagination. Used for both the small static "Placement Cell Team" and the
//  larger paginated "Student Placement Cell".
// ============================================================================

export interface PlacementTeamPageData {
  hero: PageHeroContent;
  subNavLabel: string;
  subNav: SubNavLink[];
  intro: string[];
  /** Static team (no pagination by default) */
  placementCell: {
    title: string;
    members: FacultyMember[];
  };
  /** Paginated team — typically a longer list */
  studentCell: {
    title: string;
    members: FacultyMember[];
  };
  cta: { left: CtaPanel; right: CtaPanel };
}

// ============================================================================
//  PLACEMENT — Placement Stats page (/placements/stats)
//  Reuses PageHero, PageSubNav, ProseIntro, ProgramGallery, SplitCta.
//  Also reuses SuccessStory from Campus Life.
//  New: BarChartSection (UG/PG bar charts on dark ink),
//       SuccessStoriesCarousel (tilted-frame testimonial slider).
// ============================================================================

/** One bucket (year) on a placement bar chart */
export interface BarChartBucket {
  label: string;
  highest: number;
  average: number;
}

/** Content shape for one BarChartSection (UG or PG) */
export interface BarChartSectionData {
  /** Optional section anchor id (passed to the section element) */
  id?: string;
  title: string;
  description: string;
  legend: {
    highestLabel: string;
    averageLabel: string;
  };
  buckets: BarChartBucket[];
}

export interface PlacementStatsPageData {
  hero: PageHeroContent;
  subNavLabel: string;
  subNav: SubNavLink[];
  intro: string[];
  /** Autoplay image strip between intro and UG chart */
  gallery: { images: string[] };
  ugPlacements: BarChartSectionData;
  pgPlacements: BarChartSectionData;
  /** Reuses the existing SuccessStory type from Campus Life */
  successStories: {
    title: string;
    items: SuccessStory[];
  };
  /** Title-less split CTA per Figma */
  cta: { left: CtaPanel; right: CtaPanel };
}

// ============================================================================
//  PLACEMENT — Top Recruiters page (/placements/recruiters)
//  Reuses PageHero, PageSubNav, ProseIntro, SuccessStories, SplitCta.
//  New: StatsRow (4-up brand-red stat numbers), RecruitersGrid (sticky-left
//  title + responsive 5-col logo grid).
// ============================================================================

/** One stat in the 4-up StatsRow */
export interface StatItem {
  value: string;
  label: string;
}

/** Single recruiter logo card */
export interface RecruiterLogo {
  id: string;
  name: string;
  logo: string;
  /** Optional — when present the whole card becomes a link */
  href?: string;
}

// export interface RecruiterLogo {
//   image: string;
//   name: string;
// }

export interface TopRecruitersPageData {
  hero: PageHeroContent;
  subNavLabel: string;
  subNav: SubNavLink[];
  intro: string[];
  stats: StatItem[];
  recruiters: {
    title: string;
    items: RecruiterLogo[];
  };
  /** Reuses the existing SuccessStory type from Campus Life / Placement Stats */
  successStories: {
    title: string;
    items: SuccessStory[];
  };
  /** Title-less split CTA per Figma */
  cta: { left: CtaPanel; right: CtaPanel };
}

// ============================================================================
//  PLACEMENT — Internships page (/placements/internships)
//  100% reuse: PageHero, PageSubNav, AdmissionsBanner, ProseIntro,
//  ImageCarousel, SplitCta. No new components.
// ============================================================================

export interface InternshipsPageData {
  hero: PageHeroContent;
  subNavLabel: string;
  subNav: SubNavLink[];
  /** Cream "Interested in internship?" banner */
  applyBanner: { text: string; cta: string; href: string };
  intro: string[];
  /** Single-image carousel with prev/next + caption (reuses CarouselSlide) */
  carousel: { slides: CarouselSlide[] };
  /** Title-less split CTA per Figma */
  cta: { left: CtaPanel; right: CtaPanel };
}

// ============================================================================
//  ADMISSION — Undergraduate Admissions (/admission/ug)
//  Mega page with functional category tabs. Each category has its own
//  complete content block (intro → important dates → intake → program
//  structures → placement stats → eligibility → selection → fees →
//  scholarships → how to apply → FAQs). Switching tabs swaps everything.
//
//  Reuses: PageHero, PageSubNav, AdmissionsBanner, ProseIntro, BleedTitle,
//  EligibilityCriteria (from Faculty Recruitment), FaqSection, ContactPills,
//  SplitCta. Bar chart + recruiter logo + stat row types reused too.
//
//  New: ImportantDates, IntakeGrid, ProgramStructuresAccordion,
//  AdmissionPlacementStats, SelectionCriteria, FeeStructure,
//  ScholarshipsSection, HowToApplySection, UgAdmissionsExplorer (orchestrator).
// ============================================================================

// ── Sub-types for the UG admissions content ──────────────────────────────

export interface ImportantDateCard {
  id: string;
  label: string;
  /** Date string OR a status like "To be decided" */
  value: string;
  /** When true, the value renders muted/grey (used for "To be decided") */
  pending?: boolean;
}

export interface IntakeItem {
  id: string;
  program: string;
  count: string;
}

export interface ProgramStructureItem {
  id: string;
  title: string;
  description: string;
  image: string;
  brochureHref?: string;
  brochureLabel?: string;
}

export interface FeeCard {
  id: string;
  label: string;
  value: string;
  /** Optional small sub-note under the value (e.g. "Refundable at program end") */
  subNote?: string;
  /** When true, the value renders in brand red (e.g. the "Food" cell) */
  highlight?: boolean;
}

export interface FeeNoteBlock {
  heading: string;
  paragraphs: string[];
}

export interface EducationLoanBlock {
  heading: string;
  description: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface FeeStructureData {
  title: string;
  intro: string;
  cards: FeeCard[];
  /** Centered italic footnotes directly under the fee grid */
  footnotes: string[];
  notes: FeeNoteBlock[];
  educationLoan: EducationLoanBlock;
  refundNote: string;
}

export interface ScholarshipCard {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface HowToApplyData {
  title: string;
  backgroundImage: string;
  steps: string[];
  cta: { label: string; href: string };
}

/**
 * Full content block for one admission category (All India / Gujarat /
 * NRI-DASA). Each category swaps the entire content stack below the tabs.
 * Keyed by `slug` so CMS can fetch each category's content independently
 * (one WP custom post per category, for example).
 */
export interface UgAdmissionCategory {
  slug: string;
  label: string;
  intro: string[];
  importantDates: {
    title: string;
    items: ImportantDateCard[];
  };
  intake: {
    title: string;
    items: IntakeItem[];
  };
  programStructures: {
    title: string;
    items: ProgramStructureItem[];
  };
  placementStats: {
    title: string;
    description: string;
    legend: { highestLabel: string; averageLabel: string };
    buckets: BarChartBucket[];
    logos: RecruiterLogo[];
    stats: StatItem[];
  };
  /** Reuses EligibilityCriteria from Faculty Recruitment */
  eligibility: {
    title: string;
    tabs: EligibilityTab[];
  };
  selectionCriteria: {
    title: string;
    paragraphs: string[];
  };
  feeStructure: FeeStructureData;
  scholarships: {
    title: string;
    intro: string;
    /** Bullet list shown between the intro paragraph and the cards */
    bullets?: string[];
    cards: ScholarshipCard[];
  };
  howToApply: HowToApplyData;
  /** Reuses FaqSection from B.Tech ICT page */
  faqs: {
    title: string;
    items: FaqItem[];
  };
}

export interface UgAdmissionsPageData {
  hero: PageHeroContent;
  subNavLabel: string;
  subNav: SubNavLink[];
  applyBanner: { text: string; cta: string; href: string };
  /** All admission categories. The first one is the default active tab. */
  categories: UgAdmissionCategory[];
  /** Shared across all categories — contact pills (phone + email) */
  contact: { phone: string; email: string };
  cta: { left: CtaPanel; right: CtaPanel };
}

// ============================================================================
//  ADMISSION — Financial Support page (/admission/ug/financial-support)
//  Reuses PageHero, PageSubNav, ProgramSlider/ProgramCard, FaqSection,
//  ContactPills, SplitCta.
//  New: TitledProseSection — generic BleedTitle + paragraphs section.
// ============================================================================

export interface FinancialSupportPageData {
  hero: PageHeroContent;
  subNavLabel: string;
  subNav: SubNavLink[];
  /** "DAU Scholarships" — title + intro paragraph */
  dauScholarships: {
    title: string;
    paragraphs: string[];
  };
  /** "Other Scholarships" — reuses the ProgramSlider/ProgramCard shape.
   *  Pass description "" for a title-only heading. */
  otherScholarships: SectionIntro & { cards: ProgramCard[] };
  /** Reuses FaqSection shape */
  faqs: {
    title: string;
    items: FaqItem[];
  };
  contact: { phone: string; email: string };
  cta: { left: CtaPanel; right: CtaPanel };
}