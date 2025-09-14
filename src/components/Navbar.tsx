"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import {
  Moon,
  Sun,
  Menu,
  X,
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
  const resumePath = "/Md_Rakib_Islam_Full_Stack_Resume.pdf";
  const resumeFileName = "Md_Rakib_Islam_Full_Stack_Resume.pdf";

  // Navigation items
  const navItems: NavItem[] = useMemo(
    () => [
      { name: "Home", path: "/", icon: <Home className="w-5 h-5" /> },
      { name: "About", path: "/about", icon: <User className="w-5 h-5" /> },
      { name: "Skills", path: "/skills", icon: <Wrench className="w-5 h-5" /> },
      {
        name: "Projects",
        path: "/projects",
        icon: <FolderOpen className="w-5 h-5" />,
      },
      {
        name: "Contact",
        path: "/contact",
        icon: <MessageSquare className="w-5 h-5" />,
      },
    ],
    []
  );

  // Check if link is active
  const isActive = useCallback(
    (path: string) => {
      if (path === "/") return pathname === "/";
      return pathname === path || pathname.startsWith(`${path}/`);
    },
    [pathname]
  );

  // Handle scroll for sticky navbar effect
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Theme icon with loading state
  const themeIcon = useMemo(() => {
    if (!mounted) return <div className="w-6 h-6" />;
    return theme === "dark" ? (
      <Sun className="w-6 h-6 transition-transform hover:scale-110" />
    ) : (
      <Moon className="w-6 h-6 transition-transform hover:scale-110" />
    );
  }, [theme, mounted]);

  // Toggle theme
  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  // Toggle mobile menu
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
  }, [resumePath, resumeFileName, closeMobileMenu]);

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg z-50 transition-all duration-200"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full h-16", 
          scrolled
            ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-lg shadow-sm border-b border-green-500/20"
            : "bg-transparent"
        )}
      >
        <nav
          className="flex items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto h-full" // Added h-full here
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg"
            aria-label="Home page"
          >
            CodesWithRakib
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <ul className="flex items-center gap-1" role="menubar">
              {navItems.map((item) => (
                <li key={item.path} role="none">
                  <Link
                    href={item.path}
                    role="menuitem"
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive(item.path)
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-sm"
                        : "text-slate-700 dark:text-slate-200 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400"
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

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-slate-600 dark:text-slate-300 hover:bg-green-100 dark:hover:bg-green-900/50 transition-all duration-200"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {themeIcon}
            </Button>

            {/* Resume Button */}
            <Button
              className="hidden sm:flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
              onClick={handleResumeDownload}
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full text-slate-600 dark:text-slate-300 hover:bg-green-100 dark:hover:bg-green-900/50 transition-all duration-200"
              onClick={toggleMobileMenu}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
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
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          {/* Sidebar */}
          <div
            className={cn(
              "fixed top-0 right-0 z-50 h-full w-80 bg-white dark:bg-slate-950 shadow-xl border-l border-slate-200 dark:border-slate-800 overflow-y-auto transition-transform duration-300 ease-in-out",
              mobileOpen ? "translate-x-0" : "translate-x-full"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800">
              <Link
                href="/"
                className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500 bg-clip-text text-transparent"
                onClick={closeMobileMenu}
                aria-label="Home page"
              >
                CodesWithRakib
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeMobileMenu}
                aria-label="Close menu"
                className="text-slate-600 dark:text-slate-300 hover:bg-green-100 dark:hover:bg-green-900/50"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Navigation */}
            <nav className="px-6 py-8">
              <ul className="space-y-2" role="menu">
                {navItems.map((item) => (
                  <li key={item.path} role="none">
                    <Link
                      href={item.path}
                      role="menuitem"
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200",
                        isActive(item.path)
                          ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30"
                          : "text-slate-700 dark:text-slate-200 hover:bg-green-50 dark:hover:bg-green-900/30"
                      )}
                      onClick={closeMobileMenu}
                      aria-current={isActive(item.path) ? "page" : undefined}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer */}
            <div className="px-6 py-6 border-t border-slate-200 dark:border-slate-800">
              <Button
                className="w-full rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
                onClick={handleResumeDownload}
              >
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
