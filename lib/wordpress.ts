import type {
  HomeData,
  NavItem,
  AcademicsData,
  DeanPageData,
  SchoolPageData,
} from "@/lib/types";
import { homeData } from "@/data/home";
import { navigation } from "@/data/navigation";
import { academicsData } from "@/data/academics";
import { deanPageData } from "@/data/dean";
import { sotPageData } from "@/data/sot";

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