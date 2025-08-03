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
    <footer className="relative w-full border-t border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
      {/* Enhanced background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
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

        {/* Subtle animated gradient orbs */}
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-200/20 dark:bg-blue-800/10 blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-indigo-200/20 dark:bg-indigo-800/10 blur-3xl"
        />
      </div>

      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
      />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-400 dark:to-indigo-500 bg-clip-text text-transparent">
              CodesWithRakib
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Crafting digital experiences that matter
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center md:items-end gap-4"
          >
            <div className="flex space-x-4">
              <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.9 }}>
                <Link
                  href="https://github.com/codeswithrakib"
                  target="_blank"
                  aria-label="GitHub"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <FaGithub className="w-5 h-5" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.9 }}>
                <Link
                  href="https://linkedin.com/in/codeswithrakib"
                  target="_blank"
                  aria-label="LinkedIn"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <FaLinkedin className="w-5 h-5" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.9 }}>
                <Link
                  href="https://x.com/codeswithrakib"
                  target="_blank"
                  aria-label="Twitter"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <FaTwitter className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400 text-center md:text-right">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400"
        >
          <p className="leading-relaxed">
            Built with{" "}
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              Next.js
            </span>
            ,{" "}
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              Tailwind CSS
            </span>
            , and{" "}
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              TypeScript
            </span>
          </p>
        </motion.div>
      </div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-500 dark:to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all"
            aria-label="Scroll to top"
          >
            <FaArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
