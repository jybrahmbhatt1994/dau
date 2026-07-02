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
  PolicyData,
  GrantCard,
  FacultyMember,
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

interface WpRaLinkField {
  title: string;
  url: string;
  target: string;
}
 
interface WpRaBreadcrumb {
  label: string;
  href: string;
}
 
interface WpRaSubNavLink {
  label: string;
  href: string;
}
 
interface WpRaIntroParagraph {
  paragraph: string; // contains HTML e.g. "<p>...</p>"
}
 
interface WpResearchAreasAcf {
  ra_hero_title: string;
  ra_hero_subline: string;
  ra_hero_image: string;
  ra_breadcrumb: WpRaBreadcrumb[] | false;
  ra_subnav_label: string;
  ra_subnav_links: WpRaSubNavLink[] | false;
  ra_intro: WpRaIntroParagraph[] | false;
  ra_areas_title: string;
  ra_areas_description: string;
  ra_cta_left_title: string;
  ra_cta_left_description: string;
  ra_cta_left_label: string;
  ra_cta_left_href: WpRaLinkField;
  ra_cta_right_title: string;
  ra_cta_right_description: string;
  ra_cta_right_label: string;
  ra_cta_right_href: WpRaLinkField;
}

interface WpDrLinkField {
  title: string;
  url: string;
  target: string;
}
 
interface WpDrBreadcrumb {
  label: string;
  href: string;
}
 
interface WpDrSubNavLink {
  label: string;
  href: string;
}
 
interface WpDrParagraph {
  paragraph: string; // HTML string
}
 
interface WpDrOfficial {
  name: string;
  position: string;
  email: string;
  phone: string;
  image: string;
}
 
interface WpDrBulletGroupItem {
  item: string;
}
 
interface WpDrBulletGroup {
  lead: string;
  items: WpDrBulletGroupItem[];
}
 
interface WpDeanResearchAcf {
  // Hero
  dr_hero_title: string;
  dr_hero_subline: string;
  dr_hero_image: string;
  dr_breadcrumb: WpDrBreadcrumb[] | false;
  // Sub Nav
  dr_subnav_label: string;
  dr_subnav_links: WpDrSubNavLink[] | false;
  // Dean's Desk
  dr_desk_title: string;
  dr_desk_paragraphs: WpDrParagraph[] | false;
  dr_desk_name: string;
  dr_desk_role: string;
  dr_desk_image: string;
  dr_desk_phone: string;
  dr_desk_email: string;
  // Functions
  dr_functions_title: string;
  dr_functions_intro: WpDrParagraph[] | false;
  dr_functions_bullet_groups: WpDrBulletGroup[] | false;
  dr_functions_outro: WpDrParagraph[] | false;
  // Officials
  dr_officials_title: string;
  dr_officials: WpDrOfficial[] | false;
  // CTA
  dr_cta_left_title: string;
  dr_cta_left_description: string;
  dr_cta_left_label: string;
  dr_cta_left_href: WpDrLinkField;
  dr_cta_right_title: string;
  dr_cta_right_description: string;
  dr_cta_right_label: string;
  dr_cta_right_href: WpDrLinkField;
}

interface WpGpLinkField {
  title: string;
  url: string;
  target: string;
}
 
interface WpGpBreadcrumb {
  label: string;
  href: string;
}
 
interface WpGpSubNavLink {
  label: string;
  href: string;
}
 
interface WpGpSponsoredProject {
  pi: string;
  title: string;
  funding_agency: string;
  duration: string;
  amount: string;
}
 
interface WpGrantsPageAcf {
  // Hero
  gp_hero_title: string;
  gp_hero_subline: string;
  gp_hero_image: string;
  gp_breadcrumb: WpGpBreadcrumb[] | false;
  // Sub Nav
  gp_subnav_label: string;
  gp_subnav_links: WpGpSubNavLink[] | false;
  // Intro — wysiwyg field (HTML string, not repeater)
  gp_intro: string;
  // Grant tabs
  gp_available_title: string;
  gp_available_description: string;
  gp_past_title: string;
  gp_past_description: string;
  // Sponsored research
  gp_sponsored_title: string;
  gp_sponsored_projects: WpGpSponsoredProject[] | false;
  // CTA
  gp_cta_left_title: string;
  gp_cta_left_description: string;
  gp_cta_left_label: string;
  gp_cta_left_href: WpGpLinkField;
  gp_cta_right_title: string;
  gp_cta_right_description: string;
  gp_cta_right_label: string;
  gp_cta_right_href: WpGpLinkField;
}
 
// Grant CPT post shape
interface WpGrantPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  acf: {
    apply_label?: string;
    apply_href?: WpGpLinkField;
    detail_href?: WpGpLinkField;
  };
}

interface WpAwLinkField {
  title: string;
  url: string;
  target: string;
}
 
interface WpAwBreadcrumb {
  label: string;
  href: string;
}
 
interface WpAwSubNavLink {
  label: string;
  href: string;
}
 
interface WpAwAwardee {
  student_name: string;
  publication_month: string;
  publication_venue: string;
  faculty_author: string;
  title: string;
}
 
interface WpAwYear {
  year: string;
  awardees: WpAwAwardee[] | false;
}
 
