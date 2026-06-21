import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { TitledProseSection } from "@/components/admission/TitledProseSection";
import { ProgramSlider } from "@/components/academics/ProgramSlider";
import { FaqSection } from "@/components/academics/FaqSection";
import { ContactPills } from "@/components/academics/ContactPills";
import { SplitCta } from "@/components/academics/SplitCta";
import { getFinancialSupportPage } from "@/lib/wordpress";

export const metadata = {
  title: "Financial Support — Dhirubhai Ambani University",
  description:
    "DAU scholarships, merit-cum-means support, and external scholarship schemes available to DAU students.",
};

export default async function FinancialSupportPage() {
  const data = await getFinancialSupportPage();

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

      {/* ── DAU Scholarships (title + paragraph) ─────────────────────────── */}
      <TitledProseSection
        data={data.dauScholarships}
        id="dau-scholarships"
        className="bg-white"
      />

      {/* ── Other Scholarships (full-bleed-right card slider) ────────────── */}
      <div id="other-scholarships" className="scroll-mt-[150px]">
        <ProgramSlider data={data.otherScholarships} className="bg-white" />
      </div>

      {/* ── FAQs (surface bg) ────────────────────────────────────────────── */}
      <div id="faqs" className="scroll-mt-[150px]">
        <FaqSection data={data.faqs} />
      </div>

      {/* ── Contact pills (phone + email) ────────────────────────────────── */}
      <ContactPills phone={data.contact.phone} email={data.contact.email} />

      {/* ── Split CTA: Academic Calendar gold | Academic Areas red ────────── */}
      <SplitCta
        calendar={data.cta.left}
        catalogue={data.cta.right}
      />
    </>
  );
}