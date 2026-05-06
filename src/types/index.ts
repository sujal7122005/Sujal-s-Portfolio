export type AccentColor = "cyan" | "orange" | "violet" | "green";

export interface NavItem {
  label: string;
  href: string;
}

export interface HeroRole {
  label: string;
}

export interface StatItem {
  value: number;
  suffix?: string;
  label: string;
}

export interface SkillItem {
  label: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export interface ProjectItem {
  id: number;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  highlights: string[];
  sourceUrl: string;
  liveUrl?: string;
  accent: AccentColor;
}

export interface TimelineItem {
  period: string;
  title: string;
  organization: string;
  subtitle?: string;
  bullets?: string[];
}

export interface CertificationItem {
  id: number;
  name: string;
  issuer: string;
  year: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}
