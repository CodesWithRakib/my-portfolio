"use client";
import { motion } from "framer-motion";
import {
  Code,
  Gamepad2,
  Headphones,
  School,
  BookOpen,
  Target,
  Users,
  Zap,
  BarChart,
  Smartphone,
  Database,
  Palette,
  Terminal,
  BadgeCheck,
  Briefcase,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Download,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// TypeScript interfaces remain the same
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

interface SkillCategory {
  name: string;
  icon: React.ReactNode;
  skills: string[];
  color: string;
}

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

// Client-only component for Framer Motion animations
const MotionDiv = ({
  children,
  ...props
}: {
  children?: React.ReactNode;
  [key: string]: unknown;
}) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div {...props}>{children}</div>;
  }

  return <motion.div {...props}>{children}</motion.div>;
};

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTimelineItem, setActiveTimelineItem] = useState<number | null>(
    null
  );
  const [activeTab, setActiveTab] = useState("skills");

  // Fix hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to avoid hydration mismatch
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

  const personalInterests: PersonalInterest[] = [
    {
      icon: <Gamepad2 className="text-teal-600 dark:text-teal-400" />,
      title: "Passionate Gamer",
      content:
        "Love playing strategy games like Clash of Clans & Free Fire - they sharpen my problem-solving skills!",
      color:
        "from-teal-100/50 to-cyan-100/50 dark:from-teal-900/30 dark:to-cyan-900/30",
    },
    {
      icon: <Headphones className="text-blue-600 dark:text-blue-400" />,
      title: "Music Enthusiast",
      content:
        "Always listening to music while coding - it helps me focus and get into the flow state.",
      color:
        "from-blue-100/50 to-indigo-100/50 dark:from-blue-900/30 dark:to-indigo-900/30",
    },
    {
      icon: <Code className="text-cyan-600 dark:text-cyan-400" />,
      title: "Creator at Heart",
      content:
        "Enjoy turning ideas into real applications - the process from concept to deployment excites me.",
      color:
        "from-cyan-100/50 to-sky-100/50 dark:from-cyan-900/30 dark:to-sky-900/30",
    },
  ];

  const educationTimeline: EducationTimeline[] = [
    {
      year: "2021–2024",
      title: "HSC - Science | Hossenpur Degree College",
      content: "Built foundation in logical thinking & analytical approaches",
      color: "bg-teal-600 dark:bg-teal-700",
      icon: <School className="text-white" />,
    },
    {
      year: "Self-Taught",
      title: "Early Exploration",
      content: "Learned fundamentals from YouTube (Jonas, Apna College, Harry)",
      color: "bg-cyan-600 dark:bg-cyan-700",
      icon: <BookOpen className="text-white" />,
    },
    {
      year: "2024–Present",
      title: "Programming Hero Course",
      content: "Intensive full-stack MERN training with real-world projects",
      color: "bg-blue-600 dark:bg-blue-700",
      icon: <Code className="text-white" />,
    },
  ];

  const skillCategories: SkillCategory[] = [
    {
      name: "Frontend",
      icon: <Smartphone className="text-teal-600 dark:text-teal-400" />,
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Redux",
        "HTML5",
        "CSS3",
        "JavaScript",
      ],
      color: "text-teal-600 dark:text-teal-400",
    },
    {
      name: "Backend",
      icon: <Database className="text-cyan-600 dark:text-cyan-400" />,
      skills: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "Firebase",
        "REST APIs",
        "JWT",
        "GraphQL",
      ],
      color: "text-cyan-600 dark:text-cyan-400",
    },
    {
      name: "UI/UX",
      icon: <Palette className="text-blue-600 dark:text-blue-400" />,
      skills: [
        "Figma",
        "Responsive Design",
        "User Research",
        "Wireframing",
        "Prototyping",
      ],
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      name: "Tools",
      icon: <Terminal className="text-sky-600 dark:text-sky-400" />,
      skills: [
        "Git",
        "VS Code",
        "Chrome DevTools",
        "Postman",
        "Netlify",
        "Vercel",
      ],
      color: "text-sky-600 dark:text-sky-400",
    },
  ];

  const experienceItems: ExperienceItem[] = [
    {
      id: 1,
      role: "Full Stack Developer",
      company: "Programming Hero",
      period: "2024 - Present",
      description:
        "Developing full-stack applications using MERN stack, implementing responsive designs, and optimizing application performance.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    },
    {
      id: 2,
      role: "Freelance Web Developer",
      company: "Upwork",
      period: "2023 - 2024",
      description:
        "Created custom websites and web applications for clients, focusing on user experience and modern design principles.",
      technologies: ["React", "Next.js", "Firebase", "Tailwind CSS", "Figma"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-blue-50 dark:from-slate-900 dark:via-teal-900/20 dark:to-blue-900/20">
      {/* Simplified animated background with fewer elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <MotionDiv
          className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-teal-200/15 dark:bg-teal-800/10 blur-3xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Empty child element to satisfy children requirement */}
        </MotionDiv>
        <MotionDiv
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-200/15 dark:bg-blue-800/10 blur-3xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Empty child element to satisfy children requirement */}
        </MotionDiv>
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, currentColor 1px, transparent 1px),
                linear-gradient(to bottom, currentColor 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
              color: "#94a3b8",
            }}
          />
        </div>
        {/* Reduced number of floating elements */}
        {[...Array(3)].map((_, i) => (
          <MotionDiv
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.02, 0] }}
            transition={{
              duration: Math.random() * 30 + 30,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5,
            }}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background:
                i % 2 === 0
                  ? "radial-gradient(circle, rgba(20, 184, 166, 0.05) 0%, rgba(20, 184, 166, 0) 70%)"
                  : "radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0) 70%)",
              filter: "blur(60px)",
            }}
          >
            {/* Empty child element to satisfy children requirement */}
          </MotionDiv>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-16">
        {/* Simplified hero section with reduced animations */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <MotionDiv
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
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
            About Me
          </MotionDiv>
          <MotionDiv
            className="w-20 h-1 bg-gradient-to-r from-teal-600 to-blue-700 dark:from-teal-400 dark:to-blue-500 mx-auto mb-5 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Developer &{" "}
            <span className="text-teal-600 dark:text-teal-400 font-semibold">
              Creative Problem Solver
            </span>{" "}
            passionate about building impactful digital experiences
          </p>
        </MotionDiv>

        {/* Simplified personal introduction card */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-md border border-slate-200/50 dark:border-slate-700/50 overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="md:flex">
              <div className="md:w-1/3 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-700 opacity-90"></div>
                <div className="relative p-6 h-full flex flex-col items-center justify-center text-white">
                  <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-sm mb-5 overflow-hidden border-4 border-white/30">
                    <div className="w-full h-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
                      <span className="text-4xl font-bold">CR</span>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold mb-2">CodesWithRakib</h2>
                  <p className="text-teal-100 mb-4">Full Stack Developer</p>
                  <div className="flex gap-2 flex-wrap justify-center">
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border-white/30"
                    >
                      MERN Stack
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border-white/30"
                    >
                      TypeScript
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border-white/30"
                    >
                      UI/UX
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3 p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <span>Hello, I&apos;m Rakib</span>
                  <span className="inline-block w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                </h3>
                <div className="space-y-3 text-slate-600 dark:text-slate-300 mb-5">
                  <p className="leading-relaxed">
                    My coding journey started in 2021 when I first discovered
                    the{" "}
                    <span className="font-medium text-teal-600 dark:text-teal-400">
                      &quot;100 Days of Python&quot;
                    </span>{" "}
                    course on Udemy. Although I couldn&apos;t complete it at the
                    time, it planted a seed of curiosity that would eventually
                    blossom into a passion.
                  </p>
                  <p className="leading-relaxed">
                    Everything changed when I enrolled in the{" "}
                    <span className="font-medium text-teal-600 dark:text-teal-400">
                      Programming Hero
                    </span>{" "}
                    course, where I discovered my love for building complete web
                    applications.
                  </p>
                  <p className="leading-relaxed">
                    I thrive on creating elegant solutions to complex problems,
                    combining technical skills with creative thinking to deliver
                    exceptional user experiences.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-gradient-to-r from-teal-600 to-blue-700 hover:from-teal-700 hover:to-blue-800">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Hire Me
                  </Button>
                  <Button variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Me
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </MotionDiv>

        {/* Simplified tabs with reduced animations */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-1 shadow-md border border-slate-200/50 dark:border-slate-700/50">
              <TabsTrigger
                value="skills"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-blue-700 data-[state=active]:text-white text-sm"
              >
                Skills
              </TabsTrigger>
              <TabsTrigger
                value="experience"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-blue-700 data-[state=active]:text-white text-sm"
              >
                Experience
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-blue-700 data-[state=active]:text-white text-sm"
              >
                Education
              </TabsTrigger>
              <TabsTrigger
                value="interests"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-blue-700 data-[state=active]:text-white text-sm"
              >
                Interests
              </TabsTrigger>
            </TabsList>

            {/* Skills Tab with simplified cards */}
            <TabsContent value="skills" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {skillCategories.map((category, index) => (
                  <MotionDiv
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-md p-5 border border-slate-200/50 dark:border-slate-700/50 h-full flex flex-col transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-teal-100/50 dark:bg-teal-900/30">
                        {category.icon}
                      </div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                        {category.name}
                      </h3>
                    </div>
                    <div className="space-y-2 flex-grow">
                      {category.skills.map((skill, skillIndex) => (
                        <div
                          key={skillIndex}
                          className="flex items-center gap-2"
                        >
                          <BadgeCheck className={`h-4 w-4 ${category.color}`} />
                          <span className="text-slate-600 dark:text-slate-300">
                            {skill}
                          </span>
                        </div>
                      ))}
                    </div>
                  </MotionDiv>
                ))}
              </div>
            </TabsContent>

            {/* Experience Tab with simplified timeline */}
            <TabsContent value="experience" className="mt-6">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-400 to-blue-500 dark:from-teal-600 dark:to-blue-700"></div>
                <div className="space-y-6">
                  {experienceItems.map((item, index) => (
                    <MotionDiv
                      key={item.id}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-2 w-5 h-5 rounded-full bg-gradient-to-r from-teal-600 to-blue-700 dark:from-teal-500 dark:to-blue-600 z-10 border-4 border-white dark:border-slate-800"></div>
                      {/* Timeline content */}
                      <MotionDiv
                        className="ml-12 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-md p-5 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300"
                        whileHover={{ x: 3 }}
                      >
                        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                              {item.role}
                              <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            </h3>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mt-1">
                              <MapPin className="h-4 w-4" />
                              <span>{item.company}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 bg-teal-100/50 dark:bg-teal-900/30 px-3 py-1 rounded-full">
                            <Calendar className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                            <span className="text-sm font-medium text-teal-600 dark:text-teal-400">
                              {item.period}
                            </span>
                          </div>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.technologies.map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="outline"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </MotionDiv>
                    </MotionDiv>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Education Tab with simplified timeline */}
            <TabsContent value="education" className="mt-6">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-400 to-blue-500 dark:from-teal-600 dark:to-blue-700"></div>
                <div className="space-y-6">
                  {educationTimeline.map((item, index) => (
                    <MotionDiv
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      viewport={{ once: true }}
                      className="relative"
                      onMouseEnter={() => setActiveTimelineItem(index)}
                      onMouseLeave={() => setActiveTimelineItem(null)}
                    >
                      {/* Timeline dot */}
                      <MotionDiv
                        className={`absolute left-2 w-5 h-5 rounded-full ${item.color} z-10 border-4 border-white dark:border-slate-800 flex items-center justify-center`}
                        whileHover={{ scale: 1.1 }}
                        animate={
                          activeTimelineItem === index
                            ? { scale: 1.1 }
                            : { scale: 1 }
                        }
                      >
                        <MotionDiv
                          className="w-1 h-1 rounded-full bg-white"
                          animate={
                            activeTimelineItem === index
                              ? { scale: [1, 1.3, 1] }
                              : {}
                          }
                          transition={{
                            duration: 0.6,
                            repeat: activeTimelineItem === index ? Infinity : 0,
                          }}
                        />
                      </MotionDiv>
                      {/* Timeline content */}
                      <MotionDiv
                        className={`ml-12 p-5 rounded-lg border transition-all duration-300 ${
                          activeTimelineItem === index
                            ? "bg-gradient-to-r from-teal-50/50 to-blue-50/50 dark:from-teal-900/30 dark:to-blue-900/30 border-teal-200/50 dark:border-teal-700/50 shadow-lg"
                            : "bg-white/90 dark:bg-slate-800/90 border-slate-200/50 dark:border-slate-700/50 shadow-md"
                        }`}
                        whileHover={{ x: 3 }}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`p-2 rounded-lg ${item.color} flex-shrink-0`}
                          >
                            {item.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-slate-900 dark:text-white">
                                {item.title}
                              </h4>
                              <span className="text-xs px-2 py-1 rounded-full bg-white dark:bg-slate-800 border border-teal-200 dark:border-teal-700 text-teal-600 dark:text-teal-400">
                                {item.year}
                              </span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                              {item.content}
                            </p>
                          </div>
                        </div>
                      </MotionDiv>
                    </MotionDiv>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Interests Tab with simplified cards */}
            <TabsContent value="interests" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {personalInterests.map((item, index) => (
                  <MotionDiv
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-md p-5 border border-slate-200/50 dark:border-slate-700/50 h-full flex flex-col transition-all duration-300 hover:shadow-lg"
                  >
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-br ${item.color} mb-3 flex items-center justify-center`}
                    >
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 flex-grow leading-relaxed">
                      {item.content}
                    </p>
                  </MotionDiv>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </MotionDiv>

        {/* Simplified goals section */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-teal-50/50 to-blue-50/50 dark:from-teal-900/30 dark:to-blue-900/30 p-6 rounded-xl border border-teal-100/50 dark:border-teal-900/30 backdrop-blur-sm shadow-md">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <MotionDiv
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ repeat: Infinity, duration: 6 }} // Slower animation
                className="p-5 rounded-full bg-gradient-to-br from-teal-100/50 to-blue-100/50 dark:from-teal-900/30 dark:to-blue-900/30 shadow-sm"
              >
                <Target className="text-teal-600 dark:text-teal-400 w-14 h-14" />
              </MotionDiv>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  My Goals as a Full-Stack Developer
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
                  I&apos;m focused on mastering the complete development
                  lifecycle - from designing intuitive UIs to building scalable
                  backends. My aim is to create performant, accessible
                  applications that solve real problems while following best
                  practices in code quality and architecture.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <MotionDiv
                    whileHover={{ y: -3 }}
                    className="flex items-center gap-3 bg-white/80 dark:bg-slate-800/80 p-3 rounded-lg shadow transition-all duration-300 hover:shadow-md"
                  >
                    <Zap className="text-teal-600 dark:text-teal-400" />
                    <span className="font-medium text-slate-900 dark:text-white">
                      Performance
                    </span>
                  </MotionDiv>
                  <MotionDiv
                    whileHover={{ y: -3 }}
                    className="flex items-center gap-3 bg-white/80 dark:bg-slate-800/80 p-3 rounded-lg shadow transition-all duration-300 hover:shadow-md"
                  >
                    <Users className="text-teal-600 dark:text-teal-400" />
                    <span className="font-medium text-slate-900 dark:text-white">
                      User Experience
                    </span>
                  </MotionDiv>
                  <MotionDiv
                    whileHover={{ y: -3 }}
                    className="flex items-center gap-3 bg-white/80 dark:bg-slate-800/80 p-3 rounded-lg shadow transition-all duration-300 hover:shadow-md"
                  >
                    <BarChart className="text-teal-600 dark:text-teal-400" />
                    <span className="font-medium text-slate-900 dark:text-white">
                      Scalability
                    </span>
                  </MotionDiv>
                </div>
              </div>
            </div>
          </Card>
        </MotionDiv>

        {/* Simplified contact CTA */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            Let&apos;s Work Together
          </h3>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-5 leading-relaxed">
            I&apos;m always interested in new opportunities and exciting
            projects. Whether you have a question or just want to say hi, feel
            free to reach out!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-teal-600 to-blue-700 hover:from-teal-700 hover:to-blue-800 shadow-md"
            >
              <Mail className="mr-2 h-5 w-5" />
              Send Message
            </Button>
            <Button size="lg" variant="outline" className="shadow-sm">
              <Phone className="mr-2 h-5 w-5" />
              Call Me
            </Button>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}
