import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hamzagicinas.vercel.app"),
  title: {
    default: "Inas Hamzagić — Software Engineering Portfolio",
    template: "%s · Inas Hamzagić",
  },
  description: profile.tagline,
  alternates: { canonical: "/" },
  applicationName: "InasOS",
  keywords: [
    "Inas Hamzagić",
    "InasOS",
    "Software Engineering",
    "Portfolio",
    "Web Development",
    "React",
    "Next.js",
    "Novi Pazar",
  ],
  authors: [{ name: "Inas Hamzagić" }],
  creator: "Inas Hamzagić",
  openGraph: {
    title: "Inas Hamzagić — Software Engineering Portfolio",
    description: profile.tagline,
    url: "/",
    siteName: "InasOS",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inas Hamzagić — Software Engineering Portfolio",
    description: profile.tagline,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070A0F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--os-bg)] text-[var(--os-text)]">
        {children}
      </body>
    </html>
  );
}
