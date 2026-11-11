import type { TestimonialsData } from "./types";

// TODO: falta un tercer testimonio para completar la sección.
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
  ],
};
