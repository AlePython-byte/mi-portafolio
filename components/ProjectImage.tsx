import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  fit?: "cover" | "contain";
  position?: "center" | "top";
  className?: string;
};

// Proporción fija 16/10. "contain" centra la captura sobre un fondo neumórfico.
export default function ProjectImage({
  src,
  alt,
  sizes,
  fit = "cover",
  position = "center",
  className = "",
}: Props) {
  const contain = fit === "contain";
  return (
    <div
      className={`relative aspect-[16/10] overflow-hidden ${
        contain ? "bg-background shadow-neu-inset" : ""
      } ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized={src.endsWith(".svg")}
        sizes={sizes}
        className={`${contain ? "object-contain p-4 sm:p-6" : "object-cover"} ${
          position === "top" ? "object-top" : "object-center"
        }`}
      />
    </div>
  );
}
