import React from 'react';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience'; // 1. Re-add the import
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';

const HomePage: React.FC = () => {
  return (
    <>
      <main className="w-full flex flex-col items-center overflow-hidden">
        <Hero />
        <Intro />
        <Skills />
        <Projects />
        <Experience /> {/* 2. Re-add the component here */}
        <Testimonials />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}

export default HomePage;