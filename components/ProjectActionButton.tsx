export const projectButtonBase =
  "rounded-pill px-5 py-2.5 text-sm font-semibold shadow-neu-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

type Props = {
  label: string;
  href: string;
  disabledText: string;
  disabledAria: string;
  primary?: boolean;
  // "retro" usa el relieve del escritorio retro en lugar del neumórfico.
  variant?: "default" | "retro";
};

const retroButton = "retro-button inline-block px-4 py-1 no-underline";

export default function ProjectActionButton({
  label,
  href,
  disabledText,
  disabledAria,
  primary = false,
  variant = "default",
}: Props) {
  if (variant === "retro") {
    if (href === "#") {
      return (
        <button
          type="button"
          disabled
          aria-label={disabledAria}
          className={`${retroButton} cursor-not-allowed opacity-50`}
        >
          {disabledText}
        </button>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${retroButton} ${primary ? "font-bold" : ""}`}
      >
        {label}
      </a>
    );
  }
  if (href === "#") {
    return (
      <button
        type="button"
        disabled
        aria-label={disabledAria}
        className={`${projectButtonBase} cursor-not-allowed opacity-50 shadow-neu-inset`}
      >
        {disabledText}
      </button>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${projectButtonBase} ${
        primary ? "bg-accent text-accent-foreground" : ""
      }`}
    >
      {label}
    </a>
  );
}