interface WpAwardsPageAcf {
  // Hero
  aw_hero_title: string;
  aw_hero_subline: string;
  aw_hero_image: string;
  aw_breadcrumb: WpAwBreadcrumb[] | false;
  // Sub Nav
  aw_subnav_label: string;
  aw_subnav_links: WpAwSubNavLink[] | false;
  // Intro — wysiwyg (may contain component HTML — we strip to plain text)
  aw_intro: string;
  // Awardees
  aw_awardees_title: string;
  aw_years: WpAwYear[] | false;
  // Policy — wysiwyg (rendered as-is on frontend via dangerouslySetInnerHTML)
  aw_policy_title: string;
  aw_policy_content: string;
  aw_policy_button_label: string;
  aw_policy_button_href: WpAwLinkField | string; // empty string when not set
  // CTA
  aw_cta_left_title: string;
  aw_cta_left_description: string;
  aw_cta_left_label: string;
  aw_cta_left_href: WpAwLinkField;
  aw_cta_right_title: string;
  aw_cta_right_description: string;
  aw_cta_right_label: string;
  aw_cta_right_href: WpAwLinkField;
}

interface WpAbBreadcrumb {
  label: string;
  href: string;
}

interface WpAbSubNavLink {
  label: string;
  href: string;
}

interface WpAbParagraph {
  paragraph: string; // plain text, \r\n line breaks preserved
}

interface WpAboutPageAcf {
  // Hero
  ab_hero_title: string;
  ab_hero_subline: string;
  ab_hero_image: string;
  ab_breadcrumb: WpAbBreadcrumb[] | false;
  // Sub Nav
  ab_subnav_label: string;
  ab_subnav_links: WpAbSubNavLink[] | false;
  // Intro
  ab_intro_paragraphs: WpAbParagraph[] | false;
  ab_vision_title: string;
  ab_vision_body: string;
  ab_mission_title: string;
  ab_mission_body: string;
  // Media block
  ab_media_image: string;
  ab_media_paragraphs: WpAbParagraph[] | false;
  // Diversity
  ab_diversity_title: string;
  ab_diversity_description: string;
}

interface WpLdLinkField {
  title: string;
  url: string;
  target: string;
}
 
interface WpLdBreadcrumb {
  label: string;
  href: string;
}
 
interface WpLdSubNavLink {
  label: string;
  href: string;
}
 
interface WpLdParagraph {
  paragraph: string;
}
 
interface WpLdMember {
  name: string;
  position: string;
  image: string;
  // Link field returns "" (empty string) when blank, or a WpLdLinkField when set
  href: WpLdLinkField | "";
}
 
interface WpLeadershipPageAcf {
  // Hero
  ld_hero_title: string;
  ld_hero_subline: string;
  ld_hero_image: string;
  ld_breadcrumb: WpLdBreadcrumb[] | false;
  // Sub Nav
  ld_subnav_label: string;
  ld_subnav_links: WpLdSubNavLink[] | false;
  // Intro
  ld_intro_paragraphs: WpLdParagraph[] | false;
  // President
  ld_president_title: string;
  ld_president_name: string;
  ld_president_role: string;
  ld_president_image: string;
  ld_president_bio: WpLdParagraph[] | false;
  // Board of Governors
  ld_bog_title: string;
  ld_bog_description: string;
  ld_bog_members: WpLdMember[] | false;
  // Academic Council
  ld_ac_title: string;
  ld_ac_description: string;
  ld_ac_members: WpLdMember[] | false;
  // Finance Committee
  ld_fc_title: string;
  ld_fc_description: string;
  ld_fc_members: WpLdMember[] | false;
  // Director General
  ld_dg_title: string;
  ld_dg_name: string;
  ld_dg_role: string;
  ld_dg_image: string;
  ld_dg_bio: WpLdParagraph[] | false;
  // Directors
  ld_directors_title: string;
  ld_directors_description: string;
  ld_directors_members: WpLdMember[] | false;
  // Diversity
  ld_diversity_title: string;
  ld_diversity_description: string;
}


interface WpAdBreadcrumb {
  label: string;
  href: string;
}
 
interface WpAdSubNavLink {
  label: string;
  href: string;
}
 
interface WpAdParagraph {
  paragraph: string;
}
 
interface WpAdProfile {
  anchor_id: string;
  title: string;
  name: string;
  role: string;
  image: string;
  bio: WpAdParagraph[] | false;
}
 
interface WpAdministrationPageAcf {
  ad_hero_title: string;
  ad_hero_subline: string;
  ad_hero_image: string;
  ad_breadcrumb: WpAdBreadcrumb[] | false;
  ad_subnav_label: string;
  ad_subnav_links: WpAdSubNavLink[] | false;
  ad_intro_paragraphs: WpAdParagraph[] | false;
  ad_profiles: WpAdProfile[] | false;
  ad_diversity_title: string;
  ad_diversity_description: string;
}

interface WpRaDetailLinkField {
  title: string;
  url: string;
  target: string;
}
 
interface WpRaDetailSubNavLink {
  label: string;
  href: string;
}
 
interface WpRaDetailParagraph {
  paragraph: string;
}
 
