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
  FacultyTabData,
  FacultyCardData,
  TitledSubBlock,
  TeachingFellowCardData,
  TeachingFellowsPageData,
  TeachingFellowsTabData,
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

interface WpDfLinkField {
  title: string;
  url: string;
  target: string;
}

interface WpDfBreadcrumb {
  label: string;
  href: string;
}

interface WpDfSubNavLink {
  label: string;
  href: string;
}

interface WpDfParagraph {
  paragraph: string; // HTML string (WYSIWYG row — may contain multiple <p>)
}

interface WpDeanFacultyAcf {
  // Hero
  df_hero_title: string;
  df_hero_subline: string;
  df_hero_image: string;
  df_breadcrumb: WpDfBreadcrumb[] | false;
  // Sub Nav
  df_subnav_label: string;
  df_subnav_links: WpDfSubNavLink[] | false;
  // Dean's Desk
  df_desk_title: string;
  df_desk_paragraphs: WpDfParagraph[] | false;
  df_desk_name: string;
  df_desk_role: string;
  df_desk_image: string;
  df_desk_email: string;
  // CTA
  df_cta_left_title: string;
  df_cta_left_description: string;
  df_cta_left_label: string;
  df_cta_left_href: WpDfLinkField;
  df_cta_right_title: string;
  df_cta_right_description: string;
  df_cta_right_label: string;
  df_cta_right_href: WpDfLinkField;
}

interface WpFacultyPostWithType extends WpFacultyPost {
  faculty_type_slug: string | null;
}

/** One `faculty-type` taxonomy term, with its ACF term meta. */
interface WpFacultyTypeTerm {
  id: number;
  slug: string;
  name: string;
  /** Native WP taxonomy field — reused as the tab's intro paragraph so no
   *  extra ACF field is needed. Fill in per-term under Faculty → Faculty
   *  Types → (term) → Description. */
  description: string;
  acf?: { order?: number };
}

interface WpFtLinkField {
  title: string;
  url: string;
  target: string;
}

interface WpFtBreadcrumb {
  label: string;
  href: string;
}

interface WpFtSubNavLink {
  label: string;
  href: string;
}

interface WpFacultyPageAcf {
  // Hero
  ft_hero_title: string;
  ft_hero_subline: string;
  ft_hero_image: string;
  ft_breadcrumb: WpFtBreadcrumb[] | false;
  // Sub Nav
  ft_subnav_label: string;
  ft_subnav_links: WpFtSubNavLink[] | false;
  // Apply banner
  ft_apply_banner_text: string;
  ft_apply_banner_cta: string;
  ft_apply_banner_href: WpFtLinkField;
  // CTA
  ft_cta_left_title: string;
  ft_cta_left_description: string;
  ft_cta_left_label: string;
  ft_cta_left_href: WpFtLinkField;
  ft_cta_right_title: string;
  ft_cta_right_description: string;
  ft_cta_right_label: string;
  ft_cta_right_href: WpFtLinkField;
}

interface WpFrLinkField {
  title: string;
  url: string;
  target: string;
}

interface WpFrBreadcrumb {
  label: string;
  href: string;
}

interface WpFrSubNavLink {
  label: string;
  href: string;
}

interface WpFrParagraphRow {
  paragraph: string;
}

interface WpFrBulletRow {
  bullet: string;
}

interface WpFrOpeningCard {
  title: string;
  image: string;
  href: string;
}

interface WpFrEligibilityTab {
  label: string;
  paragraphs?: WpFrParagraphRow[] | false;
  bullets?: WpFrBulletRow[] | false;
}

interface WpFrProseBlock {
  heading?: string;
  paragraphs?: WpFrParagraphRow[] | false;
  bullets_lead?: string;
  bullets?: WpFrBulletRow[] | false;
}

/** ACF native Gallery field, return_format: "array" */
interface WpFrGalleryImage {
  url: string;
}

interface WpFacultyRecruitmentAcf {
  // Hero
  fr_hero_title: string;
  fr_hero_subline: string;
  fr_hero_image: string;
  fr_breadcrumb: WpFrBreadcrumb[] | false;
  // Sub Nav
  fr_subnav_label: string;
  fr_subnav_links: WpFrSubNavLink[] | false;
  // Apply banner
  fr_apply_banner_text: string;
  fr_apply_banner_cta: string;
  fr_apply_banner_href: WpFrLinkField;
  // Intro
  fr_intro_paragraphs: WpFrParagraphRow[] | false;
  // Openings
  fr_openings_title: string;
  fr_openings_description: string;
  fr_openings_cards: WpFrOpeningCard[] | false;
  // Eligibility
  fr_eligibility_title: string;
  fr_eligibility_tabs: WpFrEligibilityTab[] | false;
  // Prospective
  fr_prospective_title: string;
  fr_prospective_intro: string;
  fr_prospective_blocks: WpFrProseBlock[] | false;
  // Gallery
  fr_gallery_images: WpFrGalleryImage[] | false;
  // Compensation
  fr_compensation_title: string;
  fr_compensation_intro: string;
  fr_compensation_blocks: WpFrProseBlock[] | false;
  // CTA
  fr_cta_left_title: string;
  fr_cta_left_description: string;
  fr_cta_left_label: string;
  fr_cta_left_href: WpFrLinkField;
  fr_cta_right_title: string;
  fr_cta_right_description: string;
  fr_cta_right_label: string;
  fr_cta_right_href: WpFrLinkField;
}

interface WpFhLinkField {
  title: string;
  url: string;
  target: string;
}

interface WpFhBreadcrumb {
  label: string;
  href: string;
}

interface WpFhSubNavLink {
  label: string;
  href: string;
}

interface WpFhParagraphRow {
  paragraph: string;
}

/** ACF native File field, return_format: "array" */
interface WpFhFileField {
  url: string;
  filename: string;
  mime_type: string;
}

interface WpFacultyHandbookAcf {
  // Hero
  fh_hero_title: string;
  fh_hero_subline: string;
  fh_hero_image: string;
  fh_breadcrumb: WpFhBreadcrumb[] | false;
  // Sub Nav
  fh_subnav_label: string;
  fh_subnav_links: WpFhSubNavLink[] | false;
  // Apply banner
  fh_apply_banner_text: string;
  fh_apply_banner_cta: string;
  fh_apply_banner_href: WpFhLinkField;
  // Handbook content
  fh_content_paragraphs: WpFhParagraphRow[] | false;
  fh_download_label: string;
  fh_download_file: WpFhFileField | false;
  fh_download_new_tab: boolean;
  // CTA
  fh_cta_left_title: string;
  fh_cta_left_description: string;
  fh_cta_left_label: string;
  fh_cta_left_href: WpFhLinkField;
  fh_cta_right_title: string;
  fh_cta_right_description: string;
  fh_cta_right_label: string;
  fh_cta_right_href: WpFhLinkField;
}

interface WpFdBreadcrumb {
  label: string;
  href: string;
}

interface WpFdSubNavLink {
  label: string;
  href: string;
}

interface WpFdParagraphRow {
  paragraph: string;
}

interface WpFdBulletRow {
  bullet: string;
}

interface WpFdBulletGroup {
  lead?: string;
  items?: { item: string }[] | false;
}

interface WpFdButton {
  label: string;
  href: WpFdLinkField;
}

interface WpFdLinkField {
  title: string;
  url: string;
  target: string;
}

interface WpFdEnhancementCard {
  title: string;
  image: string;
  href: string;
}

interface WpFdSlide {
  image: string;
  caption: string;
}

interface WpFdProseBlock {
  heading?: string;
  paragraphs?: WpFdParagraphRow[] | false;
  bullets_lead?: string;
  bullets?: WpFdBulletRow[] | false;
}

interface WpFdEffectivenessCard {
  label: string;
  image: string;
}

interface WpFdPolicyCard {
  title: string;
  description: string;
  cta_label: string;
  cta_href: string;
}

interface WpFdHighlightItem {
  image: string;
  date: string; // "Y-m-d"
  excerpt: string;
  href: string;
}

interface WpFacultyDevelopmentAcf {
  // Hero
  fd_hero_title: string;
  fd_hero_subline: string;
  fd_hero_image: string;
  fd_breadcrumb: WpFdBreadcrumb[] | false;
  // Sub Nav
  fd_subnav_label: string;
  fd_subnav_links: WpFdSubNavLink[] | false;
  // Intro
  fd_intro_paragraphs: WpFdParagraphRow[] | false;
  // FDPs
  fd_fdps_title: string;
  fd_fdps_intro_paragraphs: WpFdParagraphRow[] | false;
  fd_fdps_bullet_groups: WpFdBulletGroup[] | false;
  fd_fdps_outro_paragraphs: WpFdParagraphRow[] | false;
  fd_fdps_button?: WpFdButton;
  // Enhancement
  fd_enhancement_title: string;
  fd_enhancement_description: string;
  fd_enhancement_cards: WpFdEnhancementCard[] | false;
  // Industry
  fd_industry_title: string;
  fd_industry_intro_paragraphs: WpFdParagraphRow[] | false;
  fd_industry_bullets: WpFdBulletRow[] | false;
  fd_industry_outro_paragraphs: WpFdParagraphRow[] | false;
  fd_industry_slides: WpFdSlide[] | false;
  // Evaluation
  fd_evaluation_title: string;
  fd_evaluation_intro: string;
  fd_evaluation_blocks: WpFdProseBlock[] | false;
  // Teaching Effectiveness
  fd_te_title: string;
  fd_te_intro: string;
  fd_te_cards: WpFdEffectivenessCard[] | false;
  // Continuous Improvement
  fd_ci_title: string;
  fd_ci_intro: string;
  fd_ci_blocks: WpFdProseBlock[] | false;
  // Policy & Guidelines
  fd_policy_title: string;
  fd_policy_cards: WpFdPolicyCard[] | false;
  // Highlights
  fd_highlights_title: string;
  fd_highlights_items: WpFdHighlightItem[] | false;
  // Diversity
  fd_diversity_title: string;
  fd_diversity_description: string;
}

interface WpRcBreadcrumb {
  label: string;
  href: string;
}

interface WpRcSubNavLink {
  label: string;
  href: string;
}

interface WpRcScheduleCell {
  name: string;
  time: string;
}

interface WpResourceCentreAcf {
  // Hero
  rc_hero_subline: string;
  rc_hero_image: string;
  rc_breadcrumb: WpRcBreadcrumb[] | false;
  // Sub Nav
  rc_subnav_label: string;
  rc_subnav_links: WpRcSubNavLink[] | false;
  // Intro
  rc_intro_html: string;
  // Schedule
  rc_schedule_cells: WpRcScheduleCell[] | false;
  // Outro
  rc_outro_html: string;
}

interface WpCrBreadcrumb {
  label: string;
  href: string;
}

interface WpCrSubNavLink {
  label: string;
  href: string;
}

interface WpCrParagraph {
  paragraph: string;
}

