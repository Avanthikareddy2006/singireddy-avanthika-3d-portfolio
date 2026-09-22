import { ArrowDown, FileDown, Mail, Github, Linkedin, Sparkles, Terminal, Code2 } from 'lucide-react';
import { motion } from 'motion/react';
import { personalInfo, socialLinks } from '../data/portfolio.ts';
import HeroVisual3D from '../three/HeroVisual3D.tsx';

export default function HeroSection() {
  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Small introduction label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 text-xs font-mono tracking-wide"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Full-Stack & AI Engineer</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">B.Tech Computer Science</span>
            </motion.div>

            {/* Large Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Singireddy <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                  Avanthika Reddy
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-slate-300 tracking-tight">
                {personalInfo.title}
              </p>
            </motion.div>

            {/* Short Introduction directly from resume */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0"
            >
              {personalInfo.summary}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2"
            >
              <a
                href="#projects"
                onClick={scrollToProjects}
                className="px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center space-x-2"
              >
                <span>View Projects</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.resumePath}
                download="Singireddy_Avanthika_Reddy_Resume.pdf"
                className="px-6 py-3 rounded-xl font-semibold text-sm bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:border-cyan-500/50 hover:bg-slate-850 transition-all flex items-center space-x-2 shadow-sm"
              >
                <FileDown className="w-4 h-4 text-cyan-400" />
                <span>Download Resume</span>
              </a>

              <a
                href="#contact"
                onClick={scrollToContact}
                className="px-5 py-3 rounded-xl font-semibold text-sm text-slate-300 hover:text-white border border-transparent hover:border-slate-700 hover:bg-slate-900/60 transition-all"
              >
                <span>Contact Me</span>
              </a>
            </motion.div>

            {/* Social & Contact Direct Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center lg:justify-start space-x-4 pt-4 text-slate-400 text-xs font-mono"
            >
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 hover:text-cyan-400 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <span className="text-slate-700">•</span>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 hover:text-cyan-400 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <span className="text-slate-700">•</span>
              <a
                href={socialLinks.email}
                className="flex items-center space-x-1.5 hover:text-cyan-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: 3D Profile Frame & Orbiting Elements */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroVisual3D />
          </div>
        </div>
      </div>
    </section>
  );
}
