"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { content } from "@/data/content";

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused]         = useState(false);

  const handleNext = useCallback(
    () => setCurrentIndex((p) => (p + 1) % testimonials.length),
    []
  );
  const handlePrev = () =>
    setCurrentIndex((p) => (p - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  return (
    <section
      id="testimonials"
      className="w-full py-20 sm:py-24 overflow-hidden transition-colors duration-300"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-4xl mx-auto px-6 relative text-center">

        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-semibold text-center animate-gradient-text mb-12 sm:mb-16">
          {content.sections.testimonials.title}
        </h2>

        {/* Background quote icon */}
        <div
          className="absolute top-24 left-1/2 -translate-x-1/2 z-0 opacity-50"
          style={{ color: "var(--border-strong)" }}
        >
          <Quote size={120} fill="currentColor" />
        </div>

        {/* Carousel */}
        <div
          className="relative z-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-1">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`col-start-1 row-start-1 transition-all duration-700 ease-in-out flex flex-col items-center justify-center ${
                  index === currentIndex
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                <p
                  className="text-xl sm:text-2xl md:text-3xl font-light leading-relaxed max-w-3xl mx-auto"
                  style={{ color: "var(--text-secondary)" }}
                >
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="mt-8">
                  <p
                    className="font-semibold text-lg sm:text-xl"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {testimonial.author}
                  </p>
                  <p
                    className="mt-1 text-sm sm:text-base"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {testimonial.title}
                    {testimonial.company ? `, ${testimonial.company}` : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-6 mt-12 z-20 relative">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full border shadow-sm hover:shadow-md transition-all duration-200"
            style={{
              background:   "var(--bg-elevated)",
              borderColor:  "var(--border-strong)",
              color:        "var(--text-secondary)",
            }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width:      index === currentIndex ? "2rem" : "0.5rem",
                  background: index === currentIndex
                    ? "var(--text-primary)"
                    : "var(--border-strong)",
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-full border shadow-sm hover:shadow-md transition-all duration-200"
            style={{
              background:   "var(--bg-elevated)",
              borderColor:  "var(--border-strong)",
              color:        "var(--text-secondary)",
            }}
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;