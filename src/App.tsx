import Navbar from './components/Navbar.tsx';
import SceneBackground from './three/SceneBackground.tsx';
import CustomCursor from './components/CustomCursor.tsx';
import HeroSection from './sections/HeroSection.tsx';
import AboutSection from './sections/AboutSection.tsx';
import SkillsSection from './sections/SkillsSection.tsx';
import ProjectsSection from './sections/ProjectsSection.tsx';
import CertificationsSection from './sections/CertificationsSection.tsx';
import EducationSection from './sections/EducationSection.tsx';
import AchievementsSection from './sections/AchievementsSection.tsx';
import ContactSection from './sections/ContactSection.tsx';
import Footer from './components/Footer.tsx';

export default function App() {
  return (
    <div id="portfolio-root" className="relative min-h-screen bg-[#070b14] text-slate-100">
      {/* Interactive 3D Canvas Background */}
      <SceneBackground />

      {/* Subtle Desktop Interactive Cursor */}
      <CustomCursor />

      {/* Sticky Header Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content" className="relative z-10 flex flex-col space-y-8 sm:space-y-16">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificationsSection />
        <EducationSection />
        <AchievementsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
