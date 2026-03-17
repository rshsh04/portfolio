"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative py-10 border-t border-white/[0.04] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left"
        >
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-gradient">Rashed Ali Shekho</h3>
            <p className="text-xs text-neutral/30">
              Building the future of the web, one pixel at a time.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1 text-xs text-neutral/25">
            <p className="flex items-center gap-1.5">
              Built with{" "}
              <span className="text-primary/60 font-medium">Next.js</span> &{" "}
              <span className="text-primary/60 font-medium">Tailwind</span>
            </p>
            <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}