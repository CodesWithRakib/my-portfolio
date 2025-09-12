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

  // Memoize radial gradient style - updated to green colors
  const radialGradientStyle = useMemo(() => {
    return {
      background:
        resolvedTheme === "dark"
          ? "radial-gradient(800px at 50% 50%, rgba(16, 185, 129, 0.15), transparent 70%)"
          : "radial-gradient(800px at 50% 50%, rgba(16, 185, 129, 0.25), transparent 70%)",
    };
  }, [resolvedTheme]);

  // Memoize social links with green theme colors
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
        color: "text-emerald-600 dark:text-emerald-400",
        hoverColor: "text-emerald-700 dark:text-emerald-300",
        url: "https://linkedin.com/in/codeswithrakib",
      },
      {
        icon: <Twitter className="h-5 w-5" />,
        label: "Twitter",
        color: "text-green-600 dark:text-green-400",
        hoverColor: "text-green-700 dark:text-green-300",
        url: "https://twitter.com/codeswithrakib",
      },
      {
        icon: <Mail className="h-5 w-5" />,
        label: "Email",
        color: "text-lime-600 dark:text-lime-400",
        hoverColor: "text-lime-700 dark:text-lime-300",
        url: "mailto:codeswithrakib@gmail.com",
      },
    ],
    []
  );

  // Memoize skill badges with green theme colors
  const skillBadges: SkillBadge[] = useMemo(
    () => [
      {
        icon: <Code className="h-4 w-4" />,
        name: "Next.js",
        color: "bg-gradient-to-r from-emerald-500 to-green-500",
        hoverColor: "from-emerald-600 to-green-600",
      },
      {
        icon: <Palette className="h-4 w-4" />,
        name: "UI/UX",
        color: "bg-gradient-to-r from-green-500 to-lime-500",
        hoverColor: "from-green-600 to-lime-600",
      },
      {
        icon: <Zap className="h-4 w-4" />,
        name: "Performance",
        color: "bg-gradient-to-r from-lime-500 to-yellow-500",
        hoverColor: "from-lime-600 to-yellow-600",
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
      {/* Simplified background with green gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-emerald-50 to-green-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-20 dark:opacity-30">
          <div className="w-full h-full" style={gridBackgroundStyle} />
        </div>

        {/* Simplified animated gradient orbs with green colors */}
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
          className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full bg-emerald-200/30 dark:bg-emerald-800/20 blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full bg-green-200/30 dark:bg-green-800/20 blur-3xl"
        />
      </div>

      {/* Simplified background elements */}
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

        {/* Simplified animated blobs with green colors */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 2 }}
          className="absolute rounded-full bg-emerald-500/20 dark:bg-emerald-500/20 blur-3xl"
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
          className="absolute rounded-full bg-green-500/20 dark:bg-green-500/20 blur-3xl"
          style={{
            width: "500px",
            height: "500px",
            right: "5%",
            bottom: "15%",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto min-h-screen flex items-center px-4 sm:px-6 lg:px-8 w-full max-w-7xl">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Content Section */}
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
                className="flex items-center justify-center lg:justify-start gap-2 text-base md:text-lg font-mono text-emerald-600 dark:text-emerald-400 mb-4"
              >
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-1 rounded-full">
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400">
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
                <strong className="text-emerald-600 dark:text-emerald-400">
                  Next.js
                </strong>
                ,{" "}
                <strong className="text-green-600 dark:text-green-400">
                  TypeScript
                </strong>
                , and the{" "}
                <strong className="text-lime-600 dark:text-lime-400">
                  MERN
                </strong>{" "}
                stack, I build scalable, performant applications that delight
                users and solve real-world problems.
              </motion.p>

              {/* Simplified skill badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3 mb-6 md:mb-8"
              >
                {skillBadges.map((skill, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-sm font-medium",
                      skill.color
                    )}
                  >
                    {skill.icon}
                    <span>{skill.name}</span>
                  </div>
                ))}
              </motion.div>

              {/* Simplified buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center lg:justify-start w-full"
              >
                {/* Primary button */}
                <Button
                  asChild
                  className="rounded-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white w-full sm:w-auto"
                  size="lg"
                >
                  <Link href="/projects">
                    <span className="flex items-center justify-center">
                      View My Work
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </Link>
                </Button>

                {/* Secondary button */}
                <Button
                  onClick={handleResumeDownload}
                  variant="outline"
                  className="rounded-full border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 w-full sm:w-auto"
                  size="lg"
                >
                  <span className="flex items-center justify-center">
                    Download CV
                    <Download className="ml-2 h-4 w-4" />
                  </span>
                </Button>

                {/* Tertiary button */}
                <Button
                  asChild
                  variant="ghost"
                  className="rounded-full text-lime-600 dark:text-lime-400 hover:bg-lime-50 dark:hover:bg-lime-900/20 w-full sm:w-auto"
                  size="lg"
                >
                  <Link href="/contact">
                    <span className="flex items-center justify-center">
                      Contact Me
                      <Mail className="ml-2 h-4 w-4" />
                    </span>
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Simplified social links */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-3 md:gap-4 mt-8 md:mt-12 justify-center lg:justify-start"
            >
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "p-3 rounded-full bg-white dark:bg-slate-800 shadow-sm transition-colors",
                    social.color,
                    "hover:" + social.hoverColor
                  )}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
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
              {/* Simplified animated gradient border */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 opacity-75 blur-md"></div>

              {/* Profile image container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl">
                <Image
                  src="/images/profile.png"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Simplified overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
              </div>

              {/* Simplified floating badge */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full p-3 shadow-lg"
              >
                <Code className="h-5 w-5 md:h-6 md:w-6" />
              </motion.div>

              {/* Simplified decorative elements */}
              <div className="absolute -top-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-emerald-400 to-green-400 blur-xl opacity-70"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-green-400 to-lime-400 blur-xl opacity-70"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
