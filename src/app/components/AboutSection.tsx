"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Code,
  Gamepad2,
  Headphones,
  Lightbulb,
  School,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

// TypeScript interfaces
interface PersonalInterest {
  icon: React.ReactNode;
  title: string;
  content: string;
  color: string;
}
interface EducationTimeline {
  year: string;
  title: string;
  content: string;
  color: string;
  icon: React.ReactNode;
}

export default function AboutSection() {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const lastUpdateRef = useRef(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const [activeTimelineItem, setActiveTimelineItem] = useState<number | null>(
    null
  );

  // Initialize with safe default values
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true when component mounts on client
  useEffect(() => {
    setIsClient(true);
    // Initialize mouse position with center of screen
    setMousePosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
  }, []);

  // Throttled mouse position handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = performance.now();
    if (now - lastUpdateRef.current > 16) {
      // Throttle to ~60fps
      setMousePosition({ x: e.clientX, y: e.clientY });
      lastUpdateRef.current = now;
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [handleMouseMove, isClient]);

  // Memoize personal interests
  const personalInterests: PersonalInterest[] = useMemo(
    () => [
      {
        icon: <Gamepad2 className="text-blue-600 dark:text-blue-400" />,
        title: "Passionate Gamer",
        content:
          "Love playing strategy games like Clash of Clans & Free Fire - they sharpen my problem-solving skills!",
        color:
          "from-blue-100/50 to-blue-200/50 dark:from-blue-900/30 dark:to-blue-800/30",
      },
      {
        icon: <Headphones className="text-indigo-600 dark:text-indigo-400" />,
        title: "Music Enthusiast",
        content:
          "Always listening to music while coding - it helps me focus and get into the flow state.",
        color:
          "from-indigo-100/50 to-indigo-200/50 dark:from-indigo-900/30 dark:to-indigo-800/30",
      },
      {
        icon: <Code className="text-purple-600 dark:text-purple-400" />,
        title: "Creator at Heart",
        content:
          "Enjoy turning ideas into real applications - the process from concept to deployment excites me.",
        color:
          "from-purple-100/50 to-purple-200/50 dark:from-purple-900/30 dark:to-purple-800/30",
      },
    ],
    []
  );

  // Memoize education timeline
  const educationTimeline: EducationTimeline[] = useMemo(
    () => [
      {
        year: "2021–2024",
        title: "HSC - Science | Hossenpur Degree College",
        content: "Built foundation in logical thinking & analytical approaches",
        color: "bg-blue-600 dark:bg-blue-700",
        icon: <School className="text-white" />,
      },
      {
        year: "Self-Taught",
        title: "Early Exploration",
        content:
          "Learned fundamentals from YouTube (Jonas, Apna College, Harry)",
        color: "bg-indigo-600 dark:bg-indigo-700",
        icon: <BookOpen className="text-white" />,
      },
      {
        year: "2024–Present",
        title: "Programming Hero Course",
        content: "Intensive full-stack MERN training with real-world projects",
        color: "bg-purple-600 dark:bg-purple-700",
        icon: <Code className="text-white" />,
      },
    ],
    []
  );

  // Memoize 3D transform calculation - now with window check
  const calculate3DTransform = useCallback(
    (index: number) => {
      if (!isClient) {
        return { rotateX: 0, rotateY: 0 };
      }
      const speed = 0.005 + index * 0.002;
      const rotateX = (mousePosition.y - window.innerHeight / 2) * speed;
      const rotateY = (mousePosition.x - window.innerWidth / 2) * speed;
      return { rotateX, rotateY };
    },
    [mousePosition, isClient]
  );

  // Memoize background grid style - Fixed transform property
  const gridBackgroundStyle = useMemo(
    () => ({
      backgroundImage: `
      linear-gradient(to right, currentColor 1px, transparent 1px),
      linear-gradient(to bottom, currentColor 1px, transparent 1px)
    `,
      backgroundSize: "40px 40px",
      color: theme === "dark" ? "#4b5563" : "#d1d5db",
      transformPerspective: "1000px",
      transform: isClient
        ? `rotateX(${calculate3DTransform(0).rotateX}deg) rotateY(${calculate3DTransform(0).rotateY}deg)`
        : "rotateX(0deg) rotateY(0deg)",
    }),
    [theme, calculate3DTransform, isClient]
  );

  // Memoize radial gradient style
  const radialGradientStyle = useMemo(() => {
    if (!isClient) {
      return {
        background: `radial-gradient(600px at 50% 50%, ${
          theme === "dark"
            ? "rgba(59, 130, 246, 0.15)"
            : "rgba(59, 130, 246, 0.2)"
        }, transparent 70%)`,
      };
    }
    return {
      background: `radial-gradient(600px at ${mousePosition.x}px ${
        mousePosition.y
      }px, ${
        theme === "dark"
          ? "rgba(59, 130, 246, 0.15)"
          : "rgba(59, 130, 246, 0.2)"
      }, transparent 70%)`,
    };
  }, [mousePosition, theme, isClient]);

  // Memoize color classes for orbs
  const orbColorClasses = useMemo(
    () => [
      "bg-blue-300/20 dark:bg-blue-700/20",
      "bg-indigo-300/20 dark:bg-indigo-700/20",
      "bg-purple-300/20 dark:bg-purple-700/20",
      "bg-cyan-300/20 dark:bg-cyan-700/20",
    ],
    []
  );

  // Memoize color classes for shapes
  const shapeColorClasses = useMemo(
    () => [
      "bg-blue-200/15 dark:bg-blue-800/15",
      "bg-indigo-200/15 dark:bg-indigo-800/15",
      "bg-purple-200/15 dark:bg-purple-800/15",
    ],
    []
  );

  // Memoize color classes for particles
  const particleColorClasses = useMemo(
    () => [
      "bg-blue-200/10 dark:bg-blue-800/10",
      "bg-indigo-200/10 dark:bg-indigo-800/10",
      "bg-purple-200/10 dark:bg-purple-800/10",
    ],
    []
  );

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-20 md:py-28 lg:py-36 overflow-hidden"
    >
      {/* Enhanced 3D animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20">
        {/* Animated 3D grid pattern */}
        <motion.div
          style={{ y: yBg }}
          className="absolute inset-0 opacity-20 dark:opacity-30"
        >
          <div style={gridBackgroundStyle} className="w-full h-full" />
        </motion.div>
        {/* Large 3D floating orbs - reduced count for performance */}
        {[...Array(3)].map((_, i) => {
          const { rotateX, rotateY } = calculate3DTransform(i + 1);
          const size = 300 + i * 100;
          const position = {
            x: 20 + i * 20,
            y: 10 + i * 15,
          };
          return (
            <motion.div
              key={i}
              className={cn(
                "absolute rounded-full blur-3xl",
                orbColorClasses[i]
              )}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${position.x}%`,
                top: `${position.y}%`,
                transformStyle: "preserve-3d",
                transform: `translate3d(0, 0, ${
                  i * 50
                }px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              }}
              animate={{
                x: [0, Math.random() * 30 - 15, 0],
                y: [0, Math.random() * 30 - 15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          );
        })}
        {/* Medium 3D floating shapes - reduced count for performance */}
        {[...Array(4)].map((_, i) => {
          const { rotateX, rotateY } = calculate3DTransform(i + 5);
          const size = 150 + i * 30;
          const position = {
            x: 10 + i * 15,
            y: 20 + i * 10,
          };
          const shape =
            i % 3 === 0
              ? "rounded-full"
              : i % 3 === 1
                ? "rounded-lg"
                : "rounded-xl";
          return (
            <motion.div
              key={`medium-${i}`}
              className={cn(
                "absolute blur-2xl",
                shape,
                shapeColorClasses[i % 3]
              )}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${position.x}%`,
                top: `${position.y}%`,
                transformStyle: "preserve-3d",
                transform: `translate3d(0, 0, ${i * 30}px) rotateX(${
                  rotateX * 0.8
                }deg) rotateY(${rotateY * 0.8}deg)`,
              }}
              animate={{
                x: [0, Math.random() * 40 - 20, 0],
                y: [0, Math.random() * 40 - 20, 0],
                rotate: [0, Math.random() * 360, 0],
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          );
        })}
        {/* Small 3D floating particles - reduced count for performance */}
        {[...Array(10)].map((_, i) => {
          const { rotateX, rotateY } = calculate3DTransform(i + 10);
          const size = 20 + Math.random() * 30;
          const position = {
            x: Math.random() * 100,
            y: Math.random() * 100,
          };
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${position.x}%`,
                top: `${position.y}%`,
                transformStyle: "preserve-3d",
                transform: `translate3d(0, 0, ${
                  Math.random() * 100
                }px) rotateX(${rotateX * 0.5}deg) rotateY(${rotateY * 0.5}deg)`,
                background: particleColorClasses[i % 3],
              }}
              animate={{
                x: [0, Math.random() * 50 - 25, 0],
                y: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 0.1, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          );
        })}
        {/* Interactive spotlight effect following mouse */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={radialGradientStyle}
        />
      </div>
      {/* Floating 3D code elements - reduced count for performance */}
      {[...Array(5)].map((_, i) => {
        const { rotateX, rotateY } = calculate3DTransform(i + 15);
        const position = {
          x: 5 + Math.random() * 90,
          y: 5 + Math.random() * 90,
        };
        const depth = 50 + Math.random() * 100;
        const rotation = Math.random() * 360;
        return (
          <motion.div
            key={`code-${i}`}
            className="absolute text-4xl md:text-6xl font-mono font-bold text-blue-200/10 dark:text-blue-800/10 pointer-events-none"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transformStyle: "preserve-3d",
              transform: `translate3d(0, 0, ${depth}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotation}deg)`,
            }}
            animate={{
              rotateX: [rotateX, rotateX + 30, rotateX],
              rotateY: [rotateY, rotateY + 30, rotateY],
              rotateZ: [rotation, rotation + 90, rotation],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            {i % 4 === 0 ? "{" : i % 4 === 1 ? "}" : i % 4 === 2 ? "<>" : "();"}
          </motion.div>
        );
      })}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4"
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
                "linear-gradient(90deg, #1e40af, #3b82f6, #6366f1, #8b5cf6, #1e40af)",
              backgroundSize: "300% 100%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            About Me
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-400 dark:to-indigo-500 mx-auto mb-6 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            style={{ originX: 0.5 }}
          />
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-medium">
            Developer &{" "}
            <span className="text-blue-600 dark:text-blue-400 font-semibold">
              Creative Problem Solver
            </span>{" "}
            passionate about building impactful digital experiences
          </p>
        </motion.div>
        {/* Content grid */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left column - Introduction */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-8"
          >
            <motion.div
              whileHover={{
                y: -5,
                boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.2)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-md p-8 border border-blue-100/50 dark:border-blue-900/30"
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <div className="p-2 rounded-lg bg-blue-100/50 dark:bg-blue-900/30 mr-3">
                  <Code
                    className="text-blue-600 dark:text-blue-400"
                    size={24}
                  />
                </div>
                <span>My Journey</span>
              </h3>
              <div className="space-y-6 text-slate-600 dark:text-slate-300">
                <p>
                  My coding journey started in 2021 when I first discovered the{" "}
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    &quot;100 Days of Python&quot;
                  </span>{" "}
                  course on Udemy. Although I couldn&apos;t complete it at the
                  time, it planted a seed of curiosity that would eventually
                  blossom into a passion.
                </p>
                <p>
                  Everything changed when I enrolled in the{" "}
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    Programming Hero
                  </span>{" "}
                  course, where I discovered my love for building complete web
                  applications.
                </p>
                <p>
                  I thrive on creating elegant solutions to complex problems,
                  combining technical skills with creative thinking to deliver
                  exceptional user experiences.
                </p>
              </div>
            </motion.div>
            {/* Current focus */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl shadow-md p-6 border border-blue-100/50 dark:border-blue-900/30"
            >
              <div className="flex items-start">
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 2,
                  }}
                  className="p-2 rounded-lg bg-blue-100/50 dark:bg-blue-900/30 mr-4"
                >
                  <Lightbulb
                    className="text-blue-600 dark:text-blue-400"
                    size={24}
                  />
                </motion.div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                    Current Focus
                  </h4>
                  <div className="h-10">
                    <TypeAnimation
                      sequence={[
                        "Building full-stack applications with MERN stack",
                        2000,
                        "Mastering modern React patterns",
                        2000,
                        "Exploring TypeScript and Next.js",
                        2000,
                        "Improving UI/UX design skills",
                        2000,
                      ]}
                      wrapper="span"
                      speed={50}
                      repeat={Infinity}
                      className="text-blue-600 dark:text-blue-400 font-medium"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          {/* Right column - Personal & Education */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-8"
          >
            {/* Personal interests */}
            <motion.div
              whileHover={{
                y: -5,
                boxShadow: "0 10px 30px -10px rgba(99, 102, 241, 0.2)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-md p-8 border border-indigo-100/50 dark:border-indigo-900/30"
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Beyond Coding
              </h3>
              <div className="space-y-6">
                {personalInterests.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer group"
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      className={cn(
                        "p-3 rounded-lg bg-gradient-to-br flex-shrink-0",
                        item.color
                      )}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white flex items-center">
                        {item.title}
                        <ChevronRight
                          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 dark:text-blue-400"
                          size={16}
                        />
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300">
                        {item.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            {/* Education timeline */}
            <motion.div
              whileHover={{
                y: -5,
                boxShadow: "0 10px 30px -10px rgba(139, 92, 246, 0.2)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-md p-8 border border-purple-100/50 dark:border-purple-900/30"
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <div className="p-2 rounded-lg bg-purple-100/50 dark:bg-purple-900/30 mr-3">
                  <School
                    className="text-purple-600 dark:text-purple-400"
                    size={24}
                  />
                </div>
                <span>Education & Journey</span>
              </h3>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-500 dark:from-blue-600 dark:to-purple-700"></div>
                <div className="space-y-8">
                  {educationTimeline.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="relative"
                      onMouseEnter={() => setActiveTimelineItem(index)}
                      onMouseLeave={() => setActiveTimelineItem(null)}
                    >
                      {/* Timeline dot */}
                      <motion.div
                        className={cn(
                          "absolute left-2 w-5 h-5 rounded-full z-10 border-4 border-white dark:border-slate-800 flex items-center justify-center",
                          item.color
                        )}
                        whileHover={{ scale: 1.2 }}
                        animate={
                          activeTimelineItem === index
                            ? { scale: 1.2 }
                            : { scale: 1 }
                        }
                      >
                        <motion.div
                          className="w-1 h-1 rounded-full bg-white"
                          animate={
                            activeTimelineItem === index
                              ? { scale: [1, 1.5, 1] }
                              : {}
                          }
                          transition={{
                            duration: 0.5,
                            repeat: activeTimelineItem === index ? Infinity : 0,
                          }}
                        />
                      </motion.div>
                      {/* Timeline content */}
                      <motion.div
                        className={cn(
                          "ml-12 p-5 rounded-xl border transition-all duration-300",
                          activeTimelineItem === index
                            ? "bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/30 dark:to-indigo-900/30 border-blue-200/50 dark:border-blue-700/50 shadow-md"
                            : "bg-blue-50/30 dark:bg-blue-900/20 border-blue-100/50 dark:border-blue-800/30"
                        )}
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              "p-2 rounded-lg flex-shrink-0",
                              item.color
                            )}
                          >
                            {item.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-slate-900 dark:text-white">
                                {item.title}
                              </h4>
                              <span className="text-xs px-2 py-1 rounded-full bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400">
                                {item.year}
                              </span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300">
                              {item.content}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        {/* Tech goals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/30 dark:to-indigo-900/30 p-8 rounded-2xl border border-blue-100/50 dark:border-blue-900/30 backdrop-blur-sm"
          whileHover={{ y: -5 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="p-4 rounded-full bg-gradient-to-br from-blue-100/50 to-indigo-100/50 dark:from-blue-900/30 dark:to-indigo-900/30"
            >
              <BookOpen className="text-blue-600 dark:text-blue-400 w-12 h-12" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                My Goals as a Full-Stack Developer
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                I&apos;m focused on mastering the complete development lifecycle
                - from designing intuitive UIs to building scalable backends. My
                aim is to create performant, accessible applications that solve
                real problems while following best practices in code quality and
                architecture.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
