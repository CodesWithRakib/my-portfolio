"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [phase, setPhase] = useState("initializing");

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const phaseTimeout = setTimeout(() => {
      setPhase("loading");
    }, 500);

    const completeTimeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(phaseTimeout);
      clearTimeout(completeTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-teal-50 dark:from-slate-950 dark:to-slate-900"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-500/10" />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, currentColor 1px, transparent 1px),
                  linear-gradient(to bottom, currentColor 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
                color: "currentColor",
              }}
            />
          </div>

          {/* Logo with animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-12 relative z-10"
          >
            <motion.h1
              className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              CodesWithRakib
            </motion.h1>
          </motion.div>

          {/* Countdown animation */}
          <div className="relative w-64 h-64 flex items-center justify-center mb-8">
            {/* Outer ring */}
            <motion.div
              className="absolute w-full h-full rounded-full border-4 border-slate-200 dark:border-slate-700"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />

            {/* Animated progress ring */}
            <motion.div
              className="absolute w-full h-full rounded-full border-4 border-transparent border-t-teal-500 border-r-blue-500"
              initial={{ rotate: -90, scale: 0.9, opacity: 0 }}
              animate={{
                rotate: 270,
                scale: 1,
                opacity: 1,
                transition: {
                  duration: 3,
                  ease: "linear",
                },
              }}
              style={{
                clipPath:
                  "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)",
              }}
            />

            {/* Countdown number */}
            <AnimatePresence mode="wait">
              <motion.div
                key={countdown}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-7xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent"
              >
                {countdown}
              </motion.div>
            </AnimatePresence>

            {/* Simplified pulsing dots */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-teal-500"
                  style={{
                    top: "50%",
                    left: "50%",
                    transformOrigin: "0 0",
                  }}
                  animate={{
                    x: [0, 100 * Math.cos((i * Math.PI) / 3)],
                    y: [0, 100 * Math.sin((i * Math.PI) / 3)],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Status text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <motion.p
              className="text-lg text-slate-600 dark:text-slate-400 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {phase === "initializing"
                ? "Initializing..."
                : countdown === 3
                  ? "Preparing assets..."
                  : countdown === 2
                    ? "Loading components..."
                    : countdown === 1
                      ? "Almost there..."
                      : "Complete!"}
            </motion.p>

            {/* Animated loader dots */}
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-teal-500"
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Bottom decorative element */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              className="w-8 h-1 rounded-full bg-gradient-to-r from-teal-500 to-blue-500"
              animate={{ width: [0, 64, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
