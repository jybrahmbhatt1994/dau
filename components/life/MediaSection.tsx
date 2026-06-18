import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import { ProgramGallery } from "@/components/academics/ProgramGallery";
import { MediaCarousel } from "@/components/life/MediaCarousel";
import type { FeatureSection } from "@/lib/types";

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-5 text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
      {paragraphs.map((p, idx) => (
        <p key={idx}>{p}</p>
      ))}
    </div>
  );
}

/**
 * Generic "title + prose + media" feature block used repeatedly on the Campus
 * Life page. The media slot is a discriminated union:
 *  - `gallery`  → full-bleed centered-slides image gallery (ProgramGallery)
 *  - `duo`      → two equal images side by side
 *  - `carousel` → single-image carousel with arrows + optional caption
 *
 * Optional `afterParagraphs` render BELOW the media (e.g. Student Life).
 * Background is set via `className`.
 */
export function MediaSection({
  data,
  className = "bg-white",
}: {
  data: FeatureSection;
  className?: string;
}) {
  const { media } = data;

  return (
    <section
      id={data.id}
      className={`scroll-mt-[150px] overflow-x-clip py-16 lg:py-20 ${className}`}
    >
      <Container>
        <BleedTitle title={data.title} />
        <div className="mt-8">
          <Prose paragraphs={data.paragraphs} />
        </div>
      </Container>

      {/* Media */}
      {media.kind === "gallery" && (
        <ProgramGallery images={media.images} aspect="aspect-[15/16]" />
      )}

      {media.kind === "duo" && (
        <Container className="mt-10 lg:mt-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
            {media.images.map((src, idx) => (
              <div
                key={idx}
                className="relative aspect-[5/4] w-full overflow-hidden bg-line"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </Container>
      )}

      {media.kind === "carousel" && (
        <Container>
          <MediaCarousel slides={media.slides} />
        </Container>
      )}

      {data.afterParagraphs && data.afterParagraphs.length > 0 && (
        <Container className="mt-10 lg:mt-12">
          <Prose paragraphs={data.afterParagraphs} />
        </Container>
      )}
    </section>
  );
}