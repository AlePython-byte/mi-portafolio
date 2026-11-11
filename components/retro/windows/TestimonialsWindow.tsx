"use client";

import { usePreferences } from "@/components/PreferencesProvider";
import { testimonialsSection as data } from "@/data/testimonials";

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

export default function TestimonialsWindow() {
  const { language } = usePreferences();

  return (
    <ul
      aria-label={data.listLabel[language]}
      className="retro-inset divide-y divide-[var(--retro-lo)]"
    >
      {data.items.map((item) => (
        <li key={item.id} className="flex gap-3 p-3">
          <span
            aria-hidden="true"
            className="retro-titlebar grid h-12 w-12 shrink-0 place-items-center text-2xl"
          >
            {initialsOf(item.name)}
          </span>
          <figure className="min-w-0">
            <figcaption>
              <span className="font-bold">{item.name}</span>
              {item.role && (
                <span className="opacity-80"> · {item.role[language]}</span>
              )}
              {item.placeholder && (
                <span className="retro-button ml-2 px-1 text-sm uppercase">
                  {data.exampleBadge[language]}
                </span>
              )}
            </figcaption>
            <blockquote className="mt-1 leading-snug">
              {item.quote[language]}
            </blockquote>
          </figure>
        </li>
      ))}
    </ul>
  );
}
