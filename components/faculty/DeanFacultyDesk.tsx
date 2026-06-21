import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";

interface DeanFacultyDeskData {
  title: string;
  paragraphs: string[];
  name: string;
  role: string;
  image: string;
  email: string;
}

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

/**
 * Dean (Faculty) — "Message from Dean's Desk" section.
 *
 * Layout:
 *  - Left-bleeding BleedTitle
 *  - Two-column: prose + signatory (left) | portrait (right) — stacks on mobile
 *  - Single centered lavender (#ECEDFF) email pill below
 *
 * Background: white throughout. The desk pattern matches the Dean (Research)
 * page structure but with only an email pill (no phone) and on a white band
 * instead of the surface band.
 */
export function DeanFacultyDesk({ data }: { data: DeanFacultyDeskData }) {
  return (
    <section id="message" className="scroll-mt-[150px] bg-white py-16 lg:py-20">
      <Container>
        <BleedTitle title={data.title} />

        {/* Two-column: text left, portrait right */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-12 lg:grid-cols-[1fr_410px] lg:gap-14">
          {/* Message + signatory */}
          <div className="order-2 lg:order-1">
            <div className="space-y-5 whitespace-pre-line text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
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
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>

        {/* Lavender email pill — centered */}
        <div className="mt-14 flex justify-center lg:mt-16">
          <a
            href={`mailto:${data.email}`}
            className="inline-flex items-center gap-4 bg-[#ECEDFF] px-8 py-4 font-display text-base font-semibold text-navy transition-colors hover:bg-[#dfe2fb] sm:px-12 sm:text-lg"
          >
            <MailIcon className="h-5 w-5 text-navy" />
            {data.email}
          </a>
        </div>
      </Container>
    </section>
  );
}