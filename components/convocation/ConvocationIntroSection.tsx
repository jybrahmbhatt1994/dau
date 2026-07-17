import { Container } from "@/components/ui/Container";

/**
 * DESTINATION: components/convocation/ConvocationIntroSection.tsx
 * Centered, bold intro paragraph. Surface background.
 */
export function ConvocationIntroSection({ text }: { text: string }) {
  return (
    <section className="bg-surface py-12 lg:py-14">
      <Container>
        <p className="mx-auto max-w-3xl text-center text-lg font-semibold leading-relaxed text-navy">
          {text}
        </p>
      </Container>
    </section>
  );
}