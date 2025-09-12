"use client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import {
  FiCalendar,
  FiUser,
  FiClock,
  FiUsers,
  FiTag,
  FiAward,
  FiStar,
  FiCode,
  FiInfo,
  FiGithub,
  FiExternalLink,
  FiArrowLeft,
  FiAlertTriangle,
  FiTrendingUp,
} from "react-icons/fi";
import { FileBarChart2 } from "lucide-react";
import { use, useState } from "react";
import type { Swiper as SwiperType } from "swiper";

// Define the props interface for the component
interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  // Unwrap the params promise
  const unwrappedParams = use(params);
  const id = parseInt(unwrappedParams.id);
  const project = projects.find((p) => p.id === id);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 dark:from-slate-900 dark:via-green-900/20 dark:to-emerald-900/20 py-20 w-full">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-green-200/20 dark:bg-green-800/15 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-emerald-200/20 dark:bg-emerald-800/15 blur-3xl" />
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
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Back button */}
        <div className="mb-6 md:mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center text-slate-700 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 transition-colors group font-medium"
          >
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform text-green-500" />
            Back to Projects
          </Link>
        </div>

        {/* Project header */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
              {project.title}
            </h1>
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold inline-flex items-center shadow-lg">
              {project.category}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-slate-200/50 dark:border-slate-700/50">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-full">
                <FiCalendar className="text-blue-600 dark:text-blue-400 w-4 h-4" />
              </div>
              <span className="text-slate-800 dark:text-slate-200 font-medium">
                {project.date}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-slate-200/50 dark:border-slate-700/50">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-1.5 rounded-full">
                <FiUser className="text-purple-600 dark:text-purple-400 w-4 h-4" />
              </div>
              <span className="text-slate-800 dark:text-slate-200 font-medium">
                {project.client}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-slate-200/50 dark:border-slate-700/50">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-1.5 rounded-full">
                <FiClock className="text-amber-600 dark:text-amber-400 w-4 h-4" />
              </div>
              <span className="text-slate-800 dark:text-slate-200 font-medium">
                {project.duration}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Image Gallery */}
          <div className="space-y-6 md:space-y-8">
            {/* Image Gallery */}
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200/50 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 backdrop-blur-sm">
              <Swiper
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Navigation, Pagination, Autoplay, Thumbs]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 7000, disableOnInteraction: false }}
                className="rounded-t-2xl h-[300px] sm:h-[400px]"
              >
                {project.images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <div className="relative h-full w-full bg-slate-100 dark:bg-slate-800 rounded-t-2xl overflow-hidden">
                      <Image
                        src={img}
                        alt={`${project.title} screenshot ${i + 1}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                        {i + 1}/{project.images.length}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={3}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[Thumbs]}
                className="thumbs-swiper p-3 sm:p-4 bg-slate-50 dark:bg-slate-800/30 h-20 sm:h-24"
              >
                {project.images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <div className="h-full w-full bg-slate-100 dark:bg-slate-700/50 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-green-500 transition-all">
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
            <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 md:p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
              <h3 className="font-bold text-lg md:text-xl text-slate-900 dark:text-white flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2.5 rounded-xl text-white shadow-md">
                  <FiInfo className="text-lg" />
                </div>
                Project Overview
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
                {project.description}
              </p>
            </div>

            {/* Key Features */}
            <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 md:p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
              <h3 className="font-bold text-lg md:text-xl text-slate-900 dark:text-white flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-2.5 rounded-xl text-white shadow-md">
                  <FiTag className="text-lg" />
                </div>
                Key Features
              </h3>
              <ul className="space-y-2 md:space-y-3">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-emerald-500 dark:text-emerald-400 mr-3 mt-1 text-lg">
                      ▹
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 text-base">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Testimonials */}
            {project.testimonials.length > 0 && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-5 md:p-6 shadow-lg border border-amber-200/50 dark:border-amber-700/50">
                <h3 className="font-bold text-lg md:text-xl text-slate-900 dark:text-white flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-2.5 rounded-xl text-white shadow-md">
                    <FiStar className="text-lg" />
                  </div>
                  Testimonials
                </h3>
                <div className="space-y-3 md:space-y-4">
                  {project.testimonials.map((testimonial, i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-slate-800/50 backdrop-blur-sm p-4 md:p-5 rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm"
                    >
                      <div className="flex gap-3 md:gap-4">
                        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-2.5 md:p-3 rounded-full h-fit">
                          <FiUser className="text-white text-lg md:text-xl" />
                        </div>
                        <div>
                          <p className="text-slate-700 dark:text-slate-300 italic mb-2 md:mb-3 text-base">
                            &quot;{testimonial.quote}&quot;
                          </p>
                          <p className="font-semibold text-slate-900 dark:text-white text-base">
                            {testimonial.author}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Project Details */}
          <div className="space-y-6 md:space-y-8">
            {/* Technologies */}
            <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 md:p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
              <h3 className="font-bold text-lg md:text-xl text-slate-900 dark:text-white flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-2.5 rounded-xl text-white shadow-md">
                  <FiCode className="text-lg" />
                </div>
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 text-purple-800 dark:text-purple-200 rounded-lg text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Statistics */}
            <div className="bg-gradient-to-br from-slate-50 to-green-50 dark:from-slate-800/50 dark:to-green-900/20 rounded-2xl p-5 md:p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
              <h3 className="font-bold text-lg md:text-xl text-slate-900 dark:text-white flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2.5 rounded-xl text-white shadow-md">
                  <FileBarChart2 className="w-5 h-5" />
                </div>
                Project Statistics
              </h3>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                      <FiClock className="text-blue-600 dark:text-blue-400 w-5 h-5" />
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
                </div>
                <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg">
                      <FiUsers className="text-emerald-600 dark:text-emerald-400 w-5 h-5" />
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
                </div>
                <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg">
                      <FiUser className="text-amber-600 dark:text-amber-400 w-5 h-5" />
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
                </div>
                <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-rose-100 dark:bg-rose-900/30 p-2 rounded-lg">
                      <FiTag className="text-rose-600 dark:text-rose-400 w-5 h-5" />
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
                </div>
              </div>
            </div>

            {/* Challenges */}
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-2xl p-5 md:p-6 shadow-lg border border-rose-200/50 dark:border-rose-700/50">
              <h3 className="font-bold text-lg md:text-xl text-slate-900 dark:text-white flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-2.5 rounded-xl text-white shadow-md">
                  <FiAlertTriangle className="text-lg" />
                </div>
                Challenges Faced
              </h3>
              <ul className="space-y-2 md:space-y-3">
                {project.challenges.map((challenge, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-rose-500 dark:text-rose-400 mr-3 mt-1 text-lg">
                      ▹
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 text-base">
                      {challenge}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Future Improvements */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-5 md:p-6 shadow-lg border border-indigo-200/50 dark:border-indigo-700/50">
              <h3 className="font-bold text-lg md:text-xl text-slate-900 dark:text-white flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2.5 rounded-xl text-white shadow-md">
                  <FiTrendingUp className="text-lg" />
                </div>
                Future Improvements
              </h3>
              <ul className="space-y-2 md:space-y-3">
                {project.futureImprovements.map((improvement, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-indigo-500 dark:text-indigo-400 mr-3 mt-1 text-lg">
                      ▹
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 text-base">
                      {improvement}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Awards */}
            {project.awards.length > 0 && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-5 md:p-6 shadow-lg border border-amber-200/50 dark:border-amber-700/50">
                <h3 className="font-bold text-lg md:text-xl text-slate-900 dark:text-white flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-2.5 rounded-xl text-white shadow-md">
                    <FiAward className="text-lg" />
                  </div>
                  Awards
                </h3>
                <div className="space-y-3">
                  {project.awards.map((award, i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-slate-800/50 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm"
                    >
                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-2.5 md:p-3 rounded-lg">
                          <FiAward className="text-white text-lg md:text-xl" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white text-base">
                            {award.title}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {award.organization}, {award.year}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Links */}
            <div className="bg-gradient-to-br from-slate-50 to-green-50 dark:from-slate-800/50 dark:to-green-900/20 rounded-2xl p-5 md:p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
              <h3 className="font-bold text-lg md:text-xl text-slate-900 dark:text-white flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2.5 rounded-xl text-white shadow-md">
                  <FiExternalLink className="text-lg" />
                </div>
                Project Links
              </h3>
              <div className="space-y-3">
                {project.githubClient && (
                  <a
                    href={project.githubClient}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 md:p-4 bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all group"
                  >
                    <div className="bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-600 dark:to-slate-800 p-2 rounded-lg group-hover:from-slate-800 group-hover:to-slate-900 dark:group-hover:from-slate-700 dark:group-hover:to-slate-900 transition-all">
                      <FiGithub className="text-white text-lg md:text-xl" />
                    </div>
                    <span className="font-medium text-slate-800 dark:text-slate-200 text-base">
                      Client Code
                    </span>
                  </a>
                )}
                {project.githubServer && (
                  <a
                    href={project.githubServer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 md:p-4 bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all group"
                  >
                    <div className="bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-600 dark:to-slate-800 p-2 rounded-lg group-hover:from-slate-800 group-hover:to-slate-900 dark:group-hover:from-slate-700 dark:group-hover:to-slate-900 transition-all">
                      <FiGithub className="text-white text-lg md:text-xl" />
                    </div>
                    <span className="font-medium text-slate-800 dark:text-slate-200 text-base">
                      Server Code
                    </span>
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 md:p-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <div className="bg-white/20 p-2 rounded-lg">
                      <FiExternalLink className="text-lg md:text-xl" />
                    </div>
                    <span className="font-medium text-base">Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
