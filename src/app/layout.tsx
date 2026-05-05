import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Space_Mono, Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

const syne = Syne({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sujal Patel — Software Engineer & Full-Stack Developer",
  description:
    "Portfolio of Sujal Patel — Computer Engineering student at VGEC with CGPA 9.04. Building production-grade full-stack applications with Next.js, React, Node.js, and modern web technologies.",
  keywords: [
    "Sujal Patel",
    "Software Engineer",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "VGEC",
    "Computer Engineering",
    "Portfolio",
    "Internship",
  ],
  authors: [{ name: "Sujal Patel" }],
  openGraph: {
    title: "Sujal Patel — Software Engineer & Full-Stack Developer",
    description:
      "Computer Engineering student building production-grade apps with Next.js, React, Node.js & modern web tools. Explore my projects and connect.",
    url: siteUrl,
    siteName: "Sujal Patel Portfolio",
    images: [
      {
        url: "/Logo%20(2).png",
        alt: "Sujal Patel Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sujal Patel — Software Engineer",
    description: "Full-Stack Developer | Next.js | React | Node.js | TypeScript",
    images: ["/Logo%20(2).png"],
  },
  icons: {
    icon: "/Logo%20(2).png",
    shortcut: "/Logo%20(2).png",
    apple: "/Logo%20(2).png",
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
      className={`h-full antialiased ${bebasNeue.variable} ${spaceMono.variable} ${syne.variable} ${dmSans.variable} ${jetBrainsMono.variable}`}
    >
      <body className="min-h-full bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
