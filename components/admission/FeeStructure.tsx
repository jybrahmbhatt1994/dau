import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import { ArrowRight } from "@/components/ui/icons";

export interface FeeCard {
  id: string;
  label: string;
  /** Display value (e.g. "Rs. 1,92,500 per Semester") */
  value: string;
  /** Optional small sub-note under the value (e.g. "Refundable at program end") */
  subNote?: string;
  /** When true, the value renders in brand red (e.g. the "Food" cell) */
  highlight?: boolean;
}

export interface FeeNoteBlock {
  /** Sub-heading shown in serif navy bold (e.g. "Value Added Course 1 Fee:") */
  heading: string;
  /** Paragraphs of explanatory copy */
  paragraphs: string[];
}

export interface EducationLoanBlock {
  heading: string;
  description: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface FeeStructureData {
  title: string;
  /** Intro paragraph above the cards */
  intro: string;
  /** Fee cells in the bordered grid (Tuition, Registration, Caution, Hostel, Food…) */
  cards: FeeCard[];
  /** Centered italic footnotes shown directly under the fee grid */
  footnotes: string[];
  /** Stack of sub-section notes (Value Added Course 1/2, etc.) */
  notes: FeeNoteBlock[];
  /** Education loan dark banner */
  educationLoan: EducationLoanBlock;
  /** Trailing centered note (e.g. refund policy) */
  refundNote: string;
}

/**
 * One fee cell inside the bordered grid. Label on top, value below in dark
 * navy bold (or brand red when `highlight`), with an optional sub-note.
 */
function FeeCell({ card }: { card: FeeCard }) {
  return (
    <div className="flex min-h-[150px] flex-col justify-between border-b border-r border-line bg-white p-5 lg:p-6">
      <p className="text-sm font-semibold text-navy">{card.label}</p>
      <div>
        <p
          className={`font-display text-base font-bold sm:text-lg ${
            card.highlight ? "text-brand" : "text-navy"
          }`}
        >
          {card.value}
        </p>
        {card.subNote && (
          <p className="mt-1 text-xs text-ash">{card.subNote}</p>
        )}
      </div>
    </div>
  );
}

/**
 * "Fee Structure" — comprehensive fee section.
 *
 * Layout (per Figma):
 *  - BleedTitle + intro paragraph
 *  - Bordered table-like grid of fee cells (Tuition, Registration, Caution
 *    Deposit w/ sub-note, Hostel Rent, then a "Food" cell with red value).
 *    Cells are joined by hairline borders (no gaps) so it reads as one table.
 *  - Two centered italic footnotes directly under the grid
 *  - Stack of sub-section notes with serif navy headings (Value Added Course 1/2)
 *  - Education Loan dark navy banner with description + GET DETAILS gold button
 *    + image on the right
 *  - Centered refund policy note at the bottom (larger text)
 *
 * Background: white, py-16 lg:py-20.
 */
export function FeeStructure({ data }: { data: FeeStructureData }) {
  return (
    <section id="fee-structure" className="scroll-mt-[150px] bg-white py-16 lg:py-20">
      <Container>
        <BleedTitle title={data.title} />

        <p className="mt-8 text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
          {data.intro}
        </p>

        {/* Bordered fee grid */}
        <div className="mt-10 grid grid-cols-1 gap-0 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {data.cards.map((card) => (
            <FeeCell key={card.id} card={card} />
          ))}
        </div>

        {/* Centered italic footnotes */}
        {data.footnotes.length > 0 && (
          <div className="mt-6 space-y-1 text-center">
            {data.footnotes.map((note, i) => (
              <p key={i} className="text-xs italic text-ash sm:text-sm">
                {note}
              </p>
            ))}
          </div>
        )}

        {/* Sub-section notes (Value Added Courses) */}
        <div className="mt-12 space-y-8 lg:mt-14">
          {data.notes.map((note, i) => (
            <div key={i}>
              <h3 className="font-display text-lg font-bold text-navy sm:text-xl">
                {note.heading}
              </h3>
              <div className="mt-3 space-y-3 text-[14px] leading-7 text-black/75 lg:text-[15px] lg:leading-7">
                {note.paragraphs.map((p, pi) => (
                  <p key={pi}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Education Loan banner */}
        <div className="mt-12 grid grid-cols-1 items-stretch bg-ink lg:mt-14 lg:grid-cols-[1.2fr_1fr]">
          <div className="p-8 lg:p-10">
            <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
              {data.educationLoan.heading}
            </h3>
            <p className="mt-4 text-[13px] leading-6 text-white/75 lg:text-[14px] lg:leading-7">
              {data.educationLoan.description}
            </p>
            <Link
              href={data.educationLoan.ctaHref}
              className="group mt-6 inline-flex h-11 items-center justify-between gap-6 border border-gold bg-gold px-5 font-display text-sm font-bold uppercase tracking-wide text-navy transition-colors hover:bg-gold/90"
            >
              <span>{data.educationLoan.ctaLabel}</span>
              <ArrowRight className="h-4 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="relative aspect-[16/9] w-full lg:aspect-auto lg:min-h-[240px]">
            <Image
              src={data.educationLoan.image}
              alt={data.educationLoan.heading}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Refund policy note */}
        <p className="mx-auto mt-10 max-w-3xl text-center text-base leading-7 text-navy lg:mt-12 lg:text-lg">
          {data.refundNote}
        </p>
      </Container>
    </section>
  );
}