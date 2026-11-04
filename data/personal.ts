import type { PersonalData } from "./types";

export const personal: PersonalData = {
  label: "02 · Mi lado personal",
  headline: "Fuera del código",
  subtitle:
    "Un poco sobre mí y los pasatiempos que disfruto fuera del código: la compañía de mi gata, la música, los videojuegos y viajar para descubrir nuevas perspectivas.",
  cardsLabel: "Tarjetas de Mi lado personal",
  thumbnailsLabel: "Cambiar de tarjeta",
  backLabel: "Volver a las tarjetas",
  pauseLabel: "Pausar disco",
  resumeLabel: "Reanudar disco",
  cards: [
    {
      id: "mullis",
      image: "/images/mullis.jpg",
      imageAlt: "Mullis, la gata de Alejandro, mirando a la cámara",
      badge: "Mullis",
      title: "Mullis, mi compañía favorita",
      text: "Mullis es mi gata: alegre, juguetona y siempre buscando estar conmigo. Le encanta acompañarme en lo que esté haciendo y, entre juegos y compañía, se ha ganado su lugar en cada uno de mis días.",
    },
    {
      id: "feid",
      image: "/images/feid.jpg",
      imageAlt: "Portada del álbum FERXXO VOL X: Sagrado, de Feid",
      label: "Álbum favorito",
      subtitle: "FERXXO VOL X: Sagrado",
      title: "Feid, en repeat",
      text: "Escucho a Feid desde hace mucho y su música siempre encuentra un lugar en mis días. Mi favorito es FERXXO VOL X: Sagrado. Sé que no es el favorito de todo el mundo, pero a mí me gusta muchísimo: es de esos álbumes a los que siempre termino volviendo.",
      vinyl: true,
    },
    {
      id: "resident-evil-7",
      image: "/images/re7.jpg",
      imageAlt: "Imagen del videojuego Resident Evil 7",
      label: "Mi favorito · Resident Evil 7",
      title: "Un poco de acción. Mucho terror",
      text: "Resident Evil es mi saga favorita y me he jugado todos, desde los clásicos. Si tengo que elegir uno, me quedo con Resident Evil 7: para mí es el que mejor mezcla el terror con ese toque de acción que hace que no quieras soltar el control.",
    },
    {
      id: "viajes",
      image: "/images/viajes.jpg",
      imageAlt:
        "Vista desde la ventana de un avión con montañas, nubes y caminos allá abajo",
      note: "Si hay una buena vista, me quedo un rato más",
      title: "Otra forma de cambiar de perspectiva",
      text: "Disfruto mucho viajar y conocer nuevos paisajes. Pero hay algo que me gusta especialmente: verlos desde lo más alto. Mirar por la ventana y encontrar montañas, nubes y caminos allá abajo es de mis partes favoritas del viaje.",
    },
  ],
};
