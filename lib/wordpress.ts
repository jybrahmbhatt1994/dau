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

import { getPageAcf } from "@/lib/api";

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
} from "@/lib/types";

// ============================================================================
//  WORDPRESS RAW SHAPES
//  One interface per SCF field group. Only the fields we use are typed.
//  The *_source fields returned by SCF's REST layer are intentionally omitted.
// ============================================================================

// ─── Home page ───────────────────────────────────────────────────────────────

interface WpHeroImage {
  image: string;
  alt: string;
}

/**
 * Raw ACF shape for the Home page.
 * Add more field groups here as each section is migrated from mock → WP.
 */
interface WpHomeAcf {
  // Hero (✅ live)
  hero_eyebrow: string;
  hero_eyebrow_sub: string;
  hero_rank_label: string;
  hero_rank_value: string;
  hero_subline: string;
  hero_images: WpHeroImage[];

  // TODO — add these as each SCF field group is created:
  // academics_title, academics_description, academics_cards …
  // faculty_title, faculty_members …
  // etc.
}

// ============================================================================
//  MAPPERS
//  Pure functions: WP raw shape → lib/types.ts shape.
//  No business logic, no side effects.
// ============================================================================

function mapHero(acf: WpHomeAcf): HeroContent {
  return {
    eyebrow: acf.hero_eyebrow,
    // Empty string from WP → undefined (matches the optional type)
    eyebrowSub: acf.hero_eyebrow_sub || undefined,
    rankLabel: acf.hero_rank_label,
    rankValue: acf.hero_rank_value,
    subline: acf.hero_subline,
    // Repeater rows → plain string[] (alt is stored in WP but not in HeroContent type)
    images: (acf.hero_images ?? []).map((row) => row.image),
  };
}

// ============================================================================
//  DATA ACCESSORS
//  These are the only functions page components call.
//  Each one will eventually be 100% WordPress-powered.
// ============================================================================

// ─── Home ────────────────────────────────────────────────────────────────────

export async function getHomeData(): Promise<HomeData> {
  const acf = await getPageAcf<WpHomeAcf>("home");

  if (!acf) {
    console.warn(
      "[wordpress.ts] Home page ACF not found — falling back to mock data. " +
      "Check: page slug is 'home', page is published, and 'Show in REST API' is enabled on the field group."
    );
    return homeData;
  }

  return {
    // ✅ Live from WordPress
    hero: mapHero(acf),

    // 🔄 Still from mock — replace each as its SCF group is created
    academics: homeData.academics,
    admissionCta: homeData.admissionCta,
    faculty: homeData.faculty,
    research: homeData.research,
    publications: homeData.publications,
    placements: homeData.placements,
    life: homeData.life,
    news: homeData.news,
    events: homeData.events,
    centers: homeData.centers,
    diversity: homeData.diversity,
    contact: homeData.contact,
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