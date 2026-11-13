"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { usePreferences } from "@/components/PreferencesProvider";
import { about } from "@/data/about";
import { profile } from "@/data/profile";

const baseCard = "rounded-card p-6 shadow-neu sm:p-8";
const cardClass = `${baseCard} bg-background`;
const accentCardClass = `${baseCard} bg-accent text-accent-foreground`;

export default function About() {
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
  const facts = [
    { label: about.locationLabel[language], value: profile.location[language] },
    { label: about.semesterLabel[language], value: profile.semester[language] },
  ];

  return (
    <section
      id="acerca-de-mi"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24"
    >
      <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
        {about.label[language]}
      </p>
      <motion.div
        {...reveal()}
        className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12"
      >
        <h2 className="text-4xl sm:text-5xl lg:text-7xl">{about.headline[language]}</h2>
        <p className="text-lg leading-relaxed opacity-80">{about.paragraph[language]}</p>
      </motion.div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <motion.figure
          {...reveal()}
          className={`${cardClass} lg:row-span-2`}
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl shadow-neu-inset">
            <Image
              src={profile.photo}
              alt={profile.photoAlt[language]}
              fill
              sizes="(min-width: 1024px) 22rem, (min-width: 768px) 45vw, 90vw"
              className="object-cover object-[50%_36%]"
            />
          </div>
        </motion.figure>

        <motion.article
          {...reveal(0.03)}
          className={`${cardClass} lg:row-span-2`}
        >
          <h3 className="text-2xl">{about.interestsTitle[language]}</h3>
          <ol className="mt-6 space-y-4">
            {about.interests.map((interest, index) => (
              <li key={interest.es} className="flex items-baseline gap-4">
                <span className="font-display text-sm font-bold tracking-widest text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-medium">{interest[language]}</span>
              </li>
            ))}
          </ol>
        </motion.article>

        <motion.article {...reveal(0.06)} className={cardClass}>
          <h3 className="text-2xl">{about.educationTitle[language]}</h3>
          <p className="mt-6 text-xl font-semibold">{about.education.degree[language]}</p>
          <p className="mt-1 text-accent">{profile.semester[language]}</p>
          <p className="mt-4 opacity-80">
            {about.education.institution}
            <br />
            {about.education.campus[language]}
          </p>
        </motion.article>

        <motion.article {...reveal(0.1)} className={accentCardClass}>
          <h3 className="text-2xl">{about.focusTitle[language]}</h3>
          <p className="mt-6 text-xl font-medium leading-snug">{about.focus[language]}</p>
        </motion.article>

        <motion.dl
          {...reveal(0.14)}
          className={`${cardClass} grid gap-6 sm:grid-cols-2 md:col-span-2 lg:col-span-3`}
        >
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-sm font-medium uppercase tracking-widest opacity-80">
                {fact.label}
              </dt>
              <dd className="mt-1 text-xl font-semibold">{fact.value}</dd>
            </div>
          ))}
        </motion.dl>

        <motion.div
          {...reveal(0.18)}
          className={`${cardClass} md:col-span-2 lg:col-span-3`}
        >
          <h3 className="text-2xl">{about.technologiesTitle[language]}</h3>
          <ul className="mt-5 flex flex-wrap gap-2">
            {about.technologies.map((name) => (
              <li
                key={name}
                className="rounded-pill px-4 py-1.5 text-sm font-medium shadow-neu-inset"
              >
                {name}
              </li>
            ))}
          </ul>
          <a
            href={about.allSkillsHref}
            className="press mt-6 inline-flex items-center gap-2 rounded-pill px-5 py-2.5 text-sm font-semibold shadow-neu-sm transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {about.allSkillsLabel[language]}
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
