'use client';

import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Container from '@/components/layout/Container';
import { Send, Mail, Sparkles } from 'lucide-react';

export default function NewsletterCTA() {
  const [email, setEmail] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const controls = useAnimation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      controls.start({ scale: [1, 1.1, 1], transition: { duration: 0.3 } });
    }
  };

  return (
    <section className="py-20 md:py-28 bg-[#3B2F2F] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(#E67E22_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-[0.08]" />
        <motion.div
          className="absolute -top-20 -right-20 w-80 h-80 bg-[#E67E22]/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#FFF8F0]/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], rotate: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
        />
      </div>

      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-[#FFF8F0]"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-[#E67E22]" />
              <span className="text-[#E67E22] font-semibold uppercase tracking-widest text-sm">
                Stay Hungry for More
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Get the latest <br />
              <span className="text-[#E67E22]">food stories</span> & exclusive
              offers
            </h2>
            <p className="text-[#9C908A]/80 text-lg max-w-md">
              Join our community of food lovers and never miss a hidden gem,
              secret recipe, or special event.
            </p>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-5 h-5 text-[#E67E22]" />
              <h3 className="text-xl font-semibold text-[#FFF8F0]">
                Subscribe to our newsletter
              </h3>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/10 text-[#FFF8F0] placeholder:text-[#9C908A]/60 focus:outline-none focus:border-[#E67E22] transition-colors"
              />
              <motion.button
                type="submit"
                className="px-6 py-3 bg-[#E67E22] text-white font-semibold rounded-full hover:bg-[#d35400] transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                animate={controls}
              >
                {submitted ? 'Subscribed!' : 'Subscribe'}
                <Send className="w-4 h-4" />
              </motion.button>
            </form>

            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-[#22C55E] text-sm flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> You’re in! Check your inbox
                soon.
              </motion.p>
            )}
            <p className="mt-4 text-xs text-[#9C908A]/60">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
