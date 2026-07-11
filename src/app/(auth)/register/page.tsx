'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  UserPlus,
} from 'lucide-react';
import Container from '@/components/layout/Container';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = 'Full name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = 'Invalid email address';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    if (!confirmPassword)
      newErrors.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // TODO: integrate real registration
      console.log('Register with:', { name, email, password });
    }
  };

  const handleDemoRegister = () => {
    setIsDemoLoading(true);
    const demoName = 'Foodie Hasan';
    const demoEmail = 'foodie@test.com';
    const demoPass = 'test123';
    setName(demoName);
    setEmail(demoEmail);
    setPassword(demoPass);
    setConfirmPassword(demoPass);
    setErrors({});
    setTimeout(() => {
      setIsDemoLoading(false);
      console.log('Demo register:', { name: demoName, email: demoEmail });
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0] py-12 px-4 sm:px-6 lg:px-8">
      <Container className="!max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left decorative image panel */}
            <div className="hidden md:block relative bg-[#3B2F2F]">
              <Image
                src="https://images.unsplash.com/photo-1506368249639-73a05d6f6488?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Cooking experience"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3B2F2F]/80 to-[#3B2F2F]/30" />
              <div className="absolute inset-0 flex flex-col justify-center p-8 text-white">
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
                  Join the feast!
                </h2>
                <p className="text-white/70 text-sm">
                  Create your account and start exploring authentic food
                  experiences.
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
                Create Account
              </h1>
              <p className="text-[#9C908A] mb-8">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-[#E67E22] font-medium hover:underline"
                >
                  Sign in
                </Link>
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#3B2F2F] mb-1"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9C908A]" />
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setErrors({ ...errors, name: undefined });
                      }}
                      placeholder="John Doe"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                        errors.name ? 'border-red-500' : 'border-gray-200'
                      } bg-white focus:border-[#E67E22] focus:ring-2 focus:ring-[#E67E22]/10 outline-none transition-all`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

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

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-[#3B2F2F] mb-1"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9C908A]" />
                    <input
                      id="confirmPassword"
                      type={showConfirm ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setErrors({ ...errors, confirmPassword: undefined });
                      }}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-12 py-3 rounded-xl border ${
                        errors.confirmPassword
                          ? 'border-red-500'
                          : 'border-gray-200'
                      } bg-white focus:border-[#E67E22] focus:ring-2 focus:ring-[#E67E22]/10 outline-none transition-all`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9C908A] hover:text-[#3B2F2F]"
                    >
                      {showConfirm ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-[#E67E22] text-white font-semibold rounded-xl hover:bg-[#d35400] transition-colors flex items-center justify-center gap-2"
                >
                  Create Account
                  <UserPlus className="w-5 h-5" />
                </motion.button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-xs text-[#9C908A] uppercase">or</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Demo Register */}
              <motion.button
                onClick={handleDemoRegister}
                disabled={isDemoLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 border-2 border-[#E67E22] text-[#E67E22] font-semibold rounded-xl hover:bg-[#E67E22] hover:text-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isDemoLoading ? 'Loading…' : 'Try Demo Account'}
              </motion.button>

              <p className="text-center text-xs text-[#9C908A] mt-6">
                By signing up, you agree to our{' '}
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
