import { useState, useRef, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Compass, Zap, RotateCcw } from 'lucide-react';
import ProfilePhotoFrame from '../components/ProfilePhotoFrame.tsx';
import SpringyTechBadge, { TechItem } from '../components/SpringyTechBadge.tsx';

// Technologies strictly from resume with rich interactive details
const FLOATING_TECHS: TechItem[] = [
  {
    id: 'react',
    name: 'React.js',
    category: 'Frontend Architecture',
    roleInStack: 'Component tree design, custom hooks, and modern reactive UIs',
    color: 'from-cyan-500/25 via-cyan-950/60 to-slate-900/90',
    activeColor: 'from-cyan-400/40 via-cyan-900/80 to-slate-900',
    border: 'border-cyan-500/50 hover:border-cyan-300',
    text: 'text-cyan-300',
    glow: 'shadow-cyan-500/30',
    pos: 'top-1 -left-4 sm:-left-12',
    delay: 0,
    iconName: 'Code2',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Strict Typing',
    roleInStack: 'Type-safe interfaces, robust agent state, and zero-runtime defects',
    color: 'from-blue-500/25 via-blue-950/60 to-slate-900/90',
    activeColor: 'from-blue-400/40 via-blue-900/80 to-slate-900',
    border: 'border-blue-500/50 hover:border-blue-300',
    text: 'text-blue-300',
    glow: 'shadow-blue-500/30',
    pos: 'top-16 -right-6 sm:-right-12',
    delay: 0.15,
    iconName: 'Layers',
  },
  {
    id: 'gemini',
    name: 'Gemini API',
    category: 'Generative AI',
    roleInStack: 'LLM orchestration, agentic reasoning loops, and multimodal analysis',
    color: 'from-purple-500/25 via-purple-950/60 to-slate-900/90',
    activeColor: 'from-purple-400/40 via-purple-900/80 to-slate-900',
    border: 'border-purple-500/50 hover:border-purple-300',
    text: 'text-purple-300',
    glow: 'shadow-purple-500/30',
    pos: 'bottom-28 -left-8 sm:-left-14',
    delay: 0.3,
    iconName: 'Sparkles',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Algorithms & AI',
    roleInStack: 'Data science models, algorithmic scripting, and backend automation',
    color: 'from-amber-500/25 via-amber-950/60 to-slate-900/90',
    activeColor: 'from-amber-400/40 via-amber-900/80 to-slate-900',
    border: 'border-amber-500/50 hover:border-amber-300',
    text: 'text-amber-300',
    glow: 'shadow-amber-500/30',
    pos: 'bottom-10 -right-4 sm:-right-10',
    delay: 0.45,
    iconName: 'Cpu',
  },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    category: 'Relational DB',
    roleInStack: 'ACID transactional schemas, relational indexing, and complex queries',
    color: 'from-sky-500/25 via-sky-950/60 to-slate-900/90',
    activeColor: 'from-sky-400/40 via-sky-900/80 to-slate-900',
    border: 'border-sky-500/50 hover:border-sky-300',
    text: 'text-sky-300',
    glow: 'shadow-sky-500/30',
    pos: '-top-6 right-6 sm:right-14',
    delay: 0.6,
    iconName: 'Database',
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'Cloud Backend',
    roleInStack: 'Realtime database subscriptions, Row-Level Security, and Auth',
    color: 'from-emerald-500/25 via-emerald-950/60 to-slate-900/90',
    activeColor: 'from-emerald-400/40 via-emerald-900/80 to-slate-900',
    border: 'border-emerald-500/50 hover:border-emerald-300',
    text: 'text-emerald-300',
    glow: 'shadow-emerald-500/30',
    pos: '-bottom-7 left-10 sm:left-18',
    delay: 0.75,
    iconName: 'Flame',
  },
];

export default function HeroVisual3D() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [activeTechId, setActiveTechId] = useState<string | null>(null);
  const [physicsMode, setPhysicsMode] = useState<'repel' | 'magnetic'>('repel');
  const [pulseTrigger, setPulseTrigger] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalized coordinates between -1 and 1
      const x = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width * 0.8)));
      const y = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height * 0.8)));

      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setMouseOffset({ x, y });
      });
    };

    window.addEventListener('mousemove', handleMouseMove as any, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove as any);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleTechClick = (techId: string) => {
    setActiveTechId((prev) => (prev === techId ? null : techId));
  };

  const triggerSpringPulse = () => {
    setPulseTrigger((prev) => prev + 1);
  };

  const activeTech = FLOATING_TECHS.find((t) => t.id === activeTechId);

  return (
    <div className="flex flex-col items-center">
      <div
        ref={containerRef}
        id="hero-3d-visual"
        className="relative flex items-center justify-center p-4 sm:p-8"
        style={{ perspective: '1400px' }}
      >
        {/* Floating Spring-Physics Tech Elements */}
        {FLOATING_TECHS.map((tech) => (
          <SpringyTechBadge
            key={tech.id}
            tech={tech}
            isActive={activeTechId === tech.id}
            physicsMode={physicsMode}
            pulseTrigger={pulseTrigger}
            onSelect={handleTechClick}
          />
        ))}

        {/* Centerpiece 3D Card Frame with User Photo & Enhanced Gyroscopic Parallax */}
        <ProfilePhotoFrame className="z-10" mouseWindowOffset={mouseOffset} />

        {/* Pop-up Interactive Tech Info Drawer on Click */}
        <AnimatePresence>
          {activeTech && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              className="absolute -bottom-16 sm:-bottom-20 z-40 max-w-xs sm:max-w-sm w-full mx-4 p-4 rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-cyan-500/50 shadow-2xl shadow-cyan-950/80"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                      <span>{activeTech.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                        {activeTech.category}
                      </span>
                    </h4>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTechId(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Close tech preview"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed pl-1">
                {activeTech.roleInStack}
              </p>

              <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-cyan-400">
                <span className="text-slate-400 text-[10px]">Verified in Projects & Resume</span>
                <a
                  href="#skills"
                  onClick={() => setActiveTechId(null)}
                  className="hover:underline flex items-center space-x-1"
                >
                  <span>View in Skills</span>
                  <span>→</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive Physics Controls Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="mt-6 flex flex-wrap items-center justify-center gap-2.5 px-3 py-1.5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800/90 text-xs font-mono shadow-lg"
      >
        <div className="flex items-center space-x-1.5 text-slate-400 px-2 py-0.5">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[11px] hidden sm:inline">Spring Physics:</span>
        </div>

        {/* Physics mode toggle buttons */}
        <div className="flex items-center p-0.5 rounded-xl bg-slate-950/80 border border-slate-800">
          <button
            type="button"
            onClick={() => setPhysicsMode('repel')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${
              physicsMode === 'repel'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Elastic Repel
          </button>
          <button
            type="button"
            onClick={() => setPhysicsMode('magnetic')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${
              physicsMode === 'magnetic'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Magnetic Attract
          </button>
        </div>

        {/* Pulse / Burst Shockwave Button */}
        <button
          type="button"
          onClick={triggerSpringPulse}
          className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-750 text-cyan-300 hover:text-white border border-slate-700/60 hover:border-cyan-500/50 transition-all active:scale-95 text-[10px]"
          title="Trigger elastic spring shockwave pulse"
        >
          <RotateCcw className="w-3 h-3 text-cyan-400" />
          <span>Spring Impulse</span>
        </button>
      </motion.div>
    </div>
  );
}
