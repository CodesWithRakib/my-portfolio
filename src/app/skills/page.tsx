"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Lightbulb,
  Rocket,
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
    color: "text-teal-600 dark:text-teal-400",
    bgColor: "bg-teal-100/50 dark:bg-teal-900/30",
    borderColor: "border-teal-200/50 dark:border-teal-800/30",
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
    color: "text-cyan-600 dark:text-cyan-400",
    bgColor: "bg-cyan-100/50 dark:bg-cyan-900/30",
    borderColor: "border-cyan-200/50 dark:border-cyan-800/30",
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
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100/50 dark:bg-blue-900/30",
    borderColor: "border-blue-200/50 dark:border-blue-800/30",
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
    color: "text-sky-600 dark:text-sky-400",
    bgColor: "bg-sky-100/50 dark:bg-sky-900/30",
    borderColor: "border-sky-200/50 dark:border-sky-800/30",
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
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-100/50 dark:bg-indigo-900/30",
    borderColor: "border-indigo-200/50 dark:border-indigo-800/30",
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
    color: "text-violet-600 dark:text-violet-400",
    bgColor: "bg-violet-100/50 dark:bg-violet-900/30",
    borderColor: "border-violet-200/50 dark:border-violet-800/30",
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
    icon: <Code className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
    color: "bg-gradient-to-r from-teal-500 to-teal-600",
  },
  {
    title: "Performance",
    desc: "Optimized solutions for speed and efficiency",
    icon: <Zap className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
    color: "bg-gradient-to-r from-cyan-500 to-cyan-600",
  },
  {
    title: "Responsive Design",
    desc: "Flawless experience across all devices",
    icon: <Smartphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    color: "bg-gradient-to-r from-blue-500 to-blue-600",
  },
  {
    title: "Security",
    desc: "Built with data protection in mind",
    icon: <Shield className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
    color: "bg-gradient-to-r from-sky-500 to-sky-600",
  },
  {
    title: "Testing",
    desc: "Comprehensive test coverage",
    icon: <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    color: "bg-gradient-to-r from-indigo-500 to-indigo-600",
  },
  {
    title: "DevOps",
    desc: "CI/CD and cloud deployment",
    icon: (
      <GitBranch className="w-5 h-5 text-violet-600 dark:text-violet-400" />
    ),
    color: "bg-gradient-to-r from-violet-500 to-violet-600",
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

// Enhanced skill card component
const SkillCard = ({
  category,
}: {
  category: SkillCategory;
  index: number;
}) => {
  return (
    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-lg p-4 md:p-6 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
      <div className="flex flex-col sm:flex-row items-center sm:items-start mb-4 md:mb-5">
        <div
          className={`p-2 md:p-3 rounded-xl ${category.bgColor} mb-3 sm:mb-0 sm:mr-4 shadow-md flex-shrink-0`}
        >
          <div className={category.color}>{category.icon}</div>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
            {category.category}
          </h3>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">
            {category.description}
          </p>
        </div>
      </div>
      <div className="space-y-3 md:space-y-4">
        {category.skills.map((skill, skillIndex) => (
          <div key={skillIndex} className="flex items-start space-x-3 group">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white dark:bg-slate-800 shadow-md group-hover:shadow-lg transition-shadow duration-300">
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
              <span className="text-sm md:text-base font-semibold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300 truncate block">
                {skill.name}
              </span>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                {skill.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Enhanced approach card component
const ApproachCard = ({ item }: { item: ApproachItem; index: number }) => {
  return (
    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden h-full">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-blue-500"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-400 to-transparent rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <div className="flex flex-col items-center text-center md:items-start md:text-left mb-4 gap-3 relative z-10">
        <div
          className={`p-2 md:p-3 rounded-xl ${item.color} text-white group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0`}
        >
          {item.icon}
        </div>
        <h4 className="font-bold text-base md:text-lg text-slate-900 dark:text-white">
          {item.title}
        </h4>
      </div>
      <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 text-center md:text-left relative z-10">
        {item.desc}
      </p>
      <div className="mt-3 md:mt-4 flex items-center justify-center md:justify-start text-slate-600 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 mr-2 text-teal-500" />
        <span className="text-xs md:text-sm font-medium">
          Industry best practice
        </span>
      </div>
    </div>
  );
};

// Enhanced tech item component
const TechItem = ({ tech }: { tech: TechImage }) => {
  return (
    <div className="flex flex-col items-center justify-center mx-1 sm:mx-2 md:mx-3 lg:mx-4 flex-shrink-0 group">
      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800/50 p-2 mb-2 md:mb-3 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-teal-50 group-hover:to-blue-50 dark:group-hover:from-teal-900/20 dark:group-hover:to-blue-900/20 group-hover:scale-110 shadow-md group-hover:shadow-lg border border-slate-200/50 dark:border-slate-700/50">
        <Image
          src={tech.image}
          alt={tech.name}
          width={64}
          height={64}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
      <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
        {tech.name}
      </span>
    </div>
  );
};

export default function SkillsPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-blue-50 dark:from-slate-900 dark:via-teal-900/20 dark:to-blue-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 bg-gradient-to-br from-slate-50 via-teal-50 to-blue-50 dark:from-slate-900 dark:via-teal-900/20 dark:to-blue-900/20">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
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

      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full bg-teal-200/20 dark:bg-teal-800/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full bg-blue-200/20 dark:bg-blue-800/10 blur-3xl" />
        <div className="absolute top-1/3 right-1/3 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full bg-purple-200/20 dark:bg-purple-800/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-16 lg:py-20">
        {/* Hero section */}
        <div className="text-center mb-10 md:mb-12 lg:mb-16">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4 md:mb-6">
            <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-1.5 sm:p-2 rounded-full mb-3 sm:mb-0 sm:mr-4">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent">
              Skills & Expertise
            </h1>
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-1.5 sm:p-2 rounded-full mt-3 sm:mt-0 sm:ml-4">
              <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </div>
          <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-teal-600 to-blue-700 dark:from-teal-400 dark:to-blue-500 mx-auto mb-4 md:mb-6 rounded-full" />
          <p className="text-base md:text-lg lg:text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto font-medium px-4">
            As a{" "}
            <span className="text-teal-600 dark:text-teal-400 font-semibold">
              Full Stack Developer
            </span>
            , I continuously expand my technical toolkit to build better
            solutions
          </p>
        </div>

        {/* Category tabs */}
        <div className="mb-8 md:mb-12 w-full">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full [&>div]:w-full"
          >
            <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 w-full gap-1.5 sm:gap-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-1.5 md:p-2 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-blue-700 data-[state=active]:text-white text-xs sm:text-sm font-medium py-2 px-2 sm:px-3 rounded-lg transition-all duration-300 w-full"
              >
                All Skills
              </TabsTrigger>
              {skills.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-blue-700 data-[state=active]:text-white text-xs sm:text-sm font-medium py-2 px-2 sm:px-3 rounded-lg transition-all duration-300 w-full"
                >
                  {category.category.split(" ")[0]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
          {filteredSkills.map((category, index) => (
            <SkillCard key={category.id} category={category} index={index} />
          ))}
        </div>

        {/* Development approach */}
        <div className="mb-16 md:mb-20">
          <div className="text-center mb-8 md:mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-4 md:mb-6">
              <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-1.5 sm:p-2 rounded-full mb-3 sm:mb-0 sm:mr-3">
                <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                My Development Approach
              </h2>
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-1.5 sm:p-2 rounded-full mt-3 sm:mt-0 sm:ml-3">
                <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto px-4">
              I follow these principles to ensure high-quality, maintainable
              code and exceptional user experiences
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {developmentApproach.map((item, index) => (
              <ApproachCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Technology stack showcase */}
        <div className="bg-gradient-to-br from-white/90 to-teal-50/90 dark:from-slate-800/90 dark:to-teal-900/30 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-teal-100/50 dark:border-teal-900/30 overflow-hidden mb-16 md:mb-20">
          <div className="text-center mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-4 md:mb-6">
              <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-1.5 sm:p-2 rounded-full mb-3 sm:mb-0 sm:mr-3">
                <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Technologies I Work With
              </h2>
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-1.5 sm:p-2 rounded-full mt-3 sm:mt-0 sm:ml-3">
                <Code className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300">
              A comprehensive toolkit for modern web development
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6 lg:gap-8">
            {techImages.map((tech) => (
              <TechItem key={tech.name} tech={tech} />
            ))}
          </div>
        </div>

        {/* Skills progression section */}
        <div className="mb-16 md:mb-20">
          <div className="text-center mb-8 md:mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-4 md:mb-6">
              <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-1.5 sm:p-2 rounded-full mb-3 sm:mb-0 sm:mr-3">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                My Learning Journey
              </h2>
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-1.5 sm:p-2 rounded-full mt-3 sm:mt-0 sm:ml-3">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto px-4">
              I&apos;m constantly expanding my skillset and staying up-to-date
              with the latest technologies
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <Card className="bg-gradient-to-br from-white/90 to-teal-50/90 dark:from-slate-800/90 dark:to-teal-900/30 backdrop-blur-sm border border-teal-100/50 dark:border-teal-900/30 shadow-lg overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="flex flex-col sm:flex-row items-center gap-3 text-lg md:text-xl">
                  <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-2 rounded-lg flex-shrink-0">
                    <BookOpen className="text-white" />
                  </div>
                  <span>Currently Learning</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Badge className="bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-200 hover:bg-teal-200 dark:hover:bg-teal-900/70 text-xs">
                      Next.js 14
                    </Badge>
                    <Badge className="bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-200 hover:bg-teal-200 dark:hover:bg-teal-900/70 text-xs">
                      Advanced TypeScript
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Badge className="bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-200 hover:bg-teal-200 dark:hover:bg-teal-900/70 text-xs">
                      GraphQL
                    </Badge>
                    <Badge className="bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-200 hover:bg-teal-200 dark:hover:bg-teal-900/70 text-xs">
                      AWS Services
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Badge className="bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-200 hover:bg-teal-200 dark:hover:bg-teal-900/70 text-xs">
                      Docker
                    </Badge>
                    <Badge className="bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-200 hover:bg-teal-200 dark:hover:bg-teal-900/70 text-xs">
                      Kubernetes
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-white/90 to-blue-50/90 dark:from-slate-800/90 dark:to-blue-900/30 backdrop-blur-sm border border-blue-100/50 dark:border-blue-900/30 shadow-lg overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="flex flex-col sm:flex-row items-center gap-3 text-lg md:text-xl">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg flex-shrink-0">
                    <Target className="text-white" />
                  </div>
                  <span>Next Goals</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Badge className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-900/70 text-xs">
                      Rust Programming
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Badge className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-900/70 text-xs">
                      Web3 Development
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Badge className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-900/70 text-xs">
                      Machine Learning
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Badge className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-900/70 text-xs">
                      Mobile Development
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-white/90 to-purple-50/90 dark:from-slate-800/90 dark:to-purple-900/30 backdrop-blur-sm border border-purple-100/50 dark:border-purple-900/30 shadow-lg overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="flex flex-col sm:flex-row items-center gap-3 text-lg md:text-xl">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-2 rounded-lg flex-shrink-0">
                    <Award className="text-white" />
                  </div>
                  <span>Certifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Badge className="bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 hover:bg-purple-200 dark:hover:bg-purple-900/70 text-xs">
                      AWS Certified Developer
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Badge className="bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 hover:bg-purple-200 dark:hover:bg-purple-900/70 text-xs">
                      MongoDB Certified Developer
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Badge className="bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 hover:bg-purple-200 dark:hover:bg-purple-900/70 text-xs">
                      Google Cloud Professional
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center bg-gradient-to-br from-white/90 to-teal-50/90 dark:from-slate-800/90 dark:to-teal-900/30 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 lg:p-10 border border-teal-100/50 dark:border-teal-900/30">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4 md:mb-6">
            <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-2 md:p-3 rounded-full mb-3 sm:mb-0 sm:mr-4">
              <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Let&apos;s Build Something Together
            </h2>
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 md:p-3 rounded-full mt-3 sm:mt-0 sm:ml-4">
              <Rocket className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
          </div>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-6 md:mb-8 px-4">
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision
          </p>
          <Button className="bg-gradient-to-r from-teal-600 to-blue-700 hover:from-teal-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 text-base md:text-lg px-6 md:px-8 py-2.5 md:py-3 rounded-full">
            Get In Touch
          </Button>
        </div>
      </div>
    </div>
  );
}
