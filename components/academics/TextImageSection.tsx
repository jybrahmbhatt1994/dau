import Image from "next/image";
import { Container } from "@/components/ui/Container";

/**
 * DESTINATION: components/academics/TextImageSection.tsx
 *
 * Image floats right; paragraphs flow as one block and wrap beside it.
 * Once the text passes the image's height, it naturally continues full
 * width — no fixed paragraph split needed, works even mid-paragraph.
 * On mobile the image drops below the text (order flipped via flex,
 * float only kicks in at lg since floats don't apply inside a flex parent).
 */
export function TextImageSection({
  data,
}: {
  data: { paragraphs: string[]; image: string };
}) {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        <div className="flex flex-col gap-10 lg:block">
          <div className="relative order-2 aspect-[16/11] w-full overflow-hidden lg:order-none lg:float-right lg:mb-10 lg:ml-14 lg:w-[46%]">
            <Image
              src={data.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="order-1 space-y-5 text-[15px] leading-7 text-black/80 lg:order-none lg:text-base lg:leading-8">
            {data.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* prevent the float from bleeding into whatever renders after this section */}
          <div className="lg:clear-both" />
        </div>
      </Container>
    </section>
  );
}