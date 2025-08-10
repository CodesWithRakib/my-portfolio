"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiEye,
  FiSearch,
  FiX,
  FiFilter,
  FiCalendar,
  FiUser,
  FiClock,
  FiUsers,
  FiTag,
  FiAward,
  FiStar,
  FiCode,
  FiInfo,
  FiCheck,
  FiCheckCircle,
  FiCpu,
} from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileBarChart2 } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";

// TypeScript interfaces remain the same
interface Project {
  id: number;
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  images: string[];
  githubClient: string;
  githubServer: string;
  liveLink: string;
  category: string;
  date: string;
  client: string;
  tags: string[];
  duration: string;
  teamSize: number;
  users: number;
  testimonials: {
    quote: string;
    author: string;
    role: string;
  }[];
  awards: {
    title: string;
    organization: string;
    year: string;
  }[];
}

interface ProjectDetailsModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

// Project data remains the same
const projects: Project[] = [
  {
    id: 1,
    title: "LifeFlow – Blood Donation App",
    description:
      "Role-based blood donation app with dashboards, donation management, and a blogging system.",
    features: [
      "Role-based dashboard for Admin, Volunteer, Donor",
      "Create/view/manage donation requests with status updates",
      "Blog system with JoditEditor for publishing",
      "Secure Firebase authentication and JWT authorization",
    ],
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Firebase",
      "JWT",
    ],
    images: [
      "/projects/lifeflow/home_banner.png",
      "/projects/lifeflow/admin_dashboard.png",
      "/projects/lifeflow/donation_requests.png",
      "/projects/lifeflow/donation_request_management.png",
      "/projects/lifeflow/analytics_page.png",
      "/projects/lifeflow/blog_page.png",
    ],
    githubClient:
      "https://github.com/CodesWithRakib/lifeflow-blood-donation-client",
    githubServer:
      "https://github.com/CodesWithRakib/lifeflow-blood-donation-server",
    liveLink: "https://blood-donation-full-stack.web.app/",
    category: "fullstack",
    date: "2024",
    client: "Nonprofit Health Org",
    tags: ["Healthcare", "Donation", "React", "Node.js"],
    duration: "2.5 months",
    teamSize: 3,
    users: 3000,
    testimonials: [
      {
        quote:
          "LifeFlow made managing donation drives incredibly easy and organized. An essential tool for our operations.",
        author: "Dr. Anwar Hossain",
        role: "Director, Nonprofit Health Org",
      },
    ],
    awards: [],
  },
  {
    id: 2,
    title: "Globira – B2B Wholesale Marketplace",
    description:
      "A full-stack B2B platform enabling wholesale transactions with admin, seller, and buyer dashboards.",
    features: [
      "Secure authentication using Firebase & JWT",
      "Role-based dashboard for admin, seller, and buyer",
      "Product CRUD with image upload, search, filter, and pagination",
      "Review system (1 review/user), responsive UI, dark mode",
    ],
    technologies: [
      "React 19",
      "Tailwind CSS v4",
      "Firebase",
      "Express.js",
      "MongoDB",
      "Cloudinary",
      "JWT",
      "Vercel",
    ],
    images: [
      "/projects/globira/home_banner.png",
      "/projects/globira/all_products.png",
      "/projects/globira/my_products.png",
      "/projects/globira/add_product.png",
      "/projects/globira/category_products.png",
    ],
    githubClient: "https://github.com/CodesWithRakib/globira-client-side",
    githubServer: "https://github.com/CodesWithRakib/globira-server-side",
    liveLink: "https://b11a11-globira-site.web.app/",
    category: "fullstack",
    date: "2023",
    client: "Tech Solutions Inc.",
    tags: ["E-commerce", "B2B", "Marketplace", "React", "Node.js"],
    duration: "3 months",
    teamSize: 4,
    users: 5000,
    testimonials: [
      {
        quote:
          "Globira transformed our wholesale operations. The platform is intuitive and has significantly improved our efficiency.",
        author: "Sarah Johnson",
        role: "Operations Director at Tech Solutions",
      },
    ],
    awards: [
      {
        title: "Best B2B Platform",
        organization: "Tech Innovation Awards",
        year: "2023",
      },
    ],
  },
  {
    id: 3,
    title: "Green Nest – Plant Care Tracker",
    description:
      "A CRUD-based application to manage plant care and visually monitor growth.",
    features: [
      "User auth with Firebase (Email/Google)",
      "CRUD operations for plant data",
      "Image uploads & personalized watering schedules",
      "Responsive dark/light UI with sorting & alerts",
    ],
    technologies: [
      "React",
      "Tailwind CSS",
      "Firebase",
      "Express.js",
      "MongoDB",
      "Date-fns",
      "React Toastify",
      "SweetAlert2",
    ],
    images: [
      "/projects/green-nest/dashboard.png",
      "/projects/green-nest/plant_details.png",
      "/projects/green-nest/add_plant.png",
      "/projects/green-nest/all_plants.png",
      "/projects/green-nest/contact_page.png",
    ],
    githubClient: "https://github.com/CodesWithRakib/plant-care-client-side",
    githubServer: "https://github.com/CodesWithRakib/plant-care-server-side",
    liveLink: "https://green-nest-plant-care-tracker.web.app/",
    category: "fullstack",
    date: "2023",
    client: "Green Wellness Group",
    tags: ["Plants", "CRUD", "Personal Tracker", "React", "Node.js"],
    duration: "2 months",
    teamSize: 3,
    users: 2000,
    testimonials: [],
    awards: [],
  },
];

