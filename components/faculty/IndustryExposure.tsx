import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import { ImageCarousel } from "@/components/faculty/ImageCarousel";
import type { CarouselSlide } from "@/components/faculty/ImageCarousel";

export interface IndustryExposureData {
  title: string;
  introParagraphs: string[];
  bullets: string[];
  outroParagraphs?: string[];
  slides: CarouselSlide[];
}

/**
 * "Industry Exposure & Collaboration" — BleedTitle + intro prose + bullet
 * list + an image carousel with prev/next buttons and a caption.
 *
 * Mirrors the PolicySection content shape (paragraphs + bullets) but adds a
 * dedicated carousel block underneath instead of an optional CTA button.
 *
 * Background: white, py-16 lg:py-20.
 */
export function IndustryExposure({ data }: { data: IndustryExposureData }) {
  return (
    <section id="industry" className="scroll-mt-[150px] bg-white py-16 lg:py-20">
      <Container>
        <BleedTitle title={data.title} />

        <div className="mt-10 space-y-5 text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
          {data.introParagraphs.map((p, i) => (
            <p key={`intro-${i}`}>{p}</p>
          ))}

          {data.bullets && data.bullets.length > 0 && (
            <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-ash">
              {data.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}

          {data.outroParagraphs?.map((p, i) => (
            <p key={`outro-${i}`}>{p}</p>
          ))}
        </div>
      </Container>

      {/* Image carousel + caption */}
      <ImageCarousel slides={data.slides} />
    </section>
  );
}