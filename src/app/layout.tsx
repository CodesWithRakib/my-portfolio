// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Fira_Code, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ToggleTheme";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Font for code elements and technical details
const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
  adjustFontFallback: false,
});

// Additional monospace font for code examples
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  adjustFontFallback: false,
});

// Clean, modern sans-serif for body text
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: {
    default: "Portfolio | Full Stack Developer",
    template: "%s | Rakib's Portfolio",
  },
  description:
    "Professional portfolio showcasing my work as a Full Stack Developer specializing in modern web technologies.",
  keywords: [
    "portfolio",
    "developer",
    "full stack",
    "web development",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Rakib", url: "https://codeswithrakib.vercel.app" }],
  creator: "Rakib",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codeswithrakib.vercel.app",
    title: "Rakib's Portfolio",
    description: "Professional portfolio of a Full Stack Developer",
    siteName: "Rakib's Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rakib's Portfolio",
    description: "Professional portfolio of a Full Stack Developer",
    creator: "@codeswithrakib",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0fdf4" }, // Light green background
    { media: "(prefers-color-scheme: dark)", color: "#022c22" }, // Dark green background
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${firaCode.variable} ${jetbrainsMono.variable} font-sans bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 w-full font-jetbrains-mono pt-16 sm:pt-20">
              <div className="">{children}</div>
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
