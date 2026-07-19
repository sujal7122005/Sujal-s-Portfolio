import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import "./globals.css";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-sans",
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
  themeColor: "#25282b",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-[family-name:var(--font-sans)] selection:bg-[var(--accent)] selection:text-white">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
