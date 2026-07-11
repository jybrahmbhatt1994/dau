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
import { admissionPageData } from "@/data/admission";
import { admissionDatasets } from "@/data/admission";

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
  ProgramsListingPageData,
  ProgramBlock,
  AdmissionPageData,
  AdmissionDataset,
  ScholarshipDetailPageData,
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

interface WpAaLinkField {
  title: string;
  url: string;
  target: string;
}

interface WpAaBreadcrumb {
  label: string;
  href: string;
}

interface WpAaSubNavLink {
  label: string;
  href: string;
}

interface WpAaParagraph {
  paragraph: string;
}

interface WpAaAreaCard {
  title: string;
  image: string;
  href: WpAaLinkField;
}

interface WpAcademicAreasPageAcf {
  // Hero
  aa_hero_title: string;
  aa_hero_subline: string;
  aa_hero_image: string;
  aa_breadcrumb: WpAaBreadcrumb[] | false;
  // Sub Nav
  aa_subnav_links: WpAaSubNavLink[] | false;
  // Intro
  aa_intro_paragraphs: WpAaParagraph[] | false;
  // Areas of Study
  aa_areas_title: string;
  aa_areas_description: string;
  aa_areas_cards: WpAaAreaCard[] | false;
  // CTA
  aa_cta_calendar_title: string;
  aa_cta_calendar_description: string;
  aa_cta_calendar_label: string;
  aa_cta_calendar_href: WpAaLinkField;
  aa_cta_catalogue_title: string;
  aa_cta_catalogue_description: string;
  aa_cta_catalogue_label: string;
  aa_cta_catalogue_href: WpAaLinkField;
}

interface WpDaLinkField {
  title: string;
  url: string;
  target: string;
}

interface WpDaBreadcrumb {
  label: string;
  href: string;
}

interface WpDaSubNavLink {
  label: string;
  href: string;
}

interface WpDaParagraph {
  paragraph: string;
}

interface WpDaOfficial {
  name: string;
  position: string;
  email: string;
  phone: string;
  image: string;
}

interface WpDeanAcademicsAcf {
  // Hero
  da_hero_title: string;
  da_hero_subline: string;
  da_hero_image: string;
  da_breadcrumb: WpDaBreadcrumb[] | false;
  // Sub Nav
  da_subnav_links: WpDaSubNavLink[] | false;
  // Dean's Desk
  da_desk_title: string;
  da_desk_paragraphs: WpDaParagraph[] | false;
  da_desk_image: string;
  da_functions_title: string;
  da_functions_paragraphs: WpDaParagraph[] | false;
  da_desk_email: string;
  // Officials
  da_officials_title: string;
  da_officials: WpDaOfficial[] | false;
  // CTA
  da_cta_calendar_title: string;
  da_cta_calendar_description: string;
  da_cta_calendar_label: string;
  da_cta_calendar_href: WpDaLinkField;
  da_cta_areas_title: string;
  da_cta_areas_description: string;
  da_cta_areas_label: string;
  da_cta_areas_href: WpDaLinkField;
}

interface WpPcLinkField {
  title: string;
  url: string;
  target: string;
}

interface WpPcBreadcrumb {
  label: string;
  href: string;
}

interface WpPcSubNavLink {
  label: string;
  href: string;
}

interface WpPcParagraph {
  paragraph: string;
}

interface WpPcSupportCard {
  title: string;
  excerpt: string;
  image: string;
  href: WpPcLinkField | "";
}

interface WpProgramCategoryAcf {
  // Hero
  pc_hero_subline: string;
  pc_hero_image: string;
  pc_breadcrumb: WpPcBreadcrumb[] | false;
  // Sub Nav
  pc_subnav_label?: string;
  pc_subnav_links: WpPcSubNavLink[] | false;
  // Intro
  pc_intro_paragraphs: WpPcParagraph[] | false;
  // Courses
  pc_courses_title: string;
  pc_courses_description: string;
  pc_courses_selected: number[];
  // Admission CTA
  pc_admission_eyebrow: string;
  pc_admission_title: string;
  pc_admission_description: string;
  // Faculty
  pc_faculty_title: string;
  pc_faculty_description: string;
  pc_faculty_selected: number[];
  // Academic Support
  pc_support_title: string;
  pc_support_cards: WpPcSupportCard[] | false;
  // CTA
  pc_cta_calendar_title: string;
  pc_cta_calendar_description: string;
  pc_cta_calendar_label: string;
  pc_cta_calendar_href: WpPcLinkField;
  pc_cta_catalogue_title: string;
  pc_cta_catalogue_description: string;
  pc_cta_catalogue_label: string;
  pc_cta_catalogue_href: WpPcLinkField;
}

interface WpProgramCategoryPost {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: WpProgramCategoryAcf;
}

interface WpSotLinkField {
  title: string;
  url: string;
  target: string;
}

interface WpSotHeroImage {
  image: string;
  alt: string;
}

interface WpSotSubNavLink {
  label: string;
  href: string;
}

interface WpSotParagraph {
  paragraph: string;
}

interface WpSotPeopleCategory {
  label: string;
  image: string;
  href: WpSotLinkField;
}

interface WpSchoolPageAcf {
  // Hero
  sot_hero_eyebrow: string;
  sot_hero_eyebrow_sub: string;
  sot_hero_rank_label: string;
  sot_hero_rank_value: string;
  sot_hero_subline: string;
  sot_hero_images: WpSotHeroImage[];
  // Sub Nav
  sot_subnav_links: WpSotSubNavLink[] | false;
  // Intro
  sot_intro_paragraphs: WpSotParagraph[] | false;
  sot_vision_title: string;
  sot_vision_body: string;
  sot_mission_title: string;
  sot_mission_body: string;
  // Programs
  sot_programs_title: string;
  sot_programs_description: string;
  sot_programs_selected: number[];
  // Research
  sot_research_title: string;
  sot_research_description: string;
  sot_research_selected: number[];
  // People
  sot_people_title: string;
  sot_people_categories: WpSotPeopleCategory[] | false;
  // News
  sot_news_title: string;
  sot_news_description: string;
  // Events
  sot_events_title: string;
  // CTA
  sot_cta_calendar_title: string;
  sot_cta_calendar_description: string;
  sot_cta_calendar_label: string;
  sot_cta_calendar_href: WpSotLinkField;
  sot_cta_areas_title: string;
  sot_cta_areas_description: string;
  sot_cta_areas_label: string;
  sot_cta_areas_href: WpSotLinkField;
}

// Course CPT post shape (used for the Programs section)
interface WpCoursePost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text: string }>;
  };
}

interface WpPgLinkField {
  title: string;
  url: string;
  target: string;
}

interface WpPgSubNavLink {
  label: string;
  href: string;
}

interface WpPgParagraph {
  paragraph: string;
}

interface WpPgBullet {
  bullet: string;
}

interface WpPgGalleryImage {
  image: string;
}

interface WpPgOutcomeItem {
  code: string;
  lead: string;
  body: string;
}

interface WpPgElectiveName {
  name: string;
}

interface WpPgSemesterCourse {
  name: string;
  ltpc: string;
}

interface WpPgSemesterItem {
  title: string;
  description: string;
  courses: WpPgSemesterCourse[] | false;
}

interface WpPgFaqItem {
  question: string;
  answer: string;
}

