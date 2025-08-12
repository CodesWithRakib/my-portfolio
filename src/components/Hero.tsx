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
  Mail,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Define TypeScript interfaces
interface SocialLink {
  icon: React.ReactNode;
  label: string;
  color: string;
  hoverColor: string;
  url: string;
}

interface SkillBadge {
  icon: React.ReactNode;
  name: string;
  color: string;
  hoverColor: string;
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

  // Resume file path - centralized for consistency
  const resumePath = "/Md_Rakib_Islam_Resume.pdf";
  const resumeFileName = "Md_Rakib_Islam_Resume.pdf";

  // Set isClient to true when component mounts on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle resume download
  const handleResumeDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = resumePath;
    link.download = resumeFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [resumePath, resumeFileName]);

  // Memoize grid background style
  const gridBackgroundStyle = useMemo(() => {
    if (!isClient) {
      return {
        backgroundImage: `
          linear-gradient(to right, currentColor 1px, transparent 1px),
          linear-gradient(to bottom, currentColor 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        color: "#94a3b8",
        opacity: 0.2,
      };
    }
    return {
      backgroundImage: `
        linear-gradient(to right, currentColor 1px, transparent 1px),
        linear-gradient(to bottom, currentColor 1px, transparent 1px)
      `,
      backgroundSize: "40px 40px",
      color: resolvedTheme === "dark" ? "#94a3b8" : "#94a3b8",
      opacity: resolvedTheme === "dark" ? 0.3 : 0.2,
    };
  }, [resolvedTheme, isClient]);

  // Memoize radial gradient style - matching footer colors
  const radialGradientStyle = useMemo(() => {
    return {
      background:
        resolvedTheme === "dark"
          ? "radial-gradient(800px at 50% 50%, rgba(20, 184, 166, 0.15), transparent 70%)"
          : "radial-gradient(800px at 50% 50%, rgba(20, 184, 166, 0.25), transparent 70%)",
    };
  }, [resolvedTheme]);

  // Memoize social links with enhanced colors
  const socialLinks: SocialLink[] = useMemo(
    () => [
      {
        icon: <Github className="h-5 w-5" />,
        label: "GitHub",
        color: "text-gray-700 dark:text-gray-300",
        hoverColor: "text-gray-900 dark:text-white",
        url: "https://github.com/codeswithrakib",
      },
      {
        icon: <Linkedin className="h-5 w-5" />,
        label: "LinkedIn",
        color: "text-blue-600 dark:text-blue-400",
        hoverColor: "text-blue-700 dark:text-blue-300",
        url: "https://linkedin.com/in/codeswithrakib",
      },
      {
        icon: <Twitter className="h-5 w-5" />,
        label: "Twitter",
        color: "text-sky-500 dark:text-sky-400",
        hoverColor: "text-sky-600 dark:text-sky-300",
        url: "https://twitter.com/codeswithrakib",
      },
      {
        icon: <Mail className="h-5 w-5" />,
        label: "Email",
        color: "text-rose-500 dark:text-rose-400",
        hoverColor: "text-rose-600 dark:text-rose-300",
        url: "mailto:codeswithrakib@gmail.com",
      },
    ],
    []
  );

  // Memoize skill badges with enhanced colors
  const skillBadges: SkillBadge[] = useMemo(
    () => [
      {
        icon: <Code className="h-4 w-4" />,
        name: "Next.js",
        color: "bg-gradient-to-r from-teal-500 to-blue-500",
        hoverColor: "from-teal-600 to-blue-600",
      },
      {
        icon: <Palette className="h-4 w-4" />,
        name: "UI/UX",
        color: "bg-gradient-to-r from-purple-500 to-pink-500",
        hoverColor: "from-purple-600 to-pink-600",
      },
      {
        icon: <Zap className="h-4 w-4" />,
        name: "Performance",
        color: "bg-gradient-to-r from-amber-500 to-orange-500",
        hoverColor: "from-amber-600 to-orange-600",
      },
    ],
    []
  );

  return (
    <section
      ref={heroRef}
      className={cn(
        "relative w-full min-h-screen overflow-hidden",
        "py-16 sm:py-20 md:py-24"
      )}
    >
      {/* Enhanced background with colorful gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-teal-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-20 dark:opacity-30">
          <div className="w-full h-full" style={gridBackgroundStyle} />
        </div>

        {/* Animated gradient orbs with more colors */}
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
          className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full bg-teal-200/30 dark:bg-teal-800/20 blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full bg-blue-200/30 dark:bg-blue-800/20 blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 4,
          }}
          className="absolute top-1/3 right-1/3 w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 rounded-full bg-purple-200/30 dark:bg-purple-800/20 blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
          className="absolute bottom-1/3 left-1/3 w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56 rounded-full bg-amber-200/30 dark:bg-amber-800/20 blur-3xl"
        />
      </div>

      {/* Additional background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          style={{ y: y.get(), opacity: opacity.get() }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 z-0" style={radialGradientStyle} />
        </motion.div>

        {/* Animated blobs with matching colors */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 2 }}
          className="absolute rounded-full bg-teal-500/20 dark:bg-teal-500/20 blur-3xl"
          style={{
            width: "400px",
            height: "400px",
            left: "5%",
            top: "15%",
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute rounded-full bg-blue-500/20 dark:bg-blue-500/20 blur-3xl"
          style={{
            width: "500px",
            height: "500px",
            right: "5%",
            bottom: "15%",
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute rounded-full bg-purple-500/20 dark:bg-purple-500/20 blur-3xl"
          style={{
            width: "350px",
            height: "350px",
            left: "30%",
            bottom: "10%",
          }}
        />

        {/* Floating elements with more colors */}
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-teal-500/30 dark:bg-teal-500/30 blur-sm"
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
          className="absolute top-1/3 right-1/3 w-6 h-6 rounded-full bg-blue-500/30 dark:bg-blue-500/30 blur-sm"
        />
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 left-1/3 w-7 h-7 rounded-full bg-purple-500/30 dark:bg-purple-500/30 blur-sm"
        />
        <motion.div
          animate={{
            y: [0, 12, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute top-1/2 right-1/4 w-5 h-5 rounded-full bg-amber-500/30 dark:bg-amber-500/30 blur-sm"
        />
      </div>

      <div className="relative z-10 container mx-auto min-h-screen flex items-center px-4 sm:px-6 lg:px-8 w-full max-w-7xl">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Content Section - Enhanced for responsiveness */}
          <div className="order-2 lg:order-1 w-full flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-2xl lg:max-w-none"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-center lg:justify-start gap-2 text-base md:text-lg font-mono text-teal-600 dark:text-teal-400 mb-4"
              >
                <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-1 rounded-full">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span>Hello, I&apos;m</span>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-sans mb-4 leading-tight"
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
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-slate-700 dark:text-slate-300 mb-6 h-10 md:h-12 lg:h-14"
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
                className="text-base md:text-lg text-slate-700 dark:text-slate-300 mb-6 md:mb-8 max-w-2xl leading-relaxed"
              >
                I&apos;m a passionate full stack developer who transforms ideas
                into exceptional digital experiences. With expertise in{" "}
                <strong className="text-teal-600 dark:text-teal-400">
                  Next.js
                </strong>
                ,{" "}
                <strong className="text-blue-600 dark:text-blue-400">
                  TypeScript
                </strong>
                , and the{" "}
                <strong className="text-purple-600 dark:text-purple-400">
                  MERN
                </strong>{" "}
                stack, I build scalable, performant applications that delight
                users and solve real-world problems.
              </motion.p>

              {/* Enhanced skill badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3 mb-6 md:mb-8"
              >
                {skillBadges.map((skill, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-sm font-medium shadow-md",
                      skill.color
                    )}
                  >
                    {skill.icon}
                    <span>{skill.name}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Enhanced buttons - Improved for mobile */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center lg:justify-start w-full"
              >
                {/* Primary button with enhanced gradient border */}
                <div className="relative group w-full sm:w-auto">
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white dark:bg-slate-900 rounded-full w-full sm:w-auto">
                    <Button
                      asChild
                      className="rounded-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                      size="lg"
                    >
                      <Link href="/projects">
                        <span className="flex items-center justify-center">
                          View My Work
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Secondary button with enhanced gradient border - Updated for download */}
                <div className="relative group w-full sm:w-auto">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white dark:bg-slate-900 rounded-full w-full sm:w-auto">
                    <Button
                      onClick={handleResumeDownload}
                      className="rounded-full border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors duration-300 w-full sm:w-auto"
                      size="lg"
                    >
                      <span className="flex items-center justify-center">
                        Download CV
                        <Download className="ml-2 h-4 w-4" />
                      </span>
                    </Button>
                  </div>
                </div>

                {/* Tertiary button with enhanced gradient border */}
                <div className="relative group w-full sm:w-auto">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white dark:bg-slate-900 rounded-full w-full sm:w-auto">
                    <Button
                      asChild
                      variant="ghost"
                      className="rounded-full text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors duration-300 w-full sm:w-auto"
                      size="lg"
                    >
                      <Link href="/contact">
                        <span className="flex items-center justify-center">
                          Contact Me
                          <Mail className="ml-2 h-4 w-4" />
                        </span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Social links - Improved for mobile */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-3 md:gap-4 mt-8 md:mt-12 justify-center lg:justify-start"
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
                        "p-3 rounded-full transition-colors duration-300",
                        social.color,
                        "group-hover:" + social.hoverColor
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
            className="relative order-1 lg:order-2 flex justify-center lg:justify-end w-full"
          >
            <div className="relative mx-auto lg:ml-auto lg:mr-0 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80">
              {/* Enhanced animated gradient border */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 animate-pulse-slow opacity-75 blur-md"></div>

              {/* Profile image container with enhanced shadow */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl transform transition-transform duration-500 hover:scale-105">
                <Image
                  src="/images/profile.png"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Enhanced overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Enhanced floating badge with more vibrant colors */}
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
                <Code className="h-5 w-5 md:h-6 md:w-6" />
              </motion.div>

              {/* Enhanced decorative elements with more colors */}
              <div className="absolute -top-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 blur-xl opacity-70"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 blur-xl opacity-70"></div>
              <div className="absolute top-1/4 -right-4 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 blur-xl opacity-70"></div>
              <div className="absolute bottom-1/4 -left-4 w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 blur-xl opacity-70"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom animation styles */}
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