interface WpComputationalResourcesAcf {
  // Hero
  cr_hero_subline: string;
  cr_hero_image: string;
  cr_breadcrumb: WpCrBreadcrumb[] | false;
  // Sub Nav
  cr_subnav_label: string;
  cr_subnav_links: WpCrSubNavLink[] | false;
  // Content
  cr_content_paragraphs: WpCrParagraph[] | false;
  cr_content_image: string;
}

interface WpStpLinkField {
  title: string;
  url: string;
  target: string;
}

interface WpStpBreadcrumb {
  label: string;
  href: string;
}

interface WpStpSubNavLink {
  label: string;
  href: string;
}

interface WpStaffLandingAcf {
  // Hero
  stp_hero_subline: string;
  stp_hero_image: string;
  stp_breadcrumb: WpStpBreadcrumb[] | false;
  // Sub Nav
  stp_subnav_label: string;
  stp_subnav_links: WpStpSubNavLink[] | false;
  // CTA
  stp_cta_left_title: string;
  stp_cta_left_description: string;
  stp_cta_left_label: string;
  stp_cta_left_href: WpStpLinkField;
  stp_cta_right_title: string;
  stp_cta_right_description: string;
  stp_cta_right_label: string;
  stp_cta_right_href: WpStpLinkField;
}

interface WpStaffPost {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: {
    position?: string;
    department?: string;
    phone?: string;
    email?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

interface WpDspLinkField {
  title: string;
  url: string;
  target: string;
}

interface WpDspBreadcrumb {
  label: string;
  href: string;
}

interface WpDspSubNavLink {
  label: string;
  href: string;
}

interface WpDoctoralScholarsLandingAcf {
  dsp_hero_subline: string;
  dsp_hero_image: string;
  dsp_breadcrumb: WpDspBreadcrumb[] | false;
  dsp_subnav_label: string;
  dsp_subnav_links: WpDspSubNavLink[] | false;
  dsp_cta_left_title: string;
  dsp_cta_left_description: string;
  dsp_cta_left_label: string;
  dsp_cta_left_href: WpDspLinkField;
  dsp_cta_right_title: string;
  dsp_cta_right_description: string;
  dsp_cta_right_label: string;
  dsp_cta_right_href: WpDspLinkField;
}

// Base fields — present on every doctoral-scholars post
interface WpDoctoralScholarPost {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: {
    advisor?: string;
    year_of_joining?: string; // "Ymd"
    // Extended fields — only populated on recent-graduates posts
    year_of_graduation?: string; // "Ymd"
    thesis_topic?: string;
    post_phd_employment?: string;
    journals_content?: string;
    awards_content?: string;
    personal_webpage?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text: string }>;
  };
}

interface WpDsLinkField {
  title: string;
  url: string;
  target: string;
}

interface WpDsSubNavLink {
  label: string;
  href: string;
}

interface WpDsParagraph {
  paragraph: string;
}

interface WpDsOfficial {
  name: string;
  position: string;
  email: string;
  phone: string;
  image: string;
}

interface WpDeanStudentAcf {
  // Hero
  ds_hero_title: string;
  ds_hero_subline: string;
  ds_hero_image: string;
  // Sub Nav
  ds_subnav_label: string;
  ds_subnav_links: WpDsSubNavLink[] | false;
  // Dean's Desk
  ds_desk_title: string;
  ds_desk_paragraphs: WpDsParagraph[] | false;
  ds_desk_name: string;
  ds_desk_role: string;
  ds_desk_image: string;
  // Contact
  ds_contact_phone: string;
  ds_contact_email: string;
  // Officials
  ds_officials_title: string;
  ds_officials: WpDsOfficial[] | false;
  // CTA
  ds_cta_left_title: string;
  ds_cta_left_description: string;
  ds_cta_left_label: string;
  ds_cta_left_href: WpDsLinkField;
  ds_cta_right_title: string;
  ds_cta_right_description: string;
  ds_cta_right_label: string;
  ds_cta_right_href: WpDsLinkField;
}

interface WpClLinkField {
  title: string;
  url: string;
  target: string;
}

interface WpClSubNavLink {
  label: string;
  href: string;
}

interface WpClParagraph {
  paragraph: string;
}

interface WpClGalleryImage {
  image: string;
}

interface WpClCarouselSlide {
  image: string;
  caption?: string;
}

interface WpClContact {
  name: string;
  role: string;
}

interface WpClClub {
  name: string;
  image: string;
  description: string;
  contacts: WpClContact[] | false;
  email: string;
  instagram: WpClLinkField | "";
}

interface WpClClubsTab {
  label: string;
  clubs: WpClClub[] | false;
}

interface WpClStudentBodyMember {
  name: string;
  position: string;
  image: string;
  href: WpClLinkField | "";
}

interface WpClStory {
  quote: string;
  name: string;
  year: string;
  image: string;
}

interface WpCampusLifeAcf {
  // Hero
  cl_hero_title: string;
  cl_hero_subline: string;
  cl_hero_image: string;
  // Sub Nav
  cl_subnav_label: string;
  cl_subnav_links: WpClSubNavLink[] | false;
  // Intro
  cl_intro_paragraphs: WpClParagraph[] | false;
  // Student Life
  cl_sl_title: string;
  cl_sl_paragraphs: WpClParagraph[] | false;
  cl_sl_after_paragraphs: WpClParagraph[] | false;
  cl_sl_gallery: WpClGalleryImage[] | false;
  // Virtual Tour
  cl_vt_image: string;
  cl_vt_label: string;
  cl_vt_href: WpClLinkField | "";
  // Residence Life
  cl_rl_title: string;
  cl_rl_paragraphs: WpClParagraph[] | false;
  cl_rl_slides: WpClCarouselSlide[] | false;
  // Sports Facilities
  cl_sf_title: string;
  cl_sf_paragraphs: WpClParagraph[] | false;
  cl_sf_image_1: string;
  cl_sf_image_2: string;
  // Clubs
  cl_clubs_title: string;
  cl_clubs_tabs: WpClClubsTab[] | false;
  // Student Body
  cl_sb_title: string;
  cl_sb_members: WpClStudentBodyMember[] | false;
  // IEEE
  cl_ieee_title: string;
  cl_ieee_paragraphs: WpClParagraph[] | false;
  cl_ieee_slides: WpClGalleryImage[] | false;
  // Success Stories
  cl_stories_title: string;
  cl_stories_description: string;
  cl_stories_items: WpClStory[] | false;
  // CTA
  cl_cta_left_description: string;
  cl_cta_left_label: string;
  cl_cta_left_href: WpClLinkField;
  cl_cta_right_description: string;
  cl_cta_right_label: string;
  cl_cta_right_href: WpClLinkField;
}

interface WpSsLinkField {
  title: string;
  url: string;
  target: string;
}

interface WpSsSubNavLink {
  label: string;
  href: string;
}

interface WpSsParagraph {
  paragraph: string;
}

interface WpSsRaggingItem {
  title: string;
  paragraphs: WpSsParagraph[] | false;
  link_label: string;
  link_href: WpSsLinkField | "";
  image: string | false;
  button_label: string;
  button_href: WpSsLinkField | "";
}

interface WpSsScheduleCell {
  name: string;
  time: string;
}

interface WpStudentSupportAcf {
  // Hero
  ss_hero_title: string;
  ss_hero_subline: string;
  ss_hero_image: string;
  // Sub Nav
  ss_subnav_label: string;
  ss_subnav_links: WpSsSubNavLink[] | false;
  // Intro
  ss_intro_paragraphs: WpSsParagraph[] | false;
  // Wellbeing
  ss_wb_title: string;
  ss_wb_paragraphs: WpSsParagraph[] | false;
  ss_wb_phone: string;
  ss_wb_email: string;
  // Anti-Ragging
  ss_ragging_items: WpSsRaggingItem[] | false;
  // Medical
  ss_medical_title: string;
  ss_medical_intro: WpSsParagraph[] | false;
  ss_medical_cells: WpSsScheduleCell[] | false;
  ss_medical_outro: WpSsParagraph[] | false;
  // CTA
  ss_cta_left_description: string;
  ss_cta_left_label: string;
  ss_cta_left_href: WpSsLinkField;
  ss_cta_right_description: string;
  ss_cta_right_label: string;
  ss_cta_right_href: WpSsLinkField;
}

interface WpFeLinkField {
  title: string;
  url: string;
  target: string;
}

interface WpFeSubNavLink {
  label: string;
  href: string;
}

interface WpFeParagraph {
  paragraph: string;
}

interface WpFestEventsAcf {
  // Hero
  fe_hero_title: string;
  fe_hero_subline: string;
  fe_hero_image: string;
  // Sub Nav
  fe_subnav_label: string;
  fe_subnav_links: WpFeSubNavLink[] | false;
  // Intro
  fe_intro_paragraphs: WpFeParagraph[] | false;
  // Section titles
  fe_fest_title: string;
  fe_events_title: string;
  // CTA
  fe_cta_left_description: string;
  fe_cta_left_label: string;
  fe_cta_left_href: WpFeLinkField;
  fe_cta_right_description: string;
  fe_cta_right_label: string;
  fe_cta_right_href: WpFeLinkField;
}

// fest CPT post shape — same conventions as event (title, featured image,
// published date), just a different post type
interface WpFestPost {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  acf?: {
    event_date?: string;
    event_time?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text: string }>;
  };
}

interface WpAlLinkField {
  title: string;
  url: string;
  target: string;
}

interface WpAlSubNavLink {
  label: string;
  href: string;
}

interface WpAlParagraph {
  paragraph: string;
}

interface WpAlEventsRow {
  image: string;
  paragraphs: WpAlParagraph[] | false;
  button_label: string;
  button_href: WpAlLinkField | "";
  image_side: "left" | "right";
}

interface WpAlMemoryCard {
  image: string;
  caption: string;
  button_label: string;
  button_href: WpAlLinkField;
}

interface WpAlNewsletterItem {
  image: string;
  caption: string;
  href: WpAlLinkField | "";
}

interface WpAlUsefulLink {
  label: string;
  href: WpAlLinkField;
}

interface WpAlumniAcf {
  // Hero
  al_hero_title: string;
  al_hero_subline: string;
  al_hero_image: string;
  // Sub Nav
  al_subnav_label: string;
  al_subnav_links: WpAlSubNavLink[] | false;
  // Director Message
  al_dir_title: string;
  al_dir_paragraphs: WpAlParagraph[] | false;
  al_dir_name: string;
  al_dir_role: string;
  al_dir_image: string;
  // Alumni Intro
  al_intro_title: string;
  al_intro_image: string;
  al_intro_email: string;
  al_intro_paragraphs: WpAlParagraph[] | false;
  // Events on Campus
  al_events_title: string;
  al_events_rows: WpAlEventsRow[] | false;
  // Campus Memories
  al_mem_title: string;
  al_mem_cards: WpAlMemoryCard[] | false;
  // Newsletter
  al_news_title: string;
  al_news_items: WpAlNewsletterItem[] | false;
  // Useful Links
  al_links_title: string;
  al_links_items: WpAlUsefulLink[] | false;
}

