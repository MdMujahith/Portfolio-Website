"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";

import Hero from "@/components/sections/Hero";
import BottomNav from "@/components/layout/BottomNav";

const Intro        = dynamic(() => import("@/components/sections/Intro"),        { ssr: true });
const Skills       = dynamic(() => import("@/components/sections/Skills"),       { ssr: true });
const Projects     = dynamic(() => import("@/components/sections/Projects"),     { ssr: true });
const Experience   = dynamic(() => import("@/components/sections/Experience"),   { ssr: true });
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), { ssr: true });
const Footer       = dynamic(() => import("@/components/layout/Footer"),         { ssr: true });
const ContactModal = dynamic(() => import("@/components/ui/ContactModal"),       { ssr: false });
const Toast        = dynamic(() => import("@/components/ui/Toast"),              { ssr: false });

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showToast, setShowToast]         = useState(false);
  const [mounted, setMounted]             = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const toggleContact = () => setIsContactOpen((p) => !p);

  const handleSuccess = () => {
    setIsContactOpen(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  if (!mounted) return <div className="min-h-screen" style={{ background: "var(--bg)" }} />;

  return (
    <main
      className="relative min-h-screen transition-colors duration-300"
      style={{ background: "var(--bg)", color: "var(--text-primary)" }}
    >
      <BottomNav onContactClick={toggleContact} />
      <Hero onContactClick={toggleContact} />

      <div>
        <Intro        onContactClick={toggleContact} />
        <Skills />
        <Projects />
        <Experience />
        <Testimonials />
      </div>

      <Footer onContactClick={toggleContact} />

      <AnimatePresence>
        {isContactOpen && (
          <ContactModal
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
            onSuccess={handleSuccess}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showToast && (
          <Toast
            message="Message sent successfully!"
            type="success"
            onClose={() => setShowToast(false)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}