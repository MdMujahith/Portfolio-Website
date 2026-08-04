import { Variants, Transition } from "framer-motion";

/**
 * ============================================================================
 * APPLE-STANDARD SPRING PHYSICS
 * ----------------------------------------------------------------------------
 * Mathematically tuned spring transitions modeled after Apple's fluid design
 * system. Spring transitions provide natural momentum without artificial duration or easing curves.
 * ============================================================================
 */

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 1,
};

export const springSmooth: Transition = {
  type: "spring",
  stiffness: 250,
  damping: 25,
  mass: 1,
};

export const springBouncy: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 20,
  mass: 1,
};

export const springHeavy: Transition = {
  type: "spring",
  stiffness: 180,
  damping: 28,
  mass: 1.2,
};

/**
 * ============================================================================
 * STANDARDIZED ANIMATION VARIANTS
 * ----------------------------------------------------------------------------
 * Reusable GPU-optimized reveal and interactive animation variants for Framer Motion.
 * ============================================================================
 */

export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 24,
    willChange: "transform, opacity",
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: springSmooth,
  },
  exit: { 
    opacity: 0, 
    y: 12, 
    transition: springSnappy,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const scaleUp: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.94,
    willChange: "transform, opacity",
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: springSmooth,
  },
};

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const hoverCardScale = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.015, 
    y: -4, 
    transition: springSnappy,
  },
  tap: { 
    scale: 0.985, 
    y: 0, 
    transition: springSnappy,
  },
};
