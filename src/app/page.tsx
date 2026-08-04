"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";

import Hero from "@/components/sections/Hero";
import BottomNav from "@/components/layout/BottomNav";

const CommandPalette = dynamic(() => import("@/components/ui/CommandPalette"), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/ui/ScrollProgress"), { ssr: false });

const Intro = dynamic(() => import("@/components/sections/Intro"), { ssr: true });
const Skills = dynamic(() => import("@/components/sections/Skills"), { ssr: true });
const CertificationsSection = dynamic(() => import("@/components/sections/CertificationsSection"), { ssr: true });
const Projects = dynamic(() => import("@/components/sections/Projects"), { ssr: true });
const Experience = dynamic(() => import("@/components/sections/Experience"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), { ssr: true });
const StatsBar = dynamic(() => import("@/components/sections/StatsBar"), { ssr: true });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: true });
const ContactModal = dynamic(() => import("@/components/ui/ContactModal"), { ssr: false });
const Toast = dynamic(() => import("@/components/ui/Toast"), { ssr: false });
const BootOverlay = dynamic(() => import("@/components/ui/BootOverlay"), { ssr: false });

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const toggleContact = () => setIsContactOpen((p) => !p);

  const handleSuccess = () => {
    setIsContactOpen(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  return (
    <main
      className="relative min-h-screen transition-colors duration-300"
      style={{ background: "var(--bg)", color: "var(--text-primary)" }}
    >
      <BootOverlay />
      <ScrollProgress />
      <BottomNav
        onContactClick={toggleContact}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />
      
      <Hero onContactClick={toggleContact} />
      <StatsBar />
      <Intro onContactClick={toggleContact} />
      <Skills />
      <CertificationsSection />
      <Projects />
      <Experience />
      <Testimonials />
      <Footer onContactClick={toggleContact} />

      <CommandPalette
        onOpenContact={toggleContact}
        isOpen={isCommandPaletteOpen}
        onOpenChange={setIsCommandPaletteOpen}
      />

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
