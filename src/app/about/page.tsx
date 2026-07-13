// src/app/about/page.tsx
'use client';

import { useState, useEffect, useRef, FC, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Container from '@/components/layout/Container';
import Image from 'next/image';
import {
  Users,
  Globe,
  UtensilsCrossed,
  Star,
  Heart,
  MapPin,
  Award,
  Sprout,
} from 'lucide-react';
import Link from 'next/link';

// ──── Count-up hook ────
function useCountUp(end: number, duration = 2000, start = 0) {
  const [count, setCount] = useState(start);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) setHasAnimated(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated]);
  useEffect(() => {
    if (!hasAnimated) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [hasAnimated, end, duration, start]);
  return { count, ref };
}

// ──── Types ────
interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}
interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: ReactNode;
}

// ──── Data ────
const team: TeamMember[] = [
  {
    name: 'Shirin Apa',
    role: 'Head Chef & Co-Founder',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    bio: '20 years of home-cooking. Brings authentic flavors.',
  },
  {
    name: 'Rafiq Bhai',
    role: 'Street Food Curator',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio: 'Explorer of hidden food alleys.',
  },
  {
    name: 'Nusrat Di',
    role: 'Community Manager',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
    bio: 'Connecting food lovers & hosts.',
  },
  {
    name: 'Tech Team',
    role: 'Developers & Designers',
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    bio: 'Building the platform.',
  },
];

const milestones: Milestone[] = [
  {
    year: '2022',
    title: 'The Beginning',
    description: 'Shirin Apa hosted her first biryani class for 3 guests.',
    icon: <Sprout className="w-6 h-6" />,
  },
  {
    year: '2023',
    title: 'Growing Community',
    description: 'Reached 100+ experiences and 500 happy foodies.',
    icon: <Users className="w-6 h-6" />,
  },
  {
    year: '2024',
    title: 'City Expansion',
    description: 'Spread to Chittagong, Sylhet, Barisal.',
    icon: <MapPin className="w-6 h-6" />,
  },
  {
    year: '2025',
    title: 'SavorSpot v2',
    description: 'Launched new platform with bookings & reviews.',
    icon: <Award className="w-6 h-6" />,
  },
];

export default function AboutPage() {
  const { scrollY } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroY = useTransform(scrollY, [0, 600], [0, 200]);

  return (
    <div className="min-h-screen bg-[#FFF8F0] pt-28 pb-20">
      {/* ─── Hero with Parallax ─── */}
      <div
        ref={heroRef}
        className="relative h-[70vh] max-h-[700px] overflow-hidden bg-[#3B2F2F]"
      >
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80"
            alt="Food background"
            fill
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-[#3B2F2F]/80" />
        <Container className="relative h-full flex flex-col justify-center items-center text-center text-white">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block py-1.5 px-4 rounded-full bg-[#E67E22]/20 border border-[#E67E22]/30 text-[#E67E22] text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-sm"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Bringing Local Flavors <br /> to the{' '}
            <span className="text-[#E67E22]">World</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/70 text-lg md:text-xl max-w-2xl"
          >
            From a single biryani class to a nationwide community — our journey.
          </motion.p>
        </Container>
      </div>

      {/* ─── Journey / Timeline ─── */}
      <section className="py-24 bg-[#FFF8F0]">
        <Container>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#3B2F2F] text-center mb-16"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Journey
          </motion.h2>

          {/* Desktop Timeline */}
          <div className="hidden md:block relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#E67E22]/20" />
            {milestones.map((m, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2, duration: 0.5 }}
                  className={`flex items-center mb-12 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div
                    className={`w-1/2 ${isLeft ? 'text-right pr-10' : 'text-left pl-10'}`}
                  >
                    <span className="text-4xl font-bold text-[#E67E22]">
                      {m.year}
                    </span>
                    <h3 className="text-2xl font-bold text-[#3B2F2F] mt-2">
                      {m.title}
                    </h3>
                    <p className="text-[#9C908A] mt-2">{m.description}</p>
                  </div>
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#E67E22] text-white shadow-lg shadow-[#E67E22]/30 z-10">
                    {m.icon}
                  </div>
                  <div className="w-1/2" />
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Timeline (horizontal scroll) */}
          <div className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
            {milestones.map((m, idx) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="snap-center min-w-[250px] bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-[#E67E22] text-white flex items-center justify-center mb-4">
                  {m.icon}
                </div>
                <span className="text-3xl font-bold text-[#E67E22]">
                  {m.year}
                </span>
                <h3 className="text-xl font-bold text-[#3B2F2F] mt-2">
                  {m.title}
                </h3>
                <p className="text-[#9C908A] mt-2">{m.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Animated Stats ─── */}
      <section className="py-20 bg-[#3B2F2F]">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: UtensilsCrossed,
                end: 345,
                suffix: '+',
                label: 'Experiences',
              },
              { icon: Users, end: 2150, suffix: '+', label: 'Happy Foodies' },
              { icon: Globe, end: 15, suffix: '', label: 'Cities' },
              { icon: Star, end: 48, suffix: '', label: 'Avg Rating (4.8)' },
            ].map((stat, idx) => {
              const { count, ref } = useCountUp(stat.end);
              return (
                <motion.div
                  key={idx}
                  ref={ref}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center text-white"
                >
                  <stat.icon className="w-8 h-8 text-[#E67E22] mx-auto mb-3" />
                  <div className="text-3xl md:text-4xl font-bold">
                    {count}
                    {stat.suffix}
                  </div>
                  <div className="text-white/60 text-sm mt-1">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ─── Team with Flip Cards ─── */}
      <section className="py-24 bg-[#FFF8F0]">
        <Container>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#3B2F2F] text-center mb-12"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Meet the Team
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#3B2F2F]">{member.name}</h3>
                  <p className="text-[#E67E22] text-sm font-medium">
                    {member.role}
                  </p>
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    whileHover={{ height: 'auto', opacity: 1 }}
                    className="text-[#9C908A] text-sm mt-2 overflow-hidden transition-all duration-300"
                  >
                    {member.bio}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Join CTA ─── */}
      <section className="pb-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ boxShadow: '0 30px 40px -15px rgba(0,0,0,0.3)' }}
            className="relative bg-gradient-to-br from-[#3B2F2F] to-[#4E342E] rounded-3xl p-10 md:p-16 text-center text-white overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(#E67E22_0.5px,transparent_0.5px)] [background-size:20px_20px] opacity-[0.05]" />
            <h2
              className="text-3xl md:text-4xl font-bold relative z-10 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Want to Share Your Kitchen?
            </h2>
            <p className="text-white/70 relative z-10 max-w-xl mx-auto mb-6">
              Become a host on SavorSpot and turn your culinary passion into
              unforgettable experiences.
            </p>
            <Link
              href="/experiences/add"
              className="relative z-10 inline-flex items-center gap-2 px-8 py-3 bg-[#E67E22] text-white font-semibold rounded-full hover:bg-[#d35400] transition"
            >
              <Heart className="w-5 h-5" /> Become a Host
            </Link>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
