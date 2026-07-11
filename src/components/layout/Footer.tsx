'use client';

import Link from 'next/link';
import Container from './Container';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#3B2F2F] text-white relative">
      {/* Top gradient line */}
      <div className="h-1 bg-gradient-to-r from-[#E67E22] via-[#E67E22]/60 to-transparent" />

      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span
                className="text-2xl font-bold text-white tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Savor<span className="text-[#E67E22]">Spot</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Discover and book authentic food experiences hosted by passionate
              locals. Taste the unseen, book the local.
            </p>
            {/* Simple Social Icons (inline SVGs) */}
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E67E22] transition-colors"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E67E22] transition-colors"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* Twitter/X */}
              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E67E22] transition-colors"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Explore Experiences', href: '/explore' },
                { label: 'Become a Host', href: '/become-host' },
                { label: 'About Us', href: '/about' },
                { label: 'Blog', href: '/blog' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-[#E67E22] transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-[#E67E22] flex-shrink-0" />
                <span>123 Food Street, Old Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Mail className="w-4 h-4 text-[#E67E22] flex-shrink-0" />
                <a
                  href="mailto:hello@savorspot.com"
                  className="hover:text-[#E67E22] transition-colors"
                >
                  hello@savorspot.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Phone className="w-4 h-4 text-[#E67E22] flex-shrink-0" />
                <a
                  href="tel:+8801700000000"
                  className="hover:text-[#E67E22] transition-colors"
                >
                  +880 1700-000000
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter & Back to top */}
          <div>
            <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
            <p className="text-white/60 text-sm mb-3">
              Subscribe to our newsletter for the latest food stories.
            </p>
            <form className="flex gap-2 mb-6">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[#E67E22]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#E67E22] text-white rounded-full text-sm font-medium hover:bg-[#d35400] transition-colors"
              >
                Join
              </button>
            </form>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-white/60 hover:text-[#E67E22] transition-colors text-sm"
            >
              <ArrowUp className="w-4 h-4" />
              Back to top
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} SavorSpot. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-white/40">
            <Link
              href="/privacy"
              className="hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white/60 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
