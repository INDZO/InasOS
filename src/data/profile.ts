import type { Achievement, Education, Profile } from "@/types/portfolio";

export const profile: Profile = {
  name: "Inas Hamzagić",
  role: "Software Engineering Student",
  tagline:
    "Software Engineering student focused on web development, software development, algorithms and problem-solving.",
  bio: "I am a third-year Software Engineering student at the State University of Novi Pazar. I am interested in software development, web development, algorithms, databases and practical problem-solving. I enjoy building real projects, learning through implementation and improving my skills through teamwork, hackathons and hands-on development.",
  focus:
    "Currently building full-stack web projects, sharpening algorithms and data structures, and exploring modern frontend and backend stacks.",
  status:
    "Open to internships, junior developer opportunities and collaboration.",
  email: "hamzagicinas@gmail.com",
  github: "https://github.com/INDZO",
  linkedin: null,
};

export const education: Education[] = [
  {
    institution: "State University of Novi Pazar",
    degree: "Bachelor Studies in Software Engineering",
    start: "01/10/2023",
    end: "current",
    topics: [
      "Software engineering",
      "Programming",
      "Algorithms and data structures",
      "Databases",
      "Web technologies",
      "Computer networks",
      "Operating systems",
      "Mathematics",
      "Software development",
      "Teamwork and problem-solving",
    ],
  },
  {
    institution: "Gymnasium Novi Pazar",
    degree: "Secondary School Diploma — Gymnasium, IT Department",
    start: "01/09/2019",
    end: "16/06/2023",
    topics: [
      "Information technology",
      "Computer science",
      "Programming basics",
      "Mathematics",
      "Databases",
      "Web design",
      "English language",
      "Communication skills",
    ],
  },
];

export const achievement: Achievement = {
  title: "1st Place — 3rd UNINP Hackathon",
  organizer: "International University of Novi Pazar",
  date: "25/04/2026",
  description:
    "Won 1st place at the 3rd UNINP Hackathon by developing a web application within 24 hours, demonstrating programming, teamwork and problem-solving skills.",
};

export const languages = [
  { name: "Serbian", level: "Native" },
  { name: "English", level: "Advanced / Proficient" },
];
