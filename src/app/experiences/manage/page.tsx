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
  MapPin,
  Star,
  Loader2,
  RefreshCw,
} from 'lucide-react';

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
  status?: 'pending' | 'approved' | 'rejected';
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const getToken = () => localStorage.getItem('authToken');

export default function ManageExperiencesPage() {
  const router = useRouter();
  const { data: session, isPending: authLoading } = authClient.useSession();

  useEffect(() => {
    if (!authLoading && !session) {
      router.push('/login?redirect=/experiences/manage');
    }
  }, [session, authLoading, router]);

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchExperiences = async () => {
    setLoading(true);
    setError(null);
    try {
      const userId = session?.user?.id; 
      if (!userId) throw new Error('User not identified');

     
      const res = await fetch(
        `${API_BASE}/api/experiences/my?userId=${userId}`
      );
      if (!res.ok) throw new Error('Failed to load your experiences');
      const data = await res.json();
      setExperiences(data.experiences);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const userId = session?.user?.id;
      if (!userId) throw new Error('User not identified');

      const res = await fetch(
        `${API_BASE}/api/experiences/${deleteId}?userId=${userId}`,
        {
          method: 'DELETE',
        }
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Delete failed');
      }
      setExperiences((prev) => prev.filter((e) => e._id !== deleteId));
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (err: any) {
      alert('Delete failed: ' + err.message);
    } finally {
      setDeleting(false);
    }
  };
  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const getStatusText = (status?: string) => {
    if (!status) return 'N/A';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getStatusClass = (status?: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  if (authLoading || (loading && experiences.length === 0)) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] pt-28 pb-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#E67E22] animate-spin" />
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
                View or remove your hosted experiences.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchExperiences}
                className="inline-flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-full text-sm font-medium text-[#3B2F2F] hover:bg-gray-50 transition"
              >
                <RefreshCw className="w-4 h-4" /> Refresh
              </button>
              <Link
                href="/experiences/add"
                className="inline-flex items-center gap-2 bg-[#E67E22] text-white px-5 py-3 rounded-full font-medium hover:bg-[#d35400] transition shadow-sm"
              >
                <Plus className="w-5 h-5" />
                Add New
              </Link>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm flex items-center justify-between">
              <span>⚠ {error}</span>
              <button onClick={fetchExperiences} className="underline">
                Retry
              </button>
            </div>
          )}

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
            {filtered.length === 0 && !loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-[#9C908A] text-lg mb-2">
                  No experiences found.
                </p>
                {search ? (
                  <button
                    onClick={() => setSearch('')}
                    className="text-[#E67E22] font-medium hover:underline"
                  >
                    Clear search
                  </button>
                ) : (
                  <Link
                    href="/experiences/add"
                    className="inline-flex items-center gap-2 text-[#E67E22] font-medium hover:underline"
                  >
                    <Plus className="w-4 h-4" /> Add your first experience
                  </Link>
                )}
              </motion.div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block bg-white rounded-2xl shadow-sm overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-[#F5EDE6] border-b border-gray-100">
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
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-gray-50 hover:bg-[#FDF8F4] transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <img
                                src={exp.images[0]}
                                alt={exp.title}
                                className="w-12 h-12 rounded-xl object-cover shadow-sm"
                              />
                              <div>
                                <p className="font-semibold text-[#3B2F2F]">
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
                          <td className="px-6 py-4 text-[#3B2F2F] font-medium">
                            ৳{exp.pricePerPerson}
                          </td>
                          <td className="px-6 py-4">
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-[#E67E22] text-[#E67E22]" />
                              {exp.ratingAvg.toFixed(1)} ({exp.reviewCount})
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(exp.status)}`}
                            >
                              {getStatusText(exp.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Link
                                  href={`/experiences/${exp._id}`}
                                  className="p-2 rounded-lg hover:bg-gray-200 text-[#3B2F2F] transition"
                                >
                                  <Eye className="w-4 h-4" />
                                </Link>
                              </motion.div>
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <button
                                  onClick={() => confirmDelete(exp._id)}
                                  className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </motion.div>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                  {filtered.map((exp, index) => (
                    <motion.div
                      key={exp._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={exp.images[0]}
                          alt={exp.title}
                          className="w-20 h-20 rounded-xl object-cover shadow-sm"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-[#3B2F2F] truncate">
                            {exp.title}
                          </h3>
                          <p className="text-xs text-[#9C908A] flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" /> {exp.location.city}
                          </p>
                          <div className="flex items-center gap-3 mt-2 text-xs">
                            <span className="bg-gray-100 px-2 py-0.5 rounded-full capitalize">
                              {exp.category.replace('-', ' ')}
                            </span>
                            <span className="font-medium">
                              ৳{exp.pricePerPerson}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-[#E67E22] text-[#E67E22]" />{' '}
                              {exp.ratingAvg}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusClass(exp.status)}`}
                            >
                              {getStatusText(exp.status)}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
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
                    <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertTriangle className="w-7 h-7 text-red-500" />
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
                      disabled={deleting}
                      className="flex-1 py-3 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {deleting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : null}
                      {deleting ? 'Deleting...' : 'Delete'}
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
