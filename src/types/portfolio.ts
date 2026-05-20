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

export type Project = {
  id: string;
  name: string;
  type: string;
  description: string;
  tech: string[];
  features: string[];
  learned: string;
  github: string | null;
  live: string | null;
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
