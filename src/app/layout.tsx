import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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
});

export const metadata: Metadata = {
  title: "Inas Hamzagić — Software Engineering Portfolio",
  description:
    "Interactive developer portfolio of Inas Hamzagić, a Software Engineering student focused on web development, software development, algorithms and problem-solving.",
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
    description:
      "Interactive developer portfolio of Inas Hamzagić, a Software Engineering student focused on web development, software development, algorithms and problem-solving.",
    siteName: "InasOS",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inas Hamzagić — Software Engineering Portfolio",
    description:
      "Interactive developer portfolio of Inas Hamzagić, a Software Engineering student.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
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
      <body className="h-full overflow-hidden bg-[#070A0F] text-[#E5E7EB]">
        {children}
      </body>
    </html>
  );
}
