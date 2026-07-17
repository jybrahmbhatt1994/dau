import Image from "next/image";
import type { DoctoralScholarCardData } from "@/lib/types";

/**
 * DESTINATION: components/doctoral-scholars/DoctoralScholarCard.tsx
 *
 * Matches the Faculty/Staff card proportions exactly — photo occupies a
 * fixed-width column (~180-220px) on the left, details fill the rest.
 * Same CSS Grid approach as StaffCard for guaranteed full-height images
 * regardless of content length.
 */
export function DoctoralScholarCard({
  scholar,
}: {
  scholar: DoctoralScholarCardData;
}) {
  return (
    <div className="grid min-h-[220px] grid-cols-[180px_1fr] bg-surface sm:grid-cols-[220px_1fr]">
      {/* Photo — h-full guarantees it fills the row exactly */}
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={scholar.image}
          alt={scholar.name}
          fill
          sizes="220px"
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col justify-center gap-2 p-6">
        <h3 className="font-display text-lg font-bold text-brand">
          {scholar.name}
        </h3>

        {scholar.advisor && (
          <div>
            <p className="text-sm font-semibold text-black/85">Advisor :</p>
            <p className="text-sm text-royal">{scholar.advisor}</p>
          </div>
        )}

        <div>
          <p className="text-sm font-semibold text-black/85">
            Year of Joining :
          </p>
          <p className="text-sm text-black/70">
            {scholar.yearOfJoiningDisplay || "---"}
          </p>
        </div>
      </div>
    </div>
  );
}