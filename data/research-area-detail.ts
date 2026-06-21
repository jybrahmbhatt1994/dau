import type { ResearchAreaDetailPageData } from "@/lib/types";

const img = (w: number, h: number, seed: string) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const researchAreaDetailPageData: ResearchAreaDetailPageData = {
  hero: {
    title: "AI, ML and Data Science",
    subline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: img(1200, 500, "area-aiml-hero"),
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Research", href: "/research" },
      { label: "Research Areas", href: "/research/areas" },
      { label: "AI, ML and Data Science", href: "/research/areas/ai-ml-data-science" },
    ],
  },

  subNavLabel: "Page Title",
  subNav: [
    { label: "Link 1", href: "#intro" },
    { label: "Link 2", href: "#faculty" },
    { label: "Link 3", href: "#groups" },
    { label: "Link 4", href: "#sponsored" },
    { label: "Link 5", href: "#publications" },
  ],

  intro: {
    paragraphs: [
      "Machine learning and Data science deals with data-driven mathematical models, algorithms and computations that facilitate processing of massive amounts of data for various applications. These are several faculty members at DAIICT working in applications of Machine Learning across different domains, the Natural Processing and the Natural Processing of Language, Vision, and Speech. The research is often multi-disciplinary (e.g. Computer Science and Electrical Engineering, Data Science and Biomedicine, Digital Processing and Communication). Faculty also work on core issues in Machine learning like Dimensionality reduction and Autonomous Machine learning. Topics of Data Science research at DAIICT include Mobility, Computer Networks, Databases and Computational algorithms in different applications. The Space Technology and Research Lab (STAR Lab) and Applications (STAR Lab) is set up at DAIICT with the ambition of harnessing AI and Data Science.",
      "Each faculty is a member of one or more areas depending on their academic interests. Each area has an Area-Coordinator appointed by the Director, on a rotation basis, for a term of two years and acts as a facilitator for the area members.",
    ],
    directorName: "Director: Prof. Bhaskar Chaudhuri!",
    directorRole: "Director, Information and Communication Technology (ICT)",
    directorMessage:
      "Dhirubhai Ambani Institute of Information and Communication Technology (DA-IICT) has established itself as a pioneering institution in Information and Communication Technology. Since 2001, the University of ICT at Ahmedabad has been transforming the landscape of higher education in this region. Discover more about our faculty and research in Information Technology, Communication Technology.",
  },

  faculty: {
    title: "Faculty",
    description:
      "Dhirubhai Ambani Institute of Information and Communication Technology (DA-IICT) has established itself as a pioneering institution in Information and Communication Technology.",
    members: [
      { id: "f1", name: "Faculty Name", position: "Position, Department", image: img(190, 220, "faculty-1"), href: "/faculty/1" },
      { id: "f2", name: "Faculty Name", position: "Position, Department", image: img(190, 220, "faculty-2"), href: "/faculty/2" },
      { id: "f3", name: "Faculty Name", position: "Position, Department", image: img(190, 220, "faculty-3"), href: "/faculty/3" },
      { id: "f4", name: "Faculty Name", position: "Position, Department", image: img(190, 220, "faculty-4"), href: "/faculty/4" },
      { id: "f5", name: "Faculty Name", position: "Position, Department", image: img(190, 220, "faculty-5"), href: "/faculty/5" },
      { id: "f6", name: "Faculty Name", position: "Position, Department", image: img(190, 220, "faculty-6"), href: "/faculty/6" },
    ],
  },

  groups: {
    title: "Research Groups and Labs",
    cards: [
      { id: "g1", title: "Smart City Lab", image: img(148, 148, "lab-1"), href: "/research/labs/smart-city" },
      { id: "g2", title: "Intelligent Surveillance Research Lab (ISRL)", image: img(148, 148, "lab-2"), href: "/research/labs/isrl" },
      { id: "g3", title: "Computational Science and HPC Lab", image: img(148, 148, "lab-3"), href: "/research/labs/hpc" },
      { id: "g4", title: "High Performance Computing Group", image: img(148, 148, "lab-4"), href: "/research/labs/hpcg" },
      { id: "g5", title: "Knowledge Discovery & Management Lab (KDM Lab)", image: img(148, 148, "lab-5"), href: "/research/labs/kdm" },
      { id: "g6", title: "Information Retrieval & Language Processing Lab", image: img(148, 148, "lab-6"), href: "/research/labs/irl" },
      { id: "g7", title: "Natural Language Processing Group", image: img(148, 148, "lab-7"), href: "/research/labs/nlp" },
      { id: "g8", title: "Computer Vision & Deep Learning Research Group", image: img(148, 148, "lab-8"), href: "/research/labs/cvdl" },
      { id: "g9", title: "Pattern Recognition and Image Processing Group", image: img(148, 148, "lab-9"), href: "/research/labs/prip" },
      { id: "g10", title: "Geospatial Lab", image: img(148, 148, "lab-10"), href: "/research/labs/geospatial" },
    ],
    projectsHref: "/research/grants",
    projectsCta: "Research Projects",
  },

  sponsored: {
    title: "Sponsored Research",
    projects: [
      {
        id: "sr1",
        pi: "Prof. Anil Nag / Prof. Rahul Suresh",
        title: 'Development of Proof of Concept of "Optical Navigation System for Assisting Table-Knee Arthroplasty"',
        fundingAgency: "Gujarat Gas Ltd. Through GCRA",
        duration: "Feb 2022 to ongoing",
        amount: "₹1,75,000 000",
      },
      {
        id: "sr2",
        pi: "Prof. Anil Nag / Prof. Rahul Suresh",
        title: 'Development of Proof of Concept of "Optical Navigation System for Assisting Table-Knee Arthroplasty"',
        fundingAgency: "Gujarat Gas Ltd. Through GCRA",
        duration: "Feb 2022 to ongoing",
        amount: "₹1,75,000 000",
      },
      {
        id: "sr3",
        pi: "Prof. Anil Nag / Prof. Rahul Suresh",
        title: 'Development of Proof of Concept of "Optical Navigation System for Assisting Table-Knee Arthroplasty"',
        fundingAgency: "Gujarat Gas Ltd. Through GCRA",
        duration: "Feb 2022 to ongoing",
        amount: "₹1,75,000 000",
      },
      {
        id: "sr4",
        pi: "Prof. Anil Nag / Prof. Rahul Suresh",
        title: 'Development of Proof of Concept of "Optical Navigation System for Assisting Table-Knee Arthroplasty"',
        fundingAgency: "Gujarat Gas Ltd. Through GCRA",
        duration: "Feb 2022 to ongoing",
        amount: "₹1,75,000 000",
      },
      {
        id: "sr5",
        pi: "Prof. Anil Nag / Prof. Rahul Suresh",
        title: 'Development of Proof of Concept of "Optical Navigation System for Assisting Table-Knee Arthroplasty"',
        fundingAgency: "Gujarat Gas Ltd. Through GCRA",
        duration: "Feb 2022 to ongoing",
        amount: "₹1,75,000 000",
      },
    ],
  },

  publications: {
    title: "Current Publications",
    items: [
      {
        id: "p1",
        image: img(400, 267, "pub-1"),
        date: "July 2019",
        excerpt:
          "Sumukh Bansal and Aditya Tatu, Affine Interpolation in a Lie Group Framework, ACM Transactions on Graphics(Proc. 46 th SIGGRAPH), vol. 38(4), pp. 71:1 – 71:16",
        author: "Prof. Aditya Tatu",
        href: "/research/publications/1",
      },
      {
        id: "p2",
        image: img(400, 267, "pub-2"),
        date: "Nov 2019",
        excerpt:
          "Manish Narwaria and Aditya Tatu, Interval-Based Least Squares for Uncertainty-Aware Learning in Human-Centric Multimedia Systems, IEEE Transactions on Neural Networks and Learning Systems, vol. 32(11), pp.5241-5246",
        author: "Prof. Aditya Tatu",
        href: "/research/publications/2",
      },
      {
        id: "p3",
        image: img(400, 267, "pub-3"),
        date: "Feb 2020",
        excerpt:
          "Nileshkumar Vaishnav and Aditya Tatu, Signal Processing on Graphs: Structure Preserving Maps, IET Signal Processing, vol. 13(1), pp. 77 – 86",
        author: "Prof. Aditya Tatu",
        href: "/research/publications/3",
      },
      {
        id: "p4",
        image: img(400, 267, "pub-4"),
        date: "Mar 2020",
        excerpt:
          "Sumukh Bansal and Aditya Tatu, Riemannian Geometry of the Space of Positive-Definite Matrices and Interpolation, Journal of Mathematical Imaging and Vision, vol. 62, pp. 404–424",
        author: "Prof. Aditya Tatu",
        href: "/research/publications/4",
      },
      {
        id: "p5",
        image: img(400, 267, "pub-5"),
        date: "Jun 2020",
        excerpt:
          "Manish Narwaria and Aditya Tatu, Perceptual Quality Assessment of Omnidirectional Images, IEEE Transactions on Multimedia, vol. 23, pp. 2032–2044",
        author: "Prof. Aditya Tatu",
        href: "/research/publications/5",
      },
    ],
  },

  videoCta: {
    image: img(1600, 720, "video-cta-prof"),
    label: "Meet Prof. Bhaskar Chaudhury!",
    href: "https://www.youtube.com/watch?v=example",
  },

  events: {
    title: "Upcoming Events",
    allHref: "/life/events",
    items: [
      {
        id: "e1",
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        date: "19 Apr, 12:20PM",
        image: img(418, 260, "event-1"),
        href: "/events/1",
      },
      {
        id: "e2",
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        date: "19 Apr, 12:20PM",
        image: img(418, 260, "event-2"),
        href: "/events/2",
      },
      {
        id: "e3",
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        date: "19 Apr, 12:20PM",
        image: img(418, 260, "event-3"),
        href: "/events/3",
      },
    ],
  },

  cta: {
    left: {
      title: "Dean (Faculty)",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "/academics/dean",
    },
    right: {
      title: "Faculty List",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cta: "Know More",
      href: "/faculty",
    },
  },
};