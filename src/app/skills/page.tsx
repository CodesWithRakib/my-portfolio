"use client";
import { motion } from "framer-motion";
import {
  Code,
  Database,
  Smartphone,
  Palette,
  Server,
  Zap,
  Shield,
  Layers,
  GitBranch,
  CheckCircle,
  Sparkles,
  Award,
  Target,
  BookOpen,
  Wrench,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// TypeScript interfaces remain the same
interface SkillItem {
  name: string;
  image: string;
  level: number;
  experience: string;
  description: string;
}

interface SkillCategory {
  id: string;
  category: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
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

// Skill data remains the same
const skills: SkillCategory[] = [
  {
    id: "frontend",
    category: "Frontend Development",
    icon: <Code className="w-5 h-5" />,
    color: "text-teal-600 dark:text-teal-400",
    bgColor: "bg-teal-100/50 dark:bg-teal-900/30",
    borderColor: "border-teal-200/50 dark:border-teal-800/30",
    description:
      "Creating engaging, responsive user interfaces with modern frameworks and tools.",
    skills: [
      {
        name: "React",
        image: "./tech/react-original.svg",
        level: 90,
        experience: "1+ years",
        description:
          "Building complex UIs with hooks, context, and component architecture.",
      },
      {
        name: "Next.js",
        image: "./tech/nextjs-original.svg",
        level: 85,
        experience: "6 months",
        description:
          "Server-side rendering, static site generation, and API routes.",
      },
      {
        name: "TypeScript",
        image: "./tech/typescript-original.svg",
        level: 80,
        experience: "6 months",
        description:
          "Strongly typed JavaScript for better code quality and maintainability.",
      },
      {
        name: "Tailwind CSS",
        image: "./tech/tailwindcss-original.svg",
        level: 95,
        experience: "2+ years",
        description: "Utility-first CSS framework for rapid UI development.",
      },
      {
        name: "Redux",
        image: "./tech/redux-original.svg",
        level: 75,
        experience: "1+ years",
        description:
          "State management for complex applications with Redux Toolkit.",
      },
      {
        name: "HTML5/CSS3",
        image: "./tech/html5-original.svg",
        level: 95,
        experience: "3+ years",
        description:
          "Semantic HTML and modern CSS with Flexbox, Grid, and animations.",
      },
    ],
  },
  {
    id: "backend",
    category: "Backend Development",
    icon: <Server className="w-5 h-5" />,
    color: "text-cyan-600 dark:text-cyan-400",
    bgColor: "bg-cyan-100/50 dark:bg-cyan-900/30",
    borderColor: "border-cyan-200/50 dark:border-cyan-800/30",
    description:
      "Building robust server-side applications and APIs with scalable architecture.",
    skills: [
      {
        name: "Node.js",
        image: "./tech/nodejs-original.svg",
        level: 85,
        experience: "1+ years",
        description:
          "Server-side JavaScript runtime for building scalable applications.",
      },
      {
        name: "Express.js",
        image: "./tech/express-original.svg",
        level: 90,
        experience: "1+ years",
        description: "Fast, unopinionated web framework for Node.js.",
      },
      {
        name: "MongoDB",
        image: "./tech/mongodb-original.svg",
        level: 80,
        experience: "1+ years",
        description: "NoSQL database for flexible, scalable data storage.",
      },
      {
        name: "REST APIs",
        image: "./tech/api.svg",
        level: 90,
        experience: "1+ years",
        description:
          "Designing and implementing RESTful APIs for web applications.",
      },
      {
        name: "Authentication",
        image: "./tech/oauth-original.svg",
        level: 75,
        experience: "1+ years",
        description:
          "Implementing secure authentication with JWT, OAuth, and sessions.",
      },
    ],
  },
  {
    id: "database",
    category: "Database & Cloud",
    icon: <Database className="w-5 h-5" />,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100/50 dark:bg-blue-900/30",
    borderColor: "border-blue-200/50 dark:border-blue-800/30",
    description:
      "Managing data storage, retrieval, and cloud infrastructure for applications.",
    skills: [
      {
        name: "Mongoose",
        image: "./tech/mongoose-original.svg",
        level: 80,
        experience: "1.5+ years",
        description: "MongoDB object modeling for Node.js.",
      },
      {
        name: "Vercel",
        image: "./tech/vercel.svg",
        level: 90,
        experience: "2+ years",
        description: "Serverless deployment platform for Next.js applications.",
      },
      {
        name: "Netlify",
        image: "./tech/netlify-original.svg",
        level: 85,
        experience: "1.5+ years",
        description: "Jamstack deployment with serverless functions and CI/CD.",
      },
    ],
  },
  {
    id: "tools",
    category: "Tools & Productivity",
    icon: <Wrench className="w-5 h-5" />,
    color: "text-sky-600 dark:text-sky-400",
    bgColor: "bg-sky-100/50 dark:bg-sky-900/30",
    borderColor: "border-sky-200/50 dark:border-sky-800/30",
    description:
      "Development tools and workflows that enhance productivity and code quality.",
    skills: [
      {
        name: "Git",
        image: "./tech/git-original.svg",
        level: 90,
        experience: "3+ years",
        description:
          "Version control system for tracking changes and collaboration.",
      },
      {
        name: "VS Code",
        image: "./tech/vscode-original.svg",
        level: 95,
        experience: "3+ years",
        description: "Code editor with extensive extensions and customization.",
      },
      {
        name: "Figma",
        image: "./tech/figma-original.svg",
        level: 75,
        experience: "1+ years",
        description: "Collaborative design tool for UI/UX prototyping.",
      },
      {
        name: "Postman",
        image: "./tech/postman-original.svg",
        level: 85,
        experience: "1.5+ years",
        description: "API testing and documentation platform.",
      },
      {
        name: "Chrome DevTools",
        image: "./tech/chrome-devtools-original.svg",
        level: 90,
        experience: "3+ years",
        description: "Web development and debugging tools built into Chrome.",
      },
    ],
  },
  {
    id: "design",
    category: "UI/UX Design",
    icon: <Palette className="w-5 h-5" />,
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-100/50 dark:bg-indigo-900/30",
    borderColor: "border-indigo-200/50 dark:border-indigo-800/30",
    description:
      "Creating intuitive and visually appealing user experiences with design principles.",
    skills: [
      {
        name: "Responsive Design",
        image: "./tech/responsive-design-original.svg",
        level: 90,
        experience: "2+ years",
        description:
          "Creating layouts that work seamlessly across all device sizes.",
      },
      {
        name: "UI/UX Principles",
        image: "./tech/uiux-original.svg",
        level: 80,
        experience: "1.5+ years",
        description:
          "Applying design principles for intuitive user experiences.",
      },
      {
        name: "Design Systems",
        image: "./tech/system-design-original.svg",
        level: 65,
        experience: "6 months",
        description:
          "Creating consistent design languages and component libraries.",
      },
      {
        name: "Accessibility",
        image: "./tech/accessibility-original.svg",
        level: 75,
        experience: "1+ years",
        description:
          "Ensuring applications are usable by people with disabilities.",
      },
    ],
  },
  {
    id: "testing",
    category: "Testing & QA",
    icon: <Shield className="w-5 h-5" />,
    color: "text-violet-600 dark:text-violet-400",
    bgColor: "bg-violet-100/50 dark:bg-violet-900/30",
    borderColor: "border-violet-200/50 dark:border-violet-800/30",
    description:
      "Ensuring code quality and application reliability through comprehensive testing.",
    skills: [
      {
        name: "Jest",
        image: "./tech/jest-original.svg",
        level: 75,
        experience: "1+ years",
        description:
          "JavaScript testing framework for unit and integration tests.",
      },
      {
        name: "React Testing Library",
        image: "./tech/react-testing-original.svg",
        level: 80,
        experience: "1+ years",
        description: "Testing React components with a focus on user behavior.",
      },
      {
        name: "Cypress",
        image: "./tech/cypress-original.svg",
        level: 70,
        experience: "6 months",
        description: "End-to-end testing framework for web applications.",
      },
      {
        name: "Unit Testing",
        image: "./tech/speedtest-original.svg",
        level: 85,
        experience: "1.5+ years",
        description:
          "Testing individual functions and components in isolation.",
      },
      {
        name: "Integration Testing",
        image: "./tech/speedtest-original.svg",
        level: 75,
        experience: "1+ years",
        description:
          "Testing how different parts of the application work together.",
      },
      {
        name: "Debugging",
        image: "./tech/debug-original.svg",
        level: 90,
        experience: "3+ years",
        description: "Identifying and fixing issues in code and applications.",
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
    icon: <Zap className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
    color: "bg-cyan-100/50 dark:bg-cyan-900/30",
  },
  {
    title: "Responsive Design",
    desc: "Flawless experience across all devices",
    icon: <Smartphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    color: "bg-blue-100/50 dark:bg-blue-900/30",
  },
  {
    title: "Security",
    desc: "Built with data protection in mind",
    icon: <Shield className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
    color: "bg-sky-100/50 dark:bg-sky-900/30",
  },
  {
    title: "Testing",
    desc: "Comprehensive test coverage",
    icon: <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    color: "bg-indigo-100/50 dark:bg-indigo-900/30",
  },
  {
    title: "DevOps",
    desc: "CI/CD and cloud deployment",
    icon: (
      <GitBranch className="w-5 h-5 text-violet-600 dark:text-violet-400" />
    ),
    color: "bg-violet-100/50 dark:bg-violet-900/30",
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

// Optimized Background element component
const BackgroundElements: React.FC<BackgroundElementsProps> = ({
  mousePosition,
  theme,
}) => {
  const elements = useMemo(() => {
    // Reduced number of orbs for better performance
    const orbs = [...Array(3)].map((_, i) => {
      const size = 250 + i * 100;
      const position = {
        x: 15 + i * 25,
        y: 10 + i * 20,
      };
      const colorClasses = [
        "bg-teal-300/15 dark:bg-teal-700/15",
        "bg-cyan-300/15 dark:bg-cyan-700/15",
        "bg-blue-300/15 dark:bg-blue-700/15",
      ];
      return {
        key: `orb-${i}`,
        size,
        position,
        color: colorClasses[i],
        animation: {
          x: [0, 10 - i * 3, 0],
          y: [0, 10 - i * 3, 0],
          scale: [1, 1.05, 1],
        },
        duration: 30 + i * 10, // Slower animations for better performance
        zIndex: 1,
      };
    });

    // Reduced number of shapes
    const shapes = [...Array(4)].map((_, i) => {
      const size = 100 + i * 40;
      const position = {
        x: 10 + i * 20,
        y: 20 + i * 15,
      };
      const shapeType = i % 3;
      const shapeClasses = ["rounded-full", "rounded-lg", "rounded-xl"];
      const colorClasses = [
        "bg-teal-200/10 dark:bg-teal-800/10",
        "bg-cyan-200/10 dark:bg-cyan-800/10",
        "bg-blue-200/10 dark:bg-blue-800/10",
      ];
      return {
        key: `shape-${i}`,
        size,
        position,
        shape: shapeClasses[shapeType],
        color: colorClasses[shapeType],
        animation: {
          x: [0, 15 - i * 3, 0],
          y: [0, 15 - i * 3, 0],
          rotate: [0, 180, 0],
        },
        duration: 40 + i * 10, // Slower animations
        zIndex: 2,
      };
    });

    // Reduced number of particles
    const particles = [...Array(8)].map((_, i) => {
      const size = 10 + Math.random() * 20;
      const position = {
        x: Math.random() * 100,
        y: Math.random() * 100,
      };
      const colorClasses = [
        "bg-teal-200/5 dark:bg-teal-800/5",
        "bg-cyan-200/5 dark:bg-cyan-800/5",
        "bg-blue-200/5 dark:bg-blue-800/5",
      ];
      return {
        key: `particle-${i}`,
        size,
        position,
        color: colorClasses[i % 3],
        animation: {
          x: [0, 20 - i * 2, 0],
          y: [0, 20 - i * 2, 0],
          opacity: [0, 0.05, 0],
        },
        duration: 20 + Math.random() * 10, // Slower animations
        zIndex: 3,
      };
    });

    return { orbs, shapes, particles };
  }, []);

  return (
    <>
      {/* Simplified 3D grid pattern */}
      <div
        className="absolute inset-0 opacity-10 dark:opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px", // Larger grid for better performance
          color: theme === "dark" ? "#4b5563" : "#d1d5db",
        }}
      />

      {/* Render orbs */}
      {elements.orbs.map((orb) => (
        <motion.div
          key={orb.key}
          className={`absolute rounded-full blur-3xl ${orb.color}`}
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
          className={`absolute ${shape.shape} blur-2xl ${shape.color}`}
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

      {/* Simplified spotlight effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(400px at ${mousePosition.x}px ${
            mousePosition.y
          }px, ${
            theme === "dark"
              ? "rgba(20, 184, 166, 0.1)"
              : "rgba(20, 184, 166, 0.15)"
          }, transparent 80%)`,
        }}
      />
    </>
  );
};

// Optimized Skill card component
const SkillCard: React.FC<SkillCardProps> = ({
  category,
  index,
  hoveredCategory,
  setHoveredCategory,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }} // Reduced duration and delay
      viewport={{ once: true }}
      whileHover={{ y: -3 }} // Reduced hover effect
      onHoverStart={() => setHoveredCategory(category.id)}
      onHoverEnd={() => setHoveredCategory(null)}
      className={`relative overflow-hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-md p-5 border ${
        category.borderColor
      } hover:shadow-lg transition-all duration-300 ${
        hoveredCategory === category.id
          ? "ring-1 ring-teal-500/50 dark:ring-teal-400/50"
          : ""
      }`}
    >
      <div
        className={`absolute top-0 right-0 w-12 h-12 ${category.bgColor} rounded-bl-full opacity-50`}
      ></div>
      <div className="flex items-center mb-5 relative z-10">
        <div className={`p-2 rounded-full ${category.bgColor} mr-3`}>
          <motion.div
            whileHover={{ rotate: 10 }} // Reduced rotation
            transition={{ type: "spring", stiffness: 300 }} // Added stiffness for smoother animation
            className={category.color}
          >
            {category.icon}
          </motion.div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {category.category}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            {category.description}
          </p>
        </div>
      </div>
      <div className="space-y-3 relative z-10">
        {category.skills.map((skill, skillIndex) => (
          <motion.div
            key={skillIndex}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 + skillIndex * 0.03 }} // Reduced delay
            viewport={{ once: true }}
            className="flex flex-col space-y-1"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg overflow-hidden flex-shrink-0 bg-white dark:bg-slate-800 shadow-sm">
                  <Image
                    src={skill.image}
                    alt={skill.name}
                    width={28}
                    height={28}
                    className="w-full h-full object-contain p-1"
                    loading="lazy"
                  />
                </div>
                <div>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    {skill.name}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {skill.experience}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {skill.level}%
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <Progress value={skill.level} className="h-1.5" />
            <p className="text-xs text-slate-600 dark:text-slate-400 pl-9">
              {skill.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Optimized Approach card component
const ApproachCard: React.FC<ApproachCardProps> = ({ item, index }) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.08 }} // Reduced delay
      viewport={{ once: true }}
      whileHover={{ y: -3 }} // Reduced hover effect
      className="relative overflow-hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-5 rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-md transition-all duration-300 group"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-blue-500"></div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-teal-400 to-transparent rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <div className="flex items-center mb-3 gap-3 relative z-10">
        <div
          className={`p-2 rounded-lg ${item.color} group-hover:scale-105 transition-transform duration-300 shadow-sm`}
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
      <div className="mt-3 flex items-center text-slate-600 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
        <CheckCircle className="w-4 h-4 mr-1" />
        <span className="text-xs font-medium">Best practice</span>
      </div>
    </motion.div>
  );
};

// Tech item component remains the same
const TechItem: React.FC<TechItemProps> = ({ tech }) => {
  return (
    <div className="flex flex-col items-center justify-center mx-4 flex-shrink-0 group">
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white dark:bg-slate-800/50 p-2 mb-2 transition-all duration-300 group-hover:bg-teal-50 dark:group-hover:bg-teal-900/20 group-hover:scale-105 shadow-sm">
        <Image
          src={tech.image}
          alt={tech.name}
          width={48}
          height={48}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
      <span className="text-xs font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
        {tech.name}
      </span>
    </div>
  );
};

export default function SkillsPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Simplified mouse move handler with throttling
  useEffect(() => {
    if (!mounted) return;

    let throttleTimeout: NodeJS.Timeout | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          throttleTimeout = null;
        }, 50); // Throttle to every 50ms for better performance
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, [mounted]);

  // Filter skills based on active tab
  const filteredSkills =
    activeTab === "all"
      ? skills
      : skills.filter((category) => category.id === activeTab);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-blue-50 dark:from-slate-900 dark:via-teal-900/20 dark:to-blue-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-blue-50 dark:from-slate-900 dark:via-teal-900/20 dark:to-blue-900/20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <BackgroundElements mousePosition={mousePosition} theme={theme} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-16">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} // Reduced duration
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-7 h-7 text-teal-500 mr-3" />
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white"
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{
                duration: 15, // Slower animation
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #0d9488, #14b8a6, #06b6d4, #0ea5e9, #3b82f6)",
                backgroundSize: "300% 100%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Skills & Expertise
            </motion.h1>
            <Sparkles className="w-7 h-7 text-blue-500 ml-3" />
          </div>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-teal-600 to-blue-700 dark:from-teal-400 dark:to-blue-500 mx-auto mb-5 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }} // Reduced duration
          />
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-medium">
            As a{" "}
            <span className="text-teal-600 dark:text-teal-400 font-semibold">
              MERN Stack Developer
            </span>
            , I continuously expand my technical toolkit to build better
            solutions
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }} // Reduced delay
          className="mb-10"
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-7 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-1 shadow-md">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-blue-700 data-[state=active]:text-white text-xs"
              >
                All Skills
              </TabsTrigger>
              {skills.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-blue-700 data-[state=active]:text-white text-xs"
                >
                  {category.category.split(" ")[0]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredSkills.map((category, index) => (
            <SkillCard
              key={category.id}
              category={category}
              index={index}
              hoveredCategory={hoveredCategory}
              setHoveredCategory={setHoveredCategory}
            />
          ))}
        </div>

        {/* Development approach */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }} // Reduced delay
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              My Development Approach
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              I follow these principles to ensure high-quality, maintainable
              code and exceptional user experiences
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {developmentApproach.map((item, index) => (
              <ApproachCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Technology stack marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }} // Reduced delay
          viewport={{ once: true }}
          className="bg-gradient-to-br from-white/90 to-teal-50/90 dark:from-slate-800/90 dark:to-teal-900/30 backdrop-blur-sm rounded-xl shadow-md p-6 border border-teal-100/50 dark:border-teal-900/30 overflow-hidden mb-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Technologies I Work With
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              A comprehensive toolkit for modern web development
            </p>
          </div>

          {/* Marquee container */}
          <div className="relative overflow-hidden py-3">
            {/* Gradient fade edges */}
            <div className="absolute inset-y-0 left-0 w-12 z-10 bg-gradient-to-r from-white/90 to-transparent dark:from-slate-800/90 dark:to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-12 z-10 bg-gradient-to-l from-white/90 to-transparent dark:from-slate-800/90 dark:to-transparent"></div>

            {/* Marquee track 1 */}
            <motion.div
              className="flex"
              animate={{ x: isPaused ? 0 : ["0%", "-100%"] }}
              transition={{
                x: {
                  duration: 60, // Slower animation for better performance
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
                  duration: 60, // Slower animation
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
          <div className="flex justify-center mt-3">
            <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
              {isPaused ? "Paused" : "Hover to pause"}
            </span>
          </div>
        </motion.div>

        {/* Skills progression section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }} // Reduced delay
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              My Learning Journey
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              {
                "I'm constantly expanding my skillset and staying up-to-date with the latest technologies"
              }
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="text-teal-600 dark:text-teal-400" />
                  Currently Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Next.js 14</Badge>
                    <Badge variant="outline">Advanced TypeScript</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">GraphQL</Badge>
                    <Badge variant="outline">AWS Services</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Docker</Badge>
                    <Badge variant="outline">Kubernetes</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="text-cyan-600 dark:text-cyan-400" />
                  Next Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Rust Programming</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Web3 Development</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Machine Learning</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Mobile Development</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="text-blue-600 dark:text-blue-400" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">AWS Certified Developer</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      MongoDB Certified Developer
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Google Cloud Professional</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Let&apos;s Build Something Together
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-6">
            {
              "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision"
            }
          </p>
          <Button className="bg-gradient-to-r from-teal-600 to-blue-700 hover:from-teal-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-shadow">
            Get In Touch
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
