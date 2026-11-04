import Image from "next/image";
import { profile, ui } from "@/data/profile";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr] md:py-24"
    >
      <div className="order-2 md:order-1">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
          {profile.role}
        </p>
        <h1 className="text-5xl sm:text-6xl lg:text-8xl">{profile.name}</h1>
        <p className="mt-6 max-w-xl text-lg opacity-80">{profile.tagline}</p>
        <p className="mt-2 text-sm opacity-60">
          {profile.location} · {profile.semester}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={profile.cvUrl}
            download
            className="rounded-pill bg-accent px-6 py-3 font-semibold text-accent-foreground shadow-neu-sm transition-transform hover:-translate-y-0.5"
          >
            {ui.downloadCv}
          </a>
          <a
            href={ui.projectsHref}
            className="rounded-pill px-6 py-3 font-semibold shadow-neu-sm transition-transform hover:-translate-y-0.5"
          >
            {ui.viewProjects}
          </a>
        </div>

        <ul
          aria-label={ui.socialAriaLabel}
          className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
        >
          {profile.social.map((link) => (
            <li key={link.label}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline-offset-4 hover:text-accent hover:underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="order-1 mx-auto md:order-2">
        <div className="relative h-56 w-56 overflow-hidden rounded-pill shadow-neu sm:h-72 sm:w-72 lg:h-96 lg:w-96">
          <Image
            src={profile.photo}
            alt={profile.photoAlt}
            fill
            priority
            unoptimized
            sizes="(min-width: 1024px) 24rem, 18rem"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
