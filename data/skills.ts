import type { SkillsData } from "./types";

export const skills: SkillsData = {
  label: "03 · Habilidades",
  headline: "Las herramientas con las que construyo.",
  subtitle:
    "Organizo mis conocimientos en cinco áreas que conectan la interfaz, la lógica, los datos, la infraestructura y el flujo de trabajo.",
  hint: "Pasa el cursor o enfoca una carta",
  groups: [
    {
      id: "frontend",
      number: "01",
      title: "Frontend",
      description:
        "Interfaces web claras, adaptadas y centradas en las personas.",
      items: [
        { name: "React", icon: "react" },
        { name: "Next.js", icon: "nextjs" },
        { name: "TypeScript", icon: "typescript" },
        { name: "Tailwind", icon: "tailwind" },
        { name: "HTML", icon: "html" },
        { name: "Vite", icon: "vite" },
      ],
    },
    {
      id: "backend",
      number: "02",
      title: "Backend",
      description: "Servicios y lógica para aplicaciones estructuradas.",
      items: [
        { name: "Node.js", icon: "nodejs" },
        { name: "NestJS", icon: "nestjs" },
      ],
    },
    {
      id: "bases-de-datos",
      number: "03",
      title: "Bases de datos",
      description: "Modelado, consulta y organización de la información.",
      items: [
        { name: "PostgreSQL", icon: "postgresql" },
        { name: "MongoDB", icon: "mongodb" },
        { name: "MySQL", icon: "mysql" },
        { name: "Redis", icon: "redis" },
      ],
    },
    {
      id: "cloud-devops",
      number: "04",
      title: "Cloud & DevOps",
      description: "Infraestructura, contenedores y automatización de entregas.",
      items: [
        { name: "AWS" },
        { name: "Azure" },
        { name: "Docker", icon: "docker" },
        { name: "GitHub Actions", icon: "githubactions" },
      ],
    },
    {
      id: "herramientas",
      number: "05",
      title: "Herramientas",
      description: "Flujo de trabajo, colaboración y pruebas de servicios.",
      items: [
        { name: "Git", icon: "git" },
        { name: "GitHub", icon: "github" },
        { name: "Linux", icon: "linux" },
        { name: "Postman", icon: "postman" },
      ],
    },
  ],
};
