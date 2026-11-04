import type { Profile } from "./types";

export const profile: Profile = {
  name: "Tu Nombre",
  role: "Desarrollador web",
  tagline: "Frase corta que te describe.",
  location: "Ciudad, País",
  semester: "N.º semestre",
  cvUrl: "/cv.pdf",
  social: [
    { label: "GitHub", url: "https://github.com/usuario" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/usuario" },
  ],
};
