import React from 'react';
import Hero from './components/Hero';
import BottomNav from './components/BottomNav'; // Assuming BottomNav is in the same folder

const HomePage: React.FC = () => {
  return (
    <>
      <main className="w-full flex flex-col items-center gap-20 overflow-hidden">
        <Hero />
        {/* Other sections will go here */}
      </main>
      <BottomNav />
    </>
  );
}

export default HomePage;