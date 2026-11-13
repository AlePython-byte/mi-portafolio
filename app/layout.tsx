import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import { PreferencesProvider } from "@/components/PreferencesProvider";
import { site } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  openGraph: {
    type: "website",
    locale: site.locale,
    alternateLocale: site.alternateLocale,
    url: "/",
    siteName: site.siteName,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

const themeScript = `
  (() => {
    let theme = 'light';
    let storedLanguage = null;
    try {
      const storedTheme = localStorage.getItem('portfolio-theme');
      if (storedTheme === 'light' || storedTheme === 'dark') {
        theme = storedTheme;
      }
      storedLanguage = localStorage.getItem('portfolio-language');
    } catch (_) {}
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    if (storedLanguage === 'es' || storedLanguage === 'en') {
      document.documentElement.lang = storedLanguage;
    }
  })();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-theme="light"
      suppressHydrationWarning
      className={`scroll-smooth ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <PreferencesProvider>
          <MotionProvider>{children}</MotionProvider>
        </PreferencesProvider>
      </body>
    </html>
  );
}
