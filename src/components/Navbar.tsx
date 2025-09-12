"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import {
  Moon,
  Sun,
  Menu,
  X,
  Linkedin,
  Github,
  Mail,
  FileText,
  Home,
  User,
  Wrench,
  FolderOpen,
  MessageSquare,
  Download,
} from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Resume file path
  const resumePath = "/Md_Rakib_Islam_Resume.pdf";
  const resumeFileName = "Md_Rakib_Islam_Resume.pdf";

  // Navigation items with icons
  const navItems: NavItem[] = useMemo(
    () => [
      { name: "Home", path: "/", icon: <Home className="w-4 h-4" /> },
      { name: "About", path: "/about", icon: <User className="w-4 h-4" /> },
      { name: "Skills", path: "/skills", icon: <Wrench className="w-4 h-4" /> },
      {
        name: "Projects",
        path: "/projects",
        icon: <FolderOpen className="w-4 h-4" />,
      },
      {
        name: "Contact",
        path: "/contact",
        icon: <MessageSquare className="w-4 h-4" />,
      },
    ],
    []
  );

  // Social links
  const socialLinks = useMemo(
    () => [
      {
        name: "LinkedIn",
        url: "https://linkedin.com/in/codeswithrakib",
        icon: <Linkedin className="w-5 h-5" />,
      },
      {
        name: "GitHub",
        url: "https://github.com/codeswithrakib",
        icon: <Github className="w-5 h-5" />,
      },
      {
        name: "Email",
        url: "mailto:codeswithrakib@gmail.com",
        icon: <Mail className="w-5 h-5" />,
      },
    ],
    []
  );

  // Check if link is active
  const isActive = useCallback(
    (path: string) => {
      if (path === "/") {
        return pathname === "/";
      }
      return pathname === path || pathname.startsWith(`${path}/`);
    },
    [pathname]
  );

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Scroll detection
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme icon
  const themeIcon = useMemo(() => {
    if (!mounted) return <div className="w-5 h-5" />;
    return theme === "dark" ? (
      <Sun className="w-5 h-5" />
    ) : (
      <Moon className="w-5 h-5" />
    );
  }, [theme, mounted]);

  // Toggle theme handler
  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  // Mobile menu toggle
  const toggleMobileMenu = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  // Close mobile menu
  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  // Handle resume download
  const handleResumeDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = resumePath;
    link.download = resumeFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    closeMobileMenu();
  }, [closeMobileMenu, resumePath, resumeFileName]);

  return (
    <>
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 rounded-md z-50"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full",
          scrolled
            ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md py-2 sm:py-3 border-b border-green-500/20 dark:border-green-400/20 shadow-lg"
            : "lg:bg-transparent bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm py-3 sm:py-5 border-b border-green-500/10 dark:border-green-400/10"
        )}
      >
        <nav
          className="flex items-center justify-between px-4 max-w-7xl mx-auto w-full"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md px-3 py-1"
            aria-label="Home page"
          >
            CodesWithRakib
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <ul
              className="flex items-center space-x-1 md:space-x-2"
              role="menubar"
            >
              {navItems.map((item) => (
                <li key={item.path} role="none">
                  <Link
                    href={item.path}
                    role="menuitem"
                    className={cn(
                      "relative px-3 md:px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-500",
                      isActive(item.path)
                        ? "text-white bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400 shadow-md"
                        : "text-slate-700 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400"
                    )}
                    aria-current={isActive(item.path) ? "page" : undefined}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {themeIcon}
            </Button>

            {/* Resume Button */}
            <div className="hidden sm:block">
              <Button
                className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-md hover:shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                onClick={handleResumeDownload}
              >
                <FileText className="w-4 h-4 mr-1" />
                Resume
              </Button>
            </div>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={toggleMobileMenu}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          {/* Sidebar with simple slide-in animation */}
          <div
            className="fixed top-0 right-0 z-50 h-full w-full max-w-xs sm:max-w-md bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col transition-transform duration-300"
            style={{
              transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            {/* Header section */}
            <div className="px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
              <Link
                href="/"
                className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md"
                onClick={closeMobileMenu}
                aria-label="Home page"
              >
                CodesWithRakib
              </Link>
              <button
                onClick={closeMobileMenu}
                aria-label="Close menu"
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700 dark:text-slate-300" />
              </button>
            </div>

            {/* Main navigation */}
            <nav className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-8">
              <ul className="space-y-2 sm:space-y-3" role="menu">
                {navItems.map((item) => (
                  <li key={item.path} role="none">
                    <Link
                      href={item.path}
                      role="menuitem"
                      className={cn(
                        "flex items-center px-3 sm:px-4 py-3 sm:py-4 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-green-500",
                        isActive(item.path)
                          ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
                      )}
                      onClick={closeMobileMenu}
                      aria-current={isActive(item.path) ? "page" : undefined}
                    >
                      <div
                        className={cn(
                          "p-2 rounded-lg mr-3",
                          isActive(item.path)
                            ? "bg-green-500/20 text-green-600 dark:text-green-400"
                            : "bg-slate-100/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300"
                        )}
                      >
                        {item.icon}
                      </div>
                      <span className="text-base sm:text-lg font-semibold">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Social links */}
              <div className="mt-8 sm:mt-12">
                <h3 className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 sm:mb-4 px-3 sm:px-4">
                  Connect With Me
                </h3>
                <div className="flex justify-center space-x-3 sm:space-x-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 sm:p-3 rounded-full bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                      aria-label={link.name}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </nav>

            {/* Footer section */}
            <div className="px-4 sm:px-6 py-4 sm:py-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
              <Button
                className="w-full rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-md hover:shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                onClick={handleResumeDownload}
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Download Resume
              </Button>
              <div className="flex justify-center mt-4 sm:mt-6">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                >
                  {themeIcon}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
