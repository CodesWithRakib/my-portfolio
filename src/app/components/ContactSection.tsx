"use client";
import { motion } from "framer-motion";
import { ContactForm } from "./ContactForm";
import { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ContactSection() {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 }); // Default to center

  // Simplified mouse effect with throttling
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = section.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          setMousePosition({ x, y });
          ticking = false;
        });
        ticking = true;
      }
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
      style={{
        background:
          theme === "dark"
            ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(15, 23, 42, 0.8), rgba(2, 6, 23, 0.9))`
            : `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(240, 253, 250, 0.9), rgba(224, 242, 254, 0.8))`,
      }}
    >
      {/* Simplified background with fewer elements */}
      <div className="absolute inset-0">
        {/* Reduced animated gradient orbs */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-teal-400/20 to-blue-500/20 dark:from-teal-600/20 dark:to-blue-700/20 blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-blue-400/20 to-cyan-500/20 dark:from-blue-600/20 dark:to-cyan-700/20 blur-3xl"
        />

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
              color: theme === "dark" ? "#475569" : "#cbd5e1",
            }}
          />
        </div>

        {/* Reduced floating shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.05, 0] }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 5,
              }}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 200 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background:
                  i % 2 === 0
                    ? "radial-gradient(circle, rgba(20, 184, 166, 0.1) 0%, rgba(20, 184, 166, 0) 70%)"
                    : "radial-gradient(circle, rgba(8, 145, 178, 0.1) 0%, rgba(8, 145, 178, 0) 70%)",
                filter: "blur(70px)",
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Heading with teal/blue theme */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14 md:mb-20"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            style={{
              backgroundImage:
                theme === "dark"
                  ? "linear-gradient(90deg, #2dd4bf, #06b6d4, #0ea5e9, #2dd4bf)"
                  : "linear-gradient(90deg, #0d9488, #0891b2, #0ea5e9, #0d9488)",
              backgroundSize: "300% 100%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Contact Me
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 mx-auto mb-6 rounded-full"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            Have a project in mind or want to discuss potential opportunities?
            I&apos;d love to hear from you!
          </motion.p>
        </motion.div>

        {/* Enhanced Contact Form Container with teal/blue theme */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-white to-teal-50 dark:from-slate-800 dark:to-slate-900 backdrop-blur-sm rounded-2xl shadow-xl border border-teal-100/50 dark:border-teal-700/30 overflow-hidden">
            <div className="p-8">
              <ContactForm />
            </div>
          </div>

          {/* Additional contact info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 text-center text-slate-600 dark:text-slate-400"
          >
            <p>
              Alternatively, you can reach me directly at{" "}
              <span className="font-medium text-teal-600 dark:text-teal-400">
                codeswithrakib@gmail.com
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Custom CSS animations for performance */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
