"use client";
import { useState, useMemo, useCallback} from "react";
import { motion } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";
import ProjectCard from "@/components/ProjectCard";
import { Input } from "@/components/ui/input";
import { projects } from "@/data/projects";
import Link from "next/link";

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

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

  // Debounced search handler for better performance
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
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

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <section
      id="projects"
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden w-full"
    >
      {/* Simplified professional background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 dark:from-slate-900 dark:via-green-900/20 dark:to-emerald-900/20">
        {/* Single subtle animated gradient orb */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 rounded-full bg-green-200/20 dark:bg-green-800/10 blur-3xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400">
              Projects
            </span>
          </h2>
          <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 mx-auto mb-4 md:mb-6" />
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto px-4">
            Selected work showcasing my full-stack development capabilities
          </p>
        </motion.div>
        {/* Search bar */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-6 md:mb-8 w-full"
        >
          <div className="relative">
            <FiSearch className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              type="text"
              placeholder="Search projects by name, technology, or description..."
              className="w-full pl-10 sm:pl-12 pr-10 py-2.5 sm:py-3 bg-white dark:bg-slate-800/80 backdrop-blur-sm rounded-lg border border-green-200/50 dark:border-green-700/50 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-500 focus:border-transparent shadow-sm text-sm sm:text-base"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <button
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                onClick={handleClearSearch}
              >
                <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
          </div>
        </motion.div>
        {/* Filter tabs */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="flex justify-center mb-8 md:mb-12 w-full"
        >
          <div className="inline-flex p-1 bg-white dark:bg-slate-800/80 backdrop-blur-sm rounded-lg border border-green-200/50 dark:border-green-700/50 shadow-sm max-w-full overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  activeFilter === category
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-sm"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                }`}
                onClick={() => handleFilterChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>
        {/* Tags filter */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-8 md:mb-12 w-full"
        >
          <h3 className="text-center font-medium text-slate-900 dark:text-white mb-3 md:mb-4 text-sm sm:text-base">
            Filter by tags
          </h3>
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 max-w-3xl mx-auto">
            <button
              className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedTag === null
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                  : "bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 border border-green-200/50 dark:border-green-700/50"
              }`}
              onClick={() => handleTagChange(null)}
            >
              All Tags
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedTag === tag
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                    : "bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 border border-green-200/50 dark:border-green-700/50"
                }`}
                onClick={() => handleTagChange(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
        {/* Results count */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-6 md:mb-8 text-slate-600 dark:text-slate-400 text-sm"
        >
          Showing {filteredProjects.length} of {projects.length} projects
        </motion.div>
        {/* Projects grid */}
        <div className="grid grid-cols-1 gap-6 md:gap-8 w-full">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))
          ) : (
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="col-span-full text-center py-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-green-200/50 dark:border-green-700/50"
            >
              <h3 className="text-lg md:text-xl font-medium text-slate-900 dark:text-white mb-2">
                No projects found
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </div>
        {/* View more button */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mt-12 md:mt-16"
        >
          <Link href="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium shadow-md transition-all text-sm sm:text-base"
            >
              View All Projects
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}