interface WpReLinkField {
  title: string;
  url: string;
  target: string;
}

interface WpReSubNavLink {
  label: string;
  href: string;
}

interface WpReCard {
  label: string;
  icon: string;
  href: WpReLinkField;
}

interface WpResourcesAcf {
  // Hero
  re_hero_title: string;
  re_hero_subline: string;
  re_hero_image: string;
  // Sub Nav
  re_subnav_label: string;
  re_subnav_links: WpReSubNavLink[] | false;
  // Cards
  re_cards: WpReCard[] | false;
}

interface WpPlItem {
  title: string;
  file: string; // File field returns the direct URL
}

interface WpPoliciesAcf {
  // Hero
  pl_hero_title: string;
  pl_hero_subline: string;
  pl_hero_image: string;
  // List
  pl_section_title: string;
  pl_section_subtitle: string;
  pl_items: WpPlItem[] | false;
}

interface WpArItem {
  cover_image: string;
  year: string;
  file: string;
}
 
interface WpAnnualReportAcf {
  // Hero
  ar_hero_title: string;
  ar_hero_subline: string;
  ar_hero_image: string;
  // List
  ar_section_title: string;
  ar_section_subtitle: string;
  ar_items: WpArItem[] | false;
}

interface WpCvSubNavLink {
  label: string;
  href: string;
}

interface WpConvocationPageAcf {
  // Hero
  cv_hero_title: string;
  cv_hero_subline: string;
  cv_hero_image: string;
  // Sub Nav
  cv_subnav_label: string;
  cv_subnav_links: WpCvSubNavLink[] | false;
}

// convocation CPT post shape
interface WpConvocationPost {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: {
    convocation_date?: string; // "Ymd"
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text: string }>;
  };
}

const DOCTORAL_SCHOLARS_TERM_ID = 34;
const RECENT_GRADUATES_TERM_ID = 35;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatEventDateTime(
  dateYmd: string | undefined,
  timeHi: string | undefined,
): string {
  if (!dateYmd || dateYmd.length < 8) return "";

  const year = Number(dateYmd.slice(0, 4));
  const month = Number(dateYmd.slice(4, 6)) - 1;
  const day = Number(dateYmd.slice(6, 8));

  const datePart = new Date(year, month, day).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });

  if (!timeHi) return datePart;

  const [hh, mm] = timeHi.split(":").map(Number);
  const period = hh >= 12 ? "PM" : "AM";
  const hour12 = hh % 12 === 0 ? 12 : hh % 12;
  const timePart = `${hour12}:${String(mm).padStart(2, "0")}${period}`;

  return `${datePart}, ${timePart}`;
}

/** "Ymd" e.g. "20260115" → { display: "January, 2026", year: 2026 } */
function parseYmdToMonthYear(ymd: string | undefined): {
  display: string;
  year: number;
} {
  if (!ymd || ymd.length < 6) return { display: "", year: 0 };
  const year = Number(ymd.slice(0, 4));
  const month = Number(ymd.slice(4, 6)) - 1;
  const date = new Date(year, month, 1);
  const display = date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  return { display, year };
}

function mapDoctoralScholarPost(
  post: WpDoctoralScholarPost,
): DoctoralScholarCardData {
  const { display, year } = parseYmdToMonthYear(post.acf?.year_of_joining);
  return {
    id: String(post.id),
    name: decodeHtml(post.title.rendered),
    advisor: post.acf?.advisor || undefined,
    yearOfJoiningDisplay: display,
    yearOfJoiningYear: year,
    image:
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
      `https://picsum.photos/seed/scholar-${post.id}/128/128`,
  };
}

function mapRecentGraduatePost(
  post: WpDoctoralScholarPost,
): RecentGraduateCardData {
  const joining = parseYmdToMonthYear(post.acf?.year_of_joining);
  const graduation = parseYmdToMonthYear(post.acf?.year_of_graduation);

  return {
    id: String(post.id),
    name: decodeHtml(post.title.rendered),
    advisor: post.acf?.advisor || undefined,
    yearOfJoiningDisplay: joining.display,
    yearOfJoiningYear: joining.year,
    yearOfGraduationDisplay: graduation.display,
    yearOfGraduationYear: graduation.year,
    thesisTopic: post.acf?.thesis_topic || undefined,
    postPhdEmployment: post.acf?.post_phd_employment || undefined,
    journalsContent: post.acf?.journals_content || undefined,
    awardsContent: post.acf?.awards_content || undefined,
    personalWebpage: post.acf?.personal_webpage || undefined,
    image:
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
      `https://picsum.photos/seed/grad-${post.id}/128/128`,
  };
}



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
function toArray<T>(val: T[] | false | undefined | null): T[] {
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

  // Fetch relationship-selected posts (no waterfall needed — just one call)
  const programPosts = programIds
    ? await wpFetch<WpProgramCategorySlimPost[]>(
        `/wp/v2/pragrams-of-study?include=${programIds}&acf_format=standard&_fields=id,slug,title,acf`,
      )
    : ([] as WpProgramCategorySlimPost[]);

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
  const acf = await getPageAcf<WpDeanStudentAcf>("dean-student");

  if (!acf) {
    console.warn(
      "[wordpress.ts] Dean (Student) page ACF not found — falling back to mock data.",
    );
    return deanStudentPageData;
  }

  return {
    hero: {
      title: acf.ds_hero_title,
      subline: acf.ds_hero_subline || undefined,
      image: acf.ds_hero_image,
    },

    subNavLabel: acf.ds_subnav_label || "Dean (Student)",

    subNav: toArray(acf.ds_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),

    desk: {
      title: acf.ds_desk_title,
      paragraphs: toArray(acf.ds_desk_paragraphs).map((r) =>
        r.paragraph.replace(/\r\n/g, "\n").replace(/\r/g, "\n"),
      ),
      name: acf.ds_desk_name,
      role: acf.ds_desk_role,
      image: acf.ds_desk_image,
    },

    contact: {
      phone: acf.ds_contact_phone,
      email: acf.ds_contact_email,
    },

    officials: {
      title: acf.ds_officials_title,
      people: toArray(acf.ds_officials).map((o, i) => ({
        id: String(i),
        name: o.name,
        position: o.position,
        email: o.email || "",
        phone: o.phone || "",
        image:
          o.image || `https://picsum.photos/seed/official-${i}/290/338`,
      })),
    },

    cta: {
      left: {
        title: acf.ds_cta_left_title || undefined,
        description: acf.ds_cta_left_description,
        cta: acf.ds_cta_left_label,
        href: acf.ds_cta_left_href?.url ?? "#",
      },
      right: {
        title: acf.ds_cta_right_title || undefined,
        description: acf.ds_cta_right_description,
        cta: acf.ds_cta_right_label,
        href: acf.ds_cta_right_href?.url ?? "#",
      },
    },
  };
}

export async function getCampusLifePage(): Promise<CampusLifePageData> {
  const acf = await getPageAcf<WpCampusLifeAcf>("campus-life");

  if (!acf) {
    console.warn(
      "[wordpress.ts] Campus Life page ACF not found — falling back to mock data.",
    );
    return campusLifePageData;
  }

  const normalize = (s: string) =>
    s.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  return {
    hero: {
      title: acf.cl_hero_title,
      subline: acf.cl_hero_subline || undefined,
      image: acf.cl_hero_image,
    },

    subNavLabel: acf.cl_subnav_label || "Campus Life",

    subNav: toArray(acf.cl_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),

    intro: toArray(acf.cl_intro_paragraphs).map((r) => normalize(r.paragraph)),

    studentLife: {
      id: "student-life",
      title: acf.cl_sl_title,
      paragraphs: toArray(acf.cl_sl_paragraphs).map((r) =>
        normalize(r.paragraph),
      ),
      afterParagraphs: toArray(acf.cl_sl_after_paragraphs).map((r) =>
        normalize(r.paragraph),
      ),
      media: {
        kind: "gallery",
        images: toArray(acf.cl_sl_gallery).map((r) => r.image),
      },
    },

    virtualTour: {
      image: acf.cl_vt_image,
      label: acf.cl_vt_label,
      href:
        typeof acf.cl_vt_href === "object" && acf.cl_vt_href?.url
          ? acf.cl_vt_href.url
          : "#",
    },

    residenceLife: {
      id: "residence-life",
      title: acf.cl_rl_title,
      paragraphs: toArray(acf.cl_rl_paragraphs).map((r) =>
        normalize(r.paragraph),
      ),
      media: {
        kind: "carousel",
        slides: (() => {
          const slides = toArray(acf.cl_rl_slides).map((s) => ({
            image: s.image,
            caption: s.caption || undefined,
          }));
          return slides.length > 0
            ? slides
            : [{ image: "https://picsum.photos/seed/residence-life-fallback/900/680" }];
        })(),
      },
    },

    sportsFacilities: {
      id: "sports",
      title: acf.cl_sf_title,
      paragraphs: toArray(acf.cl_sf_paragraphs).map((r) =>
        normalize(r.paragraph),
      ),
      media: {
        kind: "duo",
        images: [acf.cl_sf_image_1, acf.cl_sf_image_2],
      },
    },

    clubs: {
      title: acf.cl_clubs_title,
      tabs: toArray(acf.cl_clubs_tabs).map((tab, ti) => ({
        id: `tab-${ti}`,
        label: tab.label,
        clubs: toArray(tab.clubs).map((club, ci) => ({
          id: `club-${ti}-${ci}`,
          name: club.name,
          image: club.image,
          description: club.description,
          contacts: toArray(club.contacts).map((c) => ({
            name: c.name,
            role: c.role,
          })),
          email: club.email,
          instagram:
            typeof club.instagram === "object" && club.instagram?.url
              ? club.instagram.url
              : undefined,
        })),
      })),
    },

    studentBody: {
      title: acf.cl_sb_title,
      members: toArray(acf.cl_sb_members).map((m, i) => ({
        id: `sbg-${i}`,
        name: m.name,
        position: m.position,
        image: m.image,
        href:
          typeof m.href === "object" && m.href?.url ? m.href.url : "#",
      })),
    },

    ieee: {
      id: "ieee",
      title: acf.cl_ieee_title,
      paragraphs: toArray(acf.cl_ieee_paragraphs).map((r) =>
        normalize(r.paragraph),
      ),
      media: {
        kind: "carousel",
        slides: (() => {
          const slides = toArray(acf.cl_ieee_slides).map((r) => ({ image: r.image }));
          return slides.length > 0
            ? slides
            : [{ image: "https://picsum.photos/seed/ieee-fallback/900/680" }];
        })(),
      },
    },

    successStories: {
      title: acf.cl_stories_title,
      description: acf.cl_stories_description,
      items: toArray(acf.cl_stories_items).map((s, i) => ({
        id: `story-${i + 1}`,
        quote: s.quote,
        name: s.name,
        year: s.year,
        image: s.image,
      })),
    },

    cta: {
      left: {
        description: acf.cl_cta_left_description,
        cta: acf.cl_cta_left_label,
        href: acf.cl_cta_left_href?.url ?? "#",
      },
      right: {
        description: acf.cl_cta_right_description,
        cta: acf.cl_cta_right_label,
        href: acf.cl_cta_right_href?.url ?? "#",
      },
    },
  };
}

