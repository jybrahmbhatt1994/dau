import { Container } from "@/components/ui/Container";
import { ActionButton } from "@/components/ui/ActionButton";

export function AdmissionsBanner({
  text,
  cta,
  href,
}: {
  text: string;
  cta: string;
  href: string;
}) {
  return (
    <section className="bg-[#FFFAE7] py-5">
      <Container className="flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-6">
        <p className="font-display text-lg font-semibold text-navy sm:text-xl">
          {text}
        </p>
        <ActionButton href={href} variant="filledGold" className="w-auto px-6">
          {cta}
        </ActionButton>
      </Container>
    </section>
  );
}