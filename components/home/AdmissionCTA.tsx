import { ActionButton } from "@/components/ui/ActionButton";
import { PaperMark } from "@/components/ui/icons";
import type { HomeData } from "@/lib/types";

export function AdmissionCTA({ data }: { data: HomeData["admissionCta"] }) {
  return (
    <section className="relative isolate overflow-hidden bg-black py-20 text-center text-white lg:py-28">
      {/* dark photo backdrop */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center grayscale"
        style={{ backgroundImage: "url('/images/admission-bg.png')" }}
        aria-hidden
      />
      {/* <div className="absolute inset-0 -z-10 bg-black/55" aria-hidden /> */}
      {/* <div className="absolute inset-0 -z-10 bg-black/55" aria-hidden /> */}

      <div className="mx-auto flex max-w-3xl flex-col items-center px-6">
        <div className="mb-6 flex justify-center">
          <PaperMark />
        </div>
        <p className="text-base font-medium text-white/85">{data.eyebrow}</p>
        <h2 className="mt-2 font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-tight">
          {data.title}
        </h2>
        <p className="mt-4 max-w-xl text-base font-medium text-white/80">
          {data.description}
        </p>
        <div className="mt-8">
          <ActionButton href="/apply" variant="filledRoyal">
            Get Started
          </ActionButton>
        </div>
      </div>

      {/* decorative gold frame */}
      <div
        className="pointer-events-none absolute inset-x-6 inset-y-8 -z-0 hidden border border-gold/60 lg:block"
        aria-hidden
        style={{ maxWidth: 913, margin: "auto" }}
      />
    </section>
  );
}
