'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';

const slides = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1920&q=80',
    title: 'Taste the Unseen',
    subtitle:
      'Discover authentic food experiences hosted by passionate locals.',
    cta: 'Explore Experiences',
    link: '/explore',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80',
    title: 'Cook with Love',
    subtitle:
      'Learn secret recipes from home chefs in immersive cooking classes.',
    cta: 'Join a Class',
    link: '/explore?category=cooking-class',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80',
    title: 'Street Food Safari',
    subtitle: 'Walk through hidden alleys and taste the soul of the city.',
    cta: 'Book a Tour',
    link: '/explore?category=food-tour',
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 2000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Scroll to next section
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('next-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative h-[70vh] overflow-hidden -mt-20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Slides with smooth crossfade */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slides[currentSlide].id}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#2D1B33]/70" />

      {/* Centered Content */}
      <Container className="relative h-full flex flex-col justify-center items-center text-center text-[#FDFBF7]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[currentSlide].id}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl w-full"
          >
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-[#FDFBF7]/80 font-light max-w-2xl mx-auto">
              {slides[currentSlide].subtitle}
            </p>
            <Link href={slides[currentSlide].link}>
              <Button className="text-lg px-8 py-3">
                {slides[currentSlide].cta}
              </Button>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Search Bar */}
        <motion.div
          className="mt-8 w-full max-w-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 overflow-hidden">
            <input
              type="text"
              placeholder="Search by city, cuisine, or keyword..."
              className="flex-1 bg-transparent px-6 py-3 text-white placeholder-white/60 focus:outline-none"
            />
            <button className="px-6 py-3 bg-[#D35400] hover:bg-[#E67E22] transition-colors text-white font-medium">
              Search
            </button>
          </div>
        </motion.div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentSlide
                  ? 'bg-[#D35400] scale-125'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>

        {/* Scroll Down */}
        <button
          onClick={scrollToNextSection}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 focus:outline-none group"
          aria-label="Scroll to next section"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center"
          >
            <span className="text-white/60 text-xs mb-1 group-hover:text-white transition-colors">
              Scroll Down
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white/70 group-hover:text-white transition-colors"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </motion.div>
        </button>
      </Container>
    </section>
  );
}
