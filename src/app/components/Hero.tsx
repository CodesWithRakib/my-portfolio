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
  Code,
  Palette,
  Zap,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState, useMemo } from "react";
import { cn } from "@/lib/utils";

// Define TypeScript interfaces
interface SocialLink {
  icon: React.ReactNode;
  label: string;
  color: string;
  url: string;
}

interface SkillBadge {
  icon: React.ReactNode;
  name: string;
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

  // Memoize radial gradient style - matching navbar colors
  const radialGradientStyle = useMemo(() => {
    return {
      background:
        resolvedTheme === "dark"
          ? "radial-gradient(800px at 50% 50%, rgba(20, 184, 166, 0.15), transparent 70%)"
          : "radial-gradient(800px at 50% 50%, rgba(20, 184, 166, 0.25), transparent 70%)",
    };
  }, [resolvedTheme]);

  // Memoize social links with actual URLs
  const socialLinks: SocialLink[] = useMemo(
    () => [
      {
        icon: <Github className="h-5 w-5" />,
        label: "GitHub",
        color: "hover:text-gray-900 dark:hover:text-white",
        url: "https://github.com/codeswithrakib",
      },
      {
        icon: <Linkedin className="h-5 w-5" />,
        label: "LinkedIn",
        color: "hover:text-blue-700 dark:hover:text-blue-300",
        url: "https://linkedin.com/in/codeswithrakib",
      },
      {
        icon: <Twitter className="h-5 w-5" />,
        label: "Twitter",
        color: "hover:text-blue-500 dark:hover:text-blue-400",
        url: "https://twitter.com/codeswithrakib",
      },
    ],
    []
  );

  // Memoize skill badges with matching colors
  const skillBadges: SkillBadge[] = useMemo(
    () => [
      {
        icon: <Code className="h-4 w-4" />,
        name: "Next.js",
        color: "bg-gradient-to-r from-teal-500 to-blue-500",
      },
      {
        icon: <Palette className="h-4 w-4" />,
        name: "UI/UX",
        color: "bg-gradient-to-r from-teal-400 to-cyan-400",
      },
      {
        icon: <Zap className="h-4 w-4" />,
        name: "Performance",
        color: "bg-gradient-to-r from-blue-400 to-indigo-400",
      },
    ],
    []
  );

  return (
    <section
      ref={heroRef}
      className={cn(
        "relative w-full min-h-screen overflow-hidden",
        "bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 py-20"
      )}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Background elements */}
        <motion.div
          style={{ y: y.get(), opacity: opacity.get() }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div style={gridBackgroundStyle} className="w-full h-full" />
        </motion.div>

        {/* Radial gradient matching navbar colors */}
        <div className="absolute inset-0 z-0" style={radialGradientStyle} />

        {/* Animated blobs with matching colors */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute rounded-full bg-teal-500/10 dark:bg-teal-500/10 blur-3xl"
          style={{
            width: "400px",
            height: "400px",
            left: "5%",
            top: "15%",
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute rounded-full bg-blue-500/10 dark:bg-blue-500/10 blur-3xl"
          style={{
            width: "500px",
            height: "500px",
            right: "5%",
            bottom: "15%",
          }}
        />

        {/* Floating elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-teal-500/20 dark:bg-teal-500/20 blur-sm"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-1/3 right-1/3 w-6 h-6 rounded-full bg-blue-500/20 dark:bg-blue-500/20 blur-sm"
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
                className="flex items-center gap-2 text-lg font-mono text-teal-600 dark:text-teal-400 mb-4"
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400">
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
                    "I craft digital experiences.",
                    1500,
                    "Full Stack Developer.",
                    1500,
                    "React & Next.js Specialist.",
                    1500,
                    "UI/UX Enthusiast.",
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
                I&apos;m a passionate full stack developer who transforms ideas
                into exceptional digital experiences. With expertise in{" "}
                <strong>Next.js</strong>,<strong> TypeScript</strong>, and the{" "}
                <strong>MERN</strong> stack, I build scalable, performant
                applications that delight users and solve real-world problems.
              </motion.p>

              {/* Skill badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                {skillBadges.map((skill, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-sm font-medium shadow-sm",
                      skill.color
                    )}
                  >
                    {skill.icon}
                    <span>{skill.name}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                {/* Primary button with animated gradient border */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white dark:bg-slate-900 rounded-full">
                    <Button
                      className="rounded-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      size="lg"
                    >
                      <span className="flex items-center">
                        View My Work
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </div>
                </div>

                {/* Secondary button with gradient border */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white dark:bg-slate-900 rounded-full">
                    <Button
                      variant="outline"
                      className="rounded-full border-teal-200 dark:border-teal-800 hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-colors duration-300"
                      size="lg"
                    >
                      <span className="flex items-center">
                        Download CV
                        <Download className="ml-2 h-4 w-4" />
                      </span>
                    </Button>
                  </div>
                </div>

                {/* Tertiary button with gradient border */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white dark:bg-slate-900 rounded-full">
                    <Button
                      variant="ghost"
                      className="rounded-full text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors duration-300"
                      size="lg"
                    >
                      <span className="flex items-center">
                        Contact Me
                        <Sparkles className="ml-2 h-4 w-4" />
                      </span>
                    </Button>
                  </div>
                </div>
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
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn("relative group")}
                  aria-label={social.label}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white dark:bg-slate-900 rounded-full">
                    <div
                      className={cn(
                        "p-3 rounded-full text-slate-600 dark:text-slate-400",
                        social.color
                      )}
                    >
                      {social.icon}
                    </div>
                  </div>
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
            <div className="relative mx-auto lg:ml-auto lg:mr-0 w-64 h-64 md:w-80 md:h-80">
              {/* Animated gradient border matching navbar */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 animate-pulse-slow opacity-75 blur-md"></div>

              {/* Profile image container with unique shadow */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl transform transition-transform duration-500 hover:scale-105">
                <Image
                  src="/images/profile.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Floating badge with matching colors */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-2 -right-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full p-3 shadow-lg"
              >
                <Code className="h-6 w-6" />
              </motion.div>

              {/* Decorative elements with matching colors */}
              <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-teal-500/20 dark:bg-teal-500/20 blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-blue-500/20 dark:bg-blue-500/20 blur-xl"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom animation styles matching navbar */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.75;
          }
          50% {
            opacity: 0.4;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}
