import { ActionButton } from "@/components/ui/ActionButton";
import type { CtaPanel } from "@/lib/types";

/**
 * Two-up CTA. Left half is `gold` (dark text + navy-outline button); right half
 * is `brand` red (white text + white-outline button). Colours bleed to the
 * screen edges; content lines up with the global container.
 *
 * Titles are optional: some pages (Newsroom, Student Stories) show only a
 * description + button. The h2 is rendered only when a title is provided.
 *
 * Responsive: the halves stack on mobile.
 */

// Aligns the inner content to <Container>'s padding (centered max-w-1440,
// 40px gutters) on wide screens; floors at 40px below that.
const LEFT_PAD = "max(2.5rem, calc((100vw - 1440px) / 2 + 2.5rem))";

export function SplitCta({
  calendar,
  catalogue,
}: {
  calendar: CtaPanel;
  catalogue: CtaPanel;
}) {
  return (
    <section id="related" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2">
      {/* gold half */}
      <div
        className="bg-gold px-6 py-14 sm:px-10 lg:py-20 lg:pr-12"
        style={{ paddingLeft: `var(--cta-edge, ${LEFT_PAD})` }}
      >
        <div className="max-w-md">
          {calendar.title && (
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-tight text-navy">
              {calendar.title}
            </h2>
          )}
          <p
            className={`text-base font-medium leading-relaxed text-navy/90 ${
              calendar.title ? "mt-5" : ""
            }`}
          >
            {calendar.description}
          </p>
          <div className="mt-8">
            <ActionButton href={calendar.href} variant="outlineDark">
              {calendar.cta}
            </ActionButton>
          </div>
        </div>
      </div>

      {/* brand red half */}
      <div
        className="bg-brand px-6 py-14 sm:px-10 lg:py-20 lg:pl-12"
        style={{ paddingRight: `var(--cta-edge, ${LEFT_PAD})` }}
      >
        <div className="max-w-md">
          {catalogue.title && (
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-tight text-white">
              {catalogue.title}
            </h2>
          )}
          <p
            className={`text-base font-medium leading-relaxed text-white/85 ${
              catalogue.title ? "mt-5" : ""
            }`}
          >
            {catalogue.description}
          </p>
          <div className="mt-8">
            <ActionButton href={catalogue.href} variant="outlineLight">
              {catalogue.cta}
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
}