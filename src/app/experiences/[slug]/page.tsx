// src/app/experiences/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import {
  MapPin,
  Clock,
  Star,
  Users,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// ──── Types (backend response) ────
interface Experience {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  pricePerPerson: number;
  currency: string;
  location: { city: string; area?: string; fullAddress?: string };
  ratingAvg: number;
  reviewCount: number;
  duration: number;
  maxGroupSize: number;
  category: string;
  host?: {
    name: string;
    avatar: string;
    bio: string;
  };
  reviews?: Review[];
}

interface Review {
  id: string;
  user: { name: string; avatar: string };
  rating: number;
  comment: string;
  date: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Helper function to add dummy host if missing (since backend may not have host yet)
const enrichWithHost = (exp: Experience): Experience => ({
  ...exp,
  host: exp.host || {
    name: 'Local Host',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    bio: 'Passionate local host sharing authentic flavors.',
  },
});

// Mini card for related experiences
function MiniExperienceCard({ experience }: { experience: Experience }) {
  return (
    <Link href={`/experiences/${experience._id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
      >
        <div className="relative aspect-[4/3]">
          <Image
            src={experience.images[0]}
            alt={experience.title}
            fill
            sizes="(max-width: 640px) 100vw, 25vw"
            className="object-cover"
          />
          <div className="absolute top-2 left-2 bg-[#E67E22] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            ৳{experience.pricePerPerson}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-[#3B2F2F] text-sm line-clamp-1">
            {experience.title}
          </h3>
          <div className="flex items-center gap-1 text-xs text-[#9C908A] mt-1">
            <Star className="w-3 h-3 fill-[#E67E22] text-[#E67E22]" />
            {experience.ratingAvg} ({experience.reviewCount})
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function ExperienceDetailPage() {
  const params = useParams();
  const slug = params.slug as string; // this is the experience _id

  const [experience, setExperience] = useState<Experience | null>(null);
  const [relatedExps, setRelatedExps] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isLoved, setIsLoved] = useState(false);

  // Fetch main experience
  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    const fetchExperience = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/experiences/${slug}`);
        if (!res.ok) throw new Error('Experience not found');
        const data = await res.json();
        if (!cancelled) {
          setExperience(enrichWithHost(data.experience));
        }
      } catch (err: any) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchExperience();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  // Fetch related experiences (just a few, excluding current)
  useEffect(() => {
    if (!experience) return;
    const fetchRelated = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/experiences?limit=5&page=1`);
        if (!res.ok) return;
        const data = await res.json();
        const others = (data.experiences as Experience[])
          .filter((e: Experience) => e._id !== experience._id)
          .slice(0, 4);
        setRelatedExps(others);
      } catch (err) {
        // silently ignore; related is optional
      }
    };
    fetchRelated();
  }, [experience]);

  const nextImage = () => {
    if (experience)
      setActiveImage((prev) => (prev + 1) % experience.images.length);
  };
  const prevImage = () => {
    if (experience)
      setActiveImage(
        (prev) =>
          (prev - 1 + experience.images.length) % experience.images.length
      );
  };

  // Loading / Error / Not Found
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] pt-28 pb-20 flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-[#E67E22] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !experience) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] pt-28 pb-20 flex flex-col items-center justify-center text-center">
        <p className="text-xl text-[#3B2F2F] mb-2">Experience not found</p>
        <Link href="/explore" className="text-[#E67E22] hover:underline">
          Back to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Hero Image Gallery */}
      <div className="relative w-full h-[50vh] md:h-[60vh] bg-[#3B2F2F] overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={experience.images[activeImage]}
              alt={experience.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-[#3B2F2F]/70" />
        {/* Back button */}
        <div className="absolute top-6 left-6 z-10">
          <Link
            href="/explore"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">Back</span>
          </Link>
        </div>
        {/* Image arrows */}
        {experience.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/40 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/40 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {experience.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === activeImage ? 'bg-[#E67E22] scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      <Container className="py-10">
        {/* Title & Quick Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8"
        >
          <div>
            <h1
              className="text-3xl md:text-4xl font-bold text-[#3B2F2F] mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {experience.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-[#9C908A]">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-[#E67E22] text-[#E67E22]" />
                {experience.ratingAvg} ({experience.reviewCount} reviews)
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-[#E67E22]" />
                {experience.location.city}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLoved(!isLoved)}
              className={`p-2 rounded-full transition ${isLoved ? 'text-red-500' : 'text-gray-400'} hover:bg-gray-100`}
            >
              <Heart className={`w-5 h-5 ${isLoved ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100 transition">
              <Share2 className="w-5 h-5" />
            </button>
            {/* Price & Book button */}
            <div className="hidden md:block bg-white shadow-lg rounded-xl p-4 text-right">
              <p className="text-xs text-gray-500">per person</p>
              <p className="text-2xl font-bold text-[#3B2F2F]">
                ৳{experience.pricePerPerson}
              </p>
              <button className="mt-2 px-6 py-2 bg-[#E67E22] text-white rounded-full font-medium hover:bg-[#d35400] transition">
                Book Now
              </button>
            </div>
          </div>
        </motion.div>

        {/* Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-[#3B2F2F] mb-4">
                About this experience
              </h2>
              <p className="text-[#5C4F4A] leading-relaxed whitespace-pre-line">
                {experience.fullDescription}
              </p>
            </motion.section>

            {/* Host */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-sm flex items-start gap-4"
            >
              <Image
                src={experience.host?.avatar || '/images/default-avatar.png'}
                alt={experience.host?.name || 'Host'}
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold text-[#3B2F2F]">
                  Hosted by {experience.host?.name || 'Unknown Host'}
                </h3>
                <p className="text-[#5C4F4A] text-sm mt-1">
                  {experience.host?.bio ||
                    'Passionate local sharing food culture.'}
                </p>
              </div>
            </motion.section>

            {/* Reviews */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-[#3B2F2F] mb-4">
                Reviews ({experience.reviewCount})
              </h2>
              {experience.reviews && experience.reviews.length > 0 ? (
                <div className="space-y-6">
                  {experience.reviews.map((rev) => (
                    <div key={rev.id} className="flex gap-4">
                      <Image
                        src={rev.user.avatar}
                        alt={rev.user.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-[#3B2F2F]">
                            {rev.user.name}
                          </h4>
                          <span className="text-xs text-gray-400">
                            {rev.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < rev.rating
                                  ? 'fill-[#E67E22] text-[#E67E22]'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-[#5C4F4A] mt-2">
                          {rev.comment}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#9C908A]">
                  No reviews yet. Be the first to share your experience!
                </p>
              )}
            </motion.section>
          </div>

          {/* Right Column: Key Info & Sticky Booking Card */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm sticky top-24"
            >
              <h3 className="text-xl font-bold text-[#3B2F2F] mb-4">
                Key Information
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#E67E22]" />
                  <span className="text-[#3B2F2F]">
                    {experience.duration} hours
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-[#E67E22]" />
                  <span className="text-[#3B2F2F]">
                    Up to {experience.maxGroupSize} people
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#E67E22]" />
                  <span className="text-[#3B2F2F]">
                    {experience.location.fullAddress ||
                      experience.location.city}
                  </span>
                </div>
              </div>
              {/* Price & Book for mobile */}
              <div className="mt-6 md:hidden">
                <p className="text-xs text-gray-500">per person</p>
                <p className="text-2xl font-bold text-[#3B2F2F]">
                  ৳{experience.pricePerPerson}
                </p>
                <button className="mt-3 w-full py-3 bg-[#E67E22] text-white rounded-full font-semibold hover:bg-[#d35400] transition">
                  Book Now
                </button>
              </div>
              <div className="hidden md:block mt-6">
                <button className="w-full py-3 bg-[#E67E22] text-white rounded-full font-semibold hover:bg-[#d35400] transition">
                  Book Now
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Experiences */}
        {relatedExps.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h2
              className="text-2xl md:text-3xl font-bold text-[#3B2F2F] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              You may also like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedExps.map((rel) => (
                <MiniExperienceCard key={rel._id} experience={rel} />
              ))}
            </div>
          </motion.section>
        )}
      </Container>
    </div>
  );
}
