import type { LeadershipPageData, FacultyMember } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const SPLIT_DESC =
  "Dhirubhai Ambani University (Formerly DA-IICT) has played a pioneering role in developing innovative undergraduate programs in Information and Communication Technology (ICT) in India since 2001. The pedagogy of ICT discipline should make a well-integration of Information Technology, Communication Technology.";

const INTRO_BLOCK_1 =
  "Dhirubhai Ambani Institute of Information and Communication Technology (DA-IICT), Gandhinagar represents Wave-4 of educational innovation in Gujarat.\nThe first wave was the nationalist wave and led to Gandhian experiments in education including Nai Talim. The Gujarat Vidyapith established in 1920 was a hybrid model of a University based on Gandhian principles.";

const INTRO_BLOCK_2 =
  "The second wave led to the establishment of a whole range of educational institutions in Gujarat, mainly private colleges.\nThe third wave, an inspired one, was spearheaded by the Industrialist Kasturbhai Lalbhai and the Scientist Vikram Sarabhai and led to the establishment of a network of national institutes of international renown. A whole array of remarkable intellectuals provided the leadership of these Institutes.\nIt was in Wave 4 when the focus shifted to higher education and private participation. One of the Institutes created during this period is DA-IICT in 2001. It is the only advanced research and teaching Institute named after the Late Dhirubhai Ambani, the founder of Reliance Group.";

/** Build a row of placeholder people cards. */
const people = (prefix: string, n = 6): FacultyMember[] =>
  Array.from({ length: n }, (_, i) => ({
    id: `${prefix}-${i + 1}`,
    name: "Faculty Name",
    position: "Position, Department",
    image: img(580, 700, `${prefix}-${i + 1}`),
    href: `/about/leadership/${prefix}/${i + 1}`,
  }));

export const leadershipPageData: LeadershipPageData = {
  hero: {
    title: "Leadership",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    image: img(1280, 560, "leadership-hero"),
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Leadership", href: "/about/leadership" },
    ],
  },

  // NOTE: Figma shows "Page Title" + Link 1–5 (placeholders).
  subNavLabel: "Page Title",
  subNav: [
    { label: "Link 1", href: "#president" },
    { label: "Link 2", href: "#board-of-governors" },
    { label: "Link 3", href: "#academic-council" },
    { label: "Link 4", href: "#director-general" },
    { label: "Link 5", href: "#directors" },
  ],

  intro: [INTRO_BLOCK_1, INTRO_BLOCK_2],

  president: {
    title: "President",
    name: "Mrs. Tina Anil Ambani",
    role: "President",
    image: img(720, 900, "president"),
    bio: [
      "Tina Anil Ambani is the chairperson, Group CSR, Reliance Group, where she spearheads sustainability initiatives in the areas of education, healthcare, art and rural transformation.\nShe is the chairperson of the Mudra Foundation for Communications Research and Education, which manages MICA, the only residential institute in the Asia-Pacific region, dedicated to creating leadership in Strategic Marketing and Communication.",
      "Over the years, Tina Ambani has served on the advisory board of the National Gallery of Modern Art, Mumbai; the National Institute of Design, Ahmedabad; and as nominee to the reconstituted General Assembly of the Indian Council for Cultural Relations (ICCR).",
      "She launched the Kokilaben Dhirubhai Ambani Hospital & Medical Research Institute (KDAH) in Mumbai in 2009, India's most advanced quaternary care facility with a unique full-time specialist system, which has succeeded in bringing the world's best technology and treatment protocols to India.\nShe is credited with setting up of Harmony Art Foundation, an internationally recognised platform dedicated to building relationships with Indian artists, spreading awareness of art, promoting academic activities, including workshops, and international collaborations.",
      "She established Harmony for Silvers Foundation in 2004. A non-government organisation formed to enhance the quality of life of 'Silvers'—Harmony's term for the elderly—in India.",
    ],
  },

  boardOfGovernors: {
    title: "Board of Governors",
    description: SPLIT_DESC,
    members: people("bog"),
  },

  academicCouncil: {
    title: "Academic Council",
    description: SPLIT_DESC,
    members: people("ac"),
  },

  financeCommittee: {
    title: "Finance Committee",
    description: SPLIT_DESC,
    members: people("fc"),
  },

  directorGeneral: {
    title: "Director General",
    name: "Dr. Tathagata Bandyopadhyay",
    role: "Director General",
    image: img(720, 900, "director-general"),
    bio: [
      "Dr. Tathagata Bandyopadhyay earned his PhD, MSc, and BSc degrees in Statistics from the University of Calcutta. Before joining Dhirubhai Ambani University (formerly DA-IICT), he held the position of Dean (Faculty) and Professor at the Indian Institute of Management Ahmedabad. Dr. Bandyopadhyay has extensive teaching experience and has visited several universities, including the University of Nebraska, University of Connecticut, Michigan State University, Iowa State University, University of Georgia, University of Windsor (Canada), Umea University (Sweden), and National University of Singapore. He assumed the role of Distinguished Professor at DA-IICT in December 2021.",
      "Since 2009, Dr. Bandyopadhyay has been the editor of the Calcutta Statistical Association Bulletin. Additionally, he has contributed to the editorial boards of journals such as Sankhya, Journal of the Indian Society of Agricultural Statistics, and the Journal of Agricultural, Biological, and Environmental Statistics (a journal of the American Statistical Association).",
      "Having authored over 70 research articles in premier national and international journals, Dr. Bandyopadhyay has significantly contributed to the field. In addition to his editorial responsibilities, he has supervised numerous PhD students and played a crucial role as a member of the PhD Dissertation Committee at the University of Calcutta and IIMA.",
    ],
  },

  directors: {
    title: "Directors",
    description: SPLIT_DESC,
    members: people("dir"),
  },

  diversity: {
    title: "We Are One of The Largest, Most Diverse Universities in India",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
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