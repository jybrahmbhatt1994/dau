import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowDown } from "@/components/ui/icons";

export interface HandbookContentData {
  /**
   * Body copy. Each entry renders as a <p>. Within a paragraph, `\n` becomes
   * a line break (we use whitespace-pre-line) — the Figma uses one such break
   * between the opening sentence and the rest of the policy text.
   */
  paragraphs: string[];
  downloadButton: {
    label: string;
    href: string;
    /** If true, the download opens in a new tab (recommended for PDFs). */
    external?: boolean;
  };
}

/**
 * Faculty Handbook content section.
 *
 * Layout:
 *  - Full-width prose on a `surface` band
 *  - Centered gold filled "DOWNLOAD HANDBOOK" button with a down-arrow icon
 *
 * No section heading per the Figma — just policy prose followed by the CTA.
 * Background: `surface` (#F7F7F8), py-16 lg:py-20.
 */
export function HandbookContent({ data }: { data: HandbookContentData }) {
  const { downloadButton } = data;

  return (
    <section id="handbook" className="scroll-mt-[150px] bg-surface py-16 lg:py-20">
      <Container>
        {/* Prose */}
        <div className="space-y-5 whitespace-pre-line text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
          {data.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Centered gold download button */}
        <div className="mt-12 flex justify-center lg:mt-14">
          <Link
            href={downloadButton.href}
            {...(downloadButton.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="group inline-flex h-12 items-center justify-center gap-4 border border-gold bg-gold px-8 font-display text-sm font-bold uppercase tracking-wide text-navy transition-colors hover:bg-gold/90 sm:text-base"
          >
            <span>{downloadButton.label}</span>
            <ArrowDown className="h-4 w-5 transition-transform group-hover:translate-y-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}