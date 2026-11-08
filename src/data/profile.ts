import type { Achievement, Education, Profile } from "@/types/portfolio";

export const profile: Profile = {
  name: "Inas Hamzagić",
  role: "Software Engineering Student · Full-stack Development",
  tagline:
    "From the interface to the database. I build practical web applications and learn by bringing ideas to life.",
  bio: "I’m Inas, a Software Engineering student at the State University of Novi Pazar. I build web applications with React, Next.js, ASP.NET Core and Laravel, connecting thoughtful interfaces with APIs and databases. My projects span service management, learning tools and interactive experiences. I enjoy solving problems with a team, and I’m looking for an internship or junior role where I can contribute and keep growing.",
  focus:
    "Full-stack web development, algorithms and data structures, relational databases, and deploying applications on Linux.",
  status:
    "Open to internships, junior developer opportunities and collaboration.",
  email: "hamzagicinas@gmail.com",
  github: "https://github.com/INDZO",
  linkedin: "https://www.linkedin.com/in/hamzagicinas/",
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
