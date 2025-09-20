import React from 'react';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Skills from './components/Skills'; // 1. Import the new component
import BottomNav from './components/BottomNav';

const HomePage: React.FC = () => {
  return (
    <>
      <main className="w-full flex flex-col items-center gap-20 overflow-hidden">
        <Hero />
        <Intro />
        <Skills /> {/* 2. Add it after the Intro section */}
      </main>
      <BottomNav />
    </>
  );
}

export default HomePage;