import { Container } from "@/components/ui/Container";
import type { ProjectPositionDetailPageData } from "@/lib/types";

/**
 * DESTINATION: components/work/ProjectPositionDetailsTable.tsx
 *
 * Fixed-row definition table (label left, content right). Mixed content
 * types per row — plain text, multi-line, wysiwyg HTML (Essential
 * Qualification, which may contain an "OR" paragraph separator), and a
 * bullet list (Desirable Skills). White background.
 */
export function ProjectPositionDetailsTable({
  details,
}: {
  details: ProjectPositionDetailPageData["details"];
}) {
  const rows: Array<{ label: string; content: React.ReactNode }> = [
    { label: "Project Title", content: details.projectTitle },
    { label: "Investigators", content: details.investigators },
    {
      label: "Position and Fellowship",
      content: details.positionFellowship
        .split("\n")
        .map((line, i) => <p key={i}>{line}</p>),
    },
    {
      label: "Essential Qualification",
      content: (
        <div
          className="space-y-3 [&_p]:leading-7"
          dangerouslySetInnerHTML={{
            __html: details.essentialQualificationHtml,
          }}
        />
      ),
    },
    {
      label: "Desirable Skills",
      content: (
        <ul className="list-disc space-y-1.5 pl-5 marker:text-ash">
          {details.desirableSkills.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      ),
    },
    { label: "Upper Age Limit", content: details.upperAgeLimit },
    { label: "Period of appointment", content: details.periodOfAppointment },
  ];

  return (
    <section className="bg-white pb-16 lg:pb-20">
      <Container>
        <div className="border border-line">
          {rows.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 sm:grid-cols-[200px_1fr] ${
                i > 0 ? "border-t border-line" : ""
              }`}
            >
              <div className="bg-surface p-5 text-sm font-medium text-black/70 sm:border-r sm:border-line">
                {row.label}
              </div>
              <div className="p-5 text-[15px] font-semibold leading-relaxed text-navy">
                {row.content}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}