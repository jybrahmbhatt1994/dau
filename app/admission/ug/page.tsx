import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { AdmissionsBanner } from "@/components/academics/AdmissionsBanner";
import { UgAdmissionsExplorer } from "@/components/admission/UgAdmissionsExplorer";
import { ContactPills } from "@/components/academics/ContactPills";
import { SplitCta } from "@/components/academics/SplitCta";
import { getUgAdmissionsPage } from "@/lib/wordpress";

export const metadata = {
  title: "Undergraduate Admissions — Dhirubhai Ambani University",
  description:
    "Apply for the B.Tech programs at DAU. Important dates, eligibility, fee structure, scholarships, and the complete application guide.",
};

export default async function UgAdmissionsPage() {
  const data = await getUgAdmissionsPage();

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

      {/* ── Cream "Admissions are open" banner ────────────────────────────── */}
      <AdmissionsBanner
        text={data.applyBanner.text}
        cta={data.applyBanner.cta}
        href={data.applyBanner.href}
      />

      {/* ── Category tabs + per-category content (everything from Intro to
           FAQs swaps per active tab) ──────────────────────────────────────── */}
      <UgAdmissionsExplorer categories={data.categories} />

      {/* ── Contact pills (phone + email) — shared across all categories ── */}
      <ContactPills phone={data.contact.phone} email={data.contact.email} />

      {/* ── Split CTA: Academic Calendar gold | Academic Areas red ────────── */}
      <SplitCta
        calendar={data.cta.left}
        catalogue={data.cta.right}
      />
    </>
  );
}