import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";

export interface ImportantDateCard {
  id: string;
  /** Bold heading on the card (e.g. "Filling of online Application Forms commences on") */
  label: string;
  /** Date value (e.g. "24 March 2026") or status text like "To be decided" */
  value: string;
  /** When true, the value renders muted/grey (used for "To be decided") */
  pending?: boolean;
}

/**
 * "Important Dates" section — BleedTitle + 4-column grid of date cards.
 *
 * Each card: thin border-line wrapper, label in dark navy (semibold), value
 * below. Confirmed dates render in dark navy bold; "To be decided" / pending
 * values render in muted ash. (Per Figma — values are NOT brand red.)
 *
 * Grid: 1 col mobile → 2 cols sm → 4 cols lg.
 * Background: white, py-16 lg:py-20.
 */
export function ImportantDates({
  data,
}: {
  data: {
    title: string;
    items: ImportantDateCard[];
  };
}) {
  return (
    <section id="important-dates" className="scroll-mt-[150px] bg-white py-16 lg:py-20">
      <Container>
        <BleedTitle title={data.title} />

        <div className="mt-10 grid grid-cols-1 gap-0 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {data.items.map((item) => (
            <div
              key={item.id}
              className="flex min-h-[150px] flex-col justify-between border-b border-r border-line bg-white p-5 lg:p-6"
            >
              <p className="text-sm font-semibold leading-snug text-navy">
                {item.label}
              </p>
              <p
                className={`mt-4 font-display text-base font-bold sm:text-lg ${
                  item.pending ? "text-ash" : "text-navy"
                }`}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}