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
import { useRef, useState, useMemo } from "react";
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const [activeTimelineItem, setActiveTimelineItem] = useState<number | null>(
    null
  );

  // Memoize personal interests with green colors
  const personalInterests: PersonalInterest[] = useMemo(
    () => [
      {
        icon: <Gamepad2 className="text-emerald-600 dark:text-emerald-400" />,
        title: "Passionate Gamer",
        content:
          "Love playing strategy games like Clash of Clans & Free Fire - they sharpen my problem-solving skills!",
        color:
          "from-emerald-100/50 to-green-100/50 dark:from-emerald-900/30 dark:to-green-800/30",
      },
      {
        icon: <Headphones className="text-green-600 dark:text-green-400" />,
        title: "Music Enthusiast",
        content:
          "Always listening to music while coding - it helps me focus and get into the flow state.",
        color:
          "from-green-100/50 to-lime-100/50 dark:from-green-900/30 dark:to-lime-800/30",
      },
      {
        icon: <Code className="text-lime-600 dark:text-lime-400" />,
        title: "Creator at Heart",
        content:
          "Enjoy turning ideas into real applications - the process from concept to deployment excites me.",
        color:
          "from-lime-100/50 to-yellow-100/50 dark:from-lime-900/30 dark:to-yellow-800/30",
      },
    ],
    []
  );

  // Memoize education timeline with green colors
  const educationTimeline: EducationTimeline[] = useMemo(
    () => [
      {
        year: "2021–2024",
        title: "HSC - Science | Hossenpur Degree College",
        content: "Built foundation in logical thinking & analytical approaches",
        color: "bg-emerald-600 dark:bg-emerald-700",
        icon: <School className="text-white" />,
      },
      {
        year: "Self-Taught",
        title: "Early Exploration",
        content:
          "Learned fundamentals from YouTube (Jonas, Apna College, Harry)",
        color: "bg-green-600 dark:bg-green-700",
        icon: <BookOpen className="text-white" />,
      },
      {
        year: "2024–Present",
        title: "Programming Hero Course",
        content: "Intensive full-stack MERN training with real-world projects",
        color: "bg-lime-600 dark:bg-lime-700",
        icon: <Code className="text-white" />,
      },
    ],
    []
  );

  // Memoize background grid style
  const gridBackgroundStyle = useMemo(
    () => ({
      backgroundImage: `
        linear-gradient(to right, currentColor 1px, transparent 1px),
        linear-gradient(to bottom, currentColor 1px, transparent 1px)
      `,
      backgroundSize: "40px 40px",
      color: theme === "dark" ? "#4b5563" : "#d1d5db",
    }),
    [theme]
  );

  // Memoize static radial gradient style with green colors
  const radialGradientStyle = useMemo(() => {
    return {
      background: `radial-gradient(600px at 50% 50%, ${
        theme === "dark"
          ? "rgba(16, 185, 129, 0.15)"
          : "rgba(16, 185, 129, 0.2)"
      }, transparent 70%)`,
    };
  }, [theme]);

  // Memoize color classes for orbs with green colors
  const orbColorClasses = useMemo(
    () => [
      "bg-emerald-300/20 dark:bg-emerald-700/20",
      "bg-green-300/20 dark:bg-green-700/20",
      "bg-lime-300/20 dark:bg-lime-700/20",
    ],
    []
  );

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden w-full"
    >
      {/* Simplified background with green theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-emerald-50 to-green-50 dark:from-slate-900 dark:via-emerald-900/20 dark:to-green-900/20">
        {/* Animated grid pattern */}
        <motion.div
          style={{ y: yBg }}
          className="absolute inset-0 opacity-20 dark:opacity-30"
        >
          <div style={gridBackgroundStyle} className="w-full h-full" />
        </motion.div>

        {/* Simplified floating orbs */}
        {[...Array(2)].map((_, i) => {
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
              }}
              animate={{
                x: [0, Math.random() * 20 - 10, 0],
                y: [0, Math.random() * 20 - 10, 0],
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

        {/* Static spotlight effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={radialGradientStyle}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section header with green theme */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto text-center mb-12 md:mb-16"
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #059669, #10b981, #84cc16, #059669)",
              backgroundSize: "300% 100%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            About Me
          </motion.h2>
          <motion.div
            className="w-20 md:w-24 h-1 bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400 mx-auto mb-6 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            style={{ originX: 0.5 }}
          />
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-medium px-4">
            Developer &{" "}
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
              Creative Problem Solver
            </span>{" "}
            passionate about building impactful digital experiences
          </p>
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left column - Introduction */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-6 md:space-y-8"
          >
            <motion.div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-md p-6 md:p-8 border border-emerald-100/50 dark:border-emerald-900/30 w-full">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6 flex items-center">
                <div className="p-2 rounded-lg bg-emerald-100/50 dark:bg-emerald-900/30 mr-3">
                  <Code
                    className="text-emerald-600 dark:text-emerald-400"
                    size={24}
                  />
                </div>
                <span>My Journey</span>
              </h3>
              <div className="space-y-4 md:space-y-6 text-slate-600 dark:text-slate-300">
                <p className="text-base md:text-lg">
                  My coding journey started in 2021 when I first discovered the{" "}
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">
                    &quot;100 Days of Python&quot;
                  </span>{" "}
                  course on Udemy. Although I couldn&apos;t complete it at the
                  time, it planted a seed of curiosity that would eventually
                  blossom into a passion.
                </p>
                <p className="text-base md:text-lg">
                  Everything changed when I enrolled in the{" "}
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">
                    Programming Hero
                  </span>{" "}
                  course, where I discovered my love for building complete web
                  applications.
                </p>
                <p className="text-base md:text-lg">
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
              className="bg-gradient-to-br from-emerald-50/50 to-green-50/50 dark:from-emerald-900/30 dark:to-green-900/30 rounded-2xl shadow-md p-4 md:p-6 border border-emerald-100/50 dark:border-emerald-900/30 w-full"
            >
              <div className="flex items-start">
                <div className="p-2 rounded-lg bg-emerald-100/50 dark:bg-emerald-900/30 mr-4 flex-shrink-0">
                  <Lightbulb
                    className="text-emerald-600 dark:text-emerald-400"
                    size={24}
                  />
                </div>
                <div className="min-w-0 flex-1">
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
                      className="text-emerald-600 dark:text-emerald-400 font-medium text-base md:text-lg"
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
            className="space-y-6 md:space-y-8"
          >
            {/* Personal interests */}
            <motion.div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-md p-6 md:p-8 border border-green-100/50 dark:border-green-900/30 w-full">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6">
                Beyond Coding
              </h3>
              <div className="space-y-4 md:space-y-6">
                {personalInterests.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition-colors cursor-pointer group"
                  >
                    <div
                      className={cn(
                        "p-2 md:p-3 rounded-lg bg-gradient-to-br flex-shrink-0",
                        item.color
                      )}
                    >
                      {item.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-slate-900 dark:text-white flex items-center text-base md:text-lg">
                        <span className="truncate">{item.title}</span>
                        <ChevronRight
                          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600 dark:text-emerald-400 flex-shrink-0"
                          size={16}
                        />
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Education timeline */}
            <motion.div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-md p-6 md:p-8 border border-lime-100/50 dark:border-lime-900/30 w-full">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6 flex items-center">
                <div className="p-2 rounded-lg bg-lime-100/50 dark:bg-lime-900/30 mr-3">
                  <School
                    className="text-lime-600 dark:text-lime-400"
                    size={24}
                  />
                </div>
                <span>Education & Journey</span>
              </h3>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 to-lime-500 dark:from-emerald-600 dark:to-lime-700"></div>
                <div className="space-y-6 md:space-y-8">
                  {educationTimeline.map((item, index) => (
                    <div
                      key={index}
                      className="relative"
                      onMouseEnter={() => setActiveTimelineItem(index)}
                      onMouseLeave={() => setActiveTimelineItem(null)}
                    >
                      {/* Timeline dot */}
                      <div
                        className={cn(
                          "absolute left-2 w-5 h-5 rounded-full z-10 border-4 border-white dark:border-slate-800 flex items-center justify-center",
                          item.color
                        )}
                      >
                        <div className="w-1 h-1 rounded-full bg-white" />
                      </div>
                      {/* Timeline content */}
                      <div
                        className={cn(
                          "ml-12 p-4 md:p-5 rounded-xl border transition-all duration-300",
                          activeTimelineItem === index
                            ? "bg-gradient-to-r from-emerald-50/50 to-green-50/50 dark:from-emerald-900/30 dark:to-green-900/30 border-emerald-200/50 dark:border-emerald-700/50 shadow-md"
                            : "bg-emerald-50/30 dark:bg-emerald-900/20 border-emerald-100/50 dark:border-emerald-800/30"
                        )}
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
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                              <h4 className="font-bold text-slate-900 dark:text-white text-base md:text-lg">
                                {item.title}
                              </h4>
                              <span className="text-xs px-2 py-1 rounded-full bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 w-fit">
                                {item.year}
                              </span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">
                              {item.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
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
          className="mt-12 md:mt-16 max-w-4xl mx-auto bg-gradient-to-r from-emerald-50/50 to-green-50/50 dark:from-emerald-900/30 dark:to-green-900/30 p-6 md:p-8 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30 backdrop-blur-sm w-full"
        >
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="p-3 md:p-4 rounded-full bg-gradient-to-br from-emerald-100/50 to-green-100/50 dark:from-emerald-900/30 dark:to-green-900/30 flex-shrink-0">
              <BookOpen className="text-emerald-600 dark:text-emerald-400 w-10 h-10 md:w-12 md:h-12" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2">
                My Goals as a Full-Stack Developer
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">
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
