"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaArrowUp } from "react-icons/fa";
import { useState, useEffect } from "react";

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show scroll-to-top button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="font-jetbrains-mono relative w-full border-t border-green-200/50 dark:border-green-800/50 overflow-hidden mt-auto">
      {/* Enhanced background with green gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-green-50 dark:from-slate-950 dark:to-slate-900">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-20 dark:opacity-30">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, currentColor 1px, transparent 1px),
                linear-gradient(to bottom, currentColor 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
              color: "#94a3b8",
            }}
          />
        </div>

        {/* Simplified animated gradient orbs */}
        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full bg-green-200/20 dark:bg-green-800/10 blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full bg-emerald-200/20 dark:bg-emerald-800/10 blur-3xl"
        />
      </div>

      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center md:text-left max-w-md w-full"
          >
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
              CodesWithRakib
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm sm:text-base">
              Crafting digital experiences that matter
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col items-center md:items-end gap-3 md:gap-4 w-full"
          >
            <div className="flex space-x-3 sm:space-x-4">
              <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.9 }}>
                <Link
                  href="https://github.com/codeswithrakib"
                  target="_blank"
                  aria-label="GitHub"
                  className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.9 }}>
                <Link
                  href="https://linkedin.com/in/codeswithrakib"
                  target="_blank"
                  aria-label="LinkedIn"
                  className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.9 }}>
                <Link
                  href="https://x.com/codeswithrakib"
                  target="_blank"
                  aria-label="Twitter"
                  className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  <FaTwitter className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </motion.div>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 text-center md:text-right">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 md:mt-10 pt-4 md:pt-6 border-t border-green-100 dark:border-green-800 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 w-full"
        >
          <p className="leading-relaxed">
            Built with{" "}
            <span className="text-green-600 dark:text-green-400 font-medium">
              Next.js
            </span>
            ,{" "}
            <span className="text-green-600 dark:text-green-400 font-medium">
              Tailwind CSS
            </span>
            , and{" "}
            <span className="text-green-600 dark:text-green-400 font-medium">
              TypeScript
            </span>
          </p>
        </motion.div>
      </div>

      {/* Scroll to top button with green theme */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 p-2.5 sm:p-3 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500 text-white shadow-lg hover:shadow-xl transition-all"
            aria-label="Scroll to top"
          >
            <FaArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
