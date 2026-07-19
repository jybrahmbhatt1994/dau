import { Container } from "@/components/ui/Container";

/**
 * DESTINATION: components/work/ProjectPositionHeader.tsx
 *
 * Centered centre name + subtitle + reference number, then a left-aligned
 * intro paragraph. White background.
 */
export function ProjectPositionHeader({
  centreName,
  centreSubtitle,
  referenceNumber,
  introParagraph,
}: {
  centreName: string;
  centreSubtitle: string;
  referenceNumber: string;
  introParagraph: string;
}) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-navy lg:text-[28px]">
            {centreName}
          </h1>
          {centreSubtitle && (
            <p className="mt-4 text-[15px] text-black/70">{centreSubtitle}</p>
          )}
          {referenceNumber && (
            <p className="mt-1 text-[15px] text-black/70">
              Reference Number: {referenceNumber}
            </p>
          )}
        </div>

        <p className="mx-auto mt-8 max-w-4xl text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
          {introParagraph}
        </p>
      </Container>
    </section>
  );
}