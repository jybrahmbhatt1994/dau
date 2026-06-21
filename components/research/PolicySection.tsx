import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import { ArrowRight } from "@/components/ui/icons";

export interface PolicyBulletGroup {
  /** Optional lead sentence rendered as a paragraph before the bullet list. */
  lead?: string;
  items: string[];
}

export interface PolicyData {
  title: string;
  /** Prose paragraphs before the first bullet group */
  introParagraphs: string[];
  /** One or more groups of bullet items, each with an optional lead sentence */
  bulletGroups: PolicyBulletGroup[];
  /** Prose paragraphs after all bullet groups */
  outroParagraphs: string[];
  /** Optional centered gold CTA button (e.g. "Download Policy Document") */
  button?: {
    label: string;
    href: string;
    /** If true, the link opens in a new tab. Use for direct PDF download links. */
    external?: boolean;
  };
}

/**
 * "Policy" section.
 *
 * Renders:
 *  - BleedTitle (left-bleeding gold underline)
 *  - Prose paragraphs → bullet groups (each with optional lead) → more prose
 *  - Optional centered gold filled button (Download Policy Document)
 *
 * Background defaults to `surface` (#F7F7F8). Pass `className` to override.
 */
export function PolicySection({
  data,
  className = "bg-surface",
}: {
  data: PolicyData;
  className?: string;
}) {
  return (
    <section id="policy" className={`scroll-mt-[150px] py-16 lg:py-20 ${className}`}>
      <Container>
        <BleedTitle title={data.title} />

        <div className="mt-10 space-y-5 text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
          {/* Intro prose */}
          {data.introParagraphs.map((p, i) => (
            <p key={`intro-${i}`}>{p}</p>
          ))}

          {/* Bullet groups */}
          {data.bulletGroups.map((group, gi) => (
            <div key={`group-${gi}`}>
              {group.lead && <p>{group.lead}</p>}
              <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-ash">
                {group.items.map((item, ii) => (
                  <li key={ii}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

          {/* Outro prose */}
          {data.outroParagraphs.map((p, i) => (
            <p key={`outro-${i}`}>{p}</p>
          ))}
        </div>

        {/* Centered gold CTA */}
        {data.button && (
          <div className="mt-12 flex justify-center">
            <Link
              href={data.button.href}
              {...(data.button.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group inline-flex h-12 items-center justify-center gap-4 border border-gold bg-gold px-8 font-display text-sm font-bold uppercase tracking-wide text-navy transition-colors hover:bg-gold/90 sm:text-base"
            >
              <span>{data.button.label}</span>
              <ArrowRight className="h-4 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}