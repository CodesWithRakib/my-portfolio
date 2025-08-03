"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Twitter,
  Sparkles,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState, useMemo } from "react";
import { cn } from "@/lib/utils";

// Define TypeScript interfaces
interface SocialLink {
  icon: React.ReactNode;
  label: string;
  color: string;
}

export default function Hero() {
  const { resolvedTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Set isClient to true when component mounts on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Memoize grid background style
  const gridBackgroundStyle = useMemo(() => {
    if (!isClient) {
      return {
        backgroundImage: `
          linear-gradient(to right, currentColor 1px, transparent 1px),
          linear-gradient(to bottom, currentColor 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
        color: "#d1d5db",
        opacity: 0.03,
      };
    }
    return {
      backgroundImage: `
        linear-gradient(to right, currentColor 1px, transparent 1px),
        linear-gradient(to bottom, currentColor 1px, transparent 1px)
      `,
      backgroundSize: "50px 50px",
      color: resolvedTheme === "dark" ? "#4b5563" : "#d1d5db",
      opacity: resolvedTheme === "dark" ? 0.05 : 0.03,
    };
  }, [resolvedTheme, isClient]);

  // Memoize radial gradient style - simplified to not follow mouse
  const radialGradientStyle = useMemo(() => {
    return {
      background:
        resolvedTheme === "dark"
          ? "radial-gradient(700px at 50% 50%, rgba(59, 130, 246, 0.08), transparent 70%)"
          : "radial-gradient(700px at 50% 50%, rgba(59, 130, 246, 0.15), transparent 70%)",
    };
  }, [resolvedTheme]);

  // Memoize social links
  const socialLinks: SocialLink[] = useMemo(
    () => [
      {
        icon: <Github className="h-5 w-5" />,
        label: "GitHub",
        color: "hover:text-blue-600 dark:hover:text-blue-400",
      },
      {
        icon: <Linkedin className="h-5 w-5" />,
        label: "LinkedIn",
        color: "hover:text-blue-600 dark:hover:text-blue-400",
      },
      {
        icon: <Twitter className="h-5 w-5" />,
        label: "Twitter",
        color: "hover:text-blue-600 dark:hover:text-blue-400",
      },
    ],
    []
  );

  return (
    <section
      ref={heroRef}
      className={cn(
        "relative w-full min-h-screen overflow-hidden",
        "bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 pt-20"
      )}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Simplified background elements */}
        <motion.div
          style={{ y: y.get(), opacity: opacity.get() }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div style={gridBackgroundStyle} className="w-full h-full" />
        </motion.div>

        {/* Simplified radial gradient - no mouse following */}
        <div className="absolute inset-0 z-0" style={radialGradientStyle} />

        {/* Reduced animated blobs - only 2 instead of 5 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute rounded-full bg-blue-500/10 dark:bg-blue-500/10 blur-3xl"
          style={{
            width: "300px",
            height: "300px",
            left: "10%",
            top: "20%",
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute rounded-full bg-indigo-500/10 dark:bg-indigo-500/10 blur-3xl"
          style={{
            width: "400px",
            height: "400px",
            right: "10%",
            bottom: "20%",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto min-h-screen flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content Section */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 text-lg font-mono text-blue-600 dark:text-blue-400 mb-4"
              >
                <Sparkles className="w-4 h-4" />
                <span>Hello, I&apos;m</span>
              </motion.div>

              <motion.h1
                className="text-5xl sm:text-6xl md:text-7xl font-bold font-sans mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="block text-slate-900 dark:text-white">
                  Rakib
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-400 dark:to-indigo-500">
                  Islam.
                </span>
              </motion.h1>

              <motion.div
                className="text-2xl sm:text-3xl md:text-4xl font-medium text-slate-700 dark:text-slate-300 mb-6 h-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <TypeAnimation
                  sequence={[
                    "I build digital experiences.",
                    1500,
                    "Full Stack Developer.",
                    1500,
                    "React & Next.js Specialist.",
                    1500,
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                  className="font-sans"
                  speed={50}
                  deletionSpeed={30}
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl leading-relaxed"
              >
                I&apos;m a full stack developer with a passion for crafting
                modern, scalable web applications using technologies like{" "}
                <strong>Next.js</strong>, <strong>TypeScript</strong>, and the{" "}
                <strong>MERN</strong> stack. I love building user-focused
                products that solve real-world problems.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Button
                  className="group bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  <span className="flex items-center">
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="group border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors duration-300"
                  size="lg"
                >
                  <span className="flex items-center">
                    Download CV
                    <Download className="ml-2 h-4 w-4" />
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4 mt-12"
            >
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "p-3 rounded-full bg-white dark:bg-slate-800/50 backdrop-blur-sm",
                    "hover:bg-blue-50 dark:hover:bg-blue-900/30 shadow-sm transition-all duration-300",
                    "text-slate-600 dark:text-slate-400",
                    social.color
                  )}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Profile Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative mx-auto lg:ml-auto lg:mr-0 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl">
              <Image
                src="/images/profile.jpg"
                alt="Profile"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
