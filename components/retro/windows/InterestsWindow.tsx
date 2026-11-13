"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { usePreferences } from "@/components/PreferencesProvider";
import { personal } from "@/data/personal";
import { retro } from "@/data/retro";
import type { PersonalCard } from "@/data/types";
import { usePageVisible } from "@/lib/usePageVisible";

function Vinyl({ paused, cover }: { paused: boolean; cover?: string }) {
  return (
    <span
      aria-hidden="true"
      className="vinyl-spin absolute right-[-30%] top-1/2 block aspect-square w-[88%] -translate-y-1/2 rounded-pill"
      style={{
        animationPlayState: paused ? "paused" : "running",
        background:
          "radial-gradient(circle at center, #a94820 0 14%, #111 14% 17%, transparent 17%), repeating-radial-gradient(circle at center, #1b1b1b 0 2px, #2a2a2a 2px 4px)",
      }}
    >
      {cover && (
        <span className="absolute inset-[27%] block overflow-hidden rounded-pill">
          <Image src={cover} alt="" fill sizes="6rem" className="object-cover" />
        </span>
      )}
    </span>
  );
}

function Detail({
  card,
  paused,
  onToggleSpin,
  spinning,
  onBack,
}: {
  card: PersonalCard;
  paused: boolean;
  spinning: boolean;
  onToggleSpin: () => void;
  onBack: () => void;
}) {
  const { language } = usePreferences();
  const titleRef = useRef<HTMLHeadingElement>(null);

  // El foco pasa al título al abrir el detalle.
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <div className="space-y-3">
      <button type="button" onClick={onBack} className="retro-button px-4 py-1">
        <span aria-hidden="true">← </span>
        {retro.back[language]}
      </button>

      <div className={`relative ${card.vinyl ? "pr-[30%]" : ""}`}>
        <div className="relative">
          {card.vinyl && <Vinyl paused={paused} cover={card.albumCover} />}
          <div className="retro-inset relative z-10 mx-auto aspect-square w-full max-w-60 overflow-hidden">
            <Image
              src={card.image}
              alt={card.imageAlt[language]}
              fill
              sizes="15rem"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {card.vinyl && (
        <button
          type="button"
          onClick={onToggleSpin}
          className="retro-button px-4 py-1"
        >
          {spinning ? personal.pauseLabel[language] : personal.resumeLabel[language]}
        </button>
      )}

      <h3
        ref={titleRef}
        tabIndex={-1}
        className="text-2xl font-normal tracking-normal outline-none"
        style={{ letterSpacing: "normal" }}
      >
        {card.title[language]}
      </h3>
      <p className="leading-snug">{card.text[language]}</p>
    </div>
  );
}

export default function InterestsWindow() {
  const { language } = usePreferences();
  const shouldReduceMotion = useReducedMotion();
  const pageVisible = usePageVisible();
  const [activeId, setActiveId] = useState<string | null>(null);
  // "auto": gira salvo que se pida menos movimiento; el botón lo fuerza.
  const [spinMode, setSpinMode] = useState<"auto" | "paused" | "playing">(
    "auto",
  );
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const lastOpened = useRef<string | null>(null);

  const reduced = shouldReduceMotion !== false;
  const rotationEnabled =
    spinMode === "playing" || (spinMode === "auto" && !reduced);
  // Se pausa también si la pestaña está oculta.
  const paused = !(rotationEnabled && pageVisible);

  const active = personal.cards.find((card) => card.id === activeId) ?? null;

  function back() {
    const id = lastOpened.current;
    setActiveId(null);
    // El foco vuelve a la tarjeta elegida cuando la lista reaparece.
    if (id) requestAnimationFrame(() => itemRefs.current[id]?.focus());
  }

  if (active) {
    return (
      <Detail
        card={active}
        paused={paused}
        spinning={rotationEnabled}
        onToggleSpin={() =>
          setSpinMode(rotationEnabled ? "paused" : "playing")
        }
        onBack={back}
      />
    );
  }

  return (
    <ul
      aria-label={personal.cardsLabel[language]}
      className="retro-inset divide-y divide-[var(--retro-lo)]"
    >
      {personal.cards.map((card) => (
        <li key={card.id}>
          <button
            type="button"
            ref={(node) => {
              itemRefs.current[card.id] = node;
            }}
            onClick={() => {
              lastOpened.current = card.id;
              setActiveId(card.id);
            }}
            className="retro-press flex w-full items-center gap-3 p-2 text-left hover:bg-[var(--retro-select)] hover:text-[var(--retro-select-text)] focus-visible:bg-[var(--retro-select)] focus-visible:text-[var(--retro-select-text)]"
          >
            <span className="retro-inset relative block h-10 w-10 shrink-0 overflow-hidden">
              <Image
                src={card.image}
                alt=""
                fill
                sizes="40px"
                className="object-cover"
              />
            </span>
            <span>{card.title[language]}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
