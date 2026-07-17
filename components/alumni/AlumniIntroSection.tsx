import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import type { AlumniIntroData } from "@/lib/types";

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="h-5 w-5 shrink-0 text-navy"
    >
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  );
}

/**
 * DESTINATION: components/alumni/AlumniIntroSection.tsx
 *
 * "Alumni" — image + cream contact pill on the left, prose paragraphs on
 * the right. White background.
 */
export function AlumniIntroSection({ data }: { data: AlumniIntroData }) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <BleedTitle title={data.title} />

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[420px_1fr] lg:gap-14">
          <div>
            <div className="relative aspect-[420/280] w-full overflow-hidden bg-line">
              <Image
                src={data.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover"
              />
            </div>

            <a
              href={`mailto:${data.email}`}
              className="mt-4 flex items-center justify-center gap-3 bg-[#F6EFD9] px-6 py-4 font-display text-base font-semibold text-navy transition-colors hover:bg-[#efe6c8]"
            >
              <MailIcon />
              {data.email}
            </a>
          </div>

          <div className="space-y-5 text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
            {data.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}