import type { IconType } from "react-icons";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub, SiInstagram } from "react-icons/si";

// Claves: etiquetas de profile.social. LinkedIn no existe en react-icons/si.
export const socialIcons: Record<string, IconType> = {
  GitHub: SiGithub,
  LinkedIn: FaLinkedinIn,
  Instagram: SiInstagram,
};
