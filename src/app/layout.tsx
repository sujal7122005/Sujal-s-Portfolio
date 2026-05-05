import type { Metadata, Viewport } from "next";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sujal Patel's Portfolio",
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
    title: "Sujal Patel's Portfolio",
    description:
      "Portfolio of Sujal Patel - full-stack developer building with Next.js, React, Node.js, and modern web tools.",
    url: siteUrl,
    siteName: "Sujal Patel Portfolio",
    images: [
      {
        url: "/Logo%20(2).png",
        alt: "Sujal Patel Portfolio Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sujal Patel's Portfolio",
    description: "Full Stack Developer | Next.js | React | Node.js",
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
  themeColor: "#181818",
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
      className="h-full antialiased"
    >
      <body className="min-h-full bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
