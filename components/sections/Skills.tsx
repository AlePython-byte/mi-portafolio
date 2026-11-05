"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { usePreferences } from "@/components/PreferencesProvider";
import { skills } from "@/data/skills";
import { skillIcons } from "@/components/skillIcons";
import { useMediaQuery } from "@/lib/useMediaQuery";

// Reposo del mazo en escritorio: giro y desnivel de cada carta.
const RESTING_ROTATE = [-6, -3, 0, 3, 6];
const RESTING_Y = [32, 12, 0, 12, 32];
const SEPARATION = 32; // px que se apartan las cartas vecinas
const LIFT = -16; // px que se eleva la carta activa

export default function Skills() {
  const { language } = usePreferences();
  const shouldReduceMotion = useReducedMotion();
  const isDeck = useMediaQuery("(min-width: 1024px)");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [topIndex, setTopIndex] = useState<number | null>(null);
  const releaseTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (releaseTimer.current) window.clearTimeout(releaseTimer.current);
    },
    [],
  );

  function activate(index: number) {
    if (releaseTimer.current) window.clearTimeout(releaseTimer.current);
    setTopIndex(index);
    setActiveIndex(index);
  }

  function release() {
    setActiveIndex(null);
    // La carta conserva su capa mientras vuelve a su sitio.
    releaseTimer.current = window.setTimeout(() => setTopIndex(null), 360);
  }

  function animateFor(index: number) {
    // Por debajo de lg no hay mazo: las cartas se apilan sin transformaciones.
    if (!isDeck) return { x: 0, y: 0, rotate: 0, scale: 1 };
    const rest = RESTING_ROTATE[index % RESTING_ROTATE.length];
    const restY = RESTING_Y[index % RESTING_Y.length];
    const isActive = index === activeIndex;
    const side =
      activeIndex === null || isActive ? 0 : index < activeIndex ? -1 : 1;
    return {
      x: shouldReduceMotion ? 0 : side * SEPARATION,
      y: shouldReduceMotion ? restY : isActive ? LIFT : restY,
      rotate: isActive ? 0 : rest,
      scale: shouldReduceMotion ? 1 : isActive ? 1.04 : 1,
    };
  }

  return (
    <section
      id="habilidades"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24"
    >
      <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
        {skills.label[language]}
      </p>
      <h2 className="text-4xl sm:text-5xl lg:text-7xl">{skills.headline[language]}</h2>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed opacity-80">
        {skills.subtitle[language]}
      </p>
      <p className="mt-4 hidden text-sm font-medium opacity-80 lg:block">
        {skills.hint[language]}
      </p>

      <ul
        onMouseLeave={isDeck ? release : undefined}
        className="mt-12 grid grid-cols-1 gap-6 lg:flex lg:items-start lg:gap-0 lg:px-8 lg:pb-12 lg:pt-6"
      >
        {skills.groups.map((group, index) => (
          <motion.li
            key={group.id}
            className="lg:-ml-8 lg:min-w-0 lg:flex-1 lg:first:ml-0"
            initial={false}
            animate={animateFor(index)}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 250, damping: 25 }
            }
            style={{ zIndex: isDeck ? (topIndex === index ? 50 : index + 1) : 0 }}
            onHoverStart={isDeck ? () => activate(index) : undefined}
            onPointerDown={isDeck ? () => activate(index) : undefined}
            onFocus={isDeck ? () => activate(index) : undefined}
            onBlur={
              isDeck
                ? (event) => {
                    // Solo suelta si el foco sale de la carta.
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      release();
                    }
                  }
                : undefined
            }
          >
            <article
              tabIndex={0}
              aria-labelledby={`habilidad-${group.id}`}
              className="rounded-card bg-background p-6 shadow-neu focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <p className="font-display text-3xl font-bold tracking-tighter text-accent">
                {group.number}
              </p>
              <h3 id={`habilidad-${group.id}`} className="mt-4 text-2xl">
                {group.title[language]}
              </h3>
              <p className="mt-2 opacity-80">{group.description[language]}</p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => {
                  const Icon = item.icon ? skillIcons[item.icon] : undefined;
                  return (
                    <li
                      key={item.name}
                      className="flex items-center gap-2 rounded-pill px-3 py-1.5 text-sm font-medium shadow-neu-inset"
                    >
                      {Icon && <Icon aria-hidden="true" className="h-4 w-4" />}
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            </article>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
