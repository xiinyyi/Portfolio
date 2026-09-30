export type PageSection = 'home' | 'about' | 'work' | 'experience' | 'contact';

export type WorkCategory = 
  | '01 — SHORT-FORM & SOCIAL CONTENT'
  | '02 — PODCAST & VIDEO PRODUCTION'
  | '03 — CAMPAIGN & PROJECT LAUNCHES'
  | '04 — CREATIVE DESIGN';

export interface ProjectItem {
  id: string;
  category: WorkCategory;
  categoryShort: string;
  title: string;
  subtitle: string;
  company: string;
  objective: string;
  roleList: string[];
  resultMetric: string;
  resultDescription: string;
  heroImage: string;
  mediaType: 'video' | 'podcast' | 'campaign' | 'gallery';
  videoDuration?: string;
  episodeNumber?: string;
  btsImages?: string[];
  fullNarrative?: string[];
  keyHighlights: string[];
  customVideoUrl?: string;
  customVideoType?: 'file' | 'youtube' | 'vimeo' | 'direct_url' | 'drive';
}

export interface CreativeDesignItem {
  id: string;
  title: string;
  type: string;
  image: string;
  dimensions: string;
  description: string;
  purpose: string;
}

export interface PartnerBrand {
  name: string;
  category: string;
  benefit: string;
  tagline: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface UserProfile {
  name: string;
  phone: string;
  phoneRaw: string;
  tagline: string;
  positioning: string;
  subTagline: string;
  education: string;
  location: string;
  email: string;
  linkedin: string;
  cvLink: string;
  heroImage: string;
  aboutBio: string[];
  narrativeSteps: {
    title: string;
    subtitle: string;
    icon: string;
  }[];
  whatIBring: {
    icon: string;
    title: string;
    description: string;
  }[];
}
