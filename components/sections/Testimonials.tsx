"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { usePreferences } from "@/components/PreferencesProvider";
import { testimonialsSection } from "@/data/testimonials";
import type { Language, Testimonial } from "@/data/types";

// Las citas más largas se recortan y se pueden expandir.
const LONG_QUOTE_LENGTH = 220;

// Iniciales de la primera y la última palabra del nombre.
function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return `${first}${last}`.toUpperCase();
}

function TestimonialCard({
  item,
  language,
}: {
  item: Testimonial;
  language: Language;
}) {
  const data = testimonialsSection;
  const quoteId = useId();
  const [expanded, setExpanded] = useState(false);
  const quote = item.quote[language];
  const isLong = quote.length > LONG_QUOTE_LENGTH;

  return (
    <figure className="relative flex flex-col rounded-card bg-background p-6 shadow-neu sm:p-8">
      {item.placeholder && (
        <span className="absolute right-5 top-5 rounded-pill border border-dashed border-line-strong px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-muted">
          {data.exampleBadge[language]}
        </span>
      )}

      <blockquote className="mt-8 text-lg leading-relaxed [overflow-wrap:anywhere]">
        <p id={quoteId} className={isLong && !expanded ? "line-clamp-6" : undefined}>
          {quote}
        </p>
        {isLong && (
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={quoteId}
            onClick={() => setExpanded((value) => !value)}
            className="mt-3 rounded-pill px-4 py-1.5 text-sm font-semibold text-accent shadow-neu-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {expanded ? data.readLess[language] : data.readMore[language]}
          </button>
        )}
      </blockquote>

      <figcaption className="mt-8 flex items-center gap-4">
        {item.avatar ? (
          <span className="relative block h-12 w-12 shrink-0 overflow-hidden rounded-pill shadow-neu-sm">
            <Image
              src={item.avatar}
              alt={item.name}
              fill
              sizes="3rem"
              className="object-cover"
            />
          </span>
        ) : (
          <span
            aria-hidden="true"
            className="grid h-12 w-12 shrink-0 place-items-center rounded-pill bg-accent text-sm font-extrabold text-accent-foreground shadow-neu-sm"
          >
            {getInitials(item.name)}
          </span>
        )}
        <span className="min-w-0">
          <span className="block font-bold [overflow-wrap:anywhere]">
            {item.name}
          </span>
          {item.role && (
            <span className="block text-sm text-muted">
              {item.role[language]}
            </span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const { language } = usePreferences();
  const shouldReduceMotion = useReducedMotion();
  // Solo desplaza en y (sin opacidad): el contenido siempre queda visible.
  const reveal = (delay = 0) =>
    ({
      initial: shouldReduceMotion ? false : { y: 20 },
      whileInView: { y: 0 },
      viewport: { once: true, amount: 0.18 },
      transition: { duration: 0.45, delay: shouldReduceMotion ? 0 : delay },
    }) as const;

  const data = testimonialsSection;

  return (
    <section
      id="testimonios"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24"
    >
      <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
        {data.label[language]}
      </p>
      <motion.h2 {...reveal()} className="text-4xl sm:text-5xl lg:text-7xl">
        {data.headline[language]}
      </motion.h2>

      <ul
        aria-label={data.listLabel[language]}
        // items-start: al expandir una tarjeta las demás no cambian de alto.
        className="mt-12 grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {data.items.map((item, index) => (
          <motion.li
            key={item.id}
            {...reveal(index * 0.07)}
            className="min-w-0"
          >
            <TestimonialCard item={item} language={language} />
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
