// src/app/experiences/add/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/layout/Container';
import { authClient } from '@/lib/auth-client';
import { ArrowRight, ArrowLeft, Plus, Check } from 'lucide-react';
import Link from 'next/link';

// ──── Type Definitions ────
interface ExperienceForm {
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  pricePerPerson: number;
  currency: string;
  location: {
    city: string;
    area: string;
    fullAddress: string;
  };
  duration: number;
  maxGroupSize: number;
  images: string[];
}

interface FormErrors {
  title?: string;
  shortDescription?: string;
  fullDescription?: string;
  category?: string;
  price?: string;
  city?: string;
  area?: string;
  address?: string;
  duration?: string;
  groupSize?: string;
  images?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const initialForm: ExperienceForm = {
  title: '',
  shortDescription: '',
  fullDescription: '',
  category: '',
  pricePerPerson: 0,
  currency: 'BDT',
  location: { city: '', area: '', fullAddress: '' },
  duration: 1,
  maxGroupSize: 2,
  images: [],
};

const categories = [
  { value: 'cooking-class', label: 'Cooking Class' },
  { value: 'street-food', label: 'Street Food' },
  { value: 'farm-visit', label: 'Farm Visit' },
  { value: 'dinner', label: 'Dinner Experience' },
];

export default function AddExperiencePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // Protect Route
  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login?redirect=/experiences/add');
    }
  }, [session, isPending, router]);

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ExperienceForm>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imageInput, setImageInput] = useState('');

  // ──── Validation ────
  const validateStep = (currentStep: number): boolean => {
    const errs: FormErrors = {};
    if (currentStep === 1) {
      if (!form.title.trim()) errs.title = 'Title is required';
      if (!form.shortDescription.trim())
        errs.shortDescription = 'Short description is required';
      if (!form.fullDescription.trim())
        errs.fullDescription = 'Full description is required';
      if (!form.category) errs.category = 'Please select a category';
    } else {
      if (!form.pricePerPerson || form.pricePerPerson <= 0)
        errs.price = 'Valid price required';
      if (!form.location.city.trim()) errs.city = 'City is required';
      if (!form.location.area.trim()) errs.area = 'Area is required';
      if (!form.location.fullAddress.trim())
        errs.address = 'Full address is required';
      if (!form.duration || form.duration < 1) errs.duration = 'Minimum 1 hour';
      if (!form.maxGroupSize || form.maxGroupSize < 1)
        errs.groupSize = 'Min 1 person';
      if (form.images.length === 0) errs.images = 'Add at least one image URL';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) setStep(2);
  };

  const prevStep = () => setStep(1);

  const handleAddImage = () => {
    if (imageInput.trim() && !form.images.includes(imageInput.trim())) {
      setForm({ ...form, images: [...form.images, imageInput.trim()] });
      setImageInput('');
      setErrors({ ...errors, images: undefined });
    }
  };

  const handleRemoveImage = (url: string) => {
    setForm({ ...form, images: form.images.filter((img) => img !== url) });
  };

  // ──── Submit to Backend ────
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateStep(2)) return;


  if (!session?.user?.id) {
    setErrors({ ...errors, title: 'You must be logged in to submit' });
    return;
  }

  setLoading(true);
  try {
    const res = await fetch(`${API_BASE}/api/experiences`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
   
      body: JSON.stringify({
        ...form,
        userId: session.user.id,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to add experience');
    }

    setSuccess(true);
  } catch (err: any) {
    setErrors({ ...errors, title: err.message });
  } finally {
    setLoading(false);
  }
};

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0]">
        <div className="animate-spin w-10 h-10 border-4 border-[#E67E22] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!session) return null; // will redirect

  return (
    <div className="min-h-screen bg-[#FFF8F0] pt-28 pb-20">
      <Container className="!max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/experiences/manage"
            className="text-sm text-[#9C908A] hover:text-[#E67E22] transition-colors flex items-center gap-1 mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to manage
          </Link>

          <h1
            className="text-3xl md:text-4xl font-bold text-[#3B2F2F] mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Add New Experience
          </h1>
          <p className="text-[#9C908A] mb-10">
            Share your passion for food with the world. Fill in the details
            below.
          </p>

          {/* Success state */}
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center mb-8"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">
                Experience Submitted!
              </h2>
              <p className="text-green-700">
                Your experience is under review and will be published soon.
              </p>
              <button
                onClick={() => router.push('/experiences/manage')}
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
              >
                Go to Manage
              </button>
            </motion.div>
          )}

          {/* Form Card */}
          {!success && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-sm p-8"
            >
              {/* Step Indicator */}
              <div className="flex items-center gap-4 mb-8">
                {[1, 2].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                        step === s
                          ? 'bg-[#E67E22] text-white'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {s}
                    </div>
                    <span
                      className={`text-sm font-medium ${step === s ? 'text-[#3B2F2F]' : 'text-gray-400'}`}
                    >
                      {s === 1 ? 'Basic Info' : 'Details'}
                    </span>
                    {s === 1 && <div className="w-8 h-0.5 bg-gray-200" />}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-medium text-[#3B2F2F] mb-1">
                          Title *
                        </label>
                        <input
                          type="text"
                          value={form.title}
                          onChange={(e) => {
                            setForm({ ...form, title: e.target.value });
                            setErrors({ ...errors, title: undefined });
                          }}
                          placeholder="e.g. Traditional Biryani Masterclass"
                          className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#E67E22] outline-none"
                        />
                        {errors.title && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.title}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3B2F2F] mb-1">
                          Short Description *
                        </label>
                        <textarea
                          rows={2}
                          value={form.shortDescription}
                          onChange={(e) => {
                            setForm({
                              ...form,
                              shortDescription: e.target.value,
                            });
                            setErrors({
                              ...errors,
                              shortDescription: undefined,
                            });
                          }}
                          placeholder="A catchy one-liner..."
                          className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#E67E22] outline-none resize-none"
                        />
                        {errors.shortDescription && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.shortDescription}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3B2F2F] mb-1">
                          Full Description *
                        </label>
                        <textarea
                          rows={5}
                          value={form.fullDescription}
                          onChange={(e) => {
                            setForm({
                              ...form,
                              fullDescription: e.target.value,
                            });
                            setErrors({
                              ...errors,
                              fullDescription: undefined,
                            });
                          }}
                          placeholder="Describe your experience in detail..."
                          className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#E67E22] outline-none resize-none"
                        />
                        {errors.fullDescription && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.fullDescription}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3B2F2F] mb-1">
                          Category *
                        </label>
                        <select
                          value={form.category}
                          onChange={(e) => {
                            setForm({ ...form, category: e.target.value });
                            setErrors({ ...errors, category: undefined });
                          }}
                          className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#E67E22] outline-none"
                        >
                          <option value="">Select category</option>
                          {categories.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                              {cat.label}
                            </option>
                          ))}
                        </select>
                        {errors.category && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.category}
                          </p>
                        )}
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={nextStep}
                          className="flex items-center gap-2 bg-[#E67E22] text-white px-6 py-3 rounded-full font-medium hover:bg-[#d35400] transition"
                        >
                          Next <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#3B2F2F] mb-1">
                            Price (per person) *
                          </label>
                          <input
                            type="number"
                            value={form.pricePerPerson || ''}
                            onChange={(e) => {
                              setForm({
                                ...form,
                                pricePerPerson: Number(e.target.value),
                              });
                              setErrors({ ...errors, price: undefined });
                            }}
                            placeholder="1500"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#E67E22] outline-none"
                          />
                          {errors.price && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.price}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#3B2F2F] mb-1">
                            Duration (hours) *
                          </label>
                          <input
                            type="number"
                            value={form.duration}
                            onChange={(e) => {
                              setForm({
                                ...form,
                                duration: Number(e.target.value),
                              });
                              setErrors({ ...errors, duration: undefined });
                            }}
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#E67E22] outline-none"
                          />
                          {errors.duration && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.duration}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#3B2F2F] mb-1">
                            Max Group Size *
                          </label>
                          <input
                            type="number"
                            value={form.maxGroupSize}
                            onChange={(e) => {
                              setForm({
                                ...form,
                                maxGroupSize: Number(e.target.value),
                              });
                              setErrors({ ...errors, groupSize: undefined });
                            }}
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#E67E22] outline-none"
                          />
                          {errors.groupSize && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.groupSize}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#3B2F2F] mb-1">
                            City *
                          </label>
                          <input
                            type="text"
                            value={form.location.city}
                            onChange={(e) => {
                              setForm({
                                ...form,
                                location: {
                                  ...form.location,
                                  city: e.target.value,
                                },
                              });
                              setErrors({ ...errors, city: undefined });
                            }}
                            placeholder="Dhaka"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#E67E22] outline-none"
                          />
                          {errors.city && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.city}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#3B2F2F] mb-1">
                            Area *
                          </label>
                          <input
                            type="text"
                            value={form.location.area}
                            onChange={(e) => {
                              setForm({
                                ...form,
                                location: {
                                  ...form.location,
                                  area: e.target.value,
                                },
                              });
                              setErrors({ ...errors, area: undefined });
                            }}
                            placeholder="Old Dhaka"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#E67E22] outline-none"
                          />
                          {errors.area && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.area}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#3B2F2F] mb-1">
                            Full Address *
                          </label>
                          <input
                            type="text"
                            value={form.location.fullAddress}
                            onChange={(e) => {
                              setForm({
                                ...form,
                                location: {
                                  ...form.location,
                                  fullAddress: e.target.value,
                                },
                              });
                              setErrors({ ...errors, address: undefined });
                            }}
                            placeholder="123 Chawk Bazar"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#E67E22] outline-none"
                          />
                          {errors.address && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.address}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Image URLs */}
                      <div>
                        <label className="block text-sm font-medium text-[#3B2F2F] mb-1">
                          Images (URL) *
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="url"
                            value={imageInput}
                            onChange={(e) => setImageInput(e.target.value)}
                            placeholder="https://images.unsplash.com/..."
                            className="flex-1 rounded-xl border border-gray-200 px-4 py-3 focus:border-[#E67E22] outline-none"
                          />
                          <button
                            type="button"
                            onClick={handleAddImage}
                            className="px-4 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                        {errors.images && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.images}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {form.images.map((url, i) => (
                            <div
                              key={i}
                              className="relative bg-gray-100 rounded-lg px-3 py-1 text-xs flex items-center gap-2"
                            >
                              {url.substring(0, 30)}...
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(url)}
                                className="text-red-500 hover:text-red-700"
                              >
                                &times;
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between pt-4">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="flex items-center gap-2 border border-gray-200 text-[#3B2F2F] px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition"
                        >
                          <ArrowLeft className="w-4 h-4" /> Previous
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex items-center gap-2 bg-[#E67E22] text-white px-6 py-3 rounded-full font-medium hover:bg-[#d35400] transition disabled:opacity-70"
                        >
                          {loading ? 'Submitting...' : 'Submit Experience'}
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </div>
  );
}
