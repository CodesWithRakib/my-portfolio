import type { Metadata, Viewport } from "next";
import { Fira_Code, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ToggleTheme";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { Footer } from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";

// Font for code elements and technical details
const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
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
  authors: [{ name: "Rakib", url: "https://codeswithrakib.netlify.app" }],
  creator: "Rakib",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codeswithrakib.netlify.app",
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
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020817" },
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
        className={`${inter.variable}  ${firaCode.variable} font-sans bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LoadingScreen />
          <CustomCursor />
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster position="bottom-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
