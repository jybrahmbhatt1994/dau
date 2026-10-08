import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import type { GrievanceAuthorityRow } from "@/lib/types";

export function GrievanceAuthorityTable({
  title,
  level1Label,
  level2Label,
  level3Label,
  rows,
}: {
  title: string;
  level1Label: string;
  level2Label: string;
  level3Label: string;
  rows: GrievanceAuthorityRow[];
}) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <BleedTitle title={title} />

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse">
            <thead>
              <tr>
                <th className="border border-line bg-white px-5 py-4 text-left align-middle font-display text-sm font-semibold text-navy">
                  Nature of Grievances
                </th>
                <th className="border border-line bg-white px-5 py-4 text-center align-middle font-display text-sm font-semibold text-navy">
                  {level1Label}
                </th>
                <th className="border border-line bg-white px-5 py-4 text-center align-middle font-display text-sm font-semibold text-navy">
                  {level2Label}
                </th>
                <th className="border border-line bg-white px-5 py-4 text-center align-middle font-display text-sm font-semibold text-navy">
                  {level3Label}
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="border border-line px-5 py-5 align-top text-sm leading-6 text-black/80">
                    {row.natureOfGrievance}
                  </td>
                  <td className="border border-line px-5 py-5 text-center align-top text-sm leading-6 text-black/80">
                    {row.level1}
                  </td>
                  <td className="border border-line px-5 py-5 text-center align-top text-sm leading-6 text-black/80">
                    {row.level2}
                  </td>
                  <td className="border border-line px-5 py-5 text-center align-top text-sm leading-6 text-black/80">
                    {row.level3}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
