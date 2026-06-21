import type {
  HomeData,
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

/**
 * Data access layer — the single boundary between the UI and the CMS.
 * Replace each body with a `fetch` + mapping into the lib/types.ts shapes to
 * go headless; components never change.
 */

export async function getHomeData(): Promise<HomeData> {
  return homeData;
}

export async function getNavigation(): Promise<NavItem[]> {
  return navigation;
}

export async function getAcademicsPage(): Promise<AcademicsData> {
  return academicsData;
}

export async function getDeanPage(): Promise<DeanPageData> {
  return deanPageData;
}

/** School of Technology (and future schools can share this accessor/shape). */
export async function getSchoolPage(): Promise<SchoolPageData> {
  return sotPageData;
}

/** Academic Areas sub-page (/academics/areas). */
export async function getAcademicAreasPage(): Promise<AcademicAreasPageData> {
  return academicAreasPageData;
}

/** Undergraduate Programs sub-page (/academics/ug-programs). */
export async function getUgProgramsPage(): Promise<UgProgramsPageData> {
  return ugProgramsPageData;
}

/** B.Tech (ICT) program detail page (/academics/btech-ict). */
export async function getProgramPage(): Promise<ProgramPageData> {
  return btechIctPageData;
}

/** About DAU page (/about). */
export async function getAboutPage(): Promise<AboutPageData> {
  return aboutPageData;
}

/** Leadership page (/about/leadership). */
export async function getLeadershipPage(): Promise<LeadershipPageData> {
  return leadershipPageData;
}

/** Administration page (/about/administration). */
export async function getAdministrationPage(): Promise<AdministrationPageData> {
  return administrationPageData;
}

/** Newsroom hub (/newsroom). */
export async function getNewsroomPage(): Promise<NewsroomPageData> {
  return newsroomPageData;
}

/** Photo Gallery (/newsroom/photo-gallery). */
export async function getPhotoGalleryPage(): Promise<PhotoGalleryPageData> {
  return photoGalleryPageData;
}

/** Newsletters (/newsroom/newsletters). */
export async function getNewslettersPage(): Promise<CardGridPageData> {
  return newslettersPageData;
}

/** Student Stories / In Focus (/infocus/student-stories). */
export async function getStudentStoriesPage(): Promise<CardGridPageData> {
  return studentStoriesPageData;
}

/** Dean (Student) page (/life/dean). */
export async function getDeanStudentPage(): Promise<DeanStudentPageData> {
  return deanStudentPageData;
}

/** Campus Life page (/life/campus). */
export async function getCampusLifePage(): Promise<CampusLifePageData> {
  return campusLifePageData;
}

/** Student Support page (/life/support). */
export async function getStudentSupportPage(): Promise<StudentSupportPageData> {
  return studentSupportPageData;
}

/** Fest & Events page (/life/events). */
export async function getFestEventsPage(): Promise<FestEventsPageData> {
  return festEventsPageData;
}

/** Dean (Research) page (/research/dean). */
export async function getDeanResearchPage(): Promise<DeanResearchPageData> {
  return deanResearchPageData;
}

/** Research Areas page (/research/areas). */
export async function getResearchAreasPage(): Promise<ResearchAreasPageData> {
  return researchAreasPageData;
}

/**
 * Research Area Detail page (/research/areas/[slug]).
 * When going headless: map slug → WP post / REST query and return typed data.
 */
export async function getResearchAreaDetailPage(
  _slug: string
): Promise<ResearchAreaDetailPageData> {
  // TODO: fetch by slug from WordPress when CMS is live
  return researchAreaDetailPageData;
}

/** Grants & Projects page (/research/grants). */
export async function getGrantsPage(): Promise<GrantsPageData> {
  return grantsPageData;
}

/** Awards & Recognition page (/research/awards). */
export async function getAwardsPage(): Promise<AwardsPageData> {
  return awardsPageData;
}

/** Faculty landing page (/faculty). */
export async function getFacultyPage(): Promise<FacultyPageData> {
  return facultyPageData;
}

/** Dean (Faculty) page (/faculty/dean). */
export async function getDeanFacultyPage(): Promise<DeanFacultyPageData> {
  return deanFacultyPageData;
}

/** Faculty Recruitment page (/faculty/recruitment). */
export async function getFacultyRecruitmentPage(): Promise<FacultyRecruitmentPageData> {
  return facultyRecruitmentPageData;
}

/** Faculty Handbook page (/faculty/handbook). */
export async function getFacultyHandbookPage(): Promise<FacultyHandbookPageData> {
  return facultyHandbookPageData;
}

/** Faculty Development & Evaluation page (/faculty/development). */
export async function getFacultyDevelopmentPage(): Promise<FacultyDevelopmentPageData> {
  return facultyDevelopmentPageData;
}

/** Placement Team page (/placements/team). */
export async function getPlacementTeamPage(): Promise<PlacementTeamPageData> {
  return placementTeamPageData;
}

/** Placement Stats page (/placements/stats). */
export async function getPlacementStatsPage(): Promise<PlacementStatsPageData> {
  return placementStatsPageData;
}

/** Top Recruiters page (/placements/recruiters). */
export async function getTopRecruitersPage(): Promise<TopRecruitersPageData> {
  return topRecruitersPageData;
}

/** Internships page (/placements/internships). */
export async function getInternshipsPage(): Promise<InternshipsPageData> {
  return internshipsPageData;
}

/** Undergraduate Admissions page (/admission/ug). */
export async function getUgAdmissionsPage(): Promise<UgAdmissionsPageData> {
  return ugAdmissionsPageData;
}

/** Financial Support page (/admission/financial-support). */
export async function getFinancialSupportPage(): Promise<FinancialSupportPageData> {
  return financialSupportPageData;
}

/** UG Scholarships page (/admission/scholarships). Reuses the
 *  FinancialSupportPageData shape — same template, different content. */
export async function getUgScholarshipsPage(): Promise<FinancialSupportPageData> {
  return ugScholarshipsPageData;
}