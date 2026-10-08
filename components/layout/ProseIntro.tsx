import { Container } from "@/components/ui/Container";
import { ActionButton } from "@/components/ui/ActionButton";

/**
 * Full-width intro prose — one or more paragraphs on a plain background.
 * `whitespace-pre-line` lets a "\n" inside a paragraph render as a line break.
 * Reusable on any inner page that opens with a block of body copy.
 *
 * Optional trailing `button` (e.g. "View Policy") renders left-aligned
 * directly below the paragraphs.
 */
export function ProseIntro({
  paragraphs,
  className = "bg-white",
  button,
}: {
  paragraphs: string[];
  className?: string;
  button?: { label: string; href: string; external?: boolean };
}) {
  return (
    <section className={`py-16 lg:py-20 ${className}`}>
      <Container>
        <div className="space-y-5 whitespace-pre-line text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {button && (
          <div className="mt-8">
            <ActionButton
              href={button.href}
              variant="filledGold"
              newTab={button.external}
              fixedWidth={false}
            >
              {button.label}
            </ActionButton>
          </div>
        )}
      </Container>
    </section>
  );
}