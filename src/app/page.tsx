import React from 'react';
import Hero from './components/Hero';
import Intro from './components/Intro'; // 1. Import the new component
import BottomNav from './components/BottomNav';

const HomePage: React.FC = () => {
  return (
    <>
      <main className="w-full flex flex-col items-center gap-20 overflow-hidden">
        <Hero />
        <Intro /> {/* 2. Add it to the page */}
        {/* Other sections will go here */}
      </main>
      <BottomNav />
    </>
  );
}

export default HomePage;