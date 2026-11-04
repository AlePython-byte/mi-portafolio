"use client";

import { usePreferences } from "@/components/PreferencesProvider";
import { about } from "@/data/about";
import { profile } from "@/data/profile";

const baseCard = "rounded-card p-6 shadow-neu sm:p-8";
const cardClass = `${baseCard} bg-background`;
const accentCardClass = `${baseCard} bg-accent text-accent-foreground`;

export default function About() {
  const { language } = usePreferences();
  const facts = [
    { label: about.locationLabel, value: profile.location[language] },
    { label: about.semesterLabel, value: profile.semester[language] },
  ];

  return (
    <section
      id="acerca-de-mi"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24"
    >
      <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
        <h2 className="text-4xl sm:text-5xl lg:text-7xl">{about.headline}</h2>
        <p className="text-lg leading-relaxed opacity-80">{about.paragraph}</p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article className={`${cardClass} md:col-span-2 lg:col-span-1 lg:row-span-2`}>
          <h3 className="text-2xl">{about.interestsTitle}</h3>
          <ol className="mt-6 space-y-4">
            {about.interests.map((interest, index) => (
              <li key={interest} className="flex items-baseline gap-4">
                <span className="font-display text-sm font-bold tracking-widest text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-medium">{interest}</span>
              </li>
            ))}
          </ol>
        </article>

        <article className={cardClass}>
          <h3 className="text-2xl">{about.educationTitle}</h3>
          <p className="mt-6 text-xl font-semibold">{about.education.degree}</p>
          <p className="mt-1 text-accent">{profile.semester[language]}</p>
          <p className="mt-4 opacity-80">
            {about.education.institution}
            <br />
            {about.education.campus}
          </p>
        </article>

        <article className={accentCardClass}>
          <h3 className="text-2xl">{about.focusTitle}</h3>
          <p className="mt-6 text-xl font-medium leading-snug">{about.focus}</p>
        </article>

        <dl className={`${cardClass} grid gap-6 sm:grid-cols-2 md:col-span-2`}>
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-sm font-medium uppercase tracking-widest opacity-60">
                {fact.label}
              </dt>
              <dd className="mt-1 text-xl font-semibold">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
