import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import type { ConvocationChiefGuestData } from "@/lib/types";

/**
 * DESTINATION: components/convocation/ChiefGuestSection.tsx
 * Name/role/bio + leadership list on the left, portrait on the right.
 * Surface background.
 */
export function ChiefGuestSection({
  data,
}: {
  data: ConvocationChiefGuestData;
}) {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        <BleedTitle title={data.title} />

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px] lg:gap-14">
          <div>
            <h3 className="font-display text-xl font-bold text-navy">
              {data.name}
            </h3>
            <p className="mt-1 text-sm text-ash">{data.role}</p>

            <div className="mt-5 space-y-4 text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
              {data.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {data.leadershipPositions.length > 0 && (
              <div className="mt-8">
                <h4 className="font-display text-lg font-bold text-navy">
                  {data.leadershipTitle}
                </h4>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-black/80 marker:text-ash">
                  {data.leadershipPositions.map((pos, i) => (
                    <li key={i}>{pos}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="relative aspect-[3/4] w-full overflow-hidden bg-line">
            <Image
              src={data.image}
              alt={data.name}
              fill
              sizes="280px"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}