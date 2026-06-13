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

/** One half of a gold/red split CTA. */
export interface CtaPanel {
  title: string;
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