"use client";
import { motion } from "framer-motion";
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

// Memoized skill data with updated green colors
const skills: SkillCategory[] = [
  {
    category: "Frontend Development",
    icon: <Code className="w-5 h-5" />,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100/50 dark:bg-green-900/30",
    borderColor: "border-green-200/50 dark:border-green-800/30",
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
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-100/50 dark:bg-emerald-900/30",
    borderColor: "border-emerald-200/50 dark:border-emerald-800/30",
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
    color: "text-lime-600 dark:text-lime-400",
    bgColor: "bg-lime-100/50 dark:bg-lime-900/30",
    borderColor: "border-lime-200/50 dark:border-lime-800/30",
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
    icon: <Code className="w-5 h-5 text-green-600 dark:text-green-400" />,
    color: "bg-green-100/50 dark:bg-green-900/30",
  },
  {
    title: "Performance",
    desc: "Optimized solutions for speed and efficiency",
    icon: <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    color: "bg-emerald-100/50 dark:bg-emerald-900/30",
  },
  {
    title: "Responsive Design",
    desc: "Flawless experience across all devices",
    icon: <Smartphone className="w-5 h-5 text-lime-600 dark:text-lime-400" />,
    color: "bg-lime-100/50 dark:bg-lime-900/30",
  },
  {
    title: "Security",
    desc: "Built with data protection in mind",
    icon: <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />,
    color: "bg-green-100/50 dark:bg-green-900/30",
  },
  {
    title: "Testing",
    desc: "Comprehensive test coverage",
    icon: <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    color: "bg-emerald-100/50 dark:bg-emerald-900/30",
  },
  {
    title: "DevOps",
    desc: "CI/CD and cloud deployment",
    icon: <GitBranch className="w-5 h-5 text-lime-600 dark:text-lime-400" />,
    color: "bg-lime-100/50 dark:bg-lime-900/30",
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
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      className={cn(
        "relative overflow-hidden bg-white dark:bg-slate-800 rounded-xl shadow-md p-4 md:p-6 border w-full h-full",
        category.borderColor,
        "hover:shadow-lg transition-all duration-300",
        hoveredCategory === category.category &&
          "ring-1 ring-green-500/50 dark:ring-green-400/50"
      )}
    >
      <div className="flex items-center mb-4 md:mb-6 relative z-10">
        <div
          className={cn(
            "p-2 md:p-3 rounded-full mr-3 md:mr-4",
            category.bgColor
          )}
        >
          <div className={category.color}>
            {category.icon}
          </div>
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
            transition={{ delay: 0.05 + skillIndex * 0.03 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center p-2 md:p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300"
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
      transition={{ delay: 0.05 + index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="relative overflow-hidden bg-white dark:bg-slate-800 p-4 md:p-6 rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-md transition-all duration-300 w-full h-full"
    >
      <div className="flex items-center mb-3 md:mb-4 gap-3 md:gap-4 relative z-10">
        <div
          className={cn(
            "p-2 md:p-3 rounded-lg transition-transform duration-300 shadow-sm",
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
    </motion.div>
  );
};

// Memoized tech item component
const TechItem = ({ tech }: { tech: TechImage }) => {
  return (
    <div className="flex flex-col items-center justify-center mx-2 sm:mx-3 md:mx-4 flex-shrink-0 group">
      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-lg bg-white dark:bg-slate-800 p-1.5 sm:p-2 mb-1 sm:mb-2 transition-all duration-300 group-hover:bg-green-50 dark:group-hover:bg-green-900/20 group-hover:scale-105 shadow-sm">
        <Image
          src={tech.image}
          alt={tech.name}
          width={56}
          height={56}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
      <span className="text-xs sm:text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
        {tech.name}
      </span>
    </div>
  );
};

// Simplified Marquee Component
const TechMarquee = ({ 
  techImages, 
  isPaused 
}: { 
  techImages: TechImage[]; 
  isPaused: boolean;
}) => {
  return (
    <div className="relative overflow-hidden py-4">
      {/* Gradient fade edges */}
      <div className="absolute inset-y-0 left-0 w-8 md:w-16 z-10 bg-gradient-to-r from-white to-transparent dark:from-slate-800 dark:to-transparent"></div>
      <div className="absolute inset-y-0 right-0 w-8 md:w-16 z-10 bg-gradient-to-l from-white to-transparent dark:from-slate-800 dark:to-transparent"></div>
      
      {/* Marquee track */}
      <motion.div
        className="flex"
        animate={{ x: isPaused ? 0 : ["0%", "-50%"] }}
        transition={{
          x: {
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {/* Double the items for seamless loop */}
        {[...techImages, ...techImages].map((tech, index) => (
          <TechItem key={`tech-${index}`} tech={tech} />
        ))}
      </motion.div>
    </div>
  );
};

export default function SkillsSection() {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Background style based on theme
  const backgroundStyle = useMemo(() => {
    return {
      background: theme === "dark" 
        ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" 
        : "linear-gradient(135deg, #f5f7fa 0%, #e4f1f5 100%)",
    };
  }, [theme]);

  return (
    <section
      ref={ref}
      id="skills"
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden w-full"
      style={backgroundStyle}
    >
      {/* Simple background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5NGEzYjgiIGZpbGwtb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6Ii8+PHBhdGggZD0iTTQwIDBIMHY0MCIgc3Ryb2tlPSIjOTRhM2I4IiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
      </div>
      
      {/* Single subtle animated orb */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-green-200/20 dark:bg-green-800/20 blur-3xl"
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 mr-2 sm:mr-3" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white">
              Skills & Expertise
            </h2>
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500 ml-2 sm:ml-3" />
          </div>
          <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 mx-auto mb-4 md:mb-6 rounded-full"></div>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-medium px-4">
            As a{" "}
            <span className="text-green-600 dark:text-green-400 font-semibold">
              MERN Stack Developer
            </span>
            , I continuously expand my technical toolkit to build better solutions
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
          transition={{ delay: 0.4 }}
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
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-20 bg-white dark:bg-slate-800 rounded-xl shadow-md p-4 md:p-8 border border-green-100/50 dark:border-green-900/30 overflow-hidden w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-6 md:mb-8 text-center">
            Technologies I Work With
          </h3>
          
          {/* Simplified Marquee */}
          <TechMarquee techImages={techImages} isPaused={isPaused} />
          
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