import type { NewsroomPageData, MediaLinkItem, NewsArticle } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const NEWS_TITLE = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";

const mediaItems = (prefix: string, n = 5): MediaLinkItem[] =>
  Array.from({ length: n }, (_, i) => ({
    id: `${prefix}-${i + 1}`,
    date: "20 Aug 2026",
    title: "Lorem ipsum dolor sit amet",
    href: `/newsroom/${prefix}/${i + 1}`,
  }));

const listRows = (prefix: string, n = 4): NewsArticle[] =>
  Array.from({ length: n }, (_, i) => ({
    id: `${prefix}-${i + 1}`,
    title: NEWS_TITLE,
    date: "28 Mar, 2026",
    image: img(300, 220, `${prefix}-${i + 1}`),
    href: `/newsroom/news/${i + 1}`,
  }));

export const newsroomPageData: NewsroomPageData = {
  hero: {
    title: "Newsroom",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    image: img(1280, 560, "newsroom-hero"),
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Newsroom", href: "/newsroom" },
    ],
  },

  // NOTE: Figma shows "Page Title" + Link 1–5 (placeholders).
  subNavLabel: "Page Title",
  subNav: [
    { label: "Link 1", href: "#media" },
    { label: "Link 2", href: "#latest-news" },
    { label: "Link 3", href: "#stories" },
    { label: "Link 4", href: "#podcasts" },
    { label: "Link 5", href: "#related" },
  ],

  intro: [
    "Institute administers its responsibilities for the regulation, quality control and supervision of its academic programs through its academic governance structure. The faculty members play an important role, as key stakeholders, in the functioning and oversight of academic processes. While there are no departments, all our programs are supported by faculty members belonging to several academic areas. An academic-area is a coherent cluster of related knowledge domains and the primary objective of the area-wise organization is to share academic responsibilities related to teaching and program administration. In addition, the areas strive to function as nodes of synergy catalyzing collaboration and conversation among their members.",
  ],

  media: {
    inMedia: {
      title: "In the media",
      items: mediaItems("in-media"),
      viewAllHref: "/newsroom/in-the-media",
    },
    pressRelease: {
      title: "Press release",
      items: mediaItems("press"),
      viewAllHref: "/newsroom/press-releases",
    },
  },

  latestNews: {
    title: "Latest News",
    description: "",
    featured: {
      id: "feat",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
      date: "28 Mar, 2026",
      image: img(1044, 660, "newsroom-feat"),
      href: "/newsroom/news/feature",
    },
    list: listRows("latest"),
  },

  stories: {
    title: "Stories & Blogs",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    viewAllHref: "/newsroom/stories",
    items: [
      { id: "s1", title: NEWS_TITLE, date: "28 Mar, 2026", image: img(400, 400, "story-1"), href: "/newsroom/stories/1" },
      { id: "s2", title: NEWS_TITLE, date: "28 Mar, 2026", image: img(400, 400, "story-2"), href: "/newsroom/stories/2" },
      { id: "s3", title: NEWS_TITLE, date: "28 Mar, 2026", image: img(400, 400, "story-3"), href: "/newsroom/stories/3" },
      { id: "s4", title: NEWS_TITLE, date: "28 Mar, 2026", image: img(400, 400, "story-4"), href: "/newsroom/stories/4" },
    ],
  },

  podcasts: {
    title: "Podcasts",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    cards: [
      { id: "p1", title: "Podcast Name", image: img(900, 380, "podcast-1"), href: "/newsroom/podcasts/1" },
      { id: "p2", title: "Podcast Name", image: img(900, 380, "podcast-2"), href: "/newsroom/podcasts/2" },
      { id: "p3", title: "Podcast Name", image: img(900, 380, "podcast-3"), href: "/newsroom/podcasts/3" },
    ],
  },

  cta: {
    left: {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "/newsroom/subscribe",
    },
    right: {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "/newsroom/contribute",
    },
  },
};