interface WpCourseAcf {
  // Hero
  pg_hero_subline: string;
  pg_hero_image: string;
  // Sub Nav
  pg_subnav_label: string;
  pg_subnav_links: WpPgSubNavLink[] | false;
  // Apply Banner
  pg_banner_text: string;
  pg_banner_cta: string;
  pg_banner_href: WpPgLinkField | "";
  // Intro
  pg_intro_paragraphs: WpPgParagraph[] | false;
  // Honours
  pg_honours_title: string;
  pg_honours_paragraphs: WpPgParagraph[] | false;
  pg_honours_bullets: WpPgBullet[] | false;
  pg_honours_image: string | false;
  pg_honours_gallery: WpPgGalleryImage[] | false;
  pg_honours_button_label: string;
  pg_honours_button_href: WpPgLinkField | "";
  // Honours Minor
  pg_hm_title: string;
  pg_hm_paragraphs: WpPgParagraph[] | false;
  pg_hm_bullets: WpPgBullet[] | false;
  pg_hm_image: string | false;
  // Outcomes
  pg_po_title: string;
  pg_po_view_all_href: WpPgLinkField | "";
  pg_po_items: WpPgOutcomeItem[] | false;
  pg_pso_title: string;
  pg_pso_items: WpPgOutcomeItem[] | false;
  // Core Courses
  pg_core_title: string;
  pg_core_paragraphs: WpPgParagraph[] | false;
  pg_core_bullets: WpPgBullet[] | false;
  pg_core_image: string | false;
  // Elective Courses
  pg_elective_title: string;
  pg_elective_paragraphs: WpPgParagraph[] | false;
  pg_elective_bullets: WpPgBullet[] | false;
  // Electives Table
  pg_electives_table_title: string;
  pg_electives_table_description: string;
  pg_electives_table_items: WpPgElectiveName[] | false;
  // Co-curricular
  pg_cc_title: string;
  pg_cc_paragraphs: WpPgParagraph[] | false;
  pg_cc_gallery: WpPgGalleryImage[] | false;
  // Semesters
  pg_semesters_title: string;
  pg_semesters_description: string;
  pg_semesters_items: WpPgSemesterItem[] | false;
  // Admission CTA
  pg_admission_eyebrow: string;
  pg_admission_title: string;
  pg_admission_description: string;
  // FAQs
  pg_faqs_title: string;
  pg_faqs_items: WpPgFaqItem[] | false;
  // Contact
  pg_contact_phone: string;
  pg_contact_email: string;
  // CTA
  pg_cta_calendar_title: string;
  pg_cta_calendar_description: string;
  pg_cta_calendar_label: string;
  pg_cta_calendar_href: WpPgLinkField;
  pg_cta_areas_title: string;
  pg_cta_areas_description: string;
  pg_cta_areas_label: string;
  pg_cta_areas_href: WpPgLinkField;
}

interface WpCourseDetailPost {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: WpCourseAcf;
}

interface WpAdmissionFilterResponse {
  streams: {
    slug: string;
    label: string;
    courses: { slug: string; label: string; hasCategories: boolean }[];
  }[];
  categories: { slug: string; label: string }[];
}

interface WpAdmissionPageAcf {
  hero: { title: string; subline: string; image: string };
  sub_nav_label: string;
  sub_nav?: { label: string; href: string }[];
  apply_banner: { text: string; cta: string; href: string };
  filter_placeholders: { stream: string; course: string; category: string };
  empty_prompt: string;
  contact: { phone: string; email: string };
  cta_left: { title?: string; description: string; cta: string; href: string };
  cta_right: { title?: string; description: string; cta: string; href: string };
}

interface WpParagraphRow {
  paragraph: string;
}
interface WpBulletRow {
  bullet: string;
}

interface WpAdmissionAcf {
  intro_paragraphs?: WpParagraphRow[];
  important_dates?: {
    title: string;
    items?: { label: string; value: string; pending?: boolean }[];
  };
  intake?: {
    title: string;
    items?: { program: string; count: string }[];
  };
  program_structures?: {
    title: string;
    items?: {
      title: string;
      description: string;
      image: string;
      brochure_href?: string;
      brochure_label?: string;
    }[];
  };
  placement_stats?: {
    title: string;
    description: string;
    legend?: { highest_label: string; average_label: string };
    buckets?: { label: string; highest: number; average: number }[];
    logos?: { name: string; logo: string; href?: string }[];
    stats?: { value: string; label: string }[];
  };
  eligibility?: {
    title: string;
    tabs?: {
      label: string;
      paragraphs?: WpParagraphRow[];
      bullets?: WpBulletRow[];
    }[];
  };
  selection_criteria?: {
    title: string;
    paragraphs?: WpParagraphRow[];
  };
  fee_structure?: {
    title: string;
    intro: string;
    cards?: {
      label: string;
      value: string;
      sub_note?: string;
      highlight?: boolean;
    }[];
    footnotes?: { footnote: string }[];
    notes?: { heading: string; paragraphs?: WpParagraphRow[] }[];
    education_loan?: {
      heading: string;
      description: string;
      image: string;
      cta_label: string;
      cta_href: string;
    };
    refund_note?: string;
  };
  scholarships?: {
    title: string;
    intro: string;
    bullets?: WpBulletRow[];
    cards?: {
      title: string;
      description: string;
      cta_label: string;
      cta_href: string;
    }[];
  };
  how_to_apply?: {
    title: string;
    background_image: string;
    steps?: { step: string }[];
    cta_label: string;
    cta_href: string;
  };
  faqs?: {
    title: string;
    items?: { question: string; answer: string }[];
  };
}

interface WpAdmissionPost {
  id: number;
  acf: WpAdmissionAcf;
  course_slug: string | null;
  category_slug: string | null;
}

interface WpAcLinkField {
  title: string;
  url: string;
  target: string;
}

interface WpAcSubNavLink {
  label: string;
  href: string;
}

interface WpAcParagraph {
  paragraph: string;
}

interface WpAcSchoolCard {
  title: string;
  image: string;
  href: WpAcLinkField;
}

interface WpAcSupportCard {
  title: string;
  excerpt: string;
  image: string;
  href: WpAcLinkField | "";
}

interface WpAcAreaCard {
  title: string;
  image: string;
  href: WpAcLinkField;
}

interface WpAcademicsLandingAcf {
  // Hero
  ac_hero_subline: string;
  ac_hero_image: string;
  // Sub Nav
  ac_subnav_links: WpAcSubNavLink[] | false;
  // Dean
  ac_dean_title: string;
  ac_dean_paragraphs: WpAcParagraph[] | false;
  ac_dean_email: string;
  ac_dean_image: string;
  // Schools
  ac_schools_title: string;
  ac_schools_description: string;
  ac_schools_cards: WpAcSchoolCard[] | false;
  // Programs (relationship → pragrams-of-study)
  ac_programs_title: string;
  ac_programs_description: string;
  ac_programs_selected: number[];
  // Areas (relationship → research-area)
  ac_areas_title: string;
  ac_areas_description: string;
  ac_areas_cards: WpAcAreaCard[] | false;
  // Support
  ac_support_title: string;
  ac_support_cards: WpAcSupportCard[] | false;
  // CTA
  ac_cta_calendar_title: string;
  ac_cta_calendar_description: string;
  ac_cta_calendar_label: string;
  ac_cta_calendar_href: WpAcLinkField;
  ac_cta_catalogue_title: string;
  ac_cta_catalogue_description: string;
  ac_cta_catalogue_label: string;
  ac_cta_catalogue_href: WpAcLinkField;
}

// Program category CPT post shape (pragrams-of-study) — minimal fields needed
interface WpProgramCategorySlimPost {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: {
    pc_hero_subline?: string;
    pc_hero_image?: string;
  };
}

interface WpFsLinkField {
  title: string;
  url: string;
  target: string;
}

interface WpFsBreadcrumb {
  label: string;
  href: string;
}

interface WpFsSubNavLink {
  label: string;
  href: string;
}

interface WpFsParagraph {
  paragraph: string;
}

interface WpFsScholarshipCard {
  title: string;
  excerpt: string;
  image: string;
  href: WpFsLinkField;
}

interface WpFsFaqItem {
  question: string;
  answer: string;
}

interface WpFinancialSupportAcf {
  // Hero
  fs_hero_subline: string;
  fs_hero_image: string;
  fs_breadcrumb: WpFsBreadcrumb[] | false;
  // Sub Nav
  fs_subnav_label: string;
  fs_subnav_links: WpFsSubNavLink[] | false;
  // DAU Scholarships
  fs_dau_title: string;
  fs_dau_paragraphs: WpFsParagraph[] | false;
  // Other Scholarships
  fs_other_title: string;
  fs_other_description: string;
  fs_other_cards: WpFsScholarshipCard[] | false;
  // FAQs
  fs_faqs_title: string;
  fs_faqs_items: WpFsFaqItem[] | false;
  // Contact
  fs_contact_phone: string;
  fs_contact_email: string;
  // CTA
  fs_cta_left_title: string;
  fs_cta_left_description: string;
  fs_cta_left_label: string;
  fs_cta_left_href: WpFsLinkField;
  fs_cta_right_title: string;
  fs_cta_right_description: string;
  fs_cta_right_label: string;
  fs_cta_right_href: WpFsLinkField;
}

