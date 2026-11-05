import fs from "node:fs";
import path from "node:path";
import { experienceSection } from "@/data/experience";
import ExperienceView from "./ExperienceView";

function fileExists(src: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

export default function Experience() {
  // Una escarapela solo se muestra si su imagen existe en public/.
  const items = experienceSection.items.map((item) => {
    if (!item.badge || fileExists(item.badge.src)) return item;
    const { badge, ...withoutBadge } = item;
    void badge;
    return withoutBadge;
  });

  return <ExperienceView items={items} />;
}
