import Image from "next/image";
import { Container } from "@/components/ui/Container";
import type { DeanMessageContent } from "@/lib/types";

/**
 * "Message from the Desk of Dean" — heading + body copy + email on the left,
 * portrait on the right. Collapses to a single column on mobile (portrait
 * moves below the text).
 */
export function DeanMessage({ data }: { data: DeanMessageContent }) {
  return (
    <section id="dean" className="scroll-mt-24 bg-white py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
          {/* Text */}
          <div className="order-2 lg:order-1">
            <h2 className="max-w-xl font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-tight text-navy">
              {data.title}
            </h2>

            <div className="mt-8 space-y-5 text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
              {data.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <a
              href={`mailto:${data.email}`}
              className="mt-8 inline-block font-sans text-base font-bold text-navy transition-colors hover:text-brand"
            >
              {data.email}
            </a>
          </div>

          {/* Portrait */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] w-full max-w-[360px] overflow-hidden lg:sticky lg:top-28">
              <Image
                src={data.image}
                alt={data.title}
                fill
                sizes="(min-width: 1024px) 360px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
