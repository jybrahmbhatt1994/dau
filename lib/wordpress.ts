/**
 * lib/wordpress.ts
 *
 * Data access layer — the single boundary between the UI and WordPress.
 *
 * CURRENT STATE:
 *   ✅ getHomeData()  → hero section fetched live from WordPress REST API
 *   🔄 All other sections on home page → still served from mock data
 *   🔄 All other pages → still served from mock data
 *
 * HOW TO MIGRATE A SECTION:
 *   1. Create the SCF field group in WordPress (use the JSON export tool).
 *   2. Fill the content in WP admin.
 *   3. Verify: /wp-json/wp/v2/pages?slug=PAGE&acf_format=standard&_fields=id,slug,acf
 *   4. Add the WP raw interface (WpXxxAcf) and mapper function (mapXxx) below.
 *   5. Replace the mock spread in the relevant getXxxPage() function.
 *   6. Components never change.
 */

import { wpFetch, getPageAcf } from "@/lib/api";

// ─── Mock data imports (remove each one as its section is migrated to WP) ────
import { homeData } from "@/data/home";
import { navigation } from "@/data/navigation";
import { academicsData } from "@/data/academics";
import { deanPageData } from "@/data/dean";
import { sotPageData } from "@/data/sot";
import { academicAreasPageData } from "@/data/academic-areas";
import { ugProgramsPageData } from "@/data/ug-programs";
import { btechIctPageData } from "@/data/btech-ict";
import { aboutPageData } from "@/data/about";
import { leadershipPageData } from "@/data/leadership";
import { administrationPageData } from "@/data/administration";
import { newsroomPageData } from "@/data/newsroom";
import { photoGalleryPageData } from "@/data/photo-gallery";
import { newslettersPageData } from "@/data/newsletters";
import { studentStoriesPageData } from "@/data/student-stories";
import { deanStudentPageData } from "@/data/dean-student";
import { campusLifePageData } from "@/data/campus-life";
import { studentSupportPageData } from "@/data/student-support";
import { festEventsPageData } from "@/data/fest-events";
import { deanResearchPageData } from "@/data/dean-research";
import { researchAreasPageData } from "@/data/research-areas";
import { researchAreaDetailPageData } from "@/data/research-area-detail";
import { grantsPageData } from "@/data/grants";
import { awardsPageData } from "@/data/awards";
import { facultyPageData } from "@/data/faculty";
import { deanFacultyPageData } from "@/data/dean-faculty";
import { facultyRecruitmentPageData } from "@/data/faculty-recruitment";
import { facultyHandbookPageData } from "@/data/faculty-handbook";
import { facultyDevelopmentPageData } from "@/data/faculty-development";
import { placementTeamPageData } from "@/data/placement-team";
import { placementStatsPageData } from "@/data/placement-stats";
import { topRecruitersPageData } from "@/data/top-recruiters";
import { internshipsPageData } from "@/data/internships";
import { ugAdmissionsPageData } from "@/data/ug-admissions";
import { financialSupportPageData } from "@/data/financial-support";
import { ugScholarshipsPageData } from "@/data/ug-scholarships";

// ─── lib/types.ts imports ─────────────────────────────────────────────────────
import type {
  HomeData,
  HeroContent,
  NewsArticle,
  NavItem,
  AcademicsData,
  DeanPageData,
  SchoolPageData,
  AcademicAreasPageData,
  UgProgramsPageData,
  ProgramPageData,
  AboutPageData,
  LeadershipPageData,
  AdministrationPageData,
  NewsroomPageData,
  PhotoGalleryPageData,
  CardGridPageData,
  DeanStudentPageData,
  FestEventsPageData,
  CampusLifePageData,
  StudentSupportPageData,
  DeanResearchPageData,
  ResearchAreasPageData,
  ResearchAreaDetailPageData,
  GrantsPageData,
  AwardsPageData,
  FacultyPageData,
  DeanFacultyPageData,
  FacultyRecruitmentPageData,
  FacultyHandbookPageData,
  FacultyDevelopmentPageData,
  PlacementTeamPageData,
  PlacementStatsPageData,
  TopRecruitersPageData,
  InternshipsPageData,
  UgAdmissionsPageData,
  FinancialSupportPageData,
  ContactContent,
} from "@/lib/types";

// ============================================================================
//  Complete updated section of lib/wordpress.ts
//  Replace everything from the first interface down to the closing brace
//  of getHomeData(). Keep all other page accessors below unchanged.
// ============================================================================

