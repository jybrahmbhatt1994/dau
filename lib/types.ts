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

export interface HeroContent {
  eyebrow: string;
  /** Optional muted second line under the eyebrow (e.g. school pages). */
  eyebrowSub?: string;
  rankLabel: string;
  rankValue: string;
  subline: string;
  images: string[]; // was: image: string
}

export interface ContactContent {
  socialTitle: string;
  socialDescription: string;
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
    recruiters: string[];
    stats: Stat[];
  };
  life: SectionIntro & { cards: LifeCard[] };
  news: SectionIntro & { featured: NewsArticle; list: NewsArticle[] };
  events: { title: string; items: EventItem[] };
  centers: SectionIntro & { cards: ProgramCard[] };
  diversity: { title: string; description: string };
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
  functionsTitle: string;
  functionsParagraphs: string[];
  email: string;
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