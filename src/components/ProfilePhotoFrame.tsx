import { useState, useRef, MouseEvent, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'motion/react';
import { ShieldCheck, Sparkles, MapPin, Cpu, Eye, Compass, Zap } from 'lucide-react';
import { personalInfo } from '../data/portfolio.ts';

interface ProfilePhotoFrameProps {
  className?: string;
  mouseWindowOffset?: { x: number; y: number };
}

export default function ProfilePhotoFrame({ className = '', mouseWindowOffset }: ProfilePhotoFrameProps) {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Smooth springs for high-performance physics-based tilt and parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth physics damping
  const smoothX = useSpring(mouseX, { stiffness: 180, damping: 22, mass: 0.6 });
  const smoothY = useSpring(mouseY, { stiffness: 180, damping: 22, mass: 0.6 });

  // Transforms for multi-layer 3D parallax depth
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [16, -16]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);

  // Deep layers move differently according to Z-depth
  const glareX = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%']);
  const imageTranslateX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const imageTranslateY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);
  const badgeTranslateX = useTransform(smoothX, [-0.5, 0.5], [14, -14]);
  const badgeTranslateY = useTransform(smoothY, [-0.5, 0.5], [14, -14]);
  const ringTiltX = useTransform(smoothY, [-0.5, 0.5], [25, -25]);
  const ringTiltY = useTransform(smoothX, [-0.5, 0.5], [-25, 25]);

  const candidateSources = [
    personalInfo.profilePhotoPath, // '/profile.jpg'
    '/Photo.jpg.jpeg',
    '/profile.png',
    '/assets/profile.jpg'
  ];

  // Window mouse influence when not hovering the card directly
  useEffect(() => {
    if (!isHovered && mouseWindowOffset) {
      // Gentle floating ambient tilt responding to general cursor position
      mouseX.set(mouseWindowOffset.x * 0.4);
      mouseY.set(mouseWindowOffset.y * 0.4);
    }
  }, [mouseWindowOffset, isHovered, mouseX, mouseY]);

  const handleImageError = () => {
    if (candidateIndex < candidateSources.length - 1) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      setImageError(true);
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      id="profile-frame-container"
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic 3D Gyroscopic Rings that react in counter-rotation */}
      <motion.div
        style={{
          rotateX: ringTiltX,
          rotateY: ringTiltY,
          transformStyle: 'preserve-3d',
        }}
        className="absolute -inset-8 sm:-inset-12 pointer-events-none"
      >
        {/* Outer Orbit */}
        <div className="absolute inset-0 rounded-full border border-cyan-500/20 border-dashed animate-[spin_32s_linear_infinite]" />
        
        {/* Counter Orbit */}
        <div className="absolute inset-4 rounded-full border border-indigo-500/25 animate-[spin_20s_linear_infinite_reverse]" />

        {/* Diagonal Tech Gyro Ring */}
        <div className="absolute inset-8 rounded-full border border-sky-400/15 [transform:rotate3d(1,1,0,55deg)] animate-[spin_16s_linear_infinite]" />

        {/* Gyro Nodes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/80" />
        <div className="absolute bottom-4 right-10 w-2 h-2 rounded-full bg-indigo-400 shadow-md shadow-indigo-400/80" />
        <div className="absolute top-1/3 left-0 w-2 h-2 rounded-full bg-sky-300 shadow-md shadow-sky-300/80" />
      </motion.div>

      {/* Dynamic Ambient Background Aura */}
      <motion.div
        animate={{
          scale: isHovered ? 1.08 : 1.0,
          opacity: isHovered ? 0.9 : 0.65,
        }}
        transition={{ duration: 0.4 }}
        className="absolute -inset-6 bg-gradient-to-tr from-cyan-500/30 via-sky-600/20 to-indigo-600/30 rounded-[40px] blur-3xl pointer-events-none"
      />

      {/* Holographic HUD corner brackets */}
      <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-cyan-400/60 rounded-tl-lg pointer-events-none" />
      <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-cyan-400/60 rounded-tr-lg pointer-events-none" />
      <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-cyan-400/60 rounded-bl-lg pointer-events-none" />
      <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-cyan-400/60 rounded-br-lg pointer-events-none" />

      {/* Floating Sensor Tag Top */}
      <motion.div
        style={{
          x: badgeTranslateX,
          y: badgeTranslateY,
          translateZ: 60,
        }}
        className="absolute -top-6 left-6 z-30 px-3 py-1 rounded-full bg-slate-950/90 backdrop-blur-md border border-cyan-500/40 text-[10px] font-mono text-cyan-300 shadow-lg shadow-cyan-950/50 flex items-center space-x-1.5"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>3D SPATIAL FRAME</span>
      </motion.div>

      {/* Main 3D Card with preserved 3D child hierarchy */}
      <motion.div
        ref={cardRef}
        id="profile-3d-card"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-72 sm:w-80 md:w-88 rounded-3xl p-3 glass-panel border border-slate-700/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] cursor-pointer group"
      >
        {/* Dynamic Specular Light Sweep (Reflective Glass Glare) */}
        <motion.div
          style={{
            background: `radial-gradient(circle 240px at ${glareX} ${glareY}, rgba(56, 189, 248, 0.22), transparent 70%)`,
          }}
          className="absolute inset-0 rounded-3xl pointer-events-none z-30 transition-opacity duration-300"
        />

        {/* Subtle Cyber Grid Texture */}
        <div className="absolute inset-0 rounded-3xl opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Inner container with deep parallax image */}
        <div
          className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-700/60 flex flex-col justify-end"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Depth Layer: Profile Image */}
          <motion.div
            style={{
              x: imageTranslateX,
              y: imageTranslateY,
              scale: isHovered ? 1.08 : 1.04,
              translateZ: 20,
            }}
            transition={{ scale: { duration: 0.4 } }}
            className="absolute inset-0 w-full h-full"
          >
            {!imageError ? (
              <img
                id="hero-profile-image"
                src={candidateSources[candidateIndex]}
                alt={personalInfo.name}
                className="w-full h-full object-cover object-center filter brightness-[1.03] contrast-[1.04]"
                onError={handleImageError}
              />
            ) : (
              /* Fallback Cyber-Styled Monogram Card */
              <div
                id="profile-fallback-avatar"
                className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-slate-900 via-slate-850 to-slate-950"
              >
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-3xl font-extrabold text-white shadow-xl shadow-cyan-500/40 border border-cyan-300/40">
                    AR
                  </div>
                  <div className="absolute -bottom-1 -right-1 p-1 bg-slate-900 rounded-full border border-cyan-500/50">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-100">{personalInfo.name}</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-[200px]">
                  CMR College of Engineering & Technology
                </p>
                <span className="mt-3 px-3 py-1 rounded-full text-[10px] font-mono tracking-wide bg-cyan-950/70 border border-cyan-800/50 text-cyan-300">
                  Data Science & AI
                </span>
              </div>
            )}
          </motion.div>

          {/* Holographic Scanline Overlay on Image */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.03] to-transparent pointer-events-none" />

          {/* Bottom Gradient Overlay for High Contrast */}
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent pointer-events-none" />

          {/* Front Parallax Floating Info Chip */}
          <motion.div
            style={{
              x: badgeTranslateX,
              y: badgeTranslateY,
              translateZ: 50,
            }}
            className="relative z-20 p-3.5 m-2.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-700/80 shadow-2xl transition-colors group-hover:border-cyan-500/50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-slate-100">Open to Opportunities</span>
              </div>
              <div className="flex items-center space-x-1 text-[11px] text-cyan-400 font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified</span>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1.5 border-t border-slate-800">
              <div className="flex items-center text-slate-300">
                <MapPin className="w-3 h-3 mr-1 text-cyan-400" />
                <span>Hyderabad, India</span>
              </div>
              <span className="text-cyan-300/80 flex items-center space-x-1">
                <Zap className="w-3 h-3 text-cyan-400" />
                <span>Full-Stack</span>
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
