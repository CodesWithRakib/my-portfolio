"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FiExternalLink, FiEye, FiChevronRight, FiChevronLeft, FiGithub } from "react-icons/fi";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from "react-icons/si";
import type { Project } from "@/data/projects/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

// Technology icon mapping (simplified)
const getTechIcon = (tech: string) => {
  const techLower = tech.toLowerCase();
  if (techLower.includes("react")) return <SiReact className="text-blue-500" />;
  if (techLower.includes("next")) return <SiNextdotjs className="text-black dark:text-white" />;
  if (techLower.includes("typescript")) return <SiTypescript className="text-blue-600" />;
  if (techLower.includes("tailwind")) return <SiTailwindcss className="text-green-500" />;
  return null;
};

// Category color mapping
const getCategoryColor = (category: string) => {
  const categoryLower = category.toLowerCase();
  if (categoryLower.includes("full stack") || categoryLower.includes("fullstack"))
    return "from-cyan-500 to-blue-600"; // Updated color for fullstack
  if (categoryLower.includes("frontend") || categoryLower.includes("front end"))
    return "from-blue-500 to-cyan-500";
  if (categoryLower.includes("backend") || categoryLower.includes("back end"))
    return "from-green-500 to-emerald-500";
  if (categoryLower.includes("mobile") || categoryLower.includes("app"))
    return "from-orange-500 to-amber-500";
  if (categoryLower.includes("ui") || categoryLower.includes("design"))
    return "from-pink-500 to-rose-500";
  return "from-green-600 to-emerald-600";
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const categoryGradient = getCategoryColor(project.category);

  return (
    <div
      className={cn(
        "relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 w-full",
        "bg-gradient-to-br from-white to-green-50 dark:from-slate-800 dark:to-slate-900",
        "border border-green-200/50 dark:border-green-700/50",
        "transform hover:-translate-y-1 transition-transform duration-300"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Image Slider - Left Side */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
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
              <SwiperSlide key={i} className="w-full h-full">
                <div className="relative w-full h-full">
                  <Image
                    src={img}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="w-full h-full object-cover"
                    width={800}
                    height={600}
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    {i + 1}/{project.images.length}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Navigation Buttons */}
          <button
            className={cn(
              `swiper-button-prev-${project.id}`,
              "absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full",
              "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm flex items-center justify-center shadow-md",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            )}
            aria-label="Previous slide"
          >
            <FiChevronLeft className="w-4 h-4 text-slate-700 dark:text-slate-300" />
          </button>
          <button
            className={cn(
              `swiper-button-next-${project.id}`,
              "absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full",
              "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm flex items-center justify-center shadow-md",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            )}
            aria-label="Next slide"
          >
            <FiChevronRight className="w-4 h-4 text-slate-700 dark:text-slate-300" />
          </button>
          
          {/* Pagination */}
          <div
            className={cn(
              `swiper-pagination-${project.id}`,
              "absolute bottom-3 left-0 right-0 flex justify-center space-x-1.5 z-10"
            )}
          />
        </div>
        
        {/* Project Info - Right Side */}
        <div className="p-5 flex flex-col">
          {/* Category Badge */}
          <div className="mb-3">
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium text-white shadow-md",
                `bg-gradient-to-r ${categoryGradient}`
              )}
            >
              {project.category}
            </span>
          </div>
          
          {/* Project Title */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            {project.title}
          </h3>
          
          {/* Project Description */}
          <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm line-clamp-3">
            {project.description}
          </p>
          
          {/* Key Technologies */}
          <div className="mb-5">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 px-3 py-1 bg-slate-100 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 rounded-full text-xs font-medium"
                >
                  {getTechIcon(tech)}
                  <span>{tech}</span>
                </div>
              ))}
              {project.technologies.length > 4 && (
                <div className="flex items-center gap-1 px-3 py-1 bg-slate-100 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 rounded-full text-xs font-medium">
                  <span>+{project.technologies.length - 4}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="mt-auto grid grid-cols-2 gap-2">
            {/* Details Button */}
            <Link
              href={`/projects/${project.id}`}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-slate-950 text-white rounded-lg transition-all shadow-md hover:shadow-lg text-xs sm:text-sm"
            >
              <FiEye className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Details</span>
            </Link>
            
            {/* Client Code Button */}
            {project.githubClient && (
              <a
                href={project.githubClient}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-lg transition-all shadow-md hover:shadow-lg text-xs sm:text-sm"
              >
                <FiGithub className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Client</span>
              </a>
            )}
            
            {/* Server Code Button */}
            {project.githubServer && (
              <a
                href={project.githubServer}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-lg transition-all shadow-md hover:shadow-lg text-xs sm:text-sm"
              >
                <FiGithub className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Server</span>
              </a>
            )}
            
            {/* Live Demo Button */}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg text-xs sm:text-sm",
                  isHovered
                    ? "bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white"
                    : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                )}
              >
                <FiExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
      
      {/* Custom pagination styles */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          opacity: 0.7;
        }
        .swiper-pagination-bullet-active {
          background-color: white;
          width: 24px;
          border-radius: 4px;
          opacity: 1;
        }
        @media (prefers-color-scheme: dark) {
          .swiper-pagination-bullet {
            background-color: rgba(30, 41, 59, 0.7);
          }
          .swiper-pagination-bullet-active {
            background-color: #10b981;
          }
        }
      `}</style>
    </div>
  );
}