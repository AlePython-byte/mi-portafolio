"use client";

import { usePreferences } from "@/components/PreferencesProvider";
import { skills } from "@/data/skills";
import { skillIcons } from "@/components/skillIcons";

// Abanico solo desde lg; por debajo no hay rotaciones ni solapes.
const FAN_CLASSES = [
  "lg:-rotate-6 lg:translate-y-8",
  "lg:-rotate-3 lg:translate-y-3",
  "lg:rotate-0",
  "lg:rotate-3 lg:translate-y-3",
  "lg:rotate-6 lg:translate-y-8",
];

export default function Skills() {
  const { language } = usePreferences();

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
      <p className="mt-4 hidden text-sm font-medium opacity-60 lg:block">
        {skills.hint[language]}
      </p>

      <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:flex lg:min-h-[28rem] lg:items-start lg:gap-0 lg:px-4">
        {skills.groups.map((group, index) => (
          <li
            key={group.id}
            className={`group lg:-ml-8 lg:flex-1 lg:first:ml-0 motion-safe:lg:transition-[translate,rotate] motion-safe:lg:duration-300 lg:hover:z-20 lg:hover:-translate-y-4 lg:hover:rotate-0 lg:focus-within:z-20 lg:focus-within:-translate-y-4 lg:focus-within:rotate-0 ${FAN_CLASSES[index % FAN_CLASSES.length]}`}
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

              <ul className="mt-5 flex flex-wrap gap-2 overflow-hidden lg:max-h-0 lg:opacity-0 motion-safe:lg:transition-[max-height,opacity] motion-safe:lg:duration-300 lg:group-hover:max-h-64 lg:group-hover:opacity-100 lg:group-focus-within:max-h-64 lg:group-focus-within:opacity-100">
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
          </li>
        ))}
      </ul>
    </section>
  );
}
