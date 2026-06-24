/**
 * lib/api.ts
 * Base fetch utility for WordPress REST API.
 * All data access goes through here — one place to handle errors,
 * revalidation, and the base URL.
 */

const WP_URL = process.env.WORDPRESS_API_URL;

if (!WP_URL) {
  throw new Error("WORDPRESS_API_URL is not set in environment variables.");
}

/**
 * Fetch a WordPress REST API endpoint.
 * @param endpoint  Path after /wp-json  e.g. "/wp/v2/pages?slug=home&acf_format=standard"
 * @param revalidate  ISR revalidation in seconds (default 60). Pass 0 to disable caching.
 */
export async function wpFetch<T>(
  endpoint: string,
  revalidate = 60,
): Promise<T> {
  const url = `${WP_URL}/wp-json${endpoint}`;

  const res = await fetch(url, {
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(
      `WordPress API error: ${res.status} ${res.statusText} — ${url}`,
    );
  }

  return res.json() as Promise<T>;
}

/**
 * Fetch a single page by slug and return its ACF fields.
 * Returns null if the page is not found.
 */
export async function getPageAcf<T>(
  slug: string,
  revalidate = 10,
): Promise<T | null> {
  const pages = await wpFetch<Array<{ acf: T }>>(
    `/wp/v2/pages?slug=${slug}&acf_format=standard&_fields=id,slug,acf`,
    revalidate,
  );

  if (!pages || pages.length === 0) return null;

  return pages[0].acf;
}