interface WpRaDetailGroupCard {
  title: string;
  image: string | false;
  href: WpRaDetailLinkField | "";
}
 
interface WpRaDetailSponsoredProject {
  pi: string;
  title: string;
  funding_agency: string;
  duration: string;
  amount: string;
}
 
interface WpRaDetailPublication {
  image: string | false;
  date: string;
  excerpt: string;
  author: string;
  href: WpRaDetailLinkField | "";
  full_content: string; // wysiwyg HTML for popup
}
 
interface WpResearchAreaDetailAcf {
  // Hero
  ra_hero_subline: string;
  ra_hero_image: string;
  // Sub Nav
  ra_subnav_label?: string;
  ra_subnav_links: WpRaDetailSubNavLink[] | false;
  // Intro
  ra_intro_paragraphs: WpRaDetailParagraph[] | false;
  ra_director_name: string;
  ra_director_role: string;
  ra_director_message: string;
  // Faculty
  ra_faculty_title: string;
  ra_faculty_description: string;
  ra_faculty_selected: number[];
  // Research Groups
  ra_groups_title: string;
  ra_groups_cards: WpRaDetailGroupCard[] | false;
  ra_groups_cta_label: string;
  ra_groups_cta_href: WpRaDetailLinkField | "";
  // Sponsored Research
  ra_sponsored_title: string;
  ra_sponsored_projects: WpRaDetailSponsoredProject[] | false;
  // Publications
  ra_publications_title: string;
  ra_publications: WpRaDetailPublication[] | false;
  // Video CTA
  ra_video_image: string;
  ra_video_label: string;
  ra_video_href: string;
  // CTA
  ra_cta_left_title: string;
  ra_cta_left_description: string;
  ra_cta_left_label: string;
  ra_cta_left_href: WpRaDetailLinkField;
  ra_cta_right_title: string;
  ra_cta_right_description: string;
  ra_cta_right_label: string;
  ra_cta_right_href: WpRaDetailLinkField;
}


// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Extract plain-text <p> content from a wysiwyg HTML blob.
 * Returns an array of paragraph strings, stripping all tags.
 * Used for intro fields where editors paste HTML.
 */
function extractPlainParagraphs(html: string): string[] {
  if (!html) return [];
  const pMatches = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)];
  if (pMatches.length > 0) {
    return pMatches
      .map((m) =>
        decodeHtml(m[1].replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()),
      )
      .filter(Boolean);
  }
  // Fallback: strip all tags if no <p> found
  const plain = decodeHtml(
    html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(),
  );
  return plain ? [plain] : [];
}

/** Normalise \r\n line endings to \n for whitespace-pre-line rendering */
function normaliseLineBreaks(s: string): string {
  return s.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}
 
/** Map a WpLdMember row → FacultyMember, handling the "" vs object href quirk */
function mapMember(m: WpLdMember, i: number, prefix: string): FacultyMember {
  const href =
    typeof m.href === "object" && m.href?.url ? m.href.url : "#";
  return {
    id: `${prefix}-${i}`,
    name: m.name,
    position: m.position,
    image: m.image || `https://picsum.photos/seed/${prefix}-${i}/580/700`,
    href,
  };
}
 
/**
 * REPLACE the existing parsePolicyHtml() function in lib/wordpress.ts
 * with this improved version.
 *
 * Correctly handles:
 *   <p>intro text</p>
 *   <ul>...</ul>
 *   <p>lead text between lists</p>   ← was being lost before
 *   <ul>...</ul>
 *   <p>outro text</p>
 */
function parsePolicyHtml(html: string): PolicyData {
  if (!html) {
    return { title: "", introParagraphs: [], bulletGroups: [], outroParagraphs: [] };
  }

  // Tokenise the HTML into an ordered sequence of blocks:
  // each token is either a <p>...</p> or a <ul>...</ul>
  const tokenRegex = /(<p[^>]*>[\s\S]*?<\/p>|<ul[\s\S]*?<\/ul>)/gi;
  const tokens = [...html.matchAll(tokenRegex)].map((m) => m[1].trim());

  const introParagraphs: string[] = [];
  const bulletGroups: Array<{ lead?: string; items: string[] }> = [];
  const outroParagraphs: string[] = [];

  let seenFirstList = false;
  // Text immediately before a <ul> becomes its lead sentence
  let pendingLead: string | undefined;

  for (const token of tokens) {
    const isUl = /^<ul/i.test(token);

    if (isUl) {
      // Extract <li> items
      const liMatches = [...token.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)];
      const items = liMatches
        .map((m) =>
          decodeHtml(m[1].replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()),
        )
        .filter(Boolean);

      if (items.length > 0) {
        bulletGroups.push({ lead: pendingLead, items });
      }

      pendingLead = undefined;
      seenFirstList = true;
    } else {
      // It's a <p> — extract plain text
      const text = decodeHtml(
        token.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(),
      );
      if (!text) continue;

      if (!seenFirstList) {
        // Before any list → intro paragraph
        introParagraphs.push(text);
      } else {
        // After at least one list — could be:
        // a) lead for the NEXT list → hold it as pendingLead
        // b) outro paragraph if no more lists follow
        // We always set as pendingLead; if no next list follows,
        // we flush it to outroParagraphs at the end.
        if (pendingLead) {
          // Two paragraphs in a row between lists — flush previous as outro
          outroParagraphs.push(pendingLead);
        }
        pendingLead = text;
      }
    }
  }

  // Flush any remaining pendingLead as outro (no list followed it)
  if (pendingLead) {
    outroParagraphs.push(pendingLead);
  }

  return { title: "", introParagraphs, bulletGroups, outroParagraphs };
}

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

