"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { content } from "@/data/content";
import BackgroundFX from "@/components/ui/BackgroundFX";
import { fadeInUp } from "@/lib/motion";

/* eslint-disable @next/next/no-img-element */
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
      className="w-full py-12 md:py-16 lg:py-20 relative z-10 overflow-hidden transition-colors duration-300 bg-[var(--bg)]"
      aria-labelledby="testimonials-heading"
    >
      {/* ── AMBIENT LIGHTING & TEXTURE ── */}
      <BackgroundFX
        bloomColor="primary"
        bloomPosition="top-[30%] left-1/2 -translate-x-1/2 w-[70%] h-[60%]"
        pattern="grid"
        textureOpacity="medium"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 relative z-10">
        {/* ── HEADER ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-12 md:mb-20 text-left"
        >
          <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 md:mb-4">
            {content.sections.testimonials.label || "06 // Client Voices"}
          </p>
          <h2
            id="testimonials-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter leading-[1.08] text-[var(--text-primary)]"
          >
            {content.sections.testimonials.title}
          </h2>
        </motion.div>

        {/* ── CAROUSEL AREA ── */}
        <div className="relative max-w-4xl mx-auto text-center">
          {/* Subtle Background Quote Icon */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 md:-translate-y-8 z-0 opacity-20 pointer-events-none text-[var(--border-strong)]"
          >
            <Quote
              size={100}
              className="md:w-[120px] md:h-[120px]"
              fill="currentColor"
            />
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
                    className="text-lg sm:text-xl md:text-2xl font-medium tracking-tight leading-relaxed md:leading-[1.35] max-w-2xl mx-auto text-[var(--text-primary)]"
                  >
                    &quot;{testimonial.quote}&quot;
                  </p>

                  <div className="mt-6 md:mt-8 flex flex-col items-center gap-2">
                    <p
                      className="font-semibold text-sm md:text-[14px] tracking-tight text-[var(--text-primary)]"
                    >
                      {testimonial.author}
                    </p>
                    <div className="flex items-center gap-2">
                      <p
                        className="text-[11px] md:text-[12px] text-[var(--text-secondary)]"
                      >
                        {testimonial.title}
                        {testimonial.company ? (
                          <span className="opacity-70">
                            , {testimonial.company}
                          </span>
                        ) : (
                          ""
                        )}
                      </p>
                      {testimonial.companyLogoUrl ? (
                        <div className="ml-1 flex h-6 items-center justify-center">
                          <img
                            src={testimonial.companyLogoUrl}
                            alt=""
                            width={60}
                            height={20}
                            decoding="async"
                            loading="lazy"
                            className="h-5 w-auto object-contain opacity-70 grayscale"
                          />
                        </div>
                      ) : null}
                    </div>
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
              className="min-w-[44px] min-h-[44px] flex items-center justify-center p-3.5 md:p-4 rounded-full border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-sm transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-[var(--bg-subtle)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft
                size={20}
                className="md:w-5 md:h-5"
                strokeWidth={2.5}
              />
            </button>
            {/* Pagination Dots */}
            <div className="flex items-center gap-2 md:gap-2.5">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="flex items-center justify-center min-w-[32px] min-h-[32px] p-2 -m-2"
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <span
                    className={`block h-2 md:h-2.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      index === currentIndex
                        ? "w-10 bg-[var(--text-primary)]"
                        : "w-2 bg-[var(--border-strong)]"
                    }`}
                  />
                </button>
              ))}
            </div>
            {/* Next Button */}
            <button
              onClick={handleNext}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center p-3.5 md:p-4 rounded-full border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-sm transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-[var(--bg-subtle)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
              aria-label="Next testimonial"
            >
              <ChevronRight
                size={20}
                className="md:w-5 md:h-5"
                strokeWidth={2.5}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
