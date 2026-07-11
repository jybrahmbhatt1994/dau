import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";

/**
 * DESTINATION: components/admission/OtherConditionsSection.tsx
 *
 * "Other Conditions" — BleedTitle heading + numbered list, white background.
 */
export function OtherConditionsSection({
  data,
}: {
  data: { title: string; items: string[] };
}) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <BleedTitle title={data.title} />

        <ol className="mt-8 list-decimal space-y-3 pl-6 text-[15px] leading-7 text-black/80 marker:font-semibold marker:text-navy lg:text-base lg:leading-8">
          {data.items.map((item, i) => (
            <li key={i} className="pl-1">
              {item}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}