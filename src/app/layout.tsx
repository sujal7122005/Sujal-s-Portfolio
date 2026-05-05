import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono, Inter } from "next/font/google";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import "./globals.css";

const dmSans = DM_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const inter = Inter({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sujal Patel — Software Engineer",
  description:
    "Software engineer building full-stack applications with Next.js, React, Node.js. Computer Engineering at VGEC, CGPA 9.04.",
  keywords: ["Sujal Patel", "Software Engineer", "Full Stack Developer", "Portfolio"],
  authors: [{ name: "Sujal Patel" }],
  openGraph: {
    title: "Sujal Patel — Software Engineer",
    description: "Full-stack developer building production-grade applications.",
    url: siteUrl,
    type: "website",
  },
  icons: { icon: "/Logo%20(2).png" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${jetBrainsMono.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-[family-name:var(--font-sans)]">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
