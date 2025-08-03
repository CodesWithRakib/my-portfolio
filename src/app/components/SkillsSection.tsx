"use client";
import { motion, useScroll, useTransform } from "framer-motion"; // Removed useInView
import {
  Code,
  Smartphone,
  Palette,
  Server,
  Zap,
  Shield,
  Layers,
  GitBranch,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { MotionValue } from "framer-motion";

// Define TypeScript interfaces
interface SkillItem {
  name: string;
  image: string;
}
interface SkillCategory {
  category: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  skills: SkillItem[];
}
interface ApproachItem {
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
}
interface TechImage {
  name: string;
  image: string;
}
interface BackgroundElementsProps {
  yBg: MotionValue<string>;
  mousePosition: { x: number; y: number };
  theme: string | undefined;
}
interface SkillCardProps {
  category: SkillCategory;
  index: number;
  hoveredCategory: string | null;
  setHoveredCategory: (category: string | null) => void;
}
interface ApproachCardProps {
  item: ApproachItem;
  index: number;
}
interface TechItemProps {
  tech: TechImage;
}

// Memoized skill data to prevent unnecessary re-renders
const skills: SkillCategory[] = [
  {
    category: "Frontend Development",
    icon: <Code className="w-5 h-5" />,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100/50 dark:bg-blue-900/30",
    borderColor: "border-blue-200/50 dark:border-blue-800/30",
    skills: [
      { name: "React", image: "./tech/react-original.svg" },
      { name: "Next.js", image: "./tech/nextjs-original.svg" },
      { name: "TypeScript", image: "./tech/typescript-original.svg" },
      { name: "Tailwind CSS", image: "./tech/tailwindcss-original.svg" },
      { name: "Redux", image: "./tech/redux-original.svg" },
    ],
  },
  {
    category: "Backend Development",
    icon: <Server className="w-5 h-5" />,
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-100/50 dark:bg-indigo-900/30",
    borderColor: "border-indigo-200/50 dark:border-indigo-800/30",
    skills: [
      { name: "Node.js", image: "./tech/nodejs-original.svg" },
      { name: "Express", image: "./tech/express-original.svg" },
      { name: "MongoDB", image: "./tech/mongodb-original.svg" },
      { name: "REST APIs", image: "./tech/api.svg" },
      { name: "Authentication", image: "./tech/oauth-original.svg" },
    ],
  },
  {
    category: "UI/UX Design",
    icon: <Palette className="w-5 h-5" />,
    color: "text-pink-600 dark:text-pink-400",
    bgColor: "bg-pink-100/50 dark:bg-pink-900/30",
    borderColor: "border-pink-200/50 dark:border-pink-800/30",
    skills: [
      {
        name: "Figma",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      },
    ],
  },
];

const developmentApproach: ApproachItem[] = [
  {
    title: "Clean Code",
    desc: "Emphasizing readability and maintainability",
    icon: <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    color: "bg-blue-100/50 dark:bg-blue-900/30",
  },
  {
    title: "Performance",
    desc: "Optimized solutions for speed and efficiency",
    icon: <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    color: "bg-indigo-100/50 dark:bg-indigo-900/30",
  },
  {
    title: "Responsive Design",
    desc: "Flawless experience across all devices",
    icon: (
      <Smartphone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
    ),
    color: "bg-purple-100/50 dark:bg-purple-900/30",
  },
  {
    title: "Security",
    desc: "Built with data protection in mind",
    icon: <Shield className="w-5 h-5 text-pink-600 dark:text-pink-400" />,
    color: "bg-pink-100/50 dark:bg-pink-900/30",
  },
  {
    title: "Testing",
    desc: "Comprehensive test coverage",
    icon: <Layers className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
    color: "bg-cyan-100/50 dark:bg-cyan-900/30",
  },
  {
    title: "DevOps",
    desc: "CI/CD and cloud deployment",
    icon: (
      <GitBranch className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
    ),
    color: "bg-emerald-100/50 dark:bg-emerald-900/30",
  },
];

const techImages: TechImage[] = [
  { name: "JavaScript", image: "./tech/javascript-original.svg" },
  { name: "React", image: "./tech/react-original.svg" },
  { name: "Next.js", image: "./tech/nextjs-original.svg" },
  { name: "TypeScript", image: "./tech/typescript-original.svg" },
  { name: "Node.js", image: "./tech/nodejs-original.svg" },
  { name: "MongoDB", image: "./tech/mongodb-original.svg" },
  { name: "Tailwind", image: "./tech/tailwindcss-original.svg" },
  { name: "Redux", image: "./tech/redux-original.svg" },
  { name: "Git", image: "./tech/git-original.svg" },
  { name: "HTML5", image: "./tech/html5-original.svg" },
  { name: "CSS3", image: "./tech/css3-original.svg" },
  { name: "Firebase", image: "./tech/firebase-original.svg" },
  { name: "Express", image: "./tech/express-original.svg" },
  { name: "Figma", image: "./tech/figma-original.svg" },
  { name: "Bootstrap", image: "./tech/bootstrap-plain.svg" },
  { name: "Vite", image: "./tech/vite-original.svg" },
];

// Memoized background element component
const BackgroundElements: React.FC<BackgroundElementsProps> = ({
  yBg,
  mousePosition,
  theme,
}) => {
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

  // Memoize radial gradient style
  const radialGradientStyle = useMemo(
    () => ({
      background: `radial-gradient(600px at ${mousePosition.x}px ${
        mousePosition.y
      }px, ${
        theme === "dark"
          ? "rgba(59, 130, 246, 0.15)"
          : "rgba(59, 130, 246, 0.2)"
      }, transparent 70%)`,
    }),
    [mousePosition, theme]
  );

  // Generate background elements once
  const elements = useMemo(() => {
    const orbs = [...Array(3)].map((_, i) => {
      const size = 300 + i * 100;
      const position = {
        x: 20 + i * 20,
        y: 10 + i * 15,
      };
      const colorClasses = [
        "bg-blue-300/20 dark:bg-blue-700/20",
        "bg-indigo-300/20 dark:bg-indigo-700/20",
        "bg-purple-300/20 dark:bg-purple-700/20",
      ];
      return {
        key: `orb-${i}`,
        size,
        position,
        color: colorClasses[i],
        animation: {
          x: [0, Math.random() * 30 - 15, 0],
          y: [0, Math.random() * 30 - 15, 0],
          scale: [1, 1.1, 1],
        },
        duration: 20 + i * 5,
        zIndex: 1,
      };
    });

    const shapes = [...Array(4)].map((_, i) => {
      const size = 150 + i * 30;
      const position = {
        x: 10 + i * 15,
        y: 20 + i * 10,
      };
      const shapeType = i % 3;
      const shapeClasses = ["rounded-full", "rounded-lg", "rounded-xl"];
      const colorClasses = [
        "bg-blue-200/15 dark:bg-blue-800/15",
        "bg-indigo-200/15 dark:bg-indigo-800/15",
        "bg-purple-200/15 dark:bg-purple-800/15",
      ];
      return {
        key: `shape-${i}`,
        size,
        position,
        shape: shapeClasses[shapeType],
        color: colorClasses[shapeType],
        animation: {
          x: [0, Math.random() * 40 - 20, 0],
          y: [0, Math.random() * 40 - 20, 0],
          rotate: [0, Math.random() * 360, 0],
        },
        duration: 15 + i * 3,
        zIndex: 2,
      };
    });

    const particles = [...Array(8)].map((_, i) => {
      const size = 20 + Math.random() * 30;
      const position = {
        x: Math.random() * 100,
        y: Math.random() * 100,
      };
      const colorClasses = [
        "bg-blue-200/10 dark:bg-blue-800/10",
        "bg-indigo-200/10 dark:bg-indigo-800/10",
        "bg-purple-200/10 dark:bg-purple-800/10",
      ];
      return {
        key: `particle-${i}`,
        size,
        position,
        color: colorClasses[i % 3],
        animation: {
          x: [0, Math.random() * 50 - 25, 0],
          y: [0, Math.random() * 50 - 25, 0],
          opacity: [0, 0.1, 0],
        },
        duration: 10 + Math.random() * 10,
        zIndex: 3,
      };
    });

    return { orbs, shapes, particles };
  }, []);

  return (
    <>
      {/* Animated 3D grid pattern */}
      <motion.div
        className="absolute inset-0 opacity-20 dark:opacity-30"
        style={{
          ...gridBackgroundStyle,
          y: yBg, // Fixed: combined style props
        }}
      />
      {/* Render orbs */}
      {elements.orbs.map((orb) => (
        <motion.div
          key={orb.key}
          className={cn("absolute rounded-full blur-3xl", orb.color)}
          style={{
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            left: `${orb.position.x}%`,
            top: `${orb.position.y}%`,
            transformStyle: "preserve-3d",
            transform: `translate3d(0, 0, ${orb.size * 0.1}px)`,
            zIndex: orb.zIndex,
          }}
          animate={orb.animation}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Render shapes */}
      {elements.shapes.map((shape) => (
        <motion.div
          key={shape.key}
          className={cn("absolute blur-2xl", shape.shape, shape.color)}
          style={{
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            left: `${shape.position.x}%`,
            top: `${shape.position.y}%`,
            transformStyle: "preserve-3d",
            transform: `translate3d(0, 0, ${shape.size * 0.2}px)`,
            zIndex: shape.zIndex,
          }}
          animate={shape.animation}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Render particles */}
      {elements.particles.map((particle) => (
        <motion.div
          key={particle.key}
          className="absolute rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.position.x}%`,
            top: `${particle.position.y}%`,
            transformStyle: "preserve-3d",
            transform: `translate3d(0, 0, ${particle.size * 0.5}px)`,
            zIndex: particle.zIndex,
            background: particle.color,
          }}
          animate={particle.animation}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Interactive spotlight effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={radialGradientStyle}
      />
    </>
  );
};

// Memoized skill card component
const SkillCard: React.FC<SkillCardProps> = ({
  category,
  index,
  hoveredCategory,
  setHoveredCategory,
}) => {
  const handleHoverStart = useCallback(() => {
    setHoveredCategory(category.category);
  }, [category.category, setHoveredCategory]);

  const handleHoverEnd = useCallback(() => {
    setHoveredCategory(null);
  }, [setHoveredCategory]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      className={cn(
        "relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border",
        category.borderColor,
        "hover:shadow-xl transition-all duration-300",
        hoveredCategory === category.category &&
          "ring-2 ring-blue-500/50 dark:ring-blue-400/50"
      )}
    >
      {/* Decorative corner element */}
      <div
        className={cn(
          "absolute top-0 right-0 w-16 h-16 rounded-bl-full opacity-50",
          category.bgColor
        )}
      ></div>
      <div className="flex items-center mb-6 relative z-10">
        <div className={cn("p-3 rounded-full mr-4", category.bgColor)}>
          <motion.div
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring" }}
            className={category.color}
          >
            {category.icon}
          </motion.div>
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          {category.category}
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-4 relative z-10">
        {category.skills.map((skill, skillIndex) => (
          <motion.div
            key={skillIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + skillIndex * 0.05 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center mb-2 bg-white dark:bg-slate-800 shadow-sm">
              <Image
                src={skill.image}
                alt={skill.name}
                width={40}
                height={40}
                className="w-8 h-8 object-contain"
                loading="lazy"
              />
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 text-center">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Memoized approach card component
const ApproachCard: React.FC<ApproachCardProps> = ({ item, index }) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300 group"
    >
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-transparent rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <div className="flex items-center mb-4 gap-4 relative z-10">
        <div
          className={cn(
            "p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-sm",
            item.color
          )}
        >
          {item.icon}
        </div>
        <h4 className="font-bold text-slate-900 dark:text-white">
          {item.title}
        </h4>
      </div>
      <p className="text-slate-600 dark:text-slate-300 text-sm relative z-10">
        {item.desc}
      </p>
      <div className="mt-4 flex items-center text-slate-600 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
        <CheckCircle className="w-4 h-4 mr-1" />
        <span className="text-xs font-medium">Best practice</span>
      </div>
    </motion.div>
  );
};

// Memoized tech item component
const TechItem: React.FC<TechItemProps> = ({ tech }) => {
  return (
    <div className="flex flex-col items-center justify-center mx-4 flex-shrink-0 group">
      <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800/50 p-2 mb-2 transition-all duration-300 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:scale-110 shadow-sm">
        <Image
          src={tech.image}
          alt={tech.name}
          width={56}
          height={56}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
      <span className="text-xs font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
        {tech.name}
      </span>
    </div>
  );
};

export default function SkillsSection() {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const lastUpdateRef = useRef(0);

  // Throttled mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = performance.now();
    if (now - lastUpdateRef.current > 16) {
      // Throttle to ~60fps
      setMousePosition({ x: e.clientX, y: e.clientY });
      lastUpdateRef.current = now;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Memoized background elements props
  const backgroundElementsProps = useMemo(
    () => ({
      yBg,
      mousePosition,
      theme,
    }),
    [yBg, mousePosition, theme]
  );

  return (
    <section
      ref={ref}
      id="skills"
      className="relative py-20 md:py-28 lg:py-36 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20">
        <BackgroundElements {...backgroundElementsProps} />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-blue-500 mr-3" />
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white"
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
              Skills & Expertise
            </motion.h2>
            <Sparkles className="w-8 h-8 text-purple-500 ml-3" />
          </div>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-400 dark:to-indigo-500 mx-auto mb-6 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            style={{ originX: 0.5 }}
          />
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-medium">
            As a{" "}
            <span className="text-blue-600 dark:text-blue-400 font-semibold">
              MERN Stack Developer
            </span>
            , I continuously expand my technical toolkit to build better
            solutions
          </p>
        </motion.div>
        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((category, index) => (
            <SkillCard
              key={category.category}
              category={category}
              index={index}
              hoveredCategory={hoveredCategory}
              setHoveredCategory={setHoveredCategory}
            />
          ))}
        </div>
        {/* Development approach */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            My Development Approach
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {developmentApproach.map((item, index) => (
              <ApproachCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </motion.div>
        {/* Technology Images Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-br from-white/80 to-blue-50/80 dark:from-slate-800/80 dark:to-blue-900/30 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-blue-100/50 dark:border-blue-900/30 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Technologies I Work With
          </h3>
          {/* Marquee container */}
          <div className="relative overflow-hidden py-4">
            {/* Gradient fade edges */}
            <div className="absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-white/80 to-transparent dark:from-slate-800/80 dark:to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-white/80 to-transparent dark:from-slate-800/80 dark:to-transparent"></div>
            {/* Marquee track 1 */}
            <motion.div
              className="flex"
              animate={{ x: isPaused ? 0 : ["0%", "-100%"] }}
              transition={{
                x: {
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                },
              }}
            >
              {techImages.map((tech) => (
                <TechItem key={`tech1-${tech.name}`} tech={tech} />
              ))}
            </motion.div>
            {/* Marquee track 2 - duplicates for seamless loop */}
            <motion.div
              className="flex absolute top-0 left-full"
              animate={{ x: isPaused ? 0 : ["0%", "-100%"] }}
              transition={{
                x: {
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                },
              }}
            >
              {techImages.map((tech) => (
                <TechItem key={`tech2-${tech.name}`} tech={tech} />
              ))}
            </motion.div>
          </div>
          {/* Pause indicator */}
          <div className="flex justify-center mt-4">
            <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
              {isPaused ? "Paused" : "Hover to pause"}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
