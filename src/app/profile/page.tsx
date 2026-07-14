// src/app/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import { authClient } from '@/lib/auth-client';
import {
  User,
  Mail,
  MapPin,
  Star,
  UtensilsCrossed,
  Camera,
  Award,
  Loader2,
} from 'lucide-react';
import Image from 'next/image';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending: authLoading } = authClient.useSession();

  useEffect(() => {
    if (!authLoading && !session) {
      router.push('/login?redirect=/profile');
    }
  }, [session, authLoading, router]);

  const [experiencesCount, setExperiencesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch experiences count only
  useEffect(() => {
    if (!session?.user) return;
    const fetchCount = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/experiences/my`);
        if (res.ok) {
          const data = await res.json();
          setExperiencesCount(data.experiences.length);
        }
      } catch {}
      setLoading(false);
    };
    fetchCount();
  }, [session?.user]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#F5EDE6] pt-28 pb-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#8B5E3C] animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  const user = session.user!;
  const avatar =
    user.image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'U')}&background=8B5E3C&color=fff&size=200`;
  const role = 'user'; // session.user-এ role না থাকলে default

  return (
    <div className="min-h-screen bg-[#F5EDE6] pt-28 pb-20">
      <Container className="!max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="relative bg-[#5D4037] rounded-3xl p-8 pb-16 mb-10 shadow-lg">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
              <div className="relative w-28 h-28 rounded-full border-4 border-white shadow-md overflow-hidden bg-white">
                <Image
                  src={avatar}
                  alt={user.name || ''}
                  fill
                  className="object-cover"
                />
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center text-[#5D4037] hover:bg-gray-100">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="text-white text-center md:text-left">
                <h1
                  className="text-3xl md:text-4xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {user.name || 'Foodie'}
                </h1>
                <p className="text-white/70 flex items-center justify-center md:justify-start gap-2 mt-1">
                  <Mail className="w-4 h-4" /> {user.email}
                </p>
                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-[#8B5E3C] text-xs font-medium uppercase">
                  {role}
                </span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-8 mb-8">
            {[
              {
                icon: UtensilsCrossed,
                label: 'Experiences',
                value: experiencesCount,
                color: 'bg-[#6D4C41]',
              },
              { icon: Star, label: 'Reviews', value: 0, color: 'bg-[#8B5E3C]' },
              {
                icon: Award,
                label: 'Rating',
                value: '0.0',
                color: 'bg-[#5D4037]',
              },
              {
                icon: MapPin,
                label: 'Location',
                value: 'N/A',
                color: 'bg-[#3E2723]',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`${item.color} text-white rounded-2xl p-4 shadow-md flex flex-col items-center justify-center`}
              >
                <item.icon className="w-6 h-6 mb-1 opacity-80" />
                <span className="text-2xl font-bold">{item.value}</span>
                <span className="text-xs opacity-80">{item.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Profile Details (read-only from session) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 shadow-sm"
          >
            <h2
              className="text-2xl font-bold text-[#3E2723] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Profile Details
            </h2>
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-[#8B5E3C]" />
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-[#3E2723] font-medium">{user.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#8B5E3C]" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-[#3E2723] font-medium">{user.email}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
