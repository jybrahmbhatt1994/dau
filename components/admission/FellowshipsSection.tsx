import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import type { FellowshipTableRow } from "@/lib/types";

/**
 * DESTINATION: components/admission/FellowshipsSection.tsx
 *
 * "Eligibility and details of Fellowships" — dark ink/navy background with a
 * 4-column table (No. of Fellowship / Type / Eligibility conditions / Band),
 * followed by trailing note paragraphs still on the dark background.
 *
 * Responsive: table wrapped in overflow-x-auto so it scrolls horizontally on
 * narrow screens rather than squeezing columns unreadably — same pattern as
 * SponsoredResearchTable elsewhere in the project.
 */
export function FellowshipsSection({
  data,
}: {
  data: {
    title: string;
    tableHeaders: [string, string, string, string];
    rows: FellowshipTableRow[];
    notes: string[];
  };
}) {
  return (
    <section className="bg-ink py-16 text-white lg:py-20">
      <Container>
        <BleedTitle title={data.title} light />

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr>
                {data.tableHeaders.map((h) => (
                  <th
                    key={h}
                    className="border border-white/15 bg-white/5 px-5 py-4 font-display text-sm font-semibold text-white"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row) => (
                <tr key={row.id}>
                  <td className="border border-white/15 px-5 py-4 align-top font-display text-sm font-semibold">
                    {row.count}
                  </td>
                  <td className="border border-white/15 px-5 py-4 align-top text-sm font-semibold">
                    {row.type}
                  </td>
                  <td className="border border-white/15 px-5 py-4 align-top text-sm leading-relaxed text-white/85">
                    {row.eligibilityLines.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </td>
                  <td className="border border-white/15 px-5 py-4 align-top text-sm font-semibold">
                    {row.band}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.notes.length > 0 && (
          <div className="mt-8 space-y-3 text-sm leading-relaxed text-white/80">
            {data.notes.map((note, i) => (
              <p key={i}>{note}</p>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}