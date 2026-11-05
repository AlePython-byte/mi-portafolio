import "server-only";

// Único archivo que conoce al proveedor de IA. Solo se ejecuta en el servidor:
// la clave y el modelo vienen de variables de entorno sin prefijo público.

const API_URL = "https://api.anthropic.com/v1/messages";
const API_VERSION = "2023-06-01";
const DEFAULT_MODEL = "claude-haiku-5-5";
const TIMEOUT_MS = 15_000;

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

// Cualquier fallo (clave ausente, red, tiempo, respuesta inválida). El mensaje
// es genérico a propósito: no debe llegar al cliente.
export class AiUnavailableError extends Error {
  constructor() {
    super("AI unavailable");
    this.name = "AiUnavailableError";
  }
}

type GenerateInput = {
  system: string;
  messages: ChatMessage[];
  maxTokens: number;
};

export function isAiConfigured(): boolean {
  return Boolean(process.env.AI_API_KEY);
}

export async function generateAnswer({
  system,
  messages,
  maxTokens,
}: GenerateInput): Promise<string> {
  const apiKey = process.env.AI_API_KEY;
  if (!apiKey) throw new AiUnavailableError();
  const model = process.env.AI_MODEL || DEFAULT_MODEL;

  let response: Response;
  try {
    response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": API_VERSION,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model,
        max_tokens: maxTokens,
        system,
        messages,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch {
    throw new AiUnavailableError();
  }
  if (!response.ok) throw new AiUnavailableError();

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new AiUnavailableError();
  }

  // La respuesta trae bloques de contenido; se juntan los de tipo texto.
  const blocks =
    typeof data === "object" && data !== null && "content" in data
      ? (data as { content: unknown }).content
      : null;
  const text = Array.isArray(blocks)
    ? blocks
        .filter(
          (block): block is { type: "text"; text: string } =>
            typeof block === "object" &&
            block !== null &&
            block.type === "text" &&
            typeof block.text === "string",
        )
        .map((block) => block.text)
        .join("")
        .trim()
    : "";
  if (!text) throw new AiUnavailableError();
  return text;
}
