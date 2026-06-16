import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ActionButton } from "@/components/ui/ActionButton";
import type { NewsArticle, SectionIntro } from "@/lib/types";

export function StoriesBlogs({
  data,
}: {
  data: SectionIntro & { items: NewsArticle[]; viewAllHref: string };
}) {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        <SectionHeading title={data.title} description={data.description} />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {data.items.map((article) => (
            <Link
              key={article.id}
              href={article.href}
              className="group flex items-stretch border border-line bg-white transition-shadow hover:shadow-card"
            >
              <div className="relative aspect-square w-[140px] shrink-0 overflow-hidden sm:w-[185px]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="185px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center px-5 py-4 sm:px-6">
                <p className="text-sm text-ash">{article.date}</p>
                <h3 className="mt-2 font-display text-lg font-bold leading-snug text-navy transition-colors group-hover:text-brand lg:text-xl">
                  {article.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <ActionButton href={data.viewAllHref} variant="outline">
            View All
          </ActionButton>
        </div>
      </Container>
    </section>
  );
}