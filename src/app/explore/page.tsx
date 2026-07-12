// src/app/explore/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/layout/Container';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  MapPin,
  Star,
  Clock,
} from 'lucide-react';

// ──── Type ────
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
  category: string;
}

// ──── Demo Data ────
const allExperiences: Experience[] = [
  {
    _id: '1',
    title: 'Traditional Biryani Masterclass',
    shortDescription: 'Learn the secrets of authentic Dhaka-style biryani.',
    images: [
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80',
    ],
    pricePerPerson: 1500,
    currency: 'BDT',
    location: { city: 'Dhaka' },
    ratingAvg: 4.8,
    reviewCount: 24,
    duration: 3,
    category: 'cooking-class',
  },
  {
    _id: '2',
    title: 'Street Food Safari at Night',
    shortDescription: 'Taste the best fuchka, chotpoti & more.',
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    ],
    pricePerPerson: 800,
    currency: 'BDT',
    location: { city: 'Chittagong' },
    ratingAvg: 4.6,
    reviewCount: 18,
    duration: 2.5,
    category: 'street-food',
  },
  {
    _id: '3',
    title: 'Farm-to-Table Organic Lunch',
    shortDescription: 'Fresh farm visit and a home-cooked organic meal.',
    images: [
      'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=600&q=80',
    ],
    pricePerPerson: 2000,
    currency: 'BDT',
    location: { city: 'Sylhet' },
    ratingAvg: 4.9,
    reviewCount: 32,
    duration: 5,
    category: 'farm-visit',
  },
  {
    _id: '4',
    title: 'Pitha Making Workshop',
    shortDescription: 'Hands-on pitha making with a grandmother.',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    ],
    pricePerPerson: 600,
    currency: 'BDT',
    location: { city: 'Manikganj' },
    ratingAvg: 4.7,
    reviewCount: 15,
    duration: 2,
    category: 'cooking-class',
  },
  {
    _id: '5',
    title: 'Fuchka & Chaat Walk',
    shortDescription: 'Evening walk tasting the spiciest fuchka in town.',
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    ],
    pricePerPerson: 500,
    currency: 'BDT',
    location: { city: 'Dhaka' },
    ratingAvg: 4.3,
    reviewCount: 10,
    duration: 2,
    category: 'street-food',
  },
  {
    _id: '6',
    title: 'Mughlai Feast Cooking Class',
    shortDescription: 'Learn authentic Mughlai dishes from a royal chef.',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    ],
    pricePerPerson: 2500,
    currency: 'BDT',
    location: { city: 'Dhaka' },
    ratingAvg: 4.9,
    reviewCount: 40,
    duration: 4,
    category: 'cooking-class',
  },
  {
    _id: '7',
    title: 'Rooftop BBQ Dinner',
    shortDescription: 'Enjoy a BBQ dinner with a view of the city skyline.',
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    ],
    pricePerPerson: 1200,
    currency: 'BDT',
    location: { city: 'Chittagong' },
    ratingAvg: 4.5,
    reviewCount: 22,
    duration: 3,
    category: 'dinner',
  },
  {
    _id: '8',
    title: 'Traditional Fish Market Tour',
    shortDescription: 'Visit the bustling fish market and cook fresh catch.',
    images: [
      'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=600&q=80',
    ],
    pricePerPerson: 700,
    currency: 'BDT',
    location: { city: 'Sylhet' },
    ratingAvg: 4.2,
    reviewCount: 8,
    duration: 4,
    category: 'farm-visit',
  },
  {
    _id: '9',
    title: 'Tea Garden Plucking & Tasting',
    shortDescription: 'Walk through tea gardens and taste the finest blends.',
    images: [
      'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=600&q=80',
    ],
    pricePerPerson: 1800,
    currency: 'BDT',
    location: { city: 'Sylhet' },
    ratingAvg: 4.8,
    reviewCount: 30,
    duration: 5,
    category: 'farm-visit',
  },
  {
    _id: '10',
    title: 'Hilsa Festival Evening',
    shortDescription: 'Celebrate the king of fish with multiple preparations.',
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    ],
    pricePerPerson: 1000,
    currency: 'BDT',
    location: { city: 'Barisal' },
    ratingAvg: 4.7,
    reviewCount: 17,
    duration: 3,
    category: 'dinner',
  },
  {
    _id: '11',
    title: 'Bamboo Chicken Picnic',
    shortDescription: 'Cook chicken inside bamboo over open fire in the hills.',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    ],
    pricePerPerson: 900,
    currency: 'BDT',
    location: { city: 'Bandarban' },
    ratingAvg: 4.6,
    reviewCount: 12,
    duration: 6,
    category: 'cooking-class',
  },
  {
    _id: '12',
    title: 'Misti Hub Dessert Tour',
    shortDescription: 'Sample the best sweets from iconic shops.',
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    ],
    pricePerPerson: 400,
    currency: 'BDT',
    location: { city: 'Dhaka' },
    ratingAvg: 4.4,
    reviewCount: 20,
    duration: 2,
    category: 'street-food',
  },
];

const ITEMS_PER_PAGE = 8;
const categories = [
  { value: '', label: 'All Categories' },
  { value: 'cooking-class', label: 'Cooking Class' },
  { value: 'street-food', label: 'Street Food' },
  { value: 'farm-visit', label: 'Farm Visit' },
  { value: 'dinner', label: 'Dinner Experience' },
];
const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

