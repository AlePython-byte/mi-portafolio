"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { useReducedMotion } from "motion/react";
import { usePreferences } from "@/components/PreferencesProvider";
import { assistant } from "@/data/assistant";
import { askAssistant } from "@/lib/assistant";

type Message =
  | { id: number; role: "user"; text: string }
  | { id: number; role: "assistant"; text: string }
  // El saludo se pinta en el idioma activo, aunque cambie después.
  | { id: number; role: "assistant"; greeting: true };

export default function MullisChatWindow() {
  const { language } = usePreferences();
  const shouldReduceMotion = useReducedMotion();
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "assistant", greeting: true },
  ]);
  const [usedQuick, setUsedQuick] = useState<string[]>([]);
  const [pending, setPending] = useState(false);
  const [draft, setDraft] = useState("");
  const nextId = useRef(1);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  // Mantiene visible el último mensaje (sin animar si se pide menos movimiento).
  useEffect(() => {
    const log = logRef.current;
    if (!log) return;
    log.scrollTo({
      top: log.scrollHeight,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  }, [messages, pending, shouldReduceMotion]);

  async function ask(question: string) {
    const text = question.trim();
    if (!text || pending) return;
    setMessages((current) => [
      ...current,
      { id: nextId.current++, role: "user", text },
    ]);
    setPending(true);
    let answer: string;
    try {
      // Historial reciente (sin el saludo) para que Mullis siga el hilo.
      const history = messages.flatMap((message) =>
        "greeting" in message
          ? []
          : [{ role: message.role, content: message.text }],
      );
      answer = await askAssistant(text, language, history);
    } catch {
      answer = assistant.fallback[language];
    }
    setMessages((current) => [
      ...current,
      { id: nextId.current++, role: "assistant", text: answer },
    ]);
    setPending(false);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft;
    setDraft("");
    void ask(text);
    inputRef.current?.focus();
  }

  function askQuick(id: string, question: string) {
    setUsedQuick((current) => [...current, id]);
    void ask(question);
    // El botón desaparece al usarse: el foco pasa a la casilla de texto.
    inputRef.current?.focus();
  }

  const quick = assistant.quickQuestions.filter(
    (item) => !usedQuick.includes(item.id),
  );

  return (
    <div className="flex h-full min-h-0 flex-col gap-2">
      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-label={assistant.historyLabel[language]}
        className="retro-inset min-h-0 flex-1 space-y-2 overflow-y-auto p-2"
      >
        {messages.map((message) => {
          const mine = message.role === "user";
          return (
            <p
              key={message.id}
              className={`max-w-[85%] px-2 py-1 leading-snug [overflow-wrap:anywhere] ${
                mine
                  ? "ml-auto bg-[var(--retro-select)] text-[var(--retro-select-text)]"
                  : "retro-raised"
              }`}
            >
              {"greeting" in message
                ? assistant.greeting[language]
                : message.text}
            </p>
          );
        })}
        {pending && (
          <p className="retro-raised max-w-[85%] px-2 py-1 italic opacity-80">
            {assistant.typing[language]}
          </p>
        )}
      </div>

      {quick.length > 0 && (
        <ul
          aria-label={assistant.quickLabel[language]}
          className="flex flex-wrap gap-1"
        >
          {quick.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                disabled={pending}
                onClick={() => askQuick(item.id, item.question[language])}
                className="retro-button px-2 py-0.5 text-base disabled:cursor-not-allowed disabled:opacity-50"
              >
                {item.question[language]}
              </button>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={onSubmit} className="flex gap-2">
        <label htmlFor={inputId} className="sr-only">
          {assistant.inputLabel[language]}
        </label>
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          autoComplete="off"
          className="retro-inset min-w-0 flex-1 bg-[var(--retro-field)] px-2 py-1"
        />
        <button
          type="submit"
          disabled={pending || draft.trim() === ""}
          className="retro-button px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {assistant.send[language]}
        </button>
      </form>
    </div>
  );
}