export async function getStudentSupportPage(): Promise<StudentSupportPageData> {
  const acf = await getPageAcf<WpStudentSupportAcf>("student-support");

  if (!acf) {
    console.warn(
      "[wordpress.ts] Student Support page ACF not found — falling back to mock data.",
    );
    return studentSupportPageData;
  }

  const normalize = (s: string) =>
    s.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  return {
    hero: {
      title: acf.ss_hero_title,
      subline: acf.ss_hero_subline || undefined,
      image: acf.ss_hero_image,
    },

    subNavLabel: acf.ss_subnav_label || "Student Support",

    subNav: toArray(acf.ss_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),

    intro: toArray(acf.ss_intro_paragraphs).map((r) => normalize(r.paragraph)),

    wellbeing: {
      title: acf.ss_wb_title,
      paragraphs: toArray(acf.ss_wb_paragraphs).map((r) =>
        normalize(r.paragraph),
      ),
      phone: acf.ss_wb_phone,
      email: acf.ss_wb_email,
    },

    antiRagging: toArray(acf.ss_ragging_items).map((item, i) => ({
      id: `ragging-${i}`,
      title: item.title,
      paragraphs: toArray(item.paragraphs).map((r) => normalize(r.paragraph)),
      link:
        item.link_label &&
        typeof item.link_href === "object" &&
        item.link_href?.url
          ? { label: item.link_label, href: item.link_href.url }
          : undefined,
      image:
        typeof item.image === "string" && item.image ? item.image : undefined,
      button:
        item.button_label &&
        typeof item.button_href === "object" &&
        item.button_href?.url
          ? { label: item.button_label, href: item.button_href.url }
          : undefined,
    })),

    medical: {
      title: acf.ss_medical_title,
      intro: toArray(acf.ss_medical_intro).map((r) => normalize(r.paragraph)),
      cells: toArray(acf.ss_medical_cells).map((c) => ({
        name: c.name,
        time: c.time,
      })),
      outro: toArray(acf.ss_medical_outro).map((r) => normalize(r.paragraph)),
    },

    cta: {
      left: {
        description: acf.ss_cta_left_description,
        cta: acf.ss_cta_left_label,
        href: acf.ss_cta_left_href?.url ?? "#",
      },
      right: {
        description: acf.ss_cta_right_description,
        cta: acf.ss_cta_right_label,
        href: acf.ss_cta_right_href?.url ?? "#",
      },
    },
  };
}

