import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";

/**
 * Generic "title + prose" section: BleedTitle followed by paragraphs.
 *
 * Reusable anywhere a section is just a heading + body copy (e.g. DAU
 * Scholarships intro, Selection Criteria). Background + anchor id are
 * prop-driven so the same component covers white/surface variants.
 *
 * Background defaults to white; pass `className` to override.
 */
export function TitledProseSection({
  data,
  id,
  className = "bg-white",
}: {
  data: {
    title: string;
    paragraphs: string[];
  };
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-[150px] py-16 lg:py-20 ${className}`}>
      <Container>
        <BleedTitle title={data.title} />

        <div className="mt-8 space-y-5 text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
          {data.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Container>
    </section>
  );
}