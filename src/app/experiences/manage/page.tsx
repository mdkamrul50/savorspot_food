// src/app/experiences/manage/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/layout/Container';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import {
  Plus,
  Search,
  Eye,
  Trash2,
  AlertTriangle,
  X,
  MapPin,
  Clock,
  Star,
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
  status: 'pending' | 'approved' | 'rejected';
}

// Demo data (পরবর্তীতে API দিয়ে প্রতিস্থাপন করবে)
const DEMO_EXPERIENCES: Experience[] = [
  {
    _id: '1',
    title: 'Traditional Biryani Masterclass',
    shortDescription: 'Learn the secrets of authentic Dhaka-style biryani.',
    images: [
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&q=80',
    ],
    pricePerPerson: 1500,
    currency: 'BDT',
    location: { city: 'Dhaka', area: 'Old Dhaka' },
    ratingAvg: 4.8,
    reviewCount: 24,
    duration: 3,
    category: 'cooking-class',
    status: 'approved',
  },
  {
    _id: '2',
    title: 'Street Food Safari at Night',
    shortDescription: 'Taste the best fuchka, chotpoti & more.',
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&q=80',
    ],
    pricePerPerson: 800,
    currency: 'BDT',
    location: { city: 'Chittagong', area: 'GEC Circle' },
    ratingAvg: 4.6,
    reviewCount: 18,
    duration: 2.5,
    category: 'street-food',
    status: 'pending',
  },
  {
    _id: '3',
    title: 'Pitha Making Workshop',
    shortDescription: 'Hands-on pitha making with a grandmother.',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&q=80',
    ],
    pricePerPerson: 600,
    currency: 'BDT',
    location: { city: 'Manikganj' },
    ratingAvg: 4.7,
    reviewCount: 15,
    duration: 2,
    category: 'cooking-class',
    status: 'rejected',
  },
];

export default function ManageExperiencesPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login?redirect=/experiences/manage');
    }
  }, [session, isPending, router]);

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Simulate fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      setExperiences(DEMO_EXPERIENCES);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filtered = experiences.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.location.city.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    if (!deleteId) return;
    // TODO: API call to delete
    setExperiences((prev) => prev.filter((e) => e._id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] pt-28 pb-20 flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-[#E67E22] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#FFF8F0] pt-28 pb-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1
                className="text-3xl md:text-4xl font-bold text-[#3B2F2F]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Manage Experiences
              </h1>
              <p className="text-[#9C908A] mt-1">
                View, edit, or remove your hosted experiences.
              </p>
            </div>
            <Link
              href="/experiences/add"
              className="inline-flex items-center gap-2 bg-[#E67E22] text-white px-5 py-3 rounded-full font-medium hover:bg-[#d35400] transition shadow-sm"
            >
              <Plus className="w-5 h-5" />
              Add New
            </Link>
          </div>

          {/* Search */}
          <div className="relative mb-6 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9C908A]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or city..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#E67E22] focus:ring-2 focus:ring-[#E67E22]/10 outline-none"
            />
          </div>

          {/* Results count */}
          <p className="text-sm text-[#9C908A] mb-4">
            {filtered.length} experience{filtered.length !== 1 && 's'} found
          </p>

          {/* Table / List */}
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-[#9C908A] text-lg">No experiences found.</p>
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="text-[#E67E22] font-medium mt-2 hover:underline"
                  >
                    Clear search
                  </button>
                )}
              </motion.div>
            ) : (
              <>
                {/* Desktop Table (hidden on mobile) */}
                <div className="hidden md:block bg-white rounded-2xl shadow-sm overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-[#FFF8F0] border-b border-gray-100">
                      <tr>
                        <th className="text-left px-6 py-4 font-medium text-[#3B2F2F]">
                          Experience
                        </th>
                        <th className="text-left px-6 py-4 font-medium text-[#3B2F2F]">
                          Category
                        </th>
                        <th className="text-left px-6 py-4 font-medium text-[#3B2F2F]">
                          Price
                        </th>
                        <th className="text-left px-6 py-4 font-medium text-[#3B2F2F]">
                          Rating
                        </th>
                        <th className="text-left px-6 py-4 font-medium text-[#3B2F2F]">
                          Status
                        </th>
                        <th className="text-right px-6 py-4 font-medium text-[#3B2F2F]">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((exp, index) => (
                        <motion.tr
                          key={exp._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <img
                                src={exp.images[0]}
                                alt={exp.title}
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                              <div>
                                <p className="font-medium text-[#3B2F2F]">
                                  {exp.title}
                                </p>
                                <p className="text-xs text-[#9C908A] flex items-center gap-1 mt-0.5">
                                  <MapPin className="w-3 h-3" />{' '}
                                  {exp.location.city}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-[#3B2F2F] capitalize">
                            {exp.category.replace('-', ' ')}
                          </td>
                          <td className="px-6 py-4 text-[#3B2F2F]">
                            ৳{exp.pricePerPerson}
                          </td>
                          <td className="px-6 py-4">
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-[#E67E22] text-[#E67E22]" />
                              {exp.ratingAvg} ({exp.reviewCount})
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                exp.status === 'approved'
                                  ? 'bg-green-100 text-green-700'
                                  : exp.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {exp.status.charAt(0).toUpperCase() +
                                exp.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/experiences/${exp._id}`}
                                className="p-2 rounded-lg hover:bg-gray-200 text-[#3B2F2F] transition"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => confirmDelete(exp._id)}
                                className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards (visible only on small screens) */}
                <div className="md:hidden space-y-4">
                  {filtered.map((exp, index) => (
                    <motion.div
                      key={exp._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-2xl shadow-sm p-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={exp.images[0]}
                          alt={exp.title}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-[#3B2F2F] truncate">
                            {exp.title}
                          </h3>
                          <p className="text-xs text-[#9C908A] flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" /> {exp.location.city}
                          </p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-[#3B2F2F]">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#E67E22]" />{' '}
                              {exp.duration}h
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-[#E67E22] text-[#E67E22]" />{' '}
                              {exp.ratingAvg}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                exp.status === 'approved'
                                  ? 'bg-green-100 text-green-700'
                                  : exp.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {exp.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Link
                            href={`/experiences/${exp._id}`}
                            className="p-2 rounded-lg hover:bg-gray-100 text-[#3B2F2F]"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => confirmDelete(exp._id)}
                            className="p-2 rounded-lg hover:bg-red-50 text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </AnimatePresence>

          {/* Delete Confirmation Modal */}
          <AnimatePresence>
            {showDeleteModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                onClick={() => setShowDeleteModal(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-red-500" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center text-[#3B2F2F] mb-2">
                    Delete Experience?
                  </h3>
                  <p className="text-center text-[#9C908A] text-sm mb-6">
                    This action cannot be undone. All data will be permanently
                    removed.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="flex-1 py-3 border border-gray-200 rounded-full text-[#3B2F2F] font-medium hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="flex-1 py-3 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Container>
    </div>
  );
}
