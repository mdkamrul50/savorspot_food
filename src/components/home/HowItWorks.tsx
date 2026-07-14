// src/components/home/HowItWorks.tsx
'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '@/components/layout/Container';
import { Search, CalendarCheck, UtensilsCrossed } from 'lucide-react';

interface Step {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: '01',
    icon: <Search className="w-6 h-6" />,
    title: 'Browse Experiences',
    description:
      'Explore authentic food experiences hosted by locals in your city.',
  },
  {
    number: '02',
    icon: <CalendarCheck className="w-6 h-6" />,
    title: 'Book a Spot',
    description:
      'Choose a date, check availability, and reserve your seat instantly.',
  },
  {
    number: '03',
    icon: <UtensilsCrossed className="w-6 h-6" />,
    title: 'Taste & Enjoy',
    description:
      'Attend the experience, meet new people, and savour the flavours.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-[#FFF1E6] overflow-hidden"
    >
      {/* Subtle ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-24 -right-24 w-96 h-96 bg-[#E67E22]/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#D35400]/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      <Container className="relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-white border border-[#E67E22]/20 text-[#E67E22] text-xs font-bold tracking-[0.15em] uppercase mb-4 shadow-sm">
            How It Works
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D1B33] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            From browsing to tasting in <br />
            <span className="text-[#D35400]">three simple steps</span>
          </h2>
          <p className="text-[#5C4F4A] text-lg max-w-xl mx-auto">
            Discover local food experiences effortlessly.
          </p>
        </motion.div>

        {/* Steps with connecting line */}
        <motion.div
          className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Animated connecting line (desktop only) */}
          <div className="absolute top-14 left-[calc(16.666%+1.5rem)] right-[calc(16.666%+1.5rem)] hidden md:block h-0.5">
            <motion.div
              className="w-full h-full bg-gradient-to-r from-[#D35400]/40 via-[#D35400]/80 to-[#D35400]/40"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.5 }}
              style={{ originX: 0 }}
            />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              className="group relative flex flex-col items-center text-center"
            >
              {/* Step number & icon */}
              <div className="relative mb-6 z-10">
                {/* Outer ring */}
                <motion.div
                  className="w-24 h-24 rounded-full bg-white shadow-md shadow-[#D35400]/5 flex items-center justify-center 
                              border-2 border-transparent bg-gradient-to-br from-white to-[#FFF1E6]
                              group-hover:shadow-lg group-hover:shadow-[#D35400]/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-full bg-[#D35400]/10 text-[#D35400] flex items-center justify-center 
                                  group-hover:bg-[#D35400] group-hover:text-white transition-colors duration-300"
                  >
                    {step.icon}
                  </div>
                </motion.div>
                {/* Step number badge */}
                <span className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#D35400] text-white text-xs font-bold flex items-center justify-center shadow-md shadow-[#D35400]/30">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl md:text-2xl font-bold text-[#2D1B33] mb-3">
                {step.title}
              </h3>
              <p className="text-[#5C4F4A] leading-relaxed max-w-[280px] mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Optional floating cards for extra premium feel */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-[#9C908A] text-sm">
            Join hundreds of happy foodies
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