function linkUrl(field: WpRaDetailLinkField | "" | undefined): string {
  if (!field || typeof field === "string") return "#";
  return field.url || "#";
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

function parseFunctionsHtml(html: string): {
  introParagraphs: string[];
  bulletGroups: Array<{ lead?: string; items: string[] }>;
  outroParagraphs: string[];
} {
  // Normalise: unwrap <div> tags, collapse whitespace
  const cleaned = html
    .replace(/<div[^>]*>/gi, "")
    .replace(/<\/div>/gi, "")
    .replace(/\r?\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
 
  const introParagraphs: string[] = [];
  const bulletGroups: Array<{ lead?: string; items: string[] }> = [];
  const outroParagraphs: string[] = [];
 
  // Split by <ul>...</ul> blocks to separate prose from lists
  const parts = cleaned.split(/(<ul[\s\S]*?<\/ul>)/gi);
 
  let seenFirstList = false;
  let pendingLead: string | undefined;
 
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
 
    if (/<ul/i.test(trimmed)) {
      // Extract <li> items
      const liMatches = [...trimmed.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)];
      const items = liMatches.map((m) =>
        m[1].replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim(),
      ).filter(Boolean);
 
      if (items.length > 0) {
        bulletGroups.push({ lead: pendingLead, items });
        pendingLead = undefined;
        seenFirstList = true;
      }
    } else {
      // Extract <p> tags from this prose chunk
      const pMatches = [...trimmed.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)];
      const paragraphs = pMatches.map((m) =>
        decodeHtml(m[1].replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim()),
      ).filter(Boolean);
 
      for (const p of paragraphs) {
        if (!seenFirstList && bulletGroups.length === 0) {
          // Check if the next sibling will be a <ul> — treat last p before ul as lead
          // Simple heuristic: if it ends with a colon, it's an intro/lead line
          if (p.endsWith(":")) {
            pendingLead = p;
          } else {
            introParagraphs.push(p);
          }
        } else if (seenFirstList && parts.indexOf(part) === parts.length - 1) {
          outroParagraphs.push(p);
        } else {
          // Paragraph between lists — treat as lead for next list
          pendingLead = p;
        }
      }
    }
  }
 
  return { introParagraphs, bulletGroups, outroParagraphs };
}

function extractParagraphs(html: string): string[] {
  const pMatches = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)];
  return pMatches
    .map((m) =>
      decodeHtml(m[1].replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim()),
    )
    .filter(Boolean);
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
  const [acf, contact] = await Promise.all([
    getPageAcf<WpAboutPageAcf>("about"),
    getSiteSettings(),
  ]);

  if (!acf) {
    console.warn(
      "[wordpress.ts] About page ACF not found — falling back to mock data.",
    );
    return aboutPageData;
  }

  // Normalise \r\n → \n so whitespace-pre-line renders line breaks correctly
  const normalise = (s: string) => s.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // Media paragraphs — if empty fall back to intro paragraphs (same content
  // is used in both blocks on the mock page)
  const rawMediaParagraphs = toArray(acf.ab_media_paragraphs);
  const mediaParagraphs =
    rawMediaParagraphs.length > 0
      ? rawMediaParagraphs.map((r) => normalise(r.paragraph))
      : toArray(acf.ab_intro_paragraphs).map((r) => normalise(r.paragraph));

  return {
    hero: {
      title: acf.ab_hero_title,
      subline: acf.ab_hero_subline || undefined,
      image: acf.ab_hero_image,
      breadcrumb: toArray(acf.ab_breadcrumb).map((b) => ({
        label: b.label,
        href: b.href,
      })),
    },

    subNavLabel: acf.ab_subnav_label,

    subNav: toArray(acf.ab_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),

    intro: {
      // \r\n normalised → \n; SchoolIntro uses whitespace-pre-line so
      // line breaks within a paragraph block render correctly
      paragraphs: toArray(acf.ab_intro_paragraphs).map((r) =>
        normalise(r.paragraph),
      ),
      vision: {
        title: acf.ab_vision_title,
        body: acf.ab_vision_body,
      },
      mission: {
        title: acf.ab_mission_title,
        body: acf.ab_mission_body,
      },
    },

    media: {
      image: acf.ab_media_image,
      paragraphs: mediaParagraphs,
    },

    diversity: {
      title: acf.ab_diversity_title,
      description: acf.ab_diversity_description,
    },

    // ✅ Live from Site Settings options page
    contact,
  };
}

