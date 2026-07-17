import Image from "next/image";
import { Container } from "@/components/ui/Container";

/**
 * DESTINATION: components/academics/TextImageSection.tsx
 *
 * Two-column block: paragraphs on the left, a single image on the right.
 * Surface background. Stacks to a single column on mobile (image below text).
 */
export function TextImageSection({
  data,
}: {
  data: { paragraphs: string[]; image: string };
}) {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-5 text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
            {data.paragraphs.map((p, i) => (
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
      </Container>
    </section>
  );
}