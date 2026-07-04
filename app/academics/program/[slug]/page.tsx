import { ProgramsListingPage } from "@/components/academics/ProgramsListingPage";
import { getProgramsListingPage } from "@/lib/wordpress";
import { wpFetch } from "@/lib/api";

// DESTINATION: app/academics/program/[slug]/page.tsx
//
// This is the ROUTE file — it fetches data by slug and renders the
// ProgramsListingPage component. It MUST have a default export, which is
// what was missing/wrong before (the component's named export was placed
// here instead of a page with a default export).
//
// Headless note: this frontend path is independent of WordPress's own
// permalink for the same post — only the slug is used to query the REST API.

export const revalidate = 60;

// Pre-build all 4 (and any future) category slugs at deploy time.
export async function generateStaticParams() {
  try {
    const posts = await wpFetch<Array<{ slug: string }>>(
      "/wp/v2/pragrams-of-study?_fields=slug&per_page=100",
    );
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getProgramsListingPage(slug);
  return {
    title: `${data.hero.title} — Dhirubhai Ambani University`,
    description: data.intro[0]?.slice(0, 160) ?? undefined,
  };
}

// ── Default export — REQUIRED for any Next.js page.tsx ─────────────────────
export default async function ProgramCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getProgramsListingPage(slug);
  return <ProgramsListingPage data={data} />;
}