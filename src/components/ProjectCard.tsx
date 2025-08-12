"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCreative,
  Keyboard,
  Thumbs,
  FreeMode,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
import "swiper/css/keyboard";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  FiGithub,
  FiExternalLink,
  FiEye,
  FiChevronRight,
  FiChevronLeft,
  FiCalendar,
  FiUsers,
  FiAward,
  FiInfo,
  FiTag,
  FiCode,
  FiX,
  FiMaximize,
  FiMinimize,
  FiZoomIn,
  FiZoomOut,
} from "react-icons/fi";
import { VscVscode } from "react-icons/vsc";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiFirebase,
  SiRedux,
  SiPython,
  SiDjango,
  SiFlutter,
  SiSwift,
  SiFigma,
  SiAdobe,
  SiVercel,
  SiNetlify,
  SiGit,
} from "react-icons/si";
import type { Project } from "@/data/projects/types";
import type { Swiper as SwiperType } from "swiper/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

// Technology icon mapping
const getTechIcon = (tech: string) => {
  const techLower = tech.toLowerCase();

  if (techLower.includes("react")) return <SiReact className="text-blue-500" />;
  if (techLower.includes("next"))
    return <SiNextdotjs className="text-black dark:text-white" />;
  if (techLower.includes("typescript"))
    return <SiTypescript className="text-blue-600" />;
  if (techLower.includes("tailwind"))
    return <SiTailwindcss className="text-teal-500" />;
  if (techLower.includes("node"))
    return <SiNodedotjs className="text-green-600" />;
  if (techLower.includes("mongodb"))
    return <SiMongodb className="text-green-500" />;
  if (techLower.includes("express"))
    return <SiExpress className="text-gray-800 dark:text-gray-200" />;
  if (techLower.includes("firebase"))
    return <SiFirebase className="text-orange-500" />;
  if (techLower.includes("redux"))
    return <SiRedux className="text-purple-600" />;
  if (techLower.includes("python"))
    return <SiPython className="text-blue-500" />;
  if (techLower.includes("django"))
    return <SiDjango className="text-green-700" />;
  if (techLower.includes("flutter"))
    return <SiFlutter className="text-blue-400" />;
  if (techLower.includes("swift"))
    return <SiSwift className="text-orange-600" />;
  if (techLower.includes("figma"))
    return <SiFigma className="text-purple-500" />;
  if (techLower.includes("adobe")) return <SiAdobe className="text-red-600" />;
  if (techLower.includes("vs code"))
    return <VscVscode className="text-blue-600" />;
  if (techLower.includes("vercel"))
    return <SiVercel className="text-black dark:text-white" />;
  if (techLower.includes("netlify"))
    return <SiNetlify className="text-teal-600" />;
  if (techLower.includes("git")) return <SiGit className="text-orange-600" />;

  // Default icon if no match
  return <FiCode className="text-slate-600 dark:text-slate-400" />;
};