export async function getLeadershipPage(): Promise<LeadershipPageData> {
  const [acf, contact] = await Promise.all([
    getPageAcf<WpLeadershipPageAcf>("leadership"),
    getSiteSettings(),
  ]);
 
  if (!acf) {
    console.warn(
      "[wordpress.ts] Leadership page ACF not found — falling back to mock data.",
    );
    return leadershipPageData;
  }
 
  return {
    hero: {
      title: acf.ld_hero_title,
      subline: acf.ld_hero_subline || undefined,
      image: acf.ld_hero_image,
      breadcrumb: toArray(acf.ld_breadcrumb).map((b) => ({
        label: b.label,
        href: b.href,
      })),
    },
 
    subNavLabel: acf.ld_subnav_label,
 
    subNav: toArray(acf.ld_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),
 
    intro: toArray(acf.ld_intro_paragraphs).map((r) =>
      normaliseLineBreaks(r.paragraph),
    ),
 
    president: {
      title: acf.ld_president_title,
      name: acf.ld_president_name,
      role: acf.ld_president_role,
      image: acf.ld_president_image,
      bio: toArray(acf.ld_president_bio).map((r) =>
        normaliseLineBreaks(r.paragraph),
      ),
    },
 
    boardOfGovernors: {
      title: acf.ld_bog_title,
      description: acf.ld_bog_description,
      members: toArray(acf.ld_bog_members).map((m, i) =>
        mapMember(m, i, "bog"),
      ),
    },
 
    academicCouncil: {
      title: acf.ld_ac_title,
      description: acf.ld_ac_description,
      members: toArray(acf.ld_ac_members).map((m, i) =>
        mapMember(m, i, "ac"),
      ),
    },
 
    financeCommittee: {
      title: acf.ld_fc_title,
      description: acf.ld_fc_description,
      members: toArray(acf.ld_fc_members).map((m, i) =>
        mapMember(m, i, "fc"),
      ),
    },
 
    directorGeneral: {
      title: acf.ld_dg_title,
      name: acf.ld_dg_name,
      role: acf.ld_dg_role,
      image: acf.ld_dg_image,
      bio: toArray(acf.ld_dg_bio).map((r) => normaliseLineBreaks(r.paragraph)),
    },
 
    directors: {
      title: acf.ld_directors_title,
      description: acf.ld_directors_description,
      members: toArray(acf.ld_directors_members).map((m, i) =>
        mapMember(m, i, "dir"),
      ),
    },
  
    diversity: {
      title: acf.ld_diversity_title,
      description: acf.ld_diversity_description,
    },
 
    // ✅ Live from Site Settings options page
    contact,
  };
}

export async function getAdministrationPage(): Promise<AdministrationPageData> {
  const [acf, contact] = await Promise.all([
    getPageAcf<WpAdministrationPageAcf>("administration"),
    getSiteSettings(),
  ]);
 
  if (!acf) {
    console.warn(
      "[wordpress.ts] Administration page ACF not found — falling back to mock data.",
    );
    return administrationPageData;
  }
 
  return {
    hero: {
      title: acf.ad_hero_title,
      subline: acf.ad_hero_subline || undefined,
      image: acf.ad_hero_image,
      breadcrumb: toArray(acf.ad_breadcrumb).map((b) => ({
        label: b.label,
        href: b.href,
      })),
    },
 
    subNavLabel: acf.ad_subnav_label,
 
    subNav: toArray(acf.ad_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),
 
    intro: toArray(acf.ad_intro_paragraphs).map((r) =>
      r.paragraph.replace(/\r\n/g, "\n").replace(/\r/g, "\n"),
    ),
 
    profiles: toArray(acf.ad_profiles).map((p) => ({
      id: p.anchor_id,
      title: p.title,
      name: p.name,
      role: p.role,
      image: p.image,
      bio: toArray(p.bio).map((r) =>
        r.paragraph.replace(/\r\n/g, "\n").replace(/\r/g, "\n"),
      ),
    })),
 
    diversity: {
      title: acf.ad_diversity_title,
      description: acf.ad_diversity_description,
    },
 
    // ✅ Live from Site Settings options page
    contact,
  };
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
  const acf = await getPageAcf<WpDeanResearchAcf>("dean-research");
 
  if (!acf) {
    console.warn(
      "[wordpress.ts] Dean Research page ACF not found — falling back to mock data.",
    );
    return deanResearchPageData;
  }
 
  // Desk paragraphs: each row may contain multiple <p> tags — flatten all
  const deskParagraphs = toArray(acf.dr_desk_paragraphs).flatMap((row) =>
    extractParagraphs(row.paragraph),
  );
 
  // Functions: the editor put everything into the first intro row as HTML
  // Parse it into the structured introParagraphs / bulletGroups / outroParagraphs
  const functionsHtml = toArray(acf.dr_functions_intro)
    .map((row) => row.paragraph)
    .join(" ");
 
  const { introParagraphs, bulletGroups, outroParagraphs } =
    functionsHtml
      ? parseFunctionsHtml(functionsHtml)
      : { introParagraphs: [], bulletGroups: [], outroParagraphs: [] };
 
  // If editor used the separate bullet_groups repeater, merge those too
  const scfBulletGroups = toArray(acf.dr_functions_bullet_groups).map((g) => ({
    lead: g.lead || undefined,
    items: toArray(g.items).map((i) => i.item).filter(Boolean),
  }));
 
  const scfOutro = toArray(acf.dr_functions_outro).map((row) =>
    row.paragraph.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(),
  );
 
  return {
    hero: {
      title: acf.dr_hero_title,
      subline: acf.dr_hero_subline || undefined,
      image: acf.dr_hero_image,
      breadcrumb: toArray(acf.dr_breadcrumb).map((b) => ({
        label: b.label,
        href: b.href,
      })),
    },
 
    subNavLabel: acf.dr_subnav_label,
 
    subNav: toArray(acf.dr_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),
 
    desk: {
      title: acf.dr_desk_title,
      paragraphs: deskParagraphs,
      name: acf.dr_desk_name,
      role: acf.dr_desk_role,
      image: acf.dr_desk_image,
      phone: acf.dr_desk_phone,
      email: acf.dr_desk_email,
    },
 
    functions: {
      title: acf.dr_functions_title,
      introParagraphs,
      bulletGroups: [...bulletGroups, ...scfBulletGroups],
      outroParagraphs: [...outroParagraphs, ...scfOutro],
    },
 
    officials: {
      title: acf.dr_officials_title,
      people: toArray(acf.dr_officials).map((o, i) => ({
        id: String(i),
        name: o.name,
        position: o.position,
        email: o.email || "",
        phone: o.phone || "",
        image:
          o.image ||
          `https://picsum.photos/seed/official-${i}/290/338`,
      })),
    },
 
    cta: {
      left: {
        title: acf.dr_cta_left_title || undefined,
        description: acf.dr_cta_left_description,
        cta: acf.dr_cta_left_label,
        href: acf.dr_cta_left_href?.url ?? "#",
      },
      right: {
        title: acf.dr_cta_right_title || undefined,
        description: acf.dr_cta_right_description,
        cta: acf.dr_cta_right_label,
        href: acf.dr_cta_right_href?.url ?? "#",
      },
    },
  };
}

