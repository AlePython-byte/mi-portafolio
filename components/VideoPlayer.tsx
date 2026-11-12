import { youtubeEmbedUrl } from "@/lib/youtube";

type Props = {
  videoId: string;
  title: string;
};

// Se monta solo cuando la vista del video está abierta; al desmontarse
// el video se detiene.
export default function VideoPlayer({ videoId, title }: Props) {
  return (
    <iframe
      key={videoId}
      src={youtubeEmbedUrl(videoId)}
      title={title}
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
      className="absolute inset-0 h-full w-full border-0"
    />
  );
}
