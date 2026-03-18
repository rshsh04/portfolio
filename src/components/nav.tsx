"use client";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0F0F14]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Wordmark logo */}
            <Link href="/" className="group flex items-center gap-2 hover:opacity-90 transition-opacity">
              <span className="text-xl font-bold tracking-wider text-gradient">
                RASHED
              </span>
              <span className="hidden sm:inline text-xs font-mono text-neutral/40 uppercase tracking-widest mt-0.5">
                dev
              </span>
            </Link>

            {/* Hamburger menu for mobile */}
            <button
              className="md:hidden relative w-8 h-8 flex items-center justify-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                className="absolute w-5 h-[1.5px] bg-neutral/80 rounded-full"
              />
              <motion.span
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="absolute w-5 h-[1.5px] bg-neutral/80 rounded-full"
              />
              <motion.span
                animate={isMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                className="absolute w-5 h-[1.5px] bg-neutral/80 rounded-full"
              />
            </button>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-neutral/60 hover:text-primary transition-colors duration-300 tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
              <div className="relative group">
                <button
                  disabled
                  className="text-sm px-5 py-2 rounded-full border border-neutral/15 text-neutral/35 cursor-not-allowed"
                >
                  Resume
                </button>
                <div className="absolute top-full right-0 mt-2 w-56 px-3 py-2 rounded-lg bg-[#1a1a22] border border-white/5 text-xs text-neutral/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none text-center shadow-xl z-50">
                  Available upon request —{" "}
                  <span className="text-primary/70">send me an email</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-50 h-full w-72 bg-[#0F0F14]/95 backdrop-blur-xl border-l border-white/5 p-8 flex flex-col md:hidden"
            >
              <button
                onClick={() => setIsMenuOpen(false)}
                className="self-end mb-8 text-neutral/40 hover:text-neutral/80 transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-lg text-neutral/70 hover:text-primary transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <button
                    disabled
                    className="inline-block text-sm px-5 py-2 rounded-full border border-neutral/15 text-neutral/35 cursor-not-allowed"
                  >
                    Resume
                  </button>
                  <p className="text-xs text-neutral/30 mt-2">Available upon request via email</p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}