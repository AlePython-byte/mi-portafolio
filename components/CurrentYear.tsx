"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// El año se lee solo en el cliente: durante el prerender se usa el valor vacío,
// porque Cache Components no permite new Date() al generar la página estática.
export default function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => String(new Date().getFullYear()),
    () => "",
  );

  return <span>{year}</span>;
}
