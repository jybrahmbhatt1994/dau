// app/academics/program/[slug]/page.tsx  ⚠️ NOTE: same [slug] segment name as
// the category listing route — see IMPORTANT note below before placing this.

import { ProgramDetailPage } from "@/components/academics/ProgramDetailPage";
import { getProgramPage } from "@/lib/wordpress";
import { wpFetch } from "@/lib/api";

export const revalidate = 60;

// Pre-build every course slug at deploy time; ISR refreshes every 60s after.
export async function generateStaticParams() {
  try {
    const posts = await wpFetch<Array<{ slug: string }>>(
      "/wp/v2/course?_fields=slug&per_page=100",
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
  const data = await getProgramPage(slug);
  return {
    title: `${data.hero.title} — Dhirubhai Ambani University`,
    description: data.intro[0]?.slice(0, 160) ?? undefined,
  };
}

export default async function CourseDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getProgramPage(slug);
  return <ProgramDetailPage data={data} />;
}