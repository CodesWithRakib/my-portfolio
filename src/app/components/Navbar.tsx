"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Define TypeScript interface for navigation items
interface NavItem {
  name: string;
  path: string;
}

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);

  // Memoize navigation items to prevent unnecessary recalculations
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

  // Memoize active path checker
  const isActive = useCallback(
    (path: string) =>
      path === "/" ? pathname === "/" : pathname.startsWith(path),
    [pathname]
  );

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Get navbar height for mobile sidebar positioning
  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.querySelector("header");
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    };

    updateNavbarHeight();
    window.addEventListener("resize", updateNavbarHeight);
    return () => window.removeEventListener("resize", updateNavbarHeight);
  }, []);

  // Optimized scroll handler with throttling
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

  // Memoize theme icon to prevent unnecessary re-renders
  const themeIcon = useMemo(() => {
    if (!mounted) return <div className="w-5 h-5" />;
    return theme === "dark" ? (
      <Sun className="w-5 h-5" />
    ) : (
      <Moon className="w-5 h-5" />
    );
  }, [theme, mounted]);

  // Toggle theme with memoized handler
  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  // Toggle mobile menu with memoized handler
  const toggleMobileMenu = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  // Close mobile menu with memoized handler
  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-teal-500 text-white px-4 py-2 rounded-md z-50 transition-all duration-300"
      >
        Skip to content
      </a>

      <header
        ref={(el) => {
          if (el) setNavbarHeight(el.offsetHeight);
        }}
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
          {/* Logo with animated gradient border */}
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

          {/* Desktop Navigation with glassmorphism effect */}
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

          <div className="flex items-center gap-4">
            {/* Theme Toggle with animated gradient border */}
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

            {/* Resume Button with animated gradient border */}
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

            {/* Mobile Menu Toggle with animated gradient border */}
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
                  aria-controls="mobile-menu"
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

      {/* Mobile Menu with gradient background and smooth animations */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 transition-opacity duration-300 ease-in-out",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!mobileOpen}
        style={{ paddingTop: `${navbarHeight}px` }}
      >
        {/* Backdrop with gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-teal-900/90 to-blue-900/90 backdrop-blur-sm"
          onClick={closeMobileMenu}
          aria-hidden="true"
        ></div>

        {/* Menu Panel with glassmorphism effect */}
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-full max-w-sm bg-gradient-to-b from-white/90 to-slate-100/90 dark:from-slate-900/90 dark:to-slate-800/90 backdrop-blur-lg shadow-2xl transform transition-transform duration-500 ease-in-out overflow-hidden",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
          style={{
            top: `${navbarHeight}px`,
            height: `calc(100% - ${navbarHeight}px)`,
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex items-center justify-between mb-8">
              <Link
                href="/"
                className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 rounded-md transition-all duration-300"
                onClick={closeMobileMenu}
                aria-label="Home page"
              >
                CodesWithRakib
              </Link>

              {/* Close button with animated gradient border */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white dark:bg-slate-900 rounded-full">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-slate-700 dark:text-slate-300 hover:bg-transparent transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                    onClick={closeMobileMenu}
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <ul className="space-y-4" role="menu">
                {navItems.map((item, i) => (
                  <li
                    key={item.path}
                    role="none"
                    className={cn(
                      "transform transition-all duration-500",
                      mobileOpen
                        ? "translate-x-0 opacity-100"
                        : "translate-x-16 opacity-0"
                    )}
                    style={{ transitionDelay: `${i * 70}ms` }}
                  >
                    <Link
                      href={item.path}
                      role="menuitem"
                      className={cn(
                        "block text-lg font-medium px-6 py-4 rounded-xl text-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 relative overflow-hidden group",
                        isActive(item.path)
                          ? "bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-400 dark:to-blue-400 text-white shadow-lg"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                      )}
                      onClick={closeMobileMenu}
                      aria-current={isActive(item.path) ? "page" : undefined}
                    >
                      <span className="relative z-10">{item.name}</span>
                      {!isActive(item.path) && (
                        <span className="absolute inset-0 bg-gradient-to-r from-teal-100 to-blue-100 dark:from-teal-900/30 dark:to-blue-900/30 rounded-xl transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out"></span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-auto border-t border-teal-500/20 dark:border-teal-400/20">
              <div className="w-full mt-4 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white dark:bg-slate-900 rounded-xl">
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
                      Resume
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-center mt-6">
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animation for the gradient border effect */}
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
