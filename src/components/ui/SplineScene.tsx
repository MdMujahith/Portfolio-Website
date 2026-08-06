"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Dynamically import Spline with no SSR to protect Core Web Vitals and avoid hydration blocking
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <SplineSkeletonLoader />,
});

interface SplineSceneProps {
  url?: string;
  className?: string;
}

// Sleek Apple-style glassmorphic skeleton blur placeholder while 3D engine initializes
const SplineSkeletonLoader: React.FC = () => (
  <div className="w-full h-full min-h-[350px] md:min-h-[500px] flex items-center justify-center relative select-none pointer-events-none p-4">
    <div className="w-full h-full min-h-[440px] rounded-3xl bg-[var(--card-bg)] border border-[var(--border)] backdrop-blur-xl shadow-lg flex flex-col items-center justify-center relative overflow-hidden animate-custom-pulse">
      <div className="absolute w-72 h-72 rounded-full bg-cyan-500/10 dark:bg-cyan-400/5 blur-3xl pointer-events-none" />
      <div className="relative flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-[var(--border-strong)] border-t-[var(--text-primary)] animate-spin" />
        <span className="text-[11px] font-medium tracking-widest uppercase text-[var(--text-muted)]">
          Loading 3D Experience
        </span>
      </div>
    </div>
  </div>
);

