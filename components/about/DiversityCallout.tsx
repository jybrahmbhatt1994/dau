import { Container } from "@/components/ui/Container";
import { PaperMark } from "@/components/ui/icons";

/**
 * Centered brand callout: the paper-bird mark, a large display heading and a
 * supporting line. Driven by the homepage `diversity` content shape
 * ({ title, description }).
 */
export function DiversityCallout({
  data,
}: {
  data: { title: string; description: string };
}) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <PaperMark />
          <h2 className="mt-8 font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-tight text-navy">
            {data.title}
          </h2>
          <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-ash">
            {data.description}
          </p>
        </div>
      </Container>
    </section>
  );
}