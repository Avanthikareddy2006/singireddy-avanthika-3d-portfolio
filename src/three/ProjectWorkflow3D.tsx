import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, CheckCircle2, Bot, BrainCircuit, ArrowDown, Cpu, Sparkles } from 'lucide-react';
import { WorkflowStep } from '../types.ts';

interface ProjectWorkflow3DProps {
  projectId: string;
  workflowTitle: string;
  steps: WorkflowStep[];
}

export default function ProjectWorkflow3D({
  projectId,
  workflowTitle,
  steps
}: ProjectWorkflow3DProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setIsPlaying(false);
  };

  const currentStepData = steps[activeStep] || steps[0];

  return (
    <div
      id={`workflow-container-${projectId}`}
      className="rounded-2xl p-5 md:p-6 bg-slate-950/80 border border-slate-800/80 shadow-2xl relative overflow-hidden"
    >
      {/* Subtle top indicator bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800/80">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            {projectId === 'agentos' ? <Bot className="w-4 h-4" /> : <BrainCircuit className="w-4 h-4" />}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-1.5">
              {workflowTitle}
              <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
                Interactive Pipeline
              </span>
            </h4>
            <p className="text-xs text-slate-400">
              Step {activeStep + 1} of {steps.length} • Click any node to inspect data flow
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center space-x-1.5 px-2.5 py-1 text-xs rounded-lg bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white hover:border-cyan-500/50 transition-colors"
            title={isPlaying ? 'Pause flow' : 'Play flow'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 text-cyan-400" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-cyan-400" />
                <span>Simulate</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveStep(0);
              setIsPlaying(true);
            }}
            className="p-1 text-xs rounded-lg bg-slate-900 border border-slate-700/80 text-slate-400 hover:text-white transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Workflow Node Sequence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left / Top: Interactive Vertical/Horizontal Nodes */}
        <div className="lg:col-span-7 space-y-2">
          {steps.map((s, idx) => {
            const isActive = idx === activeStep;
            const isCompleted = idx < activeStep;

            return (
              <div key={s.step} className="relative">
                <button
                  type="button"
                  onClick={() => handleStepClick(idx)}
                  className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-center justify-between ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-950/40 via-slate-900/90 to-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-950/50 translate-x-1'
                      : isCompleted
                      ? 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:border-slate-700'
                      : 'bg-slate-900/20 border-slate-800/40 text-slate-500 hover:border-slate-700/60'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <span
                      className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold border transition-colors ${
                        isActive
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                          : isCompleted
                          ? 'bg-slate-800 text-cyan-400 border-slate-700'
                          : 'bg-slate-950 text-slate-500 border-slate-800'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : s.step}
                    </span>

                    <span
                      className={`text-xs md:text-sm font-medium truncate ${
                        isActive ? 'text-cyan-200 font-semibold' : 'text-slate-300'
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>

                  {isActive && (
                    <span className="flex-shrink-0 flex items-center space-x-1 text-[11px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/50">
                      <Sparkles className="w-3 h-3 animate-spin" />
                      <span>Active</span>
                    </span>
                  )}
                </button>

                {idx < steps.length - 1 && (
                  <div className="flex justify-center -my-1 text-slate-700 pointer-events-none">
                    <ArrowDown className="w-3.5 h-3.5 opacity-40" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Step Inspector Callout with Animated Details */}
        <div className="lg:col-span-5">
          <div className="h-full min-h-[220px] rounded-xl p-5 bg-gradient-to-b from-slate-900/90 to-slate-950 border border-cyan-500/20 flex flex-col justify-between relative overflow-hidden">
            {/* Ambient corner light */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400">
                  Step {currentStepData.step} Architecture
                </span>
                <span className="p-1 rounded-md bg-slate-800/80 text-cyan-300">
                  <Cpu className="w-4 h-4" />
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStepData.step}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <h5 className="text-base font-bold text-slate-100 mb-2">
                    {currentStepData.title}
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentStepData.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pipeline status visual footer */}
            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-mono">
                System: <span className="text-emerald-400">Healthy & Synced</span>
              </span>
              <span className="text-slate-500">
                {activeStep === steps.length - 1 ? 'Terminal Node' : 'Passing to Next Agent'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
