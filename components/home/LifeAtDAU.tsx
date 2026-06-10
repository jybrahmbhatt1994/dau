import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/icons";
import type { HomeData } from "@/lib/types";
import { BleedTitle } from "@/components/ui/SectionTitle";

export function LifeAtDAU({ data }: { data: HomeData["life"] }) {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* Intro */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <BleedTitle title={data.title} />
            <p className="mt-12 max-w-md text-base font-medium leading-relaxed text-ash">
              {data.description}
            </p>
          </div>

          {/* Stacked cards */}
          <div className="flex flex-col gap-6">
            {data.cards.map((card) => (
              <Link key={card.id} href={card.href} className="group block">
                <div className="relative aspect-[665/280] w-full overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between border border-t-0 border-line bg-white px-6 py-4">
                  <span className="font-display text-[28px] font-semibold text-navy">
                    {card.title}
                  </span>
                  <ArrowRight className="h-5 w-6 text-royal transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
