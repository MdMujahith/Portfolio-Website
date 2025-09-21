import React from 'react';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';

const HomePage: React.FC = () => {
  return (
    <>
      <main className="w-full flex flex-col items-center overflow-hidden">
        <Hero />
        <Intro />
        <Projects /> {/* 2. Add it here */}
        <Skills />
        <Testimonials />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}

export default HomePage;