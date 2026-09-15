import { Container } from "@/components/ui/Container";
import { ActionButton } from "@/components/ui/ActionButton";

export function CampusTourIntro({
  text,
  cta,
}: {
  text: string;
  cta: { label: string; href: string };
}) {
  return (
    <section className="bg-surface py-12 lg:py-16">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8">
          <p className="text-left text-lg font-semibold leading-relaxed text-navy">{text}</p>
          <ActionButton href={cta.href} variant="filledGold">
            {cta.label}
          </ActionButton>
        </div>
      </Container>
    </section>
  );
}
