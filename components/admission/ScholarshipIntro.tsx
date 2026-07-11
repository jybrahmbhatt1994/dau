import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";

/**
 * DESTINATION: components/admission/ScholarshipIntro.tsx
 *
 * "UG Institute Fellowships at DAU" style intro block:
 *   - BleedTitle heading
 *   - Optional italic/bold subtitle line (e.g. "(With effect from 2025-26 Batch)")
 *   - Prose paragraphs
 * White background, standard section vertical padding.
 */
export function ScholarshipIntro({
  data,
}: {
  data: { title: string; subtitle?: string; paragraphs: string[] };
}) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <BleedTitle title={data.title} />

        <div className="mt-8 space-y-4 text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
          {data.subtitle && (
            <p className="font-semibold italic text-navy">{data.subtitle}</p>
          )}
          {data.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Container>
    </section>
  );
}