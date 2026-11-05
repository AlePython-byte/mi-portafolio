import type { ContactData } from "./types";

export const contact: ContactData = {
  label: { es: "07 · Contacto", en: "07 · Contact" },
  headline: {
    es: "¿Tienes una idea? Hablemos",
    en: "Have an idea? Let’s talk",
  },
  body: {
    es: "Puedes escribirme para conversar sobre proyectos, compartir ideas o conectar conmigo.",
    en: "You can write to me to discuss projects, share ideas, or connect.",
  },
  copy: { es: "Copiar correo", en: "Copy email" },
  copied: { es: "Correo copiado", en: "Email copied" },
  copyError: {
    es: "No se pudo copiar. Selecciona el correo visible.",
    en: "Could not copy. Select the visible email address.",
  },
  socialLabel: { es: "Canales de contacto", en: "Contact channels" },
  form: {
    title: { es: "O déjame un mensaje", en: "Or leave me a message" },
    name: { es: "Nombre", en: "Name" },
    email: { es: "Correo electrónico", en: "Email" },
    message: { es: "Mensaje", en: "Message" },
    submit: { es: "Enviar mensaje", en: "Send message" },
    sending: { es: "Enviando…", en: "Sending…" },
    success: {
      es: "¡Gracias! Tu mensaje fue enviado.",
      en: "Thank you! Your message was sent.",
    },
    error: {
      es: "No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme por correo.",
      en: "The message could not be sent. Try again or email me directly.",
    },
    missingEndpoint: {
      es: "El formulario aún no está configurado. Escríbeme directamente por correo.",
      en: "The form is not configured yet. Please email me directly.",
    },
  },
};
