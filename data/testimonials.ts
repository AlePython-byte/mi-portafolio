import type { TestimonialsData } from "./types";

const exampleQuote =
  "Testimonio de ejemplo: aquí irá la opinión de esta persona sobre mi trabajo";

export const testimonialsSection: TestimonialsData = {
  label: { es: "03 · Testimonios", en: "03 · Testimonials" },
  headline: { es: "Testimonios", en: "Testimonials" },
  listLabel: { es: "Lista de testimonios", en: "List of testimonials" },
  exampleBadge: { es: "Ejemplo", en: "Example" },
  items: [
    {
      id: "testimonio-profesor",
      name: "Nombre de la persona",
      role: "Profesor",
      quote: exampleQuote,
      placeholder: true,
    },
    {
      id: "testimonio-companera",
      name: "Nombre de la persona",
      role: "Compañera",
      quote: exampleQuote,
      placeholder: true,
    },
    {
      id: "testimonio-cliente",
      name: "Nombre de la persona",
      role: "Cliente",
      quote: exampleQuote,
      placeholder: true,
    },
  ],
};
