import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    id: "servispro",
    name: "ServisPro",
    type: "Student full-stack web project",
    description:
      "Auto-service platform with client, service provider and admin workflows.",
    tech: ["React", "ASP.NET Core", "MS SQL Server", "REST API"],
    features: [
      "User roles",
      "Client vehicle management",
      "Service appointment scheduling",
      "Service status tracking",
      "Admin management",
      "Ratings and reviews",
    ],
    learned:
      "Building role-based workflows, REST API integration, database-backed application logic and project organization.",
    github: null,
    live: null,
  },
  {
    id: "elitdent",
    name: "ElitDent",
    type: "Web application / deployment project",
    description:
      "Dental clinic web application deployed on an Ubuntu server.",
    tech: ["Laravel", "PHP", "MySQL", "Nginx", "Ubuntu", "HTTPS"],
    features: [
      "Clinic web application structure",
      "Production deployment",
      "Nginx configuration",
      "SSL/HTTPS setup",
      "MySQL integration",
    ],
    learned:
      "Linux server deployment, domain/HTTPS setup, Nginx configuration and production troubleshooting.",
    github: null,
    live: null,
  },
  {
    id: "knowledge-that-doesnt-fade",
    name: "Knowledge That Doesn't Fade",
    type: "Hackathon / AI learning project",
    description:
      "AI-assisted learning application focused on helping students build durable knowledge.",
    tech: ["Next.js", "AI integration", "Web technologies"],
    features: [
      "Learning-focused workflow",
      "Material organization",
      "Retrieval-practice concept",
      "AI-assisted study flow",
    ],
    learned:
      "AI product thinking, hackathon execution, teamwork under time pressure and presentation.",
    github: null,
    live: null,
  },
  {
    id: "stomatology-is",
    name: "Stomatology IS",
    type: "Systems analysis / database design project",
    description:
      "Information system modeling project for a dental clinic.",
    tech: ["SSA", "DFD", "EER", "Relational database design"],
    features: [
      "Context diagram",
      "Data flow modeling",
      "Entity-relationship modeling",
      "Relational schema planning",
    ],
    learned:
      "Requirements modeling, database design, system decomposition and documentation.",
    github: null,
    live: null,
  },
  {
    id: "hackathon-app",
    name: "Hackathon App",
    type: "Hackathon project",
    description:
      "Web application built during the 3rd UNINP Hackathon, where my team won 1st place.",
    tech: ["Web technologies", "AI integration"],
    features: [
      "24-hour development",
      "Team collaboration",
      "Demo / presentation",
      "Problem-solving under pressure",
    ],
    learned:
      "Fast prototyping, scope control, teamwork and presenting a product under time constraints.",
    github: null,
    live: null,
  },
];
