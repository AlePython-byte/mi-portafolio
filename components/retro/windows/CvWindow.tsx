"use client";

import { usePreferences } from "@/components/PreferencesProvider";
import { about } from "@/data/about";
import { profile, ui } from "@/data/profile";

export default function CvWindow() {
  const { language } = usePreferences();

  return (
    <div className="space-y-4">
      <div>
        <p className="text-2xl">{profile.name}</p>
        <p>{profile.role[language]}</p>
      </div>

      <dl className="space-y-1">
        <div className="flex gap-2">
          <dt className="font-bold">{about.locationLabel[language]}:</dt>
          <dd>{profile.location[language]}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="font-bold">{about.semesterLabel[language]}:</dt>
          <dd>{profile.semester[language]}</dd>
        </div>
      </dl>

      <a
        href="/cv.pdf"
        download
        className="retro-button inline-block px-4 py-1 no-underline"
      >
        {ui.downloadCv[language]}
      </a>
    </div>
  );
}
