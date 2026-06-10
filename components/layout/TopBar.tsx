import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PhoneIcon } from "@/components/ui/icons";
import { utilityLinks } from "@/data/navigation";

export function TopBar() {
  return (
    <div className="hidden bg-navy text-white lg:block">
      <Container className="flex h-10 items-center justify-end">
        <nav className="flex items-center gap-5">
          {utilityLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[11px] font-semibold tracking-wide text-white/90 transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
          <span className="ml-2 flex items-center gap-2 border-l border-white/20 pl-4">
            <PhoneIcon className="h-3.5 w-3.5" />
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.2627 12.7985C14.0371 13.0535 13.8004 13.3054 13.5529 13.5529C9.97304 17.1327 5.48813 18.4518 3.5355 16.4992C2.19684 15.1605 2.39592 12.6317 3.80697 10.0202M5.74131 7.27105C5.97607 7.00413 6.22302 6.74064 6.48178 6.48187C10.0616 2.90207 14.5465 1.58297 16.4991 3.53559C17.8387 4.87518 17.6384 7.40663 16.2247 10.02M13.5529 6.48187C17.1327 10.0617 18.4518 14.5466 16.4991 16.4992C14.5465 18.4518 10.0616 17.1327 6.48178 13.5529C2.90198 9.97313 1.58288 5.48821 3.5355 3.53559C5.48813 1.58297 9.97304 2.90206 13.5529 6.48187ZM10.8333 10C10.8333 10.4602 10.4602 10.8333 9.99997 10.8333C9.53973 10.8333 9.16664 10.4602 9.16664 10C9.16664 9.53976 9.53973 9.16667 9.99997 9.16667C10.4602 9.16667 10.8333 9.53976 10.8333 10Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </nav>
      </Container>
    </div>
  );
}
