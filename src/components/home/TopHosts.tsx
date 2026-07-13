// src/components/home/TopHosts.tsx
'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import Image from 'next/image';
import { Star, Award } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface Host {
  name: string;
  avatar: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  experienceCount: number;
}

const hosts: Host[] = [
  {
    name: 'Shirin Apa',
    avatar:
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=200&q=80', 
    specialty: 'Biryani & Kacchi',
    rating: 4.9,
    reviewCount: 56,
    experienceCount: 12,
  },
  {
    name: 'Rafiq Bhai',
    avatar:
      'https://images.unsplash.com/photo-1536965764833-4301c8ad3ed7?w=200&q=80', 
    specialty: 'Street Food Safari',
    rating: 4.8,
    reviewCount: 43,
    experienceCount: 8,
  },
  {
    name: 'Nusrat Di',
    avatar:
      'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=200&q=80', 
    specialty: 'Pitha & Sweets',
    rating: 4.9,
    reviewCount: 38,
    experienceCount: 10,
  },
  {
    name: 'Karim Ustad',
    avatar:
      'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=200&q=80', 
    specialty: 'Farm-to-Table',
    rating: 4.7,
    reviewCount: 29,
    experienceCount: 6,
  },
  {
    name: 'Fatema Khala',
    avatar:
      'https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=200&q=80', 
    specialty: 'Home Cooking',
    rating: 4.8,
    reviewCount: 34,
    experienceCount: 9,
  },
  {
    name: 'Shakil Vai',
    avatar:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80', 
    specialty: 'Food Photography',
    rating: 4.6,
    reviewCount: 22,
    experienceCount: 5,
  },
];

export default function TopHosts() {
  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      skipSnaps: false,
      dragFree: true,
    },
    [autoplay.current]
  );

 
  useEffect(() => {
    return () => {
      autoplay.current?.stop();
    };
  }, []);

  return (
    <section className="py-20 md:py-15 bg-[#FFF8F0] overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-white border border-[#E67E22]/20 text-[#E67E22] text-xs font-bold tracking-[0.15em] uppercase mb-6 shadow-sm">
            Meet the Masters
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3E2723] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Top Hosts
          </h2>
          <p className="text-[#9C908A] text-lg max-w-xl mx-auto">
            Passionate locals who bring the authentic taste of their kitchen to
            your table.
          </p>
        </motion.div>

        {/* Embla Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6 ml-0">
            {hosts.map((host, index) => (
              <div
                key={index}
                className="flex-[0_0_auto] min-w-0 w-[calc(100%/1-1rem)] sm:w-[calc(100%/2-1rem)] md:w-[calc(100%/3-1rem)] lg:w-[calc(100%/4-1rem)]"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center text-center h-full"
                >
                  <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 ring-4 ring-[#E67E22]/20">
                    <Image
                      src={host.avatar}
                      alt={host.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-[#3E2723]">
                    {host.name}
                  </h3>
                  <p className="text-sm text-[#9C908A] mb-2">
                    {host.specialty}
                  </p>
                  <div className="flex items-center gap-1 text-sm mb-1">
                    <Star className="w-4 h-4 fill-[#E67E22] text-[#E67E22]" />
                    <span className="font-semibold text-[#3E2723]">
                      {host.rating}
                    </span>
                    <span className="text-[#9C908A]">({host.reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#9C908A]">
                    <Award className="w-4 h-4 text-[#E67E22]" />
                    {host.experienceCount} experiences
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Become a Host CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-10"
        >
          <p className="text-[#9C908A] mb-3">Are you a local food hero?</p>
          <a
            href="/become-host"
            className="inline-flex items-center gap-2 text-[#E67E22] font-semibold hover:underline"
          >
            Become a host
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
      </Container>
    </section>
  );
}
