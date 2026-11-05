import type { NextRequest } from "next/server";
import { AiUnavailableError, generateAnswer, type ChatMessage } from "@/lib/ai";
import { buildSystemPrompt } from "@/lib/assistantPrompt";
import { checkRateLimit } from "@/lib/rateLimit";

const MAX_MESSAGES = 6;
const MAX_MESSAGE_LENGTH = 500;
const MAX_BODY_LENGTH = 8_000;
const MAX_TOKENS = 300;
const RATE_LIMIT = 10; // peticiones
const RATE_WINDOW_MS = 60_000; // por minuto y por IP

const noStore = { "Cache-Control": "no-store" };

function badRequest() {
  return Response.json({ error: "bad_request" }, { status: 400, headers: noStore });
}

function clientKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0].trim() || "unknown";
}

// Devuelve los mensajes válidos o null si algo no cumple las reglas.
function parseMessages(value: unknown): ChatMessage[] | null {
  if (!Array.isArray(value)) return null;
  if (value.length < 1 || value.length > MAX_MESSAGES) return null;
  const messages: ChatMessage[] = [];
  for (const item of value) {
    if (typeof item !== "object" || item === null) return null;
    const { role, content } = item as Record<string, unknown>;
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string") return null;
    const text = content.trim();
    if (text.length === 0 || text.length > MAX_MESSAGE_LENGTH) return null;
    messages.push({ role, content: text });
  }
  // La conversación empieza y termina con una pregunta de la persona.
  if (messages[0].role !== "user") return null;
  if (messages[messages.length - 1].role !== "user") return null;
  return messages;
}

export async function POST(request: NextRequest) {
  const limit = checkRateLimit(clientKey(request), RATE_LIMIT, RATE_WINDOW_MS);
  if (!limit.allowed) {
    return Response.json(
      { error: "rate_limited" },
      {
        status: 429,
        headers: { ...noStore, "Retry-After": String(limit.retryAfterSeconds) },
      },
    );
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_LENGTH) return badRequest();
    body = JSON.parse(raw);
  } catch {
    return badRequest();
  }
  if (typeof body !== "object" || body === null) return badRequest();

  const { messages: rawMessages, language } = body as Record<string, unknown>;
  if (language !== "es" && language !== "en") return badRequest();
  const messages = parseMessages(rawMessages);
  if (!messages) return badRequest();

  // No se registra el contenido de los mensajes.
  try {
    const answer = await generateAnswer({
      system: buildSystemPrompt(language),
      messages,
      maxTokens: MAX_TOKENS,
    });
    return Response.json({ answer }, { headers: noStore });
  } catch (error) {
    if (!(error instanceof AiUnavailableError)) {
      console.error("chat: error inesperado");
    }
    // Sin detalles internos: el cliente usa sus respuestas de ejemplo.
    return Response.json(
      { fallback: true },
      { status: 503, headers: noStore },
    );
  }
}
