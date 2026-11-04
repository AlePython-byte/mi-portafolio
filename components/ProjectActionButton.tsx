const buttonBase =
  "rounded-pill px-5 py-2.5 text-sm font-semibold shadow-neu-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

type Props = {
  label: string;
  href: string;
  disabledText: string;
  primary?: boolean;
};

export default function ProjectActionButton({
  label,
  href,
  disabledText,
  primary = false,
}: Props) {
  if (href === "#") {
    return (
      <button
        type="button"
        disabled
        className={`${buttonBase} cursor-not-allowed opacity-50 shadow-neu-inset`}
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
      className={`${buttonBase} ${
        primary ? "bg-accent text-accent-foreground" : ""
      }`}
    >
      {label}
    </a>
  );
}
