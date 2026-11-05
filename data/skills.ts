import type { SkillsData } from "./types";

export const skills: SkillsData = {
  label: { es: "06 · Habilidades", en: "06 · Skills" },
  headline: {
    es: "Las herramientas con las que construyo.",
    en: "The tools I build with.",
  },
  subtitle: {
    es: "Organizo mis conocimientos en cinco áreas que conectan la interfaz, la lógica, los datos, la infraestructura y el flujo de trabajo.",
    en: "I organize my knowledge into five areas that connect the interface, logic, data, infrastructure, and workflow.",
  },
  hint: {
    es: "Pasa el cursor o enfoca una carta",
    en: "Hover over or focus a card",
  },
  groups: [
    {
      id: "frontend",
      number: "01",
      title: { es: "Frontend", en: "Frontend" },
      description: {
        es: "Interfaces web claras, adaptadas y centradas en las personas.",
        en: "Clear, adaptable web interfaces centered on people.",
      },
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
      title: { es: "Backend", en: "Backend" },
      description: {
        es: "Servicios y lógica para aplicaciones estructuradas.",
        en: "Services and logic for structured applications.",
      },
      items: [
        { name: "Node.js", icon: "nodejs" },
        { name: "NestJS", icon: "nestjs" },
      ],
    },
    {
      id: "bases-de-datos",
      number: "03",
      title: { es: "Bases de datos", en: "Databases" },
      description: {
        es: "Modelado, consulta y organización de la información.",
        en: "Modeling, querying, and organizing information.",
      },
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
      title: { es: "Cloud & DevOps", en: "Cloud & DevOps" },
      description: {
        es: "Infraestructura, contenedores y automatización de entregas.",
        en: "Infrastructure, containers, and delivery automation.",
      },
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
      title: { es: "Herramientas", en: "Tools" },
      description: {
        es: "Flujo de trabajo, colaboración y pruebas de servicios.",
        en: "Workflow, collaboration, and service testing.",
      },
      items: [
        { name: "Git", icon: "git" },
        { name: "GitHub", icon: "github" },
        { name: "Linux", icon: "linux" },
        { name: "Postman", icon: "postman" },
      ],
    },
  ],
};
