'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Star, Clock } from 'lucide-react';



interface Experience {
  _id: string;
  title: string;
  shortDescription: string;
  images: string[];
  pricePerPerson: number;
  currency: string;
  location: { city: string; area?: string };
  ratingAvg: number;
  reviewCount: number;
  duration: number;
}

const DEMO_EXPERIENCES: Experience[] = [
  {
    _id: '1',
    title: 'Traditional Biryani Masterclass',
    shortDescription:
      'Learn the secrets of authentic Dhaka-style biryani from a local chef.',
    images: [
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80',
    ],
    pricePerPerson: 1500,
    currency: 'BDT',
    location: { city: 'Dhaka', area: 'Old Dhaka' },
    ratingAvg: 4.8,
    reviewCount: 24,
    duration: 3,
  },
  {
    _id: '2',
    title: 'Street Food Safari at Night',
    shortDescription:
      'Taste the best fuchka, chotpoti & more on a guided evening walk.',
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    ],
    pricePerPerson: 800,
    currency: 'BDT',
    location: { city: 'Chittagong', area: 'GEC Circle' },
    ratingAvg: 4.6,
    reviewCount: 18,
    duration: 2.5,
  },
  {
    _id: '3',
    title: 'Farm-to-Table Organic Lunch',
    shortDescription:
      'Enjoy a fresh farm visit and a home-cooked organic meal in the countryside.',
    images: [
      'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=600&q=80',
    ],
    pricePerPerson: 2000,
    currency: 'BDT',
    location: { city: 'Sylhet' },
    ratingAvg: 4.9,
    reviewCount: 32,
    duration: 5,
  },
  {
    _id: '4',
    title: 'Pitha Making Workshop',
    shortDescription:
      'Hands-on winter pitha making session with a grandmother in the village.',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    ],
    pricePerPerson: 600,
    currency: 'BDT',
    location: { city: 'Manikganj' },
    ratingAvg: 4.7,
    reviewCount: 15,
    duration: 2,
  },
];



function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-4 bg-gray-200 rounded w-16" />
          <div className="h-4 bg-gray-200 rounded w-20" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Featured Experiences Section                                      */
/* ------------------------------------------------------------------ */

export default function FeaturedExperiences() {
  const [loading, setLoading] = useState<boolean>(true);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExperiences(DEMO_EXPERIENCES);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 md:py-28 bg-[#FFF8F0]">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3E2723] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Featured Experiences
          </h2>
          <p className="text-[#9C908A] text-lg max-w-xl mx-auto">
            Handpicked local food adventures that you’ll remember forever.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
            : experiences.map((exp) => (
                <motion.div
                  key={exp._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={exp.images[0]}
                      alt={exp.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#E67E22] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {exp.currency === 'BDT' ? '৳' : '$'}
                      {exp.pricePerPerson}
                      <span className="font-normal"> / person</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-[#3E2723] mb-1 line-clamp-1">
                      {exp.title}
                    </h3>
                    <p className="text-[#9C908A] text-sm mb-3 line-clamp-2">
                      {exp.shortDescription}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-[#9C908A] mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#E67E22]" />
                        {exp.location.city}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#E67E22]" />
                        {exp.duration}h
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <span className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 fill-[#E67E22] text-[#E67E22]" />
                        <span className="font-semibold text-[#3E2723]">
                          {exp.ratingAvg.toFixed(1)}
                        </span>
                        <span className="text-[#9C908A]">
                          ({exp.reviewCount})
                        </span>
                      </span>
                      <Link
                        href={`/experiences/${exp._id}`}
                        className="text-sm font-medium text-[#E67E22] hover:underline"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>

        {/* View all link */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-10"
          >
            <a
              href="/explore"
              className="inline-flex items-center gap-2 text-[#E67E22] font-semibold hover:underline"
            >
              View all experiences
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </motion.div>
        )}
      </Container>
    </section>
  );
}
