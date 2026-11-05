"use client";

import Image from "next/image";
import type { PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { usePreferences } from "@/components/PreferencesProvider";
import { socialIcons } from "@/components/socialIcons";
import { profile, ui } from "@/data/profile";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

const entranceEase = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { language } = usePreferences();
  const shouldReduceMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { stiffness: 180, damping: 22 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 180, damping: 22 });

  // Tilt 3D solo con ratón y sin preferencia de movimiento reducido.
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || shouldReduceMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    rotateX.set(y * -4);
    rotateY.set(x * 4);
  }

  function resetTilt() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <section
      id="inicio"
      className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-14 pt-10 sm:px-6 md:grid-cols-[1.12fr_0.88fr] md:py-24"
    >
      <motion.div
        className="order-2 min-w-0 md:order-1"
        initial={shouldReduceMotion ? false : { y: 24 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.55, ease: entranceEase }}
      >
        <p className="mb-6 text-xs font-extrabold uppercase tracking-[0.18em] text-muted">
          {profile.tag[language]}
        </p>
        <h1 className="text-5xl sm:text-6xl lg:text-8xl">{profile.name}</h1>
        <p className="mt-5 text-lg font-semibold text-accent">
          {profile.role[language]}
        </p>
        <p className="mt-4 max-w-xl text-lg leading-8 text-muted">
          {profile.tagline[language]}
        </p>
        <p className="mt-2 text-sm text-muted">
          {profile.location[language]} · {profile.semester[language]}
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href={profile.cvUrl}
            download
            className={`inline-flex min-h-14 items-center justify-center rounded-2xl bg-accent px-6 font-extrabold text-accent-foreground shadow-neu-sm transition-transform hover:-translate-y-0.5 ${focusRing}`}
          >
            {ui.downloadCv[language]}
          </a>
          <a
            href={ui.projectsHref}
            className={`inline-flex min-h-14 items-center justify-center rounded-2xl px-6 font-extrabold shadow-neu-sm transition-transform hover:-translate-y-0.5 ${focusRing}`}
          >
            {ui.viewProjects[language]}
          </a>
        </div>

        <ul
          aria-label={ui.socialAriaLabel[language]}
          className="mt-6 flex flex-wrap gap-2"
        >
          {profile.social.map((link) => {
            const Icon = socialIcons[link.label];
            return (
              <li key={link.label}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-xs font-extrabold text-muted shadow-neu-sm transition-colors hover:text-accent ${focusRing}`}
                >
                  {Icon && <Icon aria-hidden="true" className="h-4 w-4" />}
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </motion.div>

      <motion.div
        className="order-1 mx-auto w-full max-w-[29rem] min-w-0 [perspective:1000px] md:order-2 md:ml-auto"
        initial={shouldReduceMotion ? false : { y: 30, rotate: 2 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 0.65, delay: 0.12, ease: entranceEase }}
      >
        <motion.div
          className="relative flex flex-col gap-6 overflow-hidden rounded-[2.25rem] border border-line-strong bg-background p-6 shadow-neu sm:p-8"
          style={{ rotateX: smoothRotateX, rotateY: smoothRotateY }}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetTilt}
        >
          <div className="flex items-start justify-between">
            <p className="text-[0.66rem] font-extrabold uppercase tracking-[0.22em] text-muted">
              {ui.profileCardLabel[language]} / 01
            </p>
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-accent/25"
            />
          </div>

          <div className="relative aspect-square w-full overflow-hidden rounded-xl border-2 border-line-strong bg-surface-low shadow-neu-inset">
            <Image
              src={profile.photo}
              alt={profile.photoAlt[language]}
              fill
              priority
              sizes="(max-width: 639px) 90vw, 25rem"
              className="object-cover object-[50%_30%]"
            />
          </div>

          <div className="border-t border-line pt-5">
            <p className="text-2xl font-bold tracking-[-0.04em]">
              {profile.name}
            </p>
            <p className="mt-3 text-sm text-muted">{profile.role[language]}</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
