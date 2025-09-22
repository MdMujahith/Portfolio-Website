"use client";

import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import ContactModal from './components/ContactModal';
import Toast from './components/Toast';
import { AnimatePresence } from 'framer-motion';

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
}

export default HomePage;