import type { HomeData } from "@/lib/types";

// Placeholder imagery via picsum.photos (stable seeds => stable images).
// Replace `image` fields with WordPress media URLs during integration.
const img = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const ICT_PARAGRAPH =
  "Dhirubhai Ambani University (Formerly DA-IICT) has played a pioneering role in developing innovative undergraduate programs in Information and Communication Technology (ICT) in India since 2001. The pedagogy of ICT discipline should make a well-integration of Information Technology, Communication Technology.";

const LOREM_SHORT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.";

const CARD_BODY =
  "Dhirubhai Ambani University (Formerly DA-IICT) has played a pioneering role in developing innovative undergraduate programs.";

export const homeData: HomeData = {
  hero: {
    eyebrow: "School of technology, Dhirubhai Ambani University",
    rankLabel: "Ranked",
    rankValue: "#1",
    subline: "Among new age academics by Times of India",
    images: [
      img("campus-life-2", 1000, 700),
      img("campus-life-2", 1000, 700),
      img("campus-life-3", 1000, 700),
      img("campus-life-4", 1000, 700),
    ],
  },

  academics: {
    title: "Academics",
    description: ICT_PARAGRAPH,
    cards: [
      { id: "ug", title: "Undergraduate Programs", excerpt: CARD_BODY, image: img("acad-ug", 600, 420), href: "/academics/ug-programs" },
      { id: "dual", title: "Dual Degree Programs", excerpt: CARD_BODY, image: img("acad-dual", 600, 420), href: "/academics/dual-degree" },
      { id: "pg", title: "Postgraduate Programs", excerpt: CARD_BODY, image: img("acad-pg", 600, 420), href: "/academics/pg-programs" },
      { id: "phd", title: "Doctoral Programs", excerpt: CARD_BODY, image: img("acad-phd", 600, 420), href: "/academics/doctoral" },
    ],
  },

  admissionCta: {
    eyebrow: "Ready to take a leap?",
    title: "Admissions started for 2027",
    description: LOREM_SHORT,
  },

  faculty: {
    title: "Faculty",
    description: ICT_PARAGRAPH,
    members: [
      { id: "f1", name: "Faculty Name", position: "Position, Department", image: "/faculty/faculty-1.png", href: "/faculty/1" },
      { id: "f2", name: "Faculty Name", position: "Position, Department", image: "/faculty/faculty-2.png", href: "/faculty/2" },
      { id: "f3", name: "Faculty Name", position: "Position, Department", image: "/faculty/faculty-3.png", href: "/faculty/3" },
      { id: "f4", name: "Faculty Name", position: "Position, Department", image: "/faculty/faculty-1.png", href: "/faculty/4" },
      { id: "f5", name: "Faculty Name", position: "Position, Department", image: "/faculty/faculty-2.png", href: "/faculty/5" },
    ],
  },

  research: {
    title: "Research",
    description: ICT_PARAGRAPH,
    cards: [
      { id: "r1", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "28 Mar, 2026", image: img("research-1", 600, 380), href: "/research/1" },
      { id: "r2", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "28 Mar, 2026", image: img("research-2", 600, 380), href: "/research/2" },
      { id: "r3", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "28 Mar, 2026", image: img("research-3", 600, 380), href: "/research/3" },
      { id: "r4", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "28 Mar, 2026", image: img("research-4", 600, 380), href: "/research/4" },
      { id: "r5", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "28 Mar, 2026", image: img("research-5", 600, 380), href: "/research/5" },
    ],
  },

  publications: {
    title: "Research Publications",
    description: LOREM_SHORT,
    items: [
      { id: "p1", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "28 Mar, 2026", image: img("pub-1", 360, 360), href: "/research/publications/1" },
      { id: "p2", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "28 Mar, 2026", image: img("pub-2", 360, 360), href: "/research/publications/2" },
      { id: "p3", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "28 Mar, 2026", image: img("pub-3", 360, 360), href: "/research/publications/3" },
      { id: "p4", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "28 Mar, 2026", image: img("pub-4", 360, 360), href: "/research/publications/4" },
    ],
  },

  placements: {
    title: "Placements",
    description: LOREM_SHORT,
    gallery: [
      img("place-1", 600, 750),
      img("place-2", 600, 750),
      img("place-3", 600, 750),
      img("place-4", 600, 750),
      img("place-5", 600, 750),
      img("place-6", 600, 750),
      img("place-7", 600, 750),
      img("place-8", 600, 750),
    ],
    recruiters: [
      "Microsoft", "Google", "Amazon", "Goldman Sachs", "IPV/SBI", "Deloitte",
      "Adobe", "Oracle", "Cisco", "Samsung",
    ],
    stats: [
      { value: "500+", label: "Students placed" },
      { value: "600+", label: "Placement Offers" },
      { value: "124", label: "Recruiters" },
      { value: "50LPA", label: "Highest salary offered" },
    ],
  },

  life: {
    title: "Life @ DAU",
    description: LOREM_SHORT,
    cards: [
      { id: "l1", title: "Clubs & Society", image: img("life-clubs", 900, 480), href: "/life/clubs" },
      { id: "l2", title: "Residence Life", image: img("life-residence", 900, 480), href: "/life/residence" },
      { id: "l3", title: "Sports Excellence", image: img("life-sports", 900, 480), href: "/life/sports" },
    ],
  },

  news: {
    title: "News & Events",
    description: LOREM_SHORT,
    featured: {
      id: "n0",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
      date: "28 Mar, 2026",
      image: img("news-featured", 900, 540),
      href: "/newsroom/featured",
    },
    list: [
      { id: "n1", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "28 Mar, 2026", image: img("news-1", 300, 300), href: "/newsroom/1" },
      { id: "n2", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "28 Mar, 2026", image: img("news-2", 300, 300), href: "/newsroom/2" },
      { id: "n3", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "28 Mar, 2026", image: img("news-3", 300, 300), href: "/newsroom/3" },
      { id: "n4", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "28 Mar, 2026", image: img("news-4", 300, 300), href: "/newsroom/4" },
    ],
  },

  events: {
    title: "Upcoming Events",
    items: [
      { id: "e1", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "19 Apr, 12:20PM", image: img("event-1", 600, 360), href: "/events/1" },
      { id: "e2", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "19 Apr, 12:20PM", image: img("event-2", 600, 360), href: "/events/2" },
      { id: "e3", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "19 Apr, 12:20PM", image: img("event-3", 600, 360), href: "/events/3" },
    ],
  },

  centers: {
    title: "Centers",
    description: LOREM_SHORT,
    cards: [
      { id: "c1", title: "Entrepreneurship", excerpt: CARD_BODY, image: img("center-entre", 600, 420), href: "/centers/entrepreneurship" },
      { id: "c2", title: "Social Impact", excerpt: CARD_BODY, image: img("center-social", 600, 420), href: "/centers/social-impact" },
      { id: "c3", title: "Arts & Drama", excerpt: CARD_BODY, image: img("center-arts", 600, 420), href: "/centers/arts-drama" },
      { id: "c4", title: "Healthcare", excerpt: CARD_BODY, image: img("center-health", 600, 420), href: "/centers/healthcare" },
    ],
  },

  diversity: {
    title: "We Are One of The Largest, Most Diverse Universities in India",
    description: LOREM_SHORT,
  },

  contact: {
    socialTitle: "Connect on social",
    socialDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    contactTitle: "Contact Us",
    contactDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    phone: "+91-9876543212",
    email: "info@daiict.ac.in",
  },
};
