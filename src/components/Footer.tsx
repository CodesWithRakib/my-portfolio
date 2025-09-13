"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaArrowUp } from "react-icons/fa";
import { useState, useEffect } from "react";

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Show scroll-to-top button when user scrolls down
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

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.4 }
  };
  const progressLine = {
    initial: { width: 0 },
    whileInView: { width: "100%" },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeInOut" }
  };

  return (
    <footer className="font-jetbrains-mono relative w-full border-t border-green-200/50 dark:border-green-800/50 overflow-hidden mt-auto">
      {/* Simplified background with subtle green theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-green-50 dark:from-slate-950 dark:to-slate-900">
        {/* Subtle grid pattern - no animation */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
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
        
        {/* Single subtle animated orb */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-green-200/20 dark:bg-green-800/10 blur-3xl"
        />
      </div>
      
      <motion.div
        variants={progressLine}
        initial="initial"
        whileInView="whileInView"
        className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent"
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 w-full">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
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
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            className="flex flex-col items-center md:items-end gap-3 md:gap-4 w-full"
          >
            <div className="flex space-x-3 sm:space-x-4">
              <Link
                href="https://github.com/codeswithrakib"
                target="_blank"
                aria-label="GitHub"
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              
              <Link
                href="https://linkedin.com/in/codeswithrakib"
                target="_blank"
                aria-label="LinkedIn"
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              
              <Link
                href="https://x.com/codeswithrakib"
                target="_blank"
                aria-label="Twitter"
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                <FaTwitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 text-center md:text-right">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </motion.div>
        </div>
        
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
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
      
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 p-2.5 sm:p-3 rounded-full bg-green-600 dark:bg-green-500 text-white shadow-lg hover:shadow-xl transition-all"
            aria-label="Scroll to top"
          >
            <FaArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}