export async function getFestEventsPage(): Promise<FestEventsPageData> {
  const acf = await getPageAcf<WpFestEventsAcf>("fest-events");

  if (!acf) {
    console.warn(
      "[wordpress.ts] Fest & Events page ACF not found — falling back to mock data.",
    );
    return festEventsPageData;
  }

  // Fetch both CPTs in parallel — no waterfall
  const [festPosts, eventPosts] = await Promise.all([
    wpFetch<WpFestPost[]>(
      `/wp/v2/fest?_embed=wp:featuredmedia&acf_format=standard&per_page=6&orderby=date&order=desc`,
    ),
    // Fetch enough events for the "Show More" client-side reveal (6 shown,
    // rest revealed on click) — 20 gives good headroom.
    wpFetch<WpEventPost[]>(
      `/wp/v2/event?_embed=wp:featuredmedia&per_page=20&orderby=date&order=desc`,
    ),
  ]);

  return {
    hero: {
      title: acf.fe_hero_title,
      subline: acf.fe_hero_subline || undefined,
      image: acf.fe_hero_image,
    },

    subNavLabel: acf.fe_subnav_label || "Fest & Events",

    subNav: toArray(acf.fe_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),

    intro: toArray(acf.fe_intro_paragraphs).map((r) =>
      r.paragraph.replace(/\r\n/g, "\n").replace(/\r/g, "\n"),
    ),

    upcomingFest: {
      title: acf.fe_fest_title,
      items: festPosts.map((post) => ({
        id: String(post.id),
        title: decodeHtml(post.title.rendered),
        date: formatEventDateTime(post.acf?.event_date, post.acf?.event_time) || formatIsoDate(post.date),
        image:
          post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
          `https://picsum.photos/seed/fest-${post.id}/1000/560`,
        href: `/life/events/${post.slug}`,
      })),
    },

    upcomingEvents: {
      title: acf.fe_events_title,
      items: eventPosts.map((post) => ({
        id: String(post.id),
        title: decodeHtml(post.title.rendered),
        date: formatIsoDate(post.date),
        image:
          post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
          `https://picsum.photos/seed/event-${post.id}/600/380`,
        href: `/life/events/${post.slug}`,
      })),
    },

    cta: {
      left: {
        description: acf.fe_cta_left_description,
        cta: acf.fe_cta_left_label,
        href: acf.fe_cta_left_href?.url ?? "#",
      },
      right: {
        description: acf.fe_cta_right_description,
        cta: acf.fe_cta_right_label,
        href: acf.fe_cta_right_href?.url ?? "#",
      },
    },
  };
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
interface WpFpLinkField {
  title: string;
  url: string;
  target: string;
}

interface WpFpBreadcrumb {
  label: string;
  href: string;
}

interface WpFpSubNavLink {
  label: string;
  href: string;
}

interface WpFacultyLandingAcf {
  // Hero
  fp_hero_subline: string;
  fp_hero_image: string;
  fp_breadcrumb: WpFpBreadcrumb[] | false;
  // Sub Nav
  fp_subnav_label: string;
  fp_subnav_links: WpFpSubNavLink[] | false;
  // CTA
  fp_cta_left_title: string;
  fp_cta_left_description: string;
  fp_cta_left_label: string;
  fp_cta_left_href: WpFpLinkField;
  fp_cta_right_title: string;
  fp_cta_right_description: string;
  fp_cta_right_label: string;
  fp_cta_right_href: WpFpLinkField;
}

// Full faculty CPT post shape — includes the extended fields
// (department, interests, phone, address, email)
interface WpFacultyFullPost {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: {
    position?: string;
    department?: string;
    interests?: string;
    phone?: string;
    address?: string;
    email?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

// ─── Taxonomy term map ─────────────────────────────────────────────────────
// ⚠️ Replace these termId values with the REAL ones from your WordPress.
// Check by visiting: https://dau.123demo.fun/wp-json/wp/v2/faculty-type
// That page lists every term with its numeric "id" — match each id to the
// correct slug/label below.

const FACULTY_TYPE_TERMS: Array<{
  slug: string;
  label: string;
  termId: number;
}> = [
  { slug: "regular-faculty", label: "Faculty", termId: 27 },
  { slug: "visiting-faculty", label: "Visiting Faculty", termId: 28 },
  { slug: "distinguished-profs", label: "Distinguished Profs.", termId: 29 },
  { slug: "professor-of-practice", label: "Professor of Practice", termId: 30 },
  { slug: "international-faculty", label: "International Faculty", termId: 31 },
];

// ─── Helper: maps one WP faculty post → the FacultyCardData shape ─────────

function mapFacultyPost(post: WpFacultyFullPost): FacultyCardData {
  return {
    id: String(post.id),
    name: decodeHtml(post.title.rendered),
    position: post.acf?.position ?? "",
    department: post.acf?.department ?? "",
    interests: post.acf?.interests || undefined,
    phone: post.acf?.phone || undefined,
    address: post.acf?.address || undefined,
    email: post.acf?.email || undefined,
    image:
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
      `https://picsum.photos/seed/faculty-${post.id}/220/260`,
    href: `/faculty/${post.slug}`,
  };
}
export async function getFacultyPage(): Promise<FacultyPageData> {
  const acf = await getPageAcf<WpFacultyLandingAcf>("faculty");

  if (!acf) {
    console.warn(
      "[wordpress.ts] Faculty landing page ACF not found — falling back to mock data.",
    );
    return facultyPageData;
  }

  // Fetch every faculty-type term's members in parallel
  const tabResults = await Promise.all(
    FACULTY_TYPE_TERMS.map(({ termId }) =>
      wpFetch<WpFacultyFullPost[]>(
        `/wp/v2/faculty?faculty-type=${termId}&_embed=wp:featuredmedia&acf_format=standard&per_page=100`,
      ),
    ),
  );

  const tabs: FacultyTabData[] = FACULTY_TYPE_TERMS.map((term, i) => ({
    slug: term.slug,
    label: term.label,
    members: tabResults[i].map(mapFacultyPost),
  }));

  return {
    hero: {
      title: "Faculty",
      subline: acf.fp_hero_subline || undefined,
      image: acf.fp_hero_image,
      breadcrumb: toArray(acf.fp_breadcrumb).map((b) => ({
        label: b.label,
        href: b.href,
      })),
    },

    subNavLabel: acf.fp_subnav_label || "Page Title",

    subNav: toArray(acf.fp_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),

    tabs,

    cta: {
      left: {
        title: acf.fp_cta_left_title || undefined,
        description: acf.fp_cta_left_description,
        cta: acf.fp_cta_left_label,
        href: acf.fp_cta_left_href?.url ?? "#",
      },
      right: {
        title: acf.fp_cta_right_title || undefined,
        description: acf.fp_cta_right_description,
        cta: acf.fp_cta_right_label,
        href: acf.fp_cta_right_href?.url ?? "#",
      },
    },
  };
}

export async function getDeanFacultyPage(): Promise<DeanFacultyPageData> {
  const acf = await getPageAcf<WpDeanFacultyAcf>("dean-faculty");

  if (!acf) {
    console.warn(
      "[wordpress.ts] Dean (Faculty) page ACF not found — falling back to mock data.",
    );
    return deanFacultyPageData;
  }

  // Desk paragraphs: each row is a WYSIWYG that may contain multiple <p>
  // tags — flatten every <p> across every row into one paragraph list,
  // exactly like getDeanResearchPage does for dr_desk_paragraphs.
  const deskParagraphs = toArray(acf.df_desk_paragraphs).flatMap((row) =>
    extractParagraphs(row.paragraph),
  );

  return {
    hero: {
      title: acf.df_hero_title,
      subline: acf.df_hero_subline || undefined,
      image: acf.df_hero_image,
      breadcrumb: toArray(acf.df_breadcrumb).map((b) => ({
        label: b.label,
        href: b.href,
      })),
    },

    subNavLabel: acf.df_subnav_label,

    subNav: toArray(acf.df_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),

    desk: {
      title: acf.df_desk_title,
      paragraphs: deskParagraphs,
      name: acf.df_desk_name,
      role: acf.df_desk_role,
      image: acf.df_desk_image,
      email: acf.df_desk_email,
    },

    cta: {
      left: {
        title: acf.df_cta_left_title || undefined,
        description: acf.df_cta_left_description,
        cta: acf.df_cta_left_label,
        href: acf.df_cta_left_href?.url ?? "#",
      },
      right: {
        title: acf.df_cta_right_title || undefined,
        description: acf.df_cta_right_description,
        cta: acf.df_cta_right_label,
        href: acf.df_cta_right_href?.url ?? "#",
      },
    },
  };
}

export async function getFacultyRecruitmentPage(): Promise<FacultyRecruitmentPageData> {
  const acf = await getPageAcf<WpFacultyRecruitmentAcf>("faculty-recruitment");

  if (!acf) {
    console.warn(
      "[wordpress.ts] Faculty Recruitment page ACF not found — falling back to mock data.",
    );
    return facultyRecruitmentPageData;
  }

  const mapProseBlocks = (blocks: WpFrProseBlock[] | false): TitledSubBlock[] =>
    toArray(blocks).map((b) => ({
      heading: b.heading || undefined,
      paragraphs: toArray(b.paragraphs).map((p) => p.paragraph),
      bulletsLead: b.bullets_lead || undefined,
      bullets: toArray(b.bullets).map((x) => x.bullet),
    }));

  return {
    hero: {
      title: acf.fr_hero_title,
      subline: acf.fr_hero_subline || undefined,
      image: acf.fr_hero_image,
      breadcrumb: toArray(acf.fr_breadcrumb).map((b) => ({
        label: b.label,
        href: b.href,
      })),
    },

    subNavLabel: acf.fr_subnav_label,

    subNav: toArray(acf.fr_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),

    applyBanner: {
      text: acf.fr_apply_banner_text,
      cta: acf.fr_apply_banner_cta,
      href: acf.fr_apply_banner_href?.url ?? "#",
    },

    intro: toArray(acf.fr_intro_paragraphs).map((p) => p.paragraph),

    openings: {
      title: acf.fr_openings_title,
      description: acf.fr_openings_description,
      cards: toArray(acf.fr_openings_cards).map((c, i) => ({
        id: `o${i + 1}`,
        title: c.title,
        image: c.image,
        href: c.href,
      })),
    },

    eligibility: {
      title: acf.fr_eligibility_title,
      tabs: toArray(acf.fr_eligibility_tabs).map((t) => ({
        slug: slugify(t.label),
        label: t.label,
        paragraphs: toArray(t.paragraphs).map((p) => p.paragraph),
        bullets: toArray(t.bullets).length
          ? toArray(t.bullets).map((b) => b.bullet)
          : undefined,
      })),
    },

    prospective: {
      title: acf.fr_prospective_title,
      intro: acf.fr_prospective_intro || undefined,
      blocks: mapProseBlocks(acf.fr_prospective_blocks),
    },

    gallery: {
      images: toArray(acf.fr_gallery_images).map((img) => img.url),
    },

    compensation: {
      title: acf.fr_compensation_title,
      intro: acf.fr_compensation_intro || undefined,
      blocks: mapProseBlocks(acf.fr_compensation_blocks),
    },

    cta: {
      left: {
        title: acf.fr_cta_left_title || undefined,
        description: acf.fr_cta_left_description,
        cta: acf.fr_cta_left_label,
        href: acf.fr_cta_left_href?.url ?? "#",
      },
      right: {
        title: acf.fr_cta_right_title || undefined,
        description: acf.fr_cta_right_description,
        cta: acf.fr_cta_right_label,
        href: acf.fr_cta_right_href?.url ?? "#",
      },
    },
  };
}

export async function getFacultyHandbookPage(): Promise<FacultyHandbookPageData> {
  const acf = await getPageAcf<WpFacultyHandbookAcf>("faculty-handbook");

  if (!acf) {
    console.warn(
      "[wordpress.ts] Faculty Handbook page ACF not found — falling back to mock data.",
    );
    return facultyHandbookPageData;
  }

  if (!acf.fh_download_file) {
    console.warn(
      "[wordpress.ts] Faculty Handbook PDF not uploaded yet — falling back to mock download link.",
    );
  }

  return {
    hero: {
      title: acf.fh_hero_title,
      subline: acf.fh_hero_subline || undefined,
      image: acf.fh_hero_image,
      breadcrumb: toArray(acf.fh_breadcrumb).map((b) => ({
        label: b.label,
        href: b.href,
      })),
    },

    subNavLabel: acf.fh_subnav_label,

    subNav: toArray(acf.fh_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),

    applyBanner: {
      text: acf.fh_apply_banner_text,
      cta: acf.fh_apply_banner_cta,
      href: acf.fh_apply_banner_href?.url ?? "#",
    },

    content: {
      paragraphs: toArray(acf.fh_content_paragraphs).flatMap((row) =>
        extractParagraphs(row.paragraph),
      ),
      downloadButton: {
        label: acf.fh_download_label,
        href: acf.fh_download_file
          ? acf.fh_download_file.url
          : facultyHandbookPageData.content.downloadButton.href,
        external: acf.fh_download_new_tab ?? true,
      },
    },

    cta: {
      left: {
        title: acf.fh_cta_left_title || undefined,
        description: acf.fh_cta_left_description,
        cta: acf.fh_cta_left_label,
        href: acf.fh_cta_left_href?.url ?? "#",
      },
      right: {
        title: acf.fh_cta_right_title || undefined,
        description: acf.fh_cta_right_description,
        cta: acf.fh_cta_right_label,
        href: acf.fh_cta_right_href?.url ?? "#",
      },
    },
  };
}

export async function getFacultyDevelopmentPage(): Promise<FacultyDevelopmentPageData> {
  const [acf, contact] = await Promise.all([
    getPageAcf<WpFacultyDevelopmentAcf>("faculty-development-evaluation"),
    getSiteSettings(),
  ]);

  if (!acf) {
    console.warn(
      "[wordpress.ts] Faculty Development page ACF not found — falling back to mock data.",
    );
    return facultyDevelopmentPageData;
  }

  const mapProseBlocks = (blocks: WpFdProseBlock[] | false): TitledSubBlock[] =>
    toArray(blocks).map((b) => ({
      heading: b.heading || undefined,
      paragraphs: toArray(b.paragraphs).map((p) => p.paragraph),
      bulletsLead: b.bullets_lead || undefined,
      bullets: toArray(b.bullets).map((x) => x.bullet),
    }));

  return {
    hero: {
      title: acf.fd_hero_title,
      subline: acf.fd_hero_subline || undefined,
      image: acf.fd_hero_image,
      breadcrumb: toArray(acf.fd_breadcrumb).map((b) => ({
        label: b.label,
        href: b.href,
      })),
    },

    subNavLabel: acf.fd_subnav_label,

    subNav: toArray(acf.fd_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),

    intro: toArray(acf.fd_intro_paragraphs).map((p) => p.paragraph),

    fdps: {
      title: acf.fd_fdps_title,
      introParagraphs: toArray(acf.fd_fdps_intro_paragraphs).map(
        (p) => p.paragraph,
      ),
      bulletGroups: toArray(acf.fd_fdps_bullet_groups).map((g) => ({
        lead: g.lead || undefined,
        items: toArray(g.items).map((i) => i.item),
      })),
      outroParagraphs: toArray(acf.fd_fdps_outro_paragraphs).map(
        (p) => p.paragraph,
      ),
      button: acf.fd_fdps_button?.href?.url
        ? {
            label: acf.fd_fdps_button.label,
            href: acf.fd_fdps_button.href.url,
            external: acf.fd_fdps_button.href.target === "_blank",
          }
        : undefined,
    },

    enhancement: {
      title: acf.fd_enhancement_title,
      description: acf.fd_enhancement_description,
      cards: toArray(acf.fd_enhancement_cards).map((c, i) => ({
        id: `e${i + 1}`,
        title: c.title,
        image: c.image,
        href: c.href,
      })),
    },

    industry: {
      title: acf.fd_industry_title,
      introParagraphs: toArray(acf.fd_industry_intro_paragraphs).map(
        (p) => p.paragraph,
      ),
      bullets: toArray(acf.fd_industry_bullets).map((b) => b.bullet),
      outroParagraphs: toArray(acf.fd_industry_outro_paragraphs).map(
        (p) => p.paragraph,
      ),
      slides: toArray(acf.fd_industry_slides).map((s) => ({
        image: s.image,
        caption: s.caption,
      })),
    },

    evaluation: {
      title: acf.fd_evaluation_title,
      intro: acf.fd_evaluation_intro || undefined,
      blocks: mapProseBlocks(acf.fd_evaluation_blocks),
    },

    teachingEffectiveness: {
      title: acf.fd_te_title,
      intro: acf.fd_te_intro || undefined,
      cards: toArray(acf.fd_te_cards).map((c, i) => ({
        id: `te${i + 1}`,
        label: c.label,
        image: c.image,
      })),
    },

    continuousImprovement: {
      title: acf.fd_ci_title,
      intro: acf.fd_ci_intro || undefined,
      blocks: mapProseBlocks(acf.fd_ci_blocks),
    },

    policyGuidelines: {
      title: acf.fd_policy_title,
      cards: toArray(acf.fd_policy_cards).map((c, i) => ({
        id: `p${i + 1}`,
        title: c.title,
        description: c.description,
        ctaLabel: c.cta_label,
        ctaHref: c.cta_href,
      })),
    },

    highlights: {
      title: acf.fd_highlights_title,
      items: toArray(acf.fd_highlights_items).map((h, i) => ({
        id: `h${i + 1}`,
        image: h.image,
        date: formatIsoDate(h.date),
        excerpt: h.excerpt,
        href: h.href,
      })),
    },

    diversity: {
      title: acf.fd_diversity_title,
      description: acf.fd_diversity_description,
    },

    contact,
  };
}

// ─── Placements ───────────────────────────────────────────────────────────────

interface WpPtLinkField {
  title: string;
  url: string;
  target: string;
}

interface WpPtBreadcrumb {
  label: string;
  href: string;
}

interface WpPtSubNavLink {
  label: string;
  href: string;
}

interface WpPtParagraph {
  paragraph: string;
}

interface WpPlacementTeamAcf {
  // Hero
  pt_hero_subline: string;
  pt_hero_image: string;
  pt_breadcrumb: WpPtBreadcrumb[] | false;
  // Sub Nav
  pt_subnav_label: string;
  pt_subnav_links: WpPtSubNavLink[] | false;
  // Intro
  pt_intro_paragraphs: WpPtParagraph[] | false;
  // Team titles
  pt_placement_cell_title: string;
  pt_student_cell_title: string;
  // CTA
  pt_cta_left_title: string;
  pt_cta_left_description: string;
  pt_cta_left_label: string;
  pt_cta_left_href: WpPtLinkField;
  pt_cta_right_title: string;
  pt_cta_right_description: string;
  pt_cta_right_label: string;
  pt_cta_right_href: WpPtLinkField;
}

// placement-cell CPT post shape
interface WpPlacementCellPost {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: {
    position?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text: string }>;
  };
}

function mapCellPost(post: WpPlacementCellPost, prefix: string, i: number): FacultyMember {
  return {
    id: `${prefix}-${i}`,
    name: decodeHtml(post.title.rendered),
    position: post.acf?.position ?? "",
    image:
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
      `https://picsum.photos/seed/${prefix}-${i}/290/360`,
    href: `/placements/team/${post.slug}`,
  };
}

export async function getPlacementTeamPage(): Promise<PlacementTeamPageData> {
  const acf = await getPageAcf<WpPlacementTeamAcf>("placements-team");

  if (!acf) {
    console.warn(
      "[wordpress.ts] Placement Team page ACF not found — falling back to mock data.",
    );
    return placementTeamPageData;
  }

  // Taxonomy term IDs: main-cell = 33, student-cell = 32
  const [mainCellPosts, studentCellPosts] = await Promise.all([
    wpFetch<WpPlacementCellPost[]>(
      `/wp/v2/placement-cell?cell-type=33&_embed=wp:featuredmedia&acf_format=standard&per_page=50`,
    ),
    wpFetch<WpPlacementCellPost[]>(
      `/wp/v2/placement-cell?cell-type=32&_embed=wp:featuredmedia&acf_format=standard&per_page=50`,
    ),
  ]);

  return {
    hero: {
      title: "Placement Team",
      subline: acf.pt_hero_subline || undefined,
      image: acf.pt_hero_image,
      breadcrumb: toArray(acf.pt_breadcrumb).map((b) => ({
        label: b.label,
        href: b.href,
      })),
    },

    subNavLabel: acf.pt_subnav_label || "Placement Team",

    subNav: toArray(acf.pt_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),

    intro: toArray(acf.pt_intro_paragraphs).map((r) =>
      r.paragraph.replace(/\r\n/g, "\n").replace(/\r/g, "\n"),
    ),

    placementCell: {
      title: acf.pt_placement_cell_title,
      members: mainCellPosts.map((post, i) => mapCellPost(post, "pct", i)),
    },

    studentCell: {
      title: acf.pt_student_cell_title,
      members: studentCellPosts.map((post, i) => mapCellPost(post, "spc", i)),
    },

    cta: {
      left: {
        title: acf.pt_cta_left_title || undefined,
        description: acf.pt_cta_left_description,
        cta: acf.pt_cta_left_label,
        href: acf.pt_cta_left_href?.url ?? "#",
      },
      right: {
        title: acf.pt_cta_right_title || undefined,
        description: acf.pt_cta_right_description,
        cta: acf.pt_cta_right_label,
        href: acf.pt_cta_right_href?.url ?? "#",
      },
    },
  };
}

interface WpPsLinkField {
  title: string;
  url: string;
  target: string;
}

interface WpPsBreadcrumb {
  label: string;
  href: string;
}

interface WpPsSubNavLink {
  label: string;
  href: string;
}

interface WpPsParagraph {
  paragraph: string;
}

interface WpPsGalleryImage {
  image: string;
}

interface WpPsBucket {
  label: string;
  highest: number;
  average: number;
}

interface WpPsStory {
  quote: string;
  name: string;
  year: string;
  image: string;
}

interface WpPlacementStatsAcf {
  // Hero
  ps_hero_subline: string;
  ps_hero_image: string;
  ps_breadcrumb: WpPsBreadcrumb[] | false;
  // Sub Nav
  ps_subnav_label: string;
  ps_subnav_links: WpPsSubNavLink[] | false;
  // Intro
  ps_intro_paragraphs: WpPsParagraph[] | false;
  // Gallery
  ps_gallery_images: WpPsGalleryImage[] | false;
  // UG Placements
  ps_ug_title: string;
  ps_ug_description: string;
  ps_ug_highest_label: string;
  ps_ug_average_label: string;
  ps_ug_buckets: WpPsBucket[] | false;
  // PG Placements
  ps_pg_title: string;
  ps_pg_description: string;
  ps_pg_highest_label: string;
  ps_pg_average_label: string;
  ps_pg_buckets: WpPsBucket[] | false;
  // Success Stories
  ps_stories_title: string;
  ps_stories_items: WpPsStory[] | false;
  // CTA
  ps_cta_left_description: string;
  ps_cta_left_label: string;
  ps_cta_left_href: WpPsLinkField;
  ps_cta_right_description: string;
  ps_cta_right_label: string;
  ps_cta_right_href: WpPsLinkField;
}

export async function getPlacementStatsPage(): Promise<PlacementStatsPageData> {
  const acf = await getPageAcf<WpPlacementStatsAcf>("placement-stats");

  if (!acf) {
    console.warn(
      "[wordpress.ts] Placement Stats page ACF not found — falling back to mock data.",
    );
    return placementStatsPageData;
  }

  return {
    hero: {
      title: "Placement Stats",
      subline: acf.ps_hero_subline || undefined,
      image: acf.ps_hero_image,
      breadcrumb: toArray(acf.ps_breadcrumb).map((b) => ({
        label: b.label,
        href: b.href,
      })),
    },

    subNavLabel: acf.ps_subnav_label || "Placement Stats",

    subNav: toArray(acf.ps_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),

    intro: toArray(acf.ps_intro_paragraphs).map((r) =>
      r.paragraph.replace(/\r\n/g, "\n").replace(/\r/g, "\n"),
    ),

    gallery: {
      images: toArray(acf.ps_gallery_images).map((r) => r.image),
    },

    ugPlacements: {
      id: "ug-placements",
      title: acf.ps_ug_title,
      description: acf.ps_ug_description,
      legend: {
        highestLabel: acf.ps_ug_highest_label,
        averageLabel: acf.ps_ug_average_label,
      },
      buckets: toArray(acf.ps_ug_buckets).map((b) => ({
        label: b.label,
        highest: Number(b.highest),
        average: Number(b.average),
      })),
    },

    pgPlacements: {
      id: "pg-placements",
      title: acf.ps_pg_title,
      description: acf.ps_pg_description,
      legend: {
        highestLabel: acf.ps_pg_highest_label,
        averageLabel: acf.ps_pg_average_label,
      },
      buckets: toArray(acf.ps_pg_buckets).map((b) => ({
        label: b.label,
        highest: Number(b.highest),
        average: Number(b.average),
      })),
    },

    successStories: {
      title: acf.ps_stories_title,
      items: toArray(acf.ps_stories_items).map((s, i) => ({
        id: `story-${i + 1}`,
        quote: s.quote,
        name: s.name,
        year: s.year,
        image: s.image,
      })),
    },

    cta: {
      left: {
        // title-less per design — CtaPanel.title is optional, simply omitted
        description: acf.ps_cta_left_description,
        cta: acf.ps_cta_left_label,
        href: acf.ps_cta_left_href?.url ?? "#",
      },
      right: {
        description: acf.ps_cta_right_description,
        cta: acf.ps_cta_right_label,
        href: acf.ps_cta_right_href?.url ?? "#",
      },
    },
  };
}

interface WpTrLinkField {
  title: string;
  url: string;
  target: string;
}

interface WpTrBreadcrumb {
  label: string;
  href: string;
}

interface WpTrSubNavLink {
  label: string;
  href: string;
}

interface WpTrParagraph {
  paragraph: string;
}

interface WpTrStat {
  value: string;
  label: string;
}

interface WpTrRecruiterItem {
  name: string;
  logo: string;
  href: WpTrLinkField | "";
}

interface WpTrStory {
  quote: string;
  name: string;
  year: string;
  image: string;
}

interface WpTopRecruitersAcf {
  // Hero
  tr_hero_subline: string;
  tr_hero_image: string;
  tr_breadcrumb: WpTrBreadcrumb[] | false;
  // Sub Nav
  tr_subnav_label: string;
  tr_subnav_links: WpTrSubNavLink[] | false;
  // Intro
  tr_intro_paragraphs: WpTrParagraph[] | false;
  // Stats
  tr_stats: WpTrStat[] | false;
  // Recruiters
  tr_recruiters_title: string;
  tr_recruiters_items: WpTrRecruiterItem[] | false;
  // Success Stories
  tr_stories_title: string;
  tr_stories_items: WpTrStory[] | false;
  // CTA
  tr_cta_left_description: string;
  tr_cta_left_label: string;
  tr_cta_left_href: WpTrLinkField;
  tr_cta_right_description: string;
  tr_cta_right_label: string;
  tr_cta_right_href: WpTrLinkField;
}

export async function getTopRecruitersPage(): Promise<TopRecruitersPageData> {
  const acf = await getPageAcf<WpTopRecruitersAcf>("top-recruiters");

  if (!acf) {
    console.warn(
      "[wordpress.ts] Top Recruiters page ACF not found — falling back to mock data.",
    );
    return topRecruitersPageData;
  }

  return {
    hero: {
      title: "Top Recruiters",
      subline: acf.tr_hero_subline || undefined,
      image: acf.tr_hero_image,
      breadcrumb: toArray(acf.tr_breadcrumb).map((b) => ({
        label: b.label,
        href: b.href,
      })),
    },

    subNavLabel: acf.tr_subnav_label || "Top Recruiters",

    subNav: toArray(acf.tr_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),

    intro: toArray(acf.tr_intro_paragraphs).map((r) =>
      r.paragraph.replace(/\r\n/g, "\n").replace(/\r/g, "\n"),
    ),

    stats: toArray(acf.tr_stats).map((s) => ({
      value: s.value,
      label: s.label,
    })),

    recruiters: {
      title: acf.tr_recruiters_title,
      items: toArray(acf.tr_recruiters_items).map((item, i) => ({
        id: `r-${i + 1}`,
        name: item.name,
        logo: item.logo,
        href:
          typeof item.href === "object" && item.href?.url
            ? item.href.url
            : undefined,
      })),
    },

    successStories: {
      title: acf.tr_stories_title,
      items: toArray(acf.tr_stories_items).map((s, i) => ({
        id: `story-${i + 1}`,
        quote: s.quote,
        name: s.name,
        year: s.year,
        image: s.image,
      })),
    },

    cta: {
      left: {
        description: acf.tr_cta_left_description,
        cta: acf.tr_cta_left_label,
        href: acf.tr_cta_left_href?.url ?? "#",
      },
      right: {
        description: acf.tr_cta_right_description,
        cta: acf.tr_cta_right_label,
        href: acf.tr_cta_right_href?.url ?? "#",
      },
    },
  };
}

interface WpInLinkField {
  title: string;
  url: string;
  target: string;
}

interface WpInBreadcrumb {
  label: string;
  href: string;
}

interface WpInSubNavLink {
  label: string;
  href: string;
}

interface WpInParagraph {
  paragraph: string;
}

interface WpInSlide {
  image: string;
  caption: string;
}

interface WpInternshipsAcf {
  // Hero
  in_hero_subline: string;
  in_hero_image: string;
  in_breadcrumb: WpInBreadcrumb[] | false;
  // Sub Nav
  in_subnav_label: string;
  in_subnav_links: WpInSubNavLink[] | false;
  // Apply Banner
  in_banner_text: string;
  in_banner_cta: string;
  in_banner_href: WpInLinkField;
  // Intro
  in_intro_paragraphs: WpInParagraph[] | false;
  // Carousel
  in_carousel_slides: WpInSlide[] | false;
  // CTA
  in_cta_left_description: string;
  in_cta_left_label: string;
  in_cta_left_href: WpInLinkField;
  in_cta_right_description: string;
  in_cta_right_label: string;
  in_cta_right_href: WpInLinkField;
}

export async function getInternshipsPage(): Promise<InternshipsPageData> {
  const acf = await getPageAcf<WpInternshipsAcf>("placement-internship");

  if (!acf) {
    console.warn(
      "[wordpress.ts] Internships page ACF not found — falling back to mock data.",
    );
    return internshipsPageData;
  }

  return {
    hero: {
      title: "Internships",
      subline: acf.in_hero_subline || undefined,
      image: acf.in_hero_image,
      breadcrumb: toArray(acf.in_breadcrumb).map((b) => ({
        label: b.label,
        href: b.href,
      })),
    },

    subNavLabel: acf.in_subnav_label || "Internships",

    subNav: toArray(acf.in_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),

    applyBanner: {
      text: acf.in_banner_text,
      cta: acf.in_banner_cta,
      href: acf.in_banner_href?.url ?? "#",
    },

    intro: toArray(acf.in_intro_paragraphs).map((r) =>
      r.paragraph.replace(/\r\n/g, "\n").replace(/\r/g, "\n"),
    ),

    carousel: {
      slides: toArray(acf.in_carousel_slides).map((s) => ({
        image: s.image,
        caption: s.caption || "",
      })),
    },

    cta: {
      left: {
        description: acf.in_cta_left_description,
        cta: acf.in_cta_left_label,
        href: acf.in_cta_left_href?.url ?? "#",
      },
      right: {
        description: acf.in_cta_right_description,
        cta: acf.in_cta_right_label,
        href: acf.in_cta_right_href?.url ?? "#",
      },
    },
  };
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

export async function getResourceCentrePage(): Promise<AcademicSupportDetailPageData> {
  const acf = await getPageAcf<WpResourceCentreAcf>("resource-centre");

  if (!acf) {
    console.warn(
      "[wordpress.ts] Resource Centre page ACF not found — using placeholder data.",
    );
    // No pre-existing mock file for this page — minimal inline fallback
    return {
      hero: {
        title: "Resource Centre",
        image: "https://picsum.photos/seed/resource-centre/1280/560",
        breadcrumb: [],
      },
      subNavLabel: "Academic Areas",
      subNav: [],
      introHtml: "<p>Content coming soon.</p>",
      schedule: [],
      outroHtml: "",
    };
  }

  return {
    hero: {
      title: "Resource Centre",
      subline: acf.rc_hero_subline || undefined,
      image: acf.rc_hero_image,
      breadcrumb: toArray(acf.rc_breadcrumb).map((b) => ({
        label: b.label,
        href: b.href,
      })),
    },

    subNavLabel: acf.rc_subnav_label || "Academic Areas",

    subNav: toArray(acf.rc_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),

    introHtml: acf.rc_intro_html || "",

    schedule: toArray(acf.rc_schedule_cells).map((c) => ({
      name: c.name,
      time: c.time,
    })),

    outroHtml: acf.rc_outro_html || "",
  };
}

export async function getComputationalResourcesPage(): Promise<ComputationalResourcesPageData> {
  const acf = await getPageAcf<WpComputationalResourcesAcf>(
    "computational-resources",
  );

  if (!acf) {
    console.warn(
      "[wordpress.ts] Computational Resources page ACF not found — using placeholder data.",
    );
    return {
      hero: {
        title: "Computational Resources",
        image: "https://picsum.photos/seed/computational-resources/1280/560",
        breadcrumb: [],
      },
      subNavLabel: "Academic Areas",
      subNav: [],
      content: { paragraphs: [], image: "" },
    };
  }

  return {
    hero: {
      title: "Computational Resources",
      subline: acf.cr_hero_subline || undefined,
      image: acf.cr_hero_image,
      breadcrumb: toArray(acf.cr_breadcrumb).map((b) => ({
        label: b.label,
        href: b.href,
      })),
    },

    subNavLabel: acf.cr_subnav_label || "Academic Areas",

    subNav: toArray(acf.cr_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),

    content: {
      paragraphs: toArray(acf.cr_content_paragraphs).map((r) =>
        r.paragraph.replace(/\r\n/g, "\n").replace(/\r/g, "\n"),
      ),
      image: acf.cr_content_image,
    },
  };
}

export async function getStaffPage(): Promise<StaffPageData> {
  const acf = await getPageAcf<WpStaffLandingAcf>("staff");

  if (!acf) {
    console.warn(
      "[wordpress.ts] Staff landing page ACF not found — falling back to placeholder data.",
    );
    return {
      hero: {
        title: "Staff",
        image: "https://picsum.photos/seed/staff/1200/500",
        breadcrumb: [],
      },
      subNavLabel: "Page Title",
      subNav: [],
      members: [],
      cta: {
        left: { description: "", cta: "Know More", href: "#" },
        right: { description: "", cta: "Know More", href: "#" },
      },
    };
  }

  const staffPosts = await wpFetch<WpStaffPost[]>(
    `/wp/v2/staff?_embed=wp:featuredmedia&acf_format=standard&per_page=100`,
  );

  const members: StaffCardData[] = staffPosts.map((post) => ({
    id: String(post.id),
    name: decodeHtml(post.title.rendered),
    position: post.acf?.position ?? "",
    department: post.acf?.department ?? "",
    phone: post.acf?.phone || undefined,
    email: post.acf?.email || undefined,
    image:
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
      `https://picsum.photos/seed/staff-${post.id}/220/260`,
  }));

  return {
    hero: {
      title: "Staff",
      subline: acf.stp_hero_subline || undefined,
      image: acf.stp_hero_image,
      breadcrumb: toArray(acf.stp_breadcrumb).map((b) => ({
        label: b.label,
        href: b.href,
      })),
    },

    subNavLabel: acf.stp_subnav_label || "Page Title",

    subNav: toArray(acf.stp_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),

    members,

    cta: {
      left: {
        title: acf.stp_cta_left_title || undefined,
        description: acf.stp_cta_left_description,
        cta: acf.stp_cta_left_label,
        href: acf.stp_cta_left_href?.url ?? "#",
      },
      right: {
        title: acf.stp_cta_right_title || undefined,
        description: acf.stp_cta_right_description,
        cta: acf.stp_cta_right_label,
        href: acf.stp_cta_right_href?.url ?? "#",
      },
    },
  };
}

export async function getDoctoralScholarsPage(): Promise<DoctoralScholarsPageData> {
  const acf = await getPageAcf<WpDoctoralScholarsLandingAcf>(
    "doctoral-scholars",
  );

  if (!acf) {
    console.warn(
      "[wordpress.ts] Doctoral Scholars page ACF not found — falling back to placeholder data.",
    );
    return {
      hero: {
        title: "Doctoral Scholars",
        image: "https://picsum.photos/seed/doctoral-scholars/1200/500",
        breadcrumb: [],
      },
      subNavLabel: "Page Title",
      subNav: [],
      doctoralScholars: { label: "Doctoral Scholars", members: [] },
      recentGraduates: { label: "Recent Graduates", members: [] },
      cta: {
        left: { description: "", cta: "Know More", href: "#" },
        right: { description: "", cta: "Know More", href: "#" },
      },
    };
  }

  const [scholarPosts, graduatePosts] = await Promise.all([
    wpFetch<WpDoctoralScholarPost[]>(
      `/wp/v2/doctoral-scholars?doctoral-type=${DOCTORAL_SCHOLARS_TERM_ID}&_embed=wp:featuredmedia&acf_format=standard&per_page=100`,
    ),
    wpFetch<WpDoctoralScholarPost[]>(
      `/wp/v2/doctoral-scholars?doctoral-type=${RECENT_GRADUATES_TERM_ID}&_embed=wp:featuredmedia&acf_format=standard&per_page=100`,
    ),
  ]);

  return {
    hero: {
      title: "Doctoral Scholars",
      subline: acf.dsp_hero_subline || undefined,
      image: acf.dsp_hero_image,
      breadcrumb: toArray(acf.dsp_breadcrumb).map((b) => ({
        label: b.label,
        href: b.href,
      })),
    },

    subNavLabel: acf.dsp_subnav_label || "Page Title",

    subNav: toArray(acf.dsp_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),

    doctoralScholars: {
      label: "Doctoral Scholars",
      members: scholarPosts.map(mapDoctoralScholarPost),
    },

    recentGraduates: {
      label: "Recent Graduates",
      members: graduatePosts.map(mapRecentGraduatePost),
    },

    cta: {
      left: {
        title: acf.dsp_cta_left_title || undefined,
        description: acf.dsp_cta_left_description,
        cta: acf.dsp_cta_left_label,
        href: acf.dsp_cta_left_href?.url ?? "#",
      },
      right: {
        title: acf.dsp_cta_right_title || undefined,
        description: acf.dsp_cta_right_description,
        cta: acf.dsp_cta_right_label,
        href: acf.dsp_cta_right_href?.url ?? "#",
      },
    },
  };
}

// ─── Raw WordPress shapes ────────────────────────────────────────────────────

interface WpTfpLinkField {
  title: string;
  url: string;
  target: string;
}

interface WpTfpBreadcrumb {
  label: string;
  href: string;
}

interface WpTfpSubNavLink {
  label: string;
  href: string;
}

interface WpTeachingFellowsLandingAcf {
  tfp_hero_subline: string;
  tfp_hero_image: string;
  tfp_breadcrumb: WpTfpBreadcrumb[] | false;
  tfp_subnav_label: string;
  tfp_subnav_links: WpTfpSubNavLink[] | false;
  tfp_cta_left_title: string;
  tfp_cta_left_description: string;
  tfp_cta_left_label: string;
  tfp_cta_left_href: WpTfpLinkField;
  tfp_cta_right_title: string;
  tfp_cta_right_description: string;
  tfp_cta_right_label: string;
  tfp_cta_right_href: WpTfpLinkField;
}

interface WpTeachingFellowPost {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: {
    position?: string;
    date_of_joining?: string; // "Ymd"
    office?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text: string }>;
  };
}

// ─── ⚠️ PLACEHOLDER taxonomy term map — replace with real slug/IDs ───────────
const TEACHING_FELLOW_TERMS: Array<{
  slug: string;
  label: string;
  termId: number;
}> = [
  { slug: "teaching-fellows", label: "Teaching Fellows", termId: 36 },
  { slug: "past-teaching-fellows", label: "Past Teaching Fellows", termId: 37 },
];

const TEACHING_FELLOW_TAXONOMY = "teaching-type";

/** "Ymd" e.g. "20260115" → "15 January, 2026" (full date, for Teaching Fellows) */
function parseYmdToFullDate(ymd: string | undefined): string {
  if (!ymd || ymd.length < 8) return "";
  const year = Number(ymd.slice(0, 4));
  const month = Number(ymd.slice(4, 6)) - 1;
  const day = Number(ymd.slice(6, 8));
  const date = new Date(year, month, day);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function mapTeachingFellowPost(
  post: WpTeachingFellowPost,
): TeachingFellowCardData {
  return {
    id: String(post.id),
    name: decodeHtml(post.title.rendered),
    position: post.acf?.position ?? "",
    dateOfJoining: parseYmdToFullDate(post.acf?.date_of_joining),
    office: post.acf?.office || undefined,
    image:
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
      `https://picsum.photos/seed/fellow-${post.id}/220/260`,
  };
}

export async function getTeachingFellowsPage(): Promise<TeachingFellowsPageData> {
  const acf = await getPageAcf<WpTeachingFellowsLandingAcf>(
    "teaching-fellows",
  );

  if (!acf) {
    console.warn(
      "[wordpress.ts] Teaching Fellows page ACF not found — falling back to placeholder data.",
    );
    return {
      hero: {
        title: "Teaching Fellows",
        image: "https://picsum.photos/seed/teaching-fellows/1200/500",
        breadcrumb: [],
      },
      subNavLabel: "Page Title",
      subNav: [],
      tabs: [],
      cta: {
        left: { description: "", cta: "Know More", href: "#" },
        right: { description: "", cta: "Know More", href: "#" },
      },
    };
  }

  const tabResults = await Promise.all(
    TEACHING_FELLOW_TERMS.map(({ termId }) =>
      wpFetch<WpTeachingFellowPost[]>(
        `/wp/v2/teaching-fellows?${TEACHING_FELLOW_TAXONOMY}=${termId}&_embed=wp:featuredmedia&acf_format=standard&per_page=100`,
      ),
    ),
  );

  const tabs: TeachingFellowsTabData[] = TEACHING_FELLOW_TERMS.map(
    (term, i) => ({
      slug: term.slug,
      label: term.label,
      members: tabResults[i].map(mapTeachingFellowPost),
    }),
  );

  return {
    hero: {
      title: "Teaching Fellows",
      subline: acf.tfp_hero_subline || undefined,
      image: acf.tfp_hero_image,
      breadcrumb: toArray(acf.tfp_breadcrumb).map((b) => ({
        label: b.label,
        href: b.href,
      })),
    },

    subNavLabel: acf.tfp_subnav_label || "Page Title",

    subNav: toArray(acf.tfp_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),

    tabs,

    cta: {
      left: {
        title: acf.tfp_cta_left_title || undefined,
        description: acf.tfp_cta_left_description,
        cta: acf.tfp_cta_left_label,
        href: acf.tfp_cta_left_href?.url ?? "#",
      },
      right: {
        title: acf.tfp_cta_right_title || undefined,
        description: acf.tfp_cta_right_description,
        cta: acf.tfp_cta_right_label,
        href: acf.tfp_cta_right_href?.url ?? "#",
      },
    },
  };
}

export async function getAlumniPage(): Promise<AlumniPageData> {
  const [acf, contact] = await Promise.all([
    getPageAcf<WpAlumniAcf>("alumni"),
    getSiteSettings(),
  ]);

  if (!acf) {
    console.warn(
      "[wordpress.ts] Alumni page ACF not found — using placeholder data.",
    );
    return {
      hero: { title: "Alumni", image: "https://picsum.photos/seed/alumni/900/600", breadcrumb: [] },
      subNavLabel: "Alumni",
      subNav: [],
      directorMessage: { title: "", name: "", role: "", image: "", bio: [] },
      intro: { title: "Alumni", image: "", email: "", paragraphs: [] },
      events: { title: "Events on Campus", rows: [] },
      memories: { title: "Campus Memories", cards: [] },
      newsletter: { title: "Alumni Newsletter", items: [] },
      usefulLinks: { title: "Other Useful Links", links: [] },
      contact,
    };
  }

  const normalize = (s: string) =>
    s.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  return {
    hero: {
      title: acf.al_hero_title,
      subline: acf.al_hero_subline || undefined,
      image: acf.al_hero_image,
    },

    subNavLabel: acf.al_subnav_label || "Alumni",

    subNav: toArray(acf.al_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),

    directorMessage: {
      title: acf.al_dir_title,
      name: acf.al_dir_name,
      role: acf.al_dir_role,
      image: acf.al_dir_image,
      bio: toArray(acf.al_dir_paragraphs).map((r) => normalize(r.paragraph)),
    },

    intro: {
      title: acf.al_intro_title,
      image: acf.al_intro_image,
      email: acf.al_intro_email,
      paragraphs: toArray(acf.al_intro_paragraphs).map((r) =>
        normalize(r.paragraph),
      ),
    },

    events: {
      title: acf.al_events_title,
      rows: toArray(acf.al_events_rows).map((row, i) => ({
        id: `row-${i}`,
        image: row.image,
        paragraphs: toArray(row.paragraphs).map((r) => normalize(r.paragraph)),
        button:
          row.button_label &&
          typeof row.button_href === "object" &&
          row.button_href?.url
            ? { label: row.button_label, href: row.button_href.url }
            : undefined,
        imageSide: row.image_side === "right" ? "right" : "left",
      })),
    },

    memories: {
      title: acf.al_mem_title,
      cards: toArray(acf.al_mem_cards).map((card, i) => ({
        id: `mem-${i}`,
        image: card.image,
        caption: card.caption,
        button: {
          label: card.button_label,
          href: card.button_href?.url ?? "#",
        },
      })),
    },

    newsletter: {
      title: acf.al_news_title,
      items: toArray(acf.al_news_items).map((item, i) => ({
        id: `news-${i}`,
        image: item.image,
        caption: item.caption,
        href:
          typeof item.href === "object" && item.href?.url
            ? item.href.url
            : undefined,
      })),
    },

    usefulLinks: {
      title: acf.al_links_title,
      links: toArray(acf.al_links_items).map((l) => ({
        label: l.label,
        href: l.href?.url ?? "#",
      })),
    },

    // ✅ Live from Site Settings options page (already built)
    contact,
  };
}

export async function getResourcesPage(): Promise<ResourcesPageData> {
  const acf = await getPageAcf<WpResourcesAcf>("resources");

  if (!acf) {
    console.warn(
      "[wordpress.ts] Resources page ACF not found — using placeholder data.",
    );
    return {
      hero: { title: "Resource", image: "https://picsum.photos/seed/resources/1200/500", breadcrumb: [] },
      subNavLabel: "Academic Areas",
      subNav: [],
      cards: [],
    };
  }

  return {
    hero: {
      title: acf.re_hero_title,
      subline: acf.re_hero_subline || undefined,
      image: acf.re_hero_image,
    },

    subNavLabel: acf.re_subnav_label || "Academic Areas",

    subNav: toArray(acf.re_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),

    cards: toArray(acf.re_cards).map((c, i) => ({
      id: String(i),
      label: c.label,
      icon: c.icon,
      href: c.href?.url ?? "#",
    })),
  };
}

export async function getPoliciesPage(): Promise<PoliciesPageData> {
  const acf = await getPageAcf<WpPoliciesAcf>("policies");

  if (!acf) {
    console.warn(
      "[wordpress.ts] Policies page ACF not found — using placeholder data.",
    );
    return {
      hero: { title: "Policies", image: "https://picsum.photos/seed/policies/1200/500", breadcrumb: [] },
      sectionTitle: "Policies",
      sectionSubtitle: "Click on the link below to view or download the policy",
      items: [],
    };
  }

  return {
    hero: {
      title: acf.pl_hero_title,
      subline: acf.pl_hero_subline || undefined,
      image: acf.pl_hero_image,
    },

    sectionTitle: acf.pl_section_title,
    sectionSubtitle: acf.pl_section_subtitle,

    items: toArray(acf.pl_items).map((item, i) => ({
      id: String(i),
      title: item.title,
      fileUrl: item.file,
    })),
  };
}

export async function getAnnualReportPage(): Promise<AnnualReportPageData> {
  const acf = await getPageAcf<WpAnnualReportAcf>("annual-report");
 
  if (!acf) {
    console.warn(
      "[wordpress.ts] Annual Report page ACF not found — using placeholder data.",
    );
    return {
      hero: { title: "Annual Report", image: "https://picsum.photos/seed/annual-report/1200/500", breadcrumb: [] },
      sectionTitle: "Annual Report",
      sectionSubtitle: "Click on the link below to view or download the policy",
      items: [],
    };
  }
 
  return {
    hero: {
      title: acf.ar_hero_title,
      subline: acf.ar_hero_subline || undefined,
      image: acf.ar_hero_image,
    },
 
    sectionTitle: acf.ar_section_title,
    sectionSubtitle: acf.ar_section_subtitle,
 
    items: toArray(acf.ar_items).map((item, i) => ({
      id: String(i),
      coverImage: item.cover_image,
      year: item.year,
      fileUrl: item.file,
    })),
  };
}

export async function getConvocationPage(): Promise<ConvocationPageData> {
  const acf = await getPageAcf<WpConvocationPageAcf>("convocation");

  if (!acf) {
    console.warn(
      "[wordpress.ts] Convocation page ACF not found — using placeholder data.",
    );
    return {
      hero: { title: "Convocation", image: "https://picsum.photos/seed/convocation/1200/500", breadcrumb: [] },
      subNavLabel: "Convocation",
      subNav: [],
      cards: [],
    };
  }

  const posts = await wpFetch<WpConvocationPost[]>(
    `/wp/v2/convocation?_embed=wp:featuredmedia&acf_format=standard&per_page=20&orderby=date&order=desc`,
  );

  return {
    hero: {
      title: acf.cv_hero_title,
      subline: acf.cv_hero_subline || undefined,
      image: acf.cv_hero_image,
    },

    subNavLabel: acf.cv_subnav_label || "Convocation",

    subNav: toArray(acf.cv_subnav_links).map((l) => ({
      label: l.label,
      href: l.href,
    })),

    cards: posts.map((post) => ({
      id: String(post.id),
      title: decodeHtml(post.title.rendered),
      date: parseYmdToFullDate(post.acf?.convocation_date),
      image:
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
        `https://picsum.photos/seed/convocation-${post.id}/680/420`,
    })),
  };
}