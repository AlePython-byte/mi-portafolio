"use client";

import { createContext, useContext, type ReactNode } from "react";

// Resultado de comprobar en el servidor qué archivos existen en public/.
export type RetroAssets = {
  projectImages: Record<string, string>; // id del proyecto → imagen final
  badges: Record<string, boolean>; // id de la experiencia → ¿existe su escarapela?
};

const RetroAssetsContext = createContext<RetroAssets | null>(null);

export function RetroAssetsProvider({
  assets,
  children,
}: {
  assets: RetroAssets;
  children: ReactNode;
}) {
  return (
    <RetroAssetsContext.Provider value={assets}>
      {children}
    </RetroAssetsContext.Provider>
  );
}

export function useRetroAssets(): RetroAssets {
  const context = useContext(RetroAssetsContext);
  if (!context) {
    throw new Error("useRetroAssets must be used within RetroAssetsProvider");
  }
  return context;
}
