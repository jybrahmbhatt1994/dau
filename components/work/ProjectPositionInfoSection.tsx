import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";

/**
 * DESTINATION: components/work/ProjectPositionInfoSection.tsx
 *
 * Titled wysiwyg content block — used for "How to Apply", "Important
 * Dates", and "Additional Information". Same rich-content styling as
 * RichHtmlSection (inline links, bullet lists) but with its own BleedTitle
 * heading, which RichHtmlSection doesn't have. Surface background.
 */
export function ProjectPositionInfoSection({
  title,
  html,
}: {
  title: string;
  html: string;
}) {
  return (
    <section className="bg-surface py-10 lg:py-12">
      <Container>
        <BleedTitle title={title} />

        <div
          className="mt-6 max-w-none space-y-4 text-[15px] leading-7 text-black/80
            [&_a]:font-medium [&_a]:text-navy [&_a]:underline
            [&_a]:underline-offset-2 [&_a]:transition-colors
            hover:[&_a]:text-brand
            [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6
            lg:text-base lg:leading-8"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Container>
    </section>
  );
}