// ─── Raw WordPress shapes ────────────────────────────────────────────────────

interface WpHeroImage {
  image: string;
  alt: string;
}

interface WpLinkField {
  title: string;
  url: string;
  target: string;
}

interface WpAcademicsCard {
  title: string;
  excerpt: string;
  image: string;
  image_alt: string;
  href: WpLinkField;
}

interface WpPublicationItem {
  title: string;
  date: string; // "DD/MM/YYYY" e.g. "01/08/2025"
  image: string;
  href: WpLinkField;
}

interface WpPlacementGalleryItem {
  image: string;
}

interface WpRecruiterLogo {
  image: string;
  name: string;
}

interface WpStat {
  value: string;
  label: string;
}

interface WpLifeCard {
  title: string;
  image: string;
  href: WpLinkField;
}

interface WpHomeAcf {
  // Hero
  hero_eyebrow: string;
  hero_eyebrow_sub: string;
  hero_rank_label: string;
  hero_rank_value: string;
  hero_subline: string;
  hero_images: WpHeroImage[];
  // Academics
  academics_title: string;
  academics_description: string;
  academics_cards: WpAcademicsCard[];
  // Admission CTA
  admission_eyebrow: string;
  admission_title: string;
  admission_description: string;
  // Faculty
  faculty_title: string;
  faculty_description: string;
  faculty_selected: number[];
  // Research
  research_title: string;
  research_description: string;
  // Publications
  publications_title: string;
  publications_description: string;
  publication_items: WpPublicationItem[] | false;
  // Placements
  placements_title: string;
  placements_description: string;
  placements_gallery: WpPlacementGalleryItem[] | false;
  recruiter_logos: WpRecruiterLogo[] | false;
  placement_stats: WpStat[] | false;
  // Life @ DAU
  life_title: string;
  life_description: string;
  life_cards: WpLifeCard[] | false;
  // News
  news_title: string;
  news_description: string;
  // Events
  events_title: string;
  // Centers
  centers_title: string;
  centers_description: string;
  // Diversity
  diversity_title: string;
  diversity_description: string;
  diversity_image: string;
}

interface WpSiteSettings {
  social_title: string;
  social_description: string;
  social_linkedin: string;
  social_x: string;
  contact_title: string;
  contact_description: string;
  contact_phone: string;
  contact_email: string;
}

interface WpFacultyPost {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: {
    position: string;
    department: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

interface WpResearchPost {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

interface WpNewsPost {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text: string }>;
  };
}

interface WpEventPost {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text: string }>;
  };
}

interface WpCenterPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text: string }>;
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Decode HTML entities from WP REST API title.rendered e.g. "&amp;" → "&" */
function decodeHtml(html: string): string {
  return html
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—");
}

