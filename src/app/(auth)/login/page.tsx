// src/app/(auth)/login/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Eye, EyeOff, Mail, Lock, ArrowRight, LogIn } from 'lucide-react';
import Container from '@/components/layout/Container';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = 'Invalid email address';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // TODO: integrate real authentication
      console.log('Login with:', { email, password });
    }
  };

  const handleDemoLogin = () => {
    setIsDemoLoading(true);
    const demoEmail = 'foodie@test.com';
    const demoPass = 'test123';
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrors({});
    setTimeout(() => {
      setIsDemoLoading(false);
      console.log('Demo login:', { email: demoEmail, password: demoPass });
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0] py-12 px-4 sm:px-6 lg:px-8">
      <Container className="!max-w-5xl">
        {' '}
        {/* overrides default max-w-7xl to make card a bit narrower */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left decorative image panel (hidden on very small screens) */}
            <div className="hidden md:block relative bg-[#3B2F2F]">
              <Image
                src="https://images.unsplash.com/photo-1540420828642-fca2c5c18abe?q=80&w=682&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Food experience"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3B2F2F]/80 to-[#3B2F2F]/30" />
              <div className="absolute inset-0 flex flex-col justify-center p-8 text-white ">
                <Link href="/" className="inline-flex items-center gap-2 mb-8">
                  <span
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Savor<span className="text-[#E67E22]">Spot</span>
                  </span>
                </Link>
                <h2
                  className="text-3xl font-bold mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Welcome back!
                </h2>
                <p className="text-white/70 text-sm">
                  Log in to continue your food journey.
                </p>
              </div>
            </div>

            {/* Right form panel */}
            <div className="p-8 sm:p-10 lg:p-12">
              {/* Mobile logo */}
              <div className="md:hidden flex justify-center mb-8">
                <Link href="/" className="inline-flex items-center gap-2">
                  <span
                    className="text-2xl font-bold text-[#3B2F2F]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Savor<span className="text-[#E67E22]">Spot</span>
                  </span>
                </Link>
              </div>

              <h1
                className="text-2xl md:text-3xl font-bold text-[#3B2F2F] mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Sign In
              </h1>
              <p className="text-[#9C908A] mb-8">
                Don’t have an account?{' '}
                <Link
                  href="/register"
                  className="text-[#E67E22] font-medium hover:underline"
                >
                  Register
                </Link>
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#3B2F2F] mb-1"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9C908A]" />
                    <input
                      id="email"
                      type="text"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors({ ...errors, email: undefined });
                      }}
                      placeholder="you@example.com"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                      } bg-white focus:border-[#E67E22] focus:ring-2 focus:ring-[#E67E22]/10 outline-none transition-all`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-[#3B2F2F] mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9C908A]" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors({ ...errors, password: undefined });
                      }}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-12 py-3 rounded-xl border ${
                        errors.password ? 'border-red-500' : 'border-gray-200'
                      } bg-white focus:border-[#E67E22] focus:ring-2 focus:ring-[#E67E22]/10 outline-none transition-all`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9C908A] hover:text-[#3B2F2F]"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-[#9C908A] hover:text-[#E67E22]"
                  >
                    Forgot password?
                  </Link>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-[#E67E22] text-white font-semibold rounded-xl hover:bg-[#d35400] transition-colors flex items-center justify-center gap-2"
                >
                  Sign In
                  <LogIn className="w-5 h-5" />
                </motion.button>
              </form>

              <div className="flex items-center gap-4 my-6">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-xs text-[#9C908A] uppercase">or</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <motion.button
                onClick={handleDemoLogin}
                disabled={isDemoLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 border-2 border-[#E67E22] text-[#E67E22] font-semibold rounded-xl hover:bg-[#E67E22] hover:text-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isDemoLoading ? 'Loading…' : 'Try Demo Account'}
              </motion.button>

              <p className="text-center text-xs text-[#9C908A] mt-6">
                By signing in, you agree to our{' '}
                <Link href="/terms" className="text-[#E67E22] hover:underline">
                  Terms
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacy"
                  className="text-[#E67E22] hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
