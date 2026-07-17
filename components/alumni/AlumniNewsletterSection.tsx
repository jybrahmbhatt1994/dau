import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import type { AlumniNewsletterSectionData } from "@/lib/types";

/**
 * DESTINATION: components/alumni/AlumniNewsletterSection.tsx
 *
 * Cards are centered as a group (flex + justify-center, fixed card width)
 * instead of stretching across a fixed-column grid — works correctly
 * whether there are 2 covers or 20. Thin border added around each cover.
 */
export function AlumniNewsletterSection({
  data,
}: {
  data: AlumniNewsletterSectionData;
}) {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        <BleedTitle title={data.title} />

        <div className="mt-10 flex flex-wrap justify-center gap-8">
          {data.items.map((item) => {
            const Wrapper = item.href ? Link : "div";
            const wrapperProps = item.href ? { href: item.href } : {};

            return (
              <div key={item.id} className="w-[220px] flex-none">
                <Wrapper
                  {...(wrapperProps as any)}
                  className="relative block aspect-[3/4] w-full overflow-hidden border border-line bg-white"
                >
                  <Image
                    src={item.image}
                    alt={item.caption}
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                </Wrapper>
                <p className="mt-3 text-center text-sm text-ash">
                  {item.caption}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}