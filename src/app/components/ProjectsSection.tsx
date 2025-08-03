"use client";
import {
  FiGithub,
  FiExternalLink,
  FiCode,
  FiInfo,
  FiX,
  FiCalendar,
  FiUser,
  FiSearch,
  FiAward,
  FiStar,
  FiClock,
  FiUsers,
  FiTag,
  FiEye,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";
import { motion, useAnimation, AnimatePresence, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCreative,
  Thumbs,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
import "swiper/css/thumbs";
import type { Swiper as SwiperType } from "swiper/types";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";


// TypeScript interfaces
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

interface ProjectCardProps {
  project: Project;
  index: number;
}

// Memoized project data
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

// Memoized ProjectDetailsModal component
const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  // Memoized swiper modules
  const swiperModules = useMemo(
    () => [Navigation, Pagination, Autoplay, Thumbs],
    []
  );
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200/50 dark:border-slate-700/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <FiCalendar className="text-blue-500" />
                        <span>{project.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiUser className="text-blue-500" />
                        <span>{project.client}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiClock className="text-blue-500" />
                        <span>{project.duration}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <FiX className="text-slate-900 dark:text-white" />
                  </button>
                </div>
              </div>
              <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
                <div className="p-6">
                  {/* Image Gallery with Thumbnails */}
                  <div className="mb-8">
                    <Swiper
                      spaceBetween={10}
                      thumbs={{ swiper: thumbsSwiper }}
                      modules={swiperModules}
                      navigation
                      pagination={{ clickable: true }}
                      autoplay={{ delay: 5000, disableOnInteraction: false }}
                      className="rounded-xl overflow-hidden shadow-lg h-96"
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
                            <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
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
                      className="thumbs-swiper mt-4 h-24"
                    >
                      {project.images.map((img, i) => (
                        <SwiperSlide key={i}>
                          <div className="h-full w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden cursor-pointer">
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
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2 text-lg">
                        <FiInfo className="text-blue-500" />
                        Project Overview
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                        {project.description}
                      </p>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2 text-lg">
                        <FiTag className="text-blue-500" />
                        Key Features
                      </h4>
                      <ul className="space-y-3 mb-8">
                        {project.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-blue-500 dark:text-blue-400 mr-3 mt-1">
                              ▹
                            </span>
                            <span className="text-slate-600 dark:text-slate-300">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2 text-lg">
                        <FiTag className="text-blue-500" />
                        Project Tags
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {project.testimonials.length > 0 && (
                        <>
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2 text-lg">
                            <FiStar className="text-amber-500" />
                            Testimonials
                          </h4>
                          <div className="space-y-6 mb-8">
                            {project.testimonials.map((testimonial, i) => (
                              <div
                                key={i}
                                className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl border border-blue-100 dark:border-blue-900/30 shadow-sm"
                              >
                                <p className="text-slate-600 dark:text-slate-300 italic mb-3 text-lg">
                                  &quot;{testimonial.quote} &quot;
                                </p>
                                <p className="text-base font-medium text-slate-900 dark:text-white">
                                  {testimonial.author}
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                  {testimonial.role}
                                </p>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2 text-lg">
                        <FiCode className="text-blue-500" />
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 rounded-lg text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2 text-lg">
                        <FiInfo className="text-blue-500" />
                        Project Statistics
                      </h4>
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
                          <div className="flex items-center gap-2 mb-2">
                            <FiClock className="text-blue-500" />
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              Duration
                            </span>
                          </div>
                          <p className="font-semibold text-slate-900 dark:text-white text-lg">
                            {project.duration}
                          </p>
                        </div>
                        <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
                          <div className="flex items-center gap-2 mb-2">
                            <FiUsers className="text-blue-500" />
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              Team Size
                            </span>
                          </div>
                          <p className="font-semibold text-slate-900 dark:text-white text-lg">
                            {project.teamSize} people
                          </p>
                        </div>
                        <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
                          <div className="flex items-center gap-2 mb-2">
                            <FiUser className="text-blue-500" />
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              Users
                            </span>
                          </div>
                          <p className="font-semibold text-slate-900 dark:text-white text-lg">
                            {project.users.toLocaleString()}+
                          </p>
                        </div>
                        <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
                          <div className="flex items-center gap-2 mb-2">
                            <FiTag className="text-blue-500" />
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              Features
                            </span>
                          </div>
                          <p className="font-semibold text-slate-900 dark:text-white text-lg">
                            {project.features.length}
                          </p>
                        </div>
                      </div>
                      {project.awards.length > 0 && (
                        <>
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2 text-lg">
                            <FiAward className="text-amber-500" />
                            Awards
                          </h4>
                          <div className="space-y-4 mb-8">
                            {project.awards.map((award, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-900/30"
                              >
                                <FiAward className="text-amber-500 mt-1 flex-shrink-0" />
                                <div>
                                  <p className="font-medium text-slate-900 dark:text-white">
                                    {award.title}
                                  </p>
                                  <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {award.organization}, {award.year}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2 text-lg">
                        <FiExternalLink className="text-blue-500" />
                        Project Links
                      </h4>
                      <div className="space-y-3">
                        {project.githubClient && (
                          <a
                            href={project.githubClient}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 bg-slate-100 dark:bg-slate-700/50 rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                          >
                            <FiGithub className="text-slate-700 dark:text-slate-400 text-xl" />
                            <span className="font-medium">Client Code</span>
                          </a>
                        )}
                        {project.githubServer && (
                          <a
                            href={project.githubServer}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 bg-slate-100 dark:bg-slate-700/50 rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                          >
                            <FiGithub className="text-slate-700 dark:text-slate-400 text-xl" />
                            <span className="font-medium">Server Code</span>
                          </a>
                        )}
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl transition-all shadow-md"
                          >
                            <FiExternalLink className="text-xl" />
                            <span className="font-medium">Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Memoized ProjectCard component
const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  // Memoized swiper modules
  const swiperModules = useMemo(
    () => [Navigation, Pagination, Autoplay, EffectCreative],
    []
  );

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Fixed: Properly typed variants
  const variants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.15,
      },
    },
  };

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
        className={cn(
          "relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500",
          "bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-900 backdrop-blur-sm",
          "border border-slate-200/50 dark:border-slate-700/50"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Animated gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/5 dark:to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-0 h-full">
          {/* Image slider */}
          <div className="relative h-80 lg:h-auto overflow-hidden">
            <Swiper
              modules={swiperModules}
              effect="creative"
              creativeEffect={{
                prev: {
                  shadow: true,
                  translate: ["-20%", 0, -1],
                  opacity: 0.5,
                },
                next: {
                  translate: ["100%", 0, 0],
                  opacity: 1,
                },
              }}
              navigation={{
                nextEl: `.swiper-button-next-${project.id}`,
                prevEl: `.swiper-button-prev-${project.id}`,
              }}
              pagination={{
                clickable: true,
                el: `.swiper-pagination-${project.id}`,
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={true}
              className="h-full w-full"
            >
              {project.images.map((img, i) => (
                <SwiperSlide key={i}>
                  <div className="relative h-full w-full">
                    <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800">
                      <Image
                        src={img}
                        alt={`${project.title} screenshot ${i + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading={i === 0 ? "eager" : "lazy"}
                        width={1280}
                        height={720}
                        quality={80}
                        priority={i === 0}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                      {i + 1}/{project.images.length}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Custom navigation buttons */}
            <div
              className={cn(
                `swiper-button-prev-${project.id}`,
                "absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full",
                "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm flex items-center justify-center shadow-md",
                "opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              )}
            >
              <FiChevronLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </div>
            <div
              className={cn(
                `swiper-button-next-${project.id}`,
                "absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full",
                "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm flex items-center justify-center shadow-md",
                "opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              )}
            >
              <FiChevronRight className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </div>
            {/* Custom pagination */}
            <div
              className={cn(
                `swiper-pagination-${project.id}`,
                "absolute bottom-4 left-0 right-0 flex justify-center space-x-1 z-10"
              )}
            ></div>
          </div>
          {/* Content */}
          <div className="p-6 md:p-8 flex flex-col">
            {/* Project meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <motion.span
                className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-medium"
                whileHover={{ scale: 1.05 }}
              >
                {project.category}
              </motion.span>
              <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                <FiCalendar className="w-4 h-4 text-blue-500" />
                <span>{project.date}</span>
              </div>
              {project.awards.length > 0 && (
                <motion.div
                  className="flex items-center gap-1 text-sm text-amber-500"
                  whileHover={{ scale: 1.05 }}
                >
                  <FiAward className="w-4 h-4" />
                  <span>{project.awards.length}</span>
                </motion.div>
              )}
              {project.users && (
                <motion.div
                  className="flex items-center gap-1 text-sm text-emerald-500"
                  whileHover={{ scale: 1.05 }}
                >
                  <FiUsers className="w-4 h-4" />
                  <span>{project.users.toLocaleString()}+</span>
                </motion.div>
              )}
            </div>
            {/* Project title */}
            <motion.h3
              className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3"
              whileHover={{ x: 5 }}
            >
              {project.title}
            </motion.h3>
            {/* Project description */}
            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              {project.description}
            </p>
            {/* Key features */}
            <div className="mb-6">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <FiInfo className="text-blue-500" />
                Key Features
              </h4>
              <ul className="space-y-2">
                {project.features.slice(0, 3).map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="flex items-start"
                  >
                    <span className="text-blue-500 dark:text-blue-400 mr-2 mt-1">
                      ▹
                    </span>
                    <span className="text-slate-600 dark:text-slate-300 text-sm">
                      {feature}
                    </span>
                  </motion.li>
                ))}
                {project.features.length > 3 && (
                  <li className="text-slate-600 dark:text-slate-300 text-sm">
                    +{project.features.length - 3} more features
                  </li>
                )}
              </ul>
            </div>
            {/* Tags */}
            <div className="mb-6">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <FiTag className="text-blue-500" />
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 4).map((tag, i) => (
                  <motion.span
                    key={i}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tag}
                  </motion.span>
                ))}
                {project.tags.length > 4 && (
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 rounded-full text-xs font-medium">
                    +{project.tags.length - 4}
                  </span>
                )}
              </div>
            </div>
            {/* Technologies */}
            <div className="mt-auto">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <FiCode className="text-blue-500" />
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.slice(0, 6).map((tech, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.03 }}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 rounded-full text-xs font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tech}
                  </motion.span>
                ))}
                {project.technologies.length > 6 && (
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 rounded-full text-xs font-medium">
                    +{project.technologies.length - 6}
                  </span>
                )}
              </div>
              {/* Action buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {project.githubClient && (
                  <motion.a
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    href={project.githubClient}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-700/50 rounded-lg text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200/50 dark:border-slate-700/50"
                  >
                    <FiGithub className="w-4 h-4" />
                    <span className="text-sm">Client</span>
                  </motion.a>
                )}
                {project.githubServer && (
                  <motion.a
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    href={project.githubServer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-700/50 rounded-lg text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200/50 dark:border-slate-700/50"
                  >
                    <FiGithub className="w-4 h-4" />
                    <span className="text-sm">Server</span>
                  </motion.a>
                )}
                <motion.button
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleOpenModal}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-700/50 rounded-lg text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200/50 dark:border-slate-700/50"
                >
                  <FiEye className="w-4 h-4" />
                  <span className="text-sm">Details</span>
                </motion.button>
                {project.liveLink && (
                  <motion.a
                    whileHover={{
                      y: -3,
                      boxShadow: "0 4px 14px rgba(59, 130, 246, 0.3)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-lg transition-all shadow-md"
                  >
                    <FiExternalLink />
                    <span className="text-sm">Live Demo</span>
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={project}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const lastUpdateRef = useRef(0);

  // Memoized categories
  const categories = useMemo(
    () => ["All", "Full Stack", "Frontend", "Backend"],
    []
  );

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
      if (
        activeFilter !== "All" &&
        project.category.toLowerCase() !== activeFilter.toLowerCase()
      ) {
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

  // Throttled search handler
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const now = performance.now();
      if (now - lastUpdateRef.current > 300) {
        // Throttle to ~3 updates per second
        setSearchQuery(e.target.value);
        lastUpdateRef.current = now;
      }
    },
    []
  );

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  const handleFilterChange = useCallback((category: string) => {
    setActiveFilter(category);
  }, []);

  const handleTagChange = useCallback((tag: string | null) => {
    setSelectedTag(tag);
  }, []);

  return (
    <section id="projects" className="relative py-20 md:py-28 overflow-hidden">
      {/* Professional background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20">
        {/* Subtle animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-200/20 dark:bg-blue-800/10 blur-3xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-200/20 dark:bg-indigo-800/10 blur-3xl"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-20 dark:opacity-30">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, currentColor 1px, transparent 1px),
                linear-gradient(to bottom, currentColor 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
              color: "#94a3b8",
            }}
          />
        </div>
      </div>
      {/* Subtle floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.03, 0] }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5,
            }}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 250 + 100}px`,
              height: `${Math.random() * 250 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background:
                i % 2 === 0
                  ? "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0) 70%)"
                  : "radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0) 70%)",
              filter: "blur(70px)",
            }}
          />
        ))}
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          >
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-400 dark:to-indigo-500">
              Projects
            </span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-400 dark:to-indigo-500 mx-auto mb-6 transform origin-left"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            Selected work showcasing my full-stack development capabilities
          </motion.p>
        </motion.div>
        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search projects by name, technology, or description..."
              className="w-full pl-12 pr-10 py-3 bg-white dark:bg-slate-800/80 backdrop-blur-sm rounded-lg border border-slate-200/50 dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-transparent shadow-sm"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                onClick={handleClearSearch}
              >
                <FiX />
              </button>
            )}
          </div>
        </motion.div>
        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex p-1 bg-white dark:bg-slate-800/80 backdrop-blur-sm rounded-lg border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
            {categories.map((category) => (
              <button
                key={category}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  activeFilter === category
                    ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-sm"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                )}
                onClick={() => handleFilterChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>
        {/* Tags filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-center font-medium text-slate-900 dark:text-white mb-4">
            Filter by tags
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                selectedTag === null
                  ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
                  : "bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 border border-slate-200/50 dark:border-slate-700/50"
              )}
              onClick={() => handleTagChange(null)}
            >
              All Tags
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                  selectedTag === tag
                    ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
                    : "bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 border border-slate-200/50 dark:border-slate-700/50"
                )}
                onClick={() => handleTagChange(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
        {/* Results count */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 text-slate-600 dark:text-slate-400"
        >
          Showing {filteredProjects.length} of {projects.length} projects
        </motion.div>
        {/* Projects grid */}
        <div className="grid gap-10">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50"
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
        {/* View more button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-lg font-medium shadow-md transition-all"
          >
            <Link href="/projects"> View All Projects</Link>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