// Optimized Project Details Modal
const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="w-full max-w-[min(1200px,95vw)] max-h-[95vh] overflow-y-auto rounded-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-0">
            <DialogHeader className="px-6 pt-6">
              <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                {project.title}
                <Badge
                  variant="outline"
                  className="text-base py-1.5 px-3.5 border-2"
                >
                  {project.category}
                </Badge>
              </DialogTitle>
              <DialogDescription className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mt-2">
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 px-3 py-1.5 rounded-full">
                  <FiCalendar className="text-teal-500" />
                  <span>{project.date}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 px-3 py-1.5 rounded-full">
                  <FiUser className="text-teal-500" />
                  <span>{project.client}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 px-3 py-1.5 rounded-full">
                  <FiClock className="text-teal-500" />
                  <span>{project.duration}</span>
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-8 px-6 pb-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Image Gallery */}
                <div className="rounded-xl overflow-hidden">
                  <Swiper
                    spaceBetween={10}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[Navigation, Pagination, Autoplay, Thumbs]}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 7000, disableOnInteraction: false }}
                    className="rounded-xl shadow-lg h-[400px]"
                  >
                    {project.images.map((img, i) => (
                      <SwiperSlide key={i}>
                        <div className="relative h-full w-full bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden">
                          <Image
                            src={img}
                            alt={`${project.title} screenshot ${i + 1}`}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                            {i + 1}/{project.images.length}
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[Thumbs]}
                    className="thumbs-swiper mt-4 h-20"
                  >
                    {project.images.map((img, i) => (
                      <SwiperSlide key={i}>
                        <div className="h-full w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-teal-500 transition-all">
                          <Image
                            src={img}
                            alt={`${project.title} thumbnail ${i + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                {/* Project Overview */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-3 text-lg">
                    <div className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-lg">
                      <FiInfo className="text-teal-500" />
                    </div>
                    Project Overview
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                    {project.description}
                  </p>
                </div>
                {/* Key Features */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-3 text-lg">
                    <div className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-lg">
                      <FiTag className="text-teal-500" />
                    </div>
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-teal-500 dark:text-teal-400 mr-3 mt-1 text-lg">
                          ▹
                        </span>
                        <span className="text-slate-600 dark:text-slate-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Testimonials */}
                {project.testimonials.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-3 text-lg">
                      <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg">
                        <FiStar className="text-amber-500" />
                      </div>
                      Testimonials
                    </h3>
                    <div className="space-y-3">
                      {project.testimonials.map((testimonial, i) => (
                        <Card
                          key={i}
                          className="bg-teal-50 dark:bg-teal-900/20 border-teal-100 dark:border-teal-900/30 shadow-sm"
                        >
                          <CardContent className="p-5">
                            <div className="flex gap-4">
                              <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-full h-fit">
                                <FiUser className="text-teal-500 text-xl" />
                              </div>
                              <div>
                                <p className="text-slate-600 dark:text-slate-300 italic mb-3 text-base">
                                  &quot;{testimonial.quote}&quot;
                                </p>
                                <p className="font-medium text-slate-900 dark:text-white">
                                  {testimonial.author}
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                  {testimonial.role}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/* Right Column */}
              <div className="space-y-6">
                {/* Technologies */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-3 text-lg">
                    <div className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-lg">
                      <FiCode className="text-teal-500" />
                    </div>
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-sm py-2 px-3 rounded-lg border-2"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                {/* Project Statistics */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-3 text-lg">
                    <div className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-lg">
                      <FileBarChart2 className="text-teal-500" />
                    </div>
                    Project Statistics
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Card className="bg-slate-100 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-lg">
                            <FiClock className="text-teal-500" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Duration
                            </p>
                            <p className="font-semibold text-slate-900 dark:text-white text-lg">
                              {project.duration}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-slate-100 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-lg">
                            <FiUsers className="text-teal-500" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Team Size
                            </p>
                            <p className="font-semibold text-slate-900 dark:text-white text-lg">
                              {project.teamSize} people
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-slate-100 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-lg">
                            <FiUser className="text-teal-500" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Users
                            </p>
                            <p className="font-semibold text-slate-900 dark:text-white text-lg">
                              {project.users.toLocaleString()}+
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-slate-100 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-lg">
                            <FiTag className="text-teal-500" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Features
                            </p>
                            <p className="font-semibold text-slate-900 dark:text-white text-lg">
                              {project.features.length}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                {/* Awards */}
                {project.awards.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-3 text-lg">
                      <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg">
                        <FiAward className="text-amber-500" />
                      </div>
                      Awards
                    </h3>
                    <div className="space-y-3">
                      {project.awards.map((award, i) => (
                        <Card
                          key={i}
                          className="bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-900/30 shadow-sm"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-lg">
                                <FiAward className="text-amber-500 text-xl" />
                              </div>
                              <div>
                                <p className="font-medium text-slate-900 dark:text-white">
                                  {award.title}
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                  {award.organization}, {award.year}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
                {/* Project Links */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-3 text-lg">
                    <div className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-lg">
                      <FiExternalLink className="text-teal-500" />
                    </div>
                    Project Links
                  </h3>
                  <div className="space-y-3">
                    {project.githubClient && (
                      <Button
                        variant="outline"
                        className="w-full justify-start h-12 text-base gap-3 px-5"
                        asChild
                      >
                        <a
                          href={project.githubClient}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FiGithub className="text-lg" />
                          <span>Client Code</span>
                        </a>
                      </Button>
                    )}
                    {project.githubServer && (
                      <Button
                        variant="outline"
                        className="w-full justify-start h-12 text-base gap-3 px-5"
                        asChild
                      >
                        <a
                          href={project.githubServer}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FiGithub className="text-lg" />
                          <span>Server Code</span>
                        </a>
                      </Button>
                    )}
                    {project.liveLink && (
                      <Button
                        className="w-full justify-start h-12 text-base gap-3 px-5 bg-gradient-to-r from-teal-600 to-blue-700 hover:from-teal-700 hover:to-blue-800 shadow-md"
                        asChild
                      >
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FiExternalLink className="text-lg" />
                          <span>Live Demo</span>
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

// Optimized Project Card
const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="group h-full flex flex-col overflow-hidden rounded-xl border border-slate-200/70 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 shadow-sm hover:shadow-md transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image preview with hover effect */}
        <div className="relative h-48 sm:h-52 overflow-hidden">
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-200">{project.category}</p>
              </div>
              <Badge variant="outline" className="bg-white/90 text-slate-800">
                View Project
              </Badge>
            </div>
          </div>
        </div>
        {/* Card Content */}
        <div className="flex-1 flex flex-col p-5 sm:p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white line-clamp-1">
                {project.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {project.date}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  •
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {project.duration}
                </span>
              </div>
            </div>
            <motion.div
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Badge
                variant="secondary"
                className="bg-teal-100/80 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200"
              >
                {project.tags[0]}
              </Badge>
            </motion.div>
          </div>
          {/* Description */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
            {project.description}
          </p>
          {/* Key Features */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <FiCheckCircle className="text-teal-500 flex-shrink-0" />
              <span>Key Features</span>
            </h4>
            <ul className="space-y-1.5">
              {project.features.slice(0, 2).map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start text-xs sm:text-sm text-slate-600 dark:text-slate-300"
                >
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    <FiCheck className="size-3.5" />
                  </span>
                  <span className="flex-1">{feature}</span>
                </li>
              ))}
              {project.features.length > 2 && (
                <li className="text-xs text-slate-500 dark:text-slate-400">
                  +{project.features.length - 2} more features
                </li>
              )}
            </ul>
          </div>
          {/* Technologies */}
          <div className="mt-auto">
            <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <FiCpu className="text-teal-500 flex-shrink-0" />
              <span>Technologies</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((tech, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="text-xs px-2 py-1 bg-slate-50 dark:bg-slate-700/50"
                >
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 4 && (
                <Badge
                  variant="outline"
                  className="text-xs px-2 py-1 bg-slate-50 dark:bg-slate-700/50"
                >
                  +{project.technologies.length - 4}
                </Badge>
              )}
            </div>
          </div>
          {/* Footer Buttons */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/50">
            <div className="flex gap-2">
              {project.githubClient && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 rounded-full"
                  asChild
                >
                  <a
                    href={project.githubClient}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub repository"
                  >
                    <FiGithub className="size-4" />
                  </a>
                </Button>
              )}
              {project.liveLink && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 rounded-full"
                  asChild
                >
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Live demo"
                  >
                    <FiExternalLink className="size-4" />
                  </a>
                </Button>
              )}
            </div>
            <Button
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="h-8 px-4 text-sm font-medium"
              variant="outline"
            >
              <FiEye className="mr-2 size-3.5" />
              View Details
            </Button>
          </div>
        </div>
      </motion.div>
      <ProjectDetailsModal
        project={project}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

// Main Projects Page Component
export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags from projects
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    projects.forEach((project) => {
      project.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, []);

  // Filter projects based on active filter, search query, and selected tag
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Filter by category
      if (activeFilter !== "all" && project.category !== activeFilter) {
        return false;
      }
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesDescription = project.description
          .toLowerCase()
          .includes(query);
        const matchesTechnology = project.technologies.some((tech) =>
          tech.toLowerCase().includes(query)
        );
        if (!matchesTitle && !matchesDescription && !matchesTechnology) {
          return false;
        }
      }
      // Filter by selected tag
      if (selectedTag && !project.tags.includes(selectedTag)) {
        return false;
      }
      return true;
    });
  }, [activeFilter, searchQuery, selectedTag]);

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "fullstack", label: "Full Stack" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-blue-50 dark:from-slate-900 dark:via-teal-900/20 dark:to-blue-900/20">
      {/* Simplified Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-teal-200/15 dark:bg-teal-800/10 blur-3xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-200/15 dark:bg-blue-800/10 blur-3xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        />
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
        {[...Array(4)].map((_, i) => (
          <motion.div
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
                  ? "radial-gradient(circle, rgba(20, 184, 166, 0.08) 0%, rgba(20, 184, 166, 0) 70%)"
                  : "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0) 70%)",
              filter: "blur(60px)",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-700 dark:from-teal-400 dark:to-blue-500">
              Projects
            </span>
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-1 bg-gradient-to-r from-teal-600 to-blue-700 dark:from-teal-400 dark:to-blue-500 mx-auto mb-6 transform origin-left"
          />
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Selected work showcasing my full-stack development capabilities
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="relative mb-6">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <Input
              type="text"
              placeholder="Search projects by name, technology, or description..."
              className="w-full pl-12 pr-10 py-3 bg-white dark:bg-slate-800/80 backdrop-blur-sm rounded-lg border border-slate-200/50 dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-500 focus:border-transparent shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                onClick={() => setSearchQuery("")}
              >
                <FiX />
              </button>
            )}
          </div>

          <Tabs
            value={activeFilter}
            onValueChange={setActiveFilter}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-slate-800/80 backdrop-blur-sm rounded-lg border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-blue-700 data-[state=active]:text-white text-sm"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-3 flex items-center gap-1">
              <FiFilter className="text-teal-500" />
              Filter by tags
            </h3>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedTag === null ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedTag(null)}
              >
                All Tags
              </Badge>
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-8 text-slate-600 dark:text-slate-400"
        >
          Showing {filteredProjects.length} of {projects.length} projects
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-full text-center py-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50"
            >
              <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">
                No projects found
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
