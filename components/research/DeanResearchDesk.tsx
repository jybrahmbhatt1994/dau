import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";

interface DeanResearchDeskData {
  title: string;
  paragraphs: string[];
  name: string;
  role: string;
  image: string;
  phone: string;
  email: string;
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="h-5 w-5 text-navy"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

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
      className="h-5 w-5 text-navy"
    >
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  );
}

/**
 * Dean (Research) – "Message from Dean's Desk" section.
 *
 * Layout:
 *  - Left-bleeding BleedTitle
 *  - Two-column: prose + signatory (left) | portrait (right) — stacks on mobile
 *  - Contact pills (phone + email) centred below on the same `surface` band
 *
 * Sits on `bg-surface` with top padding only; the contact pills close the bottom
 * padding so the whole band reads as one continuous cream/grey block.
 */
export function DeanResearchDesk({ data }: { data: DeanResearchDeskData }) {
  return (
    <section id="message" className="scroll-mt-[150px] bg-surface pt-16 lg:pt-20">
      <Container>
        <BleedTitle title={data.title} />

        {/* Two-column: text left, portrait right */}
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
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Contact pills — bottom of the same surface band */}
      <div className="mt-14 pb-16 lg:mt-16 lg:pb-20">
        <Container>
          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
            <a
              href={`tel:${data.phone.replace(/[^+\d]/g, "")}`}
              className="inline-flex items-center gap-4 bg-[#F6EFD9] px-8 py-4 font-display text-base font-semibold text-navy transition-colors hover:bg-[#efe6c8] sm:text-lg"
            >
              <PhoneIcon />
              {data.phone}
            </a>
            <a
              href={`mailto:${data.email}`}
              className="inline-flex items-center gap-4 bg-[#F6EFD9] px-8 py-4 font-display text-base font-semibold text-navy transition-colors hover:bg-[#efe6c8] sm:text-lg"
            >
              <MailIcon />
              {data.email}
            </a>
          </div>
        </Container>
      </div>
    </section>
  );
}