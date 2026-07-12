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
  Save,
} from 'lucide-react';
import Image from 'next/image';

// ──── Types ────
interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  location?: string;
  bio?: string;
  experiencesCount: number;
  reviewsCount: number;
  ratingAvg: number;
}

// Demo data (replace with real data later)
const DEMO_PROFILE: UserProfile = {
  id: 'u1',
  name: 'Foodie Hasan',
  email: 'foodie@test.com',
  image:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  role: 'host',
  location: 'Dhaka, Bangladesh',
  bio: 'Passionate home chef exploring the rich culinary heritage of Bangladesh.',
  experiencesCount: 5,
  reviewsCount: 12,
  ratingAvg: 4.6,
};

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // Protect route
  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login?redirect=/profile');
    }
  }, [session, isPending, router]);

  // In a real app, fetch profile from API; here we use demo
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', location: '', bio: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (session?.user) {
      // Simulate fetching user profile
      setTimeout(() => {
        setProfile(DEMO_PROFILE);
        setForm({
          name: DEMO_PROFILE.name,
          location: DEMO_PROFILE.location || '',
          bio: DEMO_PROFILE.bio || '',
        });
      }, 800);
    }
  }, [session]);

  const handleSave = async () => {
    setSaving(true);
    // TODO: API call to update profile
    await new Promise((r) => setTimeout(r, 1000));
    if (profile) {
      setProfile({
        ...profile,
        name: form.name,
        location: form.location,
        bio: form.bio,
      });
    }
    setEditing(false);
    setSaving(false);
  };

  if (isPending || !profile) {
    return (
      <div className="min-h-screen bg-[#F5EDE6] pt-28 pb-20 flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-[#8B5E3C] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#F5EDE6] pt-28 pb-20">
      {' '}
      {/* soft chocolate cream background */}
      <Container className="!max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Cover / Header */}
          <div className="relative bg-[#5D4037] rounded-3xl p-8 pb-16 mb-10 shadow-lg">
            {' '}
            {/* dark chocolate */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
              <div className="relative w-28 h-28 rounded-full border-4 border-white shadow-md overflow-hidden bg-white">
                {profile.image ? (
                  <Image
                    src={profile.image}
                    alt={profile.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#8B5E3C] flex items-center justify-center text-white text-3xl font-bold">
                    {profile.name.charAt(0)}
                  </div>
                )}
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center text-[#5D4037] hover:bg-gray-100">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="text-white text-center md:text-left">
                <h1
                  className="text-3xl md:text-4xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {profile.name}
                </h1>
                <p className="text-white/70 flex items-center justify-center md:justify-start gap-2 mt-1">
                  <Mail className="w-4 h-4" /> {profile.email}
                </p>
                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-[#8B5E3C] text-xs font-medium uppercase">
                  {profile.role === 'host' ? 'Host' : 'Foodie'}
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
                value: profile.experiencesCount,
                color: 'bg-[#6D4C41]',
              },
              {
                icon: Star,
                label: 'Reviews',
                value: profile.reviewsCount,
                color: 'bg-[#8B5E3C]',
              },
              {
                icon: Award,
                label: 'Rating',
                value: profile.ratingAvg.toFixed(1),
                color: 'bg-[#5D4037]',
              },
              {
                icon: MapPin,
                label: 'Location',
                value: profile.location
                  ? profile.location.split(',')[0]
                  : 'N/A',
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

          {/* Profile Details / Edit Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-2xl font-bold text-[#3E2723]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Profile Details
              </h2>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="text-[#8B5E3C] border border-[#8B5E3C] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#8B5E3C] hover:text-white transition"
                >
                  Edit
                </button>
              )}
            </div>

            {editing ? (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#3E2723] mb-1">
                    Name
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#8B5E3C] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3E2723] mb-1">
                    Location
                  </label>
                  <input
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                    placeholder="City, Country"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#8B5E3C] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3E2723] mb-1">
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#8B5E3C] outline-none resize-none"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-[#8B5E3C] text-white px-6 py-3 rounded-full font-medium hover:bg-[#6D4C41] transition disabled:opacity-70"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                    <Save className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="px-6 py-3 border border-gray-200 rounded-full text-[#3E2723] font-medium hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-[#8B5E3C]" />
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="text-[#3E2723] font-medium">{profile.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#8B5E3C]" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-[#3E2723] font-medium">
                      {profile.location || '—'}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Bio</p>
                  <p className="text-[#3E2723]">
                    {profile.bio || 'No bio yet.'}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
