import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PaperMark, ArrowRight } from "@/components/ui/icons";

export interface HowToApplyData {
  title: string;
  /** Background image rendered behind the dark (greyscale) overlay */
  backgroundImage: string;
  /** Ordered list of steps */
  steps: string[];
  /** Centered CTA at the bottom of the card */
  cta: { label: string; href: string };
}

/**
 * "How to apply?" — full-width dark band with a greyscale background image.
 *
 * A contained inner card (thin gold/white hairline border) sits centered on
 * the band, with a PaperMark decoration at the top center, a centered serif
 * white title, a bulleted steps list (white text + subtle white markers), and
 * a centered navy "Apply Now" button.
 *
 * Background: image + dark scrim; the image is desaturated to greyscale to
 * match the Figma. py-16 lg:py-24.
 */
export function HowToApplySection({ data }: { data: HowToApplyData }) {
  return (
    <section
      id="how-to-apply"
      className="relative scroll-mt-[150px] overflow-hidden py-16 lg:py-24"
    >
      {/* Greyscale background image */}
      <Image
        src={data.backgroundImage}
        alt=""
        fill
        sizes="100vw"
        className="absolute inset-0 object-cover grayscale"
        aria-hidden
      />
      {/* Dark scrim */}
      <div className="absolute inset-0 bg-ink/80" aria-hidden />

      {/* Centered content card */}
      <Container className="relative">
        <div className="mx-auto max-w-3xl border border-white/25 px-6 py-12 sm:px-10 lg:px-14 lg:py-14">
          {/* Paper mark decoration, top center */}
          <div className="flex justify-center">
            <PaperMark />
          </div>

          <h2 className="mt-4 text-center font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-white">
            {data.title}
          </h2>

          <ul className="mt-8 list-disc space-y-3 pl-6 text-[14px] leading-7 text-white/85 marker:text-white/50 lg:text-[15px] lg:leading-8">
            {data.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>

          <div className="mt-10 flex justify-center">
            <Link
              href={data.cta.href}
              className="group inline-flex h-11 items-center justify-between gap-6 bg-navy px-6 font-display text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-navy/90"
            >
              <span>{data.cta.label}</span>
              <ArrowRight className="h-4 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}