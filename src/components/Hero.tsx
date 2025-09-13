"use client";
import { motion } from "framer-motion";
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
}

export default function Hero() {
  const { resolvedTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Resume file path - centralized for consistency
  const resumePath = "/Md_Rakib_Islam_Full_Stack_Resume.pdf";
  const resumeFileName = "Md_Rakib_Islam_Full_Stack_Resume.pdf";

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

  // Memoize background style
  const backgroundStyle = useMemo(() => {
    if (!isClient) {
      return {
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4f1f5 100%)",
      };
    }
    return {
      background: resolvedTheme === "dark" 
        ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" 
        : "linear-gradient(135deg, #f5f7fa 0%, #e4f1f5 100%)",
    };
  }, [resolvedTheme, isClient]);

  // Memoize social links
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

  // Memoize skill badges
  const skillBadges: SkillBadge[] = useMemo(
    () => [
      {
        icon: <Code className="h-4 w-4" />,
        name: "Next.js",
        color: "bg-emerald-500",
      },
      {
        icon: <Palette className="h-4 w-4" />,
        name: "UI/UX",
        color: "bg-green-500",
      },
      {
        icon: <Zap className="h-4 w-4" />,
        name: "Performance",
        color: "bg-lime-500",
      },
    ],
    []
  );

  // Animation variants
  const fadeInUp = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6 }
  };
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8 }
  };

  return (
    <section
      ref={heroRef}
      className={cn(
        "relative w-full min-h-screen overflow-hidden",
        "py-16 "
      )}
      style={backgroundStyle}
    >
      {/* Simplified background with subtle pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5NGEzYjgiIGZpbGwtb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6Ii8+PHBhdGggZD0iTTQwIDBIMHY0MCIgc3Ryb2tlPSIjOTRhM2I4IiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
      </div>
      
      {/* Single subtle animated gradient orb */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-emerald-200/20 dark:bg-emerald-800/20 blur-3xl"
      />
      
      <div className="relative z-10 container mx-auto min-h-screen flex items-center px-4 sm:px-6 lg:px-8 w-full max-w-7xl">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Content Section */}
          <div className="order-2 lg:order-1 w-full flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="w-full max-w-2xl lg:max-w-none"
            >
              <motion.div
                variants={fadeIn}
                initial="initial"
                animate="animate"
                className="flex items-center justify-center lg:justify-start gap-2 text-base md:text-lg font-mono text-emerald-600 dark:text-emerald-400 mb-4"
              >
                <div className="bg-emerald-500 p-1 rounded-full">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span>Hello, I&apos;m</span>
              </motion.div>
              
              <motion.h1
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-sans mb-4 leading-tight"
              >
                <span className="block text-slate-900 dark:text-white">
                  Rakib
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400">
                  Islam.
                </span>
              </motion.h1>
              
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-slate-700 dark:text-slate-300 mb-6 h-10 md:h-12 lg:h-14"
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
                variants={fadeInUp}
                initial="initial"
                animate="animate"
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
                variants={fadeInUp}
                initial="initial"
                animate="animate"
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
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center lg:justify-start w-full"
              >
                <Button
                  asChild
                  className="rounded-full bg-emerald-500 hover:bg-emerald-600 text-white w-full sm:w-auto"
                  size="lg"
                >
                  <Link href="/projects">
                    <span className="flex items-center justify-center">
                      View My Work
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </Link>
                </Button>
                
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
              </motion.div>
            </motion.div>
            
            {/* Social links */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
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
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="relative order-1 lg:order-2 flex justify-center lg:justify-end w-full"
          >
            <div className="relative mx-auto lg:ml-auto lg:mr-0 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80">
              {/* Simple gradient border */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 opacity-75 blur-md"></div>
              
              {/* Profile image container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl">
                <Image
                  src="/images/profile.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Simple floating badge */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-3 shadow-lg"
              >
                <Code className="h-5 w-5 md:h-6 md:w-6" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}