"use client";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
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
import { useRef, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

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
  theme: string | undefined;
}

// Memoized skill data with updated colors
const skills: SkillCategory[] = [
  {
    category: "Frontend Development",
    icon: <Code className="w-5 h-5" />,
    color: "text-teal-600 dark:text-teal-400",
    bgColor: "bg-teal-100/50 dark:bg-teal-900/30",
    borderColor: "border-teal-200/50 dark:border-teal-800/30",
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
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100/50 dark:bg-blue-900/30",
    borderColor: "border-blue-200/50 dark:border-blue-800/30",
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
    color: "text-cyan-600 dark:text-cyan-400",
    bgColor: "bg-cyan-100/50 dark:bg-cyan-900/30",
    borderColor: "border-cyan-200/50 dark:border-cyan-800/30",
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
    icon: <Code className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
    color: "bg-teal-100/50 dark:bg-teal-900/30",
  },
  {
    title: "Performance",
    desc: "Optimized solutions for speed and efficiency",
    icon: <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    color: "bg-blue-100/50 dark:bg-blue-900/30",
  },
  {
    title: "Responsive Design",
    desc: "Flawless experience across all devices",
    icon: <Smartphone className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
    color: "bg-cyan-100/50 dark:bg-cyan-900/30",
  },
  {
    title: "Security",
    desc: "Built with data protection in mind",
    icon: <Shield className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
    color: "bg-teal-100/50 dark:bg-teal-900/30",
  },
  {
    title: "Testing",
    desc: "Comprehensive test coverage",
    icon: <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    color: "bg-blue-100/50 dark:bg-blue-900/30",
  },
  {
    title: "DevOps",
    desc: "CI/CD and cloud deployment",
    icon: <GitBranch className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
    color: "bg-cyan-100/50 dark:bg-cyan-900/30",
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

// Memoized background element component with simplified animations
const BackgroundElements: React.FC<BackgroundElementsProps> = ({
  yBg,
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

  // Memoize static radial gradient style - removed mouse following for performance
  const radialGradientStyle = useMemo(() => {
    return {
      background: `radial-gradient(600px at 50% 50%, ${
        theme === "dark"
          ? "rgba(20, 184, 166, 0.15)"
          : "rgba(20, 184, 166, 0.2)"
      }, transparent 70%)`,
    };
  }, [theme]);

  // Generate simplified background elements
  const elements = useMemo(() => {
    const orbs = [...Array(2)].map((_, i) => {
      const size = 300 + i * 100;
      const position = {
        x: 20 + i * 20,
        y: 10 + i * 15,
      };
      const colorClasses = [
        "bg-teal-300/20 dark:bg-teal-700/20",
        "bg-blue-300/20 dark:bg-blue-700/20",
      ];
      return {
        key: `orb-${i}`,
        size,
        position,
        color: colorClasses[i],
        animation: {
          x: [0, Math.random() * 20 - 10, 0],
          y: [0, Math.random() * 20 - 10, 0],
          scale: [1, 1.05, 1],
        },
        duration: 20 + i * 5,
        zIndex: 1,
      };
    });

    const shapes = [...Array(3)].map((_, i) => {
      const size = 150 + i * 30;
      const position = {
        x: 10 + i * 15,
        y: 20 + i * 10,
      };
      const shapeType = i % 3;
      const shapeClasses = ["rounded-full", "rounded-lg", "rounded-xl"];
      const colorClasses = [
        "bg-teal-200/15 dark:bg-teal-800/15",
        "bg-blue-200/15 dark:bg-blue-800/15",
        "bg-cyan-200/15 dark:bg-cyan-800/15",
      ];
      return {
        key: `shape-${i}`,
        size,
        position,
        shape: shapeClasses[shapeType],
        color: colorClasses[shapeType],
        animation: {
          x: [0, Math.random() * 30 - 15, 0],
          y: [0, Math.random() * 30 - 15, 0],
          rotate: [0, Math.random() * 360, 0],
        },
        duration: 15 + i * 3,
        zIndex: 2,
      };
    });

    return { orbs, shapes };
  }, []);

  return (
    <>
      {/* Animated grid pattern */}
      <motion.div
        className="absolute inset-0 opacity-20 dark:opacity-30"
        style={{
          ...gridBackgroundStyle,
          y: yBg,
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
      {/* Static spotlight effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={radialGradientStyle}
      />
    </>
  );
};

// Memoized skill card component
const SkillCard = ({
  category,
  index,
  hoveredCategory,
  setHoveredCategory,
}: {
  category: SkillCategory;
  index: number;
  hoveredCategory: string | null;
  setHoveredCategory: (category: string | null) => void;
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
        "relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 md:p-6 border w-full h-full",
        category.borderColor,
        "hover:shadow-xl transition-all duration-300",
        hoveredCategory === category.category &&
          "ring-2 ring-teal-500/50 dark:ring-teal-400/50"
      )}
    >
      {/* Decorative corner element */}
      <div
        className={cn(
          "absolute top-0 right-0 w-16 h-16 rounded-bl-full opacity-50",
          category.bgColor
        )}
      ></div>
      <div className="flex items-center mb-4 md:mb-6 relative z-10">
        <div
          className={cn(
            "p-2 md:p-3 rounded-full mr-3 md:mr-4",
            category.bgColor
          )}
        >
          <motion.div
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring" }}
            className={category.color}
          >
            {category.icon}
          </motion.div>
        </div>
        <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
          {category.category}
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-3 md:gap-4 relative z-10">
        {category.skills.map((skill, skillIndex) => (
          <motion.div
            key={skillIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + skillIndex * 0.05 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center p-2 md:p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-300 group"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg overflow-hidden flex items-center justify-center mb-1 md:mb-2 bg-white dark:bg-slate-800 shadow-sm">
              <Image
                src={skill.image}
                alt={skill.name}
                width={40}
                height={40}
                className="w-6 h-6 md:w-8 md:h-8 object-contain"
                loading="lazy"
              />
            </div>
            <span className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 text-center">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Memoized approach card component
const ApproachCard = ({
  item,
  index,
}: {
  item: ApproachItem;
  index: number;
}) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300 group w-full h-full"
    >
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-blue-500"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-400 to-transparent rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <div className="flex items-center mb-3 md:mb-4 gap-3 md:gap-4 relative z-10">
        <div
          className={cn(
            "p-2 md:p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-sm",
            item.color
          )}
        >
          {item.icon}
        </div>
        <h4 className="font-bold text-slate-900 dark:text-white text-base md:text-lg">
          {item.title}
        </h4>
      </div>
      <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base relative z-10">
        {item.desc}
      </p>
      <div className="mt-3 md:mt-4 flex items-center text-slate-600 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
        <span className="text-xs md:text-sm font-medium">Best practice</span>
      </div>
    </motion.div>
  );
};

// Memoized tech item component
const TechItem = ({ tech }: { tech: TechImage }) => {
  return (
    <div className="flex flex-col items-center justify-center mx-2 sm:mx-3 md:mx-4 flex-shrink-0 group">
      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800/50 p-1.5 sm:p-2 mb-1 sm:mb-2 transition-all duration-300 group-hover:bg-teal-50 dark:group-hover:bg-teal-900/20 group-hover:scale-110 shadow-sm">
        <Image
          src={tech.image}
          alt={tech.name}
          width={56}
          height={56}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
      <span className="text-xs sm:text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
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
  const [isPaused, setIsPaused] = useState(false);

  // Memoized background elements props
  const backgroundElementsProps = useMemo(
    () => ({
      yBg,
      theme,
    }),
    [yBg, theme]
  );

  return (
    <section
      ref={ref}
      id="skills"
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden w-full"
    >
      {/* Background gradient with teal/blue theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-teal-50/50 to-blue-50/50 dark:from-slate-900 dark:via-teal-900/20 dark:to-blue-900/20">
        <BackgroundElements {...backgroundElementsProps} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section header with teal/blue theme */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-teal-500 mr-2 sm:mr-3" />
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white"
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
                  "linear-gradient(90deg, #0d9488, #0891b2, #0ea5e9, #0d9488)",
                backgroundSize: "300% 100%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Skills & Expertise
            </motion.h2>
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 ml-2 sm:ml-3" />
          </div>
          <motion.div
            className="w-20 md:w-24 h-1 bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 mx-auto mb-4 md:mb-6 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            style={{ originX: 0.5 }}
          />
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-medium px-4">
            As a{" "}
            <span className="text-teal-600 dark:text-teal-400 font-semibold">
              MERN Stack Developer
            </span>
            , I continuously expand my technical toolkit to build better
            solutions
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
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
          className="mt-16 md:mt-20 w-full"
        >
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-6 md:mb-8 text-center">
            My Development Approach
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
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
          className="mt-16 md:mt-20 bg-gradient-to-br from-white/80 to-teal-50/80 dark:from-slate-800/80 dark:to-teal-900/30 backdrop-blur-sm rounded-2xl shadow-lg p-4 md:p-8 border border-teal-100/50 dark:border-teal-900/30 overflow-hidden w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-6 md:mb-8 text-center">
            Technologies I Work With
          </h3>

          {/* Marquee container */}
          <div className="relative overflow-hidden py-4">
            {/* Gradient fade edges */}
            <div className="absolute inset-y-0 left-0 w-8 md:w-16 z-10 bg-gradient-to-r from-white/80 to-transparent dark:from-slate-800/80 dark:to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-8 md:w-16 z-10 bg-gradient-to-l from-white/80 to-transparent dark:from-slate-800/80 dark:to-transparent"></div>

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
