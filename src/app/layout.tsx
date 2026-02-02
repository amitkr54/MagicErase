import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "MagicErase | Free AI Background Remover Online (100% Private)",
  description: "Remove image backgrounds instantly with MagicErase. High-quality AI removal that runs purely in your browser. No uploads, 100% privacy, and free forever.",
  keywords: [
    "ai background remover",
    "background removal tool",
    "transparent background maker",
    "remove bg online",
    "free image cutouts",
    "privacy-friendly ai photo editor",
    "browser background removal",
    "magic erase ai"
  ],
  authors: [{ name: "MagicErase AI" }],
  openGraph: {
    title: "MagicErase | Free AI Background Remover",
    description: "Instant AI background removal directly in your browser.",
    url: "https://magicerase.ai",
    siteName: "MagicErase",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MagicErase AI Background Remover",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MagicErase | Free AI Background Remover",
    description: "Instant AI background removal directly in your browser.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} font-sans antialiased text-white bg-black`}>
        <div className="bg-mesh" />
        {children}
      </body>
    </html>
  );
}
