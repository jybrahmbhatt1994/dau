import { notFound } from "next/navigation";
import {
  getPhotoGalleryDetailPage,
  getAllPhotoGallerySlugs,
} from "@/lib/wordpress";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { PhotoGalleryGrid } from "@/components/photo-gallery/PhotoGalleryGrid";

export const revalidate = 60;

type ParamsPromise = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const slugs = await getAllPhotoGallerySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: ParamsPromise }) {
  const { slug } = await params;
  const gallery = await getPhotoGalleryDetailPage(slug);
  if (!gallery) return {};
  return {
    title: gallery.hero.title,
    openGraph: { images: [gallery.hero.image] },
  };
}

export default async function PhotoGallerySinglePage({
  params,
}: {
  params: ParamsPromise;
}) {
  const { slug } = await params;
  const gallery = await getPhotoGalleryDetailPage(slug);
  if (!gallery) notFound();

  return (
    <article>
      <PageHero
        title={gallery.hero.title}
        subline={gallery.hero.subline}
        image={gallery.hero.image}
        breadcrumb={gallery.hero.breadcrumb}
      />

      <Container className="py-10">
        <PhotoGalleryGrid images={gallery.images} />
      </Container>
    </article>
  );
}
