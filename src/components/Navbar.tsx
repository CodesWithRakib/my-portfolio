"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  ChevronRight,
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

  // Resume file path - centralized for consistency
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

  // Check if link is active - Fixed to properly handle nested routes
  const isActive = useCallback(
    (path: string) => {
      if (path === "/") {
        return pathname === "/";
      }
      // Check if pathname exactly matches the path or starts with path + "/"
      return pathname === path || pathname.startsWith(`${path}/`);
    },
    [pathname]
  );

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Scroll detection with throttling
  useEffect(() => {
    setMounted(true);
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme icon memoization
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
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-md z-50 transition-all duration-300"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out w-full",
          scrolled
            ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md py-2 sm:py-3 border-b border-teal-500/20 dark:border-teal-400/20 shadow-lg"
            : "bg-transparent py-3 sm:py-5"
        )}
      >
        <nav
          className="font-jetbrains-mono flex items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 rounded-md px-3 py-1 transition-all duration-300"
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
                      "relative px-3 md:px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 overflow-hidden flex items-center gap-2",
                      isActive(item.path)
                        ? "text-white bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-400 dark:to-blue-400 shadow-lg"
                        : "text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400"
                    )}
                    aria-current={isActive(item.path) ? "page" : undefined}
                  >
                    {item.icon}
                    <span className="relative z-10">{item.name}</span>
                    {!isActive(item.path) && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-teal-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                    )}
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
              className="rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {themeIcon}
            </Button>

            {/* Resume Button */}
            <div className="hidden sm:block">
              <Button
                className="rounded-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 text-sm w-full"
                onClick={handleResumeDownload}
              >
                <FileText className="w-4 h-4 mr-0.5" />
                Resume
              </Button>
            </div>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
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

      {/* Mobile Sidebar with Animation */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop with animation */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={closeMobileMenu}
              aria-hidden="true"
            />

            {/* Sidebar with animation */}
            <motion.div
              className="fixed top-0 right-0 z-50 h-full w-full max-w-xs sm:max-w-md bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Header section */}
              <div className="px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                <Link
                  href="/"
                  className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 rounded-md"
                  onClick={closeMobileMenu}
                  aria-label="Home page"
                >
                  CodesWithRakib
                </Link>
                <button
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700 dark:text-slate-300" />
                </button>
              </div>

              {/* Main navigation */}
              <nav className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-8">
                <ul className="space-y-2 sm:space-y-3" role="menu">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.path}
                      role="none"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        href={item.path}
                        role="menuitem"
                        className={cn(
                          "flex items-center px-3 sm:px-4 py-3 sm:py-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500",
                          isActive(item.path)
                            ? "bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
                        )}
                        onClick={closeMobileMenu}
                        aria-current={isActive(item.path) ? "page" : undefined}
                      >
                        <div
                          className={cn(
                            "p-2 rounded-lg mr-3",
                            isActive(item.path)
                              ? "bg-teal-500/20 text-teal-600 dark:text-teal-400"
                              : "bg-slate-100/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300"
                          )}
                        >
                          {item.icon}
                        </div>
                        <span className="text-base sm:text-lg font-semibold">
                          {item.name}
                        </span>
                        {!isActive(item.path) && (
                          <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                          </span>
                        )}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {/* Social links with animation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="mt-8 sm:mt-12"
                >
                  <h3 className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 sm:mb-4 px-3 sm:px-4">
                    Connect With Me
                  </h3>
                  <div className="flex justify-center space-x-3 sm:space-x-4">
                    {socialLinks.map((link, index) => (
                      <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 sm:p-3 rounded-full bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        aria-label={link.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {link.icon}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </nav>

              {/* Footer section */}
              <div className="px-4 sm:px-6 py-4 sm:py-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <Button
                  className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
                  onClick={handleResumeDownload}
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Download Resume
                </Button>

                <div className="flex justify-center mt-4 sm:mt-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                  >
                    {themeIcon}
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
