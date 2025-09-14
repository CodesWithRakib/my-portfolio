"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Sparkles,
  Award,
  Target,
  BookOpen,
  Wrench,
  Lightbulb,
  Users,
  Cpu,
} from "lucide-react";

// TypeScript interfaces remain the same
interface SkillItem {
  name: string;
  image: string;
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

// Enhanced skill data without years of experience
const skills: SkillCategory[] = [
  {
    id: "frontend",
    category: "Frontend Development",
    icon: <Code className="w-5 h-5" />,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100/50 dark:bg-green-900/30",
    borderColor: "border-green-200/50 dark:border-green-800/30",
    description:
      "Creating engaging, responsive user interfaces with modern frameworks and tools.",
    skills: [
      {
        name: "React",
        image: "./tech/react-original.svg",
        description:
          "Building complex UIs with hooks, context, and component architecture.",
      },
      {
        name: "Next.js",
        image: "./tech/nextjs-original.svg",
        description:
          "Server-side rendering, static site generation, and API routes.",
      },
      {
        name: "TypeScript",
        image: "./tech/typescript-original.svg",
        description:
          "Strongly typed JavaScript for better code quality and maintainability.",
      },
      {
        name: "Tailwind CSS",
        image: "./tech/tailwindcss-original.svg",
        description: "Utility-first CSS framework for rapid UI development.",
      },
      {
        name: "Redux",
        image: "./tech/redux-original.svg",
        description:
          "State management for complex applications with Redux Toolkit.",
      },
      {
        name: "HTML5/CSS3",
        image: "./tech/html5-original.svg",
        description:
          "Semantic HTML and modern CSS with Flexbox, Grid, and animations.",
      },
    ],
  },
  {
    id: "backend",
    category: "Backend Development",
    icon: <Server className="w-5 h-5" />,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-100/50 dark:bg-emerald-900/30",
    borderColor: "border-emerald-200/50 dark:border-emerald-800/30",
    description:
      "Building robust server-side applications and APIs with scalable architecture.",
    skills: [
      {
        name: "Node.js",
        image: "./tech/nodejs-original.svg",
        description:
          "Server-side JavaScript runtime for building scalable applications.",
      },
      {
        name: "Express.js",
        image: "./tech/express-original.svg",
        description: "Fast, unopinionated web framework for Node.js.",
      },
      {
        name: "MongoDB",
        image: "./tech/mongodb-original.svg",
        description: "NoSQL database for flexible, scalable data storage.",
      },
      {
        name: "REST APIs",
        image: "./tech/api.svg",
        description:
          "Designing and implementing RESTful APIs for web applications.",
      },
      {
        name: "Authentication",
        image: "./tech/oauth-original.svg",
        description:
          "Implementing secure authentication with JWT, OAuth, and sessions.",
      },
    ],
  },
  {
    id: "database",
    category: "Database & Cloud",
    icon: <Database className="w-5 h-5" />,
    color: "text-lime-600 dark:text-lime-400",
    bgColor: "bg-lime-100/50 dark:bg-lime-900/30",
    borderColor: "border-lime-200/50 dark:border-lime-800/30",
    description:
      "Managing data storage, retrieval, and cloud infrastructure for applications.",
    skills: [
      {
        name: "Mongoose",
        image: "./tech/mongoose-original.svg",
        description: "MongoDB object modeling for Node.js.",
      },
      {
        name: "Vercel",
        image: "./tech/vercel.svg",
        description: "Serverless deployment platform for Next.js applications.",
      },
      {
        name: "Netlify",
        image: "./tech/netlify-original.svg",
        description: "Jamstack deployment with serverless functions and CI/CD.",
      },
    ],
  },
  {
    id: "tools",
    category: "Tools & Productivity",
    icon: <Wrench className="w-5 h-5" />,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100/50 dark:bg-green-900/30",
    borderColor: "border-green-200/50 dark:border-green-800/30",
    description:
      "Development tools and workflows that enhance productivity and code quality.",
    skills: [
      {
        name: "Git",
        image: "./tech/git-original.svg",
        description:
          "Version control system for tracking changes and collaboration.",
      },
      {
        name: "VS Code",
        image: "./tech/vscode-original.svg",
        description: "Code editor with extensive extensions and customization.",
      },
      {
        name: "Figma",
        image: "./tech/figma-original.svg",
        description: "Collaborative design tool for UI/UX prototyping.",
      },
      {
        name: "Postman",
        image: "./tech/postman-original.svg",
        description: "API testing and documentation platform.",
      },
      {
        name: "Chrome DevTools",
        image: "./tech/chrome-devtools-original.svg",
        description: "Web development and debugging tools built into Chrome.",
      },
    ],
  },
  {
    id: "design",
    category: "UI/UX Design",
    icon: <Palette className="w-5 h-5" />,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-100/50 dark:bg-emerald-900/30",
    borderColor: "border-emerald-200/50 dark:border-emerald-800/30",
    description:
      "Creating intuitive and visually appealing user experiences with design principles.",
    skills: [
      {
        name: "Responsive Design",
        image: "./tech/responsive-design-original.svg",
        description:
          "Creating layouts that work seamlessly across all device sizes.",
      },
      {
        name: "UI/UX Principles",
        image: "./tech/uiux-original.svg",
        description:
          "Applying design principles for intuitive user experiences.",
      },
      {
        name: "Design Systems",
        image: "./tech/system-design-original.svg",
        description:
          "Creating consistent design languages and component libraries.",
      },
      {
        name: "Accessibility",
        image: "./tech/accessibility-original.svg",
        description:
          "Ensuring applications are usable by people with disabilities.",
      },
    ],
  },
  {
    id: "testing",
    category: "Testing & QA",
    icon: <Shield className="w-5 h-5" />,
    color: "text-lime-600 dark:text-lime-400",
    bgColor: "bg-lime-100/50 dark:bg-lime-900/30",
    borderColor: "border-lime-200/50 dark:border-lime-800/30",
    description:
      "Ensuring code quality and application reliability through comprehensive testing.",
    skills: [
      {
        name: "Jest",
        image: "./tech/jest-original.svg",
        description:
          "JavaScript testing framework for unit and integration tests.",
      },
      {
        name: "React Testing Library",
        image: "./tech/react-testing-original.svg",
        description: "Testing React components with a focus on user behavior.",
      },
      {
        name: "Cypress",
        image: "./tech/cypress-original.svg",
        description: "End-to-end testing framework for web applications.",
      },
      {
        name: "Unit Testing",
        image: "./tech/speedtest-original.svg",
        description:
          "Testing individual functions and components in isolation.",
      },
      {
        name: "Integration Testing",
        image: "./tech/speedtest-original.svg",
        description:
          "Testing how different parts of the application work together.",
      },
      {
        name: "Debugging",
        image: "./tech/debug-original.svg",
        description: "Identifying and fixing issues in code and applications.",
      },
    ],
  },
];

const developmentApproach: ApproachItem[] = [
  {
    title: "Clean Code",
    desc: "Emphasizing readability and maintainability",
    icon: <Code className="w-5 h-5 text-green-600 dark:text-green-400" />,
    color: "bg-gradient-to-r from-green-500 to-green-600",
  },
  {
    title: "Performance",
    desc: "Optimized solutions for speed and efficiency",
    icon: <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    color: "bg-gradient-to-r from-emerald-500 to-emerald-600",
  },
  {
    title: "Responsive Design",
    desc: "Flawless experience across all devices",
    icon: <Smartphone className="w-5 h-5 text-lime-600 dark:text-lime-400" />,
    color: "bg-gradient-to-r from-lime-500 to-lime-600",
  },
  {
    title: "Security",
    desc: "Built with data protection in mind",
    icon: <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />,
    color: "bg-gradient-to-r from-green-500 to-green-600",
  },
  {
    title: "Testing",
    desc: "Comprehensive test coverage",
    icon: <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    color: "bg-gradient-to-r from-emerald-500 to-emerald-600",
  },
  {
    title: "DevOps",
    desc: "CI/CD and cloud deployment",
    icon: <GitBranch className="w-5 h-5 text-lime-600 dark:text-lime-400" />,
    color: "bg-gradient-to-r from-lime-500 to-lime-600",
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

// Simplified skill card component
const SkillCard = ({ category }: { category: SkillCategory; index: number }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 md:p-5 border border-slate-200 dark:border-slate-700 h-full">
      <div className="flex flex-col sm:flex-row items-center sm:items-start mb-4">
        <div
          className={`p-2 rounded-lg ${category.bgColor} mb-3 sm:mb-0 sm:mr-4 flex-shrink-0`}
        >
          <div className={category.color}>{category.icon}</div>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
            {category.category}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {category.description}
          </p>
        </div>
      </div>
      <div className="space-y-3">
        {category.skills.map((skill, skillIndex) => (
          <div key={skillIndex} className="flex items-start space-x-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white dark:bg-slate-700 shadow-sm">
              <Image
                src={skill.image}
                alt={skill.name}
                width={40}
                height={40}
                className="w-full h-full object-contain p-1.5"
                loading="lazy"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-sm md:text-base font-semibold text-slate-900 dark:text-white block">
                {skill.name}
              </span>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                {skill.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Simplified approach card component
const ApproachCard = ({ item }: { item: ApproachItem; index: number }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 md:p-5 rounded-lg border border-slate-200 dark:border-slate-700 h-full">
      <div className="flex flex-col items-center text-center md:items-start md:text-left mb-3 gap-3">
        <div
          className={`p-2 rounded-lg ${item.color} text-white flex-shrink-0`}
        >
          {item.icon}
        </div>
        <h4 className="font-bold text-base md:text-lg text-slate-900 dark:text-white">
          {item.title}
        </h4>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300 text-center md:text-left">
        {item.desc}
      </p>
    </div>
  );
};

// Simplified tech item component
const TechItem = ({ tech }: { tech: TechImage }) => {
  return (
    <div className="flex flex-col items-center justify-center mx-1 sm:mx-2 md:mx-3 flex-shrink-0">
      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center rounded-lg bg-white dark:bg-slate-800 p-2 mb-2 shadow-sm border border-slate-200 dark:border-slate-700">
        <Image
          src={tech.image}
          alt={tech.name}
          width={64}
          height={64}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
      <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
        {tech.name}
      </span>
    </div>
  );
};

export default function SkillsPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter skills based on active tab
  const filteredSkills =
    activeTab === "all"
      ? skills
      : skills.filter((category) => category.id === activeTab);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 dark:from-slate-900 dark:via-green-900/20 dark:to-emerald-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-300">Loading...</p>
        </div>
      </div>
    );
  }

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen py-10 bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 dark:from-slate-900 dark:via-green-900/20 dark:to-emerald-900/20">
      {/* Simplified background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            color: theme === "dark" ? "#4b5563" : "#d1d5db",
          }}
        />
      </div>
      
      {/* Single subtle background element */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-green-200/10 dark:bg-green-800/10 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-16">
        {/* Hero section */}
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="text-center mb-10 md:mb-12"
        >
          <div className="flex flex-col items-center justify-center mb-4 md:mb-6">
            <div className="bg-green-500 p-2 rounded-full mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
              Skills & Expertise
            </h1>
          </div>
          <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-green-600 to-emerald-700 dark:from-green-400 dark:to-emerald-500 mx-auto mb-4 md:mb-6 rounded-full" />
          <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 max-w-3xl mx-auto font-medium px-4">
            As a{" "}
            <span className="text-green-600 dark:text-green-400 font-semibold">
              Full Stack Developer
            </span>
            , I continuously expand my technical toolkit to build better solutions
          </p>
        </motion.div>
        {/* Category tabs */}
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-8 md:mb-12 w-full"
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full [&>div]:w-full"
          >
            <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 w-full gap-1.5 sm:gap-2 bg-white dark:bg-slate-800 rounded-xl p-1.5 md:p-2 shadow border border-slate-200 dark:border-slate-700">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-xs sm:text-sm font-medium py-2 px-2 sm:px-3 rounded-lg w-full"
              >
                All Skills
              </TabsTrigger>
              {skills.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-xs sm:text-sm font-medium py-2 px-2 sm:px-3 rounded-lg w-full"
                >
                  {category.category.split(" ")[0]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>
        {/* Skills grid */}
        <motion.div 
          ref={skillsRef}
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20"
        >
          {filteredSkills.map((category, index) => (
            <SkillCard key={category.id} category={category} index={index} />
          ))}
        </motion.div>
        {/* Development approach */}
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-16 md:mb-20"
        >
          <div className="text-center mb-8 md:mb-12">
            <div className="flex flex-col items-center justify-center mb-4 md:mb-6">
              <div className="bg-green-500 p-2 rounded-full mb-4">
                <Lightbulb className="w-5 h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                My Development Approach
              </h2>
            </div>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto px-4">
              I follow these principles to ensure high-quality, maintainable code and exceptional user experiences
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {developmentApproach.map((item, index) => (
              <ApproachCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </motion.div>
        {/* Technology stack showcase */}
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 md:p-8 border border-slate-200 dark:border-slate-700 mb-16 md:mb-20"
        >
          <div className="text-center mb-6 md:mb-8">
            <div className="flex flex-col items-center justify-center mb-4 md:mb-6">
              <div className="bg-green-500 p-2 rounded-full mb-4">
                <Cpu className="w-5 h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Technologies I Work With
              </h2>
            </div>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300">
              A comprehensive toolkit for modern web development
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6">
            {techImages.map((tech) => (
              <TechItem key={tech.name} tech={tech} />
            ))}
          </div>
        </motion.div>
        {/* Skills progression section */}
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-16 md:mb-20"
        >
          <div className="text-center mb-8 md:mb-12">
            <div className="flex flex-col items-center justify-center mb-4 md:mb-6">
              <div className="bg-green-500 p-2 rounded-full mb-4">
                <BookOpen className="w-5 h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                My Learning Journey
              </h2>
            </div>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto px-4">
              I&apos;m constantly expanding my skillset and staying up-to-date with the latest technologies
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow">
              <CardHeader className="pb-4">
                <CardTitle className="flex flex-col sm:flex-row items-center gap-3 text-lg md:text-xl">
                  <div className="bg-green-500 p-2 rounded-lg flex-shrink-0">
                    <BookOpen className="text-white" />
                  </div>
                  <span>Currently Learning</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Badge className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 text-xs">
                      Next.js 14
                    </Badge>
                    <Badge className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 text-xs">
                      Advanced TypeScript
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Badge className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 text-xs">
                      GraphQL
                    </Badge>
                    <Badge className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 text-xs">
                      AWS Services
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Badge className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 text-xs">
                      Docker
                    </Badge>
                    <Badge className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 text-xs">
                      Kubernetes
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow">
              <CardHeader className="pb-4">
                <CardTitle className="flex flex-col sm:flex-row items-center gap-3 text-lg md:text-xl">
                  <div className="bg-emerald-500 p-2 rounded-lg flex-shrink-0">
                    <Target className="text-white" />
                  </div>
                  <span>Next Goals</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Badge className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 text-xs">
                      Rust Programming
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Badge className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 text-xs">
                      Web3 Development
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Badge className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 text-xs">
                      Machine Learning
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Badge className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 text-xs">
                      Mobile Development
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow">
              <CardHeader className="pb-4">
                <CardTitle className="flex flex-col sm:flex-row items-center gap-3 text-lg md:text-xl">
                  <div className="bg-lime-500 p-2 rounded-lg flex-shrink-0">
                    <Award className="text-white" />
                  </div>
                  <span>Certifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Badge className="bg-lime-100 dark:bg-lime-900/50 text-lime-800 dark:text-lime-200 text-xs">
                      AWS Certified Developer
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Badge className="bg-lime-100 dark:bg-lime-900/50 text-lime-800 dark:text-lime-200 text-xs">
                      MongoDB Certified Developer
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Badge className="bg-lime-100 dark:bg-lime-900/50 text-lime-800 dark:text-lime-200 text-xs">
                      Google Cloud Professional
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
        {/* Call to action */}
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="text-center bg-white dark:bg-slate-800 rounded-xl shadow p-6 md:p-8 lg:p-10 border border-slate-200 dark:border-slate-700"
        >
          <div className="flex flex-col items-center justify-center mb-4 md:mb-6">
            <div className="bg-green-500 p-2 md:p-3 rounded-full mb-4">
              <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Let&apos;s Build Something Together
            </h2>
          </div>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-6 md:mb-8 px-4">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision
          </p>
          <Button className="bg-green-600 hover:bg-green-700 text-base md:text-lg px-6 md:px-8 py-2.5 md:py-3 rounded-full">
            Get In Touch
          </Button>
        </motion.div>
      </div>
    </div>
  );
}