/** ISO 8601 → "25 Jun, 2026" (used for CPT dates) */
function formatIsoDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** "DD/MM/YYYY" → "01 Aug, 2025" (used for SCF date picker) */
function formatScfDate(ddmmyyyy: string): string {
  const [day, month, year] = ddmmyyyy.split("/");
  return new Date(`${year}-${month}-${day}`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** SCF returns false for empty repeaters — normalise to [] */
function toArray<T>(val: T[] | false): T[] {
  return Array.isArray(val) ? val : [];
}

/**
 * Strip HTML tags from WP post content and trim to N words.
 * Used to generate the excerpt on the homepage featured news card.
 */
function excerptFromHtml(html: string, maxWords = 30): string {
  const text = html
    .replace(/<[^>]*>/g, " ")  // strip all HTML tags
    .replace(/\s+/g, " ")      // collapse whitespace
    .trim();
  const words = text.split(" ");
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "…";
}

// ─── Mappers ─────────────────────────────────────────────────────────────────

function mapHero(acf: WpHomeAcf): HeroContent {
  return {
    eyebrow: acf.hero_eyebrow,
    eyebrowSub: acf.hero_eyebrow_sub || undefined,
    rankLabel: acf.hero_rank_label,
    rankValue: acf.hero_rank_value,
    subline: acf.hero_subline,
    images: (acf.hero_images ?? []).map((row) => ({
      url: row.image,
      alt: row.alt || "",
    })),
  };
}

function mapAcademics(acf: WpHomeAcf): HomeData["academics"] {
  return {
    title: acf.academics_title,
    description: acf.academics_description,
    cards: (acf.academics_cards ?? []).map((card, i) => ({
      id: String(i),
      title: card.title,
      excerpt: card.excerpt,
      image: card.image,
      href: card.href?.url ?? "/academics",
    })),
  };
}

function mapAdmissionCta(acf: WpHomeAcf): HomeData["admissionCta"] {
  return {
    eyebrow: acf.admission_eyebrow,
    title: acf.admission_title,
    description: acf.admission_description,
  };
}

function mapFaculty(
  acf: WpHomeAcf,
  posts: WpFacultyPost[],
): HomeData["faculty"] {
  const ordered = acf.faculty_selected
    .map((id) => posts.find((p) => p.id === id))
    .filter((p): p is WpFacultyPost => p !== undefined);

  return {
    title: acf.faculty_title,
    description: acf.faculty_description,
    members: ordered.map((post) => ({
      id: String(post.id),
      name: post.title.rendered,
      position: post.acf?.position ?? "",
      image:
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
        `https://picsum.photos/seed/faculty-${post.id}/289/352`,
      href: `/faculty/${post.slug}`,
    })),
  };
}

function mapResearch(
  acf: WpHomeAcf,
  posts: WpResearchPost[],
): HomeData["research"] {
  return {
    title: acf.research_title,
    description: acf.research_description,
    cards: posts.map((post) => ({
      id: String(post.id),
      title: post.title.rendered,
      date: formatIsoDate(post.date),
      image:
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
        `https://picsum.photos/seed/research-${post.id}/600/380`,
      href: `/research/areas/${post.slug}`,
    })),
  };
}

function mapPublications(acf: WpHomeAcf): HomeData["publications"] {
  return {
    title: acf.publications_title,
    description: acf.publications_description,
    items: toArray(acf.publication_items).map((item, i) => ({
      id: String(i),
      title: item.title,
      date: formatScfDate(item.date),
      image: item.image,
      href: item.href?.url ?? "#",
    })),
  };
}

function mapPlacements(acf: WpHomeAcf): HomeData["placements"] {
  return {
    title: acf.placements_title,
    description: acf.placements_description,
    gallery: toArray(acf.placements_gallery).map((row) => row.image),
    recruiters: toArray(acf.recruiter_logos).map((row, i) => ({
      id: String(i),
      name: row.name,
      logo: row.image,   // ← WP field is "image", type field is "logo"
    })),
    stats: toArray(acf.placement_stats).map((row) => ({
      value: row.value,
      label: row.label,
    })),
  };
}

function mapLife(acf: WpHomeAcf): HomeData["life"] {
  return {
    title: acf.life_title,
    description: acf.life_description,
    cards: toArray(acf.life_cards).map((card, i) => ({
      id: String(i),
      title: card.title,
      image: card.image,
      href: card.href?.url ?? "/life",
    })),
  };
}

function mapNews(
  acf: WpHomeAcf,
  posts: WpNewsPost[],
): HomeData["news"] {
  if (posts.length === 0) return homeData.news;
 
  const [featuredPost, ...listPosts] = posts;
 
  const toNewsArticle = (post: WpNewsPost): NewsArticle => ({
    id: String(post.id),
    title: post.title.rendered,
    date: formatIsoDate(post.date),
    image:
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
      `https://picsum.photos/seed/news-${post.id}/681/411`,
    href: `/newsroom/${post.slug}`,
  });
 
  return {
    title: acf.news_title,
    description: acf.news_description,
    featured: {
      ...toNewsArticle(featuredPost),
      // Strip HTML + trim to 30 words for the homepage excerpt
      excerpt: excerptFromHtml(featuredPost.content.rendered, 30),
    },
    list: listPosts.map(toNewsArticle),
  };
}

function mapEvents(
  acf: WpHomeAcf,
  posts: WpEventPost[],
): HomeData["events"] {
  return {
    title: acf.events_title,
    items: posts.map((post) => ({
      id: String(post.id),
      title: post.title.rendered,
      date: formatIsoDate(post.date),
      image:
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
        `https://picsum.photos/seed/event-${post.id}/600/360`,
      href: `/events/${post.slug}`,
    })),
  };
}

function mapCenters(
  acf: WpHomeAcf,
  posts: WpCenterPost[],
): HomeData["centers"] {
  return {
    title: acf.centers_title,
    description: acf.centers_description,
    cards: posts.map((post) => ({
      id: String(post.id),
      title: decodeHtml(post.title.rendered),
      // Strip HTML from content.rendered — editors write the excerpt as content
      excerpt: excerptFromHtml(post.content.rendered, 20),
      image:
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
        `https://picsum.photos/seed/center-${post.id}/600/420`,
      href: `/centers/${post.slug}`,
    })),
  };
}

function mapDiversity(acf: WpHomeAcf): HomeData["diversity"] {
  return {
    title: acf.diversity_title,
    description: acf.diversity_description,
    image: acf.diversity_image || "/images/bird-evolve.png",
  };
}

// ─── getSiteSettings (global — used by any page with ConnectContact) ──────────
 
export async function getSiteSettings(): Promise<ContactContent> {
  try {
    const data = await wpFetch<WpSiteSettings>("/dau/v1/options");
    return {
      socialTitle:        data.social_title,
      socialDescription:  data.social_description,
      linkedinUrl:        data.social_linkedin || "#",
      xUrl:               data.social_x || "#",
      contactTitle:       data.contact_title,
      contactDescription: data.contact_description,
      phone:              data.contact_phone,
      email:              data.contact_email,
    };
  } catch (err) {
    console.warn(
      "[wordpress.ts] getSiteSettings() failed — falling back to mock data.",
      err,
    );
    return homeData.contact;
  }
}

// ─── getHomeData ──────────────────────────────────────────────────────────────

export async function getHomeData(): Promise<HomeData> {
  const acf = await getPageAcf<WpHomeAcf>("home");

  if (!acf) {
    console.warn(
      "[wordpress.ts] Home page ACF not found — falling back to mock data.",
    );
    return homeData;
  }

  const facultyIds = (acf.faculty_selected ?? []).join(",");

  // All CPT fetches run in parallel — no waterfall
  const [facultyPosts, researchPosts, newsPosts, eventPosts, centerPosts, siteSettings] =
    await Promise.all([
      facultyIds
        ? wpFetch<WpFacultyPost[]>(
            `/wp/v2/faculty?include=${facultyIds}&_embed=wp:featuredmedia&acf_format=standard`,
          )
        : Promise.resolve([] as WpFacultyPost[]),
      wpFetch<WpResearchPost[]>(
        `/wp/v2/research-area?_embed=wp:featuredmedia&per_page=6&orderby=date&order=desc`,
      ),
      wpFetch<WpNewsPost[]>(
        `/wp/v2/news?_embed=wp:featuredmedia&per_page=5&orderby=date&order=desc`,
      ),
      wpFetch<WpEventPost[]>(
        `/wp/v2/event?_embed=wp:featuredmedia&per_page=3&orderby=date&order=desc`,
      ),
      wpFetch<WpCenterPost[]>(
        `/wp/v2/center?_embed=wp:featuredmedia&per_page=6&orderby=date&order=desc`,
      ),
      getSiteSettings(),
    ]);

  return {
    // ✅ Live from WordPress
    hero:         mapHero(acf),
    academics:    mapAcademics(acf),
    admissionCta: mapAdmissionCta(acf),
    faculty:      mapFaculty(acf, facultyPosts),
    research:     mapResearch(acf, researchPosts),
    publications: mapPublications(acf),
    placements:   mapPlacements(acf),
    life:         mapLife(acf),
    news:         mapNews(acf, newsPosts),
    events:       mapEvents(acf, eventPosts),
    centers:      mapCenters(acf, centerPosts),
    diversity: mapDiversity(acf),
    contact:      siteSettings,
  };
}

// ─── Navigation ──────────────────────────────────────────────────────────────

/**
 * Navigation is managed in data/navigation.ts for now.
 * When migrating: use WP menus REST endpoint → /wp-json/wp/v2/menus (requires
 * the WP REST API Menus plugin) and map to NavItem[].
 */
export async function getNavigation(): Promise<NavItem[]> {
  return navigation;
}

// ─── Academics ───────────────────────────────────────────────────────────────

export async function getAcademicsPage(): Promise<AcademicsData> {
  return academicsData;
}

export async function getDeanPage(): Promise<DeanPageData> {
  return deanPageData;
}

/** School of Technology */
export async function getSchoolPage(): Promise<SchoolPageData> {
  return sotPageData;
}

/** Academic Areas sub-page (/academics/areas) */
export async function getAcademicAreasPage(): Promise<AcademicAreasPageData> {
  return academicAreasPageData;
}

/** Undergraduate Programs sub-page (/academics/ug-programs) */
export async function getUgProgramsPage(): Promise<UgProgramsPageData> {
  return ugProgramsPageData;
}

/** B.Tech (ICT) program detail page (/academics/btech-ict) */
export async function getProgramPage(): Promise<ProgramPageData> {
  return btechIctPageData;
}

// ─── About ───────────────────────────────────────────────────────────────────

export async function getAboutPage(): Promise<AboutPageData> {
  return aboutPageData;
}

export async function getLeadershipPage(): Promise<LeadershipPageData> {
  return leadershipPageData;
}

export async function getAdministrationPage(): Promise<AdministrationPageData> {
  return administrationPageData;
}

// ─── Newsroom ─────────────────────────────────────────────────────────────────

export async function getNewsroomPage(): Promise<NewsroomPageData> {
  return newsroomPageData;
}

export async function getPhotoGalleryPage(): Promise<PhotoGalleryPageData> {
  return photoGalleryPageData;
}

export async function getNewslettersPage(): Promise<CardGridPageData> {
  return newslettersPageData;
}

/** Student Stories / In Focus (/infocus/student-stories) */
export async function getStudentStoriesPage(): Promise<CardGridPageData> {
  return studentStoriesPageData;
}

// ─── Life @ DAU ───────────────────────────────────────────────────────────────

export async function getDeanStudentPage(): Promise<DeanStudentPageData> {
  return deanStudentPageData;
}

export async function getCampusLifePage(): Promise<CampusLifePageData> {
  return campusLifePageData;
}

export async function getStudentSupportPage(): Promise<StudentSupportPageData> {
  return studentSupportPageData;
}

export async function getFestEventsPage(): Promise<FestEventsPageData> {
  return festEventsPageData;
}

// ─── Research ─────────────────────────────────────────────────────────────────

export async function getDeanResearchPage(): Promise<DeanResearchPageData> {
  return deanResearchPageData;
}

export async function getResearchAreasPage(): Promise<ResearchAreasPageData> {
  return researchAreasPageData;
}

/**
 * Research Area Detail (/research/areas/[slug])
 * When going headless: fetch WP post by slug and map to ResearchAreaDetailPageData.
 */
export async function getResearchAreaDetailPage(
  _slug: string
): Promise<ResearchAreaDetailPageData> {
  return researchAreaDetailPageData;
}

export async function getGrantsPage(): Promise<GrantsPageData> {
  return grantsPageData;
}

export async function getAwardsPage(): Promise<AwardsPageData> {
  return awardsPageData;
}

// ─── Faculty ──────────────────────────────────────────────────────────────────

export async function getFacultyPage(): Promise<FacultyPageData> {
  return facultyPageData;
}

export async function getDeanFacultyPage(): Promise<DeanFacultyPageData> {
  return deanFacultyPageData;
}

export async function getFacultyRecruitmentPage(): Promise<FacultyRecruitmentPageData> {
  return facultyRecruitmentPageData;
}

export async function getFacultyHandbookPage(): Promise<FacultyHandbookPageData> {
  return facultyHandbookPageData;
}

export async function getFacultyDevelopmentPage(): Promise<FacultyDevelopmentPageData> {
  return facultyDevelopmentPageData;
}

// ─── Placements ───────────────────────────────────────────────────────────────

export async function getPlacementTeamPage(): Promise<PlacementTeamPageData> {
  return placementTeamPageData;
}

export async function getPlacementStatsPage(): Promise<PlacementStatsPageData> {
  return placementStatsPageData;
}

export async function getTopRecruitersPage(): Promise<TopRecruitersPageData> {
  return topRecruitersPageData;
}

export async function getInternshipsPage(): Promise<InternshipsPageData> {
  return internshipsPageData;
}

// ─── Admission ────────────────────────────────────────────────────────────────

export async function getUgAdmissionsPage(): Promise<UgAdmissionsPageData> {
  return ugAdmissionsPageData;
}

export async function getFinancialSupportPage(): Promise<FinancialSupportPageData> {
  return financialSupportPageData;
}

/**
 * UG Scholarships reuses the FinancialSupportPageData shape —
 * same template, different content.
 */
export async function getUgScholarshipsPage(): Promise<FinancialSupportPageData> {
  return ugScholarshipsPageData;
}