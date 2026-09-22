import { motion } from 'motion/react';
import { Trophy, Award, Sparkles, Target, Users, Flame } from 'lucide-react';
import { achievements } from '../data/portfolio.ts';

export default function AchievementsSection() {
  return (
    <section id="achievements" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 text-xs font-mono mb-3">
            <Trophy className="w-3.5 h-3.5 text-cyan-400" />
            <span>Honors & Recognitions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Competitive Achievements
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Distinguished performance in high-stakes competitive hackathons and project challenges, demonstrating practical execution, technical leadership, and domain innovation.
          </p>
        </div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {achievements.map((item, idx) => (
            <motion.div
              key={item.event}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="glass-panel p-7 sm:p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-950/30 transition-all group relative overflow-hidden flex flex-col justify-between"
            >
              {/* Subtle accent glow */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-cyan-500/10 via-indigo-500/5 to-transparent rounded-full blur-2xl group-hover:scale-125 transition-transform pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg group-hover:scale-105 transition-transform">
                    {idx === 0 ? <Trophy className="w-7 h-7" /> : <Award className="w-7 h-7" />}
                  </div>

                  <span className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-950/70 border border-cyan-800/50 text-cyan-300">
                    {item.highlight}
                  </span>
                </div>

                <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-1">
                  {item.category}
                </span>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-cyan-200 transition-colors">
                  {item.title} — {item.event}
                </h3>

                <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center space-x-1.5">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>National Recognition</span>
                </span>
                <span className="text-cyan-400">Verified Accomplishment</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
