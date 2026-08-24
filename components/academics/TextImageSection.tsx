import Image from "next/image";
import { Container } from "@/components/ui/Container";

/**
 * DESTINATION: components/academics/TextImageSection.tsx
 *
 * Two-column block: first `sideParagraphCount` paragraphs run beside the
 * image, remaining paragraphs break out to full width below.
 * Surface background. Stacks to a single column on mobile (image below text).
 */
export function TextImageSection({
  data,
  sideParagraphCount = 2,
}: {
  data: { paragraphs: string[]; image: string };
  sideParagraphCount?: number;
}) {
  const sideParagraphs = data.paragraphs.slice(0, sideParagraphCount);
  const fullWidthParagraphs = data.paragraphs.slice(sideParagraphCount);

  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-5 text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
            {sideParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="relative aspect-[16/11] w-full overflow-hidden">
            <Image
              src={data.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        {fullWidthParagraphs.length > 0 && (
          <div className="mt-10 space-y-5 text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
            {fullWidthParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}