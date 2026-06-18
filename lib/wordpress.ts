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