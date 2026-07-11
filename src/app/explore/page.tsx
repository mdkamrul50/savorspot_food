// src/app/explore/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/layout/Container';
import ExperienceCard from '@/components/experiences/ExperienceCard';
import ExperienceCardSkeleton from '@/components/experiences/ExperienceCardSkeleton';
import type { Experience } from '@/components/experiences/ExperienceCard';
import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react';

// ============================================================
//  DEMO DATA (পরবর্তীতে API call দিয়ে প্রতিস্থাপন করবে)
// ============================================================
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

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false); // পরবর্তীতে API fetch-এর সময় true করবে

  // ─── ফিল্টারিং ও সার্চ ──────────────────────────
  const filteredExperiences = useMemo(() => {
    let result = [...allExperiences];

    // সার্চ (নাম, শহর, ক্যাটাগরি)
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.location.city.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
      );
    }

    // ক্যাটাগরি
    if (category) {
      result = result.filter((e) => e.category === category);
    }

    // প্রাইস রেঞ্জ
    result = result.filter(
      (e) =>
        e.pricePerPerson >= priceRange[0] && e.pricePerPerson <= priceRange[1]
    );

    // রেটিং
    if (minRating > 0) {
      result = result.filter((e) => e.ratingAvg >= minRating);
    }

    // সর্টিং
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
      // 'newest' – অর্ডার অপরিবর্তিত
    }

    return result;
  }, [search, category, priceRange, minRating, sortBy]);

  // পেজিনেশন
  const totalPages = Math.ceil(filteredExperiences.length / ITEMS_PER_PAGE);
  const paginatedExperiences = filteredExperiences.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // ফিল্টার চেঞ্জ হলে প্রথম পেজে ফেরত
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
    <div className="min-h-screen bg-[#FFF8F0] pt-28 pb-20">
      <Container>
        {/* পেজ হেডিং */}
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

        {/* সার্চ ও ফিল্টার বার */}
        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* সার্চ ইনপুট */}
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

            {/* সর্টিং ও ফিল্টার টগল */}
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
                <SlidersHorizontal className="w-4 h-4" />
                Filters
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

          {/* এক্সপ্যান্ডেবল ফিল্টার প্যানেল */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden"
              >
                {/* ক্যাটাগরি */}
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

                {/* প্রাইস রেঞ্জ */}
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

                {/* ন্যূনতম রেটিং */}
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

        {/* রেজাল্ট গ্রিড */}
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

            {/* পেজিনেশন */}
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
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                        page === currentPage
                          ? 'bg-[#E67E22] text-white'
                          : 'border border-gray-200 text-[#3B2F2F] hover:border-[#E67E22]'
                      }`}
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
