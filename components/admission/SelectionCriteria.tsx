import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";

/**
 * "Selection Criteria" — BleedTitle + paragraphs.
 * Plain section with no extra structure.
 *
 * Background: white, py-16 lg:py-20.
 */
export function SelectionCriteria({
  data,
}: {
  data: {
    title: string;
    paragraphs: string[];
  };
}) {
  return (
    <section id="selection-criteria" className="scroll-mt-[150px] bg-surface py-16 lg:py-20">
      <Container>
        <BleedTitle title={data.title} />

        <div className="mt-10 space-y-5 text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
          {data.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Container>
    </section>
  );
}