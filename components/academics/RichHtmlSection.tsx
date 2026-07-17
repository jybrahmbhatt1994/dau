import { Container } from "@/components/ui/Container";

/**
 * DESTINATION: components/academics/RichHtmlSection.tsx
 *
 * Renders raw HTML from a WP wysiwyg field (may include inline <a> links,
 * <p> paragraphs). Used for prose blocks that need inline hyperlinks —
 * plain string[] paragraphs can't carry those, hence wysiwyg + raw HTML.
 */
export function RichHtmlSection({
  html,
  background = "surface",
}: {
  html: string;
  background?: "surface" | "white";
}) {
  return (
    <section
      className={`py-16 lg:py-20 ${
        background === "surface" ? "bg-surface" : "bg-white"
      }`}
    >
      <Container>
        <div
          className="max-w-none space-y-4 text-[15px] leading-7 text-black/80
            [&_a]:font-medium [&_a]:text-navy [&_a]:underline
            [&_a]:underline-offset-2 [&_a]:transition-colors
            hover:[&_a]:text-brand
            lg:text-base lg:leading-8"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Container>
    </section>
  );
}