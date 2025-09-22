"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Hero from "./components/Hero"; // Keeping Hero static since it's above the fold
import BottomNav from "./components/BottomNav";
import ContactModal from "./components/ContactModal";
import Toast from "./components/Toast";
import { AnimatePresence } from "framer-motion";

// Lazy load sections that are not immediately needed
const Intro = dynamic(() => import("./components/Intro"));
const Skills = dynamic(() => import("./components/Skills"));
const Projects = dynamic(() => import("./components/Projects"));
const Experience = dynamic(() => import("./components/Experience"));
const Testimonials = dynamic(() => import("./components/Testimonials"));
const Footer = dynamic(() => import("./components/Footer"));

const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleEmailCopied = () => {
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000); // Hide toast after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <>
      <main className="w-full flex flex-col items-center overflow-hidden">
        <Hero onContactClick={openModal} />
        <Intro onContactClick={openModal} />
        <Skills />
        <Projects />
        <Experience />
        <Testimonials />
      </main>

      <Footer onContactClick={openModal} />
      <BottomNav onContactClick={openModal} />

      <ContactModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onEmailCopied={handleEmailCopied}
      />

      <AnimatePresence>
        {showToast && <Toast message="Email copied to clipboard" />}
      </AnimatePresence>
    </>
  );
};

export default HomePage;
