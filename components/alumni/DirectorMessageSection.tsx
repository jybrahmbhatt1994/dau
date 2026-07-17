import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import type { LeaderProfileContent } from "@/lib/types";

/**
 * DESTINATION: components/alumni/DirectorMessageSection.tsx
 *
 * "Message From Director General" — paragraphs + signature on the left,
 * portrait on the right. Surface background.
 */
export function DirectorMessageSection({
  data,
}: {
  data: LeaderProfileContent;
}) {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        <BleedTitle title={data.title} />

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px] lg:gap-14">
          <div>
            <div className="space-y-5 text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
              {data.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-8">
              <p className="font-display text-xl font-semibold text-navy">
                {data.name}
              </p>
              <p className="mt-1 text-sm text-ash">{data.role}</p>
            </div>
          </div>

          <div className="relative aspect-[3/4] w-full overflow-hidden bg-line">
            <Image
              src={data.image}
              alt={data.name}
              fill
              sizes="(min-width: 1024px) 360px, 100vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}