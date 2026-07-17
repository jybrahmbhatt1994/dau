import Image from "next/image";
import { ExpandableText } from "@/components/doctoral-scholars/ExpandableText";
import type { RecentGraduateCardData } from "@/lib/types";

/**
 * DESTINATION: components/doctoral-scholars/RecentGraduateCard.tsx
 *
 * Full-width, richer card used only for the "Recent Graduates" tab —
 * 2-column layout: left = photo/name/advisor/dates/thesis/employment,
 * right = journals/awards (both expandable) + personal webpage.
 */
export function RecentGraduateCard({
  scholar,
}: {
  scholar: RecentGraduateCardData;
}) {
  return (
    <div className="grid grid-cols-1 gap-8 border-b border-line/60 bg-white p-6 lg:grid-cols-2 lg:divide-x lg:divide-line">
      {/* Left column */}
      <div className="flex gap-5 lg:pr-8">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden border border-line">
          <Image
            src={scholar.image}
            alt={scholar.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>

        <div className="flex-1 space-y-3">
          <h3 className="font-display text-lg font-bold text-brand">
            {scholar.name}
          </h3>

          <div>
            <p className="text-sm font-semibold text-black/85">Advisor :</p>
            <p className="text-sm text-royal">{scholar.advisor || "---"}</p>
          </div>

          <div className="flex gap-8">
            <div>
              <p className="text-sm font-semibold text-black/85">
                Year of Joining :
              </p>
              <p className="text-sm text-black/70">
                {scholar.yearOfJoiningDisplay || "---"}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-black/85">
                Year of Graduation :
              </p>
              <p className="text-sm text-black/70">
                {scholar.yearOfGraduationDisplay || "---"}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-black/85">
              Thesis Topic :
            </p>
            <p className="text-sm text-black/70">
              {scholar.thesisTopic || "---"}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-black/85">
              Post PhD employment :
            </p>
            <p className="text-sm text-black/70">
              {scholar.postPhdEmployment || "---"}
            </p>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="space-y-4 lg:pl-8">
        <div>
          <p className="text-sm font-semibold text-black/85">
            Journals/Conferences/books/book chapters :
          </p>
          <ExpandableText text={scholar.journalsContent ?? "---"} limit={140} />
        </div>

        <div>
          <p className="text-sm font-semibold text-black/85">
            Awards/honors/research visits :
          </p>
          <ExpandableText text={scholar.awardsContent ?? "---"} limit={140} />
        </div>

        <div>
          <p className="text-sm font-semibold text-black/85">
            Personal webpage :
          </p>
          <p className="text-sm text-black/70">
            {scholar.personalWebpage || "---"}
          </p>
        </div>
      </div>
    </div>
  );
}