import { notFound } from "next/navigation";
import { getFestDetailPage, getAllFestSlugs } from "@/lib/wordpress";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import FestImageGrid from "@/components/fest/FestImageGrid";
import FestVideoEmbed from "@/components/fest/FestVideoEmbed";

export const revalidate = 60;

type ParamsPromise = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const slugs = await getAllFestSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: ParamsPromise }) {
  const { slug } = await params;
  const fest = await getFestDetailPage(slug);
  if (!fest) return {};
  return {
    title: fest.hero.title,
    openGraph: { images: [fest.hero.image] },
  };
}

export default async function FestSinglePage({ params }: { params: ParamsPromise }) {
  const { slug } = await params;
  const fest = await getFestDetailPage(slug);
  if (!fest) notFound();

  return (
    <article>
      <PageHero
        title={fest.hero.title}
        subline={fest.hero.subline}
        image={fest.hero.image}
        breadcrumb={fest.hero.breadcrumb}
        titleClassName="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-semibold leading-tight text-white"
      />

      <Container className="py-10">
        {fest.dateRangeDisplay ? (
          <p className="mb-6 font-display text-lg font-semibold text-navy">
            {fest.dateRangeDisplay}
          </p>
        ) : null}

        {fest.content ? (
          <section
            className="max-w-none text-base leading-relaxed text-gray-800 [&>p]:mb-5 [&>p:last-child]:mb-0"
            dangerouslySetInnerHTML={{ __html: fest.content }}
          />
        ) : null}

        {fest.images.length > 0 ? (
          <div className="mt-8">
            <FestImageGrid images={fest.images} />
          </div>
        ) : null}

        {fest.video ? (
          <div className="mt-8">
            <FestVideoEmbed embedHtml={fest.video} />
          </div>
        ) : null}
      </Container>
    </article>
  );
}