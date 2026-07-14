// src/components/home/Testimonials.tsx
'use client';

import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import Marquee from 'react-fast-marquee';

interface Testimonial {
  name: string;
  avatar: string;
  rating: number;
  quote: string;
  experience: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Rima Akter',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80',
    rating: 5,
    quote:
      'The biryani masterclass was absolutely incredible! I learned secret tips and the taste was out of this world.',
    experience: 'Biryani Masterclass',
  },
  {
    name: 'Tanvir Hasan',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    rating: 5,
    quote:
      'Street food tour at night is a must! Tried so many things I never would have found alone.',
    experience: 'Street Food Safari',
  },
  {
    name: 'Fatima Begum',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
    rating: 4,
    quote:
      'The farm-to-table experience was so fresh and peaceful. My family loved every moment.',
    experience: 'Farm Lunch',
  },
  {
    name: 'Shakib Khan',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    rating: 5,
    quote:
      'Pitha workshop reminded me of my grandmother’s kitchen. The host was so warm and welcoming.',
    experience: 'Pitha Making',
  },
  {
    name: 'Nadia Sultana',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    rating: 5,
    quote:
      'As a food photographer, I got amazing shots and learned new plating techniques. Highly recommend!',
    experience: 'Food Photography Tour',
  },
  {
    name: 'Rakibul Islam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    rating: 4,
    quote:
      'Dinner experience under the stars with live music and 5-course meal. Unforgettable evening!',
    experience: 'Dinner Experience',
  },
];


const allTestimonials = [...testimonials, ...testimonials];

export default function Testimonials() {
  return (
    <section className="py-15  bg-[#FFF8F0] overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-white border border-[#E67E22]/20 text-[#E67E22] text-xs font-bold tracking-[0.15em] uppercase mb-6 shadow-sm">
            What Foodies Say
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3E2723] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Loved by Many
          </h2>
          <p className="text-[#9C908A] text-lg max-w-xl mx-auto">
            Real stories from real food lovers who experienced something
            special.
          </p>
        </motion.div>

        {/* Infinite smooth marquee */}
        <Marquee
          gradient={false}
          speed={60}
          pauseOnHover={true}
          direction="left"
          className="overflow-visible"
        >
          {allTestimonials.map((item, index) => (
            <div key={index} className="mx-4 flex-shrink-0 w-[320px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.4,
                  delay: (index % testimonials.length) * 0.1,
                }}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col h-full relative"
              >
                {/* Quote icon */}
                <Quote className="absolute top-3 right-4 w-8 h-8 text-[#E67E22]/10" />

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < item.rating
                          ? 'fill-[#E67E22] text-[#E67E22]'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-[#5C4F4A] text-sm leading-relaxed mb-4 flex-1">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Divider */}
                <div className="border-t border-[#E67E22]/10 pt-4 flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#E67E22]/20">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#3E2723]">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#9C908A]">{item.experience}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </Marquee>
      </Container>
    </section>
  );
}
