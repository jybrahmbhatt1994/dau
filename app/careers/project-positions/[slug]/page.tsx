// DESTINATION: app/careers/project-positions/[slug]/page.tsx

import { ProjectPositionDetailPage } from "@/components/work/ProjectPositionDetailPage";
import { getProjectPositionDetailPage } from "@/lib/wordpress";
import { wpFetch } from "@/lib/api";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const posts = await wpFetch<Array<{ slug: string }>>(
      "/wp/v2/project-position?_fields=slug&per_page=100",
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
  const data = await getProjectPositionDetailPage(slug);
  return {
    title: `${data.details.projectTitle} — Dhirubhai Ambani University`,
    description: data.introParagraph?.slice(0, 160) ?? undefined,
  };
}

export default async function ProjectPositionDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getProjectPositionDetailPage(slug);
  return <ProjectPositionDetailPage data={data} />;
}