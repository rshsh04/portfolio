"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiJavascript, SiMongodb, SiGit, SiSupabase } from "react-icons/si";
import { DBCertificate } from "@/lib/types";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const skills = [
  { Icon: FaReact, label: "React", color: "text-cyan-400" },
  { Icon: SiNextdotjs, label: "Next.js", color: "text-neutral/80" },
  { Icon: SiTypescript, label: "TypeScript", color: "text-blue-400" },
  { Icon: SiJavascript, label: "JavaScript", color: "text-yellow-400" },
  { Icon: SiTailwindcss, label: "Tailwind", color: "text-teal-400" },
  { Icon: FaNodeJs, label: "Node.js", color: "text-green-400" },
  { Icon: SiMongodb, label: "MongoDB", color: "text-emerald-400" },
  { Icon: SiSupabase, label: "Supabase", color: "text-emerald-300" },
  { Icon: SiGit, label: "Git", color: "text-orange-400" },
];

export default function Me({ certificates }: { certificates: DBCertificate[] }) {

  return (
    <section className="py-20 md:py-28 relative">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold text-gradient mb-4 text-center"
        >
          About Me
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-neutral/40 text-center mb-14 max-w-lg mx-auto"
        >
          Experience, education, skills, and credentials at a glance.
        </motion.p>

        {/* Bento Grid */}
        <div className="max-w-5xl mx-auto bento-grid">

          {/* Experience — spans 2 columns on desktop */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="md:col-span-2 glass-card rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <h3 className="text-xs font-mono uppercase tracking-widest text-primary/80">Experience</h3>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h4 className="text-xl font-bold text-neutral/90">Software Developer</h4>
                <span className="text-xs font-mono text-neutral/40">2023 — Present</span>
              </div>
              <p className="text-sm text-secondary/80 font-medium">Freelance</p>
              <p className="text-sm text-neutral/50 leading-relaxed">
                Developed and maintained web applications using React, Next.js, and TypeScript.
                Collaborated with cross-functional teams to deliver high-quality software solutions.
                Built full-stack products from concept to deployment, including restaurant platforms and
                financial management tools.
              </p>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="glass-card rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <h3 className="text-xs font-mono uppercase tracking-widest text-secondary/80">Education</h3>
            </div>
            <h4 className="text-lg font-bold text-neutral/90 mb-1">B.Sc. Information Systems</h4>
            <p className="text-sm text-primary/70 font-medium mb-1">Karlstads Universitet</p>
            <p className="text-xs font-mono text-neutral/40 mb-3">2023 — 2026</p>
            <p className="text-sm text-neutral/50 leading-relaxed">
              Focused on software engineering, system design, and web development fundamentals.
            </p>
          </motion.div>

          {/* Skills */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="md:col-span-2 glass-card rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <h3 className="text-xs font-mono uppercase tracking-widest text-accent/80">Tech Stack</h3>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3">
              {skills.map(({ Icon, label, color }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-primary/20 transition-colors duration-300"
                >
                  <Icon className={`w-6 h-6 ${color}`} />
                  <span className="text-[10px] font-mono text-neutral/40">{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certificates */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="md:col-span-3 glass-card rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <h3 className="text-xs font-mono uppercase tracking-widest text-primary/80">Certifications</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {certificates.map((cert, index) => (
                <Link
                  key={index}
                  href={cert.pdf_path}
                  target="_blank"
                  className="group flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-primary/20 hover:shadow-[0_0_20px_-5px_rgba(94,234,212,0.15)] transition-all duration-300"
                >
                  <div className="mt-0.5 w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-primary/60 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-neutral/70 group-hover:text-neutral/90 transition-colors leading-snug">{cert.name}</p>
                    <p className="text-[10px] font-mono text-neutral/30 mt-1">{cert.issuer} · {cert.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
