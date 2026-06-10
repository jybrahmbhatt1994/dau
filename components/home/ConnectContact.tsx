import Link from "next/link";
import { LinkedInIcon, XIcon } from "@/components/ui/icons";
import type { HomeData } from "@/lib/types";

export function ConnectContact({ data }: { data: HomeData["contact"] }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      {/* Connect on social — gold */}
      <div className="flex flex-col justify-center bg-gold px-8 py-14 sm:px-14 lg:py-16">
        <div className="mx-auto w-full max-w-md">
          <h2 className="font-display text-[32px] font-semibold text-navy">
            {data.socialTitle}
          </h2>
          <p className="mt-3 text-base font-medium text-navy/80">
            {data.socialDescription}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <Link
              href="#"
              aria-label="LinkedIn"
              className="inline-flex h-11 w-11 items-center justify-center text-navy transition-opacity hover:opacity-70"
            >
              <LinkedInIcon className="h-9 w-9" />
            </Link>
            <Link
              href="#"
              aria-label="X (Twitter)"
              className="inline-flex h-11 w-11 items-center justify-center text-navy transition-opacity hover:opacity-70"
            >
              <XIcon className="h-8 w-8" />
            </Link>
          </div>
        </div>
      </div>

      {/* Contact — red */}
      <div className="flex flex-col justify-center bg-brand px-8 py-14 text-white sm:px-14 lg:py-16">
        <div className="mx-auto w-full max-w-md">
          <h2 className="font-display text-[32px] font-semibold">
            {data.contactTitle}
          </h2>
          <p className="mt-3 text-base font-medium text-white/85">
            {data.contactDescription}
          </p>
          <div className="mt-6 space-y-3">
            <a
              href={`tel:${data.phone.replace(/[^+\d]/g, "")}`}
              className="block font-display text-[clamp(1.75rem,4vw,2.5rem)] font-semibold transition-opacity hover:opacity-80"
            >
              {data.phone}
            </a>
            <a
              href={`mailto:${data.email}`}
              className="block font-display text-[clamp(1.75rem,4vw,2.5rem)] font-semibold transition-opacity hover:opacity-80"
            >
              {data.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
