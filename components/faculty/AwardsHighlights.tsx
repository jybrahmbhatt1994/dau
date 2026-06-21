import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";

export interface AwardHighlight {
  id: string;
  image: string;
  date: string;
  excerpt: string;
  href: string;
}

/**
 * "Awards & Highlights" — 2-col grid of award cards.
 *
 * Each card: image left + date + excerpt right, with the whole card linking
 * to the article/announcement detail page.
 *
 * Background: white, py-16 lg:py-20.
 */
export function AwardsHighlights({
  data,
}: {
  data: {
    title: string;
    items: AwardHighlight[];
  };
}) {
  return (
    <section id="highlights" className="scroll-mt-[150px] bg-white py-16 lg:py-20">
      <Container>
        <BleedTitle title={data.title} />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {data.items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group flex items-stretch border border-line bg-white transition-shadow hover:shadow-card"
            >
              <div className="relative aspect-[4/3] w-[140px] shrink-0 overflow-hidden sm:w-[170px]">
                <Image
                  src={item.image}
                  alt={item.excerpt}
                  fill
                  sizes="170px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center px-5 py-4 sm:px-6">
                <p className="text-xs font-medium text-ash">{item.date}</p>
                <p className="mt-2 text-sm font-semibold leading-snug text-navy transition-colors group-hover:text-brand sm:text-base">
                  {item.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}