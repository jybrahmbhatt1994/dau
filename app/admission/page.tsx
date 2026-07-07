import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { AdmissionsBanner } from "@/components/academics/AdmissionsBanner";
import { AdmissionExplorer } from "@/components/admission/AdmissionExplorer";
import { ContactPills } from "@/components/academics/ContactPills";
import { SplitCta } from "@/components/academics/SplitCta";
import { getAdmissionPage, getAdmissionDataset } from "@/lib/wordpress";

export const metadata = {
  title: "Admissions — Dhirubhai Ambani University",
  description:
    "Explore admissions across Undergraduate, Dual Degree, Postgraduate and Ph.D programs at DAU. Important dates, eligibility, fee structure, scholarships, and the complete application guide.",
};

/**
 * /admission — stream/course/category filter page.
 *
 * Deep-links are server-rendered: /admission?stream=undergraduate&course=
 * btech-ict&category=all-india resolves its dataset here so the content is
 * in the initial HTML (SEO, no client flash). A bare /admission visit renders
 * the empty "Find your program" state per spec.
 *
 * Note: reading searchParams makes this route dynamically rendered — correct
 * here, since each filter permutation is a distinct shareable page state.
 */
export default async function AdmissionPage({
  searchParams,
}: {
  searchParams: { stream?: string; course?: string; category?: string };
}) {
  const data = await getAdmissionPage();

  const { stream, course, category } = searchParams;
  const initialDataset = course
    ? await getAdmissionDataset(course, category)
    : null;

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

      {/* ── Stream → Course → Category filter + resolved content stack ───── */}
      <AdmissionExplorer
        filter={data.filter}
        initialSelection={{
          stream: stream ?? "",
          course: course ?? "",
          category: category ?? "",
        }}
        initialDataset={initialDataset}
      />

      {/* ── Contact pills (phone + email) — shared across all selections ── */}
      <ContactPills phone={data.contact.phone} email={data.contact.email} />

      {/* ── Split CTA: Academic Calendar gold | Academic Areas red ────────── */}
      <SplitCta calendar={data.cta.left} catalogue={data.cta.right} />
    </>
  );
}