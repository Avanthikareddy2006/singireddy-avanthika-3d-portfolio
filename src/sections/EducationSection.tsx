import { motion } from 'motion/react';
import { GraduationCap, Calendar, MapPin, Award, CheckCircle, BookOpen } from 'lucide-react';
import { education } from '../data/portfolio.ts';

export default function EducationSection() {
  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 text-xs font-mono mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Academic Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education Timeline
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Rigorous academic foundation in Computer Science, Data Science, and Mathematics with top percentiles and high cumulative GPAs.
          </p>
        </div>

        {/* 3D Timeline Structure */}
        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-32 space-y-12">
          {education.map((item, idx) => (
            <motion.div
              key={item.institution}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative pl-6 md:pl-10 group"
            >
              {/* Animated Timeline Node */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 shadow-md shadow-cyan-500/30 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
                {idx === 0 ? <GraduationCap className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
              </div>

              {/* Date stamp positioned on the left on desktop */}
              <div className="md:absolute md:-left-36 md:top-2 md:text-right hidden md:block">
                <span className="text-xs font-mono text-cyan-400 font-semibold block">
                  {item.period}
                </span>
                <span className="text-[11px] font-mono text-slate-500 block">
                  {item.status}
                </span>
              </div>

              {/* Education Card */}
              <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all shadow-xl">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <span className="md:hidden text-xs font-mono text-cyan-400 font-medium">
                    {item.period} • {item.status}
                  </span>
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/80 border border-cyan-800/60 text-cyan-300">
                    <Award className="w-3.5 h-3.5 text-cyan-400" />
                    <span>GPA: {item.gpa}</span>
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {item.institution}
                </h3>
                <p className="text-sm font-medium text-slate-300 mt-1">
                  {item.degree}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{item.location}</span>
                  </div>
                  <span className="text-emerald-400 flex items-center space-x-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
