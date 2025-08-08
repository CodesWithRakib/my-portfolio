"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  MousePointer,
  Type,
  Hand,
  Move,
  Link2,
  Maximize,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Define cursor types
type CursorType =
  | "default"
  | "pointer"
  | "text"
  | "grab"
  | "drag"
  | "link"
  | "zoom"
  | "magnetic";

// Define cursor colors with teal/blue theme
type CursorColors = Record<
  CursorType,
  {
    border: string;
    bg: string;
  }
>;

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState<CursorType>("default");
  const [isHidden, setIsHidden] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [magneticTarget, setMagneticTarget] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const cursorRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const requestRef = useRef<number>(0);
  const previousTimeRef = useRef<number>(0);
  const positionRef = useRef({ x: 0, y: 0 });
  const lastUpdateRef = useRef(0);

  // Optimized mouse move handler with throttling
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = performance.now();
    if (now - lastUpdateRef.current > 16) {
      // Throttle to ~60fps
      positionRef.current = { x: e.clientX, y: e.clientY };
      lastUpdateRef.current = now;
    }
  }, []);

  // Simplified animation loop for better performance
  const animateCursor = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      setPosition(positionRef.current);

      // Check cursor type less frequently
      if (time % 300 < 16) {
        // Reduced check frequency
        const target = document.elementFromPoint(
          positionRef.current.x,
          positionRef.current.y
        );

        if (target) {
          const computedStyle = window.getComputedStyle(target);
          const cursorValue = computedStyle.getPropertyValue("cursor");

          if (
            target.closest(
              'a, button, [role="button"], [onclick], [data-cursor="magnetic"]'
            )
          ) {
            setCursorType("pointer");
            setIsHoveringClickable(true);

            if (target.closest('[data-cursor="magnetic"]')) {
              const rect = target.getBoundingClientRect();
              setMagneticTarget({
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
              });
            } else {
              setMagneticTarget(null);
            }
          } else if (
            cursorValue === "text" ||
            target.closest("input, textarea, [contenteditable]")
          ) {
            setCursorType("text");
            setIsHoveringClickable(false);
            setMagneticTarget(null);
          } else if (cursorValue === "grab" || cursorValue === "grabbing") {
            setCursorType(cursorValue === "grabbing" ? "drag" : "grab");
            setIsHoveringClickable(false);
            setMagneticTarget(null);
          } else if (target.closest('[data-cursor="link"]')) {
            setCursorType("link");
            setIsHoveringClickable(true);
            setMagneticTarget(null);
          } else if (target.closest('[data-cursor="zoom"]')) {
            setCursorType("zoom");
            setIsHoveringClickable(true);
            setMagneticTarget(null);
          } else {
            setCursorType("default");
            setIsHoveringClickable(false);
            setMagneticTarget(null);
          }
        }
      }
    }

    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateCursor);
  }, []);

  useEffect(() => {
    // Start animation loop
    requestRef.current = requestAnimationFrame(animateCursor);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animateCursor]);

  useEffect(() => {
    const handleMouseDown = () => {
      setIsMouseDown(true);
      if (cursorType === "grab") {
        setIsDragging(true);
        setCursorType("drag");
      }
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
      if (cursorType === "drag") {
        setIsDragging(false);
        setCursorType("grab");
      }
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        const activeElement = document.activeElement;
        if (
          activeElement?.matches(
            'a, button, input, textarea, [role="button"], [contenteditable]'
          )
        ) {
          if (activeElement.matches('a, button, [role="button"]')) {
            setCursorType("pointer");
          } else if (
            activeElement.matches("input, textarea, [contenteditable]")
          ) {
            setCursorType("text");
          }

          if (activeElement instanceof HTMLElement) {
            const rect = activeElement.getBoundingClientRect();
            positionRef.current = {
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2,
            };
          }
        }
      }
    };

    // Use passive event listeners where possible
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [cursorType, handleMouseMove]);

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  if (isTouchDevice) return null;

  const magneticPosition = magneticTarget
    ? {
        x: position.x + (magneticTarget.x - position.x) * 0.2,
        y: position.y + (magneticTarget.y - position.y) * 0.2,
      }
    : position;

  const cursorIcons: Record<CursorType, React.ReactNode> = {
    default: <Code className="w-3 h-3 text-white" />,
    pointer: <MousePointer className="w-3 h-3 text-white" />,
    text: <Type className="w-3 h-3 text-white" />,
    grab: <Hand className="w-3 h-3 text-white" />,
    drag: <Move className="w-3 h-3 text-white" />,
    link: <Link2 className="w-3 h-3 text-white" />,
    zoom: <Maximize className="w-3 h-3 text-white" />,
    magnetic: <Target className="w-3 h-3 text-white" />,
  };

  // Updated cursor colors with teal/blue theme
  const cursorColors: CursorColors = {
    default: {
      border: "border-teal-600 dark:border-teal-400",
      bg: "bg-teal-600 dark:bg-teal-400",
    },
    pointer: {
      border: "border-teal-700 dark:border-teal-300",
      bg: "bg-teal-700 dark:bg-teal-300",
    },
    text: {
      border: "border-blue-600 dark:border-blue-400",
      bg: "bg-blue-600 dark:bg-blue-400",
    },
    grab: {
      border: "border-teal-600 dark:border-teal-400",
      bg: "bg-teal-600 dark:bg-teal-400",
    },
    drag: {
      border: "border-teal-700 dark:border-teal-300",
      bg: "bg-teal-700 dark:bg-teal-300",
    },
    link: {
      border: "border-teal-600 dark:border-teal-400",
      bg: "bg-teal-600 dark:bg-teal-400",
    },
    zoom: {
      border: "border-blue-600 dark:border-blue-400",
      bg: "bg-blue-600 dark:bg-blue-400",
    },
    magnetic: {
      border: "border-teal-600 dark:border-teal-400",
      bg: "bg-teal-600 dark:bg-teal-400",
    },
  };

  return (
    <>
      <motion.div
        ref={cursorRef}
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        )}
        animate={{
          x: magneticPosition.x - 12,
          y: magneticPosition.y - 12,
          scale:
            cursorType === "pointer"
              ? 1.3
              : cursorType === "text"
                ? 0.7
                : cursorType === "magnetic"
                  ? 1.5
                  : 1,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{
          type: "spring",
          mass: 0.1,
          damping: 15,
          stiffness: 300,
        }}
      >
        <motion.div
          className={cn(
            "absolute inset-0 rounded-full border-2",
            cursorColors[cursorType].border
          )}
          animate={{
            scale: isMouseDown ? 0.8 : 1,
            opacity: isHidden ? 0 : 0.6,
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.div
          className={cn(
            "absolute inset-1.5 rounded-full flex items-center justify-center",
            cursorColors[cursorType].bg
          )}
          animate={{
            scale: isMouseDown ? 0.9 : 1,
            rotate: cursorType === "pointer" ? 15 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          {cursorIcons[cursorType]}
        </motion.div>

        {/* Tooltip */}
        {isHoveringClickable && !isMouseDown && (
          <motion.div
            className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-2 py-1 rounded-full whitespace-nowrap shadow-sm"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
          >
            {cursorType === "link"
              ? "Visit link"
              : cursorType === "magnetic"
                ? "Interactive"
                : "Select"}
          </motion.div>
        )}

        {/* Scrolling indicator */}
        {isScrolling && (
          <motion.div
            className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap flex items-center gap-1"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
          >
            Scrolling
          </motion.div>
        )}
      </motion.div>

      {/* Hover effect */}
      <AnimatePresence>
        {isHoveringClickable && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9998]"
            style={{
              left: position.x,
              top: position.y,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0.3 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className={cn(
                "w-12 h-12 rounded-full blur-md",
                cursorColors[cursorType].bg.replace("bg-", "bg-") + "/20"
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drag indicator */}
      {isDragging && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9997]"
          style={{
            left: position.x,
            top: position.y,
          }}
          animate={{
            x: position.x - 30,
            y: position.y - 30,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-200/20 dark:bg-slate-700/20 border border-slate-300/30 dark:border-slate-600/30">
            <Move className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </div>
        </motion.div>
      )}

      {/* Magnetic effect */}
      <AnimatePresence>
        {cursorType === "magnetic" && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9998]"
            style={{
              left: position.x,
              top: position.y,
            }}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 1.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            <div className="w-20 h-20 rounded-full bg-teal-400/10 dark:bg-teal-500/10 blur-lg" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
