import React from 'react';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Skills from './components/Skills';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import Testimonials from './components/Testimonials'; // 1. Re-add the import

const HomePage: React.FC = () => {
  return (
    <>
      <main className="w-full flex flex-col items-center overflow-hidden">
        <Hero />
        <Intro />
        <Skills />
        <Testimonials /> {/* 2. Re-add the component here */}
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}

export default HomePage;