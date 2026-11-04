import type { PersonalData } from "./types";

export const personal: PersonalData = {
  label: { es: "02 · Mi lado personal", en: "02 · Personal side" },
  headline: { es: "Fuera del código", en: "Beyond code" },
  subtitle: {
    es: "Un poco sobre mí y los pasatiempos que disfruto fuera del código: la compañía de mi gata, la música, los videojuegos y viajar para descubrir nuevas perspectivas.",
    en: "A little about me and the hobbies I enjoy beyond code: time with my cat, music, video games, and traveling to discover new perspectives.",
  },
  cardsLabel: {
    es: "Tarjetas de Mi lado personal",
    en: "Personal side cards",
  },
  thumbnailsLabel: { es: "Cambiar de tarjeta", en: "Switch card" },
  backLabel: { es: "Volver a las tarjetas", en: "Back to cards" },
  pauseLabel: { es: "Pausar disco", en: "Pause record" },
  resumeLabel: { es: "Reanudar disco", en: "Resume record" },
  cards: [
    {
      id: "mullis",
      image: "/images/mullis.jpeg",
      imageAlt: {
        es: "Mullis, la gata de Alejandro, mirando a la cámara",
        en: "Mullis, Alejandro's cat, looking at the camera",
      },
      badge: { es: "Mullis", en: "Mullis" },
      title: {
        es: "Mullis, mi compañía favorita",
        en: "Mullis, my favorite companion",
      },
      text: {
        es: "Mullis es mi gata: alegre, juguetona y siempre buscando estar conmigo. Le encanta acompañarme en lo que esté haciendo y, entre juegos y compañía, se ha ganado su lugar en cada uno de mis días.",
        en: "Mullis is my cat: cheerful, playful, and always looking to be close to me. She loves joining me in whatever I am doing and, between playtime and companionship, she has earned a place in every one of my days.",
      },
    },
    {
      id: "feid",
      image: "/images/feid.jpeg",
      imageAlt: {
        es: "Portada del álbum FERXXO VOL X: Sagrado, de Feid",
        en: "Cover of the album FERXXO VOL X: Sagrado, by Feid",
      },
      label: { es: "Álbum favorito", en: "Favorite album" },
      subtitle: {
        es: "FERXXO VOL X: Sagrado",
        en: "FERXXO VOL X: Sagrado",
      },
      title: { es: "Feid, en repeat", en: "Feid, on repeat" },
      text: {
        es: "Escucho a Feid desde hace mucho y su música siempre encuentra un lugar en mis días. Mi favorito es FERXXO VOL X: Sagrado. Sé que no es el favorito de todo el mundo, pero a mí me gusta muchísimo: es de esos álbumes a los que siempre termino volviendo.",
        en: "I have listened to Feid for a long time, and his music always finds a place in my days. My favorite is FERXXO VOL X: Sagrado. I know it is not everyone’s favorite, but I love it: it is one of those albums I always end up returning to.",
      },
      vinyl: true,
    },
    {
      id: "resident-evil-7",
      image: "/images/resident-evil-7.jpg",
      imageAlt: {
        es: "Imagen del videojuego Resident Evil 7",
        en: "Image from the video game Resident Evil 7",
      },
      label: {
        es: "Mi favorito · Resident Evil 7",
        en: "My favorite · Resident Evil 7",
      },
      title: {
        es: "Un poco de acción. Mucho terror",
        en: "A little action. A lot of horror",
      },
      text: {
        es: "Resident Evil es mi saga favorita y me he jugado todos, desde los clásicos. Si tengo que elegir uno, me quedo con Resident Evil 7: para mí es el que mejor mezcla el terror con ese toque de acción que hace que no quieras soltar el control.",
        en: "Resident Evil is my favorite series, and I have played every game since the classics. If I have to choose one, I pick Resident Evil 7: to me, it has the best mix of horror and that touch of action that makes it impossible to put the controller down.",
      },
    },
    {
      id: "viajes",
      image: "/images/viaje.jpeg",
      imageAlt: {
        es: "Vista desde la ventana de un avión con montañas, nubes y caminos allá abajo",
        en: "View from an airplane window with mountains, clouds, and roads far below",
      },
      note: {
        es: "Si hay una buena vista, me quedo un rato más",
        en: "If there is a good view, I will stay a little longer",
      },
      title: {
        es: "Otra forma de cambiar de perspectiva",
        en: "Another way to change perspective",
      },
      text: {
        es: "Disfruto mucho viajar y conocer nuevos paisajes. Pero hay algo que me gusta especialmente: verlos desde lo más alto. Mirar por la ventana y encontrar montañas, nubes y caminos allá abajo es de mis partes favoritas del viaje.",
        en: "I really enjoy traveling and discovering new landscapes. But there is something I especially love: seeing them from above. Looking out the window and finding mountains, clouds, and roads below is one of my favorite parts of a trip.",
      },
    },
  ],
};
