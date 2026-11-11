import type { TestimonialsData } from "./types";

export const testimonialsSection: TestimonialsData = {
  label: { es: "03 · Testimonios", en: "03 · Testimonials" },
  headline: { es: "Testimonios", en: "Testimonials" },
  listLabel: { es: "Lista de testimonios", en: "List of testimonials" },
  exampleBadge: { es: "Ejemplo", en: "Example" },
  items: [
    {
      id: "andres-felipe-benavides",
      name: "Andrés Felipe Benavides",
      quote: {
        es: "Alejandro destaca por su capacidad para diseñar soluciones bien estructuradas. Su atención a la arquitectura, la calidad del código y la seguridad demuestra una visión técnica que va más allá de simplemente hacer funcionar una aplicación.",
        en: "Alejandro stands out for his ability to design well-structured solutions. His attention to architecture, code quality, and security demonstrates a technical vision that goes beyond simply making an application work.",
      },
    },
    {
      id: "nicolas-ramos",
      name: "Nicolás Ramos",
      quote: {
        es: "Trabajar con Alejandro fue una experiencia muy positiva. Tiene la habilidad de transformar ideas complejas en aplicaciones intuitivas y funcionales, manteniendo una comunicación clara y cuidando tanto la experiencia del usuario como los detalles técnicos.",
        en: "Working with Alejandro was a very positive experience. He has the ability to turn complex ideas into intuitive and functional applications, maintaining clear communication and caring about both the user experience and the technical details.",
      },
    },
    {
      id: "carlos-eduardo-gomez",
      name: "Carlos Eduardo Gómez",
      role: {
        es: "Estudiante de Ingeniería de Software",
        en: "Software Engineering student",
      },
      quote: {
        es: "Lo que más valoro de Alejandro es su compromiso con la calidad. No se limita a entregar funcionalidades: analiza los problemas, propone mejoras y verifica que cada componente funcione correctamente. Su iniciativa y capacidad de aprendizaje son cualidades que aportan mucho a cualquier equipo.",
        en: "What I value most about Alejandro is his commitment to quality. He doesn't just deliver features: he analyzes problems, proposes improvements, and verifies that each component works correctly. His initiative and ability to learn are qualities that bring a lot to any team.",
      },
    },
  ],
};
