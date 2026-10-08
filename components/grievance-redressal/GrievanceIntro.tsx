import Image from "next/image";
import { Container } from "@/components/ui/Container";
import type { GrievanceIntroContent } from "@/lib/types";

export function GrievanceIntro({ data }: { data: GrievanceIntroContent }) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px] lg:gap-16">
          <div>
            <h1 className="max-w-2xl font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-tight text-navy">
              {data.title}
            </h1>

            <div className="mt-6 space-y-5 text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
              {data.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={data.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 380px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
