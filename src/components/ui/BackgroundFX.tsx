// components/ui/BackgroundFX.tsx
import React from "react";

interface BackgroundFXProps {
  /** Chooses which CSS variable to use for the glow */
  bloomColor?: "primary" | "accent";
  /** Tailwind classes for positioning the blur (e.g., "top-0 left-0") */
  bloomPosition?: string;
  /** Opacity of the animated grid/pattern */
  textureOpacity?: "light" | "medium" | "heavy";
  /** Choose between the grid or the X pattern */
  pattern?: "grid" | "x-pattern";
}

const BackgroundFX: React.FC<BackgroundFXProps> = ({
  bloomColor = "primary",
  bloomPosition = "top-[30%] left-1/2 -translate-x-1/2",
  textureOpacity = "medium",
  pattern = "grid",
}) => {
  // Map our simplified props to Tailwind classes
  const colorClass = bloomColor === "primary" ? "bg-[var(--text-primary)]" : "bg-[var(--accent)]";
  
  const opacityMap = {
    light: "opacity-20 dark:opacity-10",
    medium: "opacity-40 dark:opacity-20",
    heavy: "opacity-60 dark:opacity-30",
  };

  const patternClass = pattern === "grid" ? "grid-bg animate-custom-pulse" : "animated-x-pattern";

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* 1. The Light Bloom */}
      <div 
        className={`absolute w-[60%] h-[60%] rounded-[100%] blur-[120px] opacity-[0.03] dark:opacity-[0.05] ${colorClass} ${bloomPosition}`} 
      />
      
      {/* 2. The Texture Pattern */}
      <div className={`absolute inset-0 mix-blend-overlay ${patternClass} ${opacityMap[textureOpacity]}`} />
      
      {/* 3. The Vertical Fade (Vignette) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-transparent to-[var(--bg)]" />
    </div>
  );
};

export default BackgroundFX;