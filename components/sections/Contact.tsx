"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { LuCheck, LuCopy } from "react-icons/lu";
import { usePreferences } from "@/components/PreferencesProvider";
import { socialIcons } from "@/components/socialIcons";
import { contact } from "@/data/contact";
import { profile } from "@/data/profile";

type CopyStatus = "idle" | "copied" | "error";
type FormStatus = "idle" | "sending" | "success" | "error";

// Se inyecta en el build; si falta, el formulario muestra un aviso.
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-contact-foreground";
const actionClass = `inline-flex min-h-14 max-w-full items-center gap-3 rounded-2xl border border-contact-foreground/30 bg-white/15 px-5 text-sm font-extrabold [overflow-wrap:anywhere] transition-colors hover:bg-white/25 ${focusRing}`;
const fieldClass = `w-full rounded-2xl border border-contact-foreground/30 bg-contact-foreground/10 px-4 py-3 text-contact-foreground placeholder:text-contact-foreground/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-contact-foreground`;

export default function Contact() {
  const { language } = usePreferences();
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const resetTimer = useRef<number | null>(null);
  const formId = useId();
  const noticeId = `${formId}-aviso`;
  const form = contact.form;

  useEffect(
    () => () => {
      if (resetTimer.current) window.clearTimeout(resetTimer.current);
    },
    [],
  );

  async function copyEmail() {
    if (resetTimer.current) window.clearTimeout(resetTimer.current);
    try {
      if (!navigator.clipboard) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(profile.email);
      setCopyStatus("copied");
      resetTimer.current = window.setTimeout(
        () => setCopyStatus("idle"),
        2400,
      );
    } catch {
      setCopyStatus("error");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!FORM_ENDPOINT) return; // el aviso ya está visible
    const formElement = event.currentTarget;
    const data = new FormData(formElement);

    setFormStatus("sending");
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      formElement.reset();
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  }

  const copyMessage =
    copyStatus === "copied"
      ? contact.copied[language]
      : copyStatus === "error"
        ? contact.copyError[language]
        : "";
  const formMessage =
    formStatus === "sending"
      ? form.sending[language]
      : formStatus === "success"
        ? form.success[language]
        : formStatus === "error"
          ? form.error[language]
          : "";

  return (
    <section
      id="contacto"
      className="mx-auto max-w-6xl px-4 pb-10 pt-16 sm:px-6 md:pt-24"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] border border-accent-strong/60 bg-contact px-6 py-10 text-contact-foreground shadow-neu sm:px-10 sm:py-12 lg:px-14 lg:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-36 left-[42%] h-[25rem] w-[25rem] rounded-full border border-current opacity-15"
        />
        <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] opacity-90">
              {contact.label[language]}
            </p>
            <h2 className="mt-5 max-w-[12ch] text-4xl sm:text-5xl lg:text-6xl">
              {contact.headline[language]}
            </h2>
            <p className="mt-6 max-w-[38rem] text-lg leading-8 opacity-90">
              {contact.body[language]}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a className={actionClass} href={`mailto:${profile.email}`}>
                <HiOutlineEnvelope aria-hidden="true" className="h-5 w-5" />
                <span>{profile.email}</span>
              </a>
              <button
                type="button"
                className={actionClass}
                onClick={copyEmail}
              >
                {copyStatus === "copied" ? (
                  <LuCheck aria-hidden="true" className="h-5 w-5" />
                ) : (
                  <LuCopy aria-hidden="true" className="h-5 w-5" />
                )}
                {copyStatus === "copied"
                  ? contact.copied[language]
                  : contact.copy[language]}
              </button>
            </div>

            <ul
              aria-label={contact.socialLabel[language]}
              className="mt-3 flex flex-wrap gap-3"
            >
              {profile.social.map((link) => {
                const Icon = socialIcons[link.label];
                return (
                  <li key={link.label}>
                    <a
                      className={actionClass}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {Icon && <Icon aria-hidden="true" className="h-5 w-5" />}
                      <span>{link.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <p
              aria-live="polite"
              className={`mt-3 min-h-6 text-sm font-semibold ${
                copyStatus === "error" ? "underline underline-offset-4" : ""
              }`}
            >
              {copyMessage}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            aria-labelledby={`${formId}-titulo`}
            className="space-y-5 rounded-card border border-contact-foreground/25 bg-contact-foreground/5 p-6 sm:p-8"
          >
            <h3 id={`${formId}-titulo`} className="text-2xl">
              {form.title[language]}
            </h3>

            {!FORM_ENDPOINT && (
              <p
                id={noticeId}
                role="status"
                className="rounded-2xl border border-contact-foreground/40 bg-contact-foreground/10 px-4 py-3 text-sm font-semibold"
              >
                {form.missingEndpoint[language]}
              </p>
            )}

            <div>
              <label
                htmlFor={`${formId}-nombre`}
                className="mb-2 block text-sm font-bold"
              >
                {form.name[language]}
              </label>
              <input
                id={`${formId}-nombre`}
                name="name"
                type="text"
                required
                autoComplete="name"
                className={fieldClass}
              />
            </div>

            <div>
              <label
                htmlFor={`${formId}-correo`}
                className="mb-2 block text-sm font-bold"
              >
                {form.email[language]}
              </label>
              <input
                id={`${formId}-correo`}
                name="email"
                type="email"
                required
                autoComplete="email"
                className={fieldClass}
              />
            </div>

            <div>
              <label
                htmlFor={`${formId}-mensaje`}
                className="mb-2 block text-sm font-bold"
              >
                {form.message[language]}
              </label>
              <textarea
                id={`${formId}-mensaje`}
                name="message"
                required
                rows={5}
                className={`${fieldClass} resize-y`}
              />
            </div>

            <button
              type="submit"
              disabled={!FORM_ENDPOINT || formStatus === "sending"}
              aria-describedby={!FORM_ENDPOINT ? noticeId : undefined}
              className={`rounded-2xl bg-contact-foreground px-6 py-3.5 text-sm font-extrabold text-contact transition-opacity disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`}
            >
              {formStatus === "sending"
                ? form.sending[language]
                : form.submit[language]}
            </button>

            <p
              aria-live="polite"
              className={`min-h-6 text-sm font-semibold ${
                formStatus === "error" ? "underline underline-offset-4" : ""
              }`}
            >
              {formMessage}
            </p>
          </form>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[0.32em] -right-[0.05em] text-[clamp(8rem,21vw,18rem)] font-black leading-none tracking-[-0.14em] opacity-[0.055]"
        >
          {profile.initials}
        </div>
      </div>
    </section>
  );
}
