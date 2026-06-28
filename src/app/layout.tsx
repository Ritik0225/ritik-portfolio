import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { SmoothScrollProvider } from "@/components/shared/smooth-scroll-provider";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { CustomCursor } from "@/components/shared/custom-cursor";
import { BackToTop } from "@/components/shared/back-to-top";
import { CommandPalette } from "@/components/shared/command-palette";
import { GridBackground } from "@/components/shared/grid-background";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { JsonLd } from "@/components/shared/json-ld";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/constants/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  ...buildMetadata(),
  keywords: [...siteConfig.keywords],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#070B14" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${mono.variable}`}
    >
      <body className="min-h-screen overflow-x-hidden bg-background font-sans text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <SmoothScrollProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
            >
              Skip to content
            </a>
            <GridBackground />
            <ScrollProgress />
            <CustomCursor />
            <Navbar />
            <CommandPalette />
            <main id="main" className="relative isolate">
              {children}
            </main>
            <Footer />
            <BackToTop />
            <Toaster
              position="bottom-right"
              theme="system"
              richColors
              closeButton
            />
            <JsonLd />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
