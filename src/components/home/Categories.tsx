'use client';

import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import {
  CookingPot,
  MapPin,
  Wheat,
  UtensilsCrossed,
  Camera,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Category {
  name: string;
  slug: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  {
    name: 'Cooking Class',
    slug: 'cooking-class',
    icon: <CookingPot className="w-5 h-5" />,
  },
  {
    name: 'Street Food Walk',
    slug: 'street-food',
    icon: <MapPin className="w-5 h-5" />,
  },
  {
    name: 'Farm to Table',
    slug: 'farm-visit',
    icon: <Wheat className="w-5 h-5" />,
  },
  {
    name: 'Dinner Experience',
    slug: 'dinner',
    icon: <UtensilsCrossed className="w-5 h-5" />,
  },
  {
    name: 'Food Photography Tour',
    slug: 'food-photography',
    icon: <Camera className="w-5 h-5" />,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function Categories() {
  return (
    <section className="py-20 md:py-28 bg-soft-cream">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              src="https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Local food experience"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-rich-brown/20 to-transparent" />
          </motion.div>

          {/* Right Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-rich-brown mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Explore Categories
              </h2>
              <p className="text-warm-gray text-lg max-w-xl">
                Find exactly what you’re craving — from hands-on cooking to
                street food adventures.
              </p>
            </motion.div>

            {/* Categories Grid (inside right column) */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {categories.map((cat) => (
                <motion.div
                  key={cat.slug}
                  variants={itemVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group"
                >
                  <Link
                    href={`/explore?category=${cat.slug}`}
                    className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-brand-orange/20"
                  >
                    {/* Icon circle (smaller) */}
                    <div className="w-12 h-12 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                      {cat.icon}
                    </div>
                    <span className="text-xs md:text-sm font-medium text-rich-brown text-center group-hover:text-brand-orange transition-colors">
                      {cat.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
