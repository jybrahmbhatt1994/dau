import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { AdmissionsBanner } from "@/components/academics/AdmissionsBanner";
import { FacultyExplorer } from "@/components/faculty/FacultyExplorer";
import { SplitCta } from "@/components/academics/SplitCta";
import { getFacultyPage } from "@/lib/wordpress";

export const metadata = {
  title: "Faculty — Dhirubhai Ambani University",
  description:
    "Meet DAU's regular, visiting, distinguished, and international faculty across Information & Communication Technology and allied disciplines.",
};

export default async function FacultyPage() {
  const data = await getFacultyPage();

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

      {/* ── Tabs + search + paginated grid ───────────────────────────────── */}
      <FacultyExplorer tabs={data.tabs} />

      {/* ── Split CTA: Dean (Faculty) gold | Faculty Recruitment red ─────── */}
      <SplitCta
        calendar={data.cta.left}
        catalogue={data.cta.right}
      />
    </>
  );
}