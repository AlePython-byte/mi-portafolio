"use client";

import { LuArrowUp } from "react-icons/lu";
import CurrentYear from "@/components/CurrentYear";
import { usePreferences } from "@/components/PreferencesProvider";
import { socialIcons } from "@/components/socialIcons";
import { footer } from "@/data/footer";
import { navLinks, profile } from "@/data/profile";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export default function Footer() {
  const { language } = usePreferences();

  return (
    <footer id="footer" className="mx-auto w-full max-w-6xl px-4 pb-10 pt-6 sm:px-6">
      <div className="rounded-card bg-background p-6 shadow-neu sm:p-10">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <p className="text-3xl font-black tracking-tighter">
              {profile.name}
            </p>
            <p className="mt-2 text-sm text-muted">
              ©{" "}
              <CurrentYear />{" "}
              {profile.name}
            </p>

            <ul
              aria-label={footer.socialLabel[language]}
              className="mt-6 flex gap-3"
            >
              {profile.social.map((link) => {
                const Icon = socialIcons[link.label];
                return (
                  <li key={link.label}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className={`press grid h-11 w-11 place-items-center rounded-pill shadow-neu-sm transition-colors hover:text-accent ${focusRing}`}
                    >
                      {Icon ? (
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      ) : (
                        link.label
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav aria-label={footer.quickLinksLabel[language]}>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-muted">
              {footer.quickLinksLabel[language]}
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-2 text-sm font-semibold lg:grid-cols-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`transition-colors hover:text-accent ${focusRing}`}
                  >
                    {link.label[language]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            {footer.credits[language]}
            {process.env.NEXT_PUBLIC_MULLIS_VOICE === "1" && (
              <> · {footer.voiceCredit[language]}</>
            )}
          </p>
          <a
            href="#inicio"
            className={`press inline-flex items-center gap-2 self-start rounded-pill px-4 py-2 font-semibold text-foreground shadow-neu-sm transition-colors hover:text-accent sm:self-auto ${focusRing}`}
          >
            <LuArrowUp aria-hidden="true" className="h-4 w-4" />
            {footer.backToTop[language]}
          </a>
        </div>
      </div>
    </footer>
  );
}
