// Utilidades de texto para la voz de Mullis. Se usan en el cliente (antes de
// pedir el audio) y en el servidor (como red de seguridad).

export const MAX_SPEECH_CHARS = 220;

// Recorta al final de la última frase que quepa; si no hay, en la última
// palabra; y como último recurso, en seco.
export function truncateAtSentence(
  text: string,
  max: number = MAX_SPEECH_CHARS,
): string {
  const clean = text.trim();
  if (clean.length <= max) return clean;
  const head = clean.slice(0, max);
  const sentenceEnd = Math.max(
    head.lastIndexOf("."),
    head.lastIndexOf("!"),
    head.lastIndexOf("?"),
    head.lastIndexOf("…"),
  );
  if (sentenceEnd >= 40) return head.slice(0, sentenceEnd + 1).trim();
  const space = head.lastIndexOf(" ");
  return (space > 0 ? head.slice(0, space) : head).trim();
}

// Deja solo lo que se puede leer en voz alta: sin markdown, emojis, URLs ni correos.
export function cleanForSpeech(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/https?:\/\/\S+|www\.\S+/gi, " ")
    .replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, " ")
    .replace(/[\p{Extended_Pictographic}️‍]/gu, "")
    .replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+[.)])\s+/gm, "")
    .replace(/[*_`~#|>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
