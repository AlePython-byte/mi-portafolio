import type { NextRequest } from "next/server";
import { checkRateLimit } from "@/lib/rateLimit";
import { MAX_SPEECH_CHARS, truncateAtSentence } from "@/lib/speech";

// Voz opcional de Mullis (ElevenLabs). Si algo falta o falla, el chat sigue
// en silencio: el cliente ignora cualquier respuesta que no sea audio.
//
// Límites de uso: viven en memoria de cada instancia serverless. Son de MEJOR
// ESFUERZO: una instancia nueva (arranque en frío o varias a la vez) empieza
// con los contadores a cero, así que frenan abusos sencillos y acotan el gasto
// de forma aproximada, pero no son un tope exacto. Para un tope duro, usa el
// límite de gasto del propio proveedor.

const MAX_BODY_LENGTH = 4_000;
const MAX_INPUT_LENGTH = 1_000; // más que esto se rechaza; hasta aquí se recorta
const PER_MINUTE = 8;
const PER_DAY = 40;
const GLOBAL_PER_DAY = 400; // aproximado, por instancia
const MINUTE_MS = 60_000;
const DAY_MS = 86_400_000;
const PROVIDER_TIMEOUT_MS = 8_000;
const MODEL_ID = "eleven_flash_v2_5";
const OUTPUT_FORMAT = "mp3_22050_32"; // mp3 de bajo bitrate (32 kbps)

const noStore = { "Cache-Control": "no-store" };

function fail(status: number) {
  return new Response(null, { status, headers: noStore });
}

function clientKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0].trim() || "unknown";
}

// Solo peticiones del mismo origen: Origin debe coincidir con el host.
function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID;
  if (
    process.env.NEXT_PUBLIC_MULLIS_VOICE !== "1" ||
    !apiKey ||
    !voiceId ||
    !/^[A-Za-z0-9]{8,64}$/.test(voiceId)
  ) {
    return fail(503);
  }

  if (!isSameOrigin(request)) return fail(403);

  const ip = clientKey(request);
  if (
    !checkRateLimit(`voice-min:${ip}`, PER_MINUTE, MINUTE_MS).allowed ||
    !checkRateLimit(`voice-day:${ip}`, PER_DAY, DAY_MS).allowed ||
    !checkRateLimit("voice-global", GLOBAL_PER_DAY, DAY_MS).allowed
  ) {
    return fail(429);
  }

  let text: string;
  let lang: "es" | "en";
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_LENGTH) return fail(400);
    const body: unknown = JSON.parse(raw);
    if (typeof body !== "object" || body === null) return fail(400);
    const input = body as Record<string, unknown>;
    if (input.lang !== "es" && input.lang !== "en") return fail(400);
    if (typeof input.text !== "string") return fail(400);
    if (input.text.length > MAX_INPUT_LENGTH) return fail(400);
    lang = input.lang;
    text = truncateAtSentence(input.text, MAX_SPEECH_CHARS);
  } catch {
    return fail(400);
  }
  if (text === "") return fail(400);

  // No se registra la clave ni el texto.
  try {
    const upstream = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}?output_format=${OUTPUT_FORMAT}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text,
          model_id: MODEL_ID,
          language_code: lang,
        }),
        signal: AbortSignal.timeout(PROVIDER_TIMEOUT_MS),
      },
    );
    if (!upstream.ok || !upstream.body) return fail(502);
    return new Response(upstream.body, {
      status: 200,
      headers: { ...noStore, "Content-Type": "audio/mpeg" },
    });
  } catch {
    console.error("mullis-voice: fallo al pedir el audio");
    return fail(502);
  }
}
