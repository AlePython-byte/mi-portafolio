"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Language } from "@/data/types";
import { cleanForSpeech, truncateAtSentence } from "@/lib/speech";

// Voz opcional: si algo falla, no pasa nada (sin mensajes ni errores visibles).
export const VOICE_AVAILABLE = process.env.NEXT_PUBLIC_MULLIS_VOICE === "1";

const STORAGE_KEY = "portfolio-mullis-voice";
const REQUEST_TIMEOUT_MS = 10_000;

function readPreference(): boolean {
  if (!VOICE_AVAILABLE) return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function useMullisVoice() {
  const [enabled, setEnabled] = useState(readPreference);
  const audio = useRef<HTMLAudioElement | null>(null);
  const objectUrl = useRef<string | null>(null);
  const controller = useRef<AbortController | null>(null);
  const enabledRef = useRef(enabled); // el estado actual, aunque speak sea de un render viejo
  const ticket = useRef(0); // invalida peticiones y reproducciones antiguas

  // Detiene todo: la petición en curso y el audio que suene.
  const stop = useCallback(() => {
    ticket.current += 1;
    controller.current?.abort();
    controller.current = null;
    audio.current?.pause();
    audio.current = null;
    if (objectUrl.current) {
      URL.revokeObjectURL(objectUrl.current);
      objectUrl.current = null;
    }
  }, []);

  const speak = useCallback(
    async (text: string, language: Language) => {
      stop();
      if (!VOICE_AVAILABLE || !enabledRef.current) return;
      const clean = truncateAtSentence(cleanForSpeech(text));
      if (clean === "") return;

      const mine = ticket.current;
      const abort = new AbortController();
      controller.current = abort;
      const timer = setTimeout(() => abort.abort(), REQUEST_TIMEOUT_MS);
      try {
        const response = await fetch("/api/mullis-voice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: clean, lang: language }),
          signal: abort.signal,
        });
        if (!response.ok) return;
        const blob = await response.blob();
        if (mine !== ticket.current || !blob.type.startsWith("audio/")) return;
        const url = URL.createObjectURL(blob);
        const element = new Audio(url);
        objectUrl.current = url;
        audio.current = element;
        element.onended = () => {
          if (audio.current === element) stop();
        };
        await element.play();
      } catch {
        // Silencio total.
        if (mine === ticket.current) stop();
      } finally {
        clearTimeout(timer);
      }
    },
    [stop],
  );

  const toggle = useCallback(() => {
    setEnabled((current) => {
      const next = !current;
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {}
      return next;
    });
  }, []);

  // Al silenciar, se corta lo que suene.
  useEffect(() => {
    enabledRef.current = enabled;
    if (!enabled) stop();
  }, [enabled, stop]);

  // Al ocultarse la pestaña y al cerrar la ventana.
  useEffect(() => {
    const onHide = () => {
      if (document.hidden) stop();
    };
    document.addEventListener("visibilitychange", onHide);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      stop();
    };
  }, [stop]);

  return { enabled, toggle, speak, stop };
}
