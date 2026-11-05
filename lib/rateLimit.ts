import "server-only";

// Límite de uso en memoria por clave (IP). Es por instancia del servidor:
// frena abusos sencillos, no sustituye a un límite compartido.

type Entry = { count: number; resetAt: number };

const entries = new Map<string, Entry>();
const MAX_ENTRIES = 5_000;

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();

  // Limpieza ocasional para que el mapa no crezca sin tope.
  if (entries.size > MAX_ENTRIES) {
    for (const [storedKey, entry] of entries) {
      if (entry.resetAt <= now) entries.delete(storedKey);
    }
  }

  const current = entries.get(key);
  if (!current || current.resetAt <= now) {
    entries.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }
  if (current.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }
  current.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
