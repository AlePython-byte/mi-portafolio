"use client";

import { useEffect, useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Testimonials from "./sections/Testimonials";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Skills from "./sections/Skills";
import Footer from "./sections/Footer";

type Mode = "flat" | "retro";

const STORAGE_KEY = "portfolio-mode";
const DESKTOP_QUERY = "(min-width: 768px)";

function isMode(value: string | null): value is Mode {
  return value === "flat" || value === "retro";
}

export default function PortfolioShell() {
  // null hasta montar: el servidor y el primer render del cliente coinciden.
  const [mode, setMode] = useState<Mode | null>(null);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      // localStorage no disponible: se usa el valor por defecto.
    }
    const initial: Mode = isMode(saved)
      ? saved
      : window.matchMedia(DESKTOP_QUERY).matches
        ? "retro"
        : "flat";
    // Leer localStorage/matchMedia solo es posible tras montar (evita desajuste de hidratación).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMode(initial);
  }, []);

  function changeMode(next: Mode) {
    setMode(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Se ignora: el cambio sigue valiendo para esta sesiÃ³n.
    }
  }

  if (mode === null) return null;

  const other: Mode = mode === "flat" ? "retro" : "flat";

  return (
    <>
      <button type="button" onClick={() => changeMode(other)}>
        Cambiar a modo {other === "flat" ? "plano" : "retro"}
      </button>
      {mode === "flat" ? (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Projects />
            <Experience />
            <Skills />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
        </>
      ) : (
        <div id="escritorio-retro" />
      )}
    </>
  );
}
