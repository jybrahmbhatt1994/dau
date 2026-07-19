import Link from "next/link";
import { Container } from "@/components/ui/Container";

/**
 * DESTINATION: components/work/ApplyDeadlineSection.tsx
 * Centered gold "Apply Now" button with a submission deadline note below it.
 * Surface background.
 */
export function ApplyDeadlineSection({
  applyButton,
  submissionDeadline,
}: {
  applyButton: { label: string; href: string };
  submissionDeadline: string;
}) {
  return (
    <section className="bg-surface pb-16 lg:pb-20">
      <Container>
        <div className="flex flex-col items-center gap-4">
          <Link
            href={applyButton.href}
            className="inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-display text-sm font-semibold uppercase tracking-wide text-navy transition-opacity hover:opacity-90"
          >
            {applyButton.label}
            <span aria-hidden>→</span>
          </Link>

          {submissionDeadline && (
            <p className="text-sm text-black/70">{submissionDeadline}</p>
          )}
        </div>
      </Container>
    </section>
  );
}