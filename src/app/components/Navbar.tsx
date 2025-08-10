"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Moon,
  Sun,
  Menu,
  X,
  Linkedin,
  Github,
  Mail,
  FileText,
} from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  path: string;
  icon?: React.ReactNode;
}

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Navigation items
  const navItems: NavItem[] = useMemo(
    () => [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
      { name: "Skills", path: "/skills" },
      { name: "Projects", path: "/projects" },
      { name: "Contact", path: "/contact" },
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
    (path: string) =>
      path === "/" ? pathname === "/" : pathname.startsWith(path),
    [pathname]
  );

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Scroll detection
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

  // Framer Motion variants
  const sidebarVariants: Variants = {
    hidden: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300,
      },
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300,
        delayChildren: 0.15,
        staggerChildren: 0.1,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300,
      },
    },
  };

  const menuItemVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
    exit: { opacity: 0, x: 50 },
  };

  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.6 },
    exit: { opacity: 0 },
  };

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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          scrolled
            ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg py-3 border-b border-teal-500/20 dark:border-teal-400/20 shadow-lg"
            : "bg-transparent py-5"
        )}
      >
        <nav
          className="flex items-center justify-between px-4 sm:px-6 lg:px-8 container mx-auto"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <div className="relative bg-white dark:bg-slate-900 rounded-lg">
              <Link
                href="/"
                className="text-xl md:text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 rounded-md px-3 py-1 transition-all duration-300"
                aria-label="Home page"
              >
                CodesWithRakib
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <ul className="flex items-center space-x-2" role="menubar">
              {navItems.map((item) => (
                <li key={item.path} role="none">
                  <Link
                    href={item.path}
                    role="menuitem"
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 overflow-hidden",
                      isActive(item.path)
                        ? "text-white bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-400 dark:to-blue-400 shadow-lg"
                        : "text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400"
                    )}
                    aria-current={isActive(item.path) ? "page" : undefined}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {!isActive(item.path) && (
                      <>
                        <span className="absolute inset-0 bg-gradient-to-r from-teal-100 to-blue-100 dark:from-teal-900/30 dark:to-blue-900/30 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out"></span>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-teal-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                      </>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white dark:bg-slate-900 rounded-full">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-slate-700 dark:text-slate-300 hover:bg-transparent transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                >
                  {themeIcon}
                </Button>
              </div>
            </div>

            {/* Resume Button */}
            <div className="hidden lg:block relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white dark:bg-slate-900 rounded-full">
                <Button
                  asChild
                  className="rounded-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                >
                  <Link
                    href="/resume"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resume
                  </Link>
                </Button>
              </div>
            </div>

            {/* Mobile menu toggle */}
            <div className="lg:hidden relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white dark:bg-slate-900 rounded-full">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-slate-700 dark:text-slate-300 hover:bg-transparent transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
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
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />
            <motion.div
              className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-gradient-to-br from-white/90 to-slate-100/90 dark:from-slate-900/90 dark:to-slate-800/90 backdrop-blur-xl shadow-2xl border-l border-slate-200/50 dark:border-slate-700/50 overflow-hidden flex flex-col"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-blue-500"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400/10 rounded-full filter blur-3xl -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full filter blur-3xl -ml-20 -mb-20"></div>

              {/* Header section */}
              <div className="relative px-8 py-6 flex items-center justify-between border-b border-slate-200/50 dark:border-slate-700/50">
                <Link
                  href="/"
                  className="text-2xl font-extrabold bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 rounded-md"
                  onClick={closeMobileMenu}
                  aria-label="Home page"
                >
                  CodesWithRakib
                </Link>
                <button
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                  className="p-2 rounded-md hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition"
                >
                  <X className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                </button>
              </div>

              {/* Main navigation */}
              <nav className="relative flex-1 overflow-y-auto px-8 py-8">
                <ul className="space-y-4" role="menu">
                  {navItems.map((item, i) => (
                    <motion.li
                      key={item.path}
                      role="none"
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      custom={i}
                    >
                      <Link
                        href={item.path}
                        role="menuitem"
                        className={cn(
                          "flex items-center px-6 py-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 group",
                          isActive(item.path)
                            ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-700/50"
                        )}
                        onClick={closeMobileMenu}
                        aria-current={isActive(item.path) ? "page" : undefined}
                      >
                        <span className="text-lg font-semibold">
                          {item.name}
                        </span>
                        {!isActive(item.path) && (
                          <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-5 h-5"
                            >
                              <path d="M5 12h14" />
                              <path d="m12 5 7 7-7 7" />
                            </svg>
                          </span>
                        )}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {/* Social links */}
                <motion.div
                  className="mt-12"
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 px-6">
                    Connect With Me
                  </h3>
                  <div className="flex justify-center space-x-4">
                    {socialLinks.map((link, i) => (
                      <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        variants={menuItemVariants}
                        custom={i}
                        aria-label={link.name}
                      >
                        {link.icon}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </nav>

              {/* Footer section */}
              <div className="relative px-8 py-6 border-t border-slate-200/50 dark:border-slate-700/50">
                <motion.div
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Button
                    asChild
                    className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                  >
                    <Link
                      href="/resume"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMobileMenu}
                    >
                      <FileText className="w-5 h-5 mr-2" />
                      Download Resume
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  className="flex justify-center mt-6"
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                  >
                    {themeIcon}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Gradient tilt animation */}
      <style jsx global>{`
        @keyframes tilt {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(1deg);
          }
          75% {
            transform: rotate(-1deg);
          }
        }
        .animate-tilt {
          animation: tilt 5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