// High-end aesthetic geometric fallback when offline or if Spline fetch fails
const InteractiveFallback: React.FC = () => (
  <div className="w-full h-full min-h-[380px] md:min-h-[520px] relative flex items-center justify-center overflow-hidden pointer-events-auto group">
    <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-cyan-500/15 via-purple-500/10 to-transparent blur-3xl transition-all duration-700 group-hover:scale-110 pointer-events-none" />

    <motion.div
      className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center cursor-grab active:cursor-grabbing"
      whileHover={{ scale: 1.03, rotateX: 5, rotateY: 5 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full border border-[var(--border-strong)] shadow-[inset_0_0_30px_rgba(255,255,255,0.03)] opacity-70"
        animate={{ rotateZ: 360, rotateX: 35, rotateY: 15 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-8 rounded-full border-2 border-dashed border-[var(--text-muted)] opacity-30"
        animate={{ rotateZ: -360, rotateX: -20, rotateY: 45 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-16 rounded-full border border-cyan-400/30 dark:border-cyan-300/30 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
        animate={{ rotateZ: 360, rotateX: 60, rotateY: -30 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-[var(--card-bg)] border border-[var(--border-strong)] backdrop-blur-xl flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.1)]"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-cyan-400/80 dark:bg-cyan-300/80 shadow-[0_0_24px_rgba(34,211,238,0.7)] animate-pulse" />
      </motion.div>
    </motion.div>
  </div>
);

// Error boundary protecting main application thread from 3D runtime exceptions
class SplineErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("Spline 3D Scene encountered an exception and fell back gracefully:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface SplineApp {
  stop?: () => void;
  play?: () => void;
}

const SplineSceneInner: React.FC<SplineSceneProps> = ({ url, className = "" }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [canRender, setCanRender] = useState(false);
  const [shouldBoot, setShouldBoot] = useState(false);
  const [isInViewport, setIsInViewport] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const splineAppRef = useRef<SplineApp | null>(null);

  useEffect(() => {
    // 1. Hydration safety & strict mobile GPU protection
    // Start false to prevent SSR hydration mismatches and never boot WebGL on mobile devices
    const checkDesktop = () => {
      setCanRender(window.innerWidth >= 1024);
    };
    checkDesktop();

    window.addEventListener("resize", checkDesktop, { passive: true });
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!canRender || !url) return;

    // 2. Asset Loading Optimization: Dynamically inject DNS prefetch & preconnect hints for remote Spline CDN
    if (url.startsWith("http")) {
      try {
        const origin = new URL(url).origin;
        if (!document.querySelector(`link[rel="preconnect"][href="${origin}"]`)) {
          const preconnect = document.createElement("link");
          preconnect.rel = "preconnect";
          preconnect.href = origin;
          preconnect.crossOrigin = "anonymous";
          document.head.appendChild(preconnect);

          const dnsPrefetch = document.createElement("link");
          dnsPrefetch.rel = "dns-prefetch";
          dnsPrefetch.href = origin;
          document.head.appendChild(dnsPrefetch);
        }
      } catch {
        // Ignore invalid URLs gracefully
      }
    }

    // Schedule 3D WebGL runtime booting during idle browser time to protect Core Web Vitals (FCP/INP) & initial animation frames
    const timer = setTimeout(() => {
      if ("requestIdleCallback" in window) {
        (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
          () => setShouldBoot(true),
          { timeout: 1500 }
        );
      } else {
        setShouldBoot(true);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [canRender, url]);

  useEffect(() => {
    if (!shouldBoot || !url || isLoaded || hasError) return;

    // 3. Network Resilience Timeout: If remote .splinecode scene stalls or takes >10s, gracefully fall back
    const timeoutId = setTimeout(() => {
      if (!isLoaded) {
        console.warn("Spline asset download timed out after 10 seconds; switching to smooth InteractiveFallback.");
        setHasError(true);
      }
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, [shouldBoot, url, isLoaded, hasError]);

  // 4. Smart Tracking & Render Loop Control: Pause WebGL execution and mouse tracking when off-screen or tab hidden
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !canRender) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.05;
        setIsInViewport(visible);

        // Immediately stop WebGL rendering & raycasting loop when offscreen to conserve GPU/CPU and eliminate background battery drain
        if (splineAppRef.current) {
          if (visible && !document.hidden) {
            splineAppRef.current.play?.();
          } else {
            splineAppRef.current.stop?.();
          }
        }
      },
      { threshold: [0, 0.05, 0.1], rootMargin: "50px" }
    );

    observer.observe(container);

    // Freeze animation loop instantly when user minimizes browser or switches tabs
    const handleVisibilityChange = () => {
      if (!splineAppRef.current) return;
      if (document.hidden || !isInViewport) {
        splineAppRef.current.stop?.();
      } else {
        splineAppRef.current.play?.();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [canRender, isInViewport]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 5. Block mouse-wheel zooming so scrolling the website over the canvas works smoothly,
    // but permit all pointer, hover, and mouse tracking events to pass uninterrupted to WebGL!
    const blockWheelZoom = (e: Event) => {
      e.stopPropagation();
    };

    container.addEventListener("wheel", blockWheelZoom, { capture: true });

    return () => {
      container.removeEventListener("wheel", blockWheelZoom, { capture: true });
    };
  }, [canRender]);

  // Completely bypass mounting WebGL engine on mobile/small tablets to save battery & scroll fps
  if (!canRender) {
    return null;
  }

  if (!url || hasError) {
    return <InteractiveFallback />;
  }

  // Ensure continuous, fluid cursor tracking whenever the model is visible on screen
  const trackingEnabled = isLoaded && isInViewport;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[440px] flex items-center justify-center ${className}`}
      style={{
        touchAction: "pan-y",
        pointerEvents: trackingEnabled ? "auto" : "none",
      }}
    >
      {(!isLoaded || !shouldBoot) && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-opacity duration-500">
          <SplineSkeletonLoader />
        </div>
      )}
      <div
        className={`w-full h-full min-h-[440px] transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {shouldBoot && (
          <Spline
            scene={url}
            onLoad={(app) => {
              const splineApp = app as unknown as SplineApp;
              splineAppRef.current = splineApp;
              setIsLoaded(true);
              // Immediately suspend if completed loading while in background tab or scrolled out of viewport
              if (document.hidden || !isInViewport) {
                splineApp.stop?.();
              }
            }}
            onError={() => setHasError(true)}
            className="w-full h-full min-h-[440px] outline-none border-none"
          />
        )}
      </div>
    </div>
  );
};

export const SplineScene: React.FC<SplineSceneProps> = (props) => {
  return (
    <SplineErrorBoundary fallback={<InteractiveFallback />}>
      <Suspense fallback={<SplineSkeletonLoader />}>
        <SplineSceneInner {...props} />
      </Suspense>
    </SplineErrorBoundary>
  );
};

export default SplineScene;