interface WpUsLinkField {
  title: string;
  url: string;
  target: string;
}
 
interface WpUsBreadcrumb {
  label: string;
  href: string;
}
 
interface WpUsSubNavLink {
  label: string;
  href: string;
}
 
interface WpUsParagraph {
  paragraph: string;
}
 
interface WpUsFaqItem {
  question: string;
  answer: string;
}
 
interface WpUgScholarshipsAcf {
  // Hero
  us_hero_subline: string;
  us_hero_image: string;
  us_breadcrumb: WpUsBreadcrumb[] | false;
  // Sub Nav
  us_subnav_label: string;
  us_subnav_links: WpUsSubNavLink[] | false;
  // DAU Scholarships
  us_dau_title: string;
  us_dau_paragraphs: WpUsParagraph[] | false;
  // Scholarships Offered (relationship → scholarship CPT)
  us_offered_title: string;
  us_offered_description: string;
  us_offered_selected: number[];
  // FAQs
  us_faqs_title: string;
  us_faqs_items: WpUsFaqItem[] | false;
  // Contact
  us_contact_phone: string;
  us_contact_email: string;
  // CTA
  us_cta_left_title: string;
  us_cta_left_description: string;
  us_cta_left_label: string;
  us_cta_left_href: WpUsLinkField;
  us_cta_right_title: string;
  us_cta_right_description: string;
  us_cta_right_label: string;
  us_cta_right_href: WpUsLinkField;
}
 
// Slim scholarship post shape — only what the hub-page card needs
interface WpScholarshipSlimPost {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: {
    sch_hero_subline?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text: string }>;
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────



/** Stable, human-inspectable id from a section slug + row index (ACF
 * repeater rows have no natural id — the frontend only needs a React key). */
const rowId = (section: string, i: number) => `${section}-${i}`;
 
const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-");

function arr<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

// No local fetch helper here — every call below uses the `wpFetch` /
// `getPageAcf` already imported at the top of lib/wordpress.ts from
// "@/lib/api". Their signature is `wpFetch<T>(endpoint, revalidate = 60)`
// where `endpoint` starts with "/wp/v2/…" or "/dau/v1/…" — no "/wp-json"

function mapAdmissionDataset(post: WpAdmissionPost): AdmissionDataset {
  const acf = post.acf;
 
  return {
    courseSlug: post.course_slug ?? "",
    categorySlug: post.category_slug ?? undefined,
 
    intro: arr<WpParagraphRow>(acf.intro_paragraphs).map((r) => r.paragraph),
 
    importantDates: {
      title: acf.important_dates?.title ?? "Important Dates",
      items: arr<{ label: string; value: string; pending?: boolean }>(
        acf.important_dates?.items
      ).map((it, i) => ({
        id: rowId("date", i),
        label: it.label,
        value: it.value,
        pending: it.pending,
      })),
    },
 
    intake: {
      title: acf.intake?.title ?? "Intake",
      items: arr<{ program: string; count: string }>(
        acf.intake?.items
      ).map((it, i) => ({
        id: rowId("intake", i),
        program: it.program,
        count: it.count,
      })),
    },
 
    programStructures: {
      title: acf.program_structures?.title ?? "Program Structures",
      items: arr<{
        title: string;
        description: string;
        image: string;
        brochure_href?: string;
        brochure_label?: string;
      }>(acf.program_structures?.items).map((it, i) => ({
        id: rowId("program", i),
        title: it.title,
        description: it.description,
        image: it.image,
        brochureHref: it.brochure_href,
        brochureLabel: it.brochure_label,
      })),
    },
 
    placementStats: {
      title: acf.placement_stats?.title ?? "Placement Statistics",
      description: acf.placement_stats?.description ?? "",
      legend: {
        highestLabel: acf.placement_stats?.legend?.highest_label ?? "Highest",
        averageLabel: acf.placement_stats?.legend?.average_label ?? "Average",
      },
      buckets: arr<{ label: string; highest: number; average: number }>(
        acf.placement_stats?.buckets
      ).map((b) => ({
        label: b.label,
        highest: b.highest,
        average: b.average,
      })),
      logos: arr<{ name: string; logo: string; href?: string }>(
        acf.placement_stats?.logos
      ).map((l, i) => ({
        id: rowId("logo", i),
        name: l.name,
        logo: l.logo,
        href: l.href,
      })),
      stats: arr<{ value: string; label: string }>(
        acf.placement_stats?.stats
      ).map((s) => ({
        value: s.value,
        label: s.label,
      })),
    },
 
    eligibility: {
      title: acf.eligibility?.title ?? "Eligibility Criteria",
      tabs: arr<{
        label: string;
        paragraphs?: WpParagraphRow[];
        bullets?: WpBulletRow[];
      }>(acf.eligibility?.tabs).map((t) => ({
        slug: slugify(t.label),
        label: t.label,
        paragraphs: arr<WpParagraphRow>(t.paragraphs).map((p) => p.paragraph),
        bullets: t.bullets?.length
          ? t.bullets.map((b) => b.bullet)
          : undefined,
      })),
    },
 
    selectionCriteria: {
      title: acf.selection_criteria?.title ?? "Selection Criteria",
      paragraphs: arr<WpParagraphRow>(acf.selection_criteria?.paragraphs).map(
        (p) => p.paragraph
      ),
    },
 
    feeStructure: {
      title: acf.fee_structure?.title ?? "Fee Structure",
      intro: acf.fee_structure?.intro ?? "",
      cards: arr<{
        label: string;
        value: string;
        sub_note?: string;
        highlight?: boolean;
      }>(acf.fee_structure?.cards).map((c, i) => ({
        id: rowId("fee", i),
        label: c.label,
        value: c.value,
        subNote: c.sub_note,
        highlight: c.highlight,
      })),
      footnotes: arr<{ footnote: string }>(acf.fee_structure?.footnotes).map(
        (f) => f.footnote
      ),
      notes: arr<{ heading: string; paragraphs?: WpParagraphRow[] }>(
        acf.fee_structure?.notes
      ).map((n) => ({
        heading: n.heading,
        paragraphs: arr<WpParagraphRow>(n.paragraphs).map((p) => p.paragraph),
      })),
      educationLoan: {
        heading: acf.fee_structure?.education_loan?.heading ?? "Education Loan",
        description: acf.fee_structure?.education_loan?.description ?? "",
        image: acf.fee_structure?.education_loan?.image ?? "",
        ctaLabel: acf.fee_structure?.education_loan?.cta_label ?? "",
        ctaHref: acf.fee_structure?.education_loan?.cta_href ?? "",
      },
      refundNote: acf.fee_structure?.refund_note ?? "",
    },
 
    scholarships: {
      title: acf.scholarships?.title ?? "Scholarships",
      intro: acf.scholarships?.intro ?? "",
      bullets: acf.scholarships?.bullets?.length
        ? acf.scholarships.bullets.map((b) => b.bullet)
        : undefined,
      cards: arr<{
        title: string;
        description: string;
        cta_label: string;
        cta_href: string;
      }>(acf.scholarships?.cards).map((c, i) => ({
        id: rowId("scholarship", i),
        title: c.title,
        description: c.description,
        ctaLabel: c.cta_label,
        ctaHref: c.cta_href,
      })),
    },
 
    howToApply: {
      title: acf.how_to_apply?.title ?? "How to Apply",
      backgroundImage: acf.how_to_apply?.background_image ?? "",
      steps: arr<{ step: string }>(acf.how_to_apply?.steps).map((s) => s.step),
      cta: {
        label: acf.how_to_apply?.cta_label ?? "",
        href: acf.how_to_apply?.cta_href ?? "",
      },
    },
 
    faqs: {
      title: acf.faqs?.title ?? "FAQs",
      items: arr<{ question: string; answer: string }>(acf.faqs?.items).map(
        (it, i) => ({
        id: rowId("faq", i),
        question: it.question,
        answer: it.answer,
      })),
    },
  };
}

function normaliseLB(s: string): string {
  return s.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
}

/** Extract URL from a link field that may be an object OR an empty string "" */
function pgLinkUrl(field: WpPgLinkField | "" | undefined): string {
  if (!field || typeof field === "string") return "#";
  return field.url || "#";
}

/** Extract an image URL that may be `false` when unset */
function pgImage(val: string | false | undefined): string | undefined {
  return typeof val === "string" && val ? val : undefined;
}

/** Build a ProgramBlock from the 5 shared sub-field groups (Honours, Core, etc) */
function buildProgramBlock(opts: {
  title: string;
  paragraphs: WpPgParagraph[] | false;
  bullets?: WpPgBullet[] | false;
  image?: string | false;
  gallery?: WpPgGalleryImage[] | false;
  buttonLabel?: string;
  buttonHref?: WpPgLinkField | "";
}): ProgramBlock {
  const bullets = toArray(opts.bullets ?? false).map((b) => b.bullet).filter(Boolean);
  const gallery = toArray(opts.gallery ?? false).map((g) => g.image).filter(Boolean);

  return {
    title: opts.title,
    paragraphs: toArray(opts.paragraphs).map((p) =>
      p.paragraph.replace(/\r\n/g, "\n").replace(/\r/g, "\n"),
    ),
    ...(bullets.length > 0 && { bullets }),
    ...(pgImage(opts.image) && { image: pgImage(opts.image) }),
    ...(gallery.length > 0 && { gallery }),
    ...(opts.buttonLabel &&
      opts.buttonHref &&
      typeof opts.buttonHref === "object" && {
        button: { label: opts.buttonLabel, href: opts.buttonHref.url },
      }),
  };
}

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
  const acf = await getPageAcf<WpAcademicsLandingAcf>("academics");

