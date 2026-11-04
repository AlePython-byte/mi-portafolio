export type Project = {
  id: string;
  title: string;
  summary: string;
  description?: string;
  image?: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  year?: number;
};

export type Testimonial = {
  id: string;
  author: string;
  role: string;
  company?: string;
  quote: string;
  avatar?: string;
};

export type Experience = {
  id: string;
  kind: "academic" | "work";
  role: string;
  company: string;
  location?: string;
  startDate: string; // ISO "YYYY-MM"
  endDate?: string; // omitido = actual
  highlights: string[];
  stack?: string[];
};

export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export type Skill = {
  id: string;
  name: string;
  category: "frontend" | "backend" | "herramientas" | "otros";
  level: SkillLevel;
  icon?: string;
};
