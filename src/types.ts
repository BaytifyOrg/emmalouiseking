export interface Milestone {
  year: string;
  period: string;
  title: string;
  organization: string;
  location: string;
  roleType: string;
  description: string;
  achievements: string[];
  skills: string[];
  keyTakeaway: string;
}

export interface PerformancePillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  actionPoints: string[];
  impactMetric: string;
  metricLabel: string;
}

export interface StatMetric {
  id: string;
  value: string;
  label: string;
  subtext: string;
  category: string;
}

export interface Endorsement {
  id: string;
  quote: string;
  author: string;
  title: string;
  organization?: string;
  relation?: string;
  avatarInitials: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  readTime: string;
  publishedDate: string;
  featured?: boolean;
  coverImage?: string;
  tags: string[];
  keyTakeaways?: string[];
}

export type Page = 'home' | 'blogs' | 'careers' | 'partners' | 'intro';

export type Audience = 'corporate' | 'developer' | 'brokerage' | 'candidate' | 'other';

export interface Role {
  slug: string;
  title: string;
  team: string | null;
  location: string | null;
  employment_type: string | null;
  summary: string | null;
  highlights: string[] | null;
  requirements: string[] | null;
}

export interface IntroLink {
  slug: string;
  company: string;
  contact_name: string | null;
  audience: Exclude<Audience, 'other'>;
  headline: string | null;
  message: string | null;
}
