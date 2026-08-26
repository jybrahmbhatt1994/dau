import { notFound } from "next/navigation";
import { getNewsDetailPage, getAllNewsSlugs } from "@/lib/wordpress";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import NewsImageGrid from "@/components/news/NewsImageGrid";
import NewsVideoEmbed from "@/components/news/NewsVideoEmbed";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const news = await getNewsDetailPage(params.slug);
  if (!news) return {};
  return {
    title: news.hero.title,
    openGraph: { images: [news.hero.image] },
  };
}

export default async function NewsSinglePage({ params }: { params: { slug: string } }) {
  const news = await getNewsDetailPage(params.slug);
  if (!news) notFound();

  return (
    <article>
      <PageHero
        title={news.hero.title}
        subline={news.hero.subline}
        image={news.hero.image}
        breadcrumb={news.hero.breadcrumb}
        titleClassName="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-semibold leading-tight text-white"
      />

      <Container className="py-10">
        {news.content ? (
          <section
            className="max-w-none text-base leading-relaxed text-gray-800 [&>p]:mb-5 [&>p:last-child]:mb-0"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        ) : null}

        {news.fullWidthImage ? (
          <div className="mt-8">
            <img
              src={news.fullWidthImage.url}
              alt={news.fullWidthImage.alt || news.hero.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
        ) : null}

        {news.imagesGrid.length > 0 ? (
          <div className="mt-8">
            <NewsImageGrid images={news.imagesGrid} />
          </div>
        ) : null}

        {news.video ? (
          <div className="mt-8">
            <NewsVideoEmbed embedHtml={news.video} />
          </div>
        ) : null}
      </Container>
    </article>
  );
}