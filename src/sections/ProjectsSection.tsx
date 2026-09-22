import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, Calendar, Layers, ChevronDown, ChevronUp, Bot, Sparkles, CheckCircle2 } from 'lucide-react';
import { projects } from '../data/portfolio.ts';
import ProjectWorkflow3D from '../three/ProjectWorkflow3D.tsx';

export default function ProjectsSection() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0].id);
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({
    productpilot: true,
    agentos: true,
  });

  const toggleExpanded = (id: string) => {
    setExpandedDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const selectedProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0];

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Featured Engineering Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Production Projects & AI Systems
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Real-world intelligent applications developed with modern web frameworks, agentic workflow orchestration, and generative AI models.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {projects.map((proj) => {
            const isSelected = proj.id === selectedProjectId;
            return (
              <button
                key={proj.id}
                type="button"
                onClick={() => setSelectedProjectId(proj.id)}
                className={`px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all flex items-center space-x-2.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 scale-[1.02]'
                    : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span>{proj.name}</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-slate-950/30 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {proj.date}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Project Main Showcase */}
        <motion.div
          key={selectedProject.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-8"
        >
          {/* Card Overview */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pb-6 border-b border-slate-800">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {selectedProject.name}
                  </h3>
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-cyan-950/70 border border-cyan-800/50 text-cyan-300">
                    <Calendar className="w-3 h-3" />
                    <span>{selectedProject.date}</span>
                  </span>
                </div>
                <p className="text-sm font-medium text-cyan-400">
                  {selectedProject.subtitle}
                </p>
                <p className="text-sm text-slate-300 max-w-3xl leading-relaxed pt-1">
                  {selectedProject.description}
                </p>
              </div>

              {/* Action Buttons: GitHub & Demo */}
              <div className="flex flex-wrap items-center gap-3">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:border-cyan-500/50 transition-all hover:scale-[1.02]"
                  >
                    <Github className="w-4 h-4 text-cyan-400" />
                    <span>View Repository</span>
                  </a>
                )}

                {selectedProject.liveUrl ? (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                ) : (
                  <span
                    className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-[11px] font-mono bg-slate-900/60 border border-slate-800 text-slate-400"
                    title="Live URL not configured in resume"
                  >
                    <span>Internal Architecture</span>
                  </span>
                )}
              </div>
            </div>

            {/* Technologies Badges */}
            <div className="pt-5 pb-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center space-x-2">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Tech Stack Utilized</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-900/90 text-cyan-200 border border-cyan-900/40"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Contributions & Features */}
            <div className="mt-5 pt-5 border-t border-slate-800">
              <button
                type="button"
                onClick={() => toggleExpanded(selectedProject.id)}
                className="w-full flex items-center justify-between text-left text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-cyan-300 transition-colors py-1"
              >
                <span>Key Engineering Highlights & Contributions</span>
                {expandedDetails[selectedProject.id] ? (
                  <ChevronUp className="w-4 h-4 text-cyan-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-cyan-400" />
                )}
              </button>

              <AnimatePresence>
                {expandedDetails[selectedProject.id] && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 space-y-2.5 overflow-hidden"
                  >
                    {selectedProject.keyFeatures.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Interactive 3D System Visualization for this project */}
          <div>
            <ProjectWorkflow3D
              projectId={selectedProject.id}
              workflowTitle={selectedProject.workflowTitle}
              steps={selectedProject.workflowSteps}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
