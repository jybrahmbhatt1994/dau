import { notFound } from "next/navigation";
import { GrievanceTablePage } from "@/components/grievance-redressal/GrievanceTablePage";
import { getGrievanceTablePage } from "@/lib/wordpress";

export const revalidate = 60;

// The 3 "Grievance Redressal Authority" pages linked from accordion #3 on
// /grievance-redressal — fixed WP pages sharing one ACF field group.
const SLUGS = ["table-1-for-students", "table-2-for-faculty", "table-3-for-staff"];

type ParamsPromise = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: ParamsPromise }) {
  const { slug } = await params;
  if (!SLUGS.includes(slug)) return {};

  const data = await getGrievanceTablePage(slug);
  if (!data) return {};

  return {
    title: `${data.hero.title} — Dhirubhai Ambani University`,
    description: data.hero.subline?.slice(0, 160) ?? undefined,
  };
}

export default async function GrievanceTableRoute({ params }: { params: ParamsPromise }) {
  const { slug } = await params;
  if (!SLUGS.includes(slug)) notFound();

  const data = await getGrievanceTablePage(slug);
  if (!data) notFound();

  return <GrievanceTablePage data={data} />;
}
