"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { usePreferences } from "@/components/PreferencesProvider";
import { contact } from "@/data/contact";
import { profile } from "@/data/profile";

type CopyStatus = "idle" | "copied" | "error";
type FormStatus = "idle" | "sending" | "success" | "error";

// Se inyecta en el build; si falta, el formulario muestra un aviso.
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

// Lógica de envío, validación y copiado compartida por el modo plano y el retro.
export function useContactForm() {
  const { language } = usePreferences();
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const resetTimer = useRef<number | null>(null);
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

  return {
    endpointMissing: !FORM_ENDPOINT,
    copyStatus,
    formStatus,
    copyMessage,
    formMessage,
    copyEmail,
    handleSubmit,
  };
}
