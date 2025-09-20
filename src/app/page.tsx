import React from 'react';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials'; // 1. Import
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';

const HomePage: React.FC = () => {
  return (
    <>
      <main className="w-full flex flex-col items-center overflow-hidden">
        <Hero />
        <Intro />
        <Skills />
        <Testimonials /> {/* 2. Add it here */}
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}

export default HomePage;