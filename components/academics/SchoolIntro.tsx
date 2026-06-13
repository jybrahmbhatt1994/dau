import { Container } from "@/components/ui/Container";
import type { SchoolPageData } from "@/lib/types";

export function SchoolIntro({ data }: { data: SchoolPageData["intro"] }) {
  return (
    <section id="vision" className="scroll-mt-24 bg-white py-16 lg:py-20">
      <Container>
        {/* Intro paragraphs (full width) */}
        <div className="space-y-5 text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
          {data.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Vision / Mission */}
        <div className="mt-14 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-14">
          {[data.vision, data.mission].map((block) => (
            <div key={block.title}>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-none text-navy">
                {block.title}
              </h2>
              <p className="mt-6 text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
                {block.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}