export async function getResearchAreasPage(): Promise<ResearchAreasPageData> {
  const [acf, areaPosts] = await Promise.all([
    // Note: WP page slug is "research-areas-data" (not "research-areas")
    getPageAcf<WpResearchAreasAcf>("research-areas-data"),
    wpFetch<WpResearchPost[]>(
      `/wp/v2/research-area?_embed=wp:featuredmedia&per_page=20&orderby=title&order=asc`,
    ),
  ]);
 
  if (!acf) {
    console.warn(
      "[wordpress.ts] Research Areas page ACF not found — falling back to mock data.",
    );
    return researchAreasPageData;
  }
 
  return {
    hero: {
      title: acf.ra_hero_title,
      subline: acf.ra_hero_subline || undefined,
      image: acf.ra_hero_image,
      breadcrumb: toArray(acf.ra_breadcrumb).map((b) => ({
        label: b.label,
        href: b.href,
      })),
    },
 
    subNavLabel: acf.ra_subnav_label,
 
    subNav: toArray(acf.ra_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),
 
    // Strip HTML tags from each paragraph (editors used textarea wysiwyg)
    intro: toArray(acf.ra_intro).map((row) =>
      row.paragraph.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(),
    ),
 
    areas: {
      title: acf.ra_areas_title,
      description: acf.ra_areas_description,
      // Map research-area CPT posts → AreaCard[]
      cards: areaPosts.map((post) => ({
        id: String(post.id),
        title: decodeHtml(post.title.rendered),
        image:
          post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
          `https://picsum.photos/seed/area-${post.id}/148/148`,
        href: `/research/areas/${post.slug}`,
      })),
    },
 
    cta: {
      left: {
        title: acf.ra_cta_left_title || undefined,
        description: acf.ra_cta_left_description,
        cta: acf.ra_cta_left_label,
        href: acf.ra_cta_left_href?.url ?? "#",
      },
      right: {
        title: acf.ra_cta_right_title || undefined,
        description: acf.ra_cta_right_description,
        cta: acf.ra_cta_right_label,
        href: acf.ra_cta_right_href?.url ?? "#",
      },
    },
  };
}

/**
 * Research Area Detail (/research/areas/[slug])
 * When going headless: fetch WP post by slug and map to ResearchAreaDetailPageData.
 */
