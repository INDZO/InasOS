import type { Project } from "@/types/portfolio";

const existingProjects: Project[] = [
  {
    id: "servispro",
    name: "ServisPro",
    type: "Student full-stack web project",
    description:
      "An auto-service platform where drivers manage their vehicles and book appointments, workshops update service progress, and admins oversee operations.",
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
      "A Laravel web application for a dental clinic, served over HTTPS with Nginx on Ubuntu and backed by MySQL.",
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
      "A system design for a dental clinic that maps its workflows with data-flow diagrams and translates the data model into a relational schema.",
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

const projectFacts: Record<string, Partial<Project>> = {
  servispro: { documentation: 'https://github.com/INDZO/Softversko-Inzenjerstvo-2026', category: 'fullstack', featured: true, accent: 'blue', role: 'Student team project' },
  elitdent: { category: 'fullstack', accent: 'teal', role: 'Web application and deployment project' },
  'knowledge-that-doesnt-fade': { category: 'fullstack', featured: true, accent: 'amber', role: 'Team hackathon project' },
  'stomatology-is': { category: 'design', accent: 'rose', role: 'Academic systems analysis project' },
};

const additionalProjects: Project[] = [
  {
    id: 'inasos', name: 'InasOS', type: 'Interactive developer portfolio', category: 'web', featured: true, accent: 'orange',
    description: 'A portfolio you can explore like an operating system, with a desktop workspace, mobile apps and an interactive terminal.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Zustand'],
    features: ['Desktop window manager', 'Dedicated mobile experience', 'English and Serbian', 'Searchable projects and terminal commands'],
    learned: 'Managing shared UI state, responsive interactions and accessible navigation in a complex interface.',
    role: 'Portfolio design and development',
    github: 'https://github.com/INDZO/InasOS', live: 'https://hamzagicinas.vercel.app',
  },
  {
    id: 'bitka-upside-down', name: 'Bitka Upside Down', type: 'Realtime strategy game', category: 'fullstack', featured: true, accent: 'violet',
    description: 'A turn-based 8-bit chase game where players collect memories and race to reach a portal. Django enforces the rules and broadcasts moves over WebSockets.',
    tech: ['React', 'Vite', 'Django', 'Django Channels', 'WebSocket'],
    features: ['Server-side rules and timers', 'Realtime play with REST fallback', 'AI search and pathfinding', 'Game statistics'],
    learned: 'Coordinating frontend state with server-side decisions and exploring algorithms in an interactive game.',
    role: 'Full-stack game project', github: null, live: 'https://bitka-upside-down.onrender.com/',
  },
  {
    id: 'telecom', name: 'tele.com', type: 'Telecom website', category: 'web', accent: 'cyan',
    description: 'A multi-page web design project presenting telecom services and packages, published with GitHub Pages.',
    tech: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    features: ['Service and package pages', 'Contact and account interface prototypes', 'Multi-page navigation', 'Static deployment'],
    learned: 'Building a cohesive multi-page website with browser fundamentals and publishing it to the web.',
    role: 'Web design project', github: 'https://github.com/INDZO/tele.com', live: 'https://indzo.github.io/tele.com/',
  },
  {
    id: 'library-is', name: 'IS Biblioteka', type: 'Library information system', category: 'desktop', accent: 'emerald',
    description: 'A Windows desktop application for managing library books, members and loans, built as a database graduation project.',
    tech: ['C#', 'Windows Forms', '.NET Framework 4.7.2', 'SQL Server'],
    features: ['Book and member management', 'Book loans', 'Search and CRUD forms', 'Repository-based database access'],
    learned: 'Modeling relational data and connecting a desktop interface to persistent storage.',
    role: 'School graduation project', github: 'https://github.com/INDZO/IS_Biblioteka-master', live: null,
  },
];

// The generic Hackathon App entry described an achievement rather than a distinct
// project. The award remains in profile data and in the Hackathon application.
export const projects: Project[] = [
  additionalProjects[0],
  ...existingProjects.filter((project) => project.id !== 'hackathon-app').map((project) => ({ ...project, ...projectFacts[project.id] })),
  ...additionalProjects.slice(1),
].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
