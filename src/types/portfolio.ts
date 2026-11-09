export type Profile = {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  focus: string;
  status: string;
  email: string;
  github: string | null;
  linkedin: string | null;
};

export type Education = {
  institution: string;
  degree: string;
  start: string;
  end: string;
  topics: string[];
};

export type ProjectGroup = "featured" | "academic" | "creative" | "collaboration";

export type Project = {
  id: string;
  name: string;
  group: ProjectGroup;
  type: string;
  description: string;
  detail: string;
  tech: string[];
  github?: string;
  live?: string;
  documentation?: string;
  caseStudy?: string;
  note?: string;
  image?: string;
  imageAlt?: string;
};

export type SkillGroup = {
  id: string;
  title: string;
  items: string[];
};

export type Achievement = {
  title: string;
  organizer: string;
  date: string;
  description: string;
};