export async function getResearchAreaDetailPage(
  slug: string,
): Promise<ResearchAreaDetailPageData> {
  // Fetch the research-area CPT post by slug
  const posts = await wpFetch<
    Array<{ id: number; slug: string; title: { rendered: string }; acf: WpResearchAreaDetailAcf }>
  >(
    `/wp/v2/research-area?slug=${slug}&acf_format=standard&_fields=id,slug,title,acf`,
  );
 
  if (!posts || posts.length === 0) {
    console.warn(
      `[wordpress.ts] Research area '${slug}' not found — falling back to mock data.`,
    );
    return researchAreaDetailPageData;
  }
 
  const post = posts[0];
  const acf = post.acf;
  const title = decodeHtml(post.title.rendered);
 
  // Fetch faculty + events in parallel
  const facultyIds = (acf.ra_faculty_selected ?? []).join(",");
 
  const [facultyPosts, eventPosts] = await Promise.all([
    facultyIds
      ? wpFetch<WpFacultyPost[]>(
          `/wp/v2/faculty?include=${facultyIds}&_embed=wp:featuredmedia&acf_format=standard`,
        )
      : Promise.resolve([] as WpFacultyPost[]),
    wpFetch<WpEventPost[]>(
      `/wp/v2/event?_embed=wp:featuredmedia&per_page=3&orderby=date&order=desc`,
    ),
  ]);
 
  // Map faculty — preserve editor's chosen order
  const orderedFaculty = (acf.ra_faculty_selected ?? [])
    .map((id) => facultyPosts.find((p) => p.id === id))
    .filter((p): p is WpFacultyPost => p !== undefined);
 
  return {
    hero: {
      title,
      subline: acf.ra_hero_subline || undefined,
      image: acf.ra_hero_image,
      breadcrumb: [
        { label: "Home", href: "/" },
        { label: "Research", href: "/research" },
        { label: "Research Areas", href: "/research/areas" },
        { label: title, href: `/research/areas/${slug}` },
      ],
    },
 
    subNavLabel: acf.ra_subnav_label || title,
 
    subNav: toArray(acf.ra_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),
 
    intro: {
      paragraphs: toArray(acf.ra_intro_paragraphs).map((r) =>
        r.paragraph.replace(/\r\n/g, "\n").replace(/\r/g, "\n"),
      ),
      directorName: acf.ra_director_name || "",
      directorRole: acf.ra_director_role || "",
      directorMessage: acf.ra_director_message || "",
    },
 
    faculty: {
      title: acf.ra_faculty_title,
      description: acf.ra_faculty_description.trim(),
      members: orderedFaculty.map((p) => ({
        id: String(p.id),
        name: decodeHtml(p.title.rendered),
        position: p.acf?.position ?? "",
        image:
          p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
          `https://picsum.photos/seed/faculty-${p.id}/190/220`,
        href: `/faculty/${p.slug}`,
      })),
    },
 
    groups: {
      title: acf.ra_groups_title,
      cards: toArray(acf.ra_groups_cards).map((card, i) => ({
        id: String(i),
        title: card.title,
        // image: false means no image set — use picsum fallback
        image:
          typeof card.image === "string" && card.image
            ? card.image
            : `https://picsum.photos/seed/group-${i}/148/148`,
        href: linkUrl(card.href),
      })),
      projectsHref: linkUrl(acf.ra_groups_cta_href),
      projectsCta: acf.ra_groups_cta_label || "Research Projects",
    },
 
    sponsored: {
      title: acf.ra_sponsored_title,
      projects: toArray(acf.ra_sponsored_projects).map((p, i) => ({
        id: String(i),
        pi: p.pi,
        title: p.title,
        fundingAgency: p.funding_agency,
        duration: p.duration,
        amount: p.amount,
      })),
    },
 
    publications: {
      title: acf.ra_publications_title,
      items: toArray(acf.ra_publications).map((pub, i) => ({
        id: String(i),
        image:
          typeof pub.image === "string" && pub.image
            ? pub.image
            : `https://picsum.photos/seed/pub-${i}/400/267`,
        date: pub.date,
        excerpt: pub.excerpt,
        author: pub.author,
        href: linkUrl(pub.href),
        // full_content is the wysiwyg HTML — passed through as-is for popup rendering
        // The component should render this with dangerouslySetInnerHTML
        fullContent: pub.full_content || "",
      })),
    },
 
    videoCta: {
      image: acf.ra_video_image,
      label: acf.ra_video_label,
      href: acf.ra_video_href || "#",
    },
 
    events: {
      title: "Upcoming Events",
      allHref: "/life/events",
      items: eventPosts.map((ev) => ({
        id: String(ev.id),
        title: decodeHtml(ev.title.rendered),
        date: formatIsoDate(ev.date),
        image:
          ev._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
          `https://picsum.photos/seed/event-${ev.id}/418/260`,
        href: `/events/${ev.slug}`,
      })),
    },
 
    cta: {
      left: {
        title: acf.ra_cta_left_title || undefined,
        description: acf.ra_cta_left_description,
        cta: acf.ra_cta_left_label,
        href: acf.ra_cta_left_href?.url ?? "#",
      },
      right: {
        title: acf.ra_cta_right_title || undefined,
        description: acf.ra_cta_right_description,
        cta: acf.ra_cta_right_label,
        href: acf.ra_cta_right_href?.url ?? "#",
      },
    },
  };
}