// ──── Inline ExperienceCard ────
function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={experience.images[0]}
          alt={experience.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-[#E67E22] text-white text-xs font-semibold px-3 py-1 rounded-full">
          {experience.currency === 'BDT' ? '৳' : '$'}
          {experience.pricePerPerson}
          <span className="font-normal"> / person</span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-[#3E2723] mb-1 line-clamp-1">
          {experience.title}
        </h3>
        <p className="text-[#9C908A] text-sm mb-3 line-clamp-2">
          {experience.shortDescription}
        </p>
        <div className="flex items-center gap-3 text-xs text-[#9C908A] mb-3">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#E67E22]" />
            {experience.location.city}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#E67E22]" />
            {experience.duration}h
          </span>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 fill-[#E67E22] text-[#E67E22]" />
            <span className="font-semibold text-[#3E2723]">
              {experience.ratingAvg.toFixed(1)}
            </span>
            <span className="text-[#9C908A]">({experience.reviewCount})</span>
          </span>
          <Link
            href={`/experiences/${experience._id}`}
            className="text-sm font-medium text-[#E67E22] hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ──── Inline Skeleton ────
function ExperienceCardSkeleton() {
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

// ──── Main Page ────
export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false); // future API loading

  // ─── Filtering & Sorting ───
  const filteredExperiences = useMemo(() => {
    let result = [...allExperiences];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.location.city.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
      );
    }
    // Category
    if (category) result = result.filter((e) => e.category === category);
    // Price range
    result = result.filter(
      (e) =>
        e.pricePerPerson >= priceRange[0] && e.pricePerPerson <= priceRange[1]
    );
    // Rating
    if (minRating > 0) result = result.filter((e) => e.ratingAvg >= minRating);

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.pricePerPerson - b.pricePerPerson);
        break;
      case 'price-high':
        result.sort((a, b) => b.pricePerPerson - a.pricePerPerson);
        break;
      case 'rating':
        result.sort((a, b) => b.ratingAvg - a.ratingAvg);
        break;
    }
    return result;
  }, [search, category, priceRange, minRating, sortBy]);

  const totalPages = Math.ceil(filteredExperiences.length / ITEMS_PER_PAGE);
  const paginatedExperiences = filteredExperiences.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const updateFilter =
    <T,>(setter: (val: T) => void) =>
    (val: T) => {
      setter(val);
      setCurrentPage(1);
    };

  const clearAllFilters = () => {
    setSearch('');
    setCategory('');
    setPriceRange([0, 10000]);
    setMinRating(0);
    setSortBy('newest');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    category !== '' ||
    minRating > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 10000 ||
    search !== '';

  return (
    <div className="min-h-screen bg-[#FFF8F0] pt-15 pb-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3B2F2F] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Explore Experiences
          </h1>
          <p className="text-[#9C908A] text-lg max-w-2xl mx-auto">
            Find the perfect food adventure — from cooking classes to street
            food tours.
          </p>
        </motion.div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9C908A]" />
              <input
                type="text"
                placeholder="Search by name, city, or cuisine..."
                value={search}
                onChange={(e) => updateFilter(setSearch)(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#E67E22] focus:ring-2 focus:ring-[#E67E22]/10 outline-none"
              />
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-48">
                <select
                  value={sortBy}
                  onChange={(e) => updateFilter(setSortBy)(e.target.value)}
                  className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm focus:border-[#E67E22] focus:ring-2 focus:ring-[#E67E22]/10 outline-none"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9C908A] pointer-events-none" />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-[#3B2F2F] hover:border-[#E67E22] transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters{' '}
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-[#E67E22]" />
                )}
              </button>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-[#E67E22] text-sm font-medium hover:underline whitespace-nowrap"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Expandable Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden"
              >
                <div>
                  <label className="block text-sm font-medium text-[#3B2F2F] mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => updateFilter(setCategory)(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#E67E22] outline-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3B2F2F] mb-1">
                    Price (৳)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) =>
                        updateFilter(setPriceRange)([
                          Number(e.target.value),
                          priceRange[1],
                        ])
                      }
                      placeholder="Min"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#E67E22] outline-none"
                    />
                    <span className="text-[#9C908A]">-</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) =>
                        updateFilter(setPriceRange)([
                          priceRange[0],
                          Number(e.target.value),
                        ])
                      }
                      placeholder="Max"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#E67E22] outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3B2F2F] mb-1">
                    Min Rating
                  </label>
                  <select
                    value={minRating}
                    onChange={(e) =>
                      updateFilter(setMinRating)(Number(e.target.value))
                    }
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#E67E22] outline-none"
                  >
                    <option value={0}>Any Rating</option>
                    <option value={4.0}>4.0+</option>
                    <option value={4.5}>4.5+</option>
                    <option value={4.8}>4.8+</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <ExperienceCardSkeleton key={i} />
            ))}
          </div>
        ) : paginatedExperiences.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {paginatedExperiences.map((exp) => (
                <ExperienceCard key={exp._id} experience={exp} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium disabled:opacity-50 hover:border-[#E67E22] transition-colors"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${page === currentPage ? 'bg-[#E67E22] text-white' : 'border border-gray-200 text-[#3B2F2F] hover:border-[#E67E22]'}`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium disabled:opacity-50 hover:border-[#E67E22] transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-[#9C908A] text-lg mb-4">No experiences found.</p>
            <button
              onClick={clearAllFilters}
              className="text-[#E67E22] font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}
