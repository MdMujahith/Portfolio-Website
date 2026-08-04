import type { Metadata } from "next";
import { siteConfig } from "@/data/site.config";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import NetworkMonitor from "@/components/ui/NetworkMonitor";

/* ============================================
 * SEO CONFIGURATION
 * ============================================
 * Centralized from site.config.ts
 */
const twitterHandle = siteConfig.social.twitter.match(
  /(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/([^/?#]+)/i,
)?.[1];

export const metadata: Metadata = {
  metadataBase: new URL("https://mdmujahith.vercel.app"),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.seo.author }],
  creator: siteConfig.seo.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mdmujahith.vercel.app",

    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    siteName: siteConfig.seo.title,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.seo.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.ogImage],
    ...(twitterHandle ? { creator: `@${twitterHandle}` } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&family=JetBrains+Mono:wght@500;600;700&family=Orbitron:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-sans">
        <ThemeProvider>
          <NetworkMonitor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
