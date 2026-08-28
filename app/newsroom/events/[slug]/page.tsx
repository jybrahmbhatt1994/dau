import { notFound } from "next/navigation";
import { getEventDetailPage, getAllEventSlugs } from "@/lib/wordpress";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import EventImagesOneByOne from "@/components/events/EventImagesOneByOne";
import EventImageGrid from "@/components/events/EventImageGrid";
import EventVideoEmbed from "@/components/events/EventVideoEmbed";

export const revalidate = 60;

type ParamsPromise = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const slugs = await getAllEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: ParamsPromise }) {
  const { slug } = await params;
  const event = await getEventDetailPage(slug);
  if (!event) return {};
  return {
    title: event.hero.title,
    openGraph: { images: [event.hero.image] },
  };
}

export default async function EventSinglePage({ params }: { params: ParamsPromise }) {
  const { slug } = await params;
  const event = await getEventDetailPage(slug);
  if (!event) notFound();

  return (
    <article>
      <PageHero
        title={event.hero.title}
        subline={event.hero.subline}
        image={event.hero.image}
        breadcrumb={event.hero.breadcrumb}
        titleClassName="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-semibold leading-tight text-white"
      />

      <Container className="py-10">
        {event.content ? (
          <section
            className="max-w-none text-base leading-relaxed text-gray-800 [&>p]:mb-5 [&>p:last-child]:mb-0"
            dangerouslySetInnerHTML={{ __html: event.content }}
          />
        ) : null}

        {event.imagesOneByOne.length > 0 ? (
          <div className="mt-8">
            <EventImagesOneByOne images={event.imagesOneByOne} />
          </div>
        ) : null}

        {event.imagesGrid.length > 0 ? (
          <div className="mt-8">
            <EventImageGrid images={event.imagesGrid} />
          </div>
        ) : null}

        {event.video ? (
          <div className="mt-8">
            <EventVideoEmbed embedHtml={event.video} />
          </div>
        ) : null}
      </Container>
    </article>
  );
}