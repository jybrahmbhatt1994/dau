import { Container } from "@/components/ui/Container";
import { ActionButton } from "@/components/ui/ActionButton";
import type { OutcomeItem, ProgramPageData } from "@/lib/types";

function CardTitle({ title }: { title: string }) {
  return (
    <div className="inline-block">
      <h3 className="font-display text-xl font-semibold text-navy sm:text-2xl">
        {title}
      </h3>
      <span className="mt-3 block h-[3px] w-full bg-gold" />
    </div>
  );
}

function Item({ item }: { item: OutcomeItem }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-brand">
        {item.code}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-ash">
        {item.lead ? (
          <>
            <span className="font-bold text-navy">{item.lead}</span> {item.body}
          </>
        ) : (
          <span className="font-semibold text-navy">{item.body}</span>
        )}
      </p>
    </div>
  );
}

export function OutcomesSection({
  data,
}: {
  data: ProgramPageData["outcomes"];
}) {
  const { programOutcomes, specificOutcomes } = data;

  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Program Outcomes (with View All) */}
          <div className="flex h-full flex-col border border-line bg-white p-7 lg:p-9">
            <CardTitle title={programOutcomes.title} />
            <div className="mt-8 space-y-7">
              {programOutcomes.items.map((item) => (
                <Item key={item.code} item={item} />
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <ActionButton href={programOutcomes.viewAllHref} variant="outline">
                View All
              </ActionButton>
            </div>
          </div>

          {/* Programme Specific Outcomes */}
          <div className="flex h-full flex-col border border-line bg-white p-7 lg:p-9">
            <CardTitle title={specificOutcomes.title} />
            <div className="mt-8 space-y-7">
              {specificOutcomes.items.map((item) => (
                <Item key={item.code} item={item} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}