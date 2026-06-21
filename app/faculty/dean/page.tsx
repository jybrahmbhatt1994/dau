import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { DeanFacultyDesk } from "@/components/faculty/DeanFacultyDesk";
import { SplitCta } from "@/components/academics/SplitCta";
import { getDeanFacultyPage } from "@/lib/wordpress";

export const metadata = {
  title: "Dean (Faculty) — Dhirubhai Ambani University",
  description:
    "Message from the Dean of Faculty Affairs at Dhirubhai Ambani University.",
};

export default async function DeanFacultyPage() {
  const data = await getDeanFacultyPage();

  return (
    <>
      {/* ── Inner-page hero ──────────────────────────────────────────────── */}
      <PageHero
        title={data.hero.title}
        subline={data.hero.subline}
        image={data.hero.image}
        breadcrumb={data.hero.breadcrumb}
      />

      {/* ── Lavender sticky sub-nav ───────────────────────────────────────── */}
      <PageSubNav label={data.subNavLabel} links={data.subNav} />

      {/* ── Message from Dean's Desk + lavender email pill ───────────────── */}
      <DeanFacultyDesk data={data.desk} />

      {/* ── Split CTA: Faculties @ DAU gold | Faculty Recruitment red ────── */}
      <SplitCta
        calendar={data.cta.left}
        catalogue={data.cta.right}
      />
    </>
  );
}