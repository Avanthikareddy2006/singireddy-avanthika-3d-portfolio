import { useState, ComponentType } from 'react';
import { motion } from 'motion/react';
import {
  Code2,
  Binary,
  Layout,
  Server,
  Database,
  Terminal,
  Sparkles,
  Layers,
  Cpu
} from 'lucide-react';
import { skillCategories } from '../data/portfolio.ts';

const CATEGORY_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  Languages: Code2,
  'Core Subjects': Binary,
  Frontend: Layout,
  Backend: Server,
  Databases: Database,
  'Tools & Platforms': Terminal,
};

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredCategories =
    selectedCategory === 'All'
      ? skillCategories
      : skillCategories.filter((cat) => cat.category === selectedCategory);

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 text-xs font-mono mb-3">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skills & Competencies
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Curated directly from verified academic, project, and certification experience. Grouped across system foundations, modern web engineering, and data platforms.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            type="button"
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedCategory === 'All'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            All Disciplines
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.category}
              type="button"
              onClick={() => setSelectedCategory(cat.category)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat.category
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat, idx) => {
            const Icon = CATEGORY_ICONS[cat.category] || Layers;

            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-950/30 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-cyan-400 group-hover:scale-110 group-hover:border-cyan-500/40 transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {cat.category}
                        </h3>
                        <p className="text-[11px] text-slate-400 font-mono">
                          {cat.skills.length} core items
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Skills badges */}
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-slate-900/90 text-slate-200 border border-slate-700/60 group-hover:border-slate-600 transition-all hover:border-cyan-500 hover:text-cyan-300 hover:bg-slate-850 hover:scale-105"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Verified in Resume</span>
                  <span className="text-cyan-400/80">Active Stack</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
