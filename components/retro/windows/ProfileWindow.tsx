"use client";

import Image from "next/image";
import { usePreferences } from "@/components/PreferencesProvider";
import { about } from "@/data/about";
import { profile } from "@/data/profile";

// Vista compacta: lee los mismos datos que las secciones del modo plano.
export default function ProfileWindow() {
  const { language } = usePreferences();

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="retro-inset relative h-20 w-20 shrink-0 overflow-hidden">
          <Image
            src={profile.photo}
            alt={profile.photoAlt[language]}
            fill
            sizes="80px"
            className="object-cover object-[50%_36%]"
          />
        </div>
        <div className="min-w-0">
          <p className="text-2xl">{profile.name}</p>
          <p>{profile.role[language]}</p>
          <p className="opacity-80">
            {about.locationLabel[language]}: {profile.location[language]}
          </p>
          <p className="opacity-80">
            {about.semesterLabel[language]}: {profile.semester[language]}
          </p>
        </div>
      </div>

      <p className="text-lg leading-snug">{about.headline[language]}</p>
      <p className="leading-snug opacity-90">{about.paragraph[language]}</p>

      <section aria-labelledby="retro-perfil-intereses">
        <h3
          id="retro-perfil-intereses"
          className="text-xl font-normal tracking-normal underline"
        >
          {about.interestsTitle[language]}
        </h3>
        <ul className="mt-1 list-inside list-disc">
          {about.interests.map((interest) => (
            <li key={interest.es}>{interest[language]}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="retro-perfil-formacion">
        <h3
          id="retro-perfil-formacion"
          className="text-xl font-normal tracking-normal underline"
        >
          {about.educationTitle[language]}
        </h3>
        <p>
          {about.education.degree[language]} · {about.education.institution} ·{" "}
          {about.education.campus[language]}
        </p>
      </section>

      <section aria-labelledby="retro-perfil-enfoque">
        <h3
          id="retro-perfil-enfoque"
          className="text-xl font-normal tracking-normal underline"
        >
          {about.focusTitle[language]}
        </h3>
        <p>{about.focus[language]}</p>
      </section>

      <p>
        <a href={`mailto:${profile.email}`} className="underline">
          {profile.email}
        </a>
      </p>
    </div>
  );
}
