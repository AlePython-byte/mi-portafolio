"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { usePreferences } from "@/components/PreferencesProvider";
import { personal } from "@/data/personal";
import type { PersonalCard } from "@/data/types";
import { useMediaQuery } from "@/lib/useMediaQuery";

// Misma condición que la variante CSS "fan": escritorio con ratón.
const FAN_QUERY = "(min-width: 768px) and (hover: hover) and (pointer: fine)";

// Rotación (grados) y desplazamiento vertical (px) de cada tarjeta del abanico.
const FAN_POSITIONS = [
  { rotate: -5, y: 26 },
  { rotate: -1.7, y: 0 },
  { rotate: 2, y: 6 },
  { rotate: 5, y: 29 },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

function Vinyl({ paused, cover }: { paused: boolean; cover?: string }) {
  return (
    <span
      aria-hidden="true"
      className="absolute right-[-16%] top-1/2 block aspect-square w-[92%] -translate-y-1/2 rounded-pill motion-safe:animate-[spin_6s_linear_infinite]"
      style={{
        animationPlayState: paused ? "paused" : "running",
        background:
          "radial-gradient(circle at center, var(--accent) 0 14%, #111 14% 17%, transparent 17%), repeating-radial-gradient(circle at center, #1b1b1b 0 2px, #2a2a2a 2px 4px)",
        boxShadow: "0 6px 16px var(--shadow-dark)",
      }}
    >
      {cover && (
        <span className="absolute inset-[27%] block overflow-hidden rounded-pill border border-white/20">
          <Image
            src={cover}
            alt=""
            fill
            sizes="10rem"
            className="object-cover"
          />
          <span className="absolute left-1/2 top-1/2 block h-[6%] w-[6%] -translate-x-1/2 -translate-y-1/2 rounded-pill bg-[#090909]" />
        </span>
      )}
    </span>
  );
}

function Cover({ card, paused }: { card: PersonalCard; paused: boolean }) {
  const { language } = usePreferences();

  return (
    <span className={`relative block ${card.vinyl ? "pr-[12%]" : ""}`}>
      <span className="relative block">
        {card.vinyl && <Vinyl paused={paused} cover={card.albumCover} />}
        <span className="relative z-10 block aspect-square overflow-hidden rounded-card shadow-neu-sm">
          <Image
            src={card.image}
            alt={card.imageAlt[language]}
            fill
            sizes="(min-width: 768px) 24rem, 90vw"
            className="object-cover"
          />
          {card.badge && (
            <span className="absolute left-3 top-3 rounded-pill bg-accent px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent-foreground">
              {card.badge[language]}
            </span>
          )}
        </span>
        {card.note && (
          <span className="absolute -bottom-3 right-2 z-20 block w-40 rotate-3 bg-[#f2d98d] p-3 text-sm font-medium leading-snug text-[#262a29] shadow-neu-sm">
            {card.note[language]}
          </span>
        )}
      </span>
    </span>
  );
}

export default function Personal() {
  const { language } = usePreferences();
  const shouldReduceMotion = useReducedMotion();
  const fanActive = useMediaQuery(FAN_QUERY) && !shouldReduceMotion;
  const [activeId, setActiveId] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const detailRef = useRef<HTMLHeadingElement | null>(null);
  const lastOpened = useRef<string | null>(null);

  const active = personal.cards.find((card) => card.id === activeId) ?? null;

  // Mueve el foco al abrir el detalle y lo devuelve a la tarjeta al volver.
  useEffect(() => {
    if (activeId) {
      detailRef.current?.focus();
    } else if (lastOpened.current) {
      cardRefs.current[lastOpened.current]?.focus();
    }
  }, [activeId]);

  function open(id: string) {
    lastOpened.current = id;
    setActiveId(id);
  }

  return (
    <section
      id="mi-lado-personal"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24"
    >
      <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
        {personal.label[language]}
      </p>
      <h2 className="text-4xl sm:text-5xl lg:text-7xl">{personal.headline[language]}</h2>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed opacity-80">
        {personal.subtitle[language]}
      </p>

      {active ? (
        <div className="mt-12">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <Cover card={active} paused={paused} />
            <div>
              {active.label && (
                <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
                  {active.label[language]}
                </p>
              )}
              <h3
                ref={detailRef}
                tabIndex={-1}
                className="text-3xl outline-none sm:text-4xl"
              >
                {active.title[language]}
              </h3>
              {active.subtitle && (
                <p className="mt-2 font-medium opacity-70">{active.subtitle[language]}</p>
              )}
              <p className="mt-6 text-lg leading-relaxed opacity-80">
                {active.text[language]}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => setActiveId(null)}
                  className={`rounded-pill bg-accent px-6 py-3 font-semibold text-accent-foreground shadow-neu-sm ${focusRing}`}
                >
                  {personal.backLabel[language]}
                </button>
                {active.vinyl && (
                  <button
                    type="button"
                    onClick={() => setPaused((value) => !value)}
                    className={`rounded-pill px-6 py-3 font-semibold shadow-neu-sm ${focusRing}`}
                  >
                    {paused
                      ? personal.resumeLabel[language]
                      : personal.pauseLabel[language]}
                  </button>
                )}
              </div>
            </div>
          </div>

          <ul
            aria-label={personal.thumbnailsLabel[language]}
            className="mt-12 grid grid-cols-4 gap-3 sm:gap-6"
          >
            {personal.cards.map((card) => {
              const isActive = card.id === activeId;
              return (
                <li key={card.id}>
                  <button
                    type="button"
                    onClick={() => open(card.id)}
                    aria-label={card.title[language]}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block aspect-square w-full overflow-hidden rounded-2xl border-4 shadow-neu-sm ${
                      isActive ? "border-accent" : "border-transparent"
                    } ${focusRing}`}
                  >
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 12rem, 25vw"
                      className="object-cover"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <ul
          aria-label={personal.cardsLabel[language]}
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 fan:flex fan:justify-center fan:gap-0 fan:-space-x-6 fan:pb-14 fan:pt-8"
        >
          {personal.cards.map((card, index) => {
            const position = FAN_POSITIONS[index % FAN_POSITIONS.length];
            return (
            <motion.li
              key={card.id}
              className="fan:w-1/4 fan:hover:z-10 fan:focus-within:z-10"
              initial={false}
              animate={
                fanActive
                  ? { rotate: position.rotate, y: position.y }
                  : { rotate: 0, y: 0 }
              }
              whileHover={
                fanActive
                  ? { y: position.y - 8, transition: { duration: 0.18 } }
                  : undefined
              }
              transition={{
                duration: shouldReduceMotion ? 0 : 0.4,
                ease: "easeOut",
              }}
            >
              <button
                type="button"
                ref={(el) => {
                  cardRefs.current[card.id] = el;
                }}
                onClick={() => open(card.id)}
                className={`block w-full rounded-card bg-background p-3 text-left shadow-neu ${focusRing}`}
              >
                <Cover card={card} paused={paused} />
                <span className="mt-4 block px-2 pb-2">
                  {card.label && (
                    <span className="block text-xs font-medium uppercase tracking-widest text-accent">
                      {card.label[language]}
                    </span>
                  )}
                  <span className="mt-1 block font-display text-lg font-bold leading-tight tracking-tight">
                    {card.title[language]}
                  </span>
                </span>
              </button>
            </motion.li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
