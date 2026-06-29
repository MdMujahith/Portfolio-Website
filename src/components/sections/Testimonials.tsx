"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { content } from "@/data/content";
import BackgroundFX from "@/components/ui/BackgroundFX";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(
    () => setCurrentIndex((p) => (p + 1) % testimonials.length),
    []
  );
  
  const handlePrev = () =>
    setCurrentIndex((p) => (p - 1 + testimonials.length) % testimonials.length);

  // Auto-play functionality
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  return (
    <section
      id="testimonials"
      className="w-full py-20 md:py-28 relative z-10 overflow-hidden transition-colors duration-300"
      style={{ background: "var(--bg)" }}
      aria-labelledby="testimonials-heading"
    >
      {/* ── AMBIENT LIGHTING & TEXTURE (The Proper Way) ── */}
      <BackgroundFX 
        bloomColor="primary" 
        bloomPosition="top-[30%] left-1/2 -translate-x-1/2 w-[70%] h-[60%]"
        pattern="grid"
        textureOpacity="medium"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 relative z-10">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: premiumEase }}
          className="mb-12 md:mb-20 text-left"
        >
          <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 md:mb-4">
            05 // Client Voices
          </p>
          <h2
            id="testimonials-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.08]"
            style={{ color: "var(--text-primary)" }}
          >
            {content.sections.testimonials.title}
          </h2>
        </motion.div>

        {/* ── CAROUSEL AREA ── */}
        <div className="relative max-w-4xl mx-auto text-center">
          
          {/* Subtle Background Quote Icon */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 md:-translate-y-8 z-0 opacity-20 pointer-events-none"
            style={{ color: "var(--border-strong)" }}
          >
            <Quote size={100} className="md:w-[120px] md:h-[120px]" fill="currentColor" />
          </div>

          {/* Quotes Container */}
          <div
            className="relative z-10 min-h-[180px] sm:min-h-[160px] flex flex-col justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="grid grid-cols-1">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`col-start-1 row-start-1 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col items-center justify-center ${
                    index === currentIndex
                      ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
                      : "opacity-0 translate-y-8 pointer-events-none scale-95"
                  }`}
                >
                  <p
                    className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight leading-snug md:leading-[1.3] max-w-3xl mx-auto"
                    style={{ color: "var(--text-primary)" }}
                  >
                    &quot;{testimonial.quote}&quot;
                  </p>
                  
                  <div className="mt-8 md:mt-10">
                    <p
                      className="font-semibold text-[15px] md:text-[17px] tracking-tight"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {testimonial.author}
                    </p>
                    <p
                      className="mt-1 text-[13px] md:text-[14px]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {testimonial.title}
                      {testimonial.company ? <span className="opacity-70">, {testimonial.company}</span> : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CONTROLS: Apple-Style Pagination ── */}
          <div className="flex justify-center items-center gap-6 md:gap-8 mt-10 md:mt-14 z-20 relative">
            
            {/* Previous Button */}
            <button
              onClick={handlePrev}
              className="p-3.5 md:p-4 rounded-full border shadow-sm transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-[var(--bg-subtle)]"
              style={{
                background: "var(--bg-elevated)",
                borderColor: "var(--border-strong)",
                color: "var(--text-primary)",
              }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} className="md:w-5 md:h-5" strokeWidth={2.5} />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2 md:gap-2.5">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="h-2 md:h-2.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    width: index === currentIndex ? "2.5rem" : "0.5rem",
                    background: index === currentIndex
                      ? "var(--text-primary)"
                      : "var(--border-strong)",
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="p-3.5 md:p-4 rounded-full border shadow-sm transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-[var(--bg-subtle)]"
              style={{
                background: "var(--bg-elevated)",
                borderColor: "var(--border-strong)",
                color: "var(--text-primary)",
              }}
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} className="md:w-5 md:h-5" strokeWidth={2.5} />
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;