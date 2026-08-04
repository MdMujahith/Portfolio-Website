"use client";

import React, { useEffect, useRef } from "react";
import { motion, useSpring, type HTMLMotionProps } from "framer-motion";

type MagneticButtonProps = HTMLMotionProps<"button"> & {
  children: React.ReactNode;
};

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  style,
  className,
  type = "button",
  ...props
}) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const x = useSpring(0, { stiffness: 220, damping: 18 });
  const y = useSpring(0, { stiffness: 220, damping: 18 });
  const scale = useSpring(1, { stiffness: 240, damping: 20 });

  useEffect(() => {
    if (!ref.current) return;
    const button = ref.current;

    const handleMove = (event: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const offsetX = ((event.clientX - centerX) / rect.width) * 7;
      const offsetY = ((event.clientY - centerY) / rect.height) * 7;
      x.set(offsetX);
      y.set(offsetY);
      scale.set(1.02);
    };

    const handleLeave = () => {
      x.set(0);
      y.set(0);
      scale.set(1);
    };

    button.addEventListener("mousemove", handleMove);
    button.addEventListener("mouseleave", handleLeave);
    button.addEventListener("touchend", handleLeave);
    return () => {
      button.removeEventListener("mousemove", handleMove);
      button.removeEventListener("mouseleave", handleLeave);
      button.removeEventListener("touchend", handleLeave);
    };
  }, [scale, x, y]);

  return (
    <motion.button
      ref={ref}
      type={type}
      whileTap={{ scale: 0.97 }}
      style={{ x, y, scale, ...style }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;
