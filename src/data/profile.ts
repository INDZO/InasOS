import type { Achievement, Education, Profile } from "@/types/portfolio";

export const profile: Profile = {
  name: "Inas Hamzagić",
  role: "Software Engineering Student | Full-Stack Developer",
  tagline:
    "I build full-stack applications with React, ASP.NET Core, C# and SQL.",
  bio: "I’m a final-year Software Engineering student at the State University of Novi Pazar. My work spans an independent client delivery, university full-stack applications and team collaboration.",
  focus:
    "Full-stack application development, from interface design through APIs and relational data modeling.",
  status:
    "Open to internships, junior developer opportunities and collaboration.",
  email: "hamzagicinas@gmail.com",
  github: "https://github.com/INDZO",
  linkedin: "https://www.linkedin.com/in/hamzagicinas/",
};

export const education: Education[] = [
  {
    institution: "State University of Novi Pazar",
    degree: "Software Engineering · Final year",
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
    "Our team won first place with Oranž in 2026. I proposed the concept selected by the team, tested the application, helped present it and initiated the live QR demonstration.",
};

export const languages = [
  { name: "Serbian", level: "Native" },
  { name: "English", level: "Advanced / Proficient" },
];
