import Image from "next/image";
import type { TeachingFellowCardData } from "@/lib/types";

/**
 * DESTINATION: components/teaching-fellows/TeachingFellowCard.tsx
 * Same 50/50 grid layout as StaffCard / DoctoralScholarCard.
 */
export function TeachingFellowCard({
  fellow,
}: {
  fellow: TeachingFellowCardData;
}) {
  return (
    <div className="grid min-h-[220px] grid-cols-[180px_1fr] bg-surface sm:grid-cols-[220px_1fr]">
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={fellow.image}
          alt={fellow.name}
          fill
          sizes="220px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-center gap-2 p-6">
        <h3 className="font-display text-lg font-bold text-navy">
          {fellow.name}
        </h3>
        <p className="text-sm text-ash">{fellow.position}</p>

        <div>
          <p className="text-sm font-semibold text-black/85">
            Date of Joining :
          </p>
          <p className="text-sm text-black/70">
            {fellow.dateOfJoining || "---"}
          </p>
        </div>

        {fellow.office && (
          <div>
            <p className="text-sm font-semibold text-black/85">Office :</p>
            <p className="text-sm text-black/70">{fellow.office}</p>
          </div>
        )}
      </div>
    </div>
  );
}