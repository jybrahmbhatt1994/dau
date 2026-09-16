import { Container } from "@/components/ui/Container";
import { NirfLinkListBlock } from "@/components/nirf/NirfLinkListBlock";
import type { NirfPageData } from "@/lib/types";

export function NirfDataSection({
  studentDetailsHeading,
  studentDetails,
  admissionDataHeading,
  admissionData,
  iprFundingHeading,
  iprFunding,
  feedbackNote,
  feedbackEmail,
}: Omit<NirfPageData, "hero" | "rankingYears">) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2">
          <NirfLinkListBlock heading={studentDetailsHeading} documents={studentDetails} />
          <NirfLinkListBlock heading={admissionDataHeading} documents={admissionData} />
        </div>

        <div className="mt-10">
          <NirfLinkListBlock heading={iprFundingHeading} documents={iprFunding} />
        </div>

        {feedbackEmail && (
          <p className="mt-12 text-sm font-medium text-navy">
            {feedbackNote}{" "}
            <a href={`mailto:${feedbackEmail}`} className="text-brand hover:underline">
              {feedbackEmail}
            </a>
          </p>
        )}
      </Container>
    </section>
  );
}
