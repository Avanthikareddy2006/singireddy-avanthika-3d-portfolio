import { motion } from 'motion/react';
import { Award, BookOpen, Brain, Code, Cpu, GraduationCap, MapPin, Sparkles } from 'lucide-react';
import { personalInfo, education } from '../data/portfolio.ts';

const STATS = [
  { label: 'B.Tech GPA', value: '8.72', sub: 'CMR College (CSE Data Science)', icon: GraduationCap },
  { label: 'Intermediate GPA', value: '9.76', sub: 'Sri Chaitanya (MPC)', icon: BookOpen },
  { label: 'Industry Certifications', value: '4', sub: 'NASSCOM, Cisco & DSA', icon: Award },
  { label: 'National Hackathons', value: 'Top 8', sub: 'Global Codeverse 2026', icon: Sparkles },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Engineering Profile</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About Avanthika
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Computer Science undergraduate with a disciplined focus on Data Science, Algorithmic Problem Solving, and Production Full-Stack AI Orchestration.
          </p>
        </div>

        {/* Top Grid: Narrative Bio & Key Engineering Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Bio Overview Card */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-slate-800">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Full-Stack & Intelligent Systems</h3>
                  <p className="text-xs text-slate-400">Hyderabad, Telangana, India</p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                I am a Computer Science undergraduate at CMR College of Engineering & Technology (Class of 2027), specializing in Data Science. My engineering work bridges core algorithmic foundations with modern web technologies, building performant full-stack systems and agentic AI architectures.
              </p>

              <p className="text-sm text-slate-300 leading-relaxed">
                With hands-on experience utilizing <span className="text-cyan-300 font-medium">React, TypeScript, Node.js, Express, Supabase, PostgreSQL, and Gemini API</span>, I focus on building reliable, human-centered software — from automated multi-agent intelligence platforms to responsive, user-friendly recommendation systems.
              </p>
            </div>

            {/* Quick Core Competencies Badges */}
            <div className="pt-6 mt-6 border-t border-slate-800/80">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Engineering Focus Areas
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'Data Structures & Algorithms',
                  'Full-Stack Web Development',
                  'Agentic AI Orchestration',
                  'Relational Databases & SQL',
                  'REST APIs & Backend Systems',
                  'Prompt Engineering & Gemini API'
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900/80 border border-slate-700/60 text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Education & Academic Rigor Card */}
          <div className="lg:col-span-5 glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-slate-800">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Academic Foundation</h3>
                  <p className="text-xs text-slate-400">Computer Science & Data Science</p>
                </div>
              </div>

              <div className="space-y-4">
                {education.map((edu) => (
                  <div
                    key={edu.institution}
                    className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-100">
                        {edu.institution}
                      </h4>
                      <span className="text-[11px] font-mono text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
                        GPA {edu.gpa}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">{edu.degree}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 font-mono">
                      <span>{edu.period}</span>
                      <span>{edu.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/30 text-xs text-cyan-300 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 flex-shrink-0 text-cyan-400" />
              <span>Trained in Data Structures & Problem Solving at Smart Interviews</span>
            </div>
          </div>
        </div>

        {/* Verified Resume-Derived Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-colors group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-slate-400">{stat.label}</span>
                  <Icon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                  {stat.value}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 truncate">
                  {stat.sub}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
