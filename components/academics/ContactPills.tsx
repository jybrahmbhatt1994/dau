import { Container } from "@/components/ui/Container";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-5 w-5 text-navy">
      <path d="M6.5 3h-2A1.5 1.5 0 0 0 3 4.6C3 13 11 21 19.4 21A1.5 1.5 0 0 0 21 19.5v-2a1 1 0 0 0-.8-1l-3-.6a1 1 0 0 0-1 .4l-.9 1.2a13 13 0 0 1-5.8-5.8l1.2-.9a1 1 0 0 0 .4-1l-.6-3a1 1 0 0 0-1-.8Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-5 w-5 text-navy">
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  );
}

export function ContactPills({
  phone,
  email,
}: {
  phone: string;
  email: string;
}) {
  return (
    <section className="bg-surface pb-16 lg:pb-20">
      <Container className="flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
        <a
          href={`tel:${phone.replace(/[^+\d]/g, "")}`}
          className="inline-flex items-center gap-4 bg-[#F6EFD9] px-8 py-4 font-display text-base font-semibold text-navy transition-colors hover:bg-[#efe6c8] sm:text-lg"
        >
          <PhoneIcon />
          {phone}
        </a>
        <a
          href={`mailto:${email}`}
          className="inline-flex items-center gap-4 bg-[#F6EFD9] px-8 py-4 font-display text-base font-semibold text-navy transition-colors hover:bg-[#efe6c8] sm:text-lg"
        >
          <MailIcon />
          {email}
        </a>
      </Container>
    </section>
  );
}