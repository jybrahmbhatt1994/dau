import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { AdmissionsBanner } from "@/components/academics/AdmissionsBanner";
import { HandbookContent } from "@/components/faculty/HandbookContent";
import { SplitCta } from "@/components/academics/SplitCta";
import { getFacultyHandbookPage } from "@/lib/wordpress";

export const metadata = {
  title: "Faculty Handbook — Dhirubhai Ambani University",
  description:
    "Policies, procedures, and governance information for the DAU faculty. Download the official Faculty Handbook.",
};

export default async function FacultyHandbookPage() {
  const data = await getFacultyHandbookPage();

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

      {/* ── Cream apply banner ───────────────────────────────────────────── */}
      <AdmissionsBanner
        text={data.applyBanner.text}
        cta={data.applyBanner.cta}
        href={data.applyBanner.href}
      />

      {/* ── Handbook prose + centered gold download button ───────────────── */}
      <HandbookContent data={data.content} />

      {/* ── Split CTA: Dean (Faculty) gold | Faculty List red ────────────── */}
      <SplitCta
        calendar={data.cta.left}
        catalogue={data.cta.right}
      />
    </>
  );
}