export async function getGrantsPage(): Promise<GrantsPageData> {
  const [acf, availableGrants, pastGrants] = await Promise.all([
    getPageAcf<WpGrantsPageAcf>("grants-projects"),
    // Term IDs: available=4, past=3
    wpFetch<WpGrantPost[]>(
      `/wp/v2/grant?grants-type=4&acf_format=standard&per_page=20&orderby=date&order=desc`,
    ),
    wpFetch<WpGrantPost[]>(
      `/wp/v2/grant?grants-type=3&acf_format=standard&per_page=20&orderby=date&order=desc`,
    ),
  ]);
 
  if (!acf) {
    console.warn(
      "[wordpress.ts] Grants page ACF not found — falling back to mock data.",
    );
    return grantsPageData;
  }
 
  // Extract plain text from the wysiwyg intro HTML
  const introText = acf.gp_intro
    ? acf.gp_intro
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
    : "";
 
  // Map a grant CPT post → GrantCard
  const toGrantCard = (post: WpGrantPost, i: number): GrantCard => ({
    id: String(post.id),
    name: decodeHtml(post.title.rendered),
    description: excerptFromHtml(post.content.rendered, 40),
    applyLabel: post.acf?.apply_label || "Apply",
    applyHref: post.acf?.apply_href?.url || "#",
    detailHref: post.acf?.detail_href?.url || undefined,
  });
 
  return {
    hero: {
      title: acf.gp_hero_title,
      subline: acf.gp_hero_subline || undefined,
      image: acf.gp_hero_image,
      breadcrumb: toArray(acf.gp_breadcrumb).map((b) => ({
        label: b.label,
        href: b.href,
      })),
    },
 
    subNavLabel: acf.gp_subnav_label,
 
    subNav: toArray(acf.gp_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),
 
    intro: introText ? [introText] : [],
 
    // Exactly two tabs as required by GrantsPageData type
    tabs: [
      {
        tabLabel: "Available Grants",
        sectionTitle: acf.gp_available_title,
        description: acf.gp_available_description,
        cards: availableGrants.map(toGrantCard),
      },
      {
        tabLabel: "Past Grants",
        sectionTitle: acf.gp_past_title,
        description: acf.gp_past_description,
        cards: pastGrants.map(toGrantCard),
      },
    ],
 
    sponsored: {
      title: acf.gp_sponsored_title,
      projects: toArray(acf.gp_sponsored_projects).map((p, i) => ({
        id: String(i),
        pi: p.pi,
        title: p.title,
        fundingAgency: p.funding_agency,
        duration: p.duration,
        amount: p.amount,
      })),
    },
 
    cta: {
      left: {
        title: acf.gp_cta_left_title || undefined,
        description: acf.gp_cta_left_description,
        cta: acf.gp_cta_left_label,
        href: acf.gp_cta_left_href?.url ?? "#",
      },
      right: {
        title: acf.gp_cta_right_title || undefined,
        description: acf.gp_cta_right_description,
        cta: acf.gp_cta_right_label,
        href: acf.gp_cta_right_href?.url ?? "#",
      },
    },
  };
}

export async function getAwardsPage(): Promise<AwardsPageData> {
  const acf = await getPageAcf<WpAwardsPageAcf>("awards-recognition");
 
  if (!acf) {
    console.warn(
      "[wordpress.ts] Awards page ACF not found — falling back to mock data.",
    );
    return awardsPageData;
  }
 
  // Policy button href — can be empty string or WpAwLinkField object
  const policyButtonHref =
    typeof acf.aw_policy_button_href === "object" &&
    acf.aw_policy_button_href?.url
      ? acf.aw_policy_button_href.url
      : null;
 
  // Parse policy wysiwyg HTML into PolicyData shape
  const policyParsed = parsePolicyHtml(acf.aw_policy_content);
 
  return {
    hero: {
      title: acf.aw_hero_title,
      subline: acf.aw_hero_subline || undefined,
      image: acf.aw_hero_image,
      breadcrumb: toArray(acf.aw_breadcrumb).map((b) => ({
        label: b.label,
        href: b.href,
      })),
    },
 
    subNavLabel: acf.aw_subnav_label,
 
    subNav: toArray(acf.aw_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),
 
    // Strip component HTML from intro wysiwyg — extract plain paragraphs
    intro: extractPlainParagraphs(acf.aw_intro),
 
    awardees: {
      title: acf.aw_awardees_title,
      years: toArray(acf.aw_years).map((yearRow, yi) => ({
        year: yearRow.year,
        awardees: toArray(yearRow.awardees).map((a, ai) => ({
          id: `${yearRow.year}-${ai + 1}`,
          studentName: a.student_name,
          publicationMonth: a.publication_month,
          publicationVenue: a.publication_venue,
          facultyAuthor: a.faculty_author,
          title: a.title,
        })),
      })),
    },
 
    policy: {
      title: acf.aw_policy_title,
      introParagraphs: policyParsed.introParagraphs,
      bulletGroups: policyParsed.bulletGroups,
      outroParagraphs: policyParsed.outroParagraphs,
      button:
        acf.aw_policy_button_label && policyButtonHref
          ? {
              label: acf.aw_policy_button_label,
              href: policyButtonHref,
              external:
                typeof acf.aw_policy_button_href === "object" &&
                acf.aw_policy_button_href?.target === "_blank",
            }
          : undefined,
    },
 
    cta: {
      left: {
        title: acf.aw_cta_left_title || undefined,
        description: acf.aw_cta_left_description,
        cta: acf.aw_cta_left_label,
        href: acf.aw_cta_left_href?.url ?? "#",
      },
      right: {
        title: acf.aw_cta_right_title || undefined,
        description: acf.aw_cta_right_description,
        cta: acf.aw_cta_right_label,
        href: acf.aw_cta_right_href?.url ?? "#",
      },
    },
  };
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