  if (!acf) {
    console.warn(
      "[wordpress.ts] Academics landing page ACF not found — falling back to mock data.",
    );
    return academicsData;
  }

  const programIds = (acf.ac_programs_selected ?? []).join(",");

  // Fetch relationship-selected posts in parallel — no waterfall
  const [programPosts, areaPosts] = await Promise.all([
    programIds
      ? wpFetch<WpProgramCategorySlimPost[]>(
          `/wp/v2/pragrams-of-study?include=${programIds}&acf_format=standard&_fields=id,slug,title,acf`,
        )
      : Promise.resolve([] as WpProgramCategorySlimPost[]),
  ]);

  // Preserve editor's chosen order for both relationship fields
  const orderedPrograms = (acf.ac_programs_selected ?? [])
    .map((id) => programPosts.find((p) => p.id === id))
    .filter((p): p is WpProgramCategorySlimPost => p !== undefined);

  return {
    hero: {
      title: "Academics", // static per design; page title comes from WP post title if preferred
      subline: acf.ac_hero_subline || undefined,
      image: acf.ac_hero_image,
      breadcrumb: [
        { label: "Home", href: "/" },
        { label: "Academics", href: "/academics" },
      ],
    },

    subNav: toArray(acf.ac_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),

    dean: {
      title: acf.ac_dean_title,
      paragraphs: toArray(acf.ac_dean_paragraphs).map((r) =>
        r.paragraph.replace(/\r\n/g, "\n").replace(/\r/g, "\n"),
      ),
      email: acf.ac_dean_email,
      image: acf.ac_dean_image,
    },

    schools: {
      title: acf.ac_schools_title,
      description: acf.ac_schools_description,
      cards: toArray(acf.ac_schools_cards).map((card, i) => ({
        id: String(i),
        title: card.title,
        image: card.image,
        href: card.href?.url ?? "#",
      })),
    },

    // ✅ Live from pragrams-of-study CPT via relationship field
    programs: {
      title: acf.ac_programs_title,
      description: acf.ac_programs_description,
      cards: orderedPrograms.map((post) => ({
        id: String(post.id),
        title: decodeHtml(post.title.rendered),
        excerpt: post.acf?.pc_hero_subline
          ? post.acf.pc_hero_subline.slice(0, 140)
          : "",
        image:
          post.acf?.pc_hero_image ??
          `https://picsum.photos/seed/program-${post.id}/732/488`,
        href: `/academics/program/${post.slug}`,
      })),
    },

    // ✅ Live from research-area CPT via relationship field
    areas: {
      title: acf.ac_areas_title,
      description: acf.ac_areas_description,
      cards: toArray(acf.ac_areas_cards).map((card, i) => ({
        id: String(i),
        title: card.title,
        image: card.image,
        href: card.href?.url ?? "#",
      })),
    },

    support: {
      title: acf.ac_support_title,
      cards: toArray(acf.ac_support_cards).map((card, i) => ({
        id: String(i),
        title: card.title,
        excerpt: card.excerpt,
        image: card.image,
        href:
          typeof card.href === "object" && card.href?.url
            ? card.href.url
            : "#",
      })),
    },

    cta: {
      calendar: {
        title: acf.ac_cta_calendar_title || undefined,
        description: acf.ac_cta_calendar_description,
        cta: acf.ac_cta_calendar_label,
        href: acf.ac_cta_calendar_href?.url ?? "#",
      },
      catalogue: {
        title: acf.ac_cta_catalogue_title || undefined,
        description: acf.ac_cta_catalogue_description,
        cta: acf.ac_cta_catalogue_label,
        href: acf.ac_cta_catalogue_href?.url ?? "#",
      },
    },
  };
}

export async function getDeanPage(): Promise<DeanPageData> {
  const acf = await getPageAcf<WpDeanAcademicsAcf>("dean-academics");

  if (!acf) {
    console.warn(
      "[wordpress.ts] Dean (Academics) page ACF not found — falling back to mock data.",
    );
    return deanPageData;
  }

  return {
    hero: {
      title: acf.da_hero_title,
      subline: acf.da_hero_subline || undefined,
      image: acf.da_hero_image,
      breadcrumb: toArray(acf.da_breadcrumb).map((b) => ({
        label: b.label,
        href: b.href,
      })),
    },

    subNav: toArray(acf.da_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),

    // DeansDeskContent combines the message + functions + email in one object,
    // matching the existing DeanPageData type exactly.
    desk: {
      title: acf.da_desk_title,
      paragraphs: toArray(acf.da_desk_paragraphs).map((r) =>
        normaliseLB(r.paragraph),
      ),
      image: acf.da_desk_image,
      functionsTitle: acf.da_functions_title,
      functionsParagraphs: toArray(acf.da_functions_paragraphs).map((r) =>
        normaliseLB(r.paragraph),
      ),
      email: acf.da_desk_email,
    },

    officials: {
      title: acf.da_officials_title,
      people: toArray(acf.da_officials).map((o, i) => ({
        id: String(i),
        name: o.name,
        position: o.position,
        email: o.email || "",
        phone: o.phone || "",
        image:
          o.image || `https://picsum.photos/seed/official-${i}/580/680`,
      })),
    },

    cta: {
      calendar: {
        title: acf.da_cta_calendar_title || undefined,
        description: normaliseLB(acf.da_cta_calendar_description),
        cta: acf.da_cta_calendar_label,
        href: acf.da_cta_calendar_href?.url ?? "#",
      },
      areas: {
        title: acf.da_cta_areas_title || undefined,
        description: normaliseLB(acf.da_cta_areas_description),
        cta: acf.da_cta_areas_label,
        href: acf.da_cta_areas_href?.url ?? "#",
      },
    },
  };
}

