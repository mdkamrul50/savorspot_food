// src/app/blog/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, User, Calendar, Search } from 'lucide-react';

// ──── Types ────
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image?: string; 
  category: string;
  featured?: boolean;
}

// ──── Demo Data ────
const blogPosts: BlogPost[] = [
  {
    slug: 'the-art-of-biryani',
    title: 'The Art of Biryani: Secrets from Old Dhaka',
    excerpt:
      'Discover the centuries-old techniques that make Dhakaiya biryani a culinary masterpiece.',
    author: 'Shirin Apa',
    date: '2 Jun 2026',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
    category: 'Cooking',
    featured: true,
  },
  {
    slug: 'street-food-safari-tips',
    title: '10 Tips for an Unforgettable Street Food Safari',
    excerpt:
      'How to navigate the bustling alleys and taste the best fuchka without missing a beat.',
    author: 'Rafiq Bhai',
    date: '28 May 2026',
    readTime: '4 min read',
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    category: 'Travel',
  },
  {
    slug: 'pitha-making-memories',
    title: 'Pitha Making: A Winter Tradition',
    excerpt:
      'Join Fatema Khala as she shares her childhood memories of making pitha with her grandmother.',
    author: 'Fatema Khala',
    date: '15 May 2026',
    readTime: '3 min read',
    image:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    category: 'Culture',
  },
  {
    slug: 'organic-farm-to-table',
    title: 'Why Farm-to-Table Matters More Than Ever',
    excerpt:
      'A deep dive into the benefits of eating fresh, local, and seasonal.',
    author: 'Karim Ustad',
    date: '2 May 2026',
    readTime: '6 min read',
    // no image – text only style
    category: 'Food Philosophy',
  },
  {
    slug: 'food-photography-basics',
    title: 'Mastering Food Photography with Your Phone',
    excerpt:
      'Simple tricks to capture stunning food shots that will make your Instagram pop.',
    author: 'Shakil Vai',
    date: '20 Apr 2026',
    readTime: '7 min read',
    image:
      'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=600&q=80',
    category: 'Tips',
  },
  {
    slug: 'hilsa-season-special',
    title: 'Hilsa Season: Celebrating the King of Fish',
    excerpt:
      'A culinary pilgrimage to Barisal during the monsoon to savor the freshest hilsa.',
    author: 'Nusrat Di',
    date: '10 Apr 2026',
    readTime: '4 min read',
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    category: 'Travel',
  },
];

// ──── Components ────
function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-[#3B2F2F] rounded-3xl overflow-hidden shadow-lg group"
    >
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="relative z-10 p-8 md:p-12 flex flex-col justify-end h-full min-h-[400px]">
        <span className="text-[#E67E22] text-xs font-bold uppercase tracking-widest mb-2">
          {post.category}
        </span>
        <h2
          className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {post.title}
        </h2>
        <p className="text-white/70 text-base md:text-lg max-w-2xl mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-4 text-white/60 text-sm">
          <span className="flex items-center gap-1">
            <User className="w-4 h-4 text-[#E67E22]" /> {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-[#E67E22]" /> {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-[#E67E22]" /> {post.readTime}
          </span>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-4 inline-block self-start px-5 py-2 bg-[#E67E22] text-white rounded-full font-medium hover:bg-[#d35400] transition"
        >
          Read More
        </Link>
      </div>
    </motion.div>
  );
}

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col group"
    >
      {post.image ? (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="h-2 bg-[#E67E22]" />
      )}
      <div className="p-6 flex flex-col flex-1">
        <span className="text-[#E67E22] text-xs font-bold uppercase tracking-widest mb-2">
          {post.category}
        </span>
        <h3 className="text-lg font-bold text-[#3B2F2F] mb-2 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-[#5C4F4A] text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center gap-3 text-xs text-[#9C908A]">
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-[#E67E22]" /> {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#E67E22]" /> {post.date}
          </span>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-3 text-sm font-medium text-[#E67E22] hover:underline self-start"
        >
          Read more →
        </Link>
      </div>
    </motion.div>
  );
}

// ──── Main Blog Page ────
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Categories derived from data
  const categories = [
    'All',
    ...Array.from(new Set(blogPosts.map((p) => p.category))),
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch =
      !searchTerm ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.find((p) => p.featured);
  const otherPosts = filteredPosts.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-[#FFF8F0] pt-28 pb-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3B2F2F] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Savor<span className="text-[#E67E22]">Stories</span>
          </h1>
          <p className="text-[#9C908A] text-lg max-w-xl mx-auto">
            Dive into food tales, recipes, travelogues, and tips from our
            community.
          </p>
        </motion.div>

        {/* Search & Category Filter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9C908A]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#E67E22] focus:ring-2 focus:ring-[#E67E22]/10 outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#3B2F2F] text-white'
                    : 'bg-white border border-gray-200 text-[#3B2F2F] hover:border-[#E67E22]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post (only if exists and no search active) */}
        {featuredPost && !searchTerm && activeCategory === 'All' && (
          <div className="mb-12">
            <FeaturedPost post={featuredPost} />
          </div>
        )}

        {/* Other Posts Grid (3 cols desktop) */}
        {otherPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPosts.map((post, idx) => (
              <PostCard key={post.slug} post={post} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[#9C908A] text-lg">No articles found.</p>
          </div>
        )}
      </Container>
    </div>
  );
}
