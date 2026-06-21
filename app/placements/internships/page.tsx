import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { AdmissionsBanner } from "@/components/academics/AdmissionsBanner";
import { ProseIntro } from "@/components/layout/ProseIntro";
import { ImageCarousel } from "@/components/faculty/ImageCarousel";
import { SplitCta } from "@/components/academics/SplitCta";
import { getInternshipsPage } from "@/lib/wordpress";

export const metadata = {
  title: "Internships — Dhirubhai Ambani University",
  description:
    "Internship opportunities and recent industry collaborations for DAU students.",
};

export default async function InternshipsPage() {
  const data = await getInternshipsPage();

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

      {/* ── Intro prose (surface bg) ─────────────────────────────────────── */}
      <ProseIntro paragraphs={data.intro} className="bg-surface" />

      {/* ── Image carousel (surface bg, no top padding so it reads as one
           continuous band with the intro above) ──────────────────────────── */}
      <section className="bg-surface pb-16 lg:pb-20">
        <ImageCarousel slides={data.carousel.slides} />
      </section>

      {/* ── Split CTA (title-less) ───────────────────────────────────────── */}
      <SplitCta
        calendar={data.cta.left}
        catalogue={data.cta.right}
      />
    </>
  );
}