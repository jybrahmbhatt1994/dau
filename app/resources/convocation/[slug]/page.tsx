// app/resources/convocation/[slug]/page.tsx

import { ConvocationDetailPage } from "@/components/convocation/ConvocationDetailPage";
import { getConvocationDetailPage } from "@/lib/wordpress";
import { wpFetch } from "@/lib/api";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const posts = await wpFetch<Array<{ slug: string }>>(
      "/wp/v2/convocation?_fields=slug&per_page=100",
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
  const data = await getConvocationDetailPage(slug);
  return {
    title: `${data.hero.title} — Dhirubhai Ambani University`,
  };
}

export default async function ConvocationDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getConvocationDetailPage(slug);
  return <ConvocationDetailPage data={data} />;
}