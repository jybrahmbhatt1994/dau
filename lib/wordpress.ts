import type { HomeData, NavItem } from "@/lib/types";
import { homeData } from "@/data/home";
import { navigation } from "@/data/navigation";

/**
 * Data access layer — the single boundary between the UI and the CMS.
 *
 * Right now these return local mock content so the site renders without a
 * backend. To go headless with WordPress, replace the bodies with `fetch`
 * calls and MAP the response into the types in lib/types.ts. The components
 * never change.
 *
 * Example (WPGraphQL):
 *
 *   const res = await fetch(`${process.env.WORDPRESS_API_URL}/graphql`, {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({ query: HOME_QUERY }),
 *     next: { revalidate: 60 }, // ISR
 *   });
 *   const { data } = await res.json();
 *   return mapHome(data);
 *
 * Example (REST):
 *
 *   const posts = await fetch(
 *     `${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/posts?_embed`,
 *     { next: { revalidate: 60 } }
 *   ).then((r) => r.json());
 */

export async function getHomeData(): Promise<HomeData> {
  return homeData;
}

export async function getNavigation(): Promise<NavItem[]> {
  return navigation;
}