// Category color mapping
const getCategoryColor = (category: string) => {
  const categoryLower = category.toLowerCase();

  if (
    categoryLower.includes("full stack") ||
    categoryLower.includes("fullstack")
  )
    return "from-purple-500 to-indigo-600";
  if (categoryLower.includes("frontend") || categoryLower.includes("front end"))
    return "from-blue-500 to-cyan-500";
  if (categoryLower.includes("backend") || categoryLower.includes("back end"))
    return "from-green-500 to-emerald-500";
  if (categoryLower.includes("mobile") || categoryLower.includes("app"))
    return "from-orange-500 to-amber-500";
  if (categoryLower.includes("ui") || categoryLower.includes("design"))
    return "from-pink-500 to-rose-500";

  return "from-teal-500 to-blue-500";
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const thumbsSwiperRef = useRef<SwiperType | null>(null);
  const lightboxSwiperRef = useRef<SwiperType | null>(null);
  const lightboxContainerRef = useRef<HTMLDivElement>(null);

  const swiperModules = [
    Navigation,
    Pagination,
    Autoplay,
    EffectCreative,
    Keyboard,
    Thumbs,
    FreeMode,
  ];

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
    if (
      lightboxSwiperRef.current &&
      lightboxSwiperRef.current.realIndex !== swiper.realIndex
    ) {
      lightboxSwiperRef.current.slideTo(swiper.realIndex);
    }
  };

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = "hidden";
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
    }
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setZoomLevel(1);
    setIsFullscreen(false);
    document.body.style.overflow = "auto";
    if (swiperRef.current) {
      swiperRef.current.autoplay.start();
    }
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      lightboxContainerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          lightboxSwiperRef.current?.slidePrev();
          break;
        case "ArrowRight":
          lightboxSwiperRef.current?.slideNext();
          break;
        case "+":
        case "=":
          handleZoomIn();
          break;
        case "-":
          handleZoomOut();
          break;
        case "f":
          toggleFullscreen();
          break;
        case "0":
          setZoomLevel(1);
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen]);

  const categoryGradient = getCategoryColor(project.category);

  return (
    <>
      <div
        className={cn(
          "relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 w-full",
          "bg-gradient-to-br from-white to-teal-50 dark:from-slate-800 dark:to-slate-900 backdrop-blur-sm",
          "border border-teal-200/50 dark:border-teal-700/50",
          "transform hover:-translate-y-1 hover:scale-[1.005] transition-transform duration-300 ease-in-out"
        )}
        data-aos="fade-up"
        data-aos-delay={index * 50}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-500/10 dark:from-teal-500/5 dark:to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Shimmer effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/30 dark:via-slate-800/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -skew-x-12 -translate-x-full group-hover:translate-x-full"></div>
        </div>

        {/* Content grid - Landscape layout */}
        <div className="grid lg:grid-cols-2 gap-0 h-full">
          {/* Image slider - Left side */}
          <div className="relative h-64 sm:h-80 lg:h-auto overflow-hidden">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
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
                bulletClass: "swiper-pagination-bullet-custom",
                bulletActiveClass: "swiper-pagination-bullet-active-custom",
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={true}
              keyboard={{
                enabled: true,
                onlyInViewport: true,
              }}
              onSlideChange={handleSlideChange}
              className="h-full w-full"
              thumbs={{
                swiper:
                  thumbsSwiperRef.current && !thumbsSwiperRef.current.destroyed
                    ? thumbsSwiperRef.current
                    : null,
              }}
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
                        quality={85}
                        priority={i === 0}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                      {i + 1}/{project.images.length}
                    </div>
                    <button
                      onClick={() => openLightbox(i)}
                      className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      aria-label="View full image"
                    >
                      <FiMaximize className="w-4 h-4" />
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnail navigation */}
            <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-t from-black/70 to-transparent z-10 px-4 pb-2 hidden lg:flex items-end">
              <Swiper
                onSwiper={(swiper) => {
                  thumbsSwiperRef.current = swiper;
                }}
                modules={[FreeMode, Thumbs]}
                spaceBetween={6}
                slidesPerView={3}
                freeMode={true}
                watchSlidesProgress={true}
                className="w-full h-full"
              >
                {project.images.map((img, i) => (
                  <SwiperSlide
                    key={i}
                    className="cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <div className="relative h-full w-full rounded overflow-hidden border-2 border-transparent hover:border-teal-400 transition-all">
                      <Image
                        src={img}
                        alt={`Thumbnail ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="100px"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Custom navigation buttons */}
            <button
              className={cn(
                `swiper-button-prev-${project.id}`,
                "absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full",
                "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm flex items-center justify-center shadow-md",
                "opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer",
                "hover:scale-110 transform transition-transform focus:outline-none focus:ring-2 focus:ring-teal-500"
              )}
              aria-label="Previous slide"
            >
              <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 dark:text-slate-300" />
            </button>
            <button
              className={cn(
                `swiper-button-next-${project.id}`,
                "absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full",
                "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm flex items-center justify-center shadow-md",
                "opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer",
                "hover:scale-110 transform transition-transform focus:outline-none focus:ring-2 focus:ring-teal-500"
              )}
              aria-label="Next slide"
            >
              <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 dark:text-slate-300" />
            </button>

            {/* Custom pagination */}
            <div
              className={cn(
                `swiper-pagination-${project.id}`,
                "absolute bottom-4 left-0 right-0 flex justify-center space-x-1.5 z-10 lg:hidden"
              )}
            ></div>
          </div>

          {/* Content - Right side */}
          <div className="p-4 sm:p-6 md:p-8 flex flex-col">
            {/* Project meta */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-white shadow-md",
                  `bg-gradient-to-r ${categoryGradient}`
                )}
              >
                {project.category}
              </span>
              <div className="flex items-center gap-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <FiCalendar className="w-3 h-3 sm:w-4 sm:h-4 text-teal-500" />
                <span>{project.date}</span>
              </div>
              {project.awards.length > 0 && (
                <div className="flex items-center gap-1 text-xs sm:text-sm text-amber-500">
                  <FiAward className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{project.awards.length}</span>
                </div>
              )}
              {project.users && (
                <div className="flex items-center gap-1 text-xs sm:text-sm text-emerald-500">
                  <FiUsers className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{project.users.toLocaleString()}+</span>
                </div>
              )}
            </div>

            {/* Project title */}
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">
              {project.title}
            </h3>

            {/* Project description */}
            <p className="text-slate-600 dark:text-slate-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              {project.description}
            </p>

            {/* Key features */}
            <div className="mb-4 sm:mb-6">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                <div className="p-1.5 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 text-white">
                  <FiInfo className="w-4 h-4" />
                </div>
                Key Features
              </h4>
              <ul className="space-y-1 sm:space-y-2">
                {project.features.slice(0, 3).map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <div className="flex-shrink-0 mt-1 mr-2 text-teal-500 dark:text-teal-400">
                      ▹
                    </div>
                    <span className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
                {project.features.length > 3 && (
                  <li className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                    +{project.features.length - 3} more features
                  </li>
                )}
              </ul>
            </div>

            {/* Tags */}
            <div className="mb-4 sm:mb-6">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                <div className="p-1.5 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 text-white">
                  <FiTag className="w-4 h-4" />
                </div>
                Tags
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.tags.slice(0, 4).map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 sm:px-3 py-1 bg-gradient-to-r from-teal-100 to-blue-100 dark:from-teal-900/30 dark:to-blue-900/30 text-teal-800 dark:text-teal-200 rounded-full text-xs font-medium hover:from-teal-200/50 hover:to-blue-200/50 dark:hover:to-blue-900/50 transition-all cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span className="px-2 sm:px-3 py-1 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700/50 dark:to-slate-800/50 text-slate-800 dark:text-slate-200 rounded-full text-xs font-medium">
                    +{project.tags.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* Technologies */}
            <div className="mt-auto">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                <div className="p-1.5 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 text-white">
                  <FiCode className="w-4 h-4" />
                </div>
                Technologies
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                {project.technologies.slice(0, 6).map((tech, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1 px-2 sm:px-3 py-1 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700/50 dark:to-slate-800/50 text-slate-800 dark:text-slate-200 rounded-full text-xs font-medium hover:from-slate-200/50 hover:to-slate-300 dark:hover:from-slate-700/50 dark:hover:to-slate-800/70 transition-all"
                  >
                    {getTechIcon(tech)}
                    <span>{tech}</span>
                  </div>
                ))}
                {project.technologies.length > 6 && (
                  <div className="flex items-center gap-1 px-2 sm:px-3 py-1 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700/50 dark:to-slate-800/50 text-slate-800 dark:text-slate-200 rounded-full text-xs font-medium">
                    <span className="text-xs">+</span>
                    <span>{project.technologies.length - 6}</span>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 relative z-10">
                {project.githubClient && (
                  <a
                    href={project.githubClient}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-slate-950 text-white rounded-lg transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 pointer-events-auto text-xs sm:text-sm"
                  >
                    <FiGithub className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Client</span>
                  </a>
                )}
                {project.githubServer && (
                  <a
                    href={project.githubServer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-slate-950 text-white rounded-lg transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 pointer-events-auto text-xs sm:text-sm"
                  >
                    <FiGithub className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Server</span>
                  </a>
                )}
                <Link
                  href={`/projects/${project.id}`}
                  className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-slate-950 text-white rounded-lg transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 pointer-events-auto text-xs sm:text-sm"
                >
                  <FiEye className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Details</span>
                </Link>
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 pointer-events-auto text-xs sm:text-sm",
                      isHovered
                        ? "bg-gradient-to-r from-teal-600 to-blue-700 hover:from-teal-700 hover:to-blue-800 text-white"
                        : "bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white"
                    )}
                  >
                    <FiExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && closeLightbox()}
          ref={lightboxContainerRef}
        >
          <div className="relative w-full max-w-6xl h-[90vh] flex flex-col">
            {/* Lightbox controls */}
            <div className="absolute top-4 right-4 z-20 flex gap-2">
              <button
                onClick={handleZoomIn}
                className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Zoom in"
              >
                <FiZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={handleZoomOut}
                className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Zoom out"
                disabled={zoomLevel <= 0.5}
              >
                <FiZoomOut className="w-5 h-5" />
              </button>
              <button
                onClick={toggleFullscreen}
                className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label={
                  isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                }
              >
                {isFullscreen ? (
                  <FiMinimize className="w-5 h-5" />
                ) : (
                  <FiMaximize className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={closeLightbox}
                className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Close lightbox"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Main lightbox swiper */}
            <Swiper
              onSwiper={(swiper) => {
                lightboxSwiperRef.current = swiper;
              }}
              modules={[Navigation, Pagination, Keyboard, Thumbs]}
              navigation={{
                nextEl: `.lightbox-button-next-${project.id}`,
                prevEl: `.lightbox-button-prev-${project.id}`,
              }}
              pagination={{
                clickable: true,
                el: `.lightbox-pagination-${project.id}`,
                bulletClass: "swiper-pagination-bullet-custom",
                bulletActiveClass: "swiper-pagination-bullet-active-custom",
              }}
              keyboard={{
                enabled: true,
              }}
              initialSlide={activeIndex}
              loop={true}
              className="w-full h-full"
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.realIndex);
                if (
                  swiperRef.current &&
                  swiperRef.current.realIndex !== swiper.realIndex
                ) {
                  swiperRef.current.slideTo(swiper.realIndex);
                }
              }}
            >
              {project.images.map((img, i) => (
                <SwiperSlide key={i}>
                  <div className="flex items-center justify-center h-full w-full p-4">
                    <div
                      className="relative max-h-full max-w-full transition-transform duration-300"
                      style={{ transform: `scale(${zoomLevel})` }}
                    >
                      <Image
                        src={img}
                        alt={`${project.title} screenshot ${i + 1}`}
                        className="object-contain"
                        width={1920}
                        height={1080}
                        quality={100}
                        priority
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnail navigation for lightbox */}
            <div className="absolute bottom-4 left-0 right-0 z-20 px-4 sm:px-8">
              <Swiper
                modules={[FreeMode, Thumbs]}
                spaceBetween={6}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                className="w-full h-12 sm:h-16"
              >
                {project.images.map((img, i) => (
                  <SwiperSlide
                    key={i}
                    className="cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                    onClick={() => {
                      lightboxSwiperRef.current?.slideTo(i);
                      setActiveIndex(i);
                    }}
                  >
                    <div
                      className={cn(
                        "relative h-full w-full rounded overflow-hidden border-2 transition-all",
                        activeIndex === i
                          ? "border-teal-400 opacity-100"
                          : "border-transparent"
                      )}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="100px"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Navigation buttons */}
            <button
              className={cn(
                `lightbox-button-prev-${project.id}`,
                "absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full",
                "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm flex items-center justify-center shadow-md",
                "cursor-pointer hover:scale-110 transform transition-transform focus:outline-none focus:ring-2 focus:ring-teal-500"
              )}
              aria-label="Previous image"
            >
              <FiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700 dark:text-slate-300" />
            </button>
            <button
              className={cn(
                `lightbox-button-next-${project.id}`,
                "absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full",
                "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm flex items-center justify-center shadow-md",
                "cursor-pointer hover:scale-110 transform transition-transform focus:outline-none focus:ring-2 focus:ring-teal-500"
              )}
              aria-label="Next image"
            >
              <FiChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700 dark:text-slate-300" />
            </button>

            {/* Custom pagination */}
            <div
              className={cn(
                `lightbox-pagination-${project.id}`,
                "absolute bottom-20 left-0 right-0 flex justify-center space-x-1.5 z-20"
              )}
            ></div>

            {/* Slide counter */}
            <div className="absolute bottom-4 left-4 bg-black/50 text-white text-xs sm:text-sm px-3 py-1 rounded-full z-20">
              {activeIndex + 1}/{project.images.length}
            </div>

            {/* Zoom level indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs sm:text-sm px-3 py-1 rounded-full z-20">
              {Math.round(zoomLevel * 100)}%
            </div>
          </div>
        </div>
      )}

      {/* Custom pagination styles */}
      <style jsx global>{`
        .swiper-pagination-bullet-custom {
          width: 8px;
          height: 8px;
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          opacity: 0.7;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active-custom {
          background-color: white;
          width: 24px;
          border-radius: 4px;
          opacity: 1;
        }
        @media (prefers-color-scheme: dark) {
          .swiper-pagination-bullet-custom {
            background-color: rgba(30, 41, 59, 0.7);
          }
          .swiper-pagination-bullet-active-custom {
            background-color: #0ea5e9;
          }
        }
        .swiper-slide-thumb-active {
          opacity: 1 !important;
        }
      `}</style>
    </>
  );
}
