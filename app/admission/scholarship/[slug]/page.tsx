// app/admission/scholarship/[slug]/page.tsx

import { ScholarshipDetailPage } from "@/components/admission/ScholarshipDetailPage";
import { getScholarshipDetailPage } from "@/lib/wordpress";
import { wpFetch } from "@/lib/api";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const posts = await wpFetch<Array<{ slug: string }>>(
      "/wp/v2/scholarship?_fields=slug&per_page=100",
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
  const data = await getScholarshipDetailPage(slug);
  return {
    title: `${data.hero.title} — Dhirubhai Ambani University`,
    description: data.intro.paragraphs[0]?.slice(0, 160) ?? undefined,
  };
}

export default async function ScholarshipDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getScholarshipDetailPage(slug);
  return <ScholarshipDetailPage data={data} />;
}