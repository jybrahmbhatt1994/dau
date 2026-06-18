import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import type { DeanDeskContent } from "@/lib/types";

/**
 * "Message from Dean's Desk" — a left-bleeding gold-underline title, then a
 * two-column block: the message + signatory (name / role) on the left and the
 * portrait on the right. On mobile the portrait stacks on top of the message.
 *
 * Sits on a `surface` band with TOP padding only; the <ContactPills> component
 * (which has bottom padding only) is meant to render directly beneath it so the
 * two read as one continuous grey band — exactly as on the Dean (Student) page.
 */
export function DeanDeskMessage({ data }: { data: DeanDeskContent }) {
  return (
    <section id="message" className="scroll-mt-[150px] bg-surface pt-16 lg:pt-20">
      <Container>
        <BleedTitle title={data.title} />

        <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-12 lg:grid-cols-[1fr_410px] lg:gap-14">
          {/* Message + signatory */}
          <div className="order-2 lg:order-1">
            <div className="space-y-5 text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
              {data.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-10">
              <p className="font-display text-xl font-semibold tracking-wide text-navy">
                {data.name}
              </p>
              <p className="mt-1 text-sm text-ash">{data.role}</p>
            </div>
          </div>

          {/* Portrait */}
          <div className="order-1 lg:order-2 lg:col-start-2">
            <div className="relative aspect-[7/8] w-full max-w-[410px] overflow-hidden bg-line">
              <Image
                src={data.image}
                alt={data.name}
                fill
                sizes="(min-width: 1024px) 410px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}