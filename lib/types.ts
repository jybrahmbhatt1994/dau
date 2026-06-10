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
