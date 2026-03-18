"use client";
import { useState } from "react";
import { FaGithub, FaLinkedin, FaReact, FaNodeJs, FaCopy } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiJavascript, SiMongodb, SiAppwrite, SiSupabase, SiStripe } from "react-icons/si";
import Image from "next/image";
import Link from "next/link";
import Me from "./me";
import { Flip, ToastContainer, toast } from 'react-toastify';
import { motion, type Variants } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { iconMap } from "@/lib/icons";
import { DBProject, DBCertificate } from "@/lib/types";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const techIcons = [
  { Icon: FaReact, label: "React" },
  { Icon: SiNextdotjs, label: "Next.js" },
  { Icon: SiTypescript, label: "TypeScript" },
  { Icon: SiTailwindcss, label: "Tailwind" },
  { Icon: SiJavascript, label: "JavaScript" },
  { Icon: FaNodeJs, label: "Node.js" },
  { Icon: SiMongodb, label: "MongoDB" },
];

export default function Main({
  initialProjects,
  initialCertificates,
}: {
  initialProjects: DBProject[];
  initialCertificates: DBCertificate[];
}) {
  const notify = () => toast.success("📩 Email address copied! You're ready to paste it.", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Flip,
  });

  return (
    <>
      <main className="relative min-h-screen">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="colored"
          transition={Flip}
        />

        {/* ═══════════════════ HERO ═══════════════════ */}
        <section
          id="about"
          className="relative min-h-screen flex items-center overflow-hidden"
        >
          {/* Background image */}
          <Image
            src="/backg.jpg"
            alt="Background"
            fill
            className="object-cover absolute inset-0 -z-20"
            priority
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F14]/60 via-[#0F0F14]/40 to-[#0F0F14] -z-10" />

          <div className="container mx-auto px-6 py-24 lg:py-0">
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
              {/* Left — Text content */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 max-w-xl">
                <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                  className="text-sm font-mono text-primary/80 tracking-widest uppercase"
                >
                  Software Developer
                </motion.p>

                <motion.h1
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                >
                  <span className="text-gradient">Rashed</span>{" "}
                  <span className="text-neutral/90">Ali Shekho</span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                  className="text-base lg:text-lg text-neutral/60 leading-relaxed max-w-md"
                >
                  I craft elegant solutions to complex problems. With expertise in
                  modern web technologies, I build responsive and performant
                  applications.
                </motion.p>

                {/* Tech stack icons */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-wrap justify-center lg:justify-start gap-2.5"
                >
                  {techIcons.map(({ Icon, label }, index) => (
                    <motion.div
                      key={label}
                      variants={fadeUp}
                      custom={index}
                      whileHover={{ scale: 1.15, y: -3 }}
                      className="p-2.5 glass-card rounded-xl cursor-default group"
                      title={label}
                    >
                      <Icon className="w-7 h-7 text-neutral/50 group-hover:text-primary transition-colors duration-300" />
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA buttons */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={4}
                  className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-2"
                >
                  <a
                    href="https://github.com/rshsh04"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group px-6 py-3 glass-card rounded-full flex items-center justify-center gap-2.5 hover:border-primary/30"
                  >
                    <FaGithub className="text-lg text-neutral/60 group-hover:text-primary transition-colors duration-300" />
                    <span className="text-sm text-neutral/60 group-hover:text-primary transition-colors duration-300">GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rashed-ali-shekho-03160b204/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group px-6 py-3 glass-card rounded-full flex items-center justify-center gap-2.5 hover:border-secondary/30"
                  >
                    <FaLinkedin className="text-lg text-neutral/60 group-hover:text-secondary transition-colors duration-300" />
                    <span className="text-sm text-neutral/60 group-hover:text-secondary transition-colors duration-300">LinkedIn</span>
                  </a>
                </motion.div>
              </div>

              {/* Right — Profile photo with glow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="relative flex-shrink-0"
              >
                <div className="hero-glow animate-glow-pulse" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
                <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80">
                  {/* Animated circle line */}
                  <div className="absolute -inset-4 flex items-center justify-center pointer-events-none">
                    <svg className="w-full h-full animate-[spin_25s_linear_infinite]" viewBox="0 0 200 200">
                      <circle cx="100" cy="100" r="92" fill="none" stroke="url(#circleGrad)" strokeWidth="1" strokeDasharray="8 6" opacity="0.5" />
                      <defs>
                        <linearGradient id="circleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#5EEAD4" />
                          <stop offset="100%" stopColor="#C4B5FD" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="w-full h-full rounded-full overflow-hidden ring-2 ring-primary/15 hover:ring-primary/30 transition-all duration-500">
                    <img
                      src="/rashed.png"
                      alt="Rashed Ali Shekho"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-mono text-neutral/30 uppercase tracking-[0.2em]">Scroll</span>
            <div className="w-5 h-8 rounded-full border border-neutral/15 flex justify-center pt-1.5">
              <div className="w-1 h-2 rounded-full bg-primary/50 animate-scroll-hint" />
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════ ABOUT ME ═══════════════════ */}
        <Me certificates={initialCertificates} />

        {/* ═══════════════════ PROJECTS ═══════════════════ */}
        <section id="projects" className="py-20 md:py-28 relative">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-bold text-gradient mb-4 text-center"
            >
              Featured Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-neutral/40 text-center mb-14 max-w-lg mx-auto"
            >
              A selection of recent work I&apos;m proud of.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {initialProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  whileHover={{ y: -6 }}
                >
                  <Link
                    href={project.url || "#"}
                    target="_blank"
                    className="group block glass-card rounded-2xl overflow-hidden h-full hover:shadow-[0_0_30px_-5px_rgba(94,234,212,0.15)] transition-all duration-500 hover:border-primary/20"
                  >
                    <div className="relative h-64 md:h-72 w-full overflow-hidden">
                      {project.image_url && (
                        <Image
                          src={project.image_url}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F14] via-transparent to-transparent opacity-60" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-neutral/90">{project.title}</h3>
                        {project.tag && (
                          <span className={`px-3 py-1 text-xs rounded-full border ${
                            idx % 2 === 0
                              ? "bg-primary/10 text-primary border-primary/20"
                              : "bg-secondary/10 text-secondary border-secondary/20"
                          }`}>
                            {project.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-neutral/50 mb-5 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-2.5">
                        {project.tech_stack?.map((tech, tIdx) => {
                          const IconComp = iconMap[tech.icon];
                          return IconComp ? (
                            <div key={tIdx} className="p-1.5 rounded-lg bg-white/[0.03]">
                              <IconComp className={`w-4 h-4 ${tech.color}`} />
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════ CONTACT + FOOTER ═══════════════════ */}
        <section id="contact" className="relative py-20 md:py-28 overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gradient mb-4">
                Let&apos;s Connect
              </h2>
              <p className="text-neutral/50 mb-10">
                I&apos;m always interested in hearing about new projects and opportunities. Feel free to reach out!
              </p>

              <div className="space-y-4">
                {/* Email card */}
                <div className="group relative">
                  <a
                    href="mailto:contact@Rashedalishekho.com"
                    className="block px-6 py-4 glass-card rounded-xl text-center text-neutral/80 hover:text-primary transition-colors duration-300"
                  >
                    Contact@Rashedalishekho.com
                  </a>
                  <button
                    type="button"
                    className="absolute top-1/2 -translate-y-1/2 right-4 p-2 text-neutral/30 hover:text-primary transition-colors duration-300"
                    onClick={() => navigator.clipboard.writeText('contact@Rashedalishekho.com')
                      .then(() => { notify(); })
                    }
                  >
                    <FaCopy className="w-4 h-4" />
                  </button>
                </div>

                {/* Social row */}
                <div className="flex gap-4">
                  <a
                    href="https://github.com/rshsh04"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex-1 px-5 py-3.5 glass-card rounded-xl flex items-center justify-center gap-2"
                  >
                    <FaGithub className="text-base text-neutral/50 group-hover:text-primary transition-colors duration-300" />
                    <span className="text-sm text-neutral/50 group-hover:text-primary transition-colors duration-300">GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rashed-ali-shekho-03160b204/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex-1 px-5 py-3.5 glass-card rounded-xl flex items-center justify-center gap-2"
                  >
                    <FaLinkedin className="text-base text-neutral/50 group-hover:text-secondary transition-colors duration-300" />
                    <span className="text-sm text-neutral/50 group-hover:text-secondary transition-colors duration-300">LinkedIn</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
