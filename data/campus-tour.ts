import type { CampusTourContentData } from "@/lib/types";

// Mock fallback for the Campus Tour page's intro + CTA content (used when
// the "campus-tour" WP page has no ACF fields yet). `galleries` is not
// included here — it's always fetched live via getPhotoGalleryCategories().
export const campusTourContentData: Omit<CampusTourContentData, "galleries"> = {
  intro:
    "Take a closer look at life at DAU — explore our campus, classrooms, hostels, and student spaces through the eyes of the people who study and work here.",
  cta: {
    label: "Book a Visit",
    href: "#",
  },
};
