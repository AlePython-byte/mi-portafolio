// Dominio sin cookies: no se carga nada de YouTube hasta que se monta el iframe.
export function youtubeEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(
    videoId,
  )}?rel=0&autoplay=1`;
}

export function youtubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
}
