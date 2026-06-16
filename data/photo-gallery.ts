import type { PhotoGalleryPageData } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const photoGalleryPageData: PhotoGalleryPageData = {
  hero: {
    title: "Photo Gallery",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    image: img(1280, 560, "photo-gallery-hero"),
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Newsroom", href: "/newsroom" },
      { label: "Photo Gallery", href: "/newsroom/photo-gallery" },
    ],
  },

  // NOTE: Figma shows "Page Title" + Link 1–5 (placeholders).
  subNavLabel: "Page Title",
  subNav: [
    { label: "Link 1", href: "#gallery" },
    { label: "Link 2", href: "#link-2" },
    { label: "Link 3", href: "#link-3" },
    { label: "Link 4", href: "#link-4" },
    { label: "Link 5", href: "#related" },
  ],

  intro:
    "Institute administers its responsibilities for the regulation, quality control and supervision of its academic programs through its academic governance structure. The faculty members play an important role, as key stakeholders, in the functioning and oversight of academic processes.",

  categories: [
    { id: "birds", title: "Birds Sighted @ DAU", image: img(900, 380, "gal-birds"), href: "/newsroom/photo-gallery/birds" },
    { id: "campus", title: "Campus", image: img(900, 380, "gal-campus"), href: "/newsroom/photo-gallery/campus" },
    { id: "activities", title: "Student Activities", image: img(900, 380, "gal-activities"), href: "/newsroom/photo-gallery/student-activities" },
    { id: "nature", title: "Nature", image: img(900, 380, "gal-nature"), href: "/newsroom/photo-gallery/nature" },
    { id: "misc", title: "Miscellaneous", image: img(900, 380, "gal-misc"), href: "/newsroom/photo-gallery/miscellaneous" },
  ],

  cta: {
    calendar: {
      title: "Academic Calendar",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "/academics/calendar",
    },
    areas: {
      title: "Academic Areas",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "/academics/areas",
    },
  },
};