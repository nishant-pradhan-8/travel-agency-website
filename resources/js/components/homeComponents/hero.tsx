import React from 'react';

const HeroSection = () => {
  return (
    <section className=" text-white px-6 py-12 pt-18 md:px-20">
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight font-[playfair]">
        Explore the <span >Nepal</span> with <br /> exciting people
      </h1>
      <p className="mt-4 text-lg text-gray-100">
        We help people travel Nepal
      </p>
      <button className="mt-6 bg-primary text-black px-6 py-2 rounded-full font-medium hover:bg-lime-300 transition">
        Book a Trip &rarr;
      </button>
    </section>
  );
};

export default HeroSection;
