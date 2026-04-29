import type { Metadata, Viewport } from "next";
import {
  Bebas_Neue,
  DM_Sans,
  JetBrains_Mono,
  Space_Mono,
  Syne,
} from "next/font/google";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sujal Patel - Full Stack Developer",
  description:
    "Computer Engineering student at VGEC with CGPA 9.04, building full-stack apps with Next.js, React, and Node.js.",
  keywords: [
    "Sujal Patel",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "VGEC",
    "Computer Engineering",
    "Internship",
  ],
  authors: [{ name: "Sujal Patel" }],
  openGraph: {
    title: "Sujal Patel - Full Stack Developer",
    description:
      "Portfolio of Sujal Patel - full-stack developer building with Next.js, React, Node.js, and modern web tools.",
    url: siteUrl,
    siteName: "Sujal Patel Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sujal Patel Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sujal Patel - Full Stack Developer",
    description: "Full Stack Developer | Next.js | React | Node.js",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#020817",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${spaceMono.variable} ${syne.variable} ${dmSans.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <ScrollProgress />
        <div className="noise-overlay" aria-hidden />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
