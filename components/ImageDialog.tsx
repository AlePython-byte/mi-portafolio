"use client";

import Image from "next/image";
import { useId, useRef } from "react";
import { projectButtonBase } from "@/components/ProjectActionButton";

type Props = {
  src: string;
  alt: string;
  title: string;
  triggerLabel: string;
  triggerAria: string;
  closeLabel: string;
};

// Diálogo nativo con una imagen grande. Reutiliza el estilo del diálogo de
// Proyectos y las reglas globales de animación y bloqueo de scroll.
export default function ImageDialog({
  src,
  alt,
  title,
  triggerLabel,
  triggerAria,
  closeLabel,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-label={triggerAria}
        onClick={() => dialogRef.current?.showModal()}
        className={projectButtonBase}
      >
        {triggerLabel}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        // Cierra al hacer clic en el fondo: el diálogo no tiene padding,
        // así que solo el fondo llega con el diálogo como destino.
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        // Devuelve el foco al botón que abrió la ventana.
        onClose={() => triggerRef.current?.focus()}
        className="dialog-enter m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-background p-0 text-foreground backdrop:bg-black/50 backdrop:backdrop-blur-sm md:m-auto md:h-auto md:max-h-[90dvh] md:max-w-2xl md:rounded-card md:shadow-neu"
      >
        <div className="flex items-start justify-between gap-4 p-5 sm:p-8 sm:pb-4">
          <h2 id={titleId} className="text-xl sm:text-2xl [overflow-wrap:anywhere]">
            {title}
          </h2>
          <button
            type="button"
            aria-label={closeLabel}
            onClick={() => dialogRef.current?.close()}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-pill bg-background shadow-neu-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="relative mx-auto mb-5 h-[min(70dvh,40rem)] w-[calc(100%-2.5rem)] sm:mb-8 sm:w-[calc(100%-4rem)]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 768px) 40rem, 100vw"
            className="object-contain"
          />
        </div>
      </dialog>
    </>
  );
}
