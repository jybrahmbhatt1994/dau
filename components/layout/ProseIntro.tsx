import { Container } from "@/components/ui/Container";

/**
 * Full-width intro prose — one or more paragraphs on a plain background.
 * `whitespace-pre-line` lets a "\n" inside a paragraph render as a line break.
 * Reusable on any inner page that opens with a block of body copy.
 */
export function ProseIntro({
  paragraphs,
  className = "bg-white",
}: {
  paragraphs: string[];
  className?: string;
}) {
  return (
    <section className={`py-16 lg:py-20 ${className}`}>
      <Container>
        <div className="space-y-5 whitespace-pre-line text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Container>
    </section>
  );
}