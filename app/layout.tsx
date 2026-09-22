import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_TITLE = "Lakhan Singh | AI/ML Developer";

export const metadata: Metadata = {
  metadataBase: new URL("https://lakhansingh.dev"),
  title: {
    default: SITE_TITLE,
    template: "%s | Lakhan Singh",
  },
  description:
    "Portfolio of Lakhan Singh — AI/ML Developer focused on Machine Learning, Generative AI, Computer Vision and intelligent systems.",
  keywords: [
    "Lakhan Singh",
    "AI/ML Developer",
    "Machine Learning",
    "Generative AI",
    "Computer Vision",
    "Large Language Models",
    "RAG",
    "Python",
  ],
  authors: [{ name: "Lakhan Singh", url: "https://github.com/Lakhan07AU" }],
  creator: "Lakhan Singh",
  openGraph: {
    title: SITE_TITLE,
    description:
      "Portfolio of Lakhan Singh — AI/ML Developer focused on Machine Learning, Generative AI, Computer Vision and intelligent systems.",
    url: "/",
    siteName: "Lakhan Singh Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description:
      "Portfolio of Lakhan Singh — AI/ML Developer focused on Machine Learning, Generative AI, Computer Vision and intelligent systems.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

const themeInit = `(function(){try{var t=localStorage.getItem("portfolio-theme");if(t==="light"){document.documentElement.classList.add("light")}else if(t==="dark"){/* default */}else if(window.matchMedia("(prefers-color-scheme: light)").matches){document.documentElement.classList.add("light")}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInit}
        </Script>
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}