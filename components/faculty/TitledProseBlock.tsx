import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";

export interface TitledSubBlock {
  /** Optional h3 heading above the prose */
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  /** Optional lead-in paragraph above the bullets */
  bulletsLead?: string;
}

export interface TitledProseBlockData {
  title: string;
  /** Optional section-level intro paragraph between title and sub-blocks */
  intro?: string;
  /** Stack of sub-blocks, each with optional heading + content */
  blocks: TitledSubBlock[];
}

/**
 * Generic content section: BleedTitle + optional intro + sub-blocks.
 *
 * Used by:
 *  - "Prospective Faculty" (single column, white bg)
 *  - "Compensation Package" (single column, white bg)
 *  - "Faculty Evaluation" (two columns, dark ink bg + light text)
 *  - "Continuous Improvement" (two columns, dark ink bg + light text)
 *
 * Props:
 *  - className: section background utility
 *  - columns: 1 (default, stacked) or 2 (responsive 2-col grid)
 *  - light:   dark-background variant — BleedTitle becomes white, body text
 *             becomes white/80, headings become white
 */
export function TitledProseBlock({
  data,
  className = "bg-white",
  id,
  columns = 1,
  light = false,
}: {
  data: TitledProseBlockData;
  className?: string;
  id?: string;
  columns?: 1 | 2;
  light?: boolean;
}) {
  const bodyText = light
    ? "text-white/80"
    : "text-black/80";

  const headingText = light ? "text-white" : "text-navy";
  const introText = light ? "text-white/85" : "text-black/80";

  const gridCls =
    columns === 2
      ? "grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2 lg:gap-y-12"
      : "space-y-10 lg:space-y-12";

  return (
    <section
      id={id}
      className={`scroll-mt-[150px] py-16 lg:py-20 ${className}`}
    >
      <Container>
        <BleedTitle title={data.title} light={light} />

        {data.intro && (
          <p
            className={`mt-8 max-w-5xl text-[15px] leading-7 lg:text-base lg:leading-8 ${introText}`}
          >
            {data.intro}
          </p>
        )}

        <div className={`mt-10 lg:mt-12 ${gridCls}`}>
          {data.blocks.map((block, i) => (
            <div key={i}>
              {block.heading && (
                <h3
                  className={`font-display text-xl font-bold sm:text-2xl ${headingText}`}
                >
                  {block.heading}
                </h3>
              )}

              {block.paragraphs && block.paragraphs.length > 0 && (
                <div
                  className={`space-y-5 text-[15px] leading-7 lg:text-base lg:leading-8 ${bodyText} ${
                    block.heading ? "mt-5" : ""
                  }`}
                >
                  {block.paragraphs.map((p, pi) => (
                    <p key={pi}>{p}</p>
                  ))}
                </div>
              )}

              {block.bullets && block.bullets.length > 0 && (
                <div
                  className={`text-[15px] leading-7 lg:text-base lg:leading-8 ${bodyText} ${
                    block.heading || block.paragraphs?.length ? "mt-5" : ""
                  }`}
                >
                  {block.bulletsLead && (
                    <p className="mb-3">{block.bulletsLead}</p>
                  )}
                  <ul className={`list-disc space-y-2 pl-6 ${light ? "marker:text-white/40" : "marker:text-ash"}`}>
                    {block.bullets.map((b, bi) => (
                      <li key={bi}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}