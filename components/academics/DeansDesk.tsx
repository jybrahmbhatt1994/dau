import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import type { DeansDeskContent } from "@/lib/types";

function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  );
}

export function DeansDesk({ data }: { data: DeansDeskContent }) {
  return (
    <section id="message" className="scroll-mt-24 bg-white py-16 lg:py-20">
      <Container>
        <BleedTitle title={data.title} />

        {/* Message + portrait */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_365px] lg:gap-14">
          <div className="space-y-5 text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
            {data.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="row-start-1 lg:col-start-2">
            <div className="relative aspect-[4/5] w-full max-w-[365px] overflow-hidden">
              <Image
                src={data.image}
                alt={data.title}
                fill
                sizes="(min-width: 1024px) 365px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Functions of Office of the Dean — sub-section, full width */}
        <div className="mt-14 lg:mt-16">
          <h3 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-semibold text-navy">
            {data.functionsTitle}
          </h3>
          <div className="mt-6 space-y-5 text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
            {data.functionsParagraphs?.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {/* Email pill */}
        <div className="mt-12 flex justify-center lg:mt-14">
          <a
            href={`mailto:${data.email}`}
            className="inline-flex items-center gap-4 bg-[#ECEDFF] px-8 py-4 font-display text-lg font-semibold text-navy transition-colors hover:bg-[#dfe2fb] sm:px-12 sm:text-xl"
          >
            <MailIcon className="h-6 w-6 text-navy" />
            {data.email}
          </a>
        </div>
      </Container>
    </section>
  );
}