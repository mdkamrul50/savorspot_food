'use client';

import { useState, useEffect, type FC, type MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion';
import Container from './Container';
import Button from '../ui/Button';

// ──── Type Definitions ────
interface NavLink {
  href: string;
  label: string;
}

interface ScrollState {
  scrolled: boolean;
}

// ──── Constants ────
const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore' },
];

const SCROLL_THRESHOLD: number = 50;

// ──── Component ────
const Navbar: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const pathname: string = usePathname();
  const {
    scrollY,
    scrollYProgress,
  }: { scrollY: MotionValue<number>; scrollYProgress: MotionValue<number> } =
    useScroll();

  useMotionValueEvent(scrollY, 'change', (latest: number) => {
    setScrolled(latest > SCROLL_THRESHOLD);
  });

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = (): void => setMobileMenuOpen(false);

  const handleMobileToggle = (): void => {
    setMobileMenuOpen((prev: boolean) => !prev);
  };

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    closeMobileMenu();
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-deep-aubergine/35 backdrop-blur-sm shadow-lg shadow-black/10'
          : 'bg-transparent '
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Container>
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span
              className="text-2xl font-bold text-[#FDFBF7] tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Savor<span className="text-[#D35400]">Spot</span>
            </span>
            <motion.span
              className="w-2 h-2 bg-[#D35400] rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link: NavLink) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium uppercase tracking-wide transition-colors ${
                  pathname === link.href
                    ? 'text-[#D35400]'
                    : 'text-[#FDFBF7]/80 hover:text-[#D35400]'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#D35400]"
                    layoutId="activeLink"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/login">
              <Button>Become a Host</Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-[#FDFBF7]"
            onClick={handleMobileToggle}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-6 h-0.5 bg-current"
              animate={
                mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-current"
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-current"
              animate={
                mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3 }}
            />
          </button>
        </nav>
      </Container>

      {/* Mobile Menu Overlay & Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-3/4 max-w-sm bg-[#2D1B33] backdrop-blur-xl z-50 p-6 flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="flex justify-end mb-8">
                <button
                  onClick={closeMobileMenu}
                  className="text-[#FDFBF7] text-2xl"
                >
                  &times;
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {navLinks.map((link: NavLink, i: number) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={handleLinkClick}
                      className={`text-lg font-medium ${
                        pathname === link.href
                          ? 'text-[#D35400]'
                          : 'text-[#FDFBF7]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 pt-4 border-t border-[#D35400]/20"
                >
                  <Link
                    href="/login"
                    onClick={handleLinkClick}
                    className="text-[#D35400] text-lg font-semibold"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    href="/login"
                    onClick={handleLinkClick}
                    className="block mt-2"
                  >
                    <Button className="w-full">Become a Host</Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-[#D35400] origin-left"
        style={{ scaleX: scrollYProgress }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      />
    </motion.header>
  );
};

export default Navbar;
