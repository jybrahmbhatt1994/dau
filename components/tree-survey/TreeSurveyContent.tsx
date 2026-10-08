import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ActionButton } from "@/components/ui/ActionButton";

export function TreeSurveyContent({
  paragraphs,
  ctaLabel,
  ctaFileUrl,
  sideImage,
}: {
  paragraphs: string[];
  ctaLabel: string;
  ctaFileUrl: string;
  sideImage: string;
}) {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="space-y-5 text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-8">
              <ActionButton href={ctaFileUrl} variant="filledGold" newTab fixedWidth={false}>
                {ctaLabel}
              </ActionButton>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={sideImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
