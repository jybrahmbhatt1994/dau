import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import type { AreaCard } from "@/lib/types";

function AreaCardItem({ card }: { card: AreaCard }) {
  return (
    <Link
      href={card.href}
      className="group flex items-stretch border border-line bg-white transition-shadow hover:shadow-card"
    >
      <div className="relative aspect-square w-[110px] shrink-0 overflow-hidden sm:w-[148px]">
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes="148px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 items-center px-5 sm:px-7">
        <h3 className="font-display text-lg font-semibold text-navy transition-colors group-hover:text-brand sm:text-xl">
          {card.title}
        </h3>
      </div>
    </Link>
  );
}

export function AcademicAreas({
  data,
}: {
  data: { title: string; description: string; cards: AreaCard[] };
}) {
  return (
    <section id="areas" className="scroll-mt-24 bg-white py-16 lg:py-20">
      <Container>
        <BleedTitle title={data.title} />

        {data.description && (
          <p className="mt-10 text-base font-medium leading-relaxed text-ash">
            {data.description}
          </p>
        )}

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {data.cards.map((card) => (
            <AreaCardItem key={card.id} card={card} />
          ))}
        </div>
      </Container>
    </section>
  );
}