/** School of Technology */
export async function getSchoolPage(): Promise<SchoolPageData> {
  const acf = await getPageAcf<WpSchoolPageAcf>("school-of-technology");

  if (!acf) {
    console.warn(
      "[wordpress.ts] School of Technology page ACF not found — falling back to mock data.",
    );
    return sotPageData;
  }

  const programIds = (acf.sot_programs_selected ?? []).join(",");
  const researchIds = (acf.sot_research_selected ?? []).join(",");

  // Fetch everything in parallel — relationship-selected courses, relationship-
  // selected research areas, latest news, latest events. No waterfall.
  const [coursePosts, researchPosts, newsPosts, eventPosts] = await Promise.all([
    programIds
      ? wpFetch<WpCoursePost[]>(
          `/wp/v2/course?include=${programIds}&_embed=wp:featuredmedia&acf_format=standard`,
        )
      : Promise.resolve([] as WpCoursePost[]),
    researchIds
      ? wpFetch<WpResearchPost[]>(
          `/wp/v2/research-area?include=${researchIds}&_embed=wp:featuredmedia&acf_format=standard`,
        )
      : Promise.resolve([] as WpResearchPost[]),
    wpFetch<WpNewsPost[]>(
      `/wp/v2/news?_embed=wp:featuredmedia&per_page=5&orderby=date&order=desc`,
    ),
    wpFetch<WpEventPost[]>(
      `/wp/v2/event?_embed=wp:featuredmedia&per_page=3&orderby=date&order=desc`,
    ),
  ]);

  // Preserve editor's chosen order for both relationship fields
  const orderedCourses = (acf.sot_programs_selected ?? [])
    .map((id) => coursePosts.find((p) => p.id === id))
    .filter((p): p is WpCoursePost => p !== undefined);

  const orderedResearch = (acf.sot_research_selected ?? [])
    .map((id) => researchPosts.find((p) => p.id === id))
    .filter((p): p is WpResearchPost => p !== undefined);

  return {
    hero: {
      eyebrow: acf.sot_hero_eyebrow,
      eyebrowSub: acf.sot_hero_eyebrow_sub || undefined,
      rankLabel: acf.sot_hero_rank_label,
      rankValue: acf.sot_hero_rank_value,
      subline: acf.sot_hero_subline,
      images: (acf.sot_hero_images ?? []).map((row) => ({
        url: row.image,
        alt: row.alt || "",
      })),
    },

    subNav: toArray(acf.sot_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),

    intro: {
      paragraphs: toArray(acf.sot_intro_paragraphs).map((r) =>
        r.paragraph.replace(/\r\n/g, "\n").replace(/\r/g, "\n"),
      ),
      vision: { title: acf.sot_vision_title, body: acf.sot_vision_body },
      mission: { title: acf.sot_mission_title, body: acf.sot_mission_body },
    },

    programs: {
      title: acf.sot_programs_title,
      description: acf.sot_programs_description,
      cards: orderedCourses.map((post) => ({
        id: String(post.id),
        title: decodeHtml(post.title.rendered),
        excerpt: excerptFromHtml(post.content.rendered, 25),
        image:
          post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
          `https://picsum.photos/seed/course-${post.id}/732/488`,
        href: `/academics/program/${post.slug}`,
      })),
    },

    research: {
      title: acf.sot_research_title,
      description: acf.sot_research_description,
      cards: orderedResearch.map((post) => ({
        id: String(post.id),
        title: decodeHtml(post.title.rendered),
        image:
          post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
          `https://picsum.photos/seed/research-${post.id}/836/460`,
        href: `/research/areas/${post.slug}`,
      })),
    },

    people: {
      title: acf.sot_people_title,
      categories: toArray(acf.sot_people_categories).map((cat, i) => ({
        id: String(i),
        label: cat.label,
        image: cat.image,
        href: cat.href?.url ?? "#",
      })),
    },

    // News — reuses HomeData["news"] shape (featured + list), same mapper
    // pattern as the homepage: first post is featured, next 4 are the list.
    news: mapNews(
      { news_title: acf.sot_news_title, news_description: acf.sot_news_description } as WpHomeAcf,
      newsPosts,
    ),

    events: {
      title: acf.sot_events_title,
      items: eventPosts.map((post) => ({
        id: String(post.id),
        title: decodeHtml(post.title.rendered),
        date: formatIsoDate(post.date),
        image:
          post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
          `https://picsum.photos/seed/event-${post.id}/836/460`,
        href: `/events/${post.slug}`,
      })),
      allHref: "/life/events",
    },

    cta: {
      calendar: {
        title: acf.sot_cta_calendar_title || undefined,
        description: acf.sot_cta_calendar_description,
        cta: acf.sot_cta_calendar_label,
        href: acf.sot_cta_calendar_href?.url ?? "#",
      },
      areas: {
        title: acf.sot_cta_areas_title || undefined,
        description: acf.sot_cta_areas_description,
        cta: acf.sot_cta_areas_label,
        href: acf.sot_cta_areas_href?.url ?? "#",
      },
    },
  };
}

/** Academic Areas sub-page (/academics/areas) */
export async function getAcademicAreasPage(): Promise<AcademicAreasPageData> {
  const acf = await getPageAcf<WpAcademicAreasPageAcf>("academic-areas");

  if (!acf) {
    console.warn(
      "[wordpress.ts] Academic Areas page ACF not found — falling back to mock data.",
    );
    return academicAreasPageData;
  }

  return {
    hero: {
      title: acf.aa_hero_title,
      subline: acf.aa_hero_subline || undefined,
      image: acf.aa_hero_image,
      breadcrumb: toArray(acf.aa_breadcrumb).map((b) => ({
        label: b.label,
        href: b.href,
      })),
    },

    subNavLabel: acf.aa_hero_title,

    // NOTE: AcademicAreasPageData.subNav is SubNavLink[] — no separate label
    // field on this type (unlike pages using subNavLabel). Label on the
    // frontend comes from the post title via the page component.
    subNav: toArray(acf.aa_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),

    intro: toArray(acf.aa_intro_paragraphs).map((r) =>
      r.paragraph.replace(/\r\n/g, "\n").replace(/\r/g, "\n"),
    ),

    areasOfStudy: {
      title: acf.aa_areas_title,
      description: acf.aa_areas_description,
      cards: toArray(acf.aa_areas_cards).map((card, i) => ({
        id: String(i),
        title: card.title,
        image: card.image,
        href: card.href?.url ?? "#",
      })),
    },

    cta: {
      calendar: {
        title: acf.aa_cta_calendar_title || undefined,
        description: acf.aa_cta_calendar_description,
        cta: acf.aa_cta_calendar_label,
        href: acf.aa_cta_calendar_href?.url ?? "#",
      },
      catalogue: {
        title: acf.aa_cta_catalogue_title || undefined,
        description: acf.aa_cta_catalogue_description,
        cta: acf.aa_cta_catalogue_label,
        href: acf.aa_cta_catalogue_href?.url ?? "#",
      },
    },
  };
}

/** Undergraduate Programs sub-page (/academics/ug-programs) */
// export async function getUgProgramsPage(): Promise<UgProgramsPageData> {
//   return ugProgramsPageData;
// }

export async function getProgramsListingPage(
  slug: string,
): Promise<ProgramsListingPageData> {
  const posts = await wpFetch<WpProgramCategoryPost[]>(
    `/wp/v2/pragrams-of-study?slug=${slug}&acf_format=standard&_fields=id,slug,title,acf`,
  );
 
  if (!posts || posts.length === 0) {
    console.warn(
      `[wordpress.ts] Program category '${slug}' not found — falling back to mock data.`,
    );
    return ugProgramsPageData;
  }
 
  const post = posts[0];
  const acf = post.acf;
  const title = decodeHtml(post.title.rendered);
 
  const facultyIds = (acf.pc_faculty_selected ?? []).join(",");
  const courseIds = (acf.pc_courses_selected ?? []).join(",");
 
  // Fetch faculty + courses in parallel — no waterfall
  const [facultyPosts, coursePosts] = await Promise.all([
    facultyIds
      ? wpFetch<WpFacultyPost[]>(
          `/wp/v2/faculty?include=${facultyIds}&_embed=wp:featuredmedia&acf_format=standard`,
        )
      : Promise.resolve([] as WpFacultyPost[]),
    courseIds
      ? wpFetch<WpCoursePost[]>(
          `/wp/v2/course?include=${courseIds}&_embed=wp:featuredmedia&acf_format=standard`,
        )
      : Promise.resolve([] as WpCoursePost[]),
  ]);
 
  // Preserve editor's chosen order for both relationship fields
  const orderedFaculty = (acf.pc_faculty_selected ?? [])
    .map((id) => facultyPosts.find((p) => p.id === id))
    .filter((p): p is WpFacultyPost => p !== undefined);
 
  const orderedCourses = (acf.pc_courses_selected ?? [])
    .map((id) => coursePosts.find((p) => p.id === id))
    .filter((p): p is WpCoursePost => p !== undefined);
 
  return {
    hero: {
      title,
      subline: acf.pc_hero_subline || undefined,
      image: acf.pc_hero_image,
      breadcrumb: toArray(acf.pc_breadcrumb).map((b) => ({
        label: b.label,
        href: b.href,
      })),
    },
 
    subNavLabel: acf.pc_subnav_label || title,
 
    subNav: toArray(acf.pc_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),
 
    intro: toArray(acf.pc_intro_paragraphs).map((r) =>
      r.paragraph.replace(/\r\n/g, "\n").replace(/\r/g, "\n"),
    ),
 
    // ✅ Now live from the course CPT via relationship field
    courses: {
      title: acf.pc_courses_title,
      description: acf.pc_courses_description,
      cards: orderedCourses.map((post) => ({
        id: String(post.id),
        title: decodeHtml(post.title.rendered),
        excerpt: excerptFromHtml(post.content.rendered, 25),
        image:
          post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
          `https://picsum.photos/seed/course-${post.id}/732/488`,
        href: `/academics/course/${post.slug}`,
      })),
    },
 
    admissionCta: {
      eyebrow: acf.pc_admission_eyebrow,
      title: acf.pc_admission_title,
      description: acf.pc_admission_description,
    },
 
    faculty: {
      title: acf.pc_faculty_title,
      description: acf.pc_faculty_description,
      members: orderedFaculty.map((p) => ({
        id: String(p.id),
        name: decodeHtml(p.title.rendered),
        position: p.acf?.position ?? "",
        image:
          p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
          `https://picsum.photos/seed/faculty-${p.id}/580/700`,
        href: `/faculty/${p.slug}`,
      })),
    },
 
    support: {
      title: acf.pc_support_title,
      cards: toArray(acf.pc_support_cards).map((card, i) => ({
        id: String(i),
        title: card.title,
        excerpt: card.excerpt,
        image: card.image,
        href:
          typeof card.href === "object" && card.href?.url
            ? card.href.url
            : "#",
      })),
    },
 
    cta: {
      calendar: {
        title: acf.pc_cta_calendar_title || undefined,
        description: acf.pc_cta_calendar_description,
        cta: acf.pc_cta_calendar_label,
        href: acf.pc_cta_calendar_href?.url ?? "#",
      },
      catalogue: {
        title: acf.pc_cta_catalogue_title || undefined,
        description: acf.pc_cta_catalogue_description,
        cta: acf.pc_cta_catalogue_label,
        href: acf.pc_cta_catalogue_href?.url ?? "#",
      },
    },
  };
}

