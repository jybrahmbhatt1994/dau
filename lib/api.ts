/**
 * lib/api.ts
 * Base fetch utility for WordPress REST API.
 * All WordPress data access goes through here — one place to handle
 * errors, revalidation, and the base URL.
 */

const WP_URL = process.env.WORDPRESS_API_URL;

if (!WP_URL) {
  throw new Error("WORDPRESS_API_URL is not set in environment variables.");
}

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Fetch any WordPress REST API endpoint.
 * @param endpoint  Path after /wp-json — e.g. "/wp/v2/pages?slug=home"
 * @param revalidate  ISR seconds (default 60). Pass 0 to disable caching.
 */
export async function wpFetch<T>(
  endpoint: string,
  revalidate = 60,
): Promise<T> {
  const url = `${WP_URL}/wp-json${endpoint}`;

  const effectiveRevalidate =
    process.env.NODE_ENV === "development" ? 0 : revalidate;

  const fetchOptions: RequestInit =
    effectiveRevalidate === 0
      ? { cache: "no-store" }
      : { next: { revalidate: effectiveRevalidate } };

  const MAX_ATTEMPTS = 3;
  let lastErr: unknown;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetchWithTimeout(url, fetchOptions);
      if (!res.ok) {
        throw new Error(`WordPress API error: ${res.status} ${res.statusText} — ${url}`);
      }
      return (await res.json()) as T;
    } catch (err) {
      lastErr = err;
      if (attempt < MAX_ATTEMPTS) {
        // small backoff before retrying — gives Hostinger's PHP-FPM
        // a moment to warm up instead of failing immediately
        await new Promise((r) => setTimeout(r, 400 * attempt));
      }
    }
  }

  console.error(`[wpFetch] All ${MAX_ATTEMPTS} attempts failed for ${url}`, lastErr);
  throw lastErr;
}

/**
 * Fetch a single WordPress page by slug and return its ACF fields.
 * Returns null if the page is not found.
 */
// export async function getPageAcf<T>(
//   slug: string,
//   revalidate = 60,
// ): Promise<T | null> {
//   const pages = await wpFetch<Array<{ acf: T }>>(
//     `/wp/v2/pages?slug=${slug}&acf_format=standard&_fields=id,slug,acf`,
//     revalidate,
//   );

//   if (!pages || pages.length === 0) return null;

//   return pages[0].acf;
// }
export async function getPageAcf<T>(
  slug: string,
  revalidate?: number,
): Promise<T | null> {
  try {
    const pages = await wpFetch<Array<{ acf: T }>>(
      `/wp/v2/pages?slug=${slug}&acf_format=standard&_fields=id,slug,acf`,
      revalidate,
    );
    return pages[0]?.acf ?? null;
  } catch (err) {
    console.warn(`[getPageAcf] Failed for slug "${slug}":`, err);
    return null;
  }
}

/**
 * Wraps wpFetch with a fallback value on failure. Use this for any
 * build-time fetch where a transient WP error shouldn't take down the
 * whole page/build — the page just renders with an empty/fallback list,
 * and ISR (revalidate) will pick up real data on the next request.
 */
export async function wpFetchSafe<T>(
  endpoint: string,
  fallback: T,
  revalidate?: number,
): Promise<T> {
  try {
    return await wpFetch<T>(endpoint, revalidate);
  } catch (err) {
    console.warn(`[wpFetchSafe] Failed: ${endpoint}`, err);
    return fallback;
  }
}