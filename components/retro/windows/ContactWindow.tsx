"use client";

import { useId } from "react";
import { usePreferences } from "@/components/PreferencesProvider";
import { socialIcons } from "@/components/socialIcons";
import { contact } from "@/data/contact";
import { profile } from "@/data/profile";
import { useContactForm } from "@/lib/useContactForm";

const button = "retro-button inline-flex items-center gap-2 px-3 py-0.5";
const field = "retro-inset w-full bg-[var(--retro-field)] px-2 py-1";

export default function ContactWindow() {
  const { language } = usePreferences();
  const {
    endpointMissing,
    copyStatus,
    formStatus,
    copyMessage,
    formMessage,
    copyEmail,
    handleSubmit,
  } = useContactForm();
  const formId = useId();
  const noticeId = `${formId}-aviso`;
  const form = contact.form;

  return (
    <div className="space-y-4">
      <p className="leading-snug">{contact.body[language]}</p>

      <div className="flex flex-wrap gap-2">
        <a className={button} href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <button type="button" className={button} onClick={copyEmail}>
          {copyStatus === "copied"
            ? contact.copied[language]
            : contact.copy[language]}
        </button>
      </div>

      <ul
        aria-label={contact.socialLabel[language]}
        className="flex flex-wrap gap-2"
      >
        {profile.social.map((link) => {
          const Icon = socialIcons[link.label];
          return (
            <li key={link.label}>
              <a
                className={button}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {Icon && <Icon aria-hidden="true" className="h-4 w-4" />}
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>

      <p
        aria-live="polite"
        className={`min-h-6 ${copyStatus === "error" ? "underline" : ""}`}
      >
        {copyMessage}
      </p>

      <form
        onSubmit={handleSubmit}
        aria-labelledby={`${formId}-titulo`}
        className="space-y-3"
      >
        <h3
          id={`${formId}-titulo`}
          className="text-xl font-normal tracking-normal underline"
          style={{ letterSpacing: "normal" }}
        >
          {form.title[language]}
        </h3>

        {endpointMissing && (
          <p id={noticeId} role="status" className="retro-button px-2 py-1">
            {form.missingEndpoint[language]}
          </p>
        )}

        <div>
          <label htmlFor={`${formId}-nombre`} className="block">
            {form.name[language]}
          </label>
          <input
            id={`${formId}-nombre`}
            name="name"
            type="text"
            required
            autoComplete="name"
            className={field}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-correo`} className="block">
            {form.email[language]}
          </label>
          <input
            id={`${formId}-correo`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-mensaje`} className="block">
            {form.message[language]}
          </label>
          <textarea
            id={`${formId}-mensaje`}
            name="message"
            required
            rows={4}
            className={`${field} resize-y`}
          />
        </div>

        <button
          type="submit"
          disabled={endpointMissing || formStatus === "sending"}
          aria-describedby={endpointMissing ? noticeId : undefined}
          className="retro-button px-4 py-1 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {formStatus === "sending"
            ? form.sending[language]
            : form.submit[language]}
        </button>

        <p
          aria-live="polite"
          className={`min-h-6 ${formStatus === "error" ? "underline" : ""}`}
        >
          {formMessage}
        </p>
      </form>
    </div>
  );
}