/** B.Tech (ICT) program detail page (/academics/btech-ict) */
export async function getProgramPage(slug: string): Promise<ProgramPageData> {
  const posts = await wpFetch<WpCourseDetailPost[]>(
    `/wp/v2/course?slug=${slug}&acf_format=standard&_fields=id,slug,title,acf`,
  );

  if (!posts || posts.length === 0) {
    console.warn(
      `[wordpress.ts] Course '${slug}' not found — falling back to mock data.`,
    );
    return btechIctPageData;
  }

  const post = posts[0];
  const acf = post.acf;
  const title = decodeHtml(post.title.rendered);

  return {
    hero: {
      title,
      subline: acf.pg_hero_subline || undefined,
      image: acf.pg_hero_image,
      breadcrumb: [
        { label: "Home", href: "/" },
        { label: "Academics", href: "/academics" },
        { label: title, href: `/academics/course/${slug}` },
      ],
    },

    subNavLabel: acf.pg_subnav_label || title,

    subNav: toArray(acf.pg_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),

    applyBanner: {
      text: acf.pg_banner_text,
      cta: acf.pg_banner_cta,
      href: pgLinkUrl(acf.pg_banner_href),
    },

    intro: toArray(acf.pg_intro_paragraphs).map((r) =>
      r.paragraph.replace(/\r\n/g, "\n").replace(/\r/g, "\n"),
    ),

    honours: buildProgramBlock({
      title: acf.pg_honours_title,
      paragraphs: acf.pg_honours_paragraphs,
      bullets: acf.pg_honours_bullets,
      image: acf.pg_honours_image,
      gallery: acf.pg_honours_gallery,
      buttonLabel: acf.pg_honours_button_label,
      buttonHref: acf.pg_honours_button_href,
    }),

    honoursMinor: buildProgramBlock({
      title: acf.pg_hm_title,
      paragraphs: acf.pg_hm_paragraphs,
      bullets: acf.pg_hm_bullets,
      image: acf.pg_hm_image,
    }),

    outcomes: {
      programOutcomes: {
        title: acf.pg_po_title,
        viewAllHref: pgLinkUrl(acf.pg_po_view_all_href),
        items: toArray(acf.pg_po_items).map((item) => ({
          code: item.code,
          lead: item.lead || undefined,
          body: item.body,
        })),
      },
      specificOutcomes: {
        title: acf.pg_pso_title,
        items: toArray(acf.pg_pso_items).map((item) => ({
          code: item.code,
          lead: item.lead || undefined,
          body: item.body,
        })),
      },
    },

    coreCourses: buildProgramBlock({
      title: acf.pg_core_title,
      paragraphs: acf.pg_core_paragraphs,
      bullets: acf.pg_core_bullets,
      image: acf.pg_core_image,
    }),

    electiveCourses: buildProgramBlock({
      title: acf.pg_elective_title,
      paragraphs: acf.pg_elective_paragraphs,
      bullets: acf.pg_elective_bullets,
    }),

    semesters: {
      title: acf.pg_semesters_title,
      description: acf.pg_semesters_description,
      items: toArray(acf.pg_semesters_items).map((sem, i) => ({
        id: `sem-${i + 1}`,
        title: sem.title,
        description: sem.description,
        courses: toArray(sem.courses).map((c) => ({
          name: c.name,
          ltpc: c.ltpc,
        })),
      })),
    },

    electives: {
      title: acf.pg_electives_table_title,
      description: acf.pg_electives_table_description,
      items: toArray(acf.pg_electives_table_items)
        .map((e) => e.name)
        .filter(Boolean),
    },

    coCurricular: buildProgramBlock({
      title: acf.pg_cc_title,
      paragraphs: acf.pg_cc_paragraphs,
      gallery: acf.pg_cc_gallery,
    }),

    admissionCta: {
      eyebrow: acf.pg_admission_eyebrow,
      title: acf.pg_admission_title,
      description: acf.pg_admission_description,
    },

    faqs: {
      title: acf.pg_faqs_title,
      items: toArray(acf.pg_faqs_items).map((f, i) => ({
        id: `faq-${i + 1}`,
        question: f.question,
        answer: f.answer,
      })),
    },

    contact: {
      phone: acf.pg_contact_phone,
      email: acf.pg_contact_email,
    },

    cta: {
      calendar: {
        title: acf.pg_cta_calendar_title || undefined,
        description: acf.pg_cta_calendar_description,
        cta: acf.pg_cta_calendar_label,
        href: acf.pg_cta_calendar_href?.url ?? "#",
      },
      areas: {
        title: acf.pg_cta_areas_title || undefined,
        description: acf.pg_cta_areas_description,
        cta: acf.pg_cta_areas_label,
        href: acf.pg_cta_areas_href?.url ?? "#",
      },
    },
  };
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
  try {
  // revalidate=0 → bypass ISR cache so we never serve stale fallback data
  // while production WordPress is being populated.
  // Change to a positive number (e.g. 60) once all research area posts exist on the CMS.
  const posts = await wpFetch<
    Array<{ id: number; slug: string; title: { rendered: string }; acf: WpResearchAreaDetailAcf }>
  >(
    `/wp/v2/research-area?slug=${slug}&acf_format=standard&_fields=id,slug,title,acf`,
    0,
  );

  if (!posts || posts.length === 0) {
    console.warn(
      `[wordpress.ts] Research area '${slug}' not found in WordPress` +
      ` (${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/research-area?slug=${slug})` +
      ` — falling back to mock data.`,
    );
    return researchAreaDetailPageData;
  }

  const post = posts[0];
  const acf = post.acf;
  const title = decodeHtml(post.title.rendered);

  // Fetch faculty + events in parallel
  const facultyIds = (acf.ra_faculty_selected ?? []).join(",");

  // Each secondary fetch gets its own .catch so a missing CPT (faculty/event
  // not yet set up on production WP) doesn't kill the whole page.
  const [facultyPosts, eventPosts] = await Promise.all([
    facultyIds
      ? wpFetch<WpFacultyPost[]>(
          `/wp/v2/faculty?include=${facultyIds}&_embed=wp:featuredmedia&acf_format=standard`,
          0,
        ).catch((err) => {
          console.warn("[wordpress.ts] faculty fetch failed for research area — rendering without faculty:", err);
          return [] as WpFacultyPost[];
        })
      : Promise.resolve([] as WpFacultyPost[]),
    wpFetch<WpEventPost[]>(
      `/wp/v2/event?_embed=wp:featuredmedia&per_page=3&orderby=date&order=desc`,
      0,
    ).catch((err) => {
      console.warn("[wordpress.ts] event fetch failed for research area — rendering without events:", err);
      return [] as WpEventPost[];
    }),
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
  } catch (err) {
    console.error(
      `[wordpress.ts] getResearchAreaDetailPage('${slug}') failed — falling back to mock data.`,
      err,
    );
    return researchAreaDetailPageData;
  }
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

export async function getAdmissionPage(): Promise<AdmissionPageData> {
  const [filterRes, acf] = await Promise.all([
    wpFetch<WpAdmissionFilterResponse>("/dau/v1/admission-filter"),
    getPageAcf<WpAdmissionPageAcf>("admission"),
  ]);
 
  if (!acf) {
    throw new Error(
      'WordPress Page with slug "admission" not found — create it in wp-admin and attach the "Admission Page Settings" ACF field group.'
    );
  }
 
  return {
    hero: {
      title: acf.hero.title,
      subline: acf.hero.subline,
      image: acf.hero.image,
      breadcrumb: [
        { label: "Home", href: "/" },
        { label: "Admission", href: "/admission" },
      ],
    },
    subNavLabel: acf.sub_nav_label,
    subNav: arr<{ label: string; href: string }>(acf.sub_nav).map((l) => ({
      label: l.label,
      href: l.href,
    })),
    applyBanner: {
      text: acf.apply_banner.text,
      cta: acf.apply_banner.cta,
      href: acf.apply_banner.href,
    },
    filter: {
      streams: filterRes.streams,
      categories: filterRes.categories,
      placeholders: {
        stream: acf.filter_placeholders.stream,
        course: acf.filter_placeholders.course,
        category: acf.filter_placeholders.category,
      },
      emptyPrompt: acf.empty_prompt,
    },
    contact: {
      phone: acf.contact.phone,
      email: acf.contact.email,
    },
    cta: {
      left: acf.cta_left,
      right: acf.cta_right,
    },
  };
}

export async function getAdmissionDataset(
  course: string,
  category?: string
): Promise<AdmissionDataset | null> {
  const params = new URLSearchParams({
    course_slug: course,
    per_page: "1",
    acf_format: "standard",
  });
  if (category) params.set("category_slug", category);

  const posts = await wpFetch<WpAdmissionPost[]>(
    `/wp/v2/admission?${params.toString()}`
  );

  const post = posts[0];
  return post ? mapAdmissionDataset(post) : null;
}

export async function getFinancialSupportPage(): Promise<FinancialSupportPageData> {
  const acf = await getPageAcf<WpFinancialSupportAcf>("financial-support");

  if (!acf) {
    console.warn(
      "[wordpress.ts] Financial Support page ACF not found — falling back to mock data.",
    );
    return financialSupportPageData;
  }

  return {
    hero: {
      title: "Financial Support",
      subline: acf.fs_hero_subline || undefined,
      image: acf.fs_hero_image,
      breadcrumb: toArray(acf.fs_breadcrumb).map((b) => ({
        label: b.label,
        href: b.href,
      })),
    },

    subNavLabel: acf.fs_subnav_label || "Financial Support",

    subNav: toArray(acf.fs_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),

    dauScholarships: {
      title: acf.fs_dau_title,
      paragraphs: toArray(acf.fs_dau_paragraphs).map((r) =>
        r.paragraph.replace(/\r\n/g, "\n").replace(/\r/g, "\n"),
      ),
    },

    otherScholarships: {
      title: acf.fs_other_title,
      description: acf.fs_other_description,
      cards: toArray(acf.fs_other_cards).map((card, i) => ({
        id: String(i),
        title: card.title,
        excerpt: card.excerpt,
        image: card.image,
        href: card.href?.url ?? "#",
      })),
    },

    faqs: {
      title: acf.fs_faqs_title,
      items: toArray(acf.fs_faqs_items).map((f, i) => ({
        id: `faq-${i + 1}`,
        question: f.question,
        answer: f.answer,
      })),
    },

    contact: {
      phone: acf.fs_contact_phone,
      email: acf.fs_contact_email,
    },

    cta: {
      left: {
        title: acf.fs_cta_left_title || undefined,
        description: acf.fs_cta_left_description,
        cta: acf.fs_cta_left_label,
        href: acf.fs_cta_left_href?.url ?? "#",
      },
      right: {
        title: acf.fs_cta_right_title || undefined,
        description: acf.fs_cta_right_description,
        cta: acf.fs_cta_right_label,
        href: acf.fs_cta_right_href?.url ?? "#",
      },
    },
  };
}

/**
 * UG Scholarships reuses the FinancialSupportPageData shape —
 * same template, different content.
 */
export async function getUgScholarshipsPage(): Promise<FinancialSupportPageData> {
  const acf = await getPageAcf<WpUgScholarshipsAcf>("scholarships");
 
  if (!acf) {
    console.warn(
      "[wordpress.ts] UG Scholarships page ACF not found — falling back to mock data.",
    );
    return ugScholarshipsPageData;
  }
 
  const selectedIds = (acf.us_offered_selected ?? []).join(",");
 
  const scholarshipPosts = selectedIds
    ? await wpFetch<WpScholarshipSlimPost[]>(
        `/wp/v2/scholarship?include=${selectedIds}&_embed=wp:featuredmedia&acf_format=standard`,
      )
    : [];
 
  // Preserve editor's chosen order
  const orderedScholarships = (acf.us_offered_selected ?? [])
    .map((id) => scholarshipPosts.find((p) => p.id === id))
    .filter((p): p is WpScholarshipSlimPost => p !== undefined);
 
  return {
    hero: {
      title: "Scholarships",
      subline: acf.us_hero_subline || undefined,
      image: acf.us_hero_image,
      breadcrumb: toArray(acf.us_breadcrumb).map((b) => ({
        label: b.label,
        href: b.href,
      })),
    },
 
    subNavLabel: acf.us_subnav_label || "Undergraduate Admissions",
 
    subNav: toArray(acf.us_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),
 
    dauScholarships: {
      title: acf.us_dau_title,
      paragraphs: toArray(acf.us_dau_paragraphs).map((r) =>
        r.paragraph.replace(/\r\n/g, "\n").replace(/\r/g, "\n"),
      ),
    },
 
    otherScholarships: {
      title: acf.us_offered_title,
      description: acf.us_offered_description,
      cards: orderedScholarships.map((post) => ({
        id: String(post.id),
        title: decodeHtml(post.title.rendered),
        excerpt: post.acf?.sch_hero_subline ?? "",
        // ✅ Featured image, not the ACF hero image field
        image:
          post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
          `https://picsum.photos/seed/scholarship-${post.id}/600/400`,
        href: `/admission/scholarship/${post.slug}`,
      })),
    },
 
    faqs: {
      title: acf.us_faqs_title,
      items: toArray(acf.us_faqs_items).map((f, i) => ({
        id: `faq-${i + 1}`,
        question: f.question,
        answer: f.answer,
      })),
    },
 
    contact: {
      phone: acf.us_contact_phone,
      email: acf.us_contact_email,
    },
 
    cta: {
      left: {
        title: acf.us_cta_left_title || undefined,
        description: acf.us_cta_left_description,
        cta: acf.us_cta_left_label,
        href: acf.us_cta_left_href?.url ?? "#",
      },
      right: {
        title: acf.us_cta_right_title || undefined,
        description: acf.us_cta_right_description,
        cta: acf.us_cta_right_label,
        href: acf.us_cta_right_href?.url ?? "#",
      },
    },
  };
}

// ============================================================================
//  REPLACE the temporary mock getScholarshipDetailPage() in lib/wordpress.ts
//  with this. You can also delete the mockScholarshipData constant now.
//  Add the interfaces near the other Wp* interfaces at the top of the file.
// ============================================================================

// ─── Raw WordPress shapes ────────────────────────────────────────────────────

interface WpSchLinkField {
  title: string;
  url: string;
  target: string;
}

interface WpSchSubNavLink {
  label: string;
  href: string;
}

interface WpSchParagraph {
  paragraph: string;
}

interface WpSchEligibilityLine {
  line: string;
}

interface WpSchFellowshipRow {
  count: string;
  type: string;
  eligibility_lines: WpSchEligibilityLine[] | false;
  band: string;
}

interface WpSchConditionItem {
  item: string;
}

interface WpScholarshipAcf {
  // Hero
  sch_hero_subline: string;
  sch_hero_image: string;
  // Sub Nav
  sch_subnav_label: string;
  sch_subnav_links: WpSchSubNavLink[] | false;
  // Intro
  sch_intro_title: string;
  sch_intro_subtitle: string;
  sch_intro_paragraphs: WpSchParagraph[] | false;
  // Fellowships table
  sch_fellowships_title: string;
  sch_table_header_1: string;
  sch_table_header_2: string;
  sch_table_header_3: string;
  sch_table_header_4: string;
  sch_fellowship_rows: WpSchFellowshipRow[] | false;
  sch_fellowship_notes: WpSchParagraph[] | false;
  // Other Conditions
  sch_oc_title: string;
  sch_oc_items: WpSchConditionItem[] | false;
  // CTA
  sch_cta_left_title: string;
  sch_cta_left_description: string;
  sch_cta_left_label: string;
  sch_cta_left_href: WpSchLinkField;
  sch_cta_right_title: string;
  sch_cta_right_description: string;
  sch_cta_right_label: string;
  sch_cta_right_href: WpSchLinkField;
}

interface WpScholarshipPost {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: WpScholarshipAcf;
}

// ─── Accessor ─────────────────────────────────────────────────────────────────

// ============================================================================
//  ADD BACK to lib/wordpress.ts — place this ABOVE getScholarshipDetailPage()
//  This is the fallback used when a scholarship slug isn't found in WP.
// ============================================================================

const mockScholarshipData: ScholarshipDetailPageData = {
  hero: {
    title: "UG Scholarships",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    image: "https://picsum.photos/seed/ug-scholarships-hero/1200/500",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Admission", href: "/admission" },
      { label: "UG Scholarships", href: "/admission/ug-scholarships" },
    ],
  },

  subNavLabel: "Undergraduate Admissions",
  subNav: [
    { label: "DAU Scholarships", href: "#dau-scholarships" },
    { label: "Other Scholarships", href: "#other-scholarships" },
    { label: "FAQs", href: "#faqs" },
    { label: "Related Links", href: "#related" },
  ],

  intro: {
    title: "UG Institute Fellowships at DAU",
    subtitle: "(With effect from 2025-26 Batch)",
    paragraphs: [
      'From the academic year (2025-26), the Institute has added a new scholarship category, "Institute Fellowship" under which students at the time of admissions will be awarded multiple different fellowships namely rank based (JEE AIR and ACPC), only girl students (JEE AIR and ACPC rank) and out station school board toppers. The amount of the scholarship will be equal to 100% of the tuition fee for the duration of the program. All students in this category will continue to receive the scholarship subject to their satisfying the academic performance criteria in all subsequent semesters.',
    ],
  },

  fellowships: {
    title: "Eligibility and details of Fellowships",
    tableHeaders: [
      "No. of Fellowship",
      "Type of Fellowship",
      "Eligibility conditions",
      "Fellowship Band",
    ],
    rows: [
      {
        id: "f1",
        count: "Five (5)",
        type: "Meritorious Fellowship",
        eligibilityLines: [
          "Top 3 (Three) students who achieve JEE AIR between 1 to 5000",
          "Top 2 (Two) students who achieve ACPC Rank between 1 to 25",
        ],
        band: "Full semester tuition fee",
      },
      {
        id: "f2",
        count: "Five (5)",
        type: "Other State Board Toppers Fellowship",
        eligibilityLines: [
          "Top 5 (Five) students from other than Gujarat state and achieve a rank between 1 to 10 as a Board Topper",
        ],
        band: "Full semester tuition fee",
      },
      {
        id: "f3",
        count: "Five (5)",
        type: "Girls Students Fellowship",
        eligibilityLines: [
          "Top 4 (Four) Girls students who achieve JEE AIR between 1 to 10000",
          "Top 1 (One) Girl student who achieves ACPC Rank between 1 to 50",
        ],
        band: "Full semester tuition fee",
      },
    ],
    notes: [
      "The student has to achieve 8.50/10.00 or above every semester. If the SPI falls below 8.50/10.00 in a particular semester, the fellowship would not be offered in the succeeding semester. However, if the SPI in a semester again is 8.50/10.00 or above, then the fellowship would be restored from the succeeding semester.",
      "The students have to submit the certificate from their respective board to claim the Other State Board Toppers fellowship.",
    ],
  },

  otherConditions: {
    title: "Other Conditions",
    items: [
      "The student should have been registered for the semester subsequent to which the scholarship is awarded and should have paid the tuition and other fees in full by the given due date.",
      "The student should PASS in all credit courses and should not have any backlog and/or disciplinary case(s) being initiated or recorded against her/him.",
      "The Scholarship is awarded based on the performance of the student in a semester and the student has to meet the eligibility criteria in each semester to be eligible for the award of the Scholarship.",
      "If a student withdraws from the program before completion of studies or her/his admission is terminated by the Institute or she/he is imposed any punishment/penalty due to indiscipline, the Institute has the right to recover the total scholarship amount paid to her/him.",
      "The awardee should not be the recipient of any other financial assistant / fellowship / scholarship from the Govt. of India / State Government / any other private agency.",
      "The selected student for the award has to submit an undertaking stating that she/he will be bound by the regulations of the Scholarship Scheme.",
      "If the student submits false document(s)/information, he/she will be liable for disciplinary action.",
    ],
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

export async function getScholarshipDetailPage(
  slug: string,
): Promise<ScholarshipDetailPageData> {
  const posts = await wpFetch<WpScholarshipPost[]>(
    `/wp/v2/scholarship?slug=${slug}&acf_format=standard&_fields=id,slug,title,acf`,
  );

  if (!posts || posts.length === 0) {
    console.warn(
      `[wordpress.ts] Scholarship '${slug}' not found — falling back to mock data.`,
    );
    return mockScholarshipData; // keep this constant, or swap to a real fallback
  }

  const post = posts[0];
  const acf = post.acf;
  const title = decodeHtml(post.title.rendered);

  return {
    hero: {
      title,
      subline: acf.sch_hero_subline || undefined,
      image: acf.sch_hero_image,
      breadcrumb: [
        { label: "Home", href: "/" },
        { label: "Admission", href: "/admission" },
        { label: title, href: `/admission/scholarship/${slug}` },
      ],
    },

    subNavLabel: acf.sch_subnav_label || "Undergraduate Admissions",

    subNav: toArray(acf.sch_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),

    intro: {
      title: acf.sch_intro_title,
      subtitle: acf.sch_intro_subtitle || undefined,
      paragraphs: toArray(acf.sch_intro_paragraphs).map((r) =>
        r.paragraph.replace(/\r\n/g, "\n").replace(/\r/g, "\n"),
      ),
    },

    fellowships: {
      title: acf.sch_fellowships_title,
      tableHeaders: [
        acf.sch_table_header_1,
        acf.sch_table_header_2,
        acf.sch_table_header_3,
        acf.sch_table_header_4,
      ],
      rows: toArray(acf.sch_fellowship_rows).map((row, i) => ({
        id: `row-${i + 1}`,
        count: row.count,
        type: row.type,
        eligibilityLines: toArray(row.eligibility_lines).map((l) => l.line),
        band: row.band,
      })),
      notes: toArray(acf.sch_fellowship_notes).map((r) =>
        r.paragraph.replace(/\r\n/g, "\n").replace(/\r/g, "\n"),
      ),
    },

    otherConditions: {
      title: acf.sch_oc_title,
      items: toArray(acf.sch_oc_items).map((r) => r.item),
    },

    cta: {
      left: {
        title: acf.sch_cta_left_title || undefined,
        description: acf.sch_cta_left_description,
        cta: acf.sch_cta_left_label,
        href: acf.sch_cta_left_href?.url ?? "#",
      },
      right: {
        title: acf.sch_cta_right_title || undefined,
        description: acf.sch_cta_right_description,
        cta: acf.sch_cta_right_label,
        href: acf.sch_cta_right_href?.url ?? "#",
      },
    },
  };
}