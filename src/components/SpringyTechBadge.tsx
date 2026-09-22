import { useRef, useEffect, useState, ComponentType } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import {
  Code2,
  Cpu,
  Database,
  Flame,
  Layers,
  Sparkles,
  Binary,
  Server
} from 'lucide-react';

export interface TechItem {
  id: string;
  name: string;
  category: string;
  roleInStack: string;
  color: string;
  activeColor: string;
  border: string;
  text: string;
  glow: string;
  pos: string;
  delay: number;
  iconName: string;
}

const ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  Code2,
  Cpu,
  Database,
  Flame,
  Layers,
  Sparkles,
  Binary,
  Server
};

interface SpringyTechBadgeProps {
  tech: TechItem;
  isActive: boolean;
  physicsMode?: 'repel' | 'magnetic';
  pulseTrigger?: number;
  onSelect: (id: string) => void;
}

export default function SpringyTechBadge({
  tech,
  isActive,
  physicsMode = 'repel',
  pulseTrigger = 0,
  onSelect
}: SpringyTechBadgeProps) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [isNearby, setIsNearby] = useState(false);
  const [isDirectlyHovered, setIsDirectlyHovered] = useState(false);

  // Framer Motion continuous spring physics values
  // High stiffness + tuned damping gives an elastic, bouncy, snappy feel
  const springConfig = {
    stiffness: 280,
    damping: 16,
    mass: 0.55
  };

  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const targetScale = useMotionValue(1);
  const targetRotate = useMotionValue(0);

  const springX = useSpring(targetX, springConfig);
  const springY = useSpring(targetY, springConfig);
  const springScale = useSpring(targetScale, { stiffness: 350, damping: 18 });
  const springRotate = useSpring(targetRotate, { stiffness: 240, damping: 15 });

  // Spring shockwave trigger (burst pulse)
  useEffect(() => {
    if (pulseTrigger > 0) {
      const angle = (tech.delay * Math.PI * 2) + Math.random() * 0.5;
      const kickDistance = 45;
      targetX.set(Math.cos(angle) * kickDistance);
      targetY.set(Math.sin(angle) * kickDistance);
      targetScale.set(1.28);
      targetRotate.set((Math.random() - 0.5) * 20);

      const timeout = setTimeout(() => {
        targetX.set(0);
        targetY.set(0);
        targetScale.set(1);
        targetRotate.set(0);
      }, 120);

      return () => clearTimeout(timeout);
    }
  }, [pulseTrigger, tech.delay, targetX, targetY, targetScale, targetRotate]);

  // Proximity detection listener across window
  useEffect(() => {
    let animationFrameId: number;
    const PROXIMITY_RADIUS = 185; // Distance in px where spring reaction initiates
    const MAX_DISPLACEMENT = 58;  // Maximum spring push/pull distance

    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!badgeRef.current) return;

      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        if (!badgeRef.current) return;
        const rect = badgeRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const distance = Math.hypot(dx, dy);

        if (distance < PROXIMITY_RADIUS) {
          setIsNearby(true);
          // Normalized strength from 0 (at boundary) to 1 (at center)
          const proximityStrength = Math.pow(1 - distance / PROXIMITY_RADIUS, 1.4);
          const push = proximityStrength * MAX_DISPLACEMENT;

          // Compute angle
          const angle = Math.atan2(dy, dx);

          if (physicsMode === 'repel') {
            // Repel away from cursor
            targetX.set(-Math.cos(angle) * push);
            targetY.set(-Math.sin(angle) * push);
            targetRotate.set((dx / PROXIMITY_RADIUS) * -16);
          } else {
            // Magnetic attraction toward cursor
            targetX.set(Math.cos(angle) * push);
            targetY.set(Math.sin(angle) * push);
            targetRotate.set((dx / PROXIMITY_RADIUS) * 16);
          }

          targetScale.set(1 + proximityStrength * 0.22);
        } else {
          setIsNearby(false);
          targetX.set(0);
          targetY.set(0);
          targetScale.set(1);
          targetRotate.set(0);
        }
      });
    };

    const handleWindowMouseLeave = () => {
      setIsNearby(false);
      targetX.set(0);
      targetY.set(0);
      targetScale.set(1);
      targetRotate.set(0);
    };

    window.addEventListener('mousemove', handleWindowMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleWindowMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      document.removeEventListener('mouseleave', handleWindowMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [physicsMode, targetX, targetY, targetScale, targetRotate]);

  const IconComponent = ICON_MAP[tech.iconName] || Sparkles;

  return (
    <div
      ref={badgeRef}
      className={`absolute ${tech.pos} z-30 select-none`}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        style={{
          x: springX,
          y: springY,
          scale: springScale,
          rotate: springRotate,
        }}
        // Enable manual draggable physics with spring bounce snap-back
        drag
        dragSnapToOrigin
        dragElastic={0.45}
        dragTransition={{ bounceStiffness: 420, bounceDamping: 18 }}
        whileHover={{
          scale: 1.15,
          cursor: 'grab',
          transition: { type: 'spring', stiffness: 450, damping: 15 }
        }}
        whileTap={{
          scale: 0.94,
          cursor: 'grabbing',
          transition: { type: 'spring', stiffness: 500, damping: 20 }
        }}
        onClick={() => onSelect(tech.id)}
        onMouseEnter={() => setIsDirectlyHovered(true)}
        onMouseLeave={() => setIsDirectlyHovered(false)}
        role="button"
        tabIndex={0}
        aria-label={`${tech.name} floating stack chip. Click or drag to inspect.`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(tech.id);
          }
        }}
        className="relative group cursor-pointer touch-none"
      >
        {/* Spring Proximity Aura (activates when mouse is nearby or dragging) */}
        {(isNearby || isDirectlyHovered || isActive) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.25 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute -inset-2 rounded-2xl bg-cyan-400/25 blur-lg pointer-events-none"
          />
        )}

        {/* Outer Tech Badge */}
        <div
          className={`relative px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl backdrop-blur-xl bg-gradient-to-br transition-colors duration-200 ${
            isActive ? tech.activeColor : tech.color
          } border ${tech.border} shadow-xl ${tech.glow} flex items-center space-x-2`}
        >
          {/* Spring Pulsing Orb Indicator */}
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isActive ? 'bg-white' : isNearby ? 'bg-cyan-300' : 'bg-cyan-500'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isActive ? 'bg-white' : isNearby ? 'bg-cyan-300' : 'bg-cyan-500'
              }`}
            />
          </span>

          {/* Mini Tech Icon */}
          <IconComponent
            className={`w-3.5 h-3.5 flex-shrink-0 ${
              isActive ? 'text-white' : tech.text
            } transition-transform group-hover:rotate-12 duration-200`}
          />

          {/* Tech Name */}
          <span
            className={`text-xs sm:text-[13px] font-mono font-bold tracking-wide whitespace-nowrap ${
              isActive ? 'text-white' : tech.text
            }`}
          >
            {tech.name}
          </span>

          {/* Spring Sparkle Glyph */}
          <span
            className={`text-[10px] font-mono transition-all duration-200 ${
              isDirectlyHovered || isActive || isNearby
                ? 'opacity-100 text-cyan-200 translate-x-0'
                : 'opacity-0 -translate-x-1'
            }`}
          >
            ✦
          </span>
        </div>

        {/* Tactile drag hint pill on hover */}
        {isDirectlyHovered && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-slate-950/90 border border-slate-800 text-[9px] font-mono text-cyan-300 pointer-events-none whitespace-nowrap shadow-md"
          >
            click • drag
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
