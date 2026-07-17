import Image from "next/image";
import { Container } from "@/components/ui/Container";
import type { ConvocationArticleData } from "@/lib/types";

/**
 * DESTINATION: components/convocation/ConvocationArticleSection.tsx
 * Bold H3 headline, then paragraphs on the left with 3 stacked photos on
 * the right (sidebar). White background.
 */
export function ConvocationArticleSection({
  data,
}: {
  data: ConvocationArticleData;
}) {
  return (
    <section className="bg-white py-12 lg:py-16">
      <Container>
        <h2 className="font-display text-2xl font-bold text-navy lg:text-[28px]">
          {data.title}
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
          <div className="space-y-5 text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
            {data.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {data.sidePhotos.length > 0 && (
            <div className="flex flex-col gap-5">
              {data.sidePhotos.map((photo, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-line"
                >
                  <Image
                    src={photo}
                    alt=""
                    fill
                    sizes="340px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}