'use client';

import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import { Search, CalendarCheck, UtensilsCrossed } from 'lucide-react';

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: <Search className="w-7 h-7" />,
    title: 'Browse Experiences',
    description:
      'Explore authentic food experiences hosted by locals in your city.',
  },
  {
    icon: <CalendarCheck className="w-7 h-7" />,
    title: 'Book a Spot',
    description:
      'Choose a date, check availability, and reserve your seat instantly.',
  },
  {
    icon: <UtensilsCrossed className="w-7 h-7" />,
    title: 'Taste & Enjoy',
    description:
      'Attend the experience, meet new people, and savour the flavours.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-[#FFF1E6]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D1B33] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            How It Works
          </h2>
          <p className="text-lg text-[#5C4F4A] max-w-xl mx-auto">
            From browsing to tasting, we make discovering local food experiences
            effortless.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="group relative bg-white rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              variants={itemVariants}
            >
              {/* Icon circle */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D35400]/10 text-[#D35400] mb-5 group-hover:bg-[#D35400] group-hover:text-white transition-colors duration-300">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-[#2D1B33] mb-3">
                {step.title}
              </h3>
              <p className="text-[#5C4F4A] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
