"use client";
import { useState, useMemo, useCallback } from "react";
import { FiSearch, FiX, FiFilter } from "react-icons/fi";
import ProjectCard from "@/components/ProjectCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects } from "@/data/projects";

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

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  const handleFilterChange = useCallback((value: string) => {
    setActiveFilter(value);
  }, []);

  const handleTagSelect = useCallback((tag: string | null) => {
    setSelectedTag(tag);
  }, []);

  return (
    <div className="min-h-screen py-10 bg-gradient-to-br from-slate-50 via-teal-50 to-blue-50 dark:from-slate-900 dark:via-teal-900/20 dark:to-blue-900/20 w-full">
      {/* Simplified Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Static gradient orbs instead of animated ones */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full bg-teal-200/15 dark:bg-teal-800/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full bg-blue-200/15 dark:bg-blue-800/10 blur-3xl" />
        {/* Grid pattern */}
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 md:py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-700 dark:from-teal-400 dark:to-blue-500">
              Projects
            </span>
          </h1>
          <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-teal-600 to-blue-700 dark:from-teal-400 dark:to-blue-500 mx-auto mb-4 md:mb-6" />
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto px-4">
            Selected work showcasing my full-stack development capabilities
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-8 md:mb-10 w-full">
          <div className="relative mb-4 md:mb-6">
            <FiSearch className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              type="text"
              placeholder="Search projects by name, technology, or description..."
              className="w-full pl-10 sm:pl-12 pr-10 py-2.5 sm:py-3 bg-white dark:bg-slate-800/80 backdrop-blur-sm rounded-lg border border-slate-200/50 dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-500 focus:border-transparent shadow-sm text-sm"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <button
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                onClick={clearSearch}
              >
                <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
          </div>

          <Tabs
            value={activeFilter}
            onValueChange={handleFilterChange}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-white dark:bg-slate-800/80 backdrop-blur-sm rounded-lg border border-slate-200/50 dark:border-slate-700/50 shadow-sm p-1">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-blue-700 data-[state=active]:text-white text-xs sm:text-sm"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="mt-4 md:mt-6">
            <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-2 md:mb-3 flex items-center gap-1">
              <FiFilter className="text-teal-500 w-4 h-4" />
              Filter by tags
            </h3>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              <Badge
                variant={selectedTag === null ? "default" : "outline"}
                className="cursor-pointer text-xs"
                onClick={() => handleTagSelect(null)}
              >
                All Tags
              </Badge>
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  className="cursor-pointer text-xs"
                  onClick={() => handleTagSelect(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="text-center mb-6 md:mb-8 text-slate-600 dark:text-slate-400 text-sm">
          Showing {filteredProjects.length} of {projects.length} projects
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1  gap-4 md:gap-6 w-full">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))
          ) : (
            <div className="col-span-full text-center py-8 md:py-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50">
              <h3 className="text-lg md:text-xl font-medium text-slate-900 dark:text-white mb-2">
                No projects found
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
