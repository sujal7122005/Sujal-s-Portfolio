import type {
  CertificationItem,
  HeroRole,
  NavItem,
  ProjectItem,
  SkillCategory,
  SocialLink,
  StatItem,
  TimelineItem,
} from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const HERO_ROLES: HeroRole[] = [
  { label: "Full-Stack Developer" },
  { label: "Problem Solver" },
  { label: "UI Craftsman" },
  { label: "Open Source Builder" },
];

export const ABOUT_STATS: StatItem[] = [
  { value: 9.04, label: "CGPA" },
  { value: 3, suffix: "+", label: "Projects Built" },
  { value: 200, suffix: "+", label: "Event Attendees" },
  { value: 4, label: "Certifications" },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { label: "Java" },
      { label: "Python" },
      { label: "C" },
      { label: "JavaScript" },
      { label: "TypeScript" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { label: "HTML" },
      { label: "CSS" },
      { label: "React.js" },
      { label: "Next.js" },
      { label: "Tailwind CSS" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { label: "Node.js" },
      { label: "Express.js" },
      { label: "REST APIs" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { label: "MongoDB" },
      { label: "MySQL" },
      { label: "PostgreSQL" },
    ],
  },
  {
    title: "Machine Learning",
    skills: [
      { label: "NumPy" },
      { label: "Pandas" },
      { label: "Scikit-learn" },
      { label: "Gemini API" },
    ],
  },
  {
    title: "Tools and Platforms",
    skills: [
      { label: "Git" },
      { label: "GitHub" },
      { label: "Postman" },
      { label: "Cloudinary" },
      { label: "Appwrite" },
      { label: "VS Code" },
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 1,
    name: "Unsaid",
    tagline: "Anonymous Feedback Platform",
    description:
      "Built an anonymous feedback platform with AI-powered message suggestions, OTP authentication, and shareable user profile links.",
    tech: ["Next.js", "TypeScript", "MongoDB", "NextAuth", "Gemini API"],
    highlights: [
      "Integrated AI message suggestions for faster anonymous feedback.",
      "Implemented JWT and session-backed authentication flows.",
      "Enabled 50+ shareable profile links for user outreach.",
    ],
    sourceUrl: "https://github.com/sujal7122005/Unsaid-Anonymous-feedback-web-application",
    liveUrl: "https://unsaid-liart.vercel.app/",
    accent: "cyan",
  },
  {
    id: 2,
    name: "Pupple",
    tagline: "Full-Stack Blog Application",
    description:
      "Designed and deployed a feature-rich blogging platform with full CRUD, rich text editing via TinyMCE, and global state management using Redux.",
    tech: ["React.js", "Appwrite", "Redux", "TinyMCE"],
    highlights: [
      "Built full CRUD publishing workflows for blog authors.",
      "Added protected routes and role-aware access control.",
      "Used Appwrite BaaS and Redux for scalable state handling.",
    ],
    sourceUrl: "https://github.com/sujal7122005/React-Mega-Project---BlogAPP",
    accent: "violet",
  },
  {
    id: 3,
    name: "VideoTube",
    tagline: "Video Platform Backend API",
    description:
      "Engineered a production-grade REST API backend for a YouTube-like platform with likes, comments, playlists, and Cloudinary media streaming.",
    tech: ["Node.js", "Express.js", "MongoDB", "Cloudinary"],
    highlights: [
      "Designed modular REST APIs for video, likes, and playlist flows.",
      "Implemented JWT plus cookie-based authentication.",
      "Handled media upload and streaming through Cloudinary.",
    ],
    sourceUrl: "https://github.com/sujal7122005/VideoTube---Backend-Project",
    accent: "green",
  },
];

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    period: "2024-Present",
    title: "Lead, Entrepreneurship Cell (E-Cell), VGEC",
    organization: "Vishwakarma Government Engineering College",
    bullets: [
      "Organized events with 200+ participants.",
      "Coordinated 20+ team members across initiatives.",
      "Managed sponsorship and speaker outreach.",
    ],
  },
  {
    period: "2023-Present",
    title: "B.E. Computer Engineering",
    organization: "Vishwakarma Government Engineering College",
    subtitle: "CGPA: 9.04",
  },
  {
    period: "2021-2023",
    title: "12th Science",
    organization: "Vivekananda Higher Secondary School",
    subtitle: "80.15%",
  },
  {
    period: "2020-2021",
    title: "10th Board",
    organization: "Arpan Vidhya Sankul",
    subtitle: "99.16%",
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 1,
    name: "Complete Web Development Bootcamp",
    issuer: "Hitesh Chaudhary (Udemy)",
    year: "2026",
  },
  {
    id: 2,
    name: "ECONOMANIA Hackathon",
    issuer: "PDEU Gujarat",
    year: "2025",
  },
  {
    id: 3,
    name: "Cloud Skills Challenge",
    issuer: "Microsoft Learn",
    year: "2024",
  },
  {
    id: 4,
    name: "AI Tools Workshop",
    issuer: "be10x",
    year: "2024",
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", url: "https://github.com/sujal7122005" },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/sujal-patel-1a8b94329/",
  },
  { label: "LeetCode", url: "https://leetcode.com/u/sujal_debugs/" },
];

export const CONTACT_DETAILS = {
  email: "sdpatel7122005@gmail.com",
  phone: "+91-8799355018",
  status: "Available for Internships",
};
