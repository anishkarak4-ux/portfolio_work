import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { InteractiveDemosSection } from './components/InteractiveDemosSection';
import { SkillsSection } from './components/SkillsSection';
import { EducationTimeline } from './components/EducationTimeline';
import { AchievementsSection } from './components/AchievementsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DeveloperConsole } from './components/DeveloperConsole';
import { ResumeModal } from './components/ResumeModal';
import { Terminal } from 'lucide-react';

export function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-black">
      
      {/* Top Navbar */}
      <Navbar 
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero 
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
        />
        
        <ProjectsSection />
        
        <InteractiveDemosSection />
        
        <SkillsSection />
        
        <EducationTimeline />
        
        <AchievementsSection />
        
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Developer Console Quick Button (Bottom Right) */}
      <button
        onClick={() => setIsTerminalOpen(true)}
        className="fixed bottom-6 right-6 z-30 p-3.5 rounded-2xl bg-slate-900/90 border border-brand-500/40 text-brand-400 hover:text-white hover:bg-slate-800 shadow-xl shadow-black/50 hover:scale-105 transition-all group backdrop-blur-md"
        title="Open Developer Console (Ctrl+K)"
        aria-label="Open Terminal"
      >
        <Terminal className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="sr-only">Developer Console</span>
      </button>

      {/* Interactive Developer Terminal Modal */}
      <DeveloperConsole
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenResume={() => {
          setIsTerminalOpen(false);
          setIsResumeOpen(true);
        }}
      />

      {/* Official Audited Resume Viewer Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

    </div>
  